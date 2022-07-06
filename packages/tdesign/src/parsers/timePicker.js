import {creatorFactory} from '@form-create/core/src/index';

const name = 'timePicker';

export default {
    name,
    maker: {
        time: creatorFactory(name, (m) => m.props.isRange = false),
        timeRange: creatorFactory(name, (m) => m.props.isRange = true)
    },
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!props.valueFormat) {
            props.valueFormat = 'HH:mm:ss';
        }
    }
}
