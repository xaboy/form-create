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
        const options = ctx.props.formCreateInject.options;
        return <Select {...ctx.data}>{(Array.isArray(options) ? options : []).map((props, index) => {
            const slot = props.slot;
            return <Option {...{props}}
                key={'' + index + props.value}>
                {slot ? <template
                    slot={props.slotName || 'default'}>{is.Function(slot) ? props.slot(h) : slot}</template> : null}
            </Option>
        })}{ctx.children}</Select>;
    }
}
