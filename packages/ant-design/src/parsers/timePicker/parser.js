import {BaseParser} from '@form-create/core';
import moment from 'moment';

const toMoment = function (val, format) {
    return val instanceof moment ? val : moment(val, format);
};

export default class Parser extends BaseParser {

    constructor(handle, rule, id) {
        super(handle, rule, id);
        this.modelEvent = 'change'
    }

    toFormValue(value) {
        return value ? toMoment(value, this.getFormat()) : null;
    }

    toValue(formValue) {
        return formValue ? formValue.format(this.getFormat()) : formValue;
    }

    getFormat() {
        return this.rule.props.format || (this.el ? this.el.format : '') || 'HH:mm:ss';
    }
}

