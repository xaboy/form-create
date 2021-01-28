import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {invoke} from '@form-create/core/src/frame/util';

function tidyBtnProp(btn, def) {
    if (is.Boolean(btn))
        btn = {show: btn};
    else if (!is.Undef(btn) && !is.Object(btn)) btn = {show: def};
    return btn;
}

export default function extendApi(api, h) {
    extend(api, {
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
                    else callback && callback(true);
                } else {
                    if (!state) {
                        callback && callback(false);
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
            if (!h.fieldCtx[field])
                return;
            h.$manager.validateField(field, callback);
        },
        clearValidateState(fields, clearSub = true) {
            api.helper.tidyFields(fields).forEach(field => {
                if (clearSub) this.clearSubValidateState(field);
                const ctx = h.fieldCtx[field];
                if (!ctx) return;
                h.$manager.clearValidateState(ctx);
            });
        },
        clearSubValidateState(fields) {
            api.helper.tidyFields(fields).forEach(field => {
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
        submitBtnProps: (props = {}) => {
            let btn = tidyBtnProp(h.options.submitBtn, true);
            extend(btn, props);
            h.options.submitBtn = btn;
            api.refreshOptions();
        },
        resetBtnProps: (props = {}) => {
            let btn = tidyBtnProp(h.options.resetBtn, false);
            extend(btn, props);
            h.options.resetBtn = btn;
            api.refreshOptions();
        },
        submit(successFn, failFn) {
            api.validate((valid) => {
                if (valid) {
                    let formData = api.formData();
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
    });

    return api;
}