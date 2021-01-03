import moment from 'moment';

const toMoment = function (val, format) {
    return val instanceof moment ? val : moment(val, format);
};

function getFormat(ctx) {
    return ctx.prop.props.format || (ctx.el ? ctx.el.format : '') || 'HH:mm:ss';
}

export default {
    name: 'timePicker',
    toFormValue(value, ctx) {
        return value ? toMoment(value, getFormat(ctx)) : null;
    },

    toValue(formValue, ctx) {
        return formValue ? formValue.format(getFormat(ctx)) : formValue;
    },

}

