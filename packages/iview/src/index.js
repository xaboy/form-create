import createFormCreate from '@form-create/core';
import diver from './diver';

const formCreate = createFormCreate(diver);

if (typeof window !== 'undefined') {
    window.formCreate = formCreate;

    if (window.Vue) {
        install(Vue);
    }
}

const maker = formCreate.maker;

export {maker}

export default formCreate;
