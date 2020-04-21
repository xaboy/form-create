import {BaseParser} from '@form-create/core';
import moment from 'moment';

const FORMAT_TYPE = {
    date: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    week: 'YYYY-wo',
    range: 'YYYY-MM-DD HH:mm:ss'
};

const getType = function (type) {
    if (['date', 'month', 'week', 'range'].indexOf(type) === -1) return 'date';
    return type;
};

const toMoment = function (val) {
    return val instanceof moment ? val : moment(val);
};

export default class Parser extends BaseParser {

    toFormValue(value) {
        let parseValue, type = this.getType();
        const isArr = Array.isArray(value);
        if (type === 'range') {
            if (isArr) {
                parseValue = value.map(v => v ? toMoment(v) : null);
            } else {
                parseValue = []
            }
        } else {
            parseValue = isArr ? ((value[0] ? toMoment(value[0]) : null) || null) : (value ? toMoment(value) : null);
        }
        return parseValue;

    }

    toValue(formValue) {
        const format = this.getFormat();
        if (Array.isArray(formValue))
            return formValue.map(v => v ? v.format(format) : v);
        else
            return formValue ? formValue.format(format) : formValue;
    }

    getFormat() {
        return this.rule.props.format || (this.el ? this.el.format : '') || FORMAT_TYPE[getType(this.rule.props.type)];
    }

    getType() {
        return getType(this.rule.props.type);
    }

    render(children) {
        const type = this.getType() + 'Picker';
        return this.vNode[type](this.$render.inputVData(this), [children])
    }

}
