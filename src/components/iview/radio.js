import Handler from "../../factory/handler";
import Render from "../../factory/render";

const name = "radio";

class handler extends Handler {
    toFormValue(value) {
        return this.rule.options.filter((opt) => opt.value === value).reduce((initial, opt) => opt.label, '')
    }

    toValue(parseValue) {
        return this.rule.options.filter((opt) => opt.label === parseValue).reduce((initial, opt) => opt.value, '')
    }

}

class render extends Render {
    parse() {
        let {unique, rule: {options}} = this.handler;
        return [this.vNode.radioGroup(this.inputProps().get(), () => options.map((option, index) => {
            let clone = {...option};
            delete clone.value;

            return this.vNode.radio({
                props: clone,
                key: `ropt${index}${unique}`
            })
        }))]
    }
}

export default {handler, render, name}
