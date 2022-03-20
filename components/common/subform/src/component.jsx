import {defineComponent, reactive, markRaw, nextTick} from 'vue';

const NAME = 'fcSubForm';


export default defineComponent({
    name: NAME,
    props: {
        rule: Array,
        options: {
            type: Object,
            default: () => reactive(({
                submitBtn: false,
                resetBtn: false,
            }))
        },
        modelValue: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        },
        syncDisabled: {
            type: Boolean,
            default: true
        },
        formCreateInject: Object,
    },
    data() {
        return {
            cacheValue: {},
            subApi: {},
            form: markRaw(this.formCreateInject.form.$form())
        }
    },
    emits: ['fc:subform', 'update:modelValue', 'change', 'itemMounted'],
    watch: {
        disabled(n) {
            this.syncDisabled && this.subApi.disabled(n);
        },
        modelValue(n) {
            this.setValue(n);
        }
    },
    methods: {
        formData(value) {
            this.cacheValue = JSON.stringify(value);
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
        },
        setValue(value) {
            const str = JSON.stringify(value);
            if (this.cacheValue === str) {
                return;
            }
            this.cacheValue = str;
            this.subApi.coverValue(value || {});
        },
        add$f(api) {
            this.subApi = api;
            nextTick(() => {
                this.syncDisabled && api.disabled(this.disabled);
                this.$emit('itemMounted', api);
            });
        }
    },
    render() {
        const Type = this.form;
        return <Type
            onUpdate:modelValue={this.formData}
            modelValue={this.modelValue}
            onEmit-event={this.$emit}
            onUpdate:api={this.add$f}
            rule={this.rule}
            option={this.options} extendOption={true}/>
    }
})
