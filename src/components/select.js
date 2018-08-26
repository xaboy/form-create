import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray} from "../core/util";

const handler = handlerFactory({
    toParseValue(value){
	    let isArr = isArray(value);
	    if(this.rule.props.multiple === true)
	        return Array.from(isArr === true ? value : [value]);
	    else
	        return isArr === true ? (value[0] || '') : value;
    },
    toTrueValue(parseValue){
        return isArray(parseValue) ? Array.from(parseValue) : parseValue;
    }
});

const render =  renderFactory({
    parse(){
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.select(this.inputProps().get(),()=>options.map((option,index)=>this.cvm.option({props:option,key:`sopt${index}${unique}`})))];
    }
});

export default {handler,render};