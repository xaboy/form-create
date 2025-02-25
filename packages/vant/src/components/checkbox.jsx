import {defineComponent, toRef} from 'vue';

const NAME = 'fcCheckbox';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        value: Array,
        options: Array,
        direction: String,
        checkedColor: String,
        max: [String, Number],
        disabled: Boolean,
        formCreateInject: Object,
    },
    emits: ['input', 'change'],
    setup(props, _) {
        const modelValue = toRef(props, 'value', []);
        const options = toRef(props, 'options');

        return {
            options,
            modelValue,
            onInput(val) {
                _.emit('input', val);
                _.emit('change', val);
            },
        }
    },
    render() {
        return <van-checkbox-group {...this.formCreateInject.prop}
                                   direction={this.direction || 'horizontal'}
                                   checkedColor={this.checkedColor}
                                   max={this.max}
                                   disabled={this.disabled}
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
