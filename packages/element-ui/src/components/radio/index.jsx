import {uniqueId} from '@form-create/utils';

const NAME = 'fc-elm-radio';

export default {
    name: NAME,
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
        type: String,
        unique: {
            default: () => uniqueId()
        },
    },
    render(h, ctx) {
        return <ElRadioGroup {...ctx.data}>{ctx.props.options.map((opt, index) => {
            const props = {...opt};
            const Type = ctx.props.type === 'button' ? 'ElRadioButton' : 'ElRadio';
            delete props.value;
            return <Type {...{props}} key={NAME + Type + index + ctx.unique}/>;
        }).concat(ctx.chlidren)}</ElRadioGroup>
    }
}
