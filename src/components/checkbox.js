import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray} from "../core/util";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    toParseValue(value){
	    if(false === isArray(value))
		    value = [value];
	    value = value.map((v)=>v.toString());
        return this.rule.options.filter((opt)=>value.indexOf(opt.value) !== -1)
            .map((option) =>option.label);
    },
    toTrueValue(parseValue){
        let value = this.rule.options.filter((opt)=>parseValue.indexOf(opt.label) !== -1)
            .map((opt)=>opt.value);
        if(this.rule.options.length === 1)
            return value[0] === undefined ? '' : value[0];
        else
            return value;
    }
});

const render =  renderFactory({
    parse(){
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.checkboxGroup(this.inputProps().get(),()=>options.map((option,index)=>this.cvm.checkbox({props:option,key:`copt${index}${unique}`})))];
    }
});

const make = makerFactory('checkbox',['options','props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}