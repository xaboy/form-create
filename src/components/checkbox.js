import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import {isArray} from "../core/util";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    handle() {
        let parseValue = [];
        if(false === isArray(this.rule.value))
            this.rule.value = [this.rule.value];
        this.rule.value.forEach((val) => {
            this.rule.options.forEach((option) => {
                option.value === val && (parseValue.push(option.label));
            });
        });
        this.changeParseValue(parseValue);
    }, getValue() {
        let parseValue = [];
            this.parseValue.forEach((value) => {
                this.rule.options.forEach((option) => {
                    option.label === value && (parseValue.push(option.value));
                });
            });
            parseValue = this.rule.options.length === 1
                ? parseValue[0] === undefined
                    ? ''
                    : parseValue[0]
                : parseValue;
        return parseValue;
    }
});

const render =  renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.checkboxGroup(this.propsData,()=>options.map((option,index)=>this.cvm.checkbox({props:option,key:`copt${index}${unique}`})))];
    }
});

const make = makeFactory('checkbox',['options','props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}