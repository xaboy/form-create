import {$nt, errMsg, extend, isFunction, isUndef, uniqueId} from '../core/util';
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
        if (!this.cache || this.handler.noValue === true)
            this.cache = this.parse();
        let eventList = [...this.$tickEvent];
        this.$tickEvent = [];
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
        if (this.handler.childrenHandlers.length > 0)
            this.handler.childrenHandlers.forEach(handler => handler.render.clearCache());
    }

    parse() {
        let {type, rule, childrenHandlers, refName, key} = this.handler;
        if (rule.type === '__tmp') {
            if (Vue.compile !== undefined) {
                let vn = Vue.compile(rule.template, {}).render.call(rule._vm || this.vm);
                if (vn.data === undefined) vn.data = {};
                extend(vn.data, rule);
                vn.key = key;
                return [vn];
            } else
                console.log('使用的 Vue 版本不支持 compile' + errMsg());
        } else {
            rule.ref = refName;
            if (isUndef(rule.key))
                rule.key = 'def' + uniqueId();
            let vn = this.vNode.make(type, extend({}, rule), () => {
                let vn = [];
                if (childrenHandlers.length > 0)
                    vn = childrenHandlers.map((handler) => handler.render.cacheParse());
                return vn;
            });
            vn.key = key;
            return [vn];
        }

    }

    inputProps() {
        let {refName, key, field, rule: {props, event}} = this.handler;
        return this.vData
            .props(extend(props, {value: this.vm._formData(field)}))
            .ref(refName).key(key + '' + uniqueId()).on(event).on('input', (value) => {
                this.onInput(value)
            });
    }

    onInput(value) {
        this.vm._changeFormData(this.handler.field, value);
    }

}
