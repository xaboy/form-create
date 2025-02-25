import {computed, defineComponent, ref, toRef} from 'vue';
import dayjs from 'dayjs';

const NAME = 'fcTimePicker';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        disabled: Boolean,
        clearable: Boolean,
        placeholder: String,
        type: String,
        value: [String, Number],
        formCreateInject: Object,
    },
    emits: ['input', 'fc.el', 'change'],
    setup(props, _) {

        const show = ref(false);
        const modelValue = toRef(props, 'value');

        const formValue = computed(() => {
            if (modelValue.value == null || modelValue.value === '') {
                return undefined;
            }
            return modelValue.value;
        });

        const onInput = (val) => {
            _.emit('input', val);
            _.emit('change', val);
        }

        return {
            show,
            formValue,
            modelValue,
            open() {
                if (props.disabled) {
                    return;
                }
                show.value = true;
            },
            confirm(selectedValue) {
                onInput(selectedValue);
                show.value = false;
            },
            clear(e) {
                e.stopPropagation();
                onInput('');
            }
        }
    },
    render() {
        const clearIcon = () => {
            return this.$props.clearable && this.modelValue ?
                <i class="van-badge__wrapper van-icon van-icon-clear van-field__clear"
                   onClick={this.clear} slot="right-icon"></i> : undefined;
        }
        return <div class="_fc-time-picker">
            <van-field ref="el" placeholder={this.placeholder} readonly disabled={this.$props.disabled}
                       onClick={this.open}
                       value={this.modelValue} border={false} isLink>{clearIcon()}</van-field>
            <van-popup value={this.show} onInput={(v) => this.show = v} round position="bottom">
                <van-datetime-picker
                    {...this.formCreateInject.prop}
                    type={this.type || 'time'}
                    value={this.formValue}
                    onConfirm={this.confirm}
                    onCancel={() => this.show = false}
                />
            </van-popup>
        </div>
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
});
