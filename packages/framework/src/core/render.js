import {_vue as Vue} from './formCreate';
import {debounce, errMsg, extend, isString, isUndef, isValidChildren, uniqueId} from '@form-create/core';
import VNode from '../factory/vNode';
import VData from '../factory/vData';


const $de = debounce((fn) => fn(), 1);

export default class Render {
    constructor(handle, FormRender) {
        this.h = handle;
        this.vm = handle.vm;
        this.form = new FormRender(this);
        this.vNode = new VNode(this.vm);
        this.vData = new VData();

        this.initOrgChildren(this.h.parsers);
    }

    initOrgChildren(parsers) {
        this.orgChildren = Object.keys(parsers).reduce((initial, field) => {
            const children = parsers[field].children;
            initial[field] = isValidChildren(children) ? children : [];

            return initial;
        }, {});
    }

    getParser(field) {
        return this.h.parsers[field];
    }

    run(vm) {
        this.vm = vm;
        this.vNode.setVm(vm);
        const vn = this.h.fieldList.map((field) => {
            let parser = this.getParser(field);
            if (parser.type === 'hidden') return;
            return this.renderParser(parser);
        }).filter((val) => val !== undefined);

        return this.form.render(vn);

    }

    renderParser(parser) {
        parser.vNode.setVm(this.vm);
        let {type, rule, refName, key, noValue} = parser, form = this.form;
        if (type === 'template' && rule.template) {

            if (Vue.compile === undefined) {
                console.error('使用的 Vue 版本不支持 compile' + errMsg());
                return [];
            }

            if (isUndef(rule.vm)) rule.vm = new Vue;

            let vn = Vue.compile(rule.template, {}).render.call(rule.vm);
            if (vn.data === undefined) vn.data = {};
            extend(vn.data, rule);
            vn.key = key;
            return [vn];

        } else if (!noValue) {
            const children = this.renderChildren(parser);
            return form.container(parser.render ? parser.render(children, this) : this.defaultRender(parser, children), parser);
        } else {
            rule.ref = refName;
            if (isUndef(rule.key))
                rule.key = 'def' + uniqueId();
            let vn = this.vNode.make(type, {...rule}, this.renderChildren(parser));

            vn.key = key;
            return [vn];
        }

    }

    inputVData(parser) {
        let {refName, key, field, rule} = parser;

        Object.keys(this.vData._data).forEach((key) => {
            if (rule[key] !== undefined)
                this.vData[key](rule[key]);
        });

        let data = this.vData.props({value: this.vm._formData(field)})
            .ref(refName).key(key + 'fc' + field).on('input', (value) => {
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
            if (isString(child)) return [child];

            if (child.__fc__) {
                return this.renderParser(child.__fc__);
            }

            $de(() => this.h.fc.reload());
        });

    }

    defaultRender(parser, children) {
        const props = this.inputVData(parser);
        props.key(parser.key);
        return [this.vNode[parser.type](props.get(), children)];
    }
}