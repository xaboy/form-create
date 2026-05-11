import toArray from '@form-create/utils/lib/toarray';

const name = 'select';

export default {
    name,
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (Array.isArray(ctx.prop.options) && !props.options) {
            props.options = ctx.prop.options;
        }
    },
    toFormValue(value, ctx) {
        if (ctx.prop.props.multiple && !Array.isArray(value)) {
            return toArray(value);
        } else {
            return value;
        }
    }
};
