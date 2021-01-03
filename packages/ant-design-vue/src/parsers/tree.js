export default {
    name: 'tree',
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!props.replaceFields)
            props.replaceFields = {
                key: 'id'
            };
        else if (!props.replaceFields.key) props.replaceFields.key = 'id';
        props.checkedKeys = ctx.rule.value;
        props.checkable = true;
    },

}

