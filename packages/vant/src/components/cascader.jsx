import {defineComponent, ref, toRef, watch} from 'vue';

const NAME = 'fcCascader';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        placeholder: String,
        disabled: Boolean,
        clearable: Boolean,
        fieldNames: Object,
        modelValue: [String, Number],
        options: Array,
        minDate: [String, Date],
        maxDate: [String, Date],
    },
    emits: ['update:modelValue', 'fc.el'],
    setup(props, _) {
        const show = ref(false);
        const modelValue = toRef(props, 'modelValue');
        const options = toRef(props, 'options');
        const fieldNames = toRef(props, 'fieldNames', {});

        const findOptions = (options, value, path) => {
            for (let i = 0; i < options.length; i++) {
                if (options[i][fieldNames.value.value || 'value'] === value) {
                    return [...path, options[i]];
                } else if (options[i][fieldNames.value.children || 'children']) {
                    const find = findOptions(options[i][fieldNames.value.children || 'children'], value, [...path, options[i]]);
                    if (find) {
                        return find;
                    }
                }
            }
        }

        const updateInputValue = (n) => {
            if (n == null || n === '') {
                return '';
            }
            const path = findOptions(options.value, n, []);
            return path ? path.map((option) => option[fieldNames.value.text || 'text']).join(' / ') : n;
        }

        const inputValue = ref(updateInputValue(modelValue.value));

        watch(() => modelValue.value, (n) => {
            inputValue.value = updateInputValue(n);
        })

        const onInput = (val) => {
            _.emit('update:modelValue', val);
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
            confirm({selectedOptions, value}) {
                inputValue.value = selectedOptions.map((option) => option[fieldNames.value.text || 'text']).join(' / ');
                show.value = false;
                onInput(value);
            },
            clear(e) {
                e.stopPropagation();
                inputValue.value = '';
                onInput('');
            }
        }
    },
    render() {
        const clearIcon = () => {
            return this.$props.clearable && this.inputValue ?
                <i class="van-badge__wrapper van-icon van-icon-clear van-field__clear"
                    onClick={this.clear}></i> : undefined;
        }

        return <>
            <van-field ref="el" placeholder={this.placeholder} readonly disabled={this.$props.disabled}
                onClick={this.open}
                model-value={this.inputValue} border={false} isLink v-slots={{
                    'right-icon': clearIcon
                }}/>
            <van-popup show={this.show} onUpdate:show={(v) => this.show = v} round position="bottom">
                <van-cascader
                    {...this.$attrs}
                    modelValue={this.modelValue}
                    fieldNames={this.fieldNames}
                    options={this.options}
                    onClose={() => this.show = false}
                    onFinish={this.confirm}
                />
            </van-popup>
        </>
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
});
