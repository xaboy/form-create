import {defineComponent, toRef} from 'vue';

const NAME = 'fcRadio';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        modelValue: [String, Number],
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
        return <van-radio-group direction="horizontal" {...this.$attrs} modelValue={this.modelValue}
            onUpdate:modelValue={this.onInput}>
            {(this.options || []).map(opt => {
                const tmp = {...opt};
                const {text, value} = opt;
                delete tmp.text;
                delete tmp.value;
                return <van-radio name={value} {...tmp}>{text || opt.label || value}</van-radio>
            })}
        </van-radio-group>
    }
});
