import {toArray} from '@form-create/utils';


export default {
    name: 'fc-iview-tree',
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
    data() {
        return {
            treeData: []
        }
    },
    watch: {
        value(n) {
            n = toArray(n);
            const data = this.$refs.tree.data;
            this.type === 'selected' ? this.selected(data, n) : this.checked(data, n);
        }
    },
    methods: {
        selected(_data, value) {
            _data.forEach((node) => {
                this.$set(node, 'selected', value.indexOf(node.id) !== -1);
                if (node.children !== undefined && Array.isArray(node.children))
                    this.selected(node.children, value);
            });
        },
        checked(_data, value) {
            _data.forEach((node) => {
                this.$set(node, 'checked', value.indexOf(node.id) !== -1);
                if (node.children !== undefined && Array.isArray(node.children))
                    this.checked(node.children, value);
            });
        },
        makeTree() {
            return <Tree ref="tree" {...this.ctx}>{this.children}</Tree>;
        },
        updateTreeData() {
            const type = (this.type).toLocaleLowerCase();

            if (type === 'selected')
                this.treeData = this.$refs.tree.getSelectedNodes();
            else
                this.treeData = this.$refs.tree.getCheckedNodes();
            this.$emit('input', this.treeData.map(node => node.id));
        }
    },
    render() {
        return (<div>{this.makeTree()}</div>);
    },
    mounted() {
        this.$nextTick(() => {
            this.$watch(() => this.$refs.tree.flatState, () => this.updateTreeData())
        })

    }
}