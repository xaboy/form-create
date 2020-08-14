const NAME = 'fc-radio';

export default {
    name: NAME,
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        }
    },
    render(h, ctx) {
        return <RadioGroup {...ctx.data}>{ctx.props.options.map((opt, index) => {
            const props = {...opt};
            delete props.value;
            return <Radio {...{props}} key={'' + index + props.value}/>
        }).concat(ctx.chlidren)}</RadioGroup>
    }
}
