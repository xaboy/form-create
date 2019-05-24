import {_vue as Vue} from './formCreate';
import {debounce, errMsg, isString, isUndef, isValidChildren, uniqueId} from '@form-create/utils';
import VNode from '../factory/vNode';
import VData from '../factory/vData';


const $de = debounce((fn) => fn(), 1);

export default class Render {
    constructor(handle, FormRender) {
        this.h = handle;
        this.fc = handle.fc;
        this.vm = handle.vm;
        this.options = handle.options;
        this.form = new FormRender(this, uniqueId());
        this.vNode = new VNode(this.vm);
        this.vData = new VData();
    }


    initOrgChildren() {
        const parsers = this.h.parsers;
        this.orgChildren = Object.keys(parsers).reduce((initial, field) => {
            const children = parsers[field].children;
            initial[field] = isValidChildren(children) ? children : [];

            return initial;
        }, {});
    }

    getParser(field) {
        return this.h.parsers[field];
    }

    run() {
        if (!this.vm.isShow)
            return;

        this.form.beforeRender();

        const vn = this.h.fieldList.map((field) => {
            let parser = this.getParser(field);
            if (parser.type === 'hidden') return;
            return this.renderParser(parser, false);
        }).filter((val) => val !== undefined);

        return this.form.render(vn);
    }

    renderParser(parser, isChild) {
        let {type, rule, refName, key} = parser, form = this.form, vn;
        if (type === 'template' && rule.template) {

            if (Vue.compile === undefined) {
                console.error('使用的 Vue 版本不支持 compile' + errMsg());
                return [];
            }

            if (isUndef(rule.vm)) rule.vm = new Vue;

            vn = Vue.compile(rule.template, {}).render.call(rule.vm);
            if (vn.data === undefined) vn.data = {};
            vn.key = key;
            if (isChild)
                return vn;
        } else if (!this.h.isNoVal(parser)) {
            const children = this.renderChildren(parser);
            vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
        } else {

            rule.ref = refName;
            if (isUndef(rule.key))
                rule.key = parser.key;
            vn = this.vNode.make(type, {...rule}, this.renderChildren(parser));

            vn.key = key;
            if (isChild)
                return vn;
        }

        return form.container(vn, parser);
    }

    inputVData(parser) {
        let {refName, key, field, rule} = parser;

        Object.keys(parser.vData._data).forEach((key) => {
            if (rule[key] !== undefined)
                parser.vData._data[key] = rule[key];
                // parser.vData[key](rule[key]);
        });
        window.$vm = this.vm;
        let data = parser.vData.props({value: this.vm._formData(field)})
            .ref(refName).key('input' + key).on('input', (value) => {
                this.onInput(parser, value);
            });

        if (isUndef(rule.props.size))
            data.props({size: this.h.options.form.size});

        return data;
    }

    onInput(parser, value) {
        this.h.onInput(parser, value);
    }

    renderChildren(parser) {
        const {children} = parser.rule, orgChildren = this.orgChildren[parser.field];
        if (!isValidChildren(children)) {
            orgChildren.forEach(_rule => {
                this.removeField(_rule.__field__);
            });
            this.orgChildren[parser.field] = [];
            return [];
        }

        this.orgChildren[parser.field].forEach(child => {
            if (children.indexOf(child) === -1) {
                this.removeField(child.__field__);
            }
        });

        return children.map(child => {
            if (isString(child)) return child;

            if (child.__fc__) {
                return this.renderParser(child.__fc__, true);
            }

            $de(() => this.h.fc.reload());
        });

    }

    defaultRender(parser, children) {
        const props = this.inputVData(parser);
        return this.vNode[parser.type](props, children);
    }
}