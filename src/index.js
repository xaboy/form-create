/**
 *
 * JS表单生成器
 * Author: xaboy
 * Github: https://github.com/xaboy/form-create
 */

import formCreate from './core/formCreate';

export function install(Vue) {
    if (Vue._installedFormCreate === true) return;
    Vue._installedFormCreate = true;
    Vue.use(formCreate);
}

if (typeof window !== 'undefined') {
    window.formCreate = formCreate;

    if (window.Vue) {
        install(Vue);
    }
}

export default formCreate;
