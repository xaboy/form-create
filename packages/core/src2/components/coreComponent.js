import {formCreateName} from '../config';
import {$nt} from '@form-create/utils';

export default function coreComponent(fComponent, mixin) {
    return {
        name : `${formCreateName}Core`,
        mixins : [mixin],
        render : () => {
            return fComponent.render();
        },
        beforeCreate() {
            this._fComponent = fComponent;
            fComponent._type = 'rules';
            fComponent.beforeBoot(this);
        },
        created() {
            fComponent.boot();
            this.$f = fComponent.fCreateApi;
        },
        mounted() {
            fComponent.mounted(this);

            this.$watch('rules', n => {
                this._fComponent.reload(n);
            });
            this.$watch('option', () => {
                $nt(() => {
                    this._sync();
                });
            }, {deep : true});

            this.__init();
        }
    };
}
