import {
    $set,
    deepExtend,
    extend,
    isBool,
    isElement,
    toString,
    isPlainObject
} from '@form-create/utils';
import $FormCreate from '../components/formCreate';
import {formCreateName} from '../components/formCreate';
import Vue from 'vue';
import makerFactory from '../factory/maker';
import Handle from './handle';
import {creatorFactory} from '../factory/creator';
import BaseParser from '../factory/parser';
import {parseJson, copyRule, copyRules} from './util';
import fragment from '../components/fragment';

export let _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;

export default function createFormCreate(drive) {

    const components = {
            [fragment.name]: fragment
        }, parsers = {}, maker = makerFactory(), globalConfig = drive.getConfig(), data = {},
        modelEvents = {};

    function setParser(id, parser) {
        id = toString(id);
        parsers[id.toLocaleLowerCase()] = parser;
        FormCreate.maker[id] = creatorFactory(id);
    }

    function setModel(id, model) {
        modelEvents[id.toLocaleLowerCase()] = model;
    }

    function createParser() {
        return class Parser extends BaseParser {
        }
    }

    function component(id, component) {
        id = toString(id);
        const _id = id.toLocaleLowerCase();
        if (_id === 'form-create' || _id === 'formcreate')
            return get$FormCreate();
        if (component === undefined)
            return components[id];
        else
            components[id] = component;
    }

    function margeGlobal(config, _options) {
        if (isBool(_options.submitBtn))
            _options.submitBtn = {show: _options.submitBtn};

        if (isBool(_options.resetBtn))
            _options.resetBtn = {show: _options.resetBtn};

        let options = deepExtend(config, _options);

        $set(options, 'el', !options.el
            ? window.document.body
            : (isElement(options.el)
                ? options.el
                : document.querySelector(options.el)
            ));

        return options;
    }

    function get$FormCreate() {
        return _vue.extend($FormCreate(FormCreate, components));
    }


    function bindAttr(formCreate) {
        extend(formCreate, {
            version: drive.version,
            ui: drive.ui,
            maker,
            component,
            setParser,
            createParser,
            data,
            copyRule,
            copyRules,
            $form() {
                return get$FormCreate();
            },
            parseJson(json) {
                return parseJson(json);
            }
        });
    }

    function create(rules, option) {
        const $vm = new _vue({
            data() {
                return {rule: rules, option: isElement(option) ? {el: option} : option};
            },
            render() {
                return <form-create ref='fc' props={this.$data}/>
            }
        });
        $vm.$mount();
        return $vm;
    }

    class FormCreate {
        constructor(rules, options = {}) {
            this.fCreateApi = undefined;
            this.drive = drive;
            this.parsers = parsers;
            this.modelEvents = modelEvents;
            this.vm = undefined;
            this.rules = Array.isArray(rules) ? rules : [];
            this.options = margeGlobal(deepExtend({formData: {}}, globalConfig), options);
        }

        beforeCreate(vm) {
            this.vm = vm;
            this.handle = new Handle(this);
        }

        created() {
            this.handle.created();
        }

        api() {
            return this.handle.fCreateApi;
        }

        render() {
            return this.handle.run();
        }

        mounted() {
            this.handle.mounted();
        }

        $emit(eventName, ...params) {
            if (this.$parent)
                this.$parent.$emit(`fc:${eventName}`, ...params);

            this.vm.$emit(eventName, ...params);
        }

        static create(rules, _opt = {}, parent) {

            let $vm = create(rules, _opt);

            const _this = $vm.$refs.fc.formCreate;
            _this.parent = parent;
            _this.options.el.appendChild($vm.$el);

            return _this.handle.fCreateApi;
        }

        static install(Vue, options) {
            if (options && isPlainObject(options))
                margeGlobal(globalConfig, options);

            if (Vue._installedFormCreate === true) return;
            Vue._installedFormCreate = true;

            const $formCreate = function (rules, opt = {}) {
                return FormCreate.create(rules, opt, this);
            };

            bindAttr($formCreate);

            Vue.prototype.$formCreate = $formCreate;

            Vue.component(formCreateName, get$FormCreate());
            Vue.component(fragment.name, _vue.extend(fragment));
            _vue = Vue;
        }

        static init(rules, _opt = {}) {
            let $vm = create(rules, _opt), formCreate = $vm.$refs.fc.formCreate;

            return {
                mount($el) {
                    if ($el && isElement($el))
                        formCreate.options.el = $el;
                    formCreate.options.el.appendChild($vm.$el);
                    return formCreate.handle.fCreateApi;
                },
                remove() {
                    formCreate.options.el.removeChild($vm.$el);
                },
                destroy() {
                    this.remove();
                    $vm.$destroy();
                },
                $f: formCreate.handle.fCreateApi
            };
        }
    }

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

    if (drive.modelEvents) {
        Object.keys(drive.modelEvents).forEach((name) => setModel(name, drive.modelEvents[name]));
    }

    return {
        FormCreate,
        install: FormCreate.install
    };
}
