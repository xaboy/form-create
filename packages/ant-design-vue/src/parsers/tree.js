export default {
    name: 'tree',
    modelField: 'checkedKeys',
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!props.fieldNames)
            props.fieldNames = {
                key: 'id'
            };
        else if (!props.fieldNames.key) props.fieldNames.key = 'id';
        props.checkedKeys = ctx.rule.value;
        props.checkable = true;
    },

}

