import {hasProperty} from '@form-create/utils/lib/type';

const name = 'radio';

export default {
    name,
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!hasProperty(props, 'options'))
            props.options = ctx.prop.options || [];
    },
};
