import {_vue as Vue} from './index';
import {debounce, errMsg, isFunction, isString, isUndef, isValidChildren} from '@form-create/utils';
import VNode from '../factory/vNode';
import VData, {vdataField} from '../factory/vData';


const $de = debounce((fn) => fn(), 1);

export default class Render {
    constructor(handle) {
        this.$handle = handle;
        this.fc = handle.fc;
        this.vm = handle.vm;
        this.options = handle.options;
        this.$form = handle.$form;
        this.vNode = new VNode(this.vm);
        this.vData = new VData();
        this.cache = {};
        this.renderList = {};
    }

    clearCache(parser, clear = true) {
        if (!this.cache[parser.id]) return;
        if (this.cacheStatus(parser))
            this.$handle.refresh();
        const parent = this.cache[parser.id].parent;
        this.cache[parser.id] = null;
        if (parent && clear)
            this.clearCache(parent, clear);
    }

    clearCacheAll() {
        this.cache = {};
    }

    setCache(parser, vnode, parent) {
        this.cache[parser.id] = {
            vnode,
            use: false,
            parent
        };
    }

    cacheStatus(parser) {
        return this.cache[parser.id] && (this.cache[parser.id].use === true || this.cache[parser.id].parent);
    }

    getCache(parser) {
        const cache = this.cache[parser.id];
        cache.use = true;
        return cache.vnode;
    }

    initOrgChildren() {
        const parsers = this.$handle.parsers;
        this.orgChildren = Object.keys(parsers).reduce((initial, id) => {
            const children = parsers[id].rule.children;
            initial[id] = isValidChildren(children) ? [...children] : [];

            return initial;
        }, {});
    }

    run() {
        if (!this.vm.isShow)
            return;

        this.$form.beforeRender();

        const vn = this.$handle.sortList.map((id) => {
            return this.renderParser(this.$handle.parsers[id]);
        }).filter((val) => val !== undefined);

        return this.$form.render(vn);
    }

    setGlobalConfig(parser) {
        if (!this.options.global) return;
        const global = this.options.global;

        if (global['*']) {
            this.toData(parser, global['*']);
        }
        if (global[parser.type]) {
            this.toData(parser, global[parser.type]);
        } else if (global[parser.originType]) {
            this.toData(parser, global[parser.originType]);
        }
    }

    renderTemplate(parser) {
        const {id, rule, key} = parser;
        if (isUndef(Vue.compile)) {
            console.error('使用的 Vue 版本不支持 compile' + errMsg());
            return [];
        }

        if (!this.renderList[id]) {
            let vm = rule.vm;
            if (isUndef(rule.vm))
                vm = new Vue;
            else if (isFunction(rule.vm))
                vm = rule.vm(this.$handle.getInjectData(rule));

            this.renderList[id] = {
                vm,
                template: Vue.compile(rule.template)
            };

        }

        const {vm, template} = this.renderList[id];

        setTemplateProps(vm, parser, this.$handle.fCreateApi);

        vm.$off('input');
        vm.$on('input', (value) => {
            this.onInput(parser, value);
        });

        const vn = template.render.call(vm);

        if (isUndef(vn.data)) vn.data = {};
        vn.key = key;
        return vn;
    }

    renderParser(parser, parent) {
        if (parser.type === 'hidden') return;
        if (!this.cache[parser.id] || parser.type === 'template') {

            parser.vData.get();
            this.setGlobalConfig(parser);

            let {type, rule} = parser, form = this.$form, vn;

            if (type === 'template' && rule.template) {
                vn = this.renderTemplate(parser);

                if (parent && isUndef(rule.native)) {
                    this.setCache(parser, vn, parent);
                    return vn;
                }
            } else if (!this.$handle.isNoVal(parser)) {
                const children = this.renderChildren(parser);
                vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
            } else {
                vn = this.defaultRender(parser, this.renderChildren(parser));
                if (parent && isUndef(rule.native)) {
                    this.setCache(parser, vn, parent);
                    return vn;
                }
            }
            if (rule.native !== true)
                vn = form.container(vn, parser);
            this.setCache(parser, vn, parent);
            return vn;
        }

        return this.getCache(parser);
    }

    toData(parser, data) {
        vdataField.forEach((key) => {
            if (data[key] !== undefined)
                parser.vData[key](data[key]);
        });

        return parser.vData;
    }

    parserToData(parser) {
        return this.toData(parser, parser.rule);
    }

    inputVData(parser, custom) {
        const {refName, key} = parser;

        this.parserToData(parser);

        let data = parser.vData
            .ref(refName).key('fc_item' + key).props('formCreate', this.$handle.fCreateApi)
            .on('fc.subForm', (subForm) => this.$handle.addSubForm(parser, subForm));

        const model = this.$handle.modelEvent(parser);
        if (!custom)
            data.on(model.event || model, (value) => {
                this.onInput(parser, value);
            }).props(model.prop || 'value', this.$handle.getFormData(parser));

        this.$form.inputVData && this.$form.inputVData(parser, custom);

        return data;
    }

    onInput(parser, value) {
        this.$handle.onInput(parser, value);
    }

    renderChildren(parser) {
        const {children} = parser.rule, orgChildren = this.orgChildren[parser.id];

        if (!isValidChildren(children)) {
            orgChildren.forEach(child => {
                if (!isString(child) && child.__fc__) {
                    this.$handle.removeField(child.__fc__);
                }
            });
            this.orgChildren[parser.id] = [];
            return [];
        }

        this.orgChildren[parser.id].forEach(child => {
            if (children.indexOf(child) === -1 && !isString(child) && child.__fc__) {
                this.$handle.removeField(child.__fc__);
            }
        });

        return children.map(child => {
            if (isString(child)) return child;
            if (child.__fc__) {
                return this.renderParser(child.__fc__, parser);
            }
            if (!this.$handle.isset(child) && child.type)
                $de(() => this.$handle.reloadRule());
        });

    }

    defaultRender(parser, children) {
        const vdata = this.inputVData(parser);
        if (this.vNode[parser.type])
            return this.vNode[parser.type](vdata, children);
        if (this.vNode[parser.originType])
            return this.vNode[parser.originType](vdata, children);
        return this.vNode.make(parser.originType, vdata, children);
    }
}

function setTemplateProps(vm, parser, fApi) {
    if (!vm.$props)
        return;
    const {rule} = parser;
    const keys = Object.keys(vm.$props);
    keys.forEach(key => {
        if (rule.props[key] !== undefined)
            vm.$props[key] = rule.props[key];
    });

    if (keys.indexOf('value') !== -1) {
        vm.$props.value = parser.rule.value;
    }
    vm.$props.formCreate = fApi;
}
