import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray} from "../core/util";

const handler = handlerFactory({
    toParseValue(value){
        if(!value)
            value = [];
	    else if(!isArray(value))
		    value = [value];
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

export default {handler,render};
