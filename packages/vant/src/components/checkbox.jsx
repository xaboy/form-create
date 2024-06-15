import {defineComponent, toRef} from 'vue';

const NAME = 'fcCheckbox';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        disabled: Boolean,
        modelValue: Array,
        options: Array,
    },
    emits: ['update:modelValue'],
    setup(props, _) {
        const modelValue = toRef(props, 'modelValue', []);
        const options = toRef(props, 'options');

        return {
            options,
            modelValue,
            onInput(val) {
                _.emit('update:modelValue', val);
            },
        }
    },
    render() {
        return <van-checkbox-group disabled={this.$props.disabled} modelValue={[...Array.isArray(this.modelValue) ? this.modelValue : []]}
            onUpdate:modelValue={this.onInput} direction="horizontal" {...this.$attrs}>
            {(this.options || []).map(opt => {
                const tmp = {...opt};
                const {label, value} = opt;
                delete tmp.label;
                delete tmp.value;
                return <van-checkbox name={value} shape="square" {...tmp}>{label || value}</van-checkbox>
            })}
        </van-checkbox-group>
    }
});
