import {formCreateName} from '../core/config';
import {$nt} from '@form-create/utils';

export default function coreComponent(fc, mixin) {
    return {
        name: `${formCreateName}Core`,
        mixins: [mixin],
        render: () => {
            return fc.handle.render();
        },
        beforeCreate() {
            this._fComponent = fc;
            fc._type = 'rules';
            fc.beforeCreate(this);
        },
        created() {
            fc.handle.created();
            this.$f = fc.fCreateApi;
        },
        mounted() {
            fc.handle.mounted(this);

            this.$watch('rules', n => {
                this._fComponent.reload(n);
            });
            this.$watch('option', () => {
                $nt(() => {
                    this._sync();
                });
            }, {deep: true});

            this.__init();
        }
    };
}
