import {
    $nt,
    debounce,
    errMsg,
    extend,
    isFunction,
    isNumber,
    isString,
    isUndef,
    isValidChildren,
    uniqueId
} from '../core/util';
import VNode from "./vNode";
import VData from "./vData";
import Vue from 'vue';

const upperCaseReg = /[A-Z]/;

export function isAttr(name, value) {
    return (!upperCaseReg.test(name) && (isString(value) || isNumber(value)))
}

const $de = debounce((fn) => fn(), 1);

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

    cacheParse(form, _super) {
        let {noValue, noCache} = this.handler;
        if (!this.cache || noValue === true || noCache === true)
            this.cache = _super ? Render.prototype.parse.call(this, form) : this.parse(form);
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

        if (isValidChildren(children))
            children.forEach(child => !isString(child) && child.__handler__.render.clearCache());
    }

    childrenParse(form) {
        let {rule, orgChildren, vm} = this.handler, children = rule.children, vn = [];

        if (isValidChildren(children)) {
            orgChildren.forEach(_rule => {
                if (children.indexOf(_rule) === -1) {
                    vm._fComponent.removeField(_rule.__field__);
                }
            });

            vn = children.map((child) => {
                if (isString(child))
                    return [child];
                if (child.__handler__) {
                    return child.__handler__.render.cacheParse(form, true);
                }
                $de(() => vm._fComponent.reload());
            });
            this.handler.orgChildren = [...children];
        } else if (orgChildren.length > 0) {
            orgChildren.forEach(_rule => {
                vm._fComponent.removeField(_rule.__field__);
            });
            this.handler.orgChildren = [];
        }
        return vn;
    }

    parse(form) {
        let {type, rule, refName, key, noValue} = this.handler;
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
            return form.makeComponent(this.handler.render);
        } else {
            rule.ref = refName;
            if (isUndef(rule.key))
                rule.key = 'def' + uniqueId();
            let vn = this.vNode.make(type, {...rule}, this.childrenParse(form));

            vn.key = key;
            return [vn];
        }

    }

    inputProps() {
        let {refName, key, field, rule} = this.handler;
        let {props, event} = rule;

        Object.keys(this.vData._data).forEach((key) => {
            if (rule[key] !== undefined)
                this.vData[key](rule[key]);
        });

        let data = this.vData.props({value: this.vm._formData(field)})
            .ref(refName).key(key + 'fc' + field).on(event).on('input', (value) => {
                this.onInput(value)
            });

        if (process.env.UI !== 'iview')
            data.attrs(Object.keys(props).reduce((initial, val) => {
                if (isAttr(val, props[val]))
                    initial[val] = props[val];
                return initial;
            }, {}));

        if (isUndef(props.size))
            data.props({size: this.options.form.size});

        return data;
    }

    onInput(value) {
        value = isUndef(value) ? '' : value;
        let handler = this.handler, {field, vm} = this.handler, trueValue = handler.toValue(value);
        vm._changeFormData(field, value);
        if (!vm._change(field, JSON.stringify(trueValue))) return;
        handler.setValue(trueValue);
        handler.watchFormValue(value);
        if (process.env.UI !== 'iview')
            handler.render.sync();
    }

}

export function defaultRenderFactory(node, setKey = false) {
    return class render extends Render {
        parse(form) {
            const props = this.inputProps();
            if (setKey)
                props.key(this.handler.key);
            return [this.vNode[node](props.get(), this.childrenParse(form))];
        }
    }

}
