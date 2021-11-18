import elmFormCreate from './core/index';

const FormCreate = elmFormCreate();

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
}

const maker = FormCreate.maker;

export {maker}

export default FormCreate;
