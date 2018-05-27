import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    handle() {
        let parseValue = '';
        this.rule.options.forEach((option) => {
            option.value === this.rule.value && (parseValue = option.label);
        });
        this.changeParseValue(parseValue);
    }, getValue() {
        let parseValue = '';
        this.rule.options.forEach((option) => {
            option.label === this.parseValue && (parseValue = option.value);
        });
        return parseValue;
    }
});

const render =  renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.radioGroup(this.propsData,()=>options.map((option,index)=>this.cvm.radio({props:option,key:`ropt${index}${unique}`})))];
    }
});

const make = makeFactory('radio',['options','props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}