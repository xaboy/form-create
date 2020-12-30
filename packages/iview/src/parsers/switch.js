export default {
    name: 'switch',
    mergeProp(ctx) {
        const prop = ctx.prop.props.slot || {};
        const slot = ctx.prop.scopedSlots || {};
        if (prop.open) slot.open = () => prop.open;
        if (prop.close) slot.close = () => prop.close;
        ctx.prop.scopedSlots = slot;
    }
}
