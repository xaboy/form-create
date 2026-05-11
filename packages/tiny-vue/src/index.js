import tinyVueFormCreate from './core/index';

const FormCreate = tinyVueFormCreate();

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
}

const maker = FormCreate.maker;

export {maker};

export default FormCreate;
