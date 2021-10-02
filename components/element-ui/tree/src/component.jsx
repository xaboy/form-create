import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcTree';

export default {
    name: NAME,
    formCreateParser: {
        mergeProp(ctx) {
            const props = ctx.prop.props;
            if (!props.nodeKey) props.nodeKey = 'id';
            if (!props.props) props.props = {
                label: 'title'
            };
        }
    },
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
        type: {
            type: String,
            default: 'checked'
        },
        value: {
            type: [Array, String, Number],
            default: () => ([])
        }
    },
    watch: {
        value() {
            this.setValue();
        }
    },
    methods: {
        onChange() {
            this.updateValue()
        },
        updateValue() {
            if (!this.$refs.tree) return;
            const type = this.type.toLocaleLowerCase();
            let value;

            if (type === 'selected') {
                value = this.$refs.tree.getCurrentKey();
            } else {
                value = this.$refs.tree.getCheckedKeys();
            }

            this.$emit('input', value);
        },
        setValue() {
            const type = this.type.toLocaleLowerCase();

            if (type === 'selected') {
                this.$refs.tree.setCurrentKey(this.value);
            } else {
                this.$refs.tree.setCheckedKeys(toArray(this.value));
            }
        }
    },
    render() {
        return <ElTree {...this.formCreateInject.prop} ref="tree" on-check={() => this.updateValue()}
            on-node-click={() => this.updateValue()}>{getSlot(this.$slots)}</ElTree>;
    },
    mounted() {
        this.setValue();
    }
}
