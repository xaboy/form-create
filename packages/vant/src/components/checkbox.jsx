import {defineComponent, toRef} from 'vue';

const NAME = 'fcCheckbox';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        value: Array,
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
        return <van-checkbox-group direction="horizontal" {...this.$attrs}
                                   value={Array.isArray(this.modelValue) ? this.modelValue : []}
                                   onInput={this.onInput}>
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
