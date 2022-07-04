import toArray from '@form-create/utils/lib/toarray';

const name = 'select';

export default {
    name,
    toFormValue(value, ctx) {
        if (ctx.prop.props.multiple && !Array.isArray(value)) {
            return toArray(value)
        } else {
            return value;
        }
    }

}
