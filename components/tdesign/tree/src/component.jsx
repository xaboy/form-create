import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';

const NAME = 'fcTree';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        checkable: {
            type: Boolean,
            default: true
        },
        modelValue: {
            type: [Array, String, Number],
            default: () => ([])
        }
    },
    data() {
        return {
            value: toArray(this.modelValue)
        }
    },
    emits: ['update:modelValue', 'change', 'input'],
    watch: {
        modelValue(v) {
            this.value = toArray(v)
        }
    },
    methods: {
        onInput(value) {
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
            this.$emit('input', value);
        }
    },
    render() {
        return <t-tree
            {...this.$attrs}
            modelValue={this.value}
            checkable={this.checkable}
            onUpdate:modelValue={this.onInput}
            v-slots={this.$slots}/>;
    }
});
