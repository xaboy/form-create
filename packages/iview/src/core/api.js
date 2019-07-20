import {isFunction} from '@form-create/utils';

export default function getGlobalApi(h, baseApi) {

    function tidyFields(fields, all = false) {
        if (!fields)
            fields = all ? Object.keys(h.fieldList) : h.fields();
        else if (!Array.isArray(fields))
            fields = [fields];
        return fields;
    }

    return {
        ...baseApi,
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
    };
}
