import {err} from '@form-create/utils/lib/console';
import {byCtx, deepGet, invoke, parseFn} from './util';
import is, {hasProperty} from '@form-create/utils/lib/type';
import deepSet from '@form-create/utils/lib/deepset';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import toArray from '@form-create/utils/lib/toarray';
import debounce from '@form-create/utils/lib/debounce';
import {$set} from "@form-create/utils";
import {nextTick} from 'vue';

const loadData = function (fc) {
    const loadData = {
        name: 'loadData',
        _fn: [],
        loaded(inject, rule, api) {
            this.deleted(inject);
            nextTick(() => {
                let attrs = toArray(inject.getValue());
                const unwatchs = [];
                attrs.forEach(attr => {
                    if (attr && (attr.attr || attr.template)) {
                        let fn = (get) => {
                            let group;
                            if (rule && rule.__fc__) {
                                group = rule.__fc__.getParentGroup();
                            }
                            let value;
                            if (attr.template) {
                                value = fc.$handle.loadStrVar(attr.template, get, group ? {rule, value: (fc.$handle.subRuleData[group.id] || {})} : null);
                            } else if (attr.handler && is.Function(attr.handler)) {
                                value = attr.handler(get, rule, api);
                            } else {
                                value = fc.$handle.loadStrVar(`{{${attr.attr}}}`, get, group ? {rule, value: (fc.$handle.subRuleData[group.id] || {})} : null);
                            }
                            if ((value == null || value === '') && attr.default != null) {
                                value = attr.default;
                            }
                            if (attr.copy !== false) {
                                value = deepCopy(value)
                            }
                            const _rule = (attr.modify ? rule : inject.getProp());
                            if (attr.to === 'child') {
                                if (_rule.children) {
                                    $set(_rule.children, 0, value);
                                } else {
                                    $set(_rule, 'children', [value]);
                                }
                            } else {
                                deepSet(_rule, attr.to || 'options', value);
                            }
                            api.sync(rule);
                        };
                        let callback = (get) => fn(get);
                        const unwatch = fc.watchLoadData(callback);
                        fn = debounce(fn, attr.wait || 300)
                        if (attr.watch !== false) {
                            unwatchs.push(unwatch);
                        } else {
                            unwatch();
                        }
                    }
                })
                this._fn[inject.id] = unwatchs;
            });
        },
        deleted(inject) {
            if (this._fn[inject.id]) {
                this._fn[inject.id].forEach(un => {
                    un();
                })
                delete this._fn[inject.id];
            }
            inject.clearProp();
        },
    };
    loadData.watch = loadData.loaded;
    return loadData;
}

const t = function (fc) {
    const t = {
        name: 't',
        _fn: [],
        loaded(inject, rule, api) {
            this.deleted(inject);
            let attrs = inject.getValue() || {};
            const unwatchs = [];
            Object.keys(attrs).forEach(key => {
                const attr = attrs[key];
                if (attr) {
                    const isObj = typeof attr === 'object';
                    let fn = (get) => {
                        let value = fc.t(isObj ? attr.attr : attr, isObj ? attr.params : null, get);
                        const _rule = ((isObj && attr.modify) ? rule : inject.getProp());
                        if (key === 'child') {
                            if (_rule.children) {
                                $set(_rule.children, 0, value);
                            } else {
                                $set(_rule, 'children', [value]);
                            }
                        } else {
                            deepSet(_rule, key, value);
                        }
                        api.sync(rule);
                    };
                    let callback = (get) => fn(get);
                    const unwatch = fc.watchLoadData(callback);
                    fn = debounce(fn, attr.wait || 300)
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
                delete this._fn[inject.id];
            }
            inject.clearProp();
        },
    };
    t.watch = t.loaded;
    return t;
}

const componentValidate = {
    name: 'componentValidate',
    load(attr, rule, api) {
        let options = attr.getValue();
        if (!options || options.method === false) {
            attr.clearProp();
            api.clearValidateState([rule.field]);
        } else {
            if (!is.Object(options)) {
                options = {method: options};
            }
            const method = options.method;
            const validate = {
                ...options,
                validator(...args) {
                    const ctx = byCtx(rule);
                    if (ctx) {
                        return api.exec(ctx.id, is.String(method) ? method : 'formCreateValidate', ...args, {
                            attr,
                            rule,
                            api
                        });
                    }
                }
            };
            delete validate.method;
            attr.getProp().validate = [validate];
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
            if(option.key) {
                const res = get('$globalData.' + option.key);
                if (res) {
                    if (check()) return;
                    set(res);
                }
                return ;
            }
            const _option = fc.$handle.loadFetchVar(deepCopy(option), get, rule);
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
            }).catch(e => {});
        }, option.wait || 600));
    }

    const fetchAttr = {
        name: 'fetch',
        _fn: [],
        loaded(...args) {
            run(...args);
        },
        watch(...args) {
            run(...args);
        },
        deleted(inject) {
            if (this._fn[inject.id]) {
                this._fn[inject.id]();
                delete this._fn[inject.id];
            }
            inject.clearProp();
        },
    };

    return fetchAttr;
}


export default {
    fetch,
    loadData,
    t,
    componentValidate,
};
