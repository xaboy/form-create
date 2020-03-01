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
        validate(callback) {
            let state = false;
            let subForm = {
                ...{
                    ___this: {
                        validate(call) {
                            h.$form.getFormRef().validate((valid) => {
                                call && call(valid);
                            });
                        }
                    }
                }, ...h.subForm,
            };
            let keys = Object.keys(subForm), len = keys.length, subLen;

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
        clearValidateState(fields, clearSub = true) {
            tidyFields(fields).forEach(field => {
                if (clearSub) this.clearSubValidateState(fields);
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
        clearSubValidateState(fields) {
            tidyFields(fields).forEach(field => {
                const subForm = h.subForm[field];
                if (subForm) {
                    if (Array.isArray(subForm)) {
                        subForm.forEach(form => {
                            form.clearValidateState();
                        })
                    } else {
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
        },
    };
}
