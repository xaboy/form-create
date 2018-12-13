import Handler from "../factory/handler";
import Render from "../factory/render";

const name = "rate";

class handler extends Handler {
    toParseValue(value) {
        let parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue
    }

}

class render extends Render {
    parse() {
        return [this.vNode.rate(this.inputProps().get())]
    }
}

export default {handler, render, name};
