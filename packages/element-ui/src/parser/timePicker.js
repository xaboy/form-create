import {creatorTypeFactory} from '@form-create/core';

const name = 'timePicker';

export default {
    name,
    maker: {
        time: creatorTypeFactory(name, (m) => m.props.isRange = false),
        timeRange: creatorTypeFactory(name, (m) => m.props.isRange = true)
    },
    mergeProp() {
        const props = this.prop;
        if (!props.valueFormat) props.valueFormat = 'HH:mm:ss';
    }
}
