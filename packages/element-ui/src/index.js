import elmFormCreate from './core/index';

const FormCreate = elmFormCreate();

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
    if (window.Vue) {
        FormCreate.install(window.Vue);
    }
}

const maker = FormCreate.maker;

export {maker}

export default FormCreate;
