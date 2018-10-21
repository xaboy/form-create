import {isArray} from "../core/util";
import props from '../core/props';

const creatorFactory = function (type) {
    return function $m(title,field,value = '') {
        return new creator(Object.assign(baseRule(),{type,title,field,value}));
    }
};


const baseRule = ()=>{
    return {
        event:{},
        validate:[],
        options:[],
        col:{},
        children:[],
        emit:[],
        template:null
    };
};

const creator = function (rule) {
    props.call(this);
    this.rule = rule;
    this.get = function () {
        return this._data;
    };
    this.props({hidden:false,visibility:false});
};

creator.prototype = props.prototype;

creator.constructor = creator;

const objAttrs = ['event','col'];

objAttrs.forEach((attr)=>{
    creator.prototype[attr] = function (opt) {
       this.rule[attr] = Object.assign(this.rule[attr],opt);
       return this;
   }
});

const arrAttrs = ['validate','options','children','emit'];

arrAttrs.forEach((attr)=>{
    creator.prototype[attr] = function (opt) {
        if(!isArray(opt)) opt = [opt];
        this.rule[attr] = this.rule[attr].concat(opt);
        return this;
    }
});

creator.prototype.getRule = function () {
    return Object.assign(this.rule,this.get());
};

creator.prototype.setValue = function (value) {
	this.rule.value = value;
	return this;
};

creator.prototype.model = function (model,field) {
    if(!field) field = this.rule.field;
    this.rule.model = (v)=>{
	    model[field] = v;
    };
};

export default creatorFactory;

export {
    creator
}
