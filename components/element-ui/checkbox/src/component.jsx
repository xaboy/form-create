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
            const checked = Array.isArray(this.value) ? this.value : [this.value];
            this.trueValue = this.options().filter((opt) => checked.indexOf(opt.value) !== -1)
                .map((option) => option.label);
        }
    },
    created() {
        this.update();
    },
    render() {
        return <ElCheckboxGroup {...this.formCreateInject.prop} props={{value: this.trueValue}} ref="el"
            on-input={this.onInput}>{this.options().map((opt, index) => {
                const props = {...opt};
                const Type = this.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox';
                delete props.value;
                return <Type props={props} key={Type + index + '-' + opt.value}/>
            })}{getSlot(this.$slots)}</ElCheckboxGroup>
    },
    mounted(){
        this.$emit('fc.el', this.$refs.el);
    }
}
