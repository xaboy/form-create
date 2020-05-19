import {deepExtend} from '@form-create/utils';

export const formCreateName = 'FormCreate';

export default function $FormCreate(FormCreate, components) {
    return {
        name: formCreateName,
        componentName: formCreateName,
        props: {
            rule: {
                type: Array,
                required: true
            },
            option: {
                type: Object,
                default: () => {
                    return {};
                },
                required: false
            },
            value: Object
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
        components,
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
