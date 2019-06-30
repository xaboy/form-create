import {toDefSlot} from '@form-create/utils';

export default {
    name: 'fc-iview-select',
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
    },
    render(h, ctx) {
        return <Select {...ctx.data}>{ctx.props.options.map((props, index) => {

            const slot = props.slot ? toDefSlot(props.slot, h) : [];

            return <Option {...{props}}
                key={`t${index}${ctx.parent._uid}`}>{slot}</Option>
        }).concat(ctx.chlidren)}</Select>;
    }
}