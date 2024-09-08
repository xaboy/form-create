import {byCtx, invoke, mergeRule, parseFn, toJson} from './util';
import {$set} from '@form-create/utils/lib/modify';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import is, {hasProperty} from '@form-create/utils/lib/type';
import extend from '@form-create/utils/lib/extend';
import {format} from '@form-create/utils/lib/console';
import {asyncFetch} from './fetch';
import {nextTick} from 'vue';


function copy(value) {
    return deepCopy(value);
}

export default function Api(h) {

    function tidyFields(fields) {
        if (is.Undef(fields))
            fields = h.fields();
        else if (!Array.isArray(fields))
            fields = [fields];
        return fields;
    }

    function props(fields, key, val) {
        tidyFields(fields).forEach(field => {
            h.getCtxs(field).forEach(ctx => {
                $set(ctx.rule, key, val);
                h.$render.clearCache(ctx);
            });
        })
    }

    function allSubForm() {
        const subs = h.subForm;
        return Object.keys(subs).reduce((initial, k) => {
            const sub = subs[k];
            if (!sub) return initial;
            if (Array.isArray(sub))
                initial.push(...sub);
            else
                initial.push(sub);
            return initial;
        }, []);
    }

    const api = {
        get config() {
            return h.options
        },
        set config(val) {
            h.fc.options.value = val;
        },
        get options() {
            return h.options
        },
        set options(val) {
            h.fc.options.value = val;
        },
        get form() {
            return h.form
        },
        get rule() {
            return h.rules
        },
        get parent() {
            return h.vm.setupState.parent && h.vm.setupState.parent.setupState.fapi
        },
        get top() {
            if (api.parent) {
                return api.parent.top;
            }
            return api;
        },
        get children() {
            return allSubForm();
        },
        get siblings() {
            const inject = h.vm.setupState.getGroupInject();
            if (inject) {
                const subForm = inject.getSubForm();
                if (Array.isArray(subForm)) {
                    return [...subForm];
                }
            }
            return undefined;
        },
        get index() {
            const siblings = api.siblings;
            if (siblings) {
                const idx = siblings.indexOf(api);
                return idx > -1 ? idx : undefined;
            }
            return undefined;
        },
        formData(fields) {
            return tidyFields(fields).reduce((initial, id) => {
                const ctx = h.getFieldCtx(id);
                if (!ctx) return initial;
                initial[ctx.field] = copy(ctx.rule.value);
                return initial;
            }, h.options.appendValue !== false ? copy(h.appendData) : {});
        },
        getValue(field) {
            const ctx = h.getFieldCtx(field);
            if (!ctx) return;
            return copy(ctx.rule.value);
        },
        coverValue(formData) {
            const data = {...(formData || {})};
            h.deferSyncValue(() => {
                h.appendData = {};
                api.fields().forEach(key => {
                    const ctxs = h.fieldCtx[key];
                    if (ctxs) {
                        const flag = hasProperty(formData, key);
                        ctxs.forEach(ctx => {
                            ctx.rule.value = flag ? formData[key] : undefined;
                        })
                        delete data[key];
                    }
                });
                extend(h.appendData, data);
            }, true)
        },
        setValue(field) {
            let formData = field;
            if (arguments.length >= 2)
                formData = {[field]: arguments[1]};
            h.deferSyncValue(() => {
                Object.keys(formData).forEach(key => {
                    const ctxs = h.fieldCtx[key];
                    if (!ctxs) return h.appendData[key] = formData[key];
                    ctxs.forEach(ctx => {
                        ctx.rule.value = formData[key];
                    });
                });
            }, true)
        },
        removeField(field) {
            const ctx = h.getCtx(field);
            h.deferSyncValue(() => {
                h.getCtxs(field).forEach(ctx => {
                    ctx.rm();
                });
            }, true);
            return ctx ? ctx.origin : undefined;
        },
        removeRule(rule) {
            const ctx = rule && byCtx(rule);
            if (!ctx) return;
            ctx.rm();
            return ctx.origin;
        },
        fields: () => h.fields(),
        append: (rule, after, child) => {
            let index = h.sort.length - 1, rules;
            const ctx = h.getCtx(after);

            if (ctx) {
                if (child) {
                    rules = ctx.getPending('children', ctx.rule.children);
                    if (!Array.isArray(rules)) return;
                    index = ctx.rule.children.length - 1;
                } else {
                    index = ctx.root.indexOf(ctx.origin);
                    rules = ctx.root;
                }
            } else rules = h.rules;
            rules.splice(index + 1, 0, rule);
        },
        prepend: (rule, after, child) => {
            let index = 0, rules;
            const ctx = h.getCtx(after);

            if (ctx) {
                if (child) {
                    rules = ctx.getPending('children', ctx.rule.children);
                    if (!Array.isArray(rules)) return;
                } else {
                    index = ctx.root.indexOf(ctx.origin);
                    rules = ctx.root;
                }
            } else rules = h.rules;
            rules.splice(index, 0, rule);
        },
        hidden(state, fields) {
            props(fields, 'hidden', !!state);
            h.refresh();
        },
        hiddenStatus(id) {
            const ctx = h.getCtx(id);
            if (!ctx) return;
            return !!ctx.rule.hidden;
        },
        display(state, fields) {
            props(fields, 'display', !!state);
            h.refresh();
        },
        displayStatus(id) {
            const ctx = h.getCtx(id);
            if (!ctx) return;
            return !!ctx.rule.display;
        },
        disabled(disabled, fields) {
            tidyFields(fields).forEach((field) => {
                h.getCtxs(field).forEach(ctx => {
                    $set(ctx.rule.props, 'disabled', !!disabled);
                });
            });
            h.refresh();
        },
        all(origin) {
            return Object.keys(h.ctxs).map(k => {
                const ctx = h.ctxs[k];
                return origin ? ctx.origin : ctx.rule;
            });
        },
        model(origin) {
            return h.fields().reduce((initial, key) => {
                const ctx = h.fieldCtx[key][0];
                initial[key] = origin ? ctx.origin : ctx.rule;
                return initial;
            }, {});
        },
        component(origin) {
            return Object.keys(h.nameCtx).reduce((initial, key) => {
                const ctx = h.nameCtx[key].map(ctx => origin ? ctx.origin : ctx.rule);
                initial[key] = ctx.length === 1 ? ctx[0] : ctx;
                return initial;
            }, {});
        },
        bind() {
            return api.form;
        },
        reload: (rules) => {
            h.reloadRule(rules)
        },
        updateOptions(options) {
            h.fc.updateOptions(options);
            api.refresh();
        },
        onSubmit(fn) {
            api.updateOptions({onSubmit: fn});
        },
        sync: (field) => {
            if (Array.isArray(field)) {
                field.forEach(v => api.sync(v));
                return;
            }
            let ctxs = is.Object(field) ? byCtx(field) : h.getCtxs(field);
            if (!ctxs) {
                return;
            }
            ctxs = Array.isArray(ctxs) ? ctxs : [ctxs];
            ctxs.forEach(ctx => {
                if (!ctx.deleted) {
                    const subForm = h.subForm[ctx.id];
                    if (subForm) {
                        if (Array.isArray(subForm)) {
                            subForm.forEach(form => {
                                form.refresh();
                            })
                        } else if (subForm) {
                            subForm.refresh();
                        }
                    }
                    //ctx.updateKey(true);
                    h.$render.clearCache(ctx);
                }
            });
            h.refresh();
        },
        refresh: () => {
            allSubForm().forEach(sub => {
                sub.refresh();
            });
            h.$render.clearCacheAll();
            h.refresh();
        },
        refreshOptions() {
            h.$manager.updateOptions(h.options);
            api.refresh();
        },
        hideForm: (hide) => {
            h.vm.setupState.isShow = !hide;
        },
        changeStatus: () => {
            return h.changeStatus;
        },
        clearChangeStatus: () => {
            h.changeStatus = false;
        },
        updateRule(id, rule) {
            h.getCtxs(id).forEach(ctx => {
                extend(ctx.rule, rule);
            });
        },
        updateRules(rules) {
            Object.keys(rules).forEach(id => {
                api.updateRule(id, rules[id]);
            })
        },
        mergeRule: (id, rule) => {
            h.getCtxs(id).forEach(ctx => {
                mergeRule(ctx.rule, rule);
            });
        },
        mergeRules(rules) {
            Object.keys(rules).forEach(id => {
                api.mergeRule(id, rules[id]);
            })
        },
        getRule: (id, origin) => {
            const ctx = h.getCtx(id);
            if (ctx) {
                return origin ? ctx.origin : ctx.rule;
            }
        },
        getRenderRule: (id) => {
            const ctx = h.getCtx(id);
            if (ctx) {
                return ctx.prop;
            }
        },
        getRefRule: (id) => {
            const ctxs = h.getCtxs(id);
            if (ctxs) {
                const rules = ctxs.map(ctx => {
                    return ctx.rule;
                })
                return rules.length === 1 ? rules[0] : rules;
            }
        },
        setEffect(id, attr, value) {
            const ctx = h.getCtx(id);
            if (ctx && attr) {
                if (attr[0] === '$') {
                    attr = attr.substr(1);
                }
                if (hasProperty(ctx.rule, '$' + attr)) {
                    $set(ctx.rule, '$' + attr, value);
                }
                if (!hasProperty(ctx.rule, 'effect')) {
                    ctx.rule.effect = {};
                }
                $set(ctx.rule.effect, attr, value);
            }
        },
        clearEffectData(id, attr) {
            const ctx = h.getCtx(id);
            if (ctx) {
                if (attr && attr[0] === '$') {
                    attr = attr.substr(1);
                }
                ctx.clearEffectData(attr);
                api.sync(id);
            }
        },
        updateValidate(id, validate, merge) {
            if (merge) {
                api.mergeRule(id, {validate})
            } else {
                props(id, 'validate', validate);
            }
        },
        updateValidates(validates, merge) {
            Object.keys(validates).forEach(id => {
                api.updateValidate(id, validates[id], merge);
            })
        },
        refreshValidate() {
            api.refresh();
        },
        resetFields(fields) {
            tidyFields(fields).forEach(field => {
                h.getCtxs(field).forEach(ctx => {
                    h.$render.clearCache(ctx);
                    ctx.rule.value = copy(ctx.defaultValue);
                });
            });
            nextTick(() => {
                api.clearValidateState();
            });
        },
        method(id, name) {
            const el = api.el(id);
            if (!el || !el[name])
                throw new Error(format('err', `${name}方法不存在`));
            return (...args) => {
                return el[name](...args);
            }
        },
        exec(id, name, ...args) {
            return invoke(() => api.method(id, name)(...args));
        },
        toJson(space) {
            return toJson(api.rule, space);
        },
        trigger(id, event, ...args) {
            const el = api.el(id);
            el && el.$emit(event, ...args);
        },
        el(id) {
            const ctx = h.getCtx(id);
            if (ctx) return ctx.el || h.vm.refs[ctx.ref];
        },
        closeModal: (id) => {
            h.bus.$emit('fc:closeModal:' + id);
        },
        getSubForm(field) {
            const ctx = h.getCtx(field);
            return ctx ? h.subForm[ctx.id] : undefined;
        },
        getChildrenRuleList(id) {
            const flag = typeof id === 'object';
            const ctx = flag ? byCtx(id) : h.getCtx(id);
            const rule = ctx ? ctx.rule : (flag ? id : api.getRule(id));
            if (!rule) {
                return [];
            }
            const rules = [];
            const findRules = children => {
                children && children.forEach(item => {
                    if (typeof item !== 'object') {
                        return;
                    }
                    if (item.field) {
                        rules.push(item);
                    }
                    rules.push(...api.getChildrenRuleList(item));
                });
            }
            findRules(ctx ? ctx.loadChildrenPending() : rule.children);
            return rules;
        },
        getParentSubRule(id) {
            const flag = typeof id === 'object';
            const ctx = flag ? byCtx(id) : h.getCtx(id);
            if (ctx) {
                const group = ctx.getParentGroup();
                if (group) {
                    return group.rule;
                }
            }
        },
        getChildrenFormData(id) {
            const rules = api.getChildrenRuleList(id);
            return rules.reduce((formData, rule) => {
                formData[rule.field] = copy(rule.value);
                return formData;
            }, {});
        },
        setChildrenFormData(id, formData, cover) {
            const rules = api.getChildrenRuleList(id);
            h.deferSyncValue(() => {
                rules.forEach(rule => {
                    if (hasProperty(formData, rule.field)) {
                        rule.value = formData[rule.field];
                    } else if (cover) {
                        rule.value = undefined;
                    }
                });
            });
        },
        getGlobalEvent(name) {
            let event = api.options.globalEvent[name];
            if (event) {
                if (typeof event === 'object') {
                    event = event.handle;
                }
                return parseFn(event);
            }
            return undefined;
        },
        getGlobalData(name) {
            return new Promise((resolve, inject) => {
                let config = api.options.globalData[name];
                if (!config) {
                    resolve(h.fc.loadData[name]);
                }
                if (config.type === 'fetch') {
                    api.fetch(config).then(res => {
                        resolve(res);
                    }).catch(inject);
                } else {
                    resolve(config.data);
                }
            });
        },
        nextTick(fn) {
            h.bus.$once('next-tick', fn);
            h.refresh();
        },
        nextRefresh(fn) {
            h.nextRefresh();
            fn && invoke(fn);
        },
        deferSyncValue(fn, sync) {
            h.deferSyncValue(fn, sync);
        },
        emit(name, ...args) {
            h.vm.emit(name, ...args);
        },
        bus: h.bus,
        fetch(opt) {
            return new Promise((resolve, reject) => {
                opt = deepCopy(opt);
                opt = h.loadFetchVar(opt);
                h.beforeFetch(opt).then(() => {
                    return asyncFetch(opt, h.fc.create.fetch).then(resolve).catch(reject);
                });
            });
        },
        watchFetch(opt, callback, error) {
            return h.fc.watchLoadData((get, change) => {
                let _opt = deepCopy(opt);
                _opt = h.loadFetchVar(_opt, get);
                h.beforeFetch(_opt).then(() => {
                    return asyncFetch(_opt, h.fc.create.fetch).then(res => {
                        callback && callback(res, change);
                    }).catch(e => {
                        error && error(e);
                    });
                });
            });
        },
        getData(id, def) {
            return h.fc.getLoadData(id, def);
        },
        setData(id, data) {
            return h.fc.setData(id, data);
        },
        refreshData(id) {
            return h.fc.refreshData(id);
        },
        helper: {
            tidyFields, props
        }
    };

    ['on', 'once', 'off'].forEach(n => {
        api[n] = function (...args) {
            h.bus[`$${n}`](...args);
        }
    });

    api.changeValue = api.changeField = api.setValue;

    return api;
}
