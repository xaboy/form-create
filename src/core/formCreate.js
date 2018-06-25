import {deepExtend, isElement} from "./util";
import {formCreateStyle, getConfig, createHandler, getGlobalApi, getMaker} from "./common";
import formRender from "../components/form";
import formCreateComponent from "./formCreateComponent";
import {make} from "../factory/make";

const version = '1.3.1';

const maker = getMaker();

const formCreateStyleElId = 'form-create-style';

const formCreate = function (rules,_options) {
    if(!this instanceof formCreate)
        throwIfMissing('formCreate is a constructor and should be called with the `new` keyword');
	let options = deepExtend(deepExtend(Object.create(null),getConfig()),_options);
    this.rules = Array.isArray(rules) ? rules : [];
    this.handlers = {};
    this.fRender = {};
    this.formData ={};
    this.validate ={};
	this.trueData = {};
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

formCreate.create = function(rules,_opt = {},v = window.Vue){
	let opt = isElement(_opt) ? {el:_opt} : _opt;
	let fComponent = new formCreate(
		rules,
		deepExtend(Object.create(null),opt)
		),
		$vm = fComponent.create(v);
	return fComponent.fCreateApi;
};

formCreate.install = function(Vue,globalOptions = {}){
    formCreate.createStyle();
	Vue.prototype.$formCreate = function (rules,opt) {
        return formCreate.create(rules,deepExtend(deepExtend(Object.create(null),opt),globalOptions),Vue)
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
        let rule = handler.rule,field = handler.field;
        this.handlers[field] = handler;
        this.formData[field] = handler.toParseValue(handler.value);
        this.validate[field] = rule.validate;
        this.trueData[field] = {
        	value:handler.toTrueValue(this.formData[field]),
	        rule:handler.rule
        };
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
            if(this.fieldList.indexOf(handler.field) === -1){
                this.setHandler(handler);
                this.fieldList.push(handler.field);
            }else{
                console.error(`${handler.field} 字段已存在`);
            }
        });
        this.fCreateApi = getGlobalApi(this);
        vm.$set(vm,'formData',this.formData);
	    vm.$set(vm,'trueData',this.trueData);
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
        if(Object.keys(this.handlers).indexOf(handler.field) !== -1)
            throw new Error(`${_rule.field}字段已存在`);
	    this.vm.setField(handler.field);
        this.fRender.setRender(handler,after || '',pre);
        this.setHandler(handler);
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
	    delete this.trueData[field];
    },
    addHandlerWatch(handler){
    	let field = handler.field;
	    let unWatch = this.vm.$watch(`formData.${field}`,(n,o)=>{
		    if(handler !== undefined){
			    handler.setParseValue(n);
		    }else
			    unWatch();
	    },{deep:true});
	    let unWatch2 = this.vm.$watch(`trueData.${field}`,(n,o)=>{
		    if(handler !== undefined){
		    	let json = JSON.stringify(n);
		    	if(this.vm.jsonData[field] !== json){
				    this.vm.jsonData[field] = json;
				    handler.model && handler.model(this.vm.getTrueData(field));
				    handler.watchTrueValue(n);
			    }
		    }else
			    unWatch2();
	    },{deep:true});
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
    create:formCreate.create,
    maker,
    version
};