import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';

const NAME = 'fcTree';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
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
        type: String,
        modelValue: {
            type: [Array, String, Number],
            default: () => ([])
        }
    },
    emits: ['update:modelValue', 'fc.el'],
    watch: {
        modelValue() {
            this.setValue();
        }
    },
    methods: {
        updateValue() {
            if (!this.$refs.tree) return;
            let value;
            if (this.type === 'selected') {
                value = this.$refs.tree.getCurrentKey();
            } else {
                value = this.$refs.tree.getCheckedKeys();
            }
            this.$emit('update:modelValue', value);
        },
        setValue() {
            if (!this.$refs.tree) return;
            const type = this.type;

            if (type === 'selected') {
                this.$refs.tree.setCurrentKey(this.modelValue);
            } else {
                this.$refs.tree.setCheckedKeys(toArray(this.modelValue));
            }
        }
    },
    render() {
        return <ElTree {...this.$attrs} ref="tree" onCheck={this.updateValue}
            onNode-click={this.updateValue}
            v-slots={this.$slots}/>;
    },
    mounted() {
        this.setValue();
        this.$emit('fc.el',this.$refs.tree);
    }
});
