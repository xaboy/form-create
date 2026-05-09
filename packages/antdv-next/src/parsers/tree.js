export default {
    name: 'tree',
    modelField: 'checkedKeys',
    mergeProp(ctx) {
        const props = ctx.prop.props;
        props.checkedKeys = ctx.rule.value;
        props.checkable = true;
    },

}

