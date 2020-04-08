import {creatorTypeFactory} from '@form-create/core';

const name = 'timePicker';

export default {
    time: creatorTypeFactory(name, (m) => m.props.isRange = false),
    timeRange: creatorTypeFactory(name, (m) => m.props.isRange = true)
};