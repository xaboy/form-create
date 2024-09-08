import {defineComponent, toRef} from 'vue';

const NAME = 'fcCheckbox';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
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
        return <van-checkbox-group direction="horizontal" {...this.$attrs} modelValue={Array.isArray(this.modelValue) ? this.modelValue : []}
            onUpdate:modelValue={this.onInput}>
            {(this.options || []).map(opt => {
                const tmp = {...opt};
                const {text, value} = opt;
                delete tmp.text;
                delete tmp.value;
                return <van-checkbox name={value} shape="square" {...tmp}>{text || opt.label || value}</van-checkbox>
            })}
        </van-checkbox-group>
    }
});
