import antdvNextFormCreate from './core/index';

const FormCreate = antdvNextFormCreate();

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
}

const maker = FormCreate.maker;

export {maker}

export default FormCreate;
