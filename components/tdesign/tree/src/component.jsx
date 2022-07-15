import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';

const NAME = 'fcTree';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    formCreateParser: {
        // mergeProp(ctx) {
        //     const props = ctx.prop.props;
        //     if (!props.nodeKey) props.nodeKey = 'id';
        //     if (!props.props) props.props = {
        //         label: 'title'
        //     };
        // }
    },
    props: {
        type: String,
        checkable:Boolean,
        modelValue: {
            type: [Array, String, Number],
            default: () => ([])
        }
    },
    data(){
        return{
            value:toArray(this.modelValue)
        }
    },
    emits: ['update:modelValue','change'],
    watch:{
        modelValue(v){
            this.value = toArray(v)
        }
    },
    methods: {
        onChange(value) {
            this.value = value
            this.input()
        },
        input(){
            const {value} = this
            this.$emit('update:modelValue', value)
            this.$emit('change', value)
        }
    },
    render() {
        return <t-tree
            {...this.$attrs}
            modelValue={this.value}
            checkable={this.checkable}
            ref="tree"
            onChange={this.onChange}
            v-slots={this.$slots}/>;
    }
});
