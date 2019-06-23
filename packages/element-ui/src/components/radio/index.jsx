export default {
    name: 'fc-elm-radio',
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
        type: String
    },
    render(h, ctx) {
        return <ElRadioGroup {...ctx.data}>{ctx.props.options.map(opt => {
            const props = {...opt};
            delete props.value;
            return ctx.props.type === 'button' ? <ElRadioButton {...{props}}/> : <ElRadio {...{props}}/>;
        }).concat(ctx.chlidren)}</ElRadioGroup>
    }
}
