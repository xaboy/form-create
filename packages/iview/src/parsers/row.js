export default {
    name: 'FcRow',
    render(_, ctx) {
        return ctx.vNode.col({props: {span: 24}}, [
            ctx.vNode.row(ctx.prop, _)
        ])
    }
}