import {deepExtend, isElement} from "./util";
import {formCreateStyle, getConfig, createHandler, getGlobalApi, getMaker} from "./common";
import formRender from "../components/form";
import formCreateComponent from "./formCreateComponent";
import {make} from "../factory/make";

const version = '1.2.2';

const maker = getMaker();

const formCreateStyleElId = 'form-create-style';

const formCreate = function (rules,options) {
    if(!this instanceof formCreate)
        throwIfMissing('formCreate is a constructor and should be called with the `new` keyword');
    this.rules = Array.isArray(rules) ? rules : [];
    this.handlers = {};
    this.fRender = {};
    this.formData ={};
    this.validate ={};
    this.fieldList = [];
    options.el = !options.el
        ? window.document.body
        : (isElement(options.el)
                ? options.el
                : document.querySelector(options.el)
        );
    this.options = options;
};

formCreate.createStyle = function () {
    if (document.getElementById(formCreateStyleElId) !== null) return;
    let style = document.createElement('style');
    style.id = formCreateStyleElId;
    style.innerText = formCreateStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
};

formCreate.install = function(Vue,globalOptions = {}){
    formCreate.createStyle();
    let options = deepExtend(deepExtend(Object.create(null),getConfig(Vue)),globalOptions);
    Vue.prototype.$formCreate = function(rules,_opt = {}){
        let opt = isElement(_opt) ? {el:_opt} : _opt;
        let fComponent = new formCreate(
            rules,
            deepExtend(deepExtend(Object.create(null),options),opt)
            ),
            $vm = fComponent.create(Vue);
        return fComponent.fCreateApi;
    };
    Vue.prototype.$formCreate.version = version;
    Vue.prototype.$formCreate.maker = maker;

};

formCreate.prototype = {
    checkRule(rule){
        rule.type = rule.type === undefined ? 'hidden' : rule.type.toLowerCase();
        if(!rule.field) rule.field = '';
        return rule;
    },
    setHandler(handler){
        let field = handler.rule.field;
        this.handlers[field] = handler;
        this.formData[field] = handler.getParseValue();
        this.validate[field] = handler.getValidate();
    },
    init(vm){
        this.vm = vm;
        this.rules.forEach((rule,index)=>{
            if(rule instanceof make)
                this.rules[index] = rule.getRule();
        });
        this.rules.filter(rule=>rule.field !== undefined).forEach((rule)=> {
            rule = this.checkRule(rule);
            let handler = createHandler(this.vm,rule,this.options);
            if(this.fieldList.indexOf(handler.rule.field) === -1){
                this.setHandler(handler);
                this.fieldList.push(handler.rule.field);
            }else{
                console.error(`${handler.rule.field} 字段已存在`);
            }
        });
        this.fCreateApi = getGlobalApi(this);
        vm.$set(vm,'formData',this.formData);
        vm.$set(vm,'buttonProps',this.options.submitBtn);
        this.fRender = new formRender(this);
    },
    create(Vue){
        let $fCreate = Vue.extend(this.component()),$vm = new $fCreate().$mount();
        this.options.el.appendChild($vm.$el);
        return $vm;
    },
    component(){
        return formCreateComponent(this);
    },
    append(rule,after,pre){
        if(rule instanceof make)
            rule = rule.getRule();
        let _rule = deepExtend(Object.create(null),this.checkRule(rule));
        let handler = createHandler(this.vm,_rule,this.options);
        if(Object.keys(this.handlers).indexOf(handler.rule.field) !== -1)
            throw new Error(`${_rule.field}字段已存在`);
        this.fRender.setRender(handler,after,pre);
        this.setHandler(handler);
        this.vm.setField(handler.rule.field,handler.getParseValue());
        this.addHandlerWatch(handler);
        this.vm.$nextTick(()=>{
            handler.mounted();
        });
    },
    removeField(field){
        if(this.handlers[field] === undefined)
            throw new Error(`${field}字段不存在`);
        this.vm.removeFormData(field);
        delete this.handlers[field];
        delete this.validate[field];
        this.fRender.removeRender(field);
        delete this.formData[field];
    },
    addHandlerWatch(handler){
        let unWatch = this.vm.$watch(`formData.${handler.rule.field}`,(n,o)=>{
            if(handler !== undefined)
                handler.changeParseValue(n,false);
            else
                unWatch();
        });
    },
    getFormRef(){
        return this.vm.$refs[this.fRender.refName];
    },
    fields(){
        return Object.keys(this.formData);
    }
};

export default {
    install:formCreate.install,
    default:formCreate,
    maker,
    version
};