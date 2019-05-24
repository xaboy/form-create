import {BaseParser} from '@form-create/core';

export default class Parser extends BaseParser {
    toFormValue(value) {
        return this.rule.options.filter((opt) => opt.value === value).reduce((initial, opt) => opt.label, '')
    }

    toValue(parseValue) {
        return this.rule.options.filter((opt) => opt.label === parseValue).reduce((initial, opt) => opt.value, '')
    }

    render(children) {
        let {unique, rule: {options}} = this;
        return this.vNode.radioGroup(this.r.inputVData(this), () => options.map((option, index) => {
            let clone = {...option};
            delete clone.value;

            return this.vNode.radio({
                props: clone,
                key: `ropt${index}${unique}`
            })
        }).concat(children));
    }

}