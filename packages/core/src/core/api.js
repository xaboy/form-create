import {$set, deepExtend, errMsg, isFunction, isPlainObject, isUndef} from '@form-create/utils';
import {toJson} from './util';


export default function Api(h) {

    function tidyFields(fields, all = false) {
        if (!fields)
            fields = all ? Object.keys(h.fieldList) : h.fields();
        else if (!Array.isArray(fields))
            fields = [fields];
        return fields;
    }

    return {
        formData() {
            const parsers = h.fieldList;

            return Object.keys(parsers).reduce((initial, id) => {
                const parser = parsers[id];
                initial[parser.field] = deepExtend({}, {value: parser.rule.value}).value;
                return initial;
            }, {});
        },
        getValue(field) {
            const parser = h.fieldList[field];
            if (!parser) return;
            return deepExtend({}, {value: parser.rule.value}).value;
        },
        setValue(field, value) {
            let formData = field;
            if (!isPlainObject(field))
                formData = {[field]: value};
            Object.keys(formData).forEach(key => {
                const parser = h.fieldList[key];
                if (!parser) return;
                parser.rule.value = formData[key];
            });
        },
        changeValue(field, value) {
            this.setValue(field, value);
        },
        changeField(field, value) {
            this.setValue(field, value);
        },
        removeField(field) {
            let parser = h.getParser(field);
            if (!parser)
                return;
            let index = parser.root.indexOf(parser.rule.__origin__);
            if (index === -1)
                return;
            parser.root.splice(index, 1);
            if (h.sortList.indexOf(parser.id) === -1)
                this.reload();

            return parser.rule.__origin__;
        },
        destroy: () => {
            h.vm.$el.parentNode && h.vm.$el.parentNode.removeChild(h.vm.$el);
            h.vm.$destroy();
        },
        fields: () => h.fields(),
        append: (rule, after, isChild) => {
            let fields = Object.keys(h.fieldList), index = h.sortList.length, rules;

            if (rule.field && fields.indexOf(rule.field) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            const parser = h.getParser(after);

            if (parser) {
                if (isChild) {
                    rules = parser.rule.children;
                    index = parser.rule.children.length;
                } else {
                    index = parser.root.indexOf(parser.rule.__origin__);
                    rules = parser.root;
                }
            } else rules = h.rules;
            rules.splice(index + 1, 0, rule);
        },
        prepend: (rule, after, isChild) => {
            let fields = Object.keys(h.fieldList), index = 0, rules;

            if (rule.field && fields.indexOf(rule.field) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            const parser = h.getParser(after);

            if (parser) {
                if (isChild) {
                    rules = parser.rule.children;
                } else {
                    index = parser.root.indexOf(parser.rule.__origin__);
                    rules = parser.root;
                }
            } else rules = h.rules;
            rules.splice(index, 0, rule);
        },
        hidden(hidden, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.getParser(field);
                if (!parser)
                    return;
                $set(parser.rule, 'hidden', !!hidden);
                h.$render.clearCache(parser, true);
            });
            h.refresh();
        },
        hiddenStatus(id) {
            const parser = h.getParser(id);
            if (!parser) return;
            return !!parser.rule.hidden;
        },
        visibility(visibility, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.getParser(field);
                if (!parser)
                    return;
                $set(parser.rule, 'visibility', !!visibility);
                h.$render.clearCache(parser, true);
            });
            h.refresh();
        },
        visibilityStatus(id) {
            const parser = h.getParser(id);
            if (!parser) return;
            return !!parser.rule.visibility;
        },
        disabled(disabled, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.fieldList[field];
                if (!parser)
                    return;
                h.vm.$set(parser.rule.props, 'disabled', !!disabled);
            });
        },
        model() {
            return Object.keys(h.trueData).reduce((initial, key) => {
                initial[key] = h.trueData[key].rule;
                return initial;
            }, {});
        },
        component() {
            return Object.keys(h.customData).reduce((initial, key) => {
                initial[key] = h.customData[key].rule;
                return initial;
            }, {});
        },
        bind() {
            let bind = {}, properties = {};
            Object.keys(h.fieldList).forEach((field) => {
                const parser = h.fieldList[field];
                properties[field] = {
                    get() {
                        return parser.rule.value;
                    },
                    set(value) {
                        parser.rule.value = value;
                    },
                    enumerable: true,
                    configurable: true
                };
            });
            Object.defineProperties(bind, properties);
            return bind;
        },
        submitBtnProps: (props = {}) => {
            h.vm._buttonProps(props);
        },
        resetBtnProps: (props = {}) => {
            h.vm._resetProps(props);
        },
        set: (node, field, value) => {
            h.vm.$set(node, field, value);
        },
        reload: (rules) => {
            h.reloadRule(rules)
        },
        updateOptions(options) {
            deepExtend(h.options, options);
            this.refresh(true);
        },
        onSubmit(fn) {
            this.updateOptions({onSubmit: fn});
        },
        sync: (field) => {
            const parser = h.getParser(field);
            if (parser) {
                h.$render.clearCache(parser, true);
                h.refresh();
            }
        },
        refresh: (clear) => {
            if (clear)
                h.$render.clearCacheAll();
            h.refresh();
        },
        hideForm: (isShow) => {
            h.vm.isShow = !isShow;
        },
        changeStatus: () => {
            return h.changeStatus;
        },
        clearChangeStatus: () => {
            h.changeStatus = false;
        },
        updateRule: (id, rule, cover) => {
            const parser = h.getParser(id);
            if (parser) {
                cover ? Object.keys(rule).forEach(key => {
                    parser.rule[key] = rule[key];
                }) : deepExtend(parser.rule, rule);
                return parser.rule.__origin__;
            }
        },
        getRule: (id) => {
            const parser = h.getParser(id);
            if (parser) {
                return parser.rule;
            }
        },
        updateRules(rules, cover) {
            Object.keys(rules).forEach(id => {
                this.updateRule(id, rules[id], cover);
            })
        },
        updateValidate(id, validate, merge) {
            const parser = h.getParser(id);
            if (parser) {
                parser.rule.validate = merge ? parser.rule.validate.concat(validate) : validate;
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
                throw new Error('方法不存在' + errMsg());
            return (...args) => {
                return el[name](...args);
            }
        },
        toJson() {
            return toJson(this.rule);
        },
        on(...args) {
            h.vm.$on(...args);
        },
        once(...args) {
            h.vm.$once(...args);
        },
        off(...args) {
            h.vm.$off(...args);
        },
        trigger(id, event, ...args) {
            const el = this.el(id);
            el && el.$emit(event, ...args);
        },
        el(id) {
            const parser = h.getParser(id);
            if (parser) return parser.el;
        },
        validate(callback) {
            let state = false;
            let subForm = {
                ...{
                    ___this: {
                        validate(call) {
                            h.$form.validate((valid) => {
                                call && call(valid);
                            });
                        }
                    }
                }, ...h.subForm
            };
            let keys = Object.keys(subForm).filter(field => {
                    const sub = subForm[field];
                    return Array.isArray(sub) ? sub.length : !isUndef(sub);
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
            h.$form.validateField(field, callback);
        },
        resetFields(fields) {
            let parsers = h.fieldList;
            tidyFields(fields, true).forEach(field => {
                let parser = parsers[field];
                if (!parser) return;

                if (parser.type === 'hidden') return;
                h.$form.resetField(parser);
                h.refreshControl(parser);
                h.$render.clearCache(parser, true);
            });
        },
        submit(successFn, failFn) {
            this.validate((valid) => {
                if (valid) {
                    let formData = this.formData();
                    if (isFunction(successFn))
                        successFn(formData, this);
                    else {
                        h.options.onSubmit && h.options.onSubmit(formData, this);
                        h.fc.$emit('on-submit', formData, this);
                    }
                } else {
                    failFn && failFn(this)
                }
            });
        },
        clearValidateState(fields, clearSub = true) {
            tidyFields(fields).forEach(field => {
                if (clearSub) this.clearSubValidateState(field);
                const parser = h.fieldList[field];
                if (!parser)
                    return;
                h.$form.clearValidateState(parser);
            });
        },
        clearSubValidateState(fields) {
            tidyFields(fields).forEach(field => {
                const subForm = h.subForm[field];
                if (subForm) {
                    if (Array.isArray(subForm)) {
                        subForm.forEach(form => {
                            form.clearValidateState();
                        })
                    } else if (subForm) {
                        subForm.clearValidateState();
                    }
                }
            })
        },
        getSubForm(field) {
            return h.subForm[field];
        },
        btn: {
            loading: (loading = true) => {
                h.vm._buttonProps({loading: !!loading});
            },
            disabled: (disabled = true) => {
                h.vm._buttonProps({disabled: !!disabled});
            },
            show: (isShow = true) => {
                h.vm._buttonProps({show: !!isShow});
            }
        },
        resetBtn: {
            loading: (loading = true) => {
                h.vm._resetProps({loading: !!loading});
            },
            disabled: (disabled = true) => {
                h.vm._resetProps({disabled: !!disabled});
            },
            show: (isShow = true) => {
                h.vm._resetProps({show: !!isShow});
            }
        },
        closeModal: (field) => {
            const parser = h.fieldList[field];
            parser && parser.closeModel && parser.closeModel();
        }
    };
}
