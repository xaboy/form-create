import formBuilder from './core/form-builder'

if(typeof window !== 'undefined'){
    window["formBuilder"] = formBuilder;
    if (window.Vue && (window.iview || window.iView)) {
        window.Vue.use(formBuilder);
    }
}

export default formBuilder