import parser from './parser';
import {creatorTypeFactory} from '@form-create/core';

const name = 'timePicker';

const maker = {
    time: creatorTypeFactory(name, 'time'),
    timeRange: creatorTypeFactory(name, 'timerange')
};


export default {parser, name, maker};
