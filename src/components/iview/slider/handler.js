import Handler from "../../../factory/handler";
import {$set} from "../../../core/util";


export default class handler extends Handler {
    init() {
        let rule = this.rule;
        $set(rule.props, 'min', rule.props.min === undefined
            ? 0
            : (parseFloat(rule.props.min) || 0));
    }

    toFormValue(value) {
        let rule = this.rule, isArr = Array.isArray(value), props = rule.props, min = props.min,
            parseValue;
        if (props.range === true) {
            parseValue = isArr ? value : [min, (parseFloat(value) || min)];
        } else {
            parseValue = isArr ? (parseFloat(value[0]) || min) : parseFloat(value);
        }
        return parseValue;
    }

}
