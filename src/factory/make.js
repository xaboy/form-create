import {isArray} from "../core/util";

const makerFactory = function (type, attrs) {
    return function $m(title,field,value = '') {
        let rule = baseRule();
        rule.type = type;
        rule.title = title;
        rule.field = field;
        rule.value = value;
        return new make(rule, attrs);
    }
};

const baseRule = ()=>{
    return {
        props:{},
        event:{},
        validate:[],
        options:[],
        slot:{},
    };
};


const make = function (rule,attrs) {
    this.rule = rule;
    attrs.forEach((attr)=>{
        this[attr] = attrHandlers[attr];
    });
};

const attrHandlers = {};

const objAttrs = ['props','event','slot'];

objAttrs.forEach((attr)=>{
    attrHandlers[attr] = function (opt) {
       this.rule[attr] = Object.assign(this.rule[attr],opt);
       return this;
   }
});

const arrAttrs = ['validate','options'];

arrAttrs.forEach((attr)=>{
    attrHandlers[attr] = function (opt) {
        if(!isArray(opt)) opt = [opt];
        this.rule[attr] = this.rule[attr].concat(opt);
        return this;
    }
});

make.prototype.getRule = function () {
    return this.rule;
};

make.prototype.setValue = function (value) {
	this.rule.value = value;
	return this;
};

make.prototype.model = function (model,field) {
    if(!field) field = this.rule.field;
    this.rule.model = (v)=>{
	    model[field] = v;
    };
};

export default makerFactory;

export {
    make
}
