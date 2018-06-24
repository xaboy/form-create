import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray} from "../core/util";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    init(){
        let rule = this.rule;
        if(!rule.props.data) rule.props.data = [];
        if(!isArray(this.value)) this.value = [];
    },
    toTrueValue(){
        if(this.el.value === undefined)
            return this.vm.getFormData(this.field);
        else
            return this.el.value;
    },
    toParseValue(value){
	    if(isArray(value))
	        return Array.from(value);
	    else
            return [];
    }
});

const render = renderFactory({
    parse(){
        return [this.cvm.cascader(this.inputProps().get())];
    }
});

const make = makerFactory('cascader',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}