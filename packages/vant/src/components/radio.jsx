import {defineComponent, toRef} from 'vue';

const NAME = 'fcRadio';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        value: [String, Number],
        options: Array,
    },
    emits: ['input'],
    setup(props, _) {
        const modelValue = toRef(props, 'value', []);
        const options = toRef(props, 'options');

        return {
            options,
            modelValue,
            onInput(val) {
                _.emit('input', val);
            },
        }
    },
    render() {
        return <van-radio-group direction="horizontal" {...this.$attrs} value={this.modelValue}
                                onInput={this.onInput}>
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
