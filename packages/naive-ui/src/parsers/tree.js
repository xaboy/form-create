export default {
    name: 'tree',
    modelField: 'checkedKeys',
    mergeProp(ctx) {
        const props = ctx.prop.props;
        props.checkable = true;
    },
    render(_, ctx) {
        return ctx.vNode.make('div', {style:'flex: 1 1 0%;'}, {
            default: () => [
                ctx.vNode.tree(ctx.prop, _)
            ]
        })
    }
}

