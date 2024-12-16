import is from '@form-create/utils/lib/type';

const name = 'html';

export default {
    name,
    loadChildren: false,
    render(children, ctx) {
        if (!ctx.prop.domProps) ctx.prop.domProps = {};
        ctx.prop.domProps.innerHTML = children;
        return ctx.vNode.make(ctx.prop.props.tag || 'div', ctx.prop);
    },
    renderChildren(children) {
        if (Array.isArray(children)) {
            return children.filter(v => is.String(v)).join('');
        }
        return '';
    }
}
