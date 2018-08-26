import handlerFactory from "../factory/handler";
import renderFactory from "../factory/render";

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

export default {handler,render};