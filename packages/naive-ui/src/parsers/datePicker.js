import {creatorFactory} from '@form-create/core/src/index';

const name = 'datePicker';

export default {
    name,
    modelField: 'formatted-value',
    maker: (function () {
        return ['year', 'month', 'date', 'datetime', 'datetimeRange', 'quarter', 'dateRange'].reduce((initial, type) => {
            initial[type] = creatorFactory(name, {type: type.toLowerCase()});
            return initial
        }, {});
    }())
}
