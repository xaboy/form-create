import {defineComponent, toRef} from 'vue';
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
        }
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
        return <ARadioGroup {...this.$attrs} modelValue={this.value} v-slots={getSlot(this.$slots, ['default'])}
            onUpdate:modelValue={this.onInput}>{this.options().map((opt, index) => {
                return <ARadio {...opt} key={'' + index + '-' + opt.value}>{opt.label || opt.value || ''}</ARadio>
            })}{this.$slots.default?.()}</ARadioGroup>
    }
});
