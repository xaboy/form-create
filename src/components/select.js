import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import {isArray} from "../core/util";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    handle() {
        let isArr = isArray(this.rule.value),parseValue;
        if(this.rule.props && this.rule.props.multiple === true)
            parseValue = (isArr === true
                ? this.rule.value
                : [this.rule.value]);
        else
            parseValue = (isArr === true
                ? this.rule.value[0]
                : this.rule.value);
        this.changeParseValue(parseValue);
    }
});

const render =  renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.select(this.propsData,()=>options.map((option,index)=>this.cvm.option({props:option,key:`sopt${index}${unique}`})))];
    }
});

const make = makeFactory('select',['options','props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}