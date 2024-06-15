import VantFormCreate from './core/index';

const FormCreateMobile = VantFormCreate();

if (typeof window !== 'undefined') {
    window.formCreateMobile = FormCreateMobile;
}

const maker = FormCreateMobile.maker;

export {maker}

export default FormCreateMobile;
