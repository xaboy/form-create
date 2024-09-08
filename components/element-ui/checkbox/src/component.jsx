import {defineComponent, ref, resolveComponent, toRef, watch} from 'vue';
import getSlot from '@form-create/utils/lib/slot';
import toArray from '@form-create/utils/lib/toarray';

const NAME = 'fcCheckbox';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        modelValue: {
            type: Array,
            default: () => []
        },
        type: String,
        input: Boolean,
        inputValue: String,
    },
    emits: ['update:modelValue', 'fc.el'],
    setup(props, _) {
        const options = toRef(props.formCreateInject, 'options', []);
        const value = toRef(props, 'modelValue');
        const inputValue = toRef(props, 'inputValue', '');
        const customValue = ref(inputValue.value);
        const input = toRef(props, 'input', false);
        const updateCustomValue = (n) => {
            const _value = [...toArray(value.value)];
            const idx = _value.indexOf(customValue.value);
            customValue.value = n;
            if (idx > -1) {
                _value.splice(idx, 1);
                _value.push(n);
                onInput(_value);
            }
        }
        watch(inputValue, (n) => {
            if (!input.value) {
                customValue.value = n;
                return undefined;
            }
            updateCustomValue(n);
        })
        const _options = () => {
            return Array.isArray(options.value) ? options.value : []
        }
        const onInput = (n) => {
            _.emit('update:modelValue', n);
        };

        return {
            options: _options,
            value,
            onInput,
            updateCustomValue,
            makeInput(Type) {
                if (!input.value) {
                    return undefined;
                }
                return <Type value={customValue.value || undefined} label={customValue.value || undefined}>
                    <ElInput size="small" modelValue={customValue.value}
                        onUpdate:modelValue={updateCustomValue}></ElInput>
                </Type>
            },
        }
    },
    render() {
        const name = this.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox';
        const Type = resolveComponent(name);
        return <ElCheckboxGroup {...this.$attrs} modelValue={this.value} v-slots={getSlot(this.$slots, ['default'])}
            onUpdate:modelValue={this.onInput} ref="el">{this.options().map((opt, index) => {
                const props = {...opt};
                const value = props.value;
                const label = props.label;
                delete props.value;
                delete props.label;
                return <Type {...props} label={value} value={value}
                    key={name + index + '-' + value}>{label || value || ''}</Type>
            })}{this.$slots.default?.()}{this.makeInput(Type)}</ElCheckboxGroup>
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
});
