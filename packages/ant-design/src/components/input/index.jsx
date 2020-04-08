const NAME = 'fc-antd-input';

export default {
    name: NAME,
    functional: true,
    render(h, ctx) {
        console.log(ctx);
        const t = ctx.props.type;
        const Type = (t === 'textarea' ? 'ATextarea' : (t === 'search' ? 'AInputSearch' : 'AInput'));
        return <Type {...ctx.data}
            on={{'change.value': (...args) => this.$emit('input', ...args)}}>{ctx.children}</Type>
    }
}
