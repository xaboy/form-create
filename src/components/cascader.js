import Handler from "../factory/handler";
import Render from "../factory/render";

const name = 'cascader';

class handler extends Handler {
    init() {
        let rule = this.rule;
        if (!rule.props.data) rule.props.data = [];
        if (!Array.isArray(this.rule.value)) this.rule.value = [];
    }

    toParseValue(value) {
        return Array.isArray(value) ? value : []
    }

    mounted() {
        super.mounted();
        this.vm.changeFormData(this.field, this.toParseValue(this.el.value));
    }
}

class render extends Render {
    parse() {
        return [this.vNode.cascader(this.inputProps().get())]
    }
}

export default {handler, render, name};
