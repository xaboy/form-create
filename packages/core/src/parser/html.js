import is from '@form-create/utils/lib/type';

const name = 'html';

export default {
    name,
    loadChildren: false,
    render(children, ctx) {
        ctx.prop.props.innerHTML = children.default();
        return ctx.vNode.make(ctx.prop.props.tag || 'div', ctx.prop);
    },
    renderChildren(children) {
        return {
            default: () => children.filter(v => is.String(v)).join('')
        }
    }
}
