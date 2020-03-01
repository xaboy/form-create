import {uniqueId} from '@form-create/utils';

const NAME = 'fc-ivu-radio';

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
        return <RadioGroup {...ctx.data}>{ctx.props.options.map((opt, index) => {
            const props = {...opt};
            delete props.value;
            return <Radio {...{props}} key={NAME + index + ctx.props.unique}/>
        }).concat(ctx.chlidren)}</RadioGroup>
    }
}
