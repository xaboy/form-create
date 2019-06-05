import {
    $set,
    deepExtend,
    extend,
    isBool,
    isElement,
    toString,
} from '@form-create/utils';
import coreComponent from '../components/coreComponent';
import $FormCreate from '../components/component';
import getBaseConfig, {formCreateName} from './config';
import Vue from 'vue';
import makerFactory from '../factory/maker';
import Handle from './handle';
import {creatorFactory} from '../factory/creator';

export let _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;

export default function createFormCreate(drive) {

    const components = {}, parsers = {}, maker = makerFactory();


    function setParser(id, parser) {
        id = toString(id);
        parsers[id.toLocaleLowerCase()] = parser;
        FormCreate.maker[id] = creatorFactory(id);
    }

    function component(id, component) {
        id = toString(id);
        const _id = id.toLocaleLowerCase();
        if (_id === 'form-create' || _id === 'formcreate')
            return _vue.extend($FormCreate(FormCreate, components));
        if (component === undefined)
            return components[toString(id)];
        else
            components[toString(id)] = component;
    }

    function margeGlobal(_options) {
        if (isBool(_options.sumbitBtn))
            $set(_options, 'sumbitBtn', {show: _options.sumbitBtn});
        if (isBool(_options.resetBtn))
            $set(_options, 'resetBtn', {show: _options.resetBtn});
        let options = deepExtend(extend(drive.getConfig(), getBaseConfig()), _options);

        $set(options, 'el', !options.el
            ? window.document.body
            : (isElement(options.el)
                ? options.el
                : document.querySelector(options.el)
            ));

        return options;
    }

    function bindAttr(FormCreate) {
        extend(FormCreate, {
            version: drive.version,
            ui: drive.ui,
            maker,
            component,
            setParser
        });
    }

    class FormCreate {
        constructor(rules, options = {}) {
            this.fCreateApi = undefined;
            this.drive = drive;
            this.parsers = parsers;
            this.vm = undefined;
            this.rules = Array.isArray(rules) ? rules : [];
            this.options = margeGlobal(options);
        }

        beforeCreate(vm) {
            this.vm = vm;
            this.handle = new Handle(this);
        }

        $emit(eventName, ...params) {
            if (this.$parent) {
                this.$parent.$emit(`fc:${eventName}`, ...params);
            } else {
                this.vm.$emit(eventName, ...params);
            }
        }

        static create(rule, _opt = {}) {

            let $vm = new _vue({
                data() {
                    return {rule: rule, option: isElement(_opt) ? {el: _opt} : _opt};
                },
                render() {
                    return <form-create ref='fc' props={this.$data}/>
                }
            });

            $vm.$mount();
            $vm.$refs.fc._fc.options.el.appendChild($vm.$el);

            return $vm.$refs.fc._fc.handle.fCreateApi;
        }

        static install(Vue) {
            const $formCreate = function (rules, opt = {}) {
                return FormCreate.create(rules, opt);
            };

            bindAttr($formCreate);

            Vue.prototype.$formCreate = $formCreate;

            Vue.component(formCreateName, Vue.extend($FormCreate(FormCreate, components)));
            _vue = Vue;
        }

        static init(rules, _opt = {}) {
            let opt = isElement(_opt) ? {el: _opt} : _opt;
            let fComponent = new FormCreate(rules, opt);
            let $fCreate = _vue.extend(coreComponent(fComponent, components));
            let $vm = new $fCreate().$mount();

            return {
                mount($el) {
                    if ($el && isElement($el))
                        $set(fComponent.options, 'el', $el);

                    fComponent.options.el.appendChild($vm.$el);

                    return fComponent.fCreateApi;
                },
                remove() {
                    fComponent.options.el.removeChild($vm.$el);
                },
                $f: fComponent.fCreateApi
            };
        }
    }

    // FormCreate.version = drive.version;
    // FormCreate.ui = drive.ui;
    // FormCreate.component = component;
    // FormCreate.maker = maker;
    // FormCreate.setParser = setParser;
    bindAttr(FormCreate);


    drive.components.forEach(component => {
        FormCreate.component(component.name, component);
    });

    drive.parsers.forEach(({name, parser}) => {
        FormCreate.setParser(name, parser);
    });

    Object.keys(drive.makers).forEach(name => {
        FormCreate.maker[name] = drive.makers[name];
    });

    function install(Vue) {
        if (Vue._installedFormCreate === true) return;
        Vue._installedFormCreate = true;
        Vue.use(FormCreate);
    }

    return {
        FormCreate,
        install
    };
}