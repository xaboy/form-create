export default {
    name: 'timePicker',
    modelField: 'value',
    mergeProp(ctx) {
        const props = ctx.prop.props;
        if (!props.valueFormat) {
            props.valueFormat = 'HH:mm:ss';
        }
    },
    render(children, ctx) {
        return ctx.$render.vNode['time' +( ctx.prop.props.range === true ? 'Range' : '') + 'Picker'](ctx.prop, children);
    }

}

