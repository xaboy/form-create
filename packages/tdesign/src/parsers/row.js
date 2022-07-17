export default {
    name: 'FcRow',
    render(_, ctx) {
        return ctx.vNode.col({props: {span: 12}}, {
            default:()=>[
                ctx.vNode.row(ctx.prop, _)
            ]
        })
    }
}
