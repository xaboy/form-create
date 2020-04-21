import {creatorTypeFactory} from '@form-create/core';

const name = 'datePicker';

export default ['date', 'month', 'week'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type);
    return initial
}, {
    dateRange: creatorTypeFactory(name, 'range'),
    datetimeRange: creatorTypeFactory(name, m => m.props({type: 'range', showTime: true}))
});
