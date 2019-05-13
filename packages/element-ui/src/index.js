import createFormCreate from '@form-create/core';
import diver from './diver';

const {FormCreate, install} = createFormCreate(diver);

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
    if (window.Vue) {
        install(Vue);
    }
}

const maker = FormCreate.maker;

export {maker}

export default FormCreate;
