import {computed, defineComponent, ref, toRef} from 'vue';
import {normalizeOptions} from "../core/utils";

const NAME = 'fcSelect';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        disabled: Boolean,
        placeholder: String,
        title: String,
        visibleItemCount: [Number, String],
        columnsFieldNames: Object,
        value: [String, Number],
        options: Array,
        formCreateInject: Object,
    },
    emits: ['input', 'fc.el', 'change'],
    setup(props, _) {
        const show = ref(false);
        const modelValue = toRef(props, 'value');
        const fieldNames = toRef(props, 'columnsFieldNames', {});
        const options = computed(() => {
            if (fieldNames?.value?.text) {
                return props.options || [];
            } else {
                return normalizeOptions(props.options || []);
            }
        })

        const inputValue = computed(() => {
            if (modelValue.value == null || modelValue.value === '') {
                return '';
            }
            for (let i = 0; i < (options.value || []).length; i++) {
                if (options.value[i][fieldNames.value.value || 'value'] === modelValue.value) {
                    return options.value[i][fieldNames.value.text || 'text'];
                }
            }
            return modelValue.value;
        });

        const onInput = (val) => {
            _.emit('input', val);
            _.emit('change', val);
        }

        return {
            show,
            inputValue,
            options,
            open() {
                if (props.disabled) {
                    return;
                }
                show.value = true;
            },
            confirm(selectedValue) {
                onInput(selectedValue.value);
                show.value = false;
            },
        }
    },
    render() {
        return <div class="_fc-select">
            <van-field ref="el" placeholder={this.placeholder} readonly disabled={this.$props.disabled}
                       onClick={this.open}
                       value={this.inputValue} isLink/>
            <van-popup value={this.show} onInput={(v) => this.show = v} round position="bottom">
                <van-picker
                    {...this.formCreateInject.prop}
                    title={this.title}
                    visibleItemCount={this.visibleItemCount}
                    showToolbar={true}
                    value={[this.modelValue]}
                    columnsFieldNames={this.columnsFieldNames}
                    columns={this.options}
                    onCancel={() => this.show = false}
                    onConfirm={this.confirm}
                />
            </van-popup>
        </div>
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
});
