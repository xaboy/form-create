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
        type: String,
        title: String,
        visibleItemCount: [Number, String],
        value: [String, Number],
        minDate: [String, Date],
        maxDate: [String, Date],
        formCreateInject: Object,
    },
    emits: ['input', 'fc.el'],
    setup(props, _) {

        const format = {
            date: 'YYYY-MM-DD',
            'year-month': 'YYYY-MM',
            'month-day': 'MM-DD',
            datehour: 'YYYY-MM-DD HH',
            datetime: 'YYYY-MM-DD HH:mm',
        }

        const show = ref(false);
        const modelValue = toRef(props, 'value');

        const formValue = computed(() => {
            if (modelValue.value == null || modelValue.value === '') {
                return undefined;
            }
            return dayjs(modelValue.value).toDate();
        });

        const dateRange = computed(() => {
            return {
                minDate: props.minDate ? dayjs(props.minDate).toDate() : undefined,
                maxDate: props.maxDate ? dayjs(props.maxDate).toDate() : undefined,
            }
        })

        const onInput = (val) => {
            _.emit('input', val);
        }

        return {
            show,
            formValue,
            dateRange,
            modelValue,
            open() {
                if (props.disabled) {
                    return;
                }
                show.value = true;
            },
            confirm(selectedValue) {
                onInput(dayjs(selectedValue).format(format[props.type || 'date']));
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
        return <div class="_fc-date-picker">
            <van-field ref="el" placeholder={this.placeholder} readonly disabled={this.$props.disabled}
                       onClick={this.open}
                       value={this.modelValue} border={false} isLink>{clearIcon()}</van-field>
            <van-popup value={this.show} onInput={(v) => this.show = v} round position="bottom">
                <van-datetime-picker
                    {...this.formCreateInject.prop}
                    {...{props: this.dateRange}}
                    type={this.type || 'date'}
                    value={this.formValue}
                    title={this.title}
                    visibleItemCount={this.visibleItemCount}
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
