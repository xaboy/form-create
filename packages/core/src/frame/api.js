import {byCtx, invoke, mergeRule, toJson} from './util';
import {$set} from '@form-create/utils/lib/modify';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import is, {hasProperty} from '@form-create/utils/lib/type';
import extend from '@form-create/utils/lib/extend';
import {err, format} from '@form-create/utils/lib/console';

export default function Api(h) {

    function tidyFields(fields) {
        if (is.Undef(fields))
            fields = h.fields();
        else if (!Array.isArray(fields))
            fields = [fields];
        return fields;
    }

    function copy(value) {
        return deepCopy(value);
    }

    function props(fields, key, val) {
        tidyFields(fields).forEach(field => {
            const ctx = h.getCtx(field);
            if (!ctx) return;
            $set(ctx.rule, key, val);
            h.$render.clearCache(ctx);
        })
    }

    function byRules(ctxs, origin) {
        return Object.keys(ctxs).reduce((initial, key) => {
            initial[key] = origin ? ctxs[key].origin : ctxs[key].rule;
            return initial;
        }, {});
    }

    function tidyBtnProp(btn, def) {
        if (is.Boolean(btn))
            btn = {show: btn};
        else if (!is.Undef(btn) && !is.Object(btn)) btn = {show: def};
        return btn;
    }

    const api = {
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
        formData(fields) {
            return tidyFields(fields).reduce((initial, id) => {
                const ctx = h.fieldList[id];
                if (!ctx) return initial;
                initial[ctx.field] = copy(ctx.rule.value);
                return initial;
            }, {});
        },
        getValue(field) {
            const ctx = h.fieldList[field];
            if (!ctx) return;
            return copy(ctx.rule.value);
        },
        coverValue(formData) {
            Object.keys(h.fieldList).forEach(key => {
                const ctx = h.fieldList[key];
                if (!ctx) return h.appendData[key] = formData[key];
                ctx.rule.value = hasProperty(formData, key) ? formData[key] : undefined;
            });
        },
        setValue(field) {
            let formData = field;
            if (arguments.length >= 2)
                formData = {[field]: arguments[1]};
            Object.keys(formData).forEach(key => {
                const ctx = h.fieldList[key];
                if (!ctx) return h.appendData[key] = formData[key];
                ctx.rule.value = formData[key];
            });
        },
        removeField(field) {
            let ctx = h.getCtx(field);
            if (!ctx) return;
            ctx.rm();
            return ctx.origin;
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
            let fields = Object.keys(h.fieldList), index = h.sortList.length, rules;

            if (rule.field && fields.indexOf(rule.field) > -1)
                return err(`${rule.field} 字段已存在`, rule);

            const ctx = h.getCtx(after);

            if (ctx) {
                if (child) {
                    rules = ctx.rule.children;
                    index = ctx.rule.children.length;
                } else {
                    index = ctx.root.indexOf(ctx.origin);
                    rules = ctx.root;
                }
            } else rules = h.rules;
            rules.splice(index + 1, 0, rule);
        },
        prepend: (rule, after, child) => {
            let fields = Object.keys(h.fieldList), index = 0, rules;

            if (rule.field && fields.indexOf(rule.field) > -1)
                return err(`${rule.field} 字段已存在`, rule);

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
        hidden(hidden, fields) {
            props(fields, 'hidden', !!hidden);
            h.refresh();
        },
        hiddenStatus(id) {
            const ctx = h.getCtx(id);
            if (!ctx) return;
            return !!ctx.rule.hidden;
        },
        disabled(disabled, fields) {
            tidyFields(fields).forEach((field) => {
                const ctx = h.fieldList[field];
                if (!ctx) return;
                $set(ctx.rule.props, 'disabled', !!disabled);
            });
            h.refresh();
        },
        model(origin) {
            return byRules(h.fieldList, origin);
        },
        component(origin) {
            return byRules(h.customData, origin);
        },
        bind() {
            return Object.defineProperties({}, Object.keys(h.fieldList).reduce((initial, field) => {
                const ctx = h.fieldList[field];
                initial[field] = {
                    get() {
                        return ctx.rule.value;
                    },
                    set(value) {
                        ctx.rule.value = value;
                    },
                    enumerable: true,
                    configurable: true
                };
                return initial;
            }, {}))
        },
        submitBtnProps: (props = {}) => {
            let btn = tidyBtnProp(h.options.submitBtn, true);
            extend(btn, props);
            h.options.submitBtn = btn;
            api.refreshOptions();
            api.refresh();
        },
        resetBtnProps: (props = {}) => {
            let btn = tidyBtnProp(h.options.resetProps, false);
            extend(btn, props);
            h.options.resetProps = btn;
            api.refreshOptions();
            api.refresh();
        },
        reload: (rules) => {
            h.reloadRule(rules)
        },
        updateOptions(options) {
            h.fc.updateOptions(options);
            api.refreshOptions();
        },
        onSubmit(fn) {
            this.updateOptions({onSubmit: fn});
        },
        sync: (field) => {
            const ctx = is.Object(field) ? byCtx(field) : h.getCtx(field);
            if (ctx) {
                ctx.updateKey(true);
                h.$render.clearCache(ctx);
                h.refresh();
            }
        },
        refresh: (clear) => {
            h.$render.clearCacheAll();
            clear && h.$manager.updateKey();
            h.refresh();
        },
        refreshOptions() {
            h.$manager.updateOptions(h.options);
            this.refresh();
        },
        hideForm: (isShow) => {
            $set(h.vm, 'isShow', !isShow);
        },
        changeStatus: () => {
            return h.changeStatus;
        },
        clearChangeStatus: () => {
            h.changeStatus = false;
        },
        updateRule: (id, rule) => {
            const ctx = h.getCtx(id);
            if (ctx) {
                mergeRule(ctx.rule, rule);
            }
        },
        getRule: (id, origin) => {
            const ctx = h.getCtx(id);
            if (ctx) {
                return origin ? ctx.origin : ctx.rule;
            }
        },
        updateRules(rules) {
            Object.keys(rules).forEach(id => {
                this.updateRule(id, rules[id]);
            })
        },
        updateValidate(id, validate, merge) {
            if (merge) {
                this.updateRule(id, {validate})
            } else {
                props(id, 'validate', validate);
            }
        },
        updateValidates(validates, merge) {
            Object.keys(validates).forEach(id => {
                this.updateValidate(id, validates[id], merge);
            })
        },
        method(id, name) {
            const el = this.el(id);
            if (!el || !el[name])
                throw new Error(format('err', `${name}方法不存在`));
            return (...args) => {
                return el[name](...args);
            }
        },
        exec(id, name, ...args) {
            return invoke(() => this.method(id, name)(...args));
        },
        toJson() {
            return toJson(this.rule);
        },
        trigger(id, event, ...args) {
            const el = this.el(id);
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
        //todo 移动到ui组件 中
        validate(callback) {
            let state = false;
            let subForm = {
                ...{
                    ___this: {
                        validate(call) {
                            h.$manager.validate((valid) => {
                                call && call(valid);
                            });
                        }
                    }
                }, ...h.subForm
            };
            let keys = Object.keys(subForm).filter(field => {
                    const sub = subForm[field];
                    return Array.isArray(sub) ? sub.length : !is.Undef(sub);
                }), len = keys.length, subLen;
            const validFn = (valid, field) => {
                if (valid) {
                    if (subLen > 1) subLen--;
                    else if (len > 1) len--;
                    else callback(true);
                } else {
                    if (!state) {
                        callback(false);
                        state = true;
                    }
                    field && this.clearValidateState(field, false);
                }
            };

            keys.forEach(field => {
                let sub = subForm[field];
                if (Array.isArray(sub)) {
                    subLen = sub.length;
                    sub.forEach(form => {
                        form.validate((v) => validFn(v, field))
                    })
                } else if (sub) {
                    subLen = 1;
                    sub.validate(validFn)
                }

            });

        },
        validateField: (field, callback) => {
            if (!h.fieldList[field])
                return;
            h.$manager.validateField(field, callback);
        },
        resetFields(fields) {
            let ctxs = h.fieldList;
            tidyFields(fields).forEach(field => {
                let ctx = ctxs[field];
                if (!ctx) return;
                h.$render.clearCache(ctx);
                ctx.rule.value = copy(ctx.defaultValue);
                h.refreshControl(ctx);
            });
        },
        submit(successFn, failFn) {
            this.validate((valid) => {
                if (valid) {
                    let formData = this.formData();
                    if (is.Function(successFn))
                        successFn(formData, this);
                    else {
                        is.Function(h.options.onSubmit) && invoke(() => h.options.onSubmit(formData, this));
                        h.vm.$emit('submit', formData, this);
                    }
                } else {
                    is.Function(failFn) && invoke(() => failFn(this));
                }
            });
        },
        clearValidateState(fields, clearSub = true) {
            tidyFields(fields).forEach(field => {
                if (clearSub) this.clearSubValidateState(field);
                const ctx = h.fieldList[field];
                if (!ctx) return;
                h.$manager.clearValidateState(ctx);
            });
        },
        clearSubValidateState(fields) {
            tidyFields(fields).forEach(field => {
                const subForm = h.subForm[field];
                if (!subForm) return;
                if (Array.isArray(subForm)) {
                    subForm.forEach(form => {
                        form.clearValidateState();
                    })
                } else if (subForm) {
                    subForm.clearValidateState();
                }
            })
        },
        getSubForm(field) {
            return h.subForm[field];
        },
        btn: {
            loading: (loading = true) => {
                api.submitBtnProps({loading: !!loading});
            },
            disabled: (disabled = true) => {
                api.submitBtnProps({disabled: !!disabled});
            },
            show: (isShow = true) => {
                api.submitBtnProps({show: !!isShow});
            }
        },
        resetBtn: {
            loading: (loading = true) => {
                api.resetBtnProps({loading: !!loading});
            },
            disabled: (disabled = true) => {
                api.resetBtnProps({disabled: !!disabled});
            },
            show: (isShow = true) => {
                api.resetBtnProps({show: !!isShow});
            }
        },
        nextTick(fn) {
            h.bus.$once('next-tick', fn);
            h.refresh();
        }
        //todo 以上
    };

    ['on', 'once', 'off', 'set'].forEach(n => {
        api[n] = function (...args) {
            h.vm[`$${n}`](...args);
        }
    });

    api.changeValue = api.changeField = api.setValue;

    return api;
}
