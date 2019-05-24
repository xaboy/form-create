import {deepExtend, errMsg, isFunction, isPlainObject, isUndef, toString} from '@form-create/utils';


//TODO 直接复制给 form.FormData 可减少一次渲染
export default function getGlobalApi(h) {

    function tidyFields(fields, all = false) {
        if (!fields)
            fields = all ? Object.keys(h.parsers) : h.vm._formField();
        else if (!Array.isArray(fields))
            fields = [fields];
        return fields;
    }

    return {
        formData() {
            const parsers = h.parsers;

            return Object.keys(parsers).reduce((initial, field) => {
                const parser = parsers[field];
                if (h.isNoVal(parser)) {
                    h.$emit(parser, 'input', (val) => {
                        initial[field] = val;
                    }, this);
                } else {
                    initial[field] = deepExtend({}, {value: h.vm._value(field)}).value;
                }
                return initial;
            }, {});
        },
        getValue(field) {
            field = toString(field);
            const parser = h.parsers[field];
            if (!parser) return;
            let val = undefined;
            if (h.isNoVal(parser))
                h.$emit(parser, 'input', (v) => {
                    val = v;
                }, this);
            else
                val = deepExtend({}, {value: h.vm._value(field)}).value;
            return val;
        },
        setValue(field, value) {
            let formData = field;
            if (!isPlainObject(field))
                formData = {[field]: value};
            Object.keys(formData).forEach(key => {
                this.changeValue(key, formData[key]);
            });
        },
        changeValue(field, value) {
            field = toString(field);
            let parser = h.parsers[field];
            if (parser === undefined)
                return;
            if (isFunction(value))
                value(h.vm._trueData(field), (changeValue) => {
                    this.changeField(field, changeValue);
                });
            else {
                if (h.isNoVal(parser))
                    h.$emit(parser, 'set-value', value, this);
                else
                    h.setFormData(field, parser.toFormValue(value));
            }
        },
        changeField(field, value) {
            this.setValue(field, value);
        },
        removeField: (field) => {
            let parser = h.parsers[field];
            if (!parser)
                return;
            let fields = parser.root.map(rule => rule.__field__), index = fields.indexOf(toString(field));
            if (index === -1)
                return;
            parser.root.splice(index, 1);
            h.vm._refresh();
        },
        validate: (callback) => {
            h.getFormRef().validate((valid) => {
                callback && callback(valid);
            });
        },
        validateField: (field, callback) => {
            if (!h.vm.cptData[field])
                return;
            h.getFormRef().validateField(field, callback);
        },
        resetFields(fields) {
            let parsers = h.parsers;
            tidyFields(fields, true).forEach(field => {
                let parser = parsers[field];
                if (!parser) return;

                if (h.isNoVal(parser))
                    h.$emit(parser, 'reset-field', this);
                else
                    h.reset(parser);
            });
            h.refresh();

        },
        destroy: () => {
            h.vm.$el.parentNode.removeChild(h.vm.$el);
            h.vm.$destroy();
        },
        fields: () => h.vm._formField(),
        append: (rule, after) => {
            let fields = h.fieldList, index = fields.indexOf(toString(after));

            if (rule.field && fields.indexOf(toString(rule.field)) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            if (isUndef(after)) {
                index = fields.length;
            } else if (index === -1)
                return;
            h.rules.splice(index + 1, 0, rule);

        },
        prepend: (rule, after) => {
            let fields = h.fieldList, index = fields.indexOf(toString(after));

            if (rule.field && fields.indexOf(toString(rule.field)) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            if (isUndef(after)) {
                index = 0;
            } else if (index === -1)
                return;
            else
                index--;
            h.rules.splice(index + 1, 0, rule);

        },
        submit(successFn, failFn) {
            this.validate((valid) => {
                if (valid) {
                    let formData = this.formData();
                    if (isFunction(successFn))
                        successFn(formData, this);
                    else
                        h.options.onSubmit && h.options.onSubmit(formData);
                } else {
                    failFn && failFn()
                }
            });
        },
        hidden(hidden, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.parsers[field];
                if (!parser)
                    return;
                h.vm.$set(parser.rule.props, 'hidden', !!hidden);
            })
        },
        visibility(visibility, fields) {
            tidyFields(fields).forEach((field) => {
                const parser = h.parsers[field];
                if (!parser)
                    return;
                h.vm.$set(parser.rule.props, 'visibility', !!visibility);
            })
        },
        disabled(disabled, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.parsers[field];
                if (!parser)
                    return;
                h.vm.$set(parser.rule.props, 'disabled', !!disabled);
            })
        },
        clearValidateState(fields) {
            tidyFields(fields).forEach(field => {
                const parser = h.parsers[field];
                if (!parser)
                    return;
                h.clearMsg(parser);
            });
            h.refresh();
        },
        model() {
            return {...h.vm.trueData};
        },
        component() {
            return {...h.vm.components};
        },
        bind(fields) {
            let bind = {}, properties = {};
            tidyFields(fields).forEach((field) => {
                const rule = h.vm._trueData(field);
                if (!rule)
                    return console.error(`${field} 字段不存在` + errMsg());
                properties[field] = {
                    get() {
                        return rule.value;
                    },
                    set(value) {
                        h.vm.$set(rule, 'value', value);
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
        btn: {
            loading: (loading = true) => {
                h.vm._buttonProps({loading: !!loading});
            },
            finish() {
                this.loading(false);
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
            finish() {
                this.loading(false);
            },
            disabled: (disabled = true) => {
                h.vm._resetProps({disabled: !!disabled});
            },
            show: (isShow = true) => {
                h.vm._resetProps({show: !!isShow});
            }
        },
        closeModal: (field) => {
            const parser = h.parsers[field];
            parser && parser.onCloseModal && parser.onCloseModal();
        },
        set: (node, field, value) => {
            h.vm.$set(node, field, value);
        },
        reload: (rules) => {
            h.reloadRule(rules)
        },
        options: (options) => {
            deepExtend(h.options, options);
        },
        onSuccess(fn) {
            this.onSubmit(fn);
        },
        onSubmit(fn) {
            this.options({onSubmit: fn});
        },
        // sync: (field, callback) => {
        //     if (h.parsers[field])
        //         h.parsers[field].render.sync(callback);
        // },
        refresh: () => {
            h.vm._refresh();
        },
        show: (isShow = true) => {
            h.vm.isShow = !!isShow;
        }
    };
}
