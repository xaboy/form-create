import {computed, defineComponent, ref, toRef} from 'vue';
import dayjs from 'dayjs';

const NAME = 'fcDatePicker';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        disabled: Boolean,
        clearable: Boolean,
        placeholder: String,
        modelValue: [String, Number],
        minDate: [String, Date],
        maxDate: [String, Date],
    },
    emits: ['update:modelValue', 'fc.el'],
    setup(props, _) {
        const show = ref(false);
        const modelValue = toRef(props, 'modelValue');

        const formValue = computed(() => {
            if (modelValue.value == null || modelValue.value === '') {
                return [];
            }
            return modelValue.value.split('-');
        });

        const dateRange = computed(() => {
            return {
                minDate: props.minDate ? dayjs(props.minDate).toDate() : undefined,
                maxDate: props.maxDate ? dayjs(props.maxDate).toDate() : undefined,
            }
        })

        const onInput = (val) => {
            _.emit('update:modelValue', val);
        }

        return {
            show,
            formValue,
            dateRange,
            open() {
                if (props.disabled) {
                    return;
                }
                show.value = true;
            },
            confirm({selectedValues}) {
                onInput(selectedValues.join('-'));
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
                    onClick={this.clear}></i> : undefined;
        }
        return <>
            <van-field ref="el" placeholder={this.placeholder} readonly disabled={this.$props.disabled}
                onClick={this.open}
                model-value={this.modelValue} border={false} isLink v-slots={{
                    'right-icon': clearIcon
                }}/>
            <van-popup show={this.show} onUpdate:show={(v) => this.show = v} round position="bottom">
                <van-date-picker
                    columnsType={['year', 'month', 'day']}
                    {...{...this.$attrs, ...this.dateRange}}
                    modelValue={this.formValue}
                    onConfirm={this.confirm}
                    onCancel={() => this.show = false}
                />
            </van-popup>
        </>
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
});
