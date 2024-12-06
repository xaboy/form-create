const BaseParser = {
    init(ctx) {
    },
    toFormValue(value, ctx) {
        return value
    },
    toValue(formValue, ctx) {
        return formValue;
    },
    mounted(ctx) {
    },
    render(children, ctx) {
        if(ctx.$handle.fc.renderDriver && ctx.$handle.fc.renderDriver.defaultRender){
            return ctx.$handle.fc.renderDriver.defaultRender(ctx, children);
        }
        return ctx.$render.defaultRender(ctx, children);
    },
    preview(children, ctx) {
        if(ctx.$handle.fc.renderDriver && ctx.$handle.fc.renderDriver.defaultPreview){
            return ctx.$handle.fc.renderDriver.defaultPreview(ctx, children);
        }
        return this.render(children, ctx);
    },
    mergeProp(ctx) {
    }
}

export default BaseParser;
