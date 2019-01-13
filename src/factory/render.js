import {$nt, errMsg, extend, isFunction, isString, isUndef, uniqueId} from '../core/util';
import VNode from "./vNode";
import VData from "./vData";
import Vue from 'vue';

export default class Render {

    constructor(vm, handler, options = {}) {
        this.vm = vm;
        this.handler = handler;
        this.options = options;
        this.vNode = new VNode(vm);
        this.vData = new VData;
        this.cache = null;
        this.$tickEvent = [];

        this.init();
    }

    init() {

    }

    cacheParse() {
        let {noValue, noCache} = this.handler;
        if (!this.cache || noValue === true || noCache === true)
            this.cache = this.parse();
        let eventList = [...this.$tickEvent];
        this.$tickEvent = [];
        if (eventList.length)
            $nt(() => {
                eventList.forEach(event => event());
            });
        return this.cache
    }

    sync(event) {
        if (isFunction(event))
            this.$tickEvent.push(event);
        this.clearCache();
        this.vm._sync();
    }

    clearCache() {
        this.cache = null;
        let children = this.handler.rule.children;

        if (Array.isArray(children) && children.length > 0)
            children.forEach(child => !isString(child) && child.__handler__.render.clearCache());
    }

    parse() {
        let {type, rule, refName, key} = this.handler;
        if (rule.type === 'template') {
            if (Vue.compile !== undefined) {

                if (isUndef(rule.vm)) rule.vm = new Vue;

                let vn = Vue.compile(rule.template, {}).render.call(rule.vm);
                if (vn.data === undefined) vn.data = {};
                extend(vn.data, rule);
                vn.key = key;
                return [vn];
            } else {
                console.error('使用的 Vue 版本不支持 compile' + errMsg());
                return [];
            }
        } else {
            rule.ref = refName;
            if (isUndef(rule.key))
                rule.key = 'def' + uniqueId();
            let vn = this.vNode.make(type, {...rule}, () => {
                let vn = [], children = rule.children;
                if (Array.isArray(children) && children.length > 0)
                    vn = children.map((child) => {
                        if (isString(child))
                            return [child];
                        if (!child.__handler__)
                            vm._fComponent.createHandler([child], true);
                        return child.__handler__.render.cacheParse();
                    });
                return vn;
            });
            vn.key = key;
            return [vn];
        }

    }

    inputProps() {
        let {refName, key, field, rule: {props, event}} = this.handler;
        let data = this.vData
            .props(props).props({value: this.vm._formData(field)})
            .ref(refName).key(key + 'fc' + field).on(event).on('input', (value) => {
                this.onInput(value)
            });
        if (isUndef(props.size))
            data.props({size: this.options.form.size});

        return data;
    }

    onInput(value) {
        this.vm._changeFormData(this.handler.field, value);
    }

}
