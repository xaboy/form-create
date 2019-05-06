import {
    $del,
    $nt,
    $set,
    debounce,
    deepExtend,
    errMsg,
    extend,
    isBool,
    isElement,
    isFunction,
    isString,
    isValidChildren,
    toString,
    uniqueId
} from "./util";
import coreComponent from "./coreComponent";
import {$FormCreate, formCreateName} from "./component";
import Vue from 'vue';
import Handler from "../factory/handler";
import Render from "../factory/render";
import getBaseConfig from "./config";

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

export let _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;

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

export function margeGlobal(_options) {
    if (isBool(_options.sumbitBtn))
        $set(_options, 'sumbitBtn', {show: _options.sumbitBtn});
    if (isBool(_options.resetBtn))
        $set(_options, 'resetBtn', {show: _options.resetBtn});
    let options = deepExtend(extend(drive.getConfig(), getBaseConfig()), _options);

    $set(options, 'el', !options.el
        ? window.document.body
        : (isElement(options.el)
                ? options.el
                : document.querySelector(options.el)
        ));

    return options
}

export function delHandler(handler) {
    handler.watch.forEach((unWatch) => unWatch());
    handler.watch = [];
    handler.deleted = true;
}

export const components = {
    'form-create': _vue.extend($FormCreate())
};

export function setComponent(id, component) {
    if (component) {
        return _vue.component(toString(id), component);
    } else if (id)
        return components[toString(id)];
    else
        return {...components};
}

export default class FormCreate {

    constructor(rules, options = {}) {
        this.fRender = undefined;
        this.fCreateApi = undefined;
        this.$parent = undefined;
        this.id = uniqueId();
        this.validate = {};
        this.__init(rules, options);
        initStyle();
        this.$tick = debounce((fn) => fn(), 150);
    }

    __init(rules, options) {
        this.options = margeGlobal(options);
        this.rules = Array.isArray(rules) ? rules : [];
        this.origin = [...this.rules];
        this.handlers = {};
        this.formData = {};
        this.trueData = {};
        this.components = {};
        this.fieldList = [];
        this.switchMaker = this.options.switchMaker;
    }

    static create(rules, _opt = {}, $parent = undefined) {
        let opt = isElement(_opt) ? {el: _opt} : _opt;
        let fComponent = new FormCreate(rules, opt),
            $vm = fComponent.create(_vue);
        fComponent.$parent = $parent;
        return fComponent.fCreateApi;
    };

    static install(Vue) {
        const $formCreate = function (rules, opt = {}) {
            return FormCreate.create(rules, opt, this)
        };

        $formCreate.maker = FormCreate.maker;
        $formCreate.version = version;
        $formCreate.ui = ui;
        $formCreate.component = setComponent;
        Vue.prototype.$formCreate = $formCreate;

        Vue.component(formCreateName, Vue.extend($FormCreate()));
        _vue = Vue;
    }

    static init(rules, _opt = {}) {
        let opt = isElement(_opt) ? {el: _opt} : _opt;
        let fComponent = new FormCreate(rules, opt);
        let $fCreate = _vue.extend(coreComponent(fComponent));
        let $vm = new $fCreate().$mount();

        return {
            mount($el) {
                if ($el && isElement($el))
                    $set(fComponent.options, 'el', $el);

                fComponent.options.el.appendChild($vm.$el);

                return fComponent.fCreateApi;
            },
            remove() {
                fComponent.options.el.removeChild($vm.$el);
            },
            $f: fComponent.fCreateApi
        };
    }

    render() {
        return this.fRender.render(this.vm);
    }

    beforeBoot(vm) {
        this.vm = vm;
        this.createHandler(this.rules);
        this.fRender = new drive.formRender(this);
    }

    boot() {
        const vm = this.vm;
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        vm.$set(vm, 'components', this.components);

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
        $set(this.trueData, field, rule);

    }

    notField(field) {
        return this.handlers[field] === undefined;
    }

    createHandler(rules, child) {
        rules.map((_rule, index) => {
            if (child && isString(_rule)) return;

            if (!_rule.type)
                return console.error(`未定义生成规则的 type 字段` + errMsg());

            let rule = getRule(_rule), handler;

            if (_rule.__handler__) {
                handler = _rule.__handler__;
                if (handler.vm !== this.vm && !handler.deleted)
                    return console.error(`第${index + 1}条规则正在其他的 <form-create> 中使用` + errMsg());

                handler.vm = this.vm;
                handler.render.vm = this.vm;
                handler.render.vNode.setVm(this.vm);

                handler.refresh();
            } else {
                handler = getComponent(this.vm, rule, this.options);
            }

            let children = handler.rule.children;

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

            if (isValidChildren(children))
                this.createHandler(children, true);

            if (!child)
                this.fieldList.push(handler.field);
            return handler;
        }).filter(h => h).forEach(h => {
            h.root = rules;
        });

        return rules;
    }

    create(Vue) {
        let $fCreate = Vue.extend(coreComponent(this)), $vm = new $fCreate().$mount();
        this.options.el.appendChild($vm.$el);
        return $vm;
    }

    mounted(vm, first = true) {
        this.vm = vm;
        let {mounted, onReload} = this.options;

        Object.keys(this.handlers).forEach((field) => {
            let handler = this.handlers[field];
            if (handler.watch.length === 0)
                this.addHandlerWatch(handler);
            handler.mounted();
        });

        Object.keys(vm.cptData).forEach(field => {
            const value = this.handlers[field].toValue(vm.cptData[field]);
            vm.jsonData[field] = JSON.stringify(value);
            vm._changeValue(field, value);
        });

        if (first) {
            mounted && mounted(this.fCreateApi);
            this.$emit('mounted', this.fCreateApi);
        }
        onReload && onReload(this.fCreateApi);
        this.$emit('reload', this.fCreateApi);

    }

    $emit(eventName, ...params) {
        if (this.$parent) {
            this.$parent.$emit(`fc:${eventName}`, ...params);
        } else {
            this.vm.$emit(eventName, ...params);
        }
    }

    removeField(field) {
        if (this.handlers[field] === undefined)
            return;
        const index = this.fieldList.indexOf(field);

        delHandler(this.handlers[field]);
        $del(this.handlers, field);
        $del(this.validate, field);

        if (index !== -1) {
            this.fieldList.splice(index, 1);
        }

        this.vm._removeField(field);
    }

    addHandlerWatch(handler) {
        if (handler.noValue === true) return;
        let field = handler.field, vm = this.vm;

        let unWatch = vm.$watch(() => vm.cptData[field], (n) => {

            if (this.handlers[field] === undefined)
                return delHandler(handler);

            let trueValue = handler.toValue(n), json = JSON.stringify(trueValue);
            if (vm._change(field, json)) {
                handler.setValue(trueValue);
                handler.watchFormValue(n);
            }
        }, {deep: true});

        let unWatch2 = vm.$watch(() => vm.trueData[field].value, (n) => {
            if (n === undefined) return;

            if (this.handlers[field] === undefined)
                return delHandler(handler);

            let json = JSON.stringify(n);
            if (vm._change(field, json)) {
                handler.watchValue(n);
                $nt(() => handler.render.sync());
            }
        }, {deep: true});

        handler.watch.push(unWatch, unWatch2);

        const bind = () => {
            if (this.handlers[field] === undefined)
                delHandler(handler);
            else
                this.$tick(() => handler.render.sync());
        };

        Object.keys(vm._trueData(field)).forEach((key) => {
            if (key === 'value') return;
            handler.watch.push(vm.$watch(() => vm.trueData[field][key], bind, {deep: true}));
        });
    }

    reload(rules) {
        const vm = this.vm;

        if (!rules)
            return this.reload(this.rules);

        if (!this.origin.length)
            this.fCreateApi.refresh();

        this.origin = [...rules];

        Object.keys(this.handlers).forEach(field => this.removeField(field));

        this.__init(rules, this.options);
        this.beforeBoot(vm);
        this.boot();
        vm.__init();

        $nt(() => {
            this.mounted(vm, false);
        });

        vm.$f = this.fCreateApi;
    }

    getFormRef() {
        return this.vm.$refs[this.fRender.refName]
    }

}

FormCreate.version = version;
FormCreate.ui = ui;
FormCreate.component = setComponent;

export function setDrive(_drive) {
    drive = _drive;
    _drive.install(FormCreate)
}

export function install(Vue) {
    if (Vue._installedFormCreate === true) return;
    Vue._installedFormCreate = true;
    Vue.use(FormCreate);
}
