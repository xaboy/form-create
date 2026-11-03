import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';
import './style.css';

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
        disabled: Boolean,
        value: {
            type: [Array, String, Number],
            default: () => ([])
        },
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
            if (this.disabled) {
                this.setValue();
                return;
            }
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
            if (!this.$refs.tree) return;
            const type = this.type.toLocaleLowerCase();

            if (type === 'selected') {
                this.$refs.tree.setCurrentKey(this.value);
            } else {
                this.$refs.tree.setCheckedKeys(toArray(this.value));
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
        const data = {...this.formCreateInject.prop};
        data.props = {...(data.props || {})};
        delete data.props.disabled;
        if (this.disabled) {
            data.props.draggable = false;
            data.attrs = {...(data.attrs || {}), 'aria-disabled': 'true'};
        }
        return <ElTree {...data} ref="tree" nativeOn={{'!click': this.onClickCapture}} on-check={() => this.updateValue()}
            on-node-click={() => this.updateValue()}>{getSlot(this.$slots)}</ElTree>;
    },
    mounted() {
        this.setValue();
        this.$emit('fc.el', this.$refs.tree);
    }
}
