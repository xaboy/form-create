import {BaseParser} from '@form-create/core';
import {dateFormat, isDate, timeStampToDate} from '@form-create/utils';


export function getTime(date) {
    return isDate(date)
        ? dateFormat('hh:mm:ss', date)
        : date;
}

export default class Parser extends BaseParser {

    toFormValue(value) {
        let parseValue, isArr = Array.isArray(value);
        if ('timerange' === this.rule.props.type) {
            if (isArr) {
                parseValue = value.map((time) => !time ? '' : getTime(timeStampToDate(time)));
            } else {
                parseValue = ['', ''];
            }
        } else {
            isArr && (value = value[0]);
            parseValue = !value ? '' : getTime(timeStampToDate(value));
        }
        return parseValue;
    }

    mounted() {
        this.toValue = () => this.el.publicStringValue;
    }
}

