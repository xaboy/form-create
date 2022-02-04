import arcoFormCreate from './core/index';

const FormCreate = arcoFormCreate();

if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;
}

const maker = FormCreate.maker;

export {maker}

export default FormCreate;
