import {
    $del,
    $nt, $set,
    debounce,
    deepExtend,
    errMsg,
    isBool,
    isElement,
    isFunction,
    isUndef,
    toString, uniqueId
} from "../core/util";
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
        $set(_options, 'sumbitBtn', {show: _options.sumbitBtn});
    if (isBool(_options.resetBtn))
        $set(_options, 'resetBtn', {show: _options.resetBtn});
    let options = deepExtend(getConfig(), _options);

    $set(options, 'el', !options.el
        ? window.document.body
        : (isElement(options.el)
                ? options.el
                : document.querySelector(options.el)
        ));

    return options
}

export function getRule(rule) {
    if (isFunction(rule.getRule))
        return rule.getRule();
    else
        return rule;
}

export function bindHandler(rule, handler) {
    Object.defineProperties(rule, {
        __field__: {
            value: handler.field,
            enumerable: false,
            configurable: false
        },
        __handler__: {
            value: handler,
            enumerable: false,
            configurable: false
        }
    })
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
        this.origin = [...this.rules];

        this.handlers = {};
        this.fRender = {};
        this.formData = {};
        this.validate = {};
        this.trueData = {};
        this.components = {};
        this.fieldList = [];
        this.switchMaker = this.options.switchMaker;
        this.id = uniqueId();

        initStyle();
        this.$tick = debounce((fn) => fn(), 150);

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
        Vue.component(formCreateName, Vue.extend($FormCreate()));
    }

    init(vm) {
        this.vm = vm;
        this.createHandler();
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        vm.$set(vm, 'components', this.components);
        this.fRender = new formRender(this);
        if (this.fCreateApi === undefined)
            this.fCreateApi = getGlobalApi(this);
        this.fCreateApi.rule = this.rules;
    }


    setHandler(handler) {
        let rule = handler.rule, field = handler.field;
        this.handlers[field] = handler;

        if (handler.noValue === true) {
            if (!isUndef(handler.index))
                this.components[handler.index] = rule;
            return;
        }

        $set(this.formData, field, handler.parseValue);
        $set(this.validate, field, rule.validate);
        $set(this.trueData, field, {
            value: handler.rule.value,
            rule: rule
        });

    }

    notField(field) {
        return this.handlers[field] === undefined;
    }

    createHandler() {
        this.rules.forEach((_rule, index) => {
            let rule = getRule(_rule), handler = _rule.__handler__ || getComponent(this.vm, rule, this.options);

            if (!this.notField(handler.field))
                return console.error(`${rule.field} 字段已存在` + errMsg());

            if (this.switchMaker)
                this.origin[index] = this.rules[index] = rule;


            this.setHandler(handler);

            if (!_rule.__handler__) {
                bindHandler(_rule, handler);
                this.createChildren(handler);
            }

            this.fieldList.push(handler.field);
            // let handler;
            // if (_rule.__handler__ === undefined) {
            //     handler = getComponent(this.vm, rule, this.options);
            //     bindHandler(_rule, handler);
            // } else {
            //     handler = _rule.__handler__;
            // }


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
        setTimeout(() => {
            $nt(() => {
                Object.keys(this.handlers).forEach((field) => {
                    let handler = this.handlers[field];
                    if (vm._formData(field) !== undefined)
                        this.addHandlerWatch(handler);
                    handler.mounted();
                });
                if (first)
                    mounted && mounted(this.fCreateApi);
                onReload && onReload(this.fCreateApi);
            })
        });
    }

    component() {
        return formCreateComponent(this);
    }

    removeField(field) {
        if (this.handlers[field] === undefined)
            throw new Error(`${field}字段不存在` + errMsg());
        let watch = this.handlers[field].watch;

        $del(this.handlers, field);
        $del(this.validate, field);

        this.fieldList.splice(this.fieldList.indexOf(field), 1);

        watch && watch.forEach((unWatch) => unWatch());
        this.vm._removeField(field);

    }

    addHandlerWatch(handler) {
        if (handler.noValue === true) return;
        let field = handler.field, vm = this.vm;

        let unWatch = vm.$watch(`cptData.${field}`, (n, o) => {
            if (this.handlers[field] !== undefined) {
                let trueValue = handler.toValue(n), json = JSON.stringify(trueValue);
                if (vm._change(field, json)) {
                    handler.setValue(trueValue);
                    handler.watchFormValue(n);
                }
            } else
                unWatch();
        }, {deep: true});

        let unWatch2 = vm.$watch(`trueData.${field}.value`, (n, o) => {
            if (n === undefined) return;
            if (this.handlers[field] !== undefined) {
                let json = JSON.stringify(n);
                if (vm._change(field, json)) {
                    handler.watchValue(n);
                    $nt(() => handler.render.sync());
                }
            } else
                unWatch2();
        }, {deep: true});

        handler.watch.push(unWatch, unWatch2);

        const bind = () => {
            if (this.handlers[field] !== undefined)
                this.$tick(() => handler.render.sync());
        };

        Object.keys(vm._trueData(field).rule).forEach((key) => {
            if (key === 'value') return;
            handler.watch.push(vm.$watch(`trueData.${field}.rule.${key}`, bind, {deep: true}));
        });
    }

    reload(rules) {
        let vm = this.vm;
        if (!rules) {
            return this.reload(this.rules);
        } else {

            const flag = rules.reduce((initial, rule, index) => {
                return initial && rule === this.origin[index];
            }, true);

            if (flag) return;
            this.origin = [...rules];
            vm._unWatch();
            Object.keys(this.handlers).forEach(field => this.removeField(field));
            this.constructor(rules, this.options);
            this.init(vm);
            vm.init();
            $nt(() => {
                this.mounted(vm, false);
            });
        }
        return vm.$f = this.fCreateApi;
    }

    getFormRef() {
        return this.vm.$refs[this.fRender.refName]
    }

}

FormCreate.maker = maker;
FormCreate.version = version;
