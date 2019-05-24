import {BaseParser} from '@form-create/core';
import {timeStampToDate, $set, isUndef, toString} from '@form-create/utils';

export default class Parser extends BaseParser {
    init() {
        let props = this.rule.props;

        $set(props, 'type', !props.type
            ? 'date'
            : toString(props.type).toLowerCase());

        if (isUndef(props.startDate))
            $set(props, 'startDate', timeStampToDate(props.startDate));
    }

    toFormValue(value) {
        let isArr = Array.isArray(value), props = this.rule.props, parseValue;
        if (['daterange', 'datetimerange'].indexOf(props.type) !== -1) {
            if (isArr) {
                parseValue = value.map((time) => !time ? '' : timeStampToDate(time));
            } else {
                parseValue = ['', '']
            }
        } else if ('date' === props.type && props.multiple === true) {
            parseValue = toString(value);
        } else {
            parseValue = isArr ? (value[0] || '') : value;
            parseValue = !parseValue ? '' : timeStampToDate(parseValue);
        }
        return parseValue;
    }

    toValue() {
        return this.el.publicStringValue;
    }

    mounted(vm) {
        this.rule.value = this.el.publicStringValue;
        vm._changeFormData(this.field, this.toFormValue(this.el.publicStringValue));
    }
}
