const NAME = 'fcSubForm';

export default {
    name: NAME,
    props: {
        rule: Array,
        options: Object,
        formCreate: Object,
        value: {
            type: Object,
            default: () => ({})
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            cacheRule: {},
            cacheValue: {},
        }
    },
    watch: {
        disabled(n) {
            this.cacheRule.$f.disabled(n);
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
                $f.disabled(this.disabled);
                this.$emit('itemMounted', $f);
            });
        },
        subForm() {
            this.$emit('fc.sub-form', this.cacheRule.$f);
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
    }
}
