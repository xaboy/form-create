import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';

const NAME = 'FormCreate';

export default function $FormCreate(FormCreate) {
    return {
        name: NAME,
        componentName: NAME,
        model: {
            prop: 'api'
        },
        props: {
            rule: {
                type: Array,
                required: true
            },
            option: {
                type: Object,
                default: () => {
                    return {};
                }
            },
            value: Object
        },
        data() {
            return {
                formData: undefined,
                $f: undefined,
                isShow: true,
                unique: 1,
                renderRule: [...this.rule || []],
                updateValue: ''
            };
        },
        render() {
            return this.formCreate.render();
        },
        methods: {
            _refresh() {
                ++this.unique;
            },
            _renderRule() {
                this.renderRule = [...this.rule || []];
            },
            _updateValue(value) {
                this.updateValue = JSON.stringify(value);
                this.$emit('update:value', {...value});
            }
        },
        watch: {
            value: {
                handler(n) {
                    if (JSON.stringify(n) === this.updateValue) return;
                    this.$f.setValue(n);
                },
                deep: true
            },
            option(n) {
                this.formCreate.initOptions(n);
                this.$f.refresh(true);
            },
            rule(n) {
                if (n.length === this.renderRule.length && n.every(v => this.renderRule.indexOf(v) > -1)) return;
                this.formCreate.$handle.reloadRule(n);
                this._renderRule();
            }
        },
        beforeCreate() {
            const {rule, option, value} = this.$options.propsData;
            this.formCreate = new FormCreate(this, rule, option);
            value && is.Object(value) && this.formCreate.updateOptions({formData: value});
            Object.keys(this.formCreate.prop).forEach(k => {
                extend(this.$options[k], this.formCreate.prop[k]);
            })
        },
    }
}
