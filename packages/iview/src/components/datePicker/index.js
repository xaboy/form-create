import parser from './parser';
import {creatorTypeFactory} from '@form-create/core';

const name = 'datePicker';


const maker = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce((initial, type) => {
    initial[type] = creatorTypeFactory(name, type.toLowerCase());
    return initial
}, {});


export default {parser, name, maker};
