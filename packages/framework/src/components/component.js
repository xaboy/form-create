import {$nt} from '@form-create/utils';
import {formCreateName} from '../core/config';

export default function $FormCreate(formCreate, mixin) {
    return {
        name: formCreateName,
        mixins: [mixin],
        props: {
            rule: {
                type: Array,
                required: true,
                default: () => {
                    return {};
                }
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
        render() {
            return this._fc.handle.render();
        },
        beforeCreate() {
            const {rule, option} = this.$options.propsData;
            this._fc = new formCreate(rule, option);

            this._fc.beforeCreate();
        },
        created() {
            this._fc.handle.created();
            this.$f = this._fc.handle.fCreateApi;
            this.$emit('input', this.$f);
        },
        mounted() {
            const _fc = this._fc;

            _fc.handle.mounted();

            this.$watch('rule', n => {
                _fc.reload(n);
                this.$emit('input', this.$f);
            });

            this.$watch('option', n => {
                $nt(() => {
                    this._sync();
                });
            }, {deep: true});

            this.$emit('input', this.$f);
        }
    };
}
