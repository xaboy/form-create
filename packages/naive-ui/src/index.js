import naiveFormCreate from './core/index';

const FormCreate = naiveFormCreate();

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
}

const maker = FormCreate.maker;

export {maker}

export default FormCreate;
