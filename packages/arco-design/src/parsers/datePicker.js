import {creatorFactory} from '@form-create/core/src/index';

const FORMAT_TYPE = {
    date: 'YYYY-MM-DD',
    month: 'YYYY-MM',
    week: 'YYYY-wo',
    year: 'YYYY',
    quarter: 'YYYY-Q',
};

const name = 'datePicker';

export default {
    name,
    maker: (function () {
        return ['date', 'month', 'week', 'year', 'quarter'].reduce((initial, type) => {
            initial[type] = creatorFactory(name, {type});
            return initial
        }, {
            dateRange: creatorFactory(name, {type: 'range'}),
            datetimeRange: creatorFactory(name, m => m.props({range: true, showTime: true}))
        })
    }()),
    mergeProp(ctx) {
        const props = ctx.prop.props;
        const type = props.mode;
        if (!props.valueFormat) {
            props.valueFormat = (FORMAT_TYPE[type] || FORMAT_TYPE['date']) + ((props.showTime && (!type || type === 'date')) ? ' HH:mm:ss' : '');
        }
    },
    render(children, ctx) {
        return ctx.$render.vNode[(ctx.prop.props.range === true ? 'range' : 'date') + 'Picker'](ctx.prop, children);
    }

}
