/**
 *
 * JS表单生成器 | iviewUI 版本
 * Author: xaboy
 * Github: https://github.com/xaboy/form-create
 */

import formCreate, {setDrive, install} from './core/formCreate';
import drive from './components/iview/index'

setDrive(drive);

if (typeof window !== 'undefined') {
    window.formCreate = formCreate;

    if (window.Vue) {
        install(Vue);
    }
}


export default formCreate;
