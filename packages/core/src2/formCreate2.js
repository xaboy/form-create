import {
    $del,
    $nt,
    $set,
    debounce,
    deepExtend,
    errMsg,
    extend,
    isBool,
    isElement,
    isFunction,
    isString,
    isValidChildren,
    toString,
    uniqueId
} from '@form-create/utils';
import coreComponent from './components/coreComponent';
import $FormCreate from './components/component';
import Handler from './factory/handler';
import Render from './factory/render';
import getMixins from './components/mixins';
import getBaseConfig, {formCreateStyleElId, formCreateName} from './config';
import Vue from 'vue';
import {makerFactory} from './index';
import VNode from './factory/vNode';
import Handle from './factory/handle';

export let _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;

export function getDefComponent() {
    return {
        handler: Handler,
        render: Render,
        noValue: true
    };
}

export function getRule(rule) {
    if (isFunction(rule.getRule)) return rule.getRule();
    else return rule;
}

export function bindHandler(rule, handler) {
    Object.defineProperties(rule, {
        __field__: {
            value: handler.field,
            enumerable: false,
            configurable: false
        },
        __handler__: {
            value: handler,
            enumerable: false,
            configurable: false
        }
    });
}

export function delHandler(handler) {
    handler.watch.forEach((unWatch) => unWatch());
    handler.watch = [];
    handler.deleted = true;
}


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

    function getComponent(fc, rule) {
        let name = toString(rule.type).toLowerCase(),
            component = isComponent(name)
                ? drive.componentList[name] : getDefComponent();

        return new component.handler(fc, rule, component.render, component.noValue);
    }

    function isComponent(type) {
        return drive.componentList[type] !== undefined;
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
            this.fRender = undefined;
            this.fCreateApi = undefined;
            this.$parent = undefined;
            this.id = uniqueId();
            this.__init(rules, options);
            initStyle();
            this.$tick = debounce((fn) => fn(), 150);
        }

        __init(rules, options) {
            this.options = margeGlobal(options);
            this.rules = Array.isArray(rules) ? rules : [];
            this.origin = [...this.rules];
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

        render() {
            return this.fRender.render(this.vm);
        }

        beforeBoot(vm) {
            this.vm = vm;
            this.handle = new Handle(this, drive.components, drive.formRender(this));
        }

        boot() {
            this.handle.boot();
            if (this.fCreateApi === undefined) this.fCreateApi = drive.getGlobalApi(this);
            this.fCreateApi.rule = this.rules;
            this.fCreateApi.config = this.options;
        }


        setHandler(parser) {
            this.handle.setParser(parser);

        }

        notField(field) {
            return this.handle.notField(field);
        }

        create(Vue) {
            let $fCreate = Vue.extend(coreComponent(this)), $vm = new $fCreate().$mount();
            this.options.el.appendChild($vm.$el);
            return $vm;
        }

        mounted() {
            this.handle.mounted(this.fCreateApi);

        }

        $emit(eventName, ...params) {
            if (this.$parent) {
                this.$parent.$emit(`fc:${eventName}`, ...params);
            } else {
                this.vm.$emit(eventName, ...params);
            }
        }

        removeField(field) {
            this.handle.removeField(field);
        }

        addHandlerWatch(handler) {
            this.handle.addParserWitch(handler);
        }

        reload(rules) {
            const vm = this.vm;
            if (!rules) return this.reload(this.rules);
            if (!this.origin.length) this.fCreateApi.refresh();
            this.origin = [...rules];

            Object.keys(this.handlers).forEach(field => this.removeField(field));

            this.__init(rules, this.options);
            this.beforeBoot(vm);
            this.boot();
            vm.__init();

            $nt(() => {
                this.handle.reload(this.fCreateApi);
            });

            vm.$f = this.fCreateApi;
        }

        getFormRef() {
            return this.vm.$refs[this.fRender.refName];
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