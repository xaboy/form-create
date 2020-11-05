import $FormCreate from '../components/formCreate';
import Vue from 'vue';
import makerFactory from '../factory/maker';
import Handle from './handle';
import {creatorFactory} from '../factory/creator';
import BaseParser from '../factory/parser';
import {copyRule, copyRules, parseJson} from './util';
import fragment from '../components/fragment';
import is from '@form-create/utils/lib/type';
import toCase from '@form-create/utils/lib/tocase';
import extend from '@form-create/utils/lib/extend';
import deepExtend, {deepExtendArgs} from '@form-create/utils/lib/deepextend';

export let _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;

function _parseProp(id) {
    let prop;
    if (arguments.length === 1) {
        prop = arguments[0];
        id = prop.name;
    } else {
        prop = arguments[1];
    }
    return {id, prop};
}

function _getEl(options) {
    if (!options || !options.el) return window.document.body;
    return is.Element(options.el)
        ? options.el
        : document.querySelector(options.el);
}

function mountForm(rules, option) {
    const $vm = new _vue({
        data() {
            //todo 外部无法修改
            return {rule: rules, option: option || {}};
        },
        render(h) {
            return h('FormCreate', {ref: 'fc', props: this.$data});
        }
    });
    $vm.$mount();
    return $vm;
}

function createParser(proto) {
    class Parser extends BaseParser {

    }

    Object.assign(Parser.prototype, proto);
    return Parser;
}

export default function createFormCreate(config) {

    const components = {
        [fragment.name]: fragment
    };
    const filters = {};
    const parsers = {};
    const directives = {};
    const maker = makerFactory();
    const globalConfig = {};
    const data = {};
    const modelEvents = {};

    function filter() {
        const data = _parseProp(...arguments);
        if (data.id && data.prop) filters[data.id] = data.prop;
    }

    function directive() {
        const data = _parseProp(...arguments);
        if (data.id && data.prop) directives[data.id] = data.prop;
    }

    function parser() {
        const data = _parseProp(...arguments);
        if (!data.id || !data.prop) return;
        const name = toCase(data.id);
        const parser = data.prop;
        //todo 浅拷贝
        parsers[name] = is.Function(parser) ? parser : createParser(parser);
        maker[name] = creatorFactory(name);
        parser.maker && extend(maker, parser.maker);
    }

    function setModel(id, model) {
        modelEvents[toCase(id)] = model;
    }

    function component(id, component) {
        let name;
        if (is.String(id)) {
            name = toCase(id);
            if (['form-create', 'formcreate'].indexOf(name) > -1) {
                return $form();
            } else if (component === undefined) {
                return components[name];
            }
        } else {
            name = toCase(id.name);
            component = id;
        }
        if (!name || !component) return;
        components[name] = component;
        if (component.formCreateParser) parser(name, component.formCreateParser);
    }

    function $form() {
        return _vue.extend($FormCreate(FormCreate));
    }

    function create(rules, _opt, parent) {
        let $vm = mountForm(rules, _opt || {});
        const _this = $vm.$refs.fc.formCreate;
        _this.$parent = parent;
        _getEl(_this.options).appendChild($vm.$el);
        return _this.handle.api;
    }

    function useAttr(formCreate) {
        extend(formCreate, {
            version: config.version,
            ui: config.ui,
            data,
            maker,
            component,
            filter,
            directive,
            parser,
            setModel,
            createParser,
            copyRule,
            copyRules,
            $form,
            parseJson
        });
    }

    function useStatic(FormCreate) {
        extend(FormCreate, {
            create,
            install(Vue, options) {
                if (options && is.Object(options))
                    deepExtend(options, globalConfig);

                if (Vue._installedFormCreate === true) return;
                Vue._installedFormCreate = true;
                _vue = Vue;

                const $formCreate = function (rules, opt = {}) {
                    return create(rules, opt, this);
                };

                useAttr($formCreate);

                Vue.prototype.$formCreate = $formCreate;
                Vue.component('FormCreate', $form());
            },
            init(rules, _opt = {}) {
                let $vm = mountForm(rules, _opt), formCreate = $vm.$refs.fc.formCreate;
                return {
                    mount($el) {
                        if ($el && is.Element($el))
                            formCreate.options.el = $el;
                        _getEl(formCreate.options).appendChild($vm.$el);
                        return formCreate.handle.api;
                    },
                    remove() {
                        $vm.$el.parentNode && $vm.$el.parentNode.removeChild($vm.$el);
                    },
                    destroy() {
                        this.remove();
                        $vm.$destroy();
                    },
                    $f: formCreate.handle.api
                };
            }
        })
    }


    function FormCreate(vm, rules, options) {
        this.vm = vm;
        this.manager = config.manager;
        this.parsers = parsers;
        this.modelEvents = modelEvents;
        this.rules = Array.isArray(rules) ? rules : [];
        this.options = deepExtend({formData: {}}, globalConfig);
        this.updateOptions(options || {});
        this.prop = {
            components,
            filters,
            directives,
        }
    }

    extend(FormCreate.prototype, {
        updateOptions(options) {
            //todo 继承方式,检查全局配置污染
            this.options = deepExtendArgs(this.options, options);
        },
        created() {
            this.handle = new Handle(this);
            this.handle.created();
        },
        api() {
            return this.handle.api;
        },
        render() {
            return this.handle.run();
        },
        mounted() {
            this.handle.lifecycle('mounted');
        },
        $emit(eventName, ...params) {
            if (this.$parent)
                this.$parent.$emit(`fc:${eventName}`, ...params);
            this.vm.$emit(eventName, ...params);
        }
    })

    useAttr(create);
    useStatic(create);

    return create;
}
