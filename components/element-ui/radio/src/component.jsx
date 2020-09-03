import RadioParser from './parser';

const NAME = 'fc-radio';

export default {
    name: NAME,
    functional: true,
    props: {
        formCreateOptions: {
            type: Array,
            default: () => ([])
        },
        type: String
    },
    render(h, ctx) {
        return <ElRadioGroup {...ctx.data}>{ctx.props.formCreateOptions.map((opt, index) => {
            const props = {...opt};
            const Type = ctx.props.type === 'button' ? 'ElRadioButton' : 'ElRadio';
            delete props.value;
            return <Type {...{props}} key={Type + index + props.value}/>;
        }).concat(ctx.chlidren)}</ElRadioGroup>
    }
}
