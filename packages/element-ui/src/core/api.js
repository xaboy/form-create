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
            let fields = parser.root.map(rule => rule.__field__), index = fields.indexOf(field);
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
                h.$render.clearCache(parser, true);
            });
        },
        destroy: () => {
            h.vm.$el.parentNode.removeChild(h.vm.$el);
            h.vm.$destroy();
        },
        fields: () => h.fields(),
        append: (rule, after, isChild) => {
            let fields = h.fieldList, index = h.sortList.length, rules = h.rules;

            if (rule.field && fields.indexOf(rule.field) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            const parser = h.getParser(after);

            if (parser) {
                if (isChild) {
                    rules = parser.rule.children;
                    index = parser.rule.children.length;
                } else {
                    index = parser.root.indexOf(parser.rule);
                }
            }
            rules.splice(index + 1, 0, rule);
        },
        prepend: (rule, after, isChild) => {
            let fields = h.fieldList, index = 0, rules = h.rules;

            if (rule.field && fields.indexOf(rule.field) !== -1)
                return console.error(`${rule.field} 字段已存在` + errMsg());

            const parser = h.getParser(after);

            if (parser) {
                if (isChild) {
                    rules = parser.rule.children;
                } else {
                    index = parser.root.indexOf(parser.rule);
                }
            }
            rules.splice(index, 0, rule);
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
        hidden(hidden, fields) {
            const hiddenList = h.$form.hidden;
            tidyFields(fields, true).forEach((field) => {
                const parser = h.getParser(field);
                if (!parser)
                    return;
                if (hidden && hiddenList.indexOf(parser) === -1) {
                    hiddenList.push(parser)
                } else if (!hidden && hiddenList.indexOf(parser) !== -1) {
                    hiddenList.splice(hiddenList.indexOf(parser), 1)
                }
                h.$render.clearCache(parser, true);
            });
            h.refresh();
        },
        hiddenStatus(id) {
            const parser = h.getParser(id);
            return h.$form.hidden.indexOf(parser) !== -1;
        },
        visibility(visibility, fields) {
            const visibilityList = h.$form.visibility;
            tidyFields(fields, true).forEach((field) => {
                const parser = h.getParser(field);
                if (!parser)
                    return;

                if (visibility && visibilityList.indexOf(parser) === -1) {
                    visibilityList.push(parser)
                } else if (!visibility && visibilityList.indexOf(parser) !== -1) {
                    visibilityList.splice(visibilityList.indexOf(parser), 1)
                }
                h.$render.clearCache(parser, true);
            });
            h.refresh();
        },
        visibilityStatus(id) {
            const parser = h.getParser(id);
            return h.$form.visibility.indexOf(parser) !== -1;
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
            this.options({onSubmit: fn});
        },
        sync: (field) => {
            const parser = h.getParser(field);
            if (parser) {
                h.$render.clearCache(parser, true);
                h.refresh(true);
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
        method(id, name) {
            const parser = h.getParser(id);
            return (...args) => {
                parser.el[name](args);
            }
        }
    };
}
