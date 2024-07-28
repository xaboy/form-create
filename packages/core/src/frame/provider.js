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
            const unwatchs = [];
            attrs.forEach(attr => {
                if (attr && (attr.attr || attr.template)) {
                    const unwatch = fc.watchLoadData(debounce((get) => {
                        let value;
                        if (attr.template) {
                            value = fc.$handle.loadStrVar(attr.template, get);
                        } else {
                            value = get(attr.attr, attr.default);
                        }
                        if (attr.copy !== false) {
                            value = deepCopy(value)
                        }
                        const _rule = (attr.modify ? rule : inject.getProp());
                        if (attr.to === 'child') {
                            if (_rule.children) {
                                _rule.children[0] = value;
                            } else {
                                _rule.children = [value];
                            }
                        } else {
                            deepSet(_rule, attr.to || 'options', value);
                        }
                        api.sync(rule);
                    }, attr.wait || 300));
                    if (attr.watch !== false) {
                        unwatchs.push(unwatch);
                    } else {
                        unwatch();
                    }
                }
            })
            this._fn[inject.id] = unwatchs;
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

        const onError = option.onError;

        const check = () => {
            if (!inject.getValue()) {
                inject.clearProp();
                api.sync(rule);
                return true;
            }
        }
        fetchAttr._fn[inject.id] = fc.watchLoadData(debounce((get, change) => {
            if (change && option.watch === false) {
                return fetchAttr._fn[inject.id]();
            }
            const _option = fc.$handle.loadFetchVar(deepCopy(option), get);
            const config = {
                headers: {},
                ..._option,
                onSuccess(body, flag) {
                    if (check()) return;
                    let fn = (v) => flag ? v : (hasProperty(v, 'data') ? v.data : v);
                    const parse = parseFn(_option.parse);
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
                    (onError || ((e) => err(e.message || 'fetch fail ' + _option.action)))(e, rule, api);
                }
            };
            fc.$handle.beforeFetch(config, {rule, api}).then(() => {
                if (is.Function(_option.action)) {
                    _option.action(rule, api).then((val) => {
                        config.onSuccess(val, true);
                    }).catch((e) => {
                        config.onError(e);
                    });
                    return;
                }
                invoke(() => fc.create.fetch(config, {inject, rule, api}));
            });
        }, option.wait || 600));
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
                this._fn[inject.id]();
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
