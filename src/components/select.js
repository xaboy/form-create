import Handler from "../factory/handler";
import Render from "../factory/render";
import {creatorTypeFactory} from "../factory/creator";

const name = "select";

class handler extends Handler {
    toParseValue(value) {
        let isArr = Array.isArray(value);
        if (this.rule.props.multiple === true)
            return isArr === true ? value : [value];
        else
            return isArr === true ? (value[0] || '') : value;
    }
}

class render extends Render {
    parse() {
        let {unique, rule: {options}} = this.handler;
        return [this.vNode.select(this.inputProps().get(), () => options.map((option, index) => this.vNode.option({
            props: option,
            key: `sopt${index}${unique}`
        })))];
    }
}

const maker = {
    selectMultiple: creatorTypeFactory(name, true, 'multiple'),
    selectOne: creatorTypeFactory(name, false, 'multiple'),
};

export default {handler, render, name, maker};
