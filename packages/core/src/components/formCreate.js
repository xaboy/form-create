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
                $f: undefined,
                isShow: true,
                unique: 1,
            };
        },
        render() {
            return this.formCreate.render();
        },
        methods: {
            _refresh() {
                ++this.unique;
            }
        },
        watch: {
            option(n) {
                this.formCreate.options = n;
                this._refresh();
            },
            rule(n) {
                this.formCreate.handle.reloadRule(n);
            }
        },
        beforeCreate() {
            const {rule, option} = this.$options.propsData;
            this.formCreate = new FormCreate(rule, option);
            extend(this.$options.components, this.formCreate.components);
        },
        created() {
            this.formCreate.created(this);
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
