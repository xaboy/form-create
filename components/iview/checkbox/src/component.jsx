const NAME = 'fc-checkbox';

export default {
    name: NAME,
    props: {
        formCreateOptions: {
            type: Array,
            default: () => []
        },
        formCreateRule: {
            type: Object,
            default: () => ({})
        },
        value: {
            type: Array,
            default: () => []
        },
    },
    watch: {
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
        onInput(n) {
            this.$emit('input', this.formCreateOptions.filter((opt) => n.indexOf(opt.label) !== -1).map((opt) => opt.value).filter(v => v !== undefined));
        },
        update() {
            this.trueValue = this.value ? this.formCreateOptions.filter((opt) => this.value.indexOf(opt.value) !== -1)
                .map((option) => option.label) : [];
        }
    },
    created() {
        this.update();
    },
    render() {
        return <CheckboxGroup {...this.formCreateRule} v-model={this.trueValue}
            on-input={this.onInput}>{this.formCreateOptions.map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Checkbox {...{props}} key={'' + index + props.value}/>
            }).concat(this.chlidren)}</CheckboxGroup>
    }
}
