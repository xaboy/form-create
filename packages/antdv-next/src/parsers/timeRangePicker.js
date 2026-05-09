import timePicker from './timePicker';

const name = 'timeRangePicker';

export default {
    ...timePicker,
    name,
    render(children, ctx) {
        return ctx.$render.vNode['timeRangePicker'](ctx.prop, children);
    }
}
