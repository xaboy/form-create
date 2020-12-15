const NAME = 'fcRadio';

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
        value: {},
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
            this.$emit('input', this.formCreateOptions.filter((opt) => opt[this.propLabel] === n).reduce((initial, opt) => opt[this.propValue], ''));
        },
        update() {
            this.trueValue = this.formCreateOptions.filter((opt) => opt[this.propValue] === this.value).reduce((initial, opt) => opt[this.propLabel], '');
        }
    },
    created() {
        this.update();
    },
    render() {
        return <ElRadioGroup {...this.formCreateRule} value={this.trueValue}
            on-input={this.onInput}>{this.formCreateOptions.map((opt, index) => {
                const props = {...opt};
                const Type = this.type === 'button' ? 'ElRadioButton' : 'ElRadio';
                delete props.value;
                return <Type {...{props}} key={Type + index + opt.value}/>
            })}{this.$slots.default}</ElRadioGroup>
    }
}
