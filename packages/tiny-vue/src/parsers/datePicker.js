import {creatorFactory} from '@form-create/core/src/index';

const DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    week: 'yyyy-WW',
    quarter: 'yyyy-Q',
    year: 'yyyy',
    dates: 'yyyy-MM-dd',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    monthrange: 'yyyy-MM',
    yearrange: 'yyyy',
    datetimerange: 'yyyy-MM-dd HH:mm:ss'
};

const name = 'datePicker';

export default {
    name,
    maker: (function () {
        return ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimeRange', 'dateRange', 'monthRange', 'quarter']
            .reduce((initial, type) => {
                initial[type] = creatorFactory(name, {type: type.toLowerCase()});
                return initial;
            }, {});
    }()),
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!props.valueFormat) {
            props.valueFormat = DEFAULT_FORMATS[props.type] || DEFAULT_FORMATS['date'];
        }
    }
};
