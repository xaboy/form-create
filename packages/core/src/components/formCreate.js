import {deepExtend} from '@form-create/utils';
import extend from '@form-create/utils/lib/extend';

const NAME = 'FormCreate';

export default function $FormCreate(FormCreate) {
    return {
        name: NAME,
        componentName: NAME,
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
            value: {}
        },
        data: () => {
            return {
                formData: undefined,
                buttonProps: undefined,
                resetProps: undefined,
                $f: undefined,
                isShow: true,
                unique: 1,
            };
        },
        render() {
            return this.formCreate.render();
        },
        methods: {
            _buttonProps(props) {
                this.$set(this, 'buttonProps', deepExtend(this.buttonProps, props));
            },
            _resetProps(props) {
                this.$set(this, 'resetProps', deepExtend(this.resetProps, props));
            },
            _refresh() {
                ++this.unique;
            }
        },
        watch: {
            option: '_refresh',
            rule(n) {
                this.formCreate.handle.reloadRule(n);
            }
        },
        beforeCreate() {
            const {rule, option} = this.$options.propsData;
            this.formCreate = new FormCreate(rule, option);
            extend(this.$options.components, this.formCreate.components);
            this.formCreate.beforeCreate(this);
        },
        created() {
            this.formCreate.created();
            this.$f = this.formCreate.api();
            this.$emit('input', this.$f);
        },
        mounted() {
            this.formCreate.mounted();
            this.$emit('input', this.$f);
        },
        beforeDestroy() {
            this.formCreate.handle.reloadRule([]);
            this.formCreate.handle.$render.clearCacheAll();
        },
    }
}
