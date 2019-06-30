import Handler from "../../../factory/handler";
import {$set, dateFormat, isDate, timeStampToDate} from "../../../core/util";


export function getTime(date) {
    return isDate(date)
        ? dateFormat('hh:mm:ss', date)
        : date;
}

export function toDate(time) {
    return new Date('2018/02/14 ' + time);
}

export default class handler extends Handler {

    init() {
        let props = this.rule.props;
        if (!props.type) $set(props, 'type', 'time');
    }

    toFormValue(value) {
        let parseValue, isArr = Array.isArray(value);
        if (this.rule.props.isRange === true) {
            if (isArr && value.length === 2) {
                parseValue = value.map((time) => !time ? '' : getTime(timeStampToDate(time)));
            } else {
                parseValue = '';
            }
        } else {
            isArr && (value = value[0]);
            parseValue = !value ? '' : getTime(timeStampToDate(value));
        }

        return Array.isArray(parseValue) ? parseValue.map(time => !time ? '' : toDate(time)) : !parseValue ? '' : toDate(parseValue);
    }

    toValue(n) {
        let val = this.el.formatToString(n);
        if (this.rule.props.isRange === true && !val)
            val = ['', ''];
        return val;
    }

    mounted() {
        super.mounted();
        this.rule.value = this.el.displayValue;
        this.vm._changeFormData(this.field, this.toFormValue(this.el.displayValue));
    }
}
