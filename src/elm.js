/**
 *
 * JS表单生成器
 * Author: xaboy
 * Github: https://github.com/xaboy/form-create
 */

import formCreate, {setDrive} from './core/formCreate';
import drive from './components/element/install'

setDrive(drive);

function _install(Vue) {
    if (Vue._installedFormCreate === true) return;
    Vue._installedFormCreate = true;
    Vue.use(formCreate);
}

if (typeof window !== 'undefined') {
    window.formCreate = formCreate;

    if (window.Vue) {
        _install(Vue);
    }
}


export default formCreate;
