import {defineComponent, inject, ref, resolveComponent, toRef, toRefs, computed} from 'vue';
import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcCheckbox';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        modelValue: {
            type: Array,
            default: () => []
        },
        type: String,
    },
    emits: ['update:modelValue'],
    setup(props, _) {
        const {options} = toRefs(inject('formCreateInject'));
        const trueValue = ref([]);
        const value = toRef(props, 'modelValue');
        const _options = () => {
            return Array.isArray(options.value) ? options.value : []
        }
        const update = () => {
            trueValue.value = value.value ? _options().filter((opt) => value.value.indexOf(opt.value) !== -1)
                .map((option) => option.label) : []
        }
        update();
        return {
            options: _options,
            trueValue,
            value,
            onInput(n) {
                _.emit('update:modelValue', _options().filter((opt) => n.indexOf(opt.label) !== -1).map((opt) => opt.value).filter(v => v !== undefined));
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
            onUpdate:modelValue={this.onInput}>{this.options().map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Type {...props} key={name + index + opt.value}/>
            })}{this.$slots.default?.()}</ElCheckboxGroup>
    }
});
