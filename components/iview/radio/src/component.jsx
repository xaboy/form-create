import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcRadio';

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
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
            this.$emit('input', this.formCreateInject.options.filter((opt) => opt.label === n).reduce((initial, opt) => opt.value, ''));
        },
        update() {
            this.trueValue = this.formCreateInject.options.filter((opt) => opt.value === this.value).reduce((initial, opt) => opt.label, '');
        }
    },
    created() {
        this.update();
    },
    render() {
        return <RadioGroup {...this.formCreateInject.prop} value={this.trueValue}
            on-input={this.onInput}>{this.formCreateInject.options.map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Radio {...{props}} key={'' + index + opt.value}/>
            })}{getSlot(this.$slots)}</RadioGroup>
    }
}
