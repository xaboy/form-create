import {BaseParser} from '@form-create/core';
import {dateFormat, isDate, timeStampToDate} from '@form-create/utils';


export function getTime(date) {
    return isDate(date)
        ? dateFormat('hh:mm:ss', date)
        : date;
}

export function toDate(time) {
    return new Date('2018/02/14 ' + time);
}

export default class Parser extends BaseParser {

    toFormValue(value) {
        let parseValue, isArr = Array.isArray(value);
        if (this.rule.props.isRange === true) {
            if (isArr) {
                parseValue = value.map((time) => !time ? '' : toDate(getTime(timeStampToDate(time))));
            } else {
                parseValue = null;
            }
        } else {
            isArr && (value = value[0]);
            parseValue = !value ? null :  toDate(getTime(timeStampToDate(value)));
        }
        return parseValue;
    }

    mounted() {
        this.toValue = (val) => this.el.formatToValue(val);
    }
}

