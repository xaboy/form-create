import $FormCreate from '../components/formCreate';
import Vue from 'vue';
import makerFactory from '../factory/maker';
import Handle from '../handler';
import fetch from './fetch';
import {creatorFactory} from '..';
import BaseParser from '../factory/parser';
import {copyRule, copyRules, mergeGlobal, parseJson, toJson, parseFn} from './util';
import fragment from '../components/fragment';
import is from '@form-create/utils/lib/type';
import toCase from '@form-create/utils/lib/tocase';
import extend from '@form-create/utils/lib/extend';
import {CreateNodeFactory} from '../factory/node';
import {createManager} from '../factory/manager';
import {arrayAttrs, keyAttrs, normalAttrs} from './attrs';
import {appendProto} from '../factory/creator';
import $provider from './provider';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import html from '../parser/html';
import uniqueId from '@form-create/utils/lib/unique';

export let _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;

function _parseProp(name, id) {
    let prop;
    if (arguments.length === 2) {
        prop = arguments[1];
        id = prop[name];
    } else {
        prop = arguments[2];
    }
    return {id, prop};
}

function nameProp() {
    return _parseProp('name', ...arguments);
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

function exportAttrs(attrs) {
    const key = attrs.key || [];
    const array = attrs.array || [];
    const normal = attrs.normal || [];
    keyAttrs.push(...key);
    arrayAttrs.push(...array);
    normalAttrs.push(...normal);

    appendProto([...key, ...array, ...normal]);
}

let id = 1;
const instance = {};

//todo 表单嵌套
export default function FormCreateFactory(config) {

    const components = {
        [fragment.name]: fragment
    };
    const parsers = {};
    const directives = {};
    const providers = {
        ...$provider
    };
    const maker = makerFactory();
    let globalConfig = {global: {}};
    const loadData = {};
    const CreateNode = CreateNodeFactory();

    exportAttrs(config.attrs || {});

    function getApi(name) {
        const val = instance[name];
        if (Array.isArray(val)) {
            return val.map(v => {
                return v.api();
            });
        } else if (val) {
            return val.api();
        }
    }

    function directive() {
        const data = nameProp(...arguments);
        if (data.id && data.prop) directives[data.id] = data.prop;
    }

    function register() {
        const data = nameProp(...arguments);
        if (data.id && data.prop) providers[data.id] = {...data.prop, name: data.id};
    }

    function componentAlias(alias) {
        CreateNode.use(alias);
    }

    function parser() {
        const data = nameProp(...arguments);
        if (!data.id || !data.prop) return BaseParser;
        const name = toCase(data.id);
        const parser = data.prop;
        const base = parser.merge === true ? parsers[name] : undefined;
        parsers[name] = parser;
        Object.setPrototypeOf(parser, base || BaseParser);
        maker[name] = creatorFactory(name);
        parser.maker && extend(maker, parser.maker);
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
        delete CreateNode.aliasMap[name];
        delete parsers[name];
        if (component.formCreateParser) parser(name, component.formCreateParser);
    }

    function _emitData(id) {
        Object.keys(instance).forEach(v => {
            const apis = Array.isArray(instance[v]) ? instance[v] : [instance[v]];
            apis.forEach(that => {
                that.bus.$emit('p.loadData.' + id);
            })
        })
    }

    function setData(id, data) {
        loadData[id] = data;
        _emitData(id);
    }

    function removeData(id) {
        delete loadData[id];
        _emitData(id);
    }

    function $form() {
        return _vue.extend($FormCreate(FormCreate));
    }

    function $vnode() {
        return _vue.extend(fragment);
    }

    //todo 检查回调函数作用域
    function use(fn, opt) {
        if (is.Function(fn.install)) fn.install(create, opt);
        else if (is.Function(fn)) fn(create, opt);
        return this;
    }

    function create(rules, _opt, parent) {
        let $vm = mountForm(rules, _opt || {});
        const _this = $vm.$refs.fc.formCreate;
        _this.$parent = parent;
        _getEl(_this.options).appendChild($vm.$el);
        return _this.api();
    }

    function factory(inherit) {
        let _config = {...config};
        if (inherit) {
            _config.inherit = {
                components,
                parsers,
                directives,
                providers,
                maker,
                loadData
            }
        } else {
            delete _config.inherit;
        }
        return FormCreateFactory(_config);
    }

    function FormCreate(vm) {
        const rules = vm.$options.propsData.rule;
        extend(this, {
            id: id++,
            vm,
            create,
            manager: createManager(config.manager),
            parsers,
            providers,
            rules: Array.isArray(rules) ? rules : [],
            name: vm.$options.propsData.name || uniqueId(),
            inFor: vm.$options.propsData.inFor,
            prop: {
                components,
                directives,
            },
            loadData,
            CreateNode,
            bus: new _vue,
            unwatch: null,
            options: {},
            extendApi: config.extendApi || (api => api)
        })
        this.init();
        this.initOptions();
        if (this.name) {
            if (this.inFor) {
                if (!instance[this.name]) instance[this.name] = [];
                instance[this.name].push(this);
            } else {
                instance[this.name] = this;
            }
        }
    }

    extend(FormCreate.prototype, {
        init() {
            const vm = this.vm;
            const h = new Handle(this);
            this.$handle = h;
            vm.$f = h.api;
            vm.$emit('input', h.api);

            vm.$on('hook:created', () => {
                if (this.isSub()) {
                    this.unwatch = vm.$watch(() => vm.$pfc.option, () => {
                        this.initOptions();
                        vm.$f.refresh();
                    }, {deep: true});
                    this.initOptions();
                }
                this.created();
                vm.disabled && vm.$f.disabled(true)
            })
            vm.$on('hook:mounted', () => {
                this.mounted();
            });
            vm.$on('hook:beforeDestroy', () => {
                vm.destroyed = true;
                this.unwatch && this.unwatch();
                h.reloadRule([]);
                if (this.name) {
                    if (this.inFor) {
                        const idx = instance[this.name].indexOf(this);
                        instance[this.name].splice(idx, 1);
                        if(!instance[this.name].length){
                            delete instance[this.name];
                        }
                    } else {
                        delete instance[this.name];
                    }
                }
            });
            vm.$on('hook:updated', () => {
                h.bindNextTick(() => this.bus.$emit('next-tick', h.api));
            });
        },
        isSub() {
            return this.vm.$pfc && this.vm.extendOption;
        },
        initOptions() {
            this.options = {};
            let options  = {formData: {}, submitBtn: {}, resetBtn: {}, ...deepCopy(globalConfig)};
            if (this.isSub()) {
                this.mergeOptions(this.options, this.vm.$pfc.$f.config || {}, true);
            }
            options = this.mergeOptions(options, this.vm.$options.propsData.option);
            this.updateOptions(options);
        },
        mergeOptions(target, opt, parent) {
            opt = deepCopy(opt);
            parent && ['page', 'onSubmit', 'mounted', 'reload', 'formData', 'el'].forEach((n) => {
                delete opt[n];
            });
            if (opt.global) {
                target.global = mergeGlobal(target.global, opt.global);
                delete opt.global;
            }
            this.$handle.$manager.mergeOptions([opt], target);
            return target;
        },
        updateOptions(options) {
            this.mergeOptions(this.options, options);
            this.$handle.$manager.updateOptions(this.options);
        },
        created() {
            this.$handle.init();
            this.vm.$emit('created', this.api());
        },
        api() {
            return this.$handle.api;
        },
        render() {
            return this.$handle.render();
        },
        mounted() {
            this.$handle.mounted();
        },
    })


    function useAttr(formCreate) {
        extend(formCreate, {
            version: config.version,
            ui: config.ui,
            setData,
            removeData,
            maker,
            component,
            directive,
            register,
            $vnode,
            parser,
            use,
            factory,
            componentAlias,
            copyRule,
            copyRules,
            fetch,
            $form,
            parseFn,
            parseJson,
            toJson,
            getApi,
            init(rules, _opt = {}) {
                let $vm = mountForm(rules, _opt), _this = $vm.$refs.fc.formCreate;
                return {
                    mount($el) {
                        if ($el && is.Element($el))
                            _this.options.el = $el;
                        _getEl(_this.options).appendChild($vm.$el);
                        return _this.api();
                    },
                    remove() {
                        $vm.$el.parentNode && $vm.$el.parentNode.removeChild($vm.$el);
                    },
                    destroy() {
                        this.remove();
                        $vm.$destroy();
                    },
                    $f: _this.api()
                };
            }
        });
    }

    function useStatic(formCreate) {
        extend(formCreate, {
            create,
            install(Vue, options) {
                globalConfig = {...globalConfig, ...(options || {})}
                if (Vue._installedFormCreate === true) return;
                Vue._installedFormCreate = true;
                _vue = Vue;

                const $formCreate = function (rules, opt = {}) {
                    return create(rules, opt, this);
                };

                useAttr($formCreate);

                Vue.prototype.$formCreate = $formCreate;
                Vue.component('FormCreate', $form());
                Vue.component('FcFragment', $vnode());
            }
        })
    }

    useAttr(create);
    useStatic(create);

    CreateNode.use({fragment: 'fcFragment'});

    parser(html);

    if (config.install) create.use(config);

    if (config.inherit) {
        const inherit = config.inherit;
        inherit.components && extend(components, inherit.components);
        inherit.parsers && extend(parsers, inherit.parsers);
        inherit.directives && extend(directives, inherit.directives);
        inherit.providers && extend(providers, inherit.providers);
        inherit.maker && extend(maker, inherit.maker);
        inherit.loadData && extend(loadData, inherit.loadData);
    }

    return create;
}
