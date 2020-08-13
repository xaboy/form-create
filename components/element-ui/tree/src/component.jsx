import toArray from '@form-create/utils/lib/toarray';

const NAME = 'fc-tree';

export default {
    name: NAME,
    props: {
        ctx: {
            type: Object,
            default: () => ({props: {}})
        },
        children: {
            type: Array,
            default: () => ([])
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
            const type = (this.type).toLocaleLowerCase();
            let value;

            if (type === 'selected')
                value = this.$refs.tree.getCurrentKey();
            else
                value = this.$refs.tree.getCheckedKeys();

            this.$emit('input', value);
        },
        setValue() {
            const type = (this.type).toLocaleLowerCase();

            if (type === 'selected')
                this.$refs.tree.setCurrentKey(this.value);
            else
                this.$refs.tree.setCheckedKeys(toArray(this.value));
        }
    },
    render() {
        return <ElTree ref="tree" on-check-change={() => this.updateValue()}
            on-node-click={() => this.updateValue()} {...this.ctx}>{this.children}</ElTree>;
    },
    mounted() {
        this.setValue();
        this.updateValue();
    }
}
