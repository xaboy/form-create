import Handler from "../../../factory/handler";
import {$set} from "../../../core/util";

export default class handler extends Handler {
    init() {
        let rule = this.rule;
        if (!rule.props.data) $set(rule.props, 'data', []);
        if (!rule.props.options) $set(rule.props, 'options', []);
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
