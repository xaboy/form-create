import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import {isArray} from "../core/util";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    init() {
        this.rule.props.min = this.rule.props.min === undefined
            ? 0
            : parseFloat(this.rule.props.min) || 0;
    },
    toParseValue(value) {
        let isArr = isArray(value),props = this.rule.props,min = props.min,parseValue;
        if(props.range === true){
            parseValue = isArr ? value : [min,(parseFloat(value) || min)];
        }else{
            parseValue = isArr ? (parseFloat(value[0]) || min) : parseFloat(value);
        }
        return parseValue;
    }
});

const render =  renderFactory({
    parse(){
        return [this.cvm.slider(this.inputProps().get())];
    }
});

const make = makerFactory('slider',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}