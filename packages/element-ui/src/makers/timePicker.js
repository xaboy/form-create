import {creatorTypeFactory} from '@form-create/core';

const name = 'timePicker';

export default {
    time: creatorTypeFactory(name, 'time'),
    timeRange: creatorTypeFactory(name, 'timerange')
};