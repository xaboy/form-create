import {Handler} from "@form-create/core";
import {timeStampToDate, $set, toString} from "@form-create/utils";

export default class handler extends Handler {
    init() {
        let props = this.rule.props;

        $set(props, 'type', !props.type
            ? 'date'
            : toString(props.type).toLowerCase());
    }

    toFormValue(value) {
        let isArr = Array.isArray(value), props = this.rule.props, parseValue;
        if (['daterange', 'datetimerange', 'dates'].indexOf(props.type) !== -1) {
            if (isArr) {
                parseValue = value.map((time) => !time ? '' : timeStampToDate(time));
            } else {
                parseValue = props.type === 'dates' ? [] : ['', ''];
            }
        } else if ('date' === props.type && props.multiple === true) {
            parseValue = toString(value);
        } else {
            parseValue = isArr ? (value[0] || '') : value;
            parseValue = !parseValue ? '' : timeStampToDate(parseValue);
        }
        return parseValue;
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

