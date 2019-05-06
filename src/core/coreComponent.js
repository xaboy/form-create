import {formCreateName} from './component';
import baseComponent from "./mixins";
import {$nt} from "./util";

export default function coreComponent(fComponent) {
    return {
        name: `${formCreateName}Core`,
        mixins: [baseComponent],
        render: () => {
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
            this.$watch('option', n => {
                $nt(() => {
                    this._sync();
                });
            }, {deep: true});

            this.__init();
        }
    }
};
