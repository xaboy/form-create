import {toDefSlot, uniqueId} from '@form-create/utils';

const NAME = 'fc-elm-select';
export default {
    name: NAME,
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
        unique: {
            default: () => uniqueId()
        },
    },
    render(h, ctx) {
        return <ElSelect {...ctx.data}>{ctx.props.options.map((props, index) => {

            const slot = props.slot ? toDefSlot(props.slot, h) : [];

            return <ElOption {...{props}}
                key={NAME + index + ctx.props.unique}>{slot}</ElOption>
        }).concat(ctx.chlidren)}</ElSelect>;
    }
}