import {defineComponent, resolveComponent, toRef} from 'vue';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcRadio';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        modelValue: {
            type: [String, Number, Boolean],
            default: ''
        },
        type: String,
    },
    emits: ['update:modelValue'],
    setup(props, _) {
        const options = toRef(props.formCreateInject, 'options', []);
        const value = toRef(props, 'modelValue');
        const _options = () => {
            return Array.isArray(options.value) ? options.value : []
        }

        return {
            options: _options,
            value,
            onInput(n) {
                _.emit('update:modelValue', n);
            }
        }
    },
    render() {
        const name = this.type === 'button' ? 'NRadioButton' : 'NRadio';
        const Type = resolveComponent(name);
        return <NRadioGroup {...this.$attrs} value={this.value} v-slots={getSlot(this.$slots, ['default'])}
            onUpdate:value={this.onInput}>{this.options().map((opt, index) => {
                return <Type {...opt} key={name + index + opt.value}>{opt.label || opt.value || ''}</Type>
            })}{this.$slots.default?.()}</NRadioGroup>
    }
});
