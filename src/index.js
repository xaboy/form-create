import formCreate from './core/formCreate';

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(formCreate);
}

module.exports.default = module.exports = formCreate;
