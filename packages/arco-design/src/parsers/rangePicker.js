import datePicker from './datePicker';

const name = 'rangePicker';

export default {
    ...datePicker,
    name,
    maker: {},
    render(children, ctx) {
        return ctx.$render.vNode['rangePicker'](ctx.prop, children);
    }
}
