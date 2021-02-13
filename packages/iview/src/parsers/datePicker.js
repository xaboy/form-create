import is from '@form-create/utils/lib/type';
import {creatorFactory} from '@form-create/core/src/index';

export function timeStampToDate(timeStamp) {
    if (is.Date(timeStamp))
        return timeStamp;
    else {
        let date = new Date(timeStamp);
        return date.toString() === 'Invalid Date' ? timeStamp : date;
    }
}

const name = 'datePicker';

export default {
    name,
    maker: (function () {
        return ['date', 'dateRange', 'datetime', 'datetimeRange', 'year', 'month'].reduce((maker, type) => {
            maker[type] = creatorFactory(name, {type: type.toLowerCase()});
            return maker;
        }, {});
    }()),
    mergeProp(ctx) {
        let props = ctx.prop.props;
        if (props.startDate) {
            props.startDate = props.startDate && timeStampToDate(props.startDate);
        }
    },

    isRange(el) {
        return el.type.includes('range') || el.multiple;
    },

    _toValue(val, ctx) {
        const value = ctx.el.formatDate(val || ''), {separator} = ctx.el,
            isRange = this.isRange(ctx.el);
        if (!value)
            return isRange ? (ctx.el.multiple ? [] : ['', '']) : value;
        else if (isRange)
            return value.split(separator);
        else
            return value;
    },

    toValue(formValue, ctx) {
        const el = ctx.el;
        if (el) {
            this.el = el;
            return this._toValue(formValue, ctx);
        }
        return formValue;
    },

    toFormValue(value, ctx) {
        if (ctx.el) {
            const v = ctx.el.parseDate(value);
            return this.isRange(ctx.el) ? v : v[0];
        } else {
            let isArr = Array.isArray(value), props = ctx.prop.props, parseValue, type = props.type || 'date';
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
    },
    mounted(ctx) {
        ctx.rule.value = this.toValue(ctx.$handle.getFormData(ctx), ctx);
    }
}
