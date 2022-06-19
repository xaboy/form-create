import {defineComponent, toRef} from 'vue';
import getSlot from '@form-create/utils/lib/slot';

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
        return <NCheckboxGroup {...this.$attrs} value={this.value} v-slots={getSlot(this.$slots, ['default'])}
            onUpdate:value={this.onInput}>{this.options().map((opt, index) => {
                return <NCheckbox {...opt} key={'' + index + '-' + opt.value}/>
            })}{this.$slots.default?.()}</NCheckboxGroup>
    }
});
