import {creatorTypeFactory} from '@form-create/core';

const name = 'datePicker';

export default ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce((maker, type) => {
    maker[type] = creatorTypeFactory(name, type.toLowerCase());
    return maker;
}, {});