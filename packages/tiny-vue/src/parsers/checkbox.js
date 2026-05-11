import toArray from '@form-create/utils/lib/toarray';
import {hasProperty} from '@form-create/utils/lib/type';

const name = 'checkbox';

export default {
    name,
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!hasProperty(props, 'options'))
            props.options = ctx.prop.options || [];
    },
    toFormValue(value) {
        return Array.isArray(value) ? value : toArray(value);
    }
};
