const NAME = 'fcFragment';

export default {
    name: NAME,
    functional: true,
    props: ['vnode'],
    render(h, ctx) {
        return ctx.props.vnode ? ctx.props.vnode : ctx.children
    }
}
