import {deepExtend, isArray, uniqueId} from "../core/util";

const handlerFactory = function (prototypeExtend = {}) {
    let $h = function (vm, rule) {
        handler.call(this,vm,rule);
    };
    $h.prototype = Object.create(handler.prototype);
    Object.assign($h.prototype, prototypeExtend);
    $h.prototype.constructor = $h;
    return $h;
};

const handler = function (vm,{field,type,title = '',options=[],props={},validate = [],event = {},value = '',slot = {}}) {
    field = field.toString();
    this.rule = {
        field, type, title, options, props,slot,
        value:deepExtend(Object.create(null),{value}).value,
        validate: isArray(validate) ? validate : [validate],
        event: Object.keys(event).reduce(function (initial,eventName) {
            initial[`on-${eventName}`] = event[eventName];
            return initial;
        },{}),
    };
    this.vm = vm;
    this.unique = uniqueId();
    this.refName = field+''+this.unique;
    this.el = {};
    this.verify();
    this.handle();
};

handler.prototype = {
    handle(){
        this.changeParseValue(this.rule.value);
    },
    verify(){

    },
    getField(){
        return this.rule.field;
    },
    getValidate(){
        return this.rule.validate;
    },
    getValue(){
        return this.parseValue;
    },
    changeValue(value){
        this.rule.value = value;
        this.handle();
    },
    getRule(){
        return this.rule;
    },
    getParseValue(){
        return this.parseValue
    },
    changeParseValue(parseValue,b = true){
        if(b === true)
            this.vm.changeFormData(this.rule.field,parseValue);
        this.parseValue = parseValue;
    },
    mounted(){
        this.el = this.vm.$refs[this.refName];
    }
};

export {
    handlerFactory
}