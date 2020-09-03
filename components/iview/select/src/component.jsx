import {toSlot} from '@form-create/utils/lib/toslot';
import SelectParser from './parser';

const NAME = 'fc-select';

export default {
    name: NAME,
    parser: SelectParser,
    functional: true,
    props: {
        options: {
            type: Array,
            default: () => ([])
        },
    },
    render(h, ctx) {
        return <Select {...ctx.data}>{ctx.props.options.map((props, index) => {

            return <Option {...{props}}
                key={'' + index + props.value}>
                {props.slot ? <template slot={props.slotName || 'default'}>{toSlot(props.slot, h)}</template> : null}
            </Option>
        }).concat(ctx.chlidren)}</Select>;
    }
}
