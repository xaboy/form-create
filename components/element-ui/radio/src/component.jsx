import {defineComponent, ref, resolveComponent, toRef, watch} from 'vue';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcRadio';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        modelValue: {
            type: [String, Number],
            default: () => []
        },
        type: String,
    },
    emits: ['update:modelValue'],
    setup(props, _) {
        const options = toRef(props.formCreateInject, 'options', []);
        const trueValue = ref([]);
        const value = toRef(props, 'modelValue');
        const _options = () => {
            return Array.isArray(options.value) ? options.value : []
        }
        const update = () => {
            trueValue.value = _options().filter((opt) => opt.value === value.value).reduce((initial, opt) => opt.label, '')
        }
        watch(options, () => {
            update();
        }, {deep: true, immediate: true});
        return {
            options: _options,
            trueValue,
            value,
            onInput(n) {
                _.emit('update:modelValue', _options().filter((opt) => opt.label === n).reduce((initial, opt) => opt.value, ''));
            },
            update
        }
    },
    watch: {
        modelValue() {
            this.update();
        }
    },
    render() {
        const name = this.type === 'button' ? 'ElRadioButton' : 'ElRadio';
        const Type = resolveComponent(name);
        return <ElRadioGroup {...this.$attrs} modelValue={this.trueValue} v-slots={getSlot(this.$slots, ['default'])}
            onUpdate:modelValue={this.onInput}>{this.options().map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Type {...props} key={name + index + opt.value}/>
            })}{this.$slots.default?.()}</ElRadioGroup>
    }
});
