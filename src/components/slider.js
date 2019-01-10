import Handler from "../factory/handler";
import Render from "../factory/render";
import {creatorTypeFactory} from "../factory/creator";
import {$set} from "../core/util";

const name = "slider";

class handler extends Handler {
    init() {
        let rule = this.rule;
        $set(rule.props, 'min', rule.props.min === undefined
            ? 0
            : (parseFloat(rule.props.min) || 0));
    }

    toFormValue(value) {
        let rule = this.rule, isArr = Array.isArray(value), props = rule.props, min = props.min,
            parseValue;
        if (props.range === true) {
            parseValue = isArr ? value : [min, (parseFloat(value) || min)];
        } else {
            parseValue = isArr ? (parseFloat(value[0]) || min) : parseFloat(value);
        }
        return parseValue;
    }

}

class render extends Render {
    parse() {
        return [this.vNode.slider(this.inputProps().get())];
    }
}

const maker = {
    sliderRange: creatorTypeFactory(name, true, 'range')
};

export default {handler, render, name, maker};
