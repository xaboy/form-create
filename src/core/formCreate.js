import {$nt, debounce, deepExtend, errMsg, isBool, isElement, isFunction, isUndef, toString} from "../core/util";
import {formCreateStyle, getComponent, getConfig, getGlobalApi} from "../core/common";
import formRender from "../components/form";
import formCreateComponent from "../core/formCreateComponent";
import {$FormCreate, formCreateName} from "../core/component";
import maker from "./maker";
import Vue from 'vue';

const version = process.env.VERSION;

const formCreateStyleElId = 'form-create-style';

export function margeGlobal(_options) {
    if (isBool(_options.sumbitBtn))
        _options.sumbitBtn = {show: _options.sumbitBtn};
    if (isBool(_options.resetBtn))
        _options.resetBtn = {show: _options.resetBtn};
    let options = deepExtend(getConfig(), _options);
    options.el = !options.el
        ? window.document.body
        : (isElement(options.el)
                ? options.el
                : document.querySelector(options.el)
        );

    return options
}

export function getRule(rule) {
    if (isFunction(rule.getRule))
        return rule.getRule();
    else
        return rule;
}

export function initStyle() {
    if (document.getElementById(formCreateStyleElId) !== null) return;
    let style = document.createElement('style');
    style.id = formCreateStyleElId;
    style.innerText = formCreateStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
}

export default class FormCreate {

    constructor(rules, options = {}) {
        this.options = margeGlobal(options);
        this.rules = Array.isArray(rules) ? rules : [];

        this.handlers = {};
        this.fRender = {};
        this.formData = {};
        this.validate = {};
        this.trueData = {};
        this.fieldList = [];
        this.switchMaker = this.options.switchMaker;

        initStyle();
    }


    static create(rules, _opt = {}, _vue = Vue) {
        let opt = isElement(_opt) ? {el: _opt} : _opt;
        let fComponent = new FormCreate(rules, opt),
            $vm = fComponent.create(_vue);
        return fComponent.fCreateApi;
    };

    static install(Vue) {
        Vue.prototype.$formCreate = function (rules, opt = {}) {
            return FormCreate.create(rules, opt, Vue)
        };

        Vue.prototype.$formCreate.version = version;
        Vue.prototype.$formCreate.maker = maker;
        Vue.component(formCreateName, $FormCreate());
    }

    init(vm) {
        this.vm = vm;
        this.createHandler();
        this.fCreateApi = getGlobalApi(this);
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        this.fRender = new formRender(this);

        this.$tick = debounce((fn) => $nt(fn), 100);
    }


    setHandler(handler) {
        let rule = handler.rule, field = handler.field;
        this.handlers[field] = handler;
        if (handler.noValue === true) return;
        this.formData[field] = handler.parseValue;
        this.validate[field] = rule.validate;
        this.trueData[field] = {
            value: handler.rule.value,
            rule: handler.rule
        };
    }

    notField(field) {
        return this.fieldList.indexOf(field) === -1;
    }

    createHandler() {
        this.rules.forEach((rule, index) => {
            rule = getRule(rule);
            if (this.switchMaker)
                this.rules[index] = rule;
            rule.field = rule.field === undefined ? '' : toString(rule.field);
            if (this.notField(rule.field)) {
                let handler = getComponent(this.vm, rule, this.options);
                this.createChildren(handler);
                this.setHandler(handler);
                this.fieldList.push(handler.field);
            } else {
                console.error(`${rule.field} 字段已存在` + errMsg());
            }

        });
    }

    createChildren(handler) {
        if (Array.isArray(handler.rule.children) && handler.rule.children.length > 0) {
            handler.rule.children.forEach((rule, index) => {
                rule = getRule(rule);
                if (this.switchMaker)
                    handler.rule.children[index] = rule;
                rule.field = rule.field === undefined ? '' : toString(rule.field);
                if (this.notField(rule.field)) {
                    let _handler = getComponent(this.vm, rule, this.options);
                    this.createChildren(_handler);
                    handler.childrenHandlers.push(_handler);
                } else {
                    console.error(`${rule.field} 字段已存在` + errMsg());
                }
            });
        }
    }

    create(Vue) {
        let $fCreate = Vue.extend(this.component()), $vm = new $fCreate().$mount();
        this.options.el.appendChild($vm.$el);
        return $vm;
    }

    mounted(vm, first = true) {
        this.vm = vm;
        let {mounted, onReload} = this.options;
        $nt(() => {
            Object.keys(this.handlers).forEach((field) => {
                let handler = this.handlers[field];
                if (vm.cptData[field] !== undefined)
                    this.addHandlerWatch(handler);
                handler.mounted();
            });
            if (first)
                mounted && mounted(this.fCreateApi);
        });

        onReload && onReload(this.fCreateApi);
    }

    component() {
        return formCreateComponent(this);
    }

    append(rule, after, pre) {
        if (isFunction(rule.getRule))
            rule = rule.getRule();
        if (Object.keys(this.handlers).indexOf(toString(rule.field)) !== -1)
            throw new Error(`${rule.field}字段已存在` + errMsg());
        let handler = getComponent(this.vm, rule, this.options);
        this.createChildren(handler);
        this.vm.setField(handler.field);
        this.fRender.setRender(handler, after || '', pre);
        this.setHandler(handler);
        this.addHandlerWatch(handler);
        handler.render.sync(() => {
            handler.mounted();
        });
    }

    removeField(field) {
        if (this.handlers[field] === undefined)
            throw new Error(`${field}字段不存在` + errMsg());
        let watch = this.handlers[field].watch;

        delete this.handlers[field];
        delete this.validate[field];
        watch && watch.forEach((unWatch) => unWatch());
        this.vm.removeFormData(field);
        this.fRender.removeRender(field);
        delete this.formData[field];
        delete this.trueData[field];
    }

    addHandlerWatch(handler) {
        if (handler.noValue === true) return;
        let field = handler.field;

        let unWatch = this.vm.$watch(`cptData.${field}`, (n, o) => {
            if (this.handlers[field] !== undefined) {
                let trueValue = handler.toTrueValue(n), json = JSON.stringify(trueValue);
                if (this.vm.jsonData[field] !== json) {
                    this.vm.jsonData[field] = json;
                    handler.setTrueValue(trueValue);
                    handler.watchParseValue(n);
                }
            } else
                unWatch();
        }, {deep: true});

        let unWatch2 = this.vm.$watch(`trueData.${field}.value`, (n, o) => {
            if (n === undefined) return;
            if (this.handlers[field] !== undefined) {
                let json = JSON.stringify(n);
                if (this.vm.jsonData[field] !== json) {
                    this.vm.jsonData[field] = json;
                    handler.watchTrueValue(n);
                    $nt(() => handler.render.sync());
                }
            } else
                unWatch2();
        }, {deep: true});

        handler.watch.push(unWatch, unWatch2);

        const bind = debounce((n, o) => {
            if (this.handlers[field] !== undefined) {
                this.$tick(() => handler.render.sync());
            } else
                unWatch();
        }, 100);

        Object.keys(this.vm.trueData[field].rule).forEach((key) => {
            if (key === 'value') return;
            handler.watch.push(this.vm.$watch(`trueData.${field}.rule.${key}`, bind, {deep: true}));
        });
    }

    reload(rules) {
        if (!rules) {
            this.vm.refresh();
        } else {
            this.vm.unWatch();
            Object.keys(this.handlers).forEach(field => this.removeField(field));
            this.vm.isShow = false;
            this.constructor(rules, this.options);
            this.init(this.vm);
            this.vm.init();
            $nt(() => {
                this.vm.isShow = true;
                setTimeout(() => this.mounted(this.vm, false))
            });
        }
        return this.vm.$f = this.fCreateApi;
    }

    getFormRef() {
        return this.vm.$refs[this.fRender.refName]
    }

    fields() {
        return Object.keys(this.formData)
    }
}

FormCreate.maker = maker;
FormCreate.version = version;
