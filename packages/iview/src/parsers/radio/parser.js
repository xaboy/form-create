import {BaseParser} from '@form-create/core';

export default class Parser extends BaseParser {
    toFormValue(value) {
        return this.rule.options.filter((opt) => opt.value === value).reduce((initial, opt) => opt.label, '')
    }

    toValue(parseValue) {
        return this.rule.options.filter((opt) => opt.label === parseValue).reduce((initial, opt) => opt.value, '')
    }

    render(children) {
        return this.vNode.radio(this.$render.inputVData(this).props({
            'options': this.rule.options
        }), children);
    }

}