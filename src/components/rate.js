import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";
import makerFactory from "../factory/make";

const handler = handlerFactory({
    toParseValue(value) {
        let parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue;
    }
});

const render =  renderFactory({
    parse(){
        return [this.cvm.rate(this.inputProps().get())];
    }
});

const make = makerFactory('rate',['props','event','validate']);

const component = {handler,render,make};

export default component;

export {
    handler,render,make
}