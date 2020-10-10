const NAME = 'fcFragment';

export default {
    name: NAME,
    functional: true,
    props: {
        children: Array
    },
    render(h, ctx) {
        return ctx.children
    }
}
