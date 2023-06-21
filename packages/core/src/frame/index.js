import $FormCreate from '../components/formCreate';
import {createApp, h, reactive, ref, watch, nextTick} from 'vue';
import makerFactory from '../factory/maker';
import Handle from '../handler';
import fetch from './fetch';
import {creatorFactory} from '..';
import BaseParser from '../factory/parser';
import {copyRule, copyRules, mergeGlobal, parseJson, toJson, parseFn, invoke} from './util';
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
import Mitt from '@form-create/utils/lib/mitt';
import html from '../parser/html';

function parseProp(name, id) {
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
    return parseProp('name', ...arguments);
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
    const modelFields = {};
    const useApps = [];
    const providers = {
        ...$provider
    };
    const maker = makerFactory();
    let globalConfig = {global: {}};
    const data = {};
    const CreateNode = CreateNodeFactory();

    exportAttrs(config.attrs || {});

    function getApi(name) {
        const val = instance[name];
        if (Array.isArray(val))
            return [...val];
        return val;
    }

    function useApp(fn) {
        useApps.push(fn);
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
        if (!data.id || !data.prop) return;
        const name = toCase(data.id);
        const parser = data.prop;
        const base = parser.merge === true ? parsers[name] : undefined;
        parsers[name] = {...(base || BaseParser), ...parser};
        maker[name] = creatorFactory(name);
        parser.maker && extend(maker, parser.maker);
    }

    function component(id, component) {
        let name;
        if (is.String(id)) {
            name = id;
            if (component === undefined) {
                return components[name];
            }
        } else {
            name = id.displayName || id.name;
            component = id;
        }
        if (!name || !component) return;
        components[name] = component;
        components[toCase(name)] = component;
        if (component.formCreateParser) parser(name, component.formCreateParser);
    }

    function $form() {
        return $FormCreate(FormCreate, components, directives);
    }

    function createFormApp(rule, option) {
        const Type = $form();
        return createApp({
            data() {
                return reactive({
                    rule, option
                });
            },
            render() {
                return h(Type, {ref: 'fc', ...this.$data});
            }
        });
    }

    function $vnode() {
        return fragment;
    }

    //todo 检查回调函数作用域
    function use(fn, opt) {
        if (is.Function(fn.install)) fn.install(create, opt);
        else if (is.Function(fn)) fn(create, opt);
        return this;
    }

    function create(rules, option) {
        let app = createFormApp(rules, option || {});
        useApps.forEach(v => {
            invoke(() => v(create, app));
        })
        const div = document.createElement('div');
        (option?.el || document.body).appendChild(div);
        const vm = app.mount(div);
        return vm.$refs.fc.fapi;
    }

    function factory(inherit) {
        let _config = {...config};
        if (inherit) {
            _config.inherit = {
                components,
                parsers,
                directives,
                modelFields,
                providers,
                useApps,
                maker,
                data
            }
        } else {
            delete _config.inherit;
        }
        return FormCreateFactory(_config);
    }

    function setModelField(name, field) {
        modelFields[name] = field;
    }

    function FormCreate(vm) {
        extend(this, {
            id: id++,
            create,
            vm,
            manager: createManager(config.manager),
            parsers,
            providers,
            modelFields,
            rules: vm.props.rule,
            name: vm.props.name,
            inFor: vm.props.inFor,
            prop: {
                components,
                directives,
            },
            CreateNode,
            bus: new Mitt(),
            unwatch: null,
            options: ref(vm.props.option || {}),
            extendApi: config.extendApi || (api => api)
        })
        nextTick(() => {
            watch(this.options, () => {
                this.$handle.$manager.updateOptions(this.options.value);
                this.api().refresh();
            }, {deep: true})
        });
        extend(vm.appContext.components, components);
        extend(vm.appContext.directives, directives);
        this.$handle = new Handle(this)
        if (this.name) {
            if (this.inFor) {
                if (!instance[this.name]) instance[this.name] = [];
                instance[this.name].push(this.api());
            } else {
                instance[this.name] = this.api();
            }
        }
    }

    extend(FormCreate.prototype, {
        init() {
            if (this.isSub()) {
                this.unwatch = watch(() => this.vm.parent.option, () => {
                    this.initOptions(this.options.value);
                    this.$handle.api.refresh();
                }, {deep: true});
            }
            this.initOptions(this.options.value);
            this.$handle.init();
        },
        isSub() {
            return this.vm.setupState.parent && this.vm.setupState.extendOption;
        },
        initOptions(options) {
            this.options.value = {formData: {}, submitBtn: {}, resetBtn: {}, ...deepCopy(globalConfig)};
            if (this.isSub()) {
                this.options.value = this.mergeOptions(this.options.value, this.vm.setupState.parent.setupState.fapi.config || {}, true);
            }
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
            this.options.value = this.mergeOptions(this.options.value, options);
            this.$handle.$manager.updateOptions(this.options.value);
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
        unmount() {
            if (this.name) {
                if (this.inFor) {
                    const idx = instance[this.name].indexOf(this.api());
                    instance[this.name].splice(idx, 1);
                } else {
                    delete instance[this.name];
                }
            }
            this.unwatch && this.unwatch();
            this.$handle.reloadRule([]);
        },
        updated() {
            this.$handle.bindNextTick(() => this.bus.$emit('next-tick', this.$handle.api));
        }
    })


    function useAttr(formCreate) {
        extend(formCreate, {
            version: config.version,
            ui: config.ui,
            data,
            maker,
            component,
            directive,
            setModelField,
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
            useApp,
            getApi,
        });
    }

    function useStatic(formCreate) {
        extend(formCreate, {
            create,
            install(app, options) {
                globalConfig = {...globalConfig, ...(options || {})}
                if (app._installedFormCreate === true) return;
                app._installedFormCreate = true;

                const $formCreate = function (rules, opt = {}) {
                    return create(rules, opt, this);
                };

                useAttr($formCreate);

                app.config.globalProperties.$formCreate = $formCreate;
                app.component('FormCreate', $form());
                useApps.forEach(v => {
                    invoke(() => v(formCreate, app));
                })
            }
        })
    }

    useAttr(create);
    useStatic(create);

    CreateNode.use({fragment: 'fcFragment'});

    config.install && create.use(config);

    useApp((_, app) => {
        app.mixin({
            props: ['formCreateInject'],
        })
    })

    parser(html);

    if (config.inherit) {
        const inherit = config.inherit;
        inherit.components && extend(components, inherit.components);
        inherit.parsers && extend(parsers, inherit.parsers);
        inherit.directives && extend(directives, inherit.directives);
        inherit.modelFields && extend(modelFields, inherit.modelFields);
        inherit.providers && extend(providers, inherit.providers);
        inherit.useApps && extend(useApps, inherit.useApps);
        inherit.maker && extend(maker, inherit.maker);
        inherit.data && extend(data, inherit.data);
    }

    return create;
}
