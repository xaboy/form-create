import Handler from "../factory/handler";
import Render from "../factory/render";
import {extend} from "../core/util";

const name = "radio";

class handler extends Handler {
    toParseValue(value) {
        return this.rule.options.filter((opt) => opt.value === value).reduce((initial, opt) => opt.label, '')
    }

    toTrueValue(parseValue) {
        return this.rule.options.filter((opt) => opt.label === parseValue).reduce((initial, opt) => opt.value, '')
    }

}

class render extends Render {
    parse() {
        let {unique, rule: {options}} = this.handler;
        return [this.vNode.radioGroup(this.inputProps().get(), () => options.map((option, index) => {
            let clone = extend({}, option);
            delete clone.value;

            return this.vNode.radio({
                props: clone,
                key: `ropt${index}${unique}`
            })
        }))]
    }
}

export default {handler, render, name}
