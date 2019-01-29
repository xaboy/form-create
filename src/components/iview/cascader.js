import Handler from "../../factory/handler";
import Render from "../../factory/render";
import {$set} from "../../core/util";

const name = 'cascader';

class handler extends Handler {
    init() {
        let rule = this.rule;
        if (!rule.props.data) $set(rule.props, 'data', []);
        if (!Array.isArray(this.rule.value)) $set(rule, 'value', []);
    }

    toFormValue(value) {
        return Array.isArray(value) ? value : []
    }

    mounted() {
        super.mounted();
        this.vm._changeFormData(this.field, this.toFormValue(this.el.value));
    }
}

class render extends Render {
    parse() {
        return [this.vNode.cascader(this.inputProps().get())]
    }
}

export default {handler, render, name};
