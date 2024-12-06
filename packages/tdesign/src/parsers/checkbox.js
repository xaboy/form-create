import {hasProperty} from '@form-create/utils/lib/type';

export default {
    name: 'checkbox',
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!hasProperty(props, 'options'))
            props.options = ctx.prop.options || [];
    }

}
