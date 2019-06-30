import {toDefSlot} from '@form-create/utils';

export default {
    name: 'fc-elm-select',
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
    },
    render(h, ctx) {
        return <ElSelect {...ctx.data}>{ctx.props.options.map((props, index) => {

            const slot = props.slot ? toDefSlot(props.slot, h) : [];

            return <ElOption {...{props}}
                key={`t${index}${ctx.parent._uid}`}>{slot}</ElOption>
        }).concat(ctx.chlidren)}</ElSelect>;
    }
}