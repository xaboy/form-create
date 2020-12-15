const NAME = 'fcCheckbox';

export default {
    name: NAME,
    props: {
        formCreateRule: {
            type: Object,
            default: () => ({})
        },
        formCreateOptions: {
            type: Array,
            default: () => []
        },
        value: {
            type: Array,
            default: () => []
        },
        type: String,
        props: Object,
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
    computed: {
        propLabel() {
            return (this.props || {}).label || 'label';
        },
        propValue() {
            return (this.props || {}).value || 'value';
        },
    },
    methods: {
        onInput(n) {
            this.$emit('input', this.formCreateOptions.filter((opt) => n.indexOf(opt[this.propLabel]) !== -1).map((opt) => opt[this.propValue]).filter(v => v !== undefined));
        },
        update() {
            this.trueValue = this.value ? this.formCreateOptions.filter((opt) => this.value.indexOf(opt[this.propValue]) !== -1)
                .map((option) => option[this.propLabel]) : []
        }
    },
    created() {
        this.update();
    },
    render() {
        return <ElCheckboxGroup {...this.formCreateRule} value={this.trueValue}
            on-input={this.onInput}>{this.formCreateOptions.map((opt, index) => {
                const props = {...opt};
                const Type = this.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox';
                delete props.value;
                return <Type {...{props}} key={Type + index + opt.value}/>
            })}{this.$slots.default}</ElCheckboxGroup>
    }
}
