import {byParser, invoke, mergeRule, toJson} from './util';
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
            const parser = h.getParser(field);
            if (!parser) return;
            $set(parser.rule, key, val);
            h.$render.clearCache(parser, true);
        })
    }

    function byRules(parsers, origin) {
        return Object.keys(parsers).reduce((initial, key) => {
            initial[key] = origin ? parsers[key].origin : parsers[key].rule;
            return initial;
        }, {});
    }

    function tidyBtnProp(btn, def) {
        if (is.Boolean(btn))
            btn = {show: btn};
        else if (!is.Undef(btn) && !is.Object(btn)) btn = {show: def};
        return btn;
    }

    //todo 优化 css
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
                const parser = h.fieldList[id];
                if (!parser) return initial;
                initial[parser.field] = copy(parser.rule.value);
                return initial;
            }, {});
        },
        getValue(field) {
            const parser = h.fieldList[field];
            if (!parser) return;
            return copy(parser.rule.value);
        },
        coverValue(formData) {
            Object.keys(h.fieldList).forEach(key => {
                const parser = h.fieldList[key];
                if (!parser) return h.appendData[key] = formData[key];
                parser.rule.value = hasProperty(formData, key) ? formData[key] : undefined;
            });
        },
        setValue(field) {
            let formData = field;
            if (arguments.length >= 2)
                formData = {[field]: arguments[1]};
            Object.keys(formData).forEach(key => {
                const parser = h.fieldList[key];
                if (!parser) return h.appendData[key] = formData[key];
                parser.rule.value = formData[key];
            });
        },
        removeField(field) {
            let parser = h.getParser(field);
            if (!parser) return;
            parser._remove();
            return parser.origin;
        },
        removeRule(rule) {
            const parser = rule && byParser(rule);
            if (!parser) return;
            parser._remove();
            return parser.origin;
        },
        destroy: () => {
            h.vm.$el.parentNode && h.vm.$el.parentNode.removeChild(h.vm.$el);
            h.vm.$destroy();
        },
        fields: () => h.fields(),
        append: (rule, after, child) => {
            let fields = Object.keys(h.fieldList), index = h.sortList.length, rules;

            if (rule.field && fields.indexOf(rule.field) !== -1)
                return err(`${rule.field} 字段已存在`, rule);

            const parser = h.getParser(after);

            if (parser) {
                if (child) {
                    rules = parser.rule.children;
                    index = parser.rule.children.length;
                } else {
                    index = parser.root.indexOf(parser.origin);
                    rules = parser.root;
                }
            } else rules = h.rules;
            rules.splice(index + 1, 0, rule);
        },
        prepend: (rule, after, child) => {
            let fields = Object.keys(h.fieldList), index = 0, rules;

            if (rule.field && fields.indexOf(rule.field) !== -1)
                return err(`${rule.field} 字段已存在`, rule);

            const parser = h.getParser(after);

            if (parser) {
                if (child) {
                    rules = parser.rule.children;
                } else {
                    index = parser.root.indexOf(parser.origin);
                    rules = parser.root;
                }
            } else rules = h.rules;
            rules.splice(index, 0, rule);
        },
        hidden(hidden, fields) {
            props(fields, 'hidden', !!hidden);
            h.refresh();
        },
        hiddenStatus(id) {
            const parser = h.getParser(id);
            if (!parser) return;
            return !!parser.rule.hidden;
        },
        disabled(disabled, fields) {
            tidyFields(fields).forEach((field) => {
                const parser = h.fieldList[field];
                if (!parser) return;
                $set(parser.rule.props, 'disabled', !!disabled);
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
                const parser = h.fieldList[field];
                initial[field] = {
                    get() {
                        return parser.rule.value;
                    },
                    set(value) {
                        parser.rule.value = value;
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
            api.refresh();
        },
        resetBtnProps: (props = {}) => {
            let btn = tidyBtnProp(h.options.resetProps, false);
            extend(btn, props);
            h.options.resetProps = btn;
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
            const parser = is.Object(field) ? byParser(field) : h.getParser(field);
            if (parser) {
                parser.updateKey(true);
                h.$render.clearCache(parser, true);
                h.refresh();
            }
        },
        //todo 优化
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
            const parser = h.getParser(id);
            if (parser) {
                mergeRule(parser.rule, rule);
            }
        },
        getRule: (id, origin) => {
            const parser = h.getParser(id);
            if (parser) {
                return origin ? parser.origin : parser.rule;
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
            const parser = h.getParser(id);
            if (parser) return parser.el || h.vm.$refs[parser.refName];
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
            let parsers = h.fieldList;
            tidyFields(fields).forEach(field => {
                let parser = parsers[field];
                if (!parser) return;
                h.$render.clearCache(parser, true);
                parser.rule.value = copy(parser.defaultValue);
                h.refreshControl(parser);
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
                const parser = h.fieldList[field];
                if (!parser) return;
                h.$manager.clearValidateState(parser);
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
