import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    toParseValue(value) {
        let parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = '';
        return parseValue;
    }
});

const render =  renderFactory({
    parse(){
        return [this.cvm.inputNumber(this.inputProps().get())];
    }
});

const make = makerFactory('inputnumber',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}