import createFormCreate from '@form-create/core';
import drive from './drive'
;

const {FormCreate, install} = createFormCreate(drive);

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
    if (window.Vue) {
        install(window.Vue);
    }
}

const maker = FormCreate.maker;

export {maker}

export default FormCreate;
