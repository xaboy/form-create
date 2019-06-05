<script>
export default {
    name: 'fc-select',
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
    },
    render(h, ctx) {
        return <Select {...ctx.data}>{ctx.props.options.map((props, index) => {
            return <Option {...{props}} key={`t${index}${ctx._uid}`}/>
        }).concat(ctx.chlidren)}</Select>;
    }
}
</script>