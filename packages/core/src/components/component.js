import {$nt} from '@form-create/utils';
import {formCreateName} from '../core/config';
import getMixins from './mixins';

export default function $FormCreate(formCreate, components) {
    return {
        name: formCreateName,
        mixins: [getMixins(components)],
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
            return this._fc.handle.run();
        },
        beforeCreate() {
            const {rule, option} = this.$options.propsData;
            this._fc = new formCreate(rule, option);

            this._fc.beforeCreate(this);
        },
        created() {
            this._fc.handle.created();
            this.$f = this._fc.handle.fCreateApi;
            this.$emit('input', this.$f);
        },
        mounted() {
            const _fc = this._fc;

            this.$watch('rule', n => {
                _fc.handle.reloadRule(n);
                this.$emit('input', this.$f);
            });
            this.$emit('input', this.$f);
        }
    };
}
