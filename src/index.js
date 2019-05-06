/**
 *
 * JS表单生成器 | iviewUI 版本
 * Author: xaboy
 * Github: https://github.com/xaboy/form-create
 * Document: http://www.form-create.com
 */

import formCreate, {install, setDrive} from './core/formCreate';
import drive from './components/iview/index'

setDrive(drive);

if (typeof window !== 'undefined') {
    window.formCreate = formCreate;

    if (window.Vue) {
        install(Vue);
    }
}

const maker = formCreate.maker;

export {maker}

export default formCreate;
