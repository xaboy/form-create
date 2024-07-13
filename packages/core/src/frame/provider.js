import {err} from '@form-create/utils/lib/console';
import {byCtx, deepGet, invoke, parseFn} from './util';
import is, {hasProperty} from '@form-create/utils/lib/type';
import deepSet from '@form-create/utils/lib/deepset';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import toArray from '@form-create/utils/lib/toarray';
import debounce from '@form-create/utils/lib/debounce';

const loadData = function (fc) {
    const loadData = {
        name: 'loadData',
        _fn: [],
        mounted(inject, rule, api) {
            this.deleted(inject);
            let attrs = toArray(inject.getValue());
            const events = [];
            attrs.forEach(attr => {
                if (attr) {
                    const callback = () => {
                        if (attr.watch !== false) {
                            fc.bus.$off('p.loadData.' + attr.attr, on);
                            fc.bus.$once('p.loadData.' + attr.attr, on);
                        }
                        let value = undefined;
                        if (attr.attr) {
                            value = fc.getWatchData(attr.attr, attr.default);
                            if (attr.copy !== false) {
                                value = deepCopy(value)
                            }
                        }
                        deepSet(inject.getProp(), attr.to || 'options', value);
                        api.sync(rule);
                    }
                    const on = debounce(callback, attr.wait || 300);
                    events.push(() => fc.bus.$off('p.loadData.' + attr.attr, on));
                    callback();
                }
            })
            this._fn[inject.id] = events;

        },
        deleted(inject) {
            if (this._fn[inject.id]) {
                this._fn[inject.id].forEach(un => {
                    un();
                })
            }
            inject.clearProp();
        },
    };
    loadData.watch = loadData.created;
    return loadData;
}


const componentValidate = {
    name: 'componentValidate',
    load(attr, rule, api) {
        const method = attr.getValue();
        if (!method) {
            attr.clearProp();
            api.clearValidateState([rule.field]);
        } else {
            attr.getProp().validate = [{
                validator(...args) {
                    const ctx = byCtx(rule);
                    if (ctx) {
                        return api.exec(ctx.id, method === true ? 'formCreateValidate' : method, ...args, {
                            attr,
                            rule,
                            api
                        });
                    }
                }
            }];
        }
    },
    watch(...args) {
        componentValidate.load(...args);
    }
};


const fetch = function (fc) {

    function parseOpt(option) {
        if (is.String(option)) {
            option = {
                action: option,
                to: 'options'
            }
        }
        return option;
    }

    function run(inject, rule, api) {
        let option = inject.value;
        fetchAttr.deleted(inject);
        if (is.Function(option)) {
            option = option(rule, api);
        }
        option = parseOpt(option);

        const set = (val) => {
            if (val === undefined) {
                inject.clearProp();
            } else {
                deepSet(inject.getProp(), option.to || 'options', val);
            }
            api.sync(rule);
        }

        if (!option || (!option.action && !option.key)) {
            set(undefined);
            return;
        }
        option = deepCopy(option);
        if (!option.to) {
            option.to = 'options';
        }

        if (option.key) {
            const item = fc.$handle.options.globalData[option.key];
            if (!item) {
                set(undefined);
                return;
            }
            if (item.type === 'static') {
                set(item.data);
                return;
            } else {
                option = {...option, ...item}
            }
        }

        const fields = [];

        const loadVal = str => {
            const res = fc.$handle.loadStrVar(str, true);
            fields.push(res.fields);
            return res.str;
        }

        const loadOptionsVal = _options => {
            _options.action = loadVal(_options.action);
            if (_options.headers) {
                const _headers = {};
                Object.keys(_options.headers).forEach(k => {
                    _headers[loadVal(k)] = loadVal(_options.headers[k]);
                });
                _options.headers = _headers;
            }
            if (_options.data) {
                const _data = {};
                Object.keys(_options.data).forEach(k => {
                    _data[loadVal(k)] = loadVal(_options.data[k]);
                });
                _options.data = _data;
            }

            return _options;
        };

        const onError = option.onError;

        const check = () => {
            if (!inject.getValue()) {
                inject.clearProp();
                api.sync(rule);
                return true;
            }
        }

        const on = debounce(function () {
            return run(inject, rule, api);
        }, option.wait || 1000);

        option = loadOptionsVal(option);
        const events = [];
        fields.filter((item, index) => fields.indexOf(item) === index).forEach(field => {
            fc.bus.$off('p.loadData.' + field, on);
            fc.bus.$once('p.loadData.' + field, on);
            events.push(() => fc.bus.$off('p.loadData.' + field, on));
        });
        fetchAttr._fn[inject.id] = events;

        const config = {
            headers: {},
            ...option,
            onSuccess(body, flag) {
                if (check()) return;
                let fn = (v) => flag ? v : (hasProperty(v, 'data') ? v.data : v);
                const parse = parseFn(option.parse);
                if (is.Function(parse)) {
                    fn = parse;
                } else if (parse && is.String(parse)) {
                    fn = (v) => {
                        return deepGet(v, parse);
                    }
                }
                set(fn(body, rule, api));
                api.sync(rule);
            },
            onError(e) {
                set(undefined);
                if (check()) return;
                (onError || ((e) => err(e.message || 'fetch fail ' + option.action)))(e, rule, api);
            }
        };
        fc.$handle.beforeFetch(config, {rule, api}).then(() => {
            if (is.Function(option.action)) {
                option.action(rule, api).then((val) => {
                    config.onSuccess(val, true);
                }).catch((e) => {
                    config.onError(e);
                });
                return;
            }
            invoke(() => fc.create.fetch(config, {inject, rule, api}));
        });
    }

    const fetchAttr = {
        name: 'fetch',
        _fn: [],
        mounted(...args) {
            run(...args);
        },
        watch(...args) {
            run(...args);
        },
        deleted(inject) {
            if (this._fn[inject.id]) {
                this._fn[inject.id].forEach(un => {
                    un();
                })
            }
            inject.clearProp();
        },
    };

    return fetchAttr;
}


export default {
    fetch,
    loadData,
    componentValidate,
};
