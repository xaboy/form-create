import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcTree';

export default {
    name: NAME,
    props: {
        formCreateRule: {
            type: Object,
            default: () => ({props: {}})
        },
        type: {
            type: String,
            default: 'checked'
        },
        value: {
            type: [Array, String, Number],
            default: () => []
        }
    },
    data() {
        return {
            treeData: []
        }
    },
    watch: {
        value(n) {
            this.setStatus(n);
        }
    },
    created() {
        this.setStatus(this.value);
    },
    methods: {
        setStatus(value) {
            const n = toArray(value);
            const data = this.formCreateRule.props.data;
            this.type === 'selected' ? this.checked(data, n, 'selected') : this.checked(data, n, 'checked');
            this.$forceUpdate();
        },
        checked(_data, value, type) {
            _data.forEach((node) => {
                this.$set(node, type, value.indexOf(node.id) !== -1);
                if (node.children !== undefined && Array.isArray(node.children))
                    this.checked(node.children, value, type);
            });
        },
        onInput(list) {
            this.$emit('input', list.map(node => node.id));
        }
    },
    render() {
        const on = {};
        if (this.type === 'selected') {
            on['on-select-change'] = this.onInput;
        } else {
            on['on-check-change'] = this.onInput;
        }
        return <Tree {...this.formCreateRule} ref="tree" on={on}>{getSlot(this.$slots)}</Tree>;
    },
    mounted() {
        this.onInput(this.type === 'selected' ? this.$refs.tree.getSelectedNodes() : this.$refs.tree.getCheckedNodes());
    }
}
