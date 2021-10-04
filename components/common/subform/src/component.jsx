const NAME = 'fcSubForm';

export default {
    name: NAME,
    props: {
        rule: Array,
        options: Object,
        formCreateInject: {
            type: Object,
            required: true,
        },
        value: {
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
    },
    data() {
        return {
            cacheRule: {},
            cacheValue: {},
        }
    },
    watch: {
        disabled(n) {
            this.syncDisabled && this.cacheRule.$f.disabled(n);
        },
        value(n) {
            this.setValue(n);
        }
    },
    methods: {
        formData(value) {
            this.cacheValue = JSON.stringify(value);
            this.$emit('input', value);
            this.$emit('change', value);
        },
        setValue(value) {
            const str = JSON.stringify(value);
            if (this.cacheValue === str) {
                return;
            }
            this.cacheValue = str;
            this.cacheRule.$f.coverValue(value || {});
        },
        addRule() {
            const options = this.options ? this.options : {
                submitBtn: false,
                resetBtn: false,
            };
            options.formData = {...(this.value || {})};
            this.cacheRule = {rule: this.rule, options};
        },
        add$f($f) {
            this.cacheRule.$f = $f;
            this.subForm();
            this.$nextTick(() => {
                this.syncDisabled && $f.disabled(this.disabled);
                this.$emit('itemMounted', $f);
            });
        },
        subForm() {
            this.formCreateInject.subForm(this.cacheRule.$f);
        },
        emitEvent(name, ...args) {
            this.$emit(name, ...args);
        }
    },
    created() {
        this.addRule();
    },
    render() {
        const {rule, options} = this.cacheRule;
        return <FormCreate
            on={{
                'update:value': this.formData,
                'emit-event': this.emitEvent,
                input: this.add$f
            }}
            rule={rule}
            option={options} extendOption={true}/>
    },
    beforeMount() {
        this.$options.components.FormCreate = this.formCreateInject.form.$form();
    }
}
