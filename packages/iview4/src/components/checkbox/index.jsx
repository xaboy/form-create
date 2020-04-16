import {uniqueId} from '@form-create/utils';

const NAME = 'fc-ivu-checkbox';

export default {
    name: NAME,
    props: {
        options: {
            type: Array,
            default: () => []
        },
        children: {
            type: Array,
            default: () => []
        },
        ctx: {
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
            trueValue: [],
            unique: uniqueId()
        }
    },
    methods: {
        onInput(n) {
            this.$emit('input', this.options.filter((opt) => n.indexOf(opt.label) !== -1).map((opt) => opt.value));
        },
        update() {
            this.trueValue = this.value ? this.options.filter((opt) => this.value.indexOf(opt.value) !== -1)
                .map((option) => option.label) : [];
        }
    },
    created() {
        this.update();
    },
    render() {
        return <CheckboxGroup {...this.ctx} v-model={this.trueValue}
            on-input={this.onInput}>{this.options.map((opt, index) => {
                const props = {...opt};
                delete props.value;
                return <Checkbox {...{props}} key={NAME + index + this.unique}/>
            }).concat(this.chlidren)}</CheckboxGroup>
    }
}
