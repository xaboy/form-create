import Handler from "../../../factory/handler";
import {$set, isUndef} from "../../../core/util";


export default class handler extends Handler {

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

    watchFormValue(n) {
        super.watchFormValue(n);
        this.render.sync();
    }
}

