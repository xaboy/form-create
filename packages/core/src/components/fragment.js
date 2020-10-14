const NAME = 'fcFragment';

export default {
    name: NAME,
    functional: true,
    render(h, ctx) {
        return ctx.children
    }
}
