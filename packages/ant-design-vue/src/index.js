import antdvFormCreate from './core/index';

const FormCreate = antdvFormCreate();

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
}

const maker = FormCreate.maker;

export {maker}

export default FormCreate;
