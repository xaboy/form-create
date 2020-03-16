import {BaseParser} from '@form-create/core';
import {timeStampToDate, $set} from '@form-create/utils';

export default class Parser extends BaseParser {
    init() {
        let props = this.rule.props;
        if ((props.startDate))
            $set(props, 'startDate', timeStampToDate(props.startDate));
    }

    isRange() {
        return this.el.type.includes('range') || this.el.multiple;
    }

    _toValue(val) {
        const value = this.el.formatDate(val || ''), {separator} = this.el,
            isRange = this.isRange();
        if (!value)
            return isRange ? (this.el.multiple ? [] : ['', '']) : value;
        else if (isRange)
            return value.split(separator);
        else
            return value;
    }

    toValue(formValue) {
        const el = this.$handle.vm.$refs[this.refName];
        if (el) {
            this.el = el;
            return this._toValue(formValue);
        }
        return formValue;
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
        this.toFormValue = (val) => {
            let v = this.el.parseDate(val);
            return this.isRange() ? v : v[0];
        };

        this.toValue = this._toValue;
    }
}
