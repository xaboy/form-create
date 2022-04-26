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
        return ctx.$render.defaultRender(ctx, children);
    },
    preview(children, ctx) {
        return this.render(children, ctx);
    },
    mergeProp(ctx) {
    }
}

export default BaseParser;
