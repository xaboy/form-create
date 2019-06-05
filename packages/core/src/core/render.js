import {_vue as Vue} from './formCreate';
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
        this.form = handle.$form;
        this.vNode = new VNode(this.vm);
        this.vData = new VData();
        this.cache = {};
        this.renderList = {};
    }

    clearCache(parser) {
        console.log('clear--------cache');
        if (this.cacheStatus(parser))
            this.$handle.refresh();

        this.cache[parser.field] = null;
    }

    clearCacheAll() {
        this.cache = {};
    }

    setCache(parser, vnode) {
        this.cache[parser.field] = {
            vnode,
            use: false
        };
    }

    cacheStatus(parser) {
        return this.cache[parser.field] && this.cache[parser.field].use === true;
    }

    getCache(parser) {
        const cache = this.cache[parser.field];
        cache.use = true;
        return cache.vnode;
    }

    initOrgChildren() {
        const parsers = this.$handle.parsers;
        this.orgChildren = Object.keys(parsers).reduce((initial, id) => {
            const children = parsers[id].children;
            initial[id] = isValidChildren(children) ? children : [];

            return initial;
        }, {});
    }

    getParser(id) {
        return this.$handle.parsers[id];
    }

    run() {
        if (!this.vm.isShow)
            return;

        this.form.beforeRender();

        const vn = this.$handle.sortList.map((id) => {
            let parser = this.getParser(id);
            if (parser.type === 'hidden') return;
            return this.renderParser(parser, false);
        }).filter((val) => val !== undefined);

        return this.form.render(vn);
    }

    renderParser(parser, isChild) {
        if (!this.cache[parser.field] || parser.type === 'template') {
            let {type, rule, key} = parser, form = this.form, vn;
            console.log(parser.field, 'rendering');
            if (type === 'template' && rule.template) {

                if (Vue.compile === undefined) {
                    console.error('使用的 Vue 版本不支持 compile' + errMsg());
                    return [];
                }

                if (!this.renderList[parser.id]) {
                    if (isUndef(rule.vm)) rule.vm = new Vue;
                    this.renderList[parser.id] = Vue.compile(rule.template);
                    rule.vm.$on('input', (value) => {
                        this.onInput(parser, value);
                    });
                }

                vn = this.renderList[parser.id].render.call(rule.vm);
                if (vn.data === undefined) vn.data = {};
                vn.key = key;
                if (isChild) {
                    this.setCache(parser, vn);
                    return vn;
                }
            } else if (!this.$handle.isNoVal(parser)) {
                const children = this.renderChildren(parser);
                vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
            } else {
                vn = this.vNode.make(type, this.inputVData(parser), this.renderChildren(parser));
                if (isChild) {
                    this.setCache(parser, vn);
                    return vn;
                }
            }
            const cache = form.container(vn, parser);
            this.setCache(parser, cache);
            return cache;
        }

        return this.getCache(parser);
        // return form.container(vn, parser);
    }

    parserToData(parser) {
        Object.keys(parser.vData._data).forEach((key) => {
            if (parser.rule[key] !== undefined)
                parser.vData[key](parser.rule[key]);
        });

        return parser.vData;
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
            orgChildren.forEach(_rule => {
                this.removeField(_rule.__field__);
            });
            this.orgChildren[parser.id] = [];
            return [];
        }

        this.orgChildren[parser.id].forEach(child => {
            if (children.indexOf(child) === -1) {
                this.removeField(child.__field__);
            }
        });

        return children.map(child => {
            if (isString(child)) return child;

            if (child.__fc__) {
                return this.renderParser(child.__fc__, true);
            }

            $de(() => this.$handle.fc.reload());
        });

    }

    defaultRender(parser, children) {
        return this.vNode[parser.type] ? this.vNode[parser.type](this.inputVData(parser), children) : this.vNode.make(parser.type, this.inputVData(parser), children);
    }
}