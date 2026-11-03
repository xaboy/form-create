import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';
import './style.css';

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
        disabled: Boolean,
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
            if (this.disabled) {
                this.setValue();
                return;
            }
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
        },
        onClickCapture(e) {
            if (!this.disabled) return;
            if (e.target.closest && e.target.closest('.el-checkbox')) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
    },
    render() {
        const attrs = {...this.$attrs};
        if (this.disabled) {
            attrs.draggable = false;
        }
        return <ElTree {...attrs} ref="tree" aria-disabled={this.disabled || undefined}
            onClickCapture={this.onClickCapture}
            onCheck={this.updateValue}
            onNodeClick={this.updateValue}
            v-slots={this.$slots}/>;
    },
    mounted() {
        this.setValue();
        this.$emit('fc.el',this.$refs.tree);
    }
});
