import {BaseParser} from '@form-create/core';
import {$set, isUndef} from '@form-create/utils';

export default class parser extends BaseParser {

    init() {
        const props = this.rule.props;
        if (isUndef(props.disabled)) $set(props, 'disabled', false);
    }

    toFormValue(value) {
        if (!value)
            value = [];
        else if (!Array.isArray(value))
            value = [value];
        return this.rule.options.filter((opt) => value.indexOf(opt.value) !== -1)
            .map((option) => option.label);
    }

    toValue(parseValue) {
        let value = this.rule.options.filter((opt) => parseValue.indexOf(opt.label) !== -1)
            .map((opt) => opt.value);
        if (this.rule.options.length === 1)
            return value[0] === undefined ? '' : value[0];
        else
            return value;
    }

    render(children) {
        let {unique, rule} = this;
        return this.vNode.checkboxGroup(this.r.inputVData(this), () => rule.options.map((option, index) => {
            let clone = {...option};
            delete clone.value;
            return this.vNode.checkbox({
                props: clone,
                key: `cbp_${index}${unique}`
            })
        }).concat(children));
    }

    watchFormValue(n, h) {
        h.refresh();
    }
}

