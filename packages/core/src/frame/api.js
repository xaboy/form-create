import {byCtx, invoke, mergeRule, toJson} from './util';
import {$set} from '@form-create/utils/lib/modify';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import is, {hasProperty} from '@form-create/utils/lib/type';
import extend from '@form-create/utils/lib/extend';
import {format} from '@form-create/utils/lib/console';


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
        helper: {
            tidyFields, props
        },
        get config() {
            return h.options
        },
        get options() {
            return h.options
        },
        get form() {
            return h.form
        },
        get rule() {
            return h.rules
        },
        get parent() {
            return h.vm.$pfc && h.vm.$pfc.$f
        },
        get children() {
            return allSubForm();
        },
        formData(fields) {
            return tidyFields(fields).reduce((initial, id) => {
                const ctx = h.getFieldCtx(id);
                if (!ctx) return initial;
                initial[ctx.field] = copy(ctx.rule.value);
                return initial;
            }, copy(h.appendData));
        },
        getValue(field) {
            const ctx = h.getFieldCtx(field);
            if (!ctx) return;
            return copy(ctx.rule.value);
        },
        coverValue(formData) {
            h.deferSyncValue(() => {
                api.fields().forEach(key => {
                    const ctxs = h.fieldCtx[key];
                    if (!ctxs) return h.appendData[key] = formData[key];
                    const flag = hasProperty(formData, key);
                    ctxs.forEach(ctx => {
                        ctx.rule.value = flag ? formData[key] : undefined;
                    })
                });
            })
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
            })
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
        destroy: () => {
            h.vm.$el.parentNode && h.vm.$el.parentNode.removeChild(h.vm.$el);
            h.vm.$destroy();
        },
        fields: () => h.fields(),
        append: (rule, after, child) => {
            let index = h.sort.length - 1, rules;
            const ctx = h.getCtx(after);

            if (ctx) {
                if (child) {
                    rules = ctx.rule.children;
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
                    rules = ctx.rule.children;
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
            $set(h.vm, 'isShow', !hide);
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
            h.vm.validate = {};
            api.refresh();
        },
        resetFields(fields) {
            tidyFields(fields).forEach(field => {
                h.getCtxs(field).forEach(ctx => {
                    h.$render.clearCache(ctx);
                    ctx.rule.value = copy(ctx.defaultValue);
                    h.refreshControl(ctx);
                });
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
            if (ctx) return ctx.el || h.vm.$refs[ctx.ref];
        },
        closeModal: (id) => {
            const el = api.el(id);
            el && el.$emit && el.$emit('close-modal');
        },
        getSubForm(field) {
            const ctx = h.getCtx(field);
            return ctx ? h.subForm[ctx.id] : undefined;
        },
        nextTick(fn) {
            h.bus.$once('next-tick', fn);
            h.refresh();
        },
        nextRefresh(fn) {
            h.nextRefresh();
            fn && invoke(fn);
        }
    };

    ['on', 'once', 'off', 'set'].forEach(n => {
        api[n] = function (...args) {
            h.vm[`$${n}`](...args);
        }
    });

    api.changeValue = api.changeField = api.setValue;

    return api;
}
