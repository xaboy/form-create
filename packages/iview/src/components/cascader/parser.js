import {BaseParser} from '@form-create/core';
import {$set} from '@form-create/utils';

export default class Parser extends BaseParser {
    init() {
        let rule = this.rule;
        if (!rule.props.data) $set(rule.props, 'data', []);
        if (!rule.props.options) $set(rule.props, 'options', []);
        if (!Array.isArray(this.rule.value)) $set(rule, 'value', []);
    }

    toFormValue(value) {
        return Array.isArray(value) ? value : []
    }

    mounted(vm) {
        vm._changeFormData(this.field, this.toFormValue(this.el.value));
    }
}