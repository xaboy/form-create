import {BaseParser} from '@form-create/core';
import {timeStampToDate} from '@form-create/utils';

export default class Parser extends BaseParser {

    toFormValue(value) {
        let isArr = Array.isArray(value), props = this.rule.props, parseValue, type = props.type || 'date';
        if (['daterange', 'datetimerange', 'dates'].indexOf(type) !== -1) {
            if (isArr) {
                parseValue = value.map((time) => !time ? '' : timeStampToDate(time));
            } else {
                parseValue = ['', '']
            }
        } else if ('date' === type && props.multiple === true) {
            parseValue = toString(value);
        } else {
            parseValue = isArr ? (value[0] || '') : value;
            parseValue = !parseValue ? '' : timeStampToDate(parseValue);
        }
        return parseValue;
    }

    mounted() {
        this.toValue = (val) => (this.el.formatToString(val) || '');
        this.toFormValue = (val) => this.el.parseString(val);
    }
}
