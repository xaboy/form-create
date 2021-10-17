import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {invoke} from '@form-create/core/src/frame/util';
import toArray from '@form-create/utils/lib/toarray';

function tidyBtnProp(btn, def) {
    if (is.Boolean(btn))
        btn = {show: btn};
    else if (!is.Undef(btn) && !is.Object(btn)) btn = {show: def};
    return btn;
}

export default function extendApi(api, h) {
    extend(api, {
        validate(callback) {
            let flag;
            const forms = api.children;
            let len = forms.length;
            const validate = () => {
                h.$manager.validate((...args) => {
                    if (!args[0] || !flag) {
                        flag = args;
                    }
                    callback && callback(...flag);
                });
            };

            const validFn = (args) => {
                setTimeout(() => {
                    if (!args[0]) {
                        if (!flag) {
                            flag = args;
                        }
                    }
                    if (!--len) {
                        validate();
                    }
                });
            };

            forms.forEach(form => {
                form.validate((...args) => validFn(args))
            })

            if (!len) {
                validate();
            }
        },
        validateField: (field, callback) => {
            const ctx = h.getFieldCtx(field);
            if (!ctx) return;
            const sub = h.subForm[ctx.id];
            let len = 0;
            let flag;
            const validate = () => {
                h.$manager.validateField(ctx.id, (...args) => {
                    if (args[0]) {
                        flag = args;
                    } else if (flag) {
                        return callback && callback('子表单验证未通过', flag[1]);
                    }
                    callback && callback(...flag || args);
                });
            };
            const validFn = (args) => {
                setTimeout(() => {
                    if (!args[0]) {
                        if (!flag) {
                            flag = args;
                        }
                    }
                    if (!--len) {
                        validate();
                    }
                });
            };
            sub && toArray(sub).forEach(form => {
                len++;
                form.validate((...args) => validFn(args))
            });

            if (!len) {
                validate();
            }
        },
        clearValidateState(fields, clearSub = true) {
            api.helper.tidyFields(fields).forEach(field => {
                if (clearSub) this.clearSubValidateState(field);
                h.getCtxs(field).forEach(ctx => {
                    h.$manager.clearValidateState(ctx);
                });
            });
        },
        clearSubValidateState(fields) {
            api.helper.tidyFields(fields).forEach(field => {
                h.getCtxs(field).forEach(ctx => {
                    const subForm = h.subForm[ctx.id];
                    if (!subForm) return;
                    if (Array.isArray(subForm)) {
                        subForm.forEach(form => {
                            form.clearValidateState();
                        })
                    } else if (subForm) {
                        subForm.clearValidateState();
                    }
                });
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
                        invoke(() => successFn(formData, this));
                    else {
                        is.Function(h.options.onSubmit) && invoke(() => h.options.onSubmit(formData, this));
                        h.vm.$emit('submit', formData, this);
                    }
                } else {
                    is.Function(failFn) && invoke(() => failFn(this, ...arguments));
                }
            });
        },
    });

    return api;
}
