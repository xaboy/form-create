export default {
    name: 'aTransfer',
    init(ctx) {
        ctx.payload._init = {
            on: {
                change: (val) => {
                    if (ctx.prop.model) {
                        ctx.prop.model.callback(val);
                    }
                }
            }
        }
    },
    render(children, ctx) {
        if (ctx.prop.model) {
            ctx.prop.props.targetKeys = ctx.prop.model.value;
        }
        delete ctx.prop.props.value;
        if (ctx.$handle.fc.renderDriver && ctx.$handle.fc.renderDriver.defaultRender) {
            return ctx.$handle.fc.renderDriver.defaultRender(ctx, children);
        }
        return ctx.$render.defaultRender(ctx, children);
    },
}

