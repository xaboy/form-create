import {toSlot} from '@form-create/utils/lib/toslot';

const NAME = 'fc-select';
export default {
    name: NAME,
    functional: true,
    props: {
        formCreateOptions: {
            type: Array,
            default: () => ([])
        },
    },
    render(h, ctx) {
        return <ElSelect {...ctx.data}>{ctx.props.formCreateOptions.map((props, index) => {
            return <ElOption {...{props}}
                key={'' + index + props.value}>
                {props.slot ? <template slot={props.slotName || 'default'}>{toSlot(props.slot, h)}</template> : null}
            </ElOption>
        }).concat(ctx.chlidren)}</ElSelect>;
    }
}
