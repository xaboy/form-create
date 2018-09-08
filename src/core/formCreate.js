import {deepExtend, isElement, isBool,isFunction,isArray} from "./util";
import {formCreateStyle, getConfig, getComponent, getGlobalApi, getMaker} from "./common";
import formRender from "../components/form";
import formCreateComponent from "./formCreateComponent";
import {formCreateName,$FormCreate} from './component';

const version = '1.4.1';

const maker = getMaker();

const formCreateStyleElId = 'form-create-style';

const formCreate = function (rules,_options) {
    if(!this instanceof formCreate)
        throwIfMissing('formCreate is a constructor and should be called with the `new` keyword');

    if(isBool(_options.sumbitBtn))
        _options.sumbitBtn = {show:_options.sumbitBtn};
    if(isBool(_options.resetBtn))
        _options.resetBtn = {show:_options.resetBtn};

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
    this.rules.forEach((rule,index)=>{
        if(isFunction(rule.getRule))
            this.rules[index] = rule.getRule();
    });
};

formCreate.createStyle = function () {
    if (document.getElementById(formCreateStyleElId) !== null) return;
    let style = document.createElement('style');
    style.id = formCreateStyleElId;
    style.innerText = formCreateStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
};

formCreate.create = function(rules,_opt = {},_vue = window.Vue){
	let opt = isElement(_opt) ? {el:_opt} : _opt;

	let fComponent = new formCreate(
		rules,
		deepExtend(Object.create(null),opt)
		),
		$vm = fComponent.create(_vue);
	return fComponent.fCreateApi;
};

formCreate.install = function(Vue,globalOptions = {}){
    formCreate.createStyle();
	Vue.prototype.$formCreate = function (rules,opt) {
        return formCreate.create(rules,deepExtend(deepExtend(Object.create(null),opt),globalOptions),Vue)
	};

    Vue.prototype.$formCreate.version = version;
    Vue.prototype.$formCreate.maker = maker;
    Vue.component(formCreateName,$FormCreate());
};

formCreate.prototype = {
    setHandler(handler){
        let rule = handler.rule,field = handler.field;
        this.handlers[field] = handler;
        if(handler.noValue === true) return ;
        this.formData[field] = handler.toParseValue(handler.value);
        this.validate[field] = rule.validate;
        this.trueData[field] = {
        	value:handler.toTrueValue(this.formData[field]),
	        rule:handler.rule
        };
    },
    notField(field){
        return this.fieldList.indexOf(field) === -1;
    },
    createHandler(){
        this.rules.filter(rule=>rule.type !== undefined || rule.field !== undefined).forEach((rule)=> {
            rule.field = rule.field === undefined ? '' : rule.field;
            if(this.notField(rule.field.toString())){
                let handler = getComponent(this.vm,rule,this.options);
                this.createChildren(handler);
                this.setHandler(handler);
                this.fieldList.push(handler.field);
            }else{
                console.error(`${rule.field} 字段已存在`);
            }

        });

    },
    createChildren(handler){
        handler.childrenHandlers = [];
        if (isArray(handler.rule.children) && handler.rule.children.length > 0){
            handler.rule.children.map((rule)=>{
                if(isFunction(rule.getRule))
                    rule = rule.getRule();
                rule.field = rule.field === undefined ? '' : rule.field;
                if(this.notField(rule.field.toString())){
                    let _handler = getComponent(this.vm,rule,this.options);
                    this.createChildren(_handler);
                    handler.childrenHandlers.push(_handler);
                }else{
                    console.error(`${rule.field} 字段已存在`);
                }
            });
        }
    },
    init(vm){
        this.vm = vm;
        this.createHandler();
        this.fCreateApi = getGlobalApi(this);
        vm.$set(vm,'cptData',this.formData);
        vm.$set(vm,'trueData',this.trueData);
        vm.$set(vm,'buttonProps',this.options.submitBtn);
        vm.$set(vm,'resetProps',this.options.resetBtn);
        this.fRender = new formRender(this);
    },
    create(Vue){
        let $fCreate = Vue.extend(this.component()),$vm = new $fCreate().$mount();
        this.options.el.appendChild($vm.$el);
        return $vm;
    },
    mounted(vm){
        Object.keys(vm.cptData).map((field)=>{
            let handler = this.handlers[field];
            handler.model && handler.model(vm.getTrueData(field));
            this.addHandlerWatch(handler);
            handler.mounted_();
        });
        this.options.mounted && this.options.mounted();
        this.vm = vm;
    },
    component(){
        return formCreateComponent(this);
    },
    append(rule,after,pre){
        if(isFunction(rule.getRule))
            rule = rule.getRule();
        let _rule = deepExtend(Object.create(null),rule);
        if(Object.keys(this.handlers).indexOf(rule.field.toString()) !== -1)
            throw new Error(`${_rule.field}字段已存在`);
        let handler = getComponent(this.vm,_rule,this.options);
        this.createChildren(handler);
	    this.vm.setField(handler.field);
        this.fRender.setRender(handler,after || '',pre);
        this.setHandler(handler);
        this.addHandlerWatch(handler);
        this.vm.$nextTick(()=>{
            handler.mounted_();
        });
    },
    removeField(field){
        if(this.handlers[field] === undefined)
            throw new Error(`${field}字段不存在`);
        this.handlers[field].watch.map((unWatch)=>unWatch());
        this.vm.removeFormData(field);
        delete this.handlers[field];
        delete this.validate[field];
        this.fRender.removeRender(field);
        delete this.formData[field];
        delete this.trueData[field];
    },
    addHandlerWatch(handler){
        if(handler.noValue === true) return ;
    	let field = handler.field;
	    let unWatch = this.vm.$watch(`cptData.${field}`,(n,o)=>{
		    if(this.handlers[field] !== undefined){
			    handler.setParseValue(n);
		    }else
			    unWatch();
	    },{deep:true});
	    let unWatch2 = this.vm.$watch(`trueData.${field}`,(n,o)=>{
		    if(this.handlers[field] !== undefined){
		    	let json = JSON.stringify(n);
		    	if(this.vm.jsonData[field] !== json){
				    this.vm.jsonData[field] = json;
				    handler.model && handler.model(this.vm.getTrueData(field));
				    handler.watchTrueValue(n);
			    }
		    }else
			    unWatch2();
	    },{deep:true});
        handler.watch = [unWatch,unWatch2];
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

export {
    formCreate
}
