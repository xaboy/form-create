import {$nt} from '@form-create/utils';
import {formCreateName} from '../config';

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
            return this._fComponent.render();
        },
        beforeCreate() {
            const {rule, option} = this.$options.propsData;
            const _fc = new formCreate(rule, option);

            this._fComponent = _fc;
            _fc._type = 'rule';
            _fc.beforeBoot(this);
        },
        created() {
            const _fc = this._fComponent;

            _fc.boot();
            this.$f = _fc.fCreateApi;

            this.$emit('input', _fc.fCreateApi);
        },
        mounted() {
            const _fc = this._fComponent;

            _fc.mounted(this);

            this.$watch('rule', n => {
                _fc.reload(n);
                this.$emit('input', this.$f);
            });

            this.$watch('a', n => {
                $nt(() => {
                    this._sync();
                });
            }, {deep: true});

            this.__init();
            this.$emit('input', this.$f);
        }
    };
}
