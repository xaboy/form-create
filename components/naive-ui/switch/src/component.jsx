import getSlot from '@form-create/utils/lib/slot';
import {defineComponent, ref} from 'vue';

const NAME = 'fcSwitch';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        modelValue: {type: [String, Number, Boolean], default: ''},
        type: String,
    },
    emits: ['update:modelValue', 'fc.el'],
    setup(props, _) {
        const value = ref(props.modelValue);
        const {
            activeColor,
            inactiveColor,
            activeValue = true,
            inactiveValue = false,
        } = _.attrs;

        return {
            value,
            onInput(n) {
                _.emit('update:modelValue', n);
            },
            activeValue,
            inactiveValue,
            railStyle: ({focused, checked}) => {
                const style = {};
                if (checked) {
                    activeColor && (style.background = activeColor);
                } else {
                    inactiveColor && (style.background = inactiveColor);
                }
                return style;
            },
        };
    },
    render() {
        return (
            <NSwitch
                {...this.$attrs}
                v-model:value={this.value}
                v-slots={getSlot(this.$slots, ['default'])}
                onUpdate:value={this.onInput}
                ref="el"
                railStyle={this.railStyle}
                checkedValue={this.activeValue}
                uncheckedValue={this.inactiveValue}
            />
        );
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    },
});
