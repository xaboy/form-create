import formCreate from './core/formCreate';

if(typeof window !== 'undefined'){
    window["formCreate"] = formCreate;
    if (window.Vue && (window.iview || window.iView)) {
        window.Vue.use(formCreate);
    }
}

module.exports.default = module.exports = formCreate;