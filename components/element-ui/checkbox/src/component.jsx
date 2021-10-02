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
            this.$emit('input', this.formCreateInject.options.filter((opt) => n.indexOf(opt.label) !== -1).map((opt) => opt.value).filter(v => v !== undefined));
        },
        update() {
            this.trueValue = this.value ? this.formCreateInject.options.filter((opt) => this.value.indexOf(opt.value) !== -1)
                .map((option) => option.label) : []
        }
    },
    created() {
        this.update();
    },
    render() {
        return <ElCheckboxGroup {...this.formCreateInject.prop} value={this.trueValue}
            on-input={this.onInput}>{this.formCreateInject.options.map((opt, index) => {
                const props = {...opt};
                const Type = this.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox';
                delete props.value;
                return <Type {...{props}} key={Type + index + opt.value}/>
            })}{getSlot(this.$slots)}</ElCheckboxGroup>
    }
}
