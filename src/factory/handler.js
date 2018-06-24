import {isArray, uniqueId} from "../core/util";

const handlerFactory = function (prototypeExtend = {}) {
    let $h = function (vm, rule) {
        handler.call(this,vm,rule);
    };
    $h.prototype = Object.create(handler.prototype);
    Object.assign($h.prototype, prototypeExtend);
    $h.prototype.constructor = $h;
    return $h;
};

const handler = function (vm,{model,field,type,title = '',options=[],props={},validate = [],event = {},value = '',slot = {}}) {
    field = field.toString();
    this.type = type;
    this.model = model;
    this.value = value;
    this.rule = {
        title, options, props,slot,
        validate: isArray(validate) ? validate : [validate],
        event: Object.keys(event).reduce(function (initial,eventName) {
            initial[`on-${eventName}`] = event[eventName];
            return initial;
        },{}),
    };
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
		this.vm.changeFormData(this.field,this.toParseValue(n.value));
	},
    mounted(){
        this.el = this.vm.$refs[this.refName];
    }
};

export default handlerFactory;