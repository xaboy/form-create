import getSlot from '@form-create/utils/lib/slot';

const NAME = 'fcRadio';

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
        value: {},
        type: String,
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
        return <ElRadioGroup {...this.formCreateInject.prop} value={this.trueValue}
            on-input={this.onInput}>{this.formCreateInject.options.map((opt, index) => {
                const props = {...opt};
                const Type = this.type === 'button' ? 'ElRadioButton' : 'ElRadio';
                delete props.value;
                return <Type {...{props}} key={Type + index + opt.value}/>
            })}{getSlot(this.$slots)}</ElRadioGroup>
    }
}
