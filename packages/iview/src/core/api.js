import {deepExtend, errMsg, isFunction, isPlainObject, toString} from '@form-create/utils';


export default function getGlobalApi(h) {

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
            field = toString(field);
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
            let parser = h.fieldList[field];
            if (!parser)
                return;
            let fields = parser.root.map(rule => rule.__field__), index = fields.indexOf(toString(field));
            if (index === -1)
                return;
            parser.root.splice(index, 1);
            if (h.sortList.indexOf(parser.id) === -1)
                this.reload();
        },
        validate: (callback) => {
            h.$form.getFormRef().validate((valid) => {
                callback && callback(valid);
            });
        },
        validateField: (field, callback) => {
            if (!h.fieldList[field])
                return;
            h.$form.getFormRef().validateField(field, callback);
        },
        resetFields(fields) {
            let parsers = h.fieldList;
            tidyFields(fields, true).forEach(field => {
                let parser = parsers[field];
                if (!parser) return;

                if (parser.type === 'hidden') return;
                h.vm.$refs[parser.formItemRefName].resetField();
                h.$render.clearCache(parser);
            });
        },
        destroy: () => {
            h.vm.$el.parentNode.removeChild(h.vm.$el);
            h.vm.$destroy();
        },
        fields: () => h.fields(),
        append: (rule, after) => {
            let fields = h.fieldList, index = h.sortList.length;
            after = toString(after);

            if (rule.field && fields.indexOf(toString(rule.field)) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            if (h.fieldList[after]) {
                const parser = h.fieldList[after];
                index = parser.root.indexOf(parser.rule);
            }
            h.rules.splice(index + 1, 0, rule);

        },
        prepend: (rule, after) => {
            let fields = h.fieldList, index = 0;
            after = toString(after);

            if (rule.field && fields.indexOf(toString(rule.field)) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            if (h.fieldList[after]) {
                const parser = h.fieldList[after];
                index = parser.root.indexOf(parser.rule);
            }
            h.rules.splice(index, 0, rule);
        },
        submit(successFn, failFn) {
            this.validate((valid) => {
                if (valid) {
                    let formData = this.formData();
                    if (isFunction(successFn))
                        successFn(formData, this);
                    else
                        h.options.onSubmit && h.options.onSubmit(formData, this);
                } else {
                    failFn && failFn(this)
                }
            });
        },
        hidden(hidden, fields) {
            const hiddenList = h.$render.form.hidden;
            tidyFields(fields, true).forEach((field) => {
                const parser = h.fieldList[field];
                if (!parser)
                    return;
                hidden ? hiddenList.push(parser) : hiddenList.splice(hiddenList.indexOf(parser), 1);
                h.$render.clearCache(parser);
            });
            h.refresh();
        },
        visibility(visibility, fields) {
            const visibilityList = h.$render.form.visibility;
            tidyFields(fields, true).forEach((field) => {
                const parser = h.fieldList[field];
                if (!parser)
                    return;
                visibility ? visibilityList.push(parser) : visibilityList.splice(visibilityList.indexOf(parser), 1);
                h.$render.clearCache(parser);
            });
            h.refresh();
        },
        disabled(disabled, fields) {
            tidyFields(fields, true).forEach((field) => {
                const parser = h.fieldList[field];
                if (!parser)
                    return;
                h.vm.$set(parser.rule.props, 'disabled', !!disabled);
            });
        },
        clearValidateState(fields) {
            tidyFields(fields).forEach(field => {
                const parser = h.fieldList[field];
                if (!parser)
                    return;
                const fItem = h.vm.$refs[parser.formItemRefName];
                if (fItem) {
                    fItem.validateMessage = '';
                    fItem.validateState = '';
                }

            });
        },
        model() {
            return {...h.trueData};
        },
        component() {
            return {...h.customData};
        },
        bind(fields) {
            let bind = {}, properties = {};
            tidyFields(fields).forEach((field) => {
                const parser = h.fieldList[field];
                if (!parser)
                    return console.error(`${field} 字段不存在` + errMsg());
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
            const parser = h.fieldList[field];
            parser && parser.closeModel && parser.closeModel();
        },
        set: (node, field, value) => {
            h.vm.$set(node, field, value);
        },
        reload: (rules) => {
            h.reloadRule(rules)
        },
        updateOptions: (options) => {
            deepExtend(h.options, options);
        },
        onSubmit(fn) {
            this.options({onSubmit: fn});
        },
        sync: (field) => {
            if (h.fieldList[field]) {
                h.$render.clearCache(h.fieldList[field]);
                h.refresh();
            }
        },
        refresh: () => {
            h.$render.clearCacheAll();
            h.refresh();
        },
        show: (isShow = true) => {
            h.vm.isShow = !!isShow;
        }
    };
}
