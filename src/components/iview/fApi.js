import {deepExtend, errMsg, isFunction, isPlainObject, isUndef, toString} from "../../core/util";

export default function getGlobalApi(fComponent) {
    let vm = fComponent.vm;

    function tidyFields(fields, all = false) {
        if (!fields)
            fields = all ? Object.keys(fComponent.handlers) : vm._formField();
        else if (!Array.isArray(fields))
            fields = [fields];
        return fields;
    }

    return {
        formData() {
            const handlers = fComponent.handlers;

            return Object.keys(handlers).reduce((initial, field) => {
                const handler = handlers[field];
                if (handler.noValue === true) {
                    handler.$emit('input', (val) => {
                        initial[field] = val;
                    }, this);
                } else {
                    initial[field] = deepExtend({}, {value: vm._value(field)}).value;
                }
                return initial;
            }, {});
        },
        getValue(field) {
            field = toString(field);
            const handler = fComponent.handlers[field];
            if (isUndef(handler)) return;
            let val = undefined;
            if (handler.noValue === true)
                handler.$emit('input', (v) => {
                    val = v;
                }, this);
            else
                val = deepExtend({}, {value: vm._value(field)}).value;
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
            let handler = fComponent.handlers[field];
            if (handler === undefined)
                return;
            if (isFunction(value))
                value(vm._trueData(field), (changeValue) => {
                    this.changeField(field, changeValue);
                });
            else {
                if (handler.noValue === true)
                    handler.$emit('set-value', value, this);
                else
                    handler.setValue(value);
            }
        },
        changeField(field, value) {
            this.setValue(field, value);
        },
        removeField: (field) => {
            let handler = fComponent.handlers[field];
            if (!handler)
                return;
            let fields = handler.root.map(rule => rule.__field__), index = fields.indexOf(toString(field));
            if (index === -1)
                return;
            handler.root.splice(index, 1);
            vm._refresh();
        },
        validate: (successFn, errorFn) => {
            fComponent.getFormRef().validate((valid) => {
                valid === true ? (successFn && successFn()) : (errorFn && errorFn());
            });
        },
        validateField: (field, callback) => {
            if (!vm.cptData[field])
                return;
            fComponent.getFormRef().validateField(field, callback);
        },
        resetFields(fields) {
            let handlers = fComponent.handlers;
            tidyFields(fields, true).forEach(field => {
                let handler = handlers[field];
                if (!handler) return;

                if (!handler.noValue)
                    handler.reset();
                else
                    handler.$emit('reset-field', this);
            });
            this.refresh();

        },
        destroy: () => {
            vm.$el.parentNode.removeChild(vm.$el);
            vm.$destroy();
        },
        fields: () => vm._formField(),
        append: (rule, after) => {
            let fields = fComponent.fieldList, index = fields.indexOf(toString(after));

            if (rule.field && fields.indexOf(toString(rule.field)) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            if (isUndef(after)) {
                index = fields.length;
            } else if (index === -1)
                return;
            fComponent.rules.splice(index + 1, 0, rule);

        },
        prepend: (rule, after) => {
            let fields = fComponent.fieldList, index = fields.indexOf(toString(after));

            if (rule.field && fields.indexOf(toString(rule.field)) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            if (isUndef(after)) {
                index = 0;
            } else if (index === -1)
                return;
            else
                index--;
            fComponent.rules.splice(index + 1, 0, rule);

        },
        submit(successFn, failFn) {
            this.validate(() => {
                let formData = this.formData();
                if (isFunction(successFn))
                    successFn(formData, this);
                else
                    fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
            }, () => failFn && failFn());
        },
        hidden(fields, hidden = true) {
            tidyFields(fields).forEach((field) => {
                const handler = fComponent.handlers[field];
                if (!fComponent.handlers[field])
                    return;
                vm.$set(handler.rule.props, 'hidden', !!hidden);
                handler.render.sync();
            })
        },
        visibility(fields, visibility = true) {
            tidyFields(fields).forEach((field) => {
                const handler = fComponent.handlers[field];
                if (!handler)
                    return;
                vm.$set(handler.rule.props, 'visibility', !!visibility);
                handler.render.sync();
            })
        },
        disabled(fields, disabled = true) {
            disabled = !!disabled;
            tidyFields(fields, true).forEach((field) => {
                const handler = fComponent.handlers[field];
                if (!handler)
                    return;

                if (!handler.noValue)
                    vm.$set(handler.rule.props, 'disabled', disabled);
                else
                    handler.$emit('disabled', disabled, this);

                handler.render.sync();
            })
        },
        clearValidateState(fields) {
            tidyFields(fields).forEach(field => {
                const handler = fComponent.handlers[field];
                if (!handler)
                    return;

                handler.clearMsg();
            })
        },
        model() {
            return {...vm.trueData};
        },
        component() {
            return {...vm.components};
        },
        bind(fields) {
            let bind = {}, properties = {};
            tidyFields(fields).forEach((field) => {
                const rule = vm._trueData(field);
                if (!rule)
                    return console.error(`${field} 字段不存在` + errMsg());
                properties[field] = {
                    get() {
                        return rule.value;
                    },
                    set(value) {
                        vm.$set(rule, 'value', value);
                    },
                    enumerable: true,
                    configurable: true
                };
            });
            Object.defineProperties(bind, properties);
            return bind;
        },
        submitStatus: (props = {}) => {
            vm._buttonProps(props);
        },
        resetStatus: (props = {}) => {
            vm._resetProps(props);
        },
        btn: {
            loading: (loading = true) => {
                vm._buttonProps({loading: loading});
            },
            finish() {
                this.loading(false);
            },
            disabled: (disabled = true) => {
                vm._buttonProps({disabled: disabled});
            },
            show: (isShow = true) => {
                vm._buttonProps({show: isShow});
            }
        },
        resetBtn: {
            loading: (loading = true) => {
                vm._resetProps({loading: loading});
            },
            finish() {
                this.loading(false);
            },
            disabled: (disabled = true) => {
                vm._resetProps({disabled: disabled});
            },
            show: (isShow = true) => {
                vm._resetProps({show: isShow});
            }
        },
        closeModal: (field) => {
            const handler = fComponent.handlers[field];
            if (handler && handler.$modal) {
                handler.$modal.onClose();
                handler.$modal = null;
            }
        },
        set: (node, field, value) => {
            vm.$set(node, field, value);
        },
        reload: (rules) => {
            fComponent.reload(rules)
        },
        options: (options) => {
            deepExtend(fComponent.options, options);
            vm._sync();
        },
        onSuccess(fn) {
            this.onSubmit(fn);
        },
        onSubmit(fn) {
            this.options({onSubmit: fn});
        },
        sync: (field, callback) => {
            if (fComponent.handlers[field])
                fComponent.handlers[field].render.sync(callback);
        },
        refresh: () => {
            vm._refresh();
        },
        show: (isShow = true) => {
            vm.isShow = !!isShow;
        }
    };
}
