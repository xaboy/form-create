import is from '@form-create/utils/lib/type';

const NAME = 'fcSelect';
export default {
    name: NAME,
    functional: true,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
    },
    render(h, ctx) {
        return <ElSelect {...ctx.data}>{ctx.props.formCreateInject.options.map((props, index) => {
            const slot = props.slot;
            return <ElOption {...{props}}
                key={'' + index + props.value}>
                {slot ? <template
                    slot={props.slotName || 'default'}>{is.Function(slot) ? props.slot(h) : slot}</template> : null}
            </ElOption>
        })}{ctx.children}</ElSelect>;
    }
}
