import {toDefSlot, uniqueId} from '@form-create/utils';

const NAME = 'fc-ivu-select';

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
        return <Select {...ctx.data}>{ctx.props.options.map((props, index) => {

            const slot = props.slot ? toDefSlot(props.slot, h) : [];

            return <Option {...{props}}
                key={NAME + index + ctx.props.unique}>{slot}</Option>
        }).concat(ctx.chlidren)}</Select>;
    }
}
