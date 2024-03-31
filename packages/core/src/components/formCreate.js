import extend from '@form-create/utils/lib/extend';
import toArray from '@form-create/utils/lib/toarray';

const NAME = 'FormCreate';

const getRuleInject = (vm, parent) => {
    if (!vm || vm === parent) {
        return;
    }
    if (vm.formCreateInject) {
        return vm.formCreateInject
    }
    if (vm.$parent) {
        return getRuleInject(vm.$parent, parent);
    }
}

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
            disabled: Boolean,
            value: Object,
            api: Object,
            name: String,
            subForm: {
                type: Boolean,
                default: true
            },
            inFor: Boolean,
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
                updateValue: JSON.stringify(this.value || {}),
                isMore: !!this.inFor,
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
                    if (JSON.stringify(n || {}) === this.updateValue) return;
                    this.$f.config.forceCoverValue ? this.$f.coverValue(n || {}) : this.$f.setValue(n || {});
                },
                deep: true
            },
            option: {
                handler() {
                    this.formCreate.initOptions();
                    this.$f.refresh();
                },
                deep: true
            },
            rule(n) {
                if (n.length === this.renderRule.length && n.every(v => this.renderRule.indexOf(v) > -1)) return;
                this.formCreate.$handle.reloadRule(n);
                this._renderRule();
            },
            disabled(n) {
                this.$f.disabled(!!n);
            }
        },
        beforeCreate() {
            this.formCreate = new FormCreate(this);
            Object.keys(this.formCreate.prop).forEach(k => {
                extend(this.$options[k], this.formCreate.prop[k]);
            })
            this.$emit('beforeCreate', this.formCreate.api());
        },
        created() {
            const vm = this, fapi = this.formCreate.api();
            const addSubForm = () => {
                if (vm.$pfc) {
                    const inject = getRuleInject(vm, vm.$pfc);
                    if (inject) {
                        let sub;
                        if (vm.isMore) {
                            sub = toArray(inject.getSubForm());
                            sub.push(fapi);

                        } else {
                            sub = fapi;
                        }
                        inject.subForm(sub);
                    }
                }
            };

            const rmSubForm = () => {
                const inject = getRuleInject(vm, vm.$pfc);
                if (inject) {
                    if (vm.isMore) {
                        const sub = toArray(inject.getSubForm());
                        const idx = sub.indexOf(fapi);
                        if (idx > -1) {
                            sub.splice(idx, 1);
                        }
                    } else {
                        inject.subForm();
                    }
                }
            };

            vm.$on('hook:beforeDestroy', () => {
                rmSubForm();
            });

            this.$watch(() => this.subForm, (n) => {
                n ? addSubForm() : rmSubForm();
            }, {immediate: true});
        }
    }
}
