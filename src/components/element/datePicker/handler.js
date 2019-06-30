import Handler from "../../../factory/handler";
import {$set, toString} from "../../../core/util";

export default class handler extends Handler {
    init() {
        let props = this.rule.props;

        $set(props, 'type', !props.type
            ? 'date'
            : toString(props.type).toLowerCase());
    }

    toValue(n) {
        const type = this.rule.props.type, value = this.el.formatToString(n);
        if (!value && ['daterange', 'datetimerange'].indexOf(type) !== -1)
            return ['', ''];
        else
            return value;
    }

    mounted() {
        super.mounted();
        const value = this.el.formatToString(this.vm._formData(this.field));
        this.rule.value = value;
        this.setValue(value);
    }
}

