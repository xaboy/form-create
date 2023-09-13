import {err} from '@form-create/utils/lib/console';
import {byCtx, invoke} from './util';
import is from '@form-create/utils/lib/type';
import deepSet from '@form-create/utils/lib/deepset';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import toArray from '@form-create/utils/lib/toarray';

const loadData = function (fc) {
    const loadData = {
        name: 'loadData',
        _fn: [],
        created(inject, rule, api) {
            this.deleted(inject);
            let attrs = toArray(inject.getValue());
            const events = [];
            attrs.forEach(attr => {
                if (attr) {
                    const on = () => {
                        if (attr.watch !== false) {
                            fc.bus.$off('p.loadData.' + attr.attr, on);
                            fc.bus.$once('p.loadData.' + attr.attr, on);
                        }
                        let value = undefined;
                        if (attr.attr) {
                            value = fc.loadData[attr.attr] || attr.default;
                            if (attr.copy) {
                                value = deepCopy(value)
                            }
                        }
                        deepSet(inject.getProp(), attr.to || 'options', value);
                        api.sync(rule);
                    }
                    events.push(() => fc.bus.$off('p.loadData.' + attr.attr, on));
                    on();
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
        const set = (val) => {
            if (val === undefined) {
                inject.clearProp();
                api.sync(rule);
            } else {
                deepSet(inject.getProp(), option.to || 'options', val);
            }
        }
        if (is.Function(option)) {
            option = option(rule, api);
        }
        option = parseOpt(option);
        if (!option || !option.action) {
            set(undefined);
            return;
        }
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

        const config = {
            headers: {},
            ...option,
            onSuccess(body, flag) {
                if (check()) return;
                let fn = (v) => flag ? v : v.data;
                if (is.Function(option.parse)) {
                    fn = option.parse;
                } else if (option.parse && is.String(option.parse)) {
                    fn = (v) => {
                        option.parse.split('.').forEach(k => {
                            if (v) {
                                v = v[k];
                            }
                        })
                        return v;
                    }
                }
                set(fn(body, rule, api))
                api.sync(rule);
            },
            onError(e) {
                set(undefined);
                if (check()) return;
                (onError || ((e) => err(e.message || 'fetch fail ' + option.action)))(e, rule, api);
            }
        };
        fc.options.beforeFetch && invoke(() => fc.options.beforeFetch(config, {rule, api}));
        if (is.Function(option.action)) {
            option.action(rule, api).then((val) => {
                config.onSuccess(val, true);
            }).catch((e) => {
                config.onError(e);
            });
            return;
        }
        invoke(() => fc.create.fetch(config, {inject, rule, api}));
    }

    return {
        name: 'fetch',
        loaded(...args) {
            run(...args);
        },
        watch(...args) {
            run(...args);
        }
    };
}


export default {
    fetch,
    loadData,
    componentValidate,
};
