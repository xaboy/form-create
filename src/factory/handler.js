import {isArray, isNumeric, uniqueId,toLine} from "../core/util";

const handlerFactory = function (prototypeExtend = {}) {
    let $h = function (vm, rule) {
        handler.call(this,vm,rule);
    };
    $h.prototype = Object.create(handler.prototype);
    Object.assign($h.prototype, prototypeExtend);
    $h.prototype.constructor = $h;
    return $h;
};



const handler = function (vm,rule) {
    let {model,field,type,validate = [],event = {},value = '',col = {},emit = [],props = {}} = rule;
    field = field.toString();
    this.type = type;
    this.model = model;
    this.value = value;
    if(isNumeric(col)){
    	col = {span:col};
    }else if(col.span === undefined)
    	col.span = 24;
    if(props && props.hidden === undefined) props.hidden = false;
    if(props && props.visibility === undefined) props.visibility = false;
    rule.event = Object.keys(event).reduce(function (initial,eventName) {
        initial[`on-${eventName}`] = event[eventName];
        return initial;
    },{});

    emit.forEach((eventName)=>{
        rule.event[`on-${eventName}`] = (...arg)=>{
            vm.$emit(toLine(`${field}-${eventName}`).replace('_','-'),...arg);
        };
    });

    rule.validate = isArray(validate) ? validate : [validate];
    rule.col = col;
    rule.props = props;
    this.rule = rule;
    this.field = field;
    this.vm = vm;
    this.unique = uniqueId();
    this.refName = field+''+this.unique;
    this.el = {};
    this.init();
};

handler.prototype = {
	init(){

    },
	toParseValue(value)
	{
		return value.toString();
	},
    toTrueValue(parseValue){
	    return parseValue;
    },
	setValue(value){
	    this.vm.changeTrueData(this.field,value);
	},
    getValue(){
        return this.vm.getTrueDataValue(this.field);
    },
    setParseValue(parseValue){
        this.setValue(this.toTrueValue(parseValue));
    },
	watchTrueValue(n){
		this.vm.changeFormData(this.field,this.toParseValue(n));
	},
	mounted(){

	},
	mounted_(){
		this.el = this.vm.$refs[this.refName];
		this.mounted();
    }
};

export default handlerFactory;
