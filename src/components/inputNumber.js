import Handler from "../factory/handler";
import Render from "../factory/render";
import {creatorFactory} from "../factory/creator";

const name = "inputNumber";

class handler extends Handler {
    toFormValue(value) {
        let parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue
    }

}


class render extends Render {
    parse() {
        return [this.vNode.inputNumber(this.inputProps().get())]
    }
}

const maker = {
    number: creatorFactory(name)
};

export default {handler, render, name, maker}
