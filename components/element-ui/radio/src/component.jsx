import {defineComponent, ref, resolveComponent, toRef, watch} from 'vue';
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
        const name = this.type === 'button' ? 'ElRadioButton' : 'ElRadio';
        const Type = resolveComponent(name);
        return <ElRadioGroup {...this.$attrs} modelValue={this.value} v-slots={getSlot(this.$slots, ['default'])}
            onUpdate:modelValue={this.onInput}>{this.options().map((opt, index) => {
                const props = {...opt};
                const value = props.value;
                delete props.value;
                return <Type {...props} label={value}
                    key={name + index + '-' + opt.value}>{props.label || props.value || ''}</Type>
            })}{this.$slots.default?.()}</ElRadioGroup>
    }
});
