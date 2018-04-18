import formCreate from './form-create'

if(typeof window !== 'undefined'){
    window["formCreate"] = formCreate;
    if (window.Vue && (window.iview || window.iView)) {
        window.Vue.use(formCreate);
    }
}

export default formCreate