import moment from 'moment';
import {creatorFactory} from '@form-create/core/src/index';

const FORMAT_TYPE = {
    date: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    week: 'YYYY-wo',
    range: 'YYYY-MM-DD HH:mm:ss'
};

const getType = function (ctx) {
    const type = ctx.prop.props.type;
    if (['date', 'month', 'week', 'range'].indexOf(type) === -1) return 'date';
    return type;
};

const toMoment = function (val, format) {
    return val instanceof moment ? val : moment(val, format);
};

function getFormat(ctx) {
    const format = ctx.prop.props.format || (ctx.el ? ctx.el.format : '');
    if (format) {
        return format;
    }
    const type = getType(ctx);
    return (FORMAT_TYPE[type] + ((ctx.prop.props.showTime && (!type || type === 'date')) ? ' HH:mm:ss' : ''));
}

const name = 'datePicker';

export default {
    name,
    maker: (function () {
        return ['date', 'month', 'week'].reduce((initial, type) => {
            initial[type] = creatorFactory(name, {type});
            return initial
        }, {
            dateRange: creatorFactory(name, {type: 'range'}),
            datetimeRange: creatorFactory(name, m => m.props({type: 'range', showTime: true}))
        })
    }()),
    toFormValue(value, ctx) {
        let parseValue, type = getType(ctx);
        const format = getFormat(ctx);
        const isArr = Array.isArray(value);
        if (type === 'range') {
            if (isArr) {
                parseValue = value.map(v => v ? toMoment(v, format) : null);
            } else {
                parseValue = []
            }
        } else {
            parseValue = isArr ? ((value[0] ? toMoment(value[0], format) : null) || null) : (value ? toMoment(value, format) : null);
        }
        return parseValue;
    },
    toValue(formValue, ctx) {
        const format = getFormat(ctx);
        if (Array.isArray(formValue))
            return formValue.map(v => (v && v.format) ? v.format(format) : v);
        else
            return (formValue && formValue.format) ? formValue.format(format) : formValue;
    },
    render(children, ctx) {
        const type = getType(ctx) + 'Picker';
        return ctx.$render.vNode[type](ctx.prop, children);
    }

}
