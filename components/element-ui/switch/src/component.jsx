import getSlot from '@form-create/utils/lib/slot';
import {computed, defineComponent, toRef} from 'vue';

const NAME = 'fcSwitch';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        modelValue: {
            type: [String, Number, Boolean],
            default: '',
        },
        type: String,
    },
    emits: ['update:modelValue', 'fc.el'],
    setup(props, _) {
        const value = toRef(props, 'modelValue');
        const {activeColor, inactiveColor} = _.attrs;

        console.log(props)

        const style = computed(() =>
            [
                {key: '--el-switch-on-color', value: activeColor},
                {key: '--el-switch-off-color', value: inactiveColor},
            ]
                .filter((item) => item.value)
                .map((item) => `${item.key}:${item.value}`)
                .join(';')
        );

        const onInput = (n) => {
            _.emit('update:modelValue', n);
        };

        return {
            value,
            onInput,
            style,
        };
    },
    render() {
        return (
            <ElSwitch
                {...this.$attrs}
                modelValue={this.value}
                v-slots={getSlot(this.$slots, ['default'])}
                onUpdate:modelValue={this.onInput}
                ref="el"
                style={this.style}
            />
        );
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    },
});
