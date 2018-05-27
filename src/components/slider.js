import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import {isArray} from "../core/util";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    verify() {
        this.rule.props.min = this.rule.props.min === undefined
            ? 0
            : parseFloat(this.rule.props.min);
    },
    handle() {
        let isArr = isArray(this.rule.value),min = this.rule.props.min,parseValue;
        if(this.rule.props.range === true){
            parseValue = isArr ? this.rule.value : [min,parseFloat(this.rule.value) || min];
        }else{
            parseValue = isArr ? (parseFloat(this.rule.value[0]) || min) : parseFloat(this.rule.value);
        }
        this.changeParseValue(parseValue);
    }
});

const render =  renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.slider(this.propsData)];
    }
});

const make = makeFactory('slider',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}