import getSlot from '@form-create/utils/lib/slot';

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
        value: {}
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
            this.$emit('input', this.formCreateOptions.filter((opt) => opt.label === n).reduce((initial, opt) => opt.value, ''));
        },
        update() {
            this.trueValue = this.formCreateOptions.filter((opt) => opt.value === this.value).reduce((initial, opt) => opt.label, '');
        }
    },
    created() {
        this.update();
    },
    render() {
        return <RadioGroup {...this.formCreateRule} value={this.trueValue}
            on-input={this.onInput}>{this.formCreateOptions.map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Radio {...{props}} key={'' + index + opt.value}/>
            })}{getSlot(this.$slots)}</RadioGroup>
    }
}
