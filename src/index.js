/**
 *
 * JS表单生成器
 * Author: xaboy
 * Github: https://github.com/xaboy/form-create
 */

import formCreate from './core/formCreate';

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(formCreate);
}

module.exports.default = module.exports = formCreate;
