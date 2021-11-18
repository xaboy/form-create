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
            return new Promise((resolve, reject) => {
                const forms = api.children;
                const all = [h.$manager.validate()];
                forms.forEach(v => {
                    all.push(v.validate());
                })
                Promise.all(all).then(() => {
                    resolve(true);
                    callback && callback(true);
                }).catch((e) => {
                    reject(e);
                    callback && callback(e);
                })
            });
        },
        validateField(field, callback) {
            return new Promise((resolve, reject) => {
                const sub = h.subForm[field] || [];
                const all = [h.$manager.validateField(field)];
                toArray(sub).forEach(v => {
                    all.push(v.validate());
                })
                Promise.all(all).then(() => {
                    resolve(null);
                    callback && callback(null);
                }).catch((e) => {
                    reject(e);
                    callback && callback(e);
                })
            });
        },
        clearValidateState(fields, clearSub = true) {
            api.helper.tidyFields(fields).forEach(field => {
                if (clearSub) api.clearSubValidateState(field);
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
            return new Promise((resolve, reject) => {
                api.validate().then(() => {
                    let formData = api.formData();
                    is.Function(successFn) && invoke(() => successFn(formData, api));
                    is.Function(h.options.onSubmit) && invoke(() => h.options.onSubmit(formData, api));
                    h.vm.$emit('submit', formData, api);
                    resolve(formData);
                }).catch((...args) => {
                    is.Function(failFn) && invoke(() => failFn(api, ...args));
                    reject(...args)
                })
            });
        },
    });

    return api;
}
