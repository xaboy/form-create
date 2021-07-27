import {defineComponent, inject, ref, resolveComponent, toRef, toRefs} from 'vue';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcCheckbox';

export default defineComponent({
    name: NAME,
    props: {
        modelValue: {
            type: Array,
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
            trueValue.value = value.value ? options.value.filter((opt) => value.value.indexOf(opt.value) !== -1)
                .map((option) => option.label) : []
        }
        update();
        return {
            options,
            trueValue,
            value,
            onInput(n) {
                _.emit('update:modelValue', options.value.filter((opt) => n.indexOf(opt.label) !== -1).map((opt) => opt.value).filter(v => v !== undefined));
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
        const name = this.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox';
        const Type = resolveComponent(name);
        return <ElCheckboxGroup {...this.$attrs} modelValue={this.trueValue} v-slots={getSlot(this.$slots, ['default'])}
            onUpdate:modelValue={this.onInput}>{this.options.map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Type {...props} key={name + index + opt.value}/>
            })}{this.$slots.default?.()}</ElCheckboxGroup>
    }
});