import {hasProperty} from '@form-create/utils/lib/type';

export default {
    name: 'select',
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!hasProperty(props, 'options'))
            props.options = ctx.prop.options || [];
    }

}
