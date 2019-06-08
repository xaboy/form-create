import {BaseParser} from '@form-create/core';


export default class Parser extends BaseParser {
    toFormValue(value) {
        let rule = this.rule, isArr = Array.isArray(value), props = rule.props, min = props.min || 0,
            parseValue;
        if (props.range === true) {
            parseValue = isArr ? value : [min, (parseFloat(value) || min)];
        } else {
            parseValue = isArr ? (parseFloat(value[0]) || min) : parseFloat(value);
        }
        return parseValue;
    }

}
