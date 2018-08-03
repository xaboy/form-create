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
        return this.el.value === undefined ? this.vm.getFormData(this.field) : this.el.value;
    },
    toParseValue(value){
        return isArray(value) ? Array.from(value) : [];
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