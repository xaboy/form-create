import {
    $set,
    debounce,
    deepExtend,
    extend,
    isBool,
    isElement,
    toString,
} from '@form-create/utils';
import coreComponent from './components/coreComponent';
import $FormCreate from './components/component';
import getMixins from './components/mixins';
import getBaseConfig, {formCreateStyleElId, formCreateName} from './config';
import Vue from 'vue';
import {makerFactory} from './index';
import VNode from './factory/vNode';
import Handle from './factory/handle';

export let _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;

export default function createFormCreate(drive) {

    const components = {},
        mixin = getMixins(components), maker = makerFactory(drive.componentList);

    VNode.use(drive.nodes);

    function setComponent(id, component) {
        if (component) {
            return _vue.component(toString(id), component);
        } else if (id)
            return components[toString(id)];
        else
            return {...components};
    }


    function initStyle() {
        if (document.getElementById(formCreateStyleElId) !== null) return;
        let style = document.createElement('style');
        style.id = formCreateStyleElId;
        style.innerText = drive.style;
        document.getElementsByTagName('head')[0].appendChild(style);
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


    class FormCreate {
        constructor(rules, options = {}) {
            this.fCreateApi = undefined;
            this.$parent = undefined;
            this.drive = drive;
            this.vm = undefined;
            this.rules = Array.isArray(rules) ? rules : [];
            initStyle();
            this.options = margeGlobal(options);
            this.$tick = debounce((fn) => fn(), 150);
        }

        beforeCreate(vm) {
            this.vm = vm;
            this.handle = new Handle(this);
        }

        create(Vue) {
            let $fCreate = Vue.extend(coreComponent(this)), $vm = new $fCreate().$mount();
            this.options.el.appendChild($vm.$el);
            return $vm;
        }

        $emit(eventName, ...params) {
            if (this.$parent) {
                this.$parent.$emit(`fc:${eventName}`, ...params);
            } else {
                this.vm.$emit(eventName, ...params);
            }
        }

        static create(rules, _opt = {}, $parent = undefined) {
            let opt = isElement(_opt) ? {el: _opt} : _opt;
            let fComponent = new FormCreate(rules, opt),
                $vm = fComponent.create(_vue);
            fComponent.$parent = $parent;
            return fComponent.fCreateApi;
        }

        static install(Vue) {
            const $formCreate = function (rules, opt = {}) {
                return FormCreate.create(rules, opt, this);
            };

            $formCreate.maker = maker;
            $formCreate.version = drive.version;
            $formCreate.ui = drive.ui;
            $formCreate.component = setComponent;
            Vue.prototype.$formCreate = $formCreate;

            Vue.component(formCreateName, Vue.extend($FormCreate(FormCreate, mixin)));
            _vue = Vue;
        }

        static init(rules, _opt = {}) {
            let opt = isElement(_opt) ? {el: _opt} : _opt;
            let fComponent = new FormCreate(rules, opt);
            let $fCreate = _vue.extend(coreComponent(fComponent, mixin));
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

    FormCreate.version = drive.version;
    FormCreate.ui = drive.ui;
    FormCreate.component = setComponent;
    FormCreate.maker = maker;

    function install(Vue) {
        if (Vue._installedFormCreate === true) return;
        Vue._installedFormCreate = true;
        Vue.use(FormCreate);
    }

    components['form-create'] = _vue.extend($FormCreate(FormCreate, mixin));

    return {
        FormCreate,
        install
    };
}