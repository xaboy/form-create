export default {
    name: 'fc-iview-radio',
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
    },
    render(h, ctx) {
        return <RadioGroup {...ctx.data}>{ctx.props.options.map(opt => {
            const props = {...opt};
            delete props.value;
            return <Radio {...{props}}/>
        }).concat(ctx.chlidren)}</RadioGroup>
    }
}
