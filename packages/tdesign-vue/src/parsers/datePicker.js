import {creatorFactory} from '@form-create/core/src/index';

const DEFAULT_FORMATS = {
    date: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    datetime: 'YYYY-MM-DD HH:mm:ss',
    timerange: 'HH:mm:ss',
    daterange: 'YYYY-MM-DD',
    monthrange: 'YYYY-MM',
    datetimerange: 'YYYY-MM-DD HH:mm:ss',
    year: 'YYYY'
};

const name = 'datePicker';

export default {
    name,
    maker: (function () {
        return ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimeRange', 'dateRange', 'monthRange'].reduce((initial, type) => {
            initial[type] = creatorFactory(name, {type: type.toLowerCase()});
            return initial
        }, {});
    }()),
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!props.valueFormat) {
            props.valueFormat = DEFAULT_FORMATS[props.type] || DEFAULT_FORMATS['date'];
        }
    }
}
