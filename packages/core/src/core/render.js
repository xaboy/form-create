import {_vue as Vue} from './index';
import {debounce, errMsg, isString, isUndef, isValidChildren} from '@form-create/utils';
import VNode from '../factory/vNode';
import VData from '../factory/vData';


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
            let parser = this.$handle.parsers[id];
            if (parser.type === 'hidden') return;
            return this.renderParser(parser);
        }).filter((val) => val !== undefined);

        return this.$form.render(vn);
    }

    setGlobalConfig(parser) {
        if (!this.options.global) return;

        if (this.options.global['*']) {
            this.toData(parser, this.options.global['*']);
        }
        if (this.options.global[parser.type]) {
            this.toData(parser, this.options.global[parser.type]);
        }
    }

    renderTemplate(parser) {
        const {id, rule, key} = parser;
        if (Vue.compile === undefined) {
            console.error('使用的 Vue 版本不支持 compile' + errMsg());
            return [];
        }

        if (!this.renderList[id]) {
            if (isUndef(rule.vm)) rule.vm = new Vue;
            this.renderList[id] = Vue.compile(rule.template);

        }

        setTemplateProps(parser);

        rule.vm.$off('input');
        rule.vm.$on('input', (value) => {
            this.onInput(parser, value);
        });

        const vn = this.renderList[id].render.call(rule.vm);

        if (vn.data === undefined) vn.data = {};
        vn.key = key;
        return vn;
    }

    renderParser(parser, parent) {
        parser.vData.get();
        this.setGlobalConfig(parser);

        if (!this.cache[parser.id] || parser.type === 'template') {
            let {type, rule} = parser, form = this.$form, vn;

            if (type === 'template' && rule.template) {
                vn = this.renderTemplate(parser);

                if (parent) {
                    this.setCache(parser, vn, parent);
                    return vn;
                }
            } else if (!this.$handle.isNoVal(parser)) {
                const children = this.renderChildren(parser);
                vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
            } else {
                vn = this.vNode.make(type, this.inputVData(parser), this.renderChildren(parser));
                if (parent) {
                    this.setCache(parser, vn, parent);
                    return vn;
                }
            }
            const cache = form.container(vn, parser);
            this.setCache(parser, cache, parent);
            return cache;
        }

        return this.getCache(parser);
    }

    toData(parser, data) {
        Object.keys(parser.vData._data).forEach((key) => {
            if (data[key] !== undefined)
                parser.vData[key](data[key]);
        });

        return parser.vData;
    }

    parserToData(parser) {
        return this.toData(parser, parser.rule);
    }

    inputVData(parser, custom) {
        const {refName, key, rule} = parser;

        this.parserToData(parser);

        let data = parser.vData
            .ref(refName).key('fc_item' + key);

        if (!custom)
            data.on('input', (value) => {
                this.onInput(parser, value);
            }).props('value', this.$handle.getFormData(parser));

        if (isUndef(rule.props.size))
            data.props('size', this.$handle.options.form.size);

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

            $de(() => this.$handle.reloadRule());
        });

    }

    defaultRender(parser, children) {
        return this.vNode[parser.type] ? this.vNode[parser.type](this.inputVData(parser), children) : this.vNode.make(parser.type, this.inputVData(parser), children);
    }
}

function setTemplateProps(parser) {
    const {rule} = parser;
    if (!rule.vm.$props)
        return;
    const keys = Object.keys(rule.vm.$props);
    keys.forEach(key => {
        if (rule.props[key] !== undefined)
            rule.vm.$props[key] = rule.props[key];
    });

    if (keys.indexOf('value') !== -1) {
        rule.vm.$props.value = parser.rule.value;
    }
}