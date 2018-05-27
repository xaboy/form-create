import {handlerFactory} from "../factory/handler";
import {renderFactory} from "../factory/render";
import makeFactory from "../factory/make";

const handler = handlerFactory({
    handle() {
        let parseValue = parseFloat(this.rule.value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        this.changeParseValue(parseValue);
    }
});

const render =  renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.rate(this.propsData)];
    }
});

const make = makeFactory('rate',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}