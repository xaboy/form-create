import {toArray} from '@form-create/utils';


export default {
    name: 'fc-elm-tree',
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
        makeTree() {
            return <ElTree ref="tree" on-check-change={() => this.updateValue()}
                on-node-click={() => this.updateValue()} {...this.ctx}>{this.children}</ElTree>;
        },
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
        return this.makeTree();
    },
    mounted() {
        this.setValue();
        this.updateValue();
    }
}