import {BaseParser} from '@form-create/core';
import {timeStampToDate, $set, toString} from '@form-create/utils';

export default class Parser extends BaseParser {
    init() {
        let props = this.rule.props;
        if ((props.startDate))
            $set(props, 'startDate', timeStampToDate(props.startDate));
    }

    toFormValue(value) {
        let isArr = Array.isArray(value), props = this.rule.props, parseValue, type = props.type || 'date';
        if (['daterange', 'datetimerange'].indexOf(type) !== -1) {
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
        this.toValue = () => this.el.publicStringValue;
    }
}
