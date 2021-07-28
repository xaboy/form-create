const NAME = 'fcSubForm';

export default {
    name: NAME,
    props: {
        rule: Array,
        options: Object,
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
        }
    },
    inject: ['formCreate'],
    data() {
        return {
            cacheValue: {},
            subApi: {},
        }
    },
    emits: ['fc:subform', 'update:modelValue', 'change', 'itemMounted'],
    watch: {
        disabled(n) {
            this.cacheRule.$f.disabled(n);
        },
        modelValue(n) {
            this.setValue(n);
        }
    },
    computed: {
        fcOptions() {
            const options = this.options ? this.options : {
                submitBtn: false,
                resetBtn: false,
            };
            options.formData = {...(this.modelValue || {})};
            return options;
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
            this.$emit('fc:subform', api);
            this.$nextTick(() => {
                api.disabled(this.disabled);
                this.$emit('itemMounted', api);
            });
        }
    },
    created() {
        if (this.formCreate) {
            this._.appContext.components['FormCreate'] = this.formCreate.create.$form()
        }
    },
    render() {
        return <FormCreate
            onUpdate:modelValue={this.formData}
            modelValue={this.modelValue}
            onEmit-event={this.$emit}
            onUpdate:api={this.add$f}
            rule={this.rule}
            option={this.fcOptions} extendOption={true}/>
    }
}
