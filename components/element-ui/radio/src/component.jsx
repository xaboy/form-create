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
            this.$emit('input', this.options().filter((opt) => opt.label === n).reduce((initial, opt) => opt.value, ''));
        },
        update() {
            this.trueValue = this.options().filter((opt) => opt.value === this.value).reduce((initial, opt) => opt.label, '');
        }
    },
    created() {
        this.update();
    },
    render() {
        return <ElRadioGroup {...this.formCreateInject.prop} ref="el"
            props={{value: this.trueValue}}
            on-input={this.onInput}>{this.options().map((opt, index) => {
                const props = {...opt};
                const Type = this.type === 'button' ? 'ElRadioButton' : 'ElRadio';
                delete props.value;
                return <Type props={props} key={Type + index + '-' + opt.value}/>
            })}{getSlot(this.$slots)}</ElRadioGroup>
    },
    mounted(){
        this.$emit('fc.el', this.$refs.el);
    }
}
