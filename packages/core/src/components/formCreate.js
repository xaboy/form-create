import extend from '@form-create/utils/lib/extend';

const NAME = 'FormCreate';

export default function $FormCreate(FormCreate) {
    return {
        name: NAME,
        componentName: NAME,
        model: {
            prop: 'api'
        },
        provide() {
            return {
                $pfc: this,
            }
        },
        inject: {$pfc: {default: null}},
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
            extendOption: Boolean,
            value: Object,
            api: Object,
        },
        data() {
            return {
                formData: undefined,
                destroyed: false,
                validate: {},
                $f: undefined,
                isShow: true,
                unique: 1,
                renderRule: [...this.rule || []],
                ctxInject: {},
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
                if (this.destroyed) return;
                this.updateValue = JSON.stringify(value);
                this.$emit('update:value', value);
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
            option: {
                handler(n) {
                    this.formCreate.initOptions(n);
                    this.$f.refresh();
                },
                deep: true
            },
            rule(n) {
                if (n.length === this.renderRule.length && n.every(v => this.renderRule.indexOf(v) > -1)) return;
                this.formCreate.$handle.reloadRule(n);
                this._renderRule();
            }
        },
        beforeCreate() {
            const {rule, option} = this.$options.propsData;
            this.formCreate = new FormCreate(this, rule, option);
            Object.keys(this.formCreate.prop).forEach(k => {
                extend(this.$options[k], this.formCreate.prop[k]);
            })
        },
    }
}
