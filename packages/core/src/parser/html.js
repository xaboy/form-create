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
    renderChildren(ctx) {
        if (Array.isArray(ctx.rule.children)) {
            return ctx.rule.children.filter(v => is.String(v)).join('');
        }
        return '';
    }
}
