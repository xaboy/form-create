import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    handle() {
        let parseValue = parseFloat(this.rule.value);
        if (Number.isNaN(parseValue)) parseValue = '';
        this.changeParseValue(parseValue);
    }
});

const render =  renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.inputNumber(this.propsData)];
    }
});

const make = makeFactory('inputnumber',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}