import {defineComponent, inject, ref, resolveComponent, toRef, toRefs} from 'vue';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcRadio';

export default defineComponent({
    name: NAME,
    props: {
        modelValue: {
            type: [String,  Number],
            default: () => []
        },
        type: String,
    },
    emits: ['update:modelValue', 'fc:subform'],
    setup(props, _) {
        const {options} = toRefs(inject('formCreate'));
        const trueValue = ref([]);
        const value = toRef(props, 'modelValue');
        const update = () => {
            trueValue.value = options.value.filter((opt) => opt.value === value.value).reduce((initial, opt) => opt.label, '')
        }
        update();
        return {
            options,
            trueValue,
            value,
            onInput(n) {
                _.emit('update:modelValue', options.value.filter((opt) => opt.label === n).reduce((initial, opt) => opt.value, ''));
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
            onUpdate:modelValue={this.onInput}>{this.options.map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Type {...props} key={name + index + opt.value}/>
            })}{this.$slots.default?.()}</ElRadioGroup>
    }
});
