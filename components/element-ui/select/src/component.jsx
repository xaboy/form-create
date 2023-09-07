import is, {hasProperty} from '@form-create/utils/lib/type';

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
        const makeOption = (props, index) => {
            const slot = props.slot;
            return <ElOption props={props}
                key={'' + index + '-' + props.value}>
                {slot ? <template
                    slot={props.slotName || 'default'}>{is.Function(slot) ? props.slot(h) : slot}</template> : null}
            </ElOption>;
        }
        const makeOptionGroup = (props, index) => {
            return <ElOptionGroup label={props.label}
                key={'' + index + '-' + props.label}>
                {is.trueArray(props.options) && props.options.map((v, index) => {
                    return makeOption(v, index);
                })}
            </ElOptionGroup>;
        }

        const options = ctx.props.formCreateInject.options;
        return <ElSelect {...ctx.data} ref="el">{(Array.isArray(options) ? options : []).map((props, index) => {
            return hasProperty(props || '', 'options') ? makeOptionGroup(props, index) : makeOption(props, index);
        })}{ctx.children}</ElSelect>;
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
}
