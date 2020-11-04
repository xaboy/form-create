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

export default function createFormCreate(config) {

    const components = {
            [fragment.name]: fragment
        },
        filters = {},
        parsers = {},
        maker = makerFactory(),
        globalConfig = {},
        data = {},
        modelEvents = {};

    function createParser(proto) {
        class Parser extends BaseParser {

        }

        Object.assign(Parser.prototype, proto);
        return Parser;
    }

    function filter(id) {
        let filter;
        if (arguments.length === 1) {
            filter = id;
            id = filter.name;
        } else {
            filter = arguments[1];
        }
        if (id && filter) filters[id] = filter;
    }

    function parser(id) {
        let parser;
        if (arguments.length === 1) {
            parser = id;
            id = parser.name;
        } else {
            parser = arguments[1];
        }
        var name = toCase(id);
        if (!parser || !name) return;
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
            } else
                components[name] = component;
        } else {
            name = toCase(id.name);
            component = id;
            components[name] = component;
        }
        if (component.formCreateParser && name) parser(name, component.formCreateParser);
    }

    function $form() {
        return _vue.extend($FormCreate(FormCreate));
    }

    function getEl(options) {
        return (!options || !options.el)
            ? window.document.body
            : (is.Element(options.el)
                ? options.el
                : document.querySelector(options.el)
            );
    }

    function useAttr(formCreate) {
        extend(formCreate, {
            version: config.version,
            ui: config.ui,
            data,
            maker,
            component,
            filter,
            parser,
            setModel,
            createParser,
            copyRule,
            copyRules,
            $form,
            parseJson
        });
    }

    function create(rules, option) {
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


    function useStatic(FormCreate) {
        extend(FormCreate, {
            create(rules, _opt = {}, parent) {
                let $vm = create(rules, _opt);
                const _this = $vm.$refs.fc.formCreate;
                _this.$parent = parent;
                getEl(_this.options).appendChild($vm.$el);
                return _this.handle.api;
            },
            install(Vue, options) {
                if (options && is.Object(options))
                    deepExtend(options, globalConfig);

                if (Vue._installedFormCreate === true) return;
                Vue._installedFormCreate = true;
                _vue = Vue;

                const $formCreate = function (rules, opt = {}) {
                    return FormCreate.create(rules, opt, this);
                };

                useAttr($formCreate);

                Vue.prototype.$formCreate = $formCreate;
                Vue.component('FormCreate', $form());
                Vue.component(fragment.name, _vue.extend(fragment));
            },
            init(rules, _opt = {}) {
                let $vm = create(rules, _opt), formCreate = $vm.$refs.fc.formCreate;
                return {
                    mount($el) {
                        if ($el && is.Element($el))
                            formCreate.options.el = $el;
                        getEl(formCreate.options).appendChild($vm.$el);
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


    class FormCreate {
        constructor(vm, rules, options = {}) {
            this.vm = vm;
            this.manager = config.manager;
            this.parsers = parsers;
            this.modelEvents = modelEvents;
            this.rules = Array.isArray(rules) ? rules : [];
            this.options = deepExtend({formData: {}}, globalConfig);
            this.updateOptions(options);
            this.components = components;
            this.filters = filters;
        }

        updateOptions(options) {
            //todo 继承方式,检查全局配置污染
            this.options = deepExtendArgs(this.options, options);
        }

        created() {
            this.handle = new Handle(this);
            this.handle.created();
        }

        api() {
            return this.handle.api;
        }

        render() {
            return this.handle.run();
        }

        mounted() {
            this.handle.lifecycle('mounted');
        }

        $emit(eventName, ...params) {
            if (this.$parent)
                this.$parent.$emit(`fc:${eventName}`, ...params);
            this.vm.$emit(eventName, ...params);
        }
    }

    useAttr(FormCreate);
    useStatic(FormCreate);

    // if (drive.modelEvents) {
    //     Object.keys(drive.modelEvents).forEach((name) => setModel(name, drive.modelEvents[name]));
    // }

    return FormCreate;
}
