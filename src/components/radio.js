import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";

const handler = handlerFactory({
    toParseValue(value) {
	    value = value.toString();
        return this.rule.options.filter((opt)=>opt.value.toString() === value).reduce((initial,opt)=>opt.label,'');
    },
    toTrueValue(parseValue) {
	    parseValue = parseValue.toString();
	    return this.rule.options.filter((opt)=>opt.label.toString() === parseValue).reduce((initial,opt)=>opt.value,'');
    }
});

const render =  renderFactory({
    parse(){
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.radioGroup(this.inputProps().get(),()=>options.map((option,index)=>this.cvm.radio({props:option,key:`ropt${index}${unique}`})))];
    }
});

export default {handler,render};