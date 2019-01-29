import {
    $del,
    $nt, $set,
    debounce,
    errMsg,
    isElement,
    isFunction, isString,
    isUndef, toString,
    uniqueId
} from "./util";
import coreComponent from "./coreComponent";
import {$FormCreate, formCreateName} from "./component";
import Vue from 'vue';
import Handler from "../factory/handler";
import Render from "../factory/render";

const version = process.env.VERSION;

const ui = process.env.UI;

const formCreateStyleElId = 'form-create-style';

let drive = {};

export function getRule(rule) {
    if (isFunction(rule.getRule))
        return rule.getRule();
    else
        return rule;
}

export function getComponent(vm, rule, createOptions) {
    let componentList = drive.componentList, name = toString(rule.type).toLowerCase(),
        component = isComponent(name)
            ? componentList[name] : getUdfComponent();

    return new component.handler(vm, rule, component.render, createOptions, component.noValue);
}

export function isComponent(type) {
    return drive.componentList[type] !== undefined;
}

export function getUdfComponent() {
    return {
        handler: Handler,
        render: Render,
        noValue: true
    }
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
    style.innerText = drive.style;
    document.getElementsByTagName('head')[0].appendChild(style);
}

export default class FormCreate {

    constructor(rules, options = {}) {
        this.fRender = undefined;
        this.fCreateApi = undefined;
        this.id = uniqueId();
        this.reloading = false;
        this.__init(rules, options);
        initStyle();
        this.$tick = debounce((fn) => fn(), 150);
    }

    __init(rules, options) {
        this.options = drive.margeGlobal(options);
        this.rules = Array.isArray(rules) ? rules : [];
        this.origin = [...this.rules];
        this.handlers = {};
        this.formData = {};
        this.validate = {};
        this.trueData = {};
        this.components = {};
        this.fieldList = [];
        this.switchMaker = this.options.switchMaker;
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

        Vue.prototype.$formCreate.maker = FormCreate.maker;
        Vue.prototype.$formCreate.version = version;
        Vue.prototype.$formCreate.ui = ui;

        Vue.component(formCreateName, Vue.extend($FormCreate()));
    }

    boot(vm) {
        this.vm = vm;
        this.createHandler(this.rules);
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        vm.$set(vm, 'components', this.components);

        this.fRender = new drive.formRender(this);

        if (this.fCreateApi === undefined)
            this.fCreateApi = drive.getGlobalApi(this);

        this.fCreateApi.rule = this.rules;
        this.fCreateApi.config = this.options;
    }


    setHandler(handler) {
        let rule = handler.rule, {field, isDef} = handler;
        this.handlers[field] = handler;

        if (handler.noValue === true) {
            if (isDef === true)
                $set(this.components, field, rule);
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

    createHandler(rules, child) {
        rules.forEach((_rule, index) => {
            if (child && isString(_rule)) return;

            if (!_rule.type)
                return console.error(`未定义生成规则的 type 字段` + errMsg());

            let rule = getRule(_rule),
                handler = _rule.__handler__ ? _rule.__handler__.refresh() : getComponent(this.vm, rule, this.options),
                children = handler.rule.children;

            if (!this.notField(handler.field))
                return console.error(`${rule.field} 字段已存在` + errMsg());

            if (this.switchMaker) {
                rules[index] = rule;
                if (!child)
                    this.origin[index] = rule;
                _rule = rule;
            }

            this.setHandler(handler);

            if (!_rule.__handler__) {
                bindHandler(_rule, handler);
            }

            if (Array.isArray(children) && children.length > 0)
                this.createHandler(children, true);

            if (!child)
                this.fieldList.push(handler.field);

        });

        rules.forEach((rule) => {
            rule.__handler__.root = rules;
            rule.__handler__.origin = [...rules];
        });
    }

    create(Vue) {
        let $fCreate = Vue.extend(coreComponent(this)), $vm = new $fCreate().$mount();
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

    removeField(field) {
        if (this.handlers[field] === undefined)
            return;
        let watch = this.handlers[field].watch, index = this.fieldList.indexOf(field);

        $del(this.handlers, field);
        $del(this.validate, field);

        if (index !== -1) {
            this.fieldList.splice(index, 1);
        }

        watch && watch.forEach((unWatch) => unWatch());
        this.vm._removeField(field);

    }

    addHandlerWatch(handler) {
        if (handler.noValue === true) return;
        let field = handler.field, vm = this.vm;

        let unWatch = vm.$watch(`cptData.${field}`, (n) => {
            if (this.handlers[field] !== undefined) {
                let trueValue = handler.toValue(n), json = JSON.stringify(trueValue);
                if (vm._change(field, json)) {
                    handler.setValue(trueValue);
                    handler.watchFormValue(n);
                }
            } else
                unWatch();
        }, {deep: true});

        let unWatch2 = vm.$watch(`trueData.${field}.value`, (n) => {
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

    isNotChange(rules) {
        return rules.reduce((initial, rule, index) => initial && rule === this.origin[index], true)
            && this.origin.reduce((initial, rule, index) => initial && rule === rules[index], true);

    }

    reload(rules, unique) {
        let vm = this.vm;
        if (!rules) {
            this.reload(this.rules, unique);
        } else {

            if (this.isNotChange(rules)) {
                this.fCreateApi.refresh();
                return;
            }

            if (!this.origin.length)
                this.fCreateApi.refresh();

            this.origin = [...rules];
            vm._unWatch();
            Object.keys(this.handlers).forEach(field => this.removeField(field));
            this.__init(rules, this.options);
            this.boot(vm);
            vm.__init();
            $nt(() => {
                if (isUndef(unique) || vm.unique === unique)
                    this.mounted(vm, false);
            });

            vm.$f = this.fCreateApi;
        }

    }

    getFormRef() {
        return this.vm.$refs[this.fRender.refName]
    }

}

FormCreate.version = version;
FormCreate.ui = ui;

export function setDrive(_drive) {
    drive = _drive;
    _drive.install(FormCreate)
}
