import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import makerFactory from "../factory/make";

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

const make = makerFactory('radio',['options','props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}