import {creatorFactory} from '@form-create/core/src/index';

const DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    week: 'yyyy-wo',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    timerange: 'HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    monthrange: 'yyyy-MM',
    datetimerange: 'yyyy-MM-dd HH:mm:ss',
    year: 'yyyy'
};

const name = 'datePicker';

export default {
    name,
    modelField: 'formatted-value',
    maker: (function () {
        return ['year', 'month', 'date', 'datetime', 'datetimeRange', 'quarter', 'dateRange'].reduce((initial, type) => {
            initial[type] = creatorFactory(name, {type: type.toLowerCase()});
            return initial
        }, {});
    }()),
    mergeProp(ctx) {
        const props = ctx.prop.props
        if(!props.valueFormat) {
            props.format = DEFAULT_FORMATS[props.type] || DEFAULT_FORMATS['date'];
        }
    }
}
