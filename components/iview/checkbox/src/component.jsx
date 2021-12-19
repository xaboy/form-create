import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcCheckbox';

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
        value: {
            type: Array,
            default: () => []
        },
    },
    watch: {
        'formCreateInject.options': {
            handler() {
                this.update();
            },
            deep: true,
        },
        value() {
            this.update();
        }
    },
    data() {
        return {
            trueValue: []
        }
    },
    methods: {
        options() {
            const opt = this.formCreateInject.options;
            return Array.isArray(opt) ? opt : [];
        },
        onInput(n) {
            this.$emit('input', this.options().filter((opt) => n.indexOf(opt.label) !== -1).map((opt) => opt.value).filter(v => v !== undefined));
        },
        update() {
            this.trueValue = this.value ? this.options().filter((opt) => this.value.indexOf(opt.value) !== -1)
                .map((option) => option.label) : []
        }
    },
    created() {
        this.update();
    },
    render() {
        return <CheckboxGroup {...this.formCreateInject.prop} value={this.trueValue}
            on-input={this.onInput}>{this.options().map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Checkbox {...{props}} key={'' + index + opt.value}/>
            })}{getSlot(this.$slots)}</CheckboxGroup>
    }
}
