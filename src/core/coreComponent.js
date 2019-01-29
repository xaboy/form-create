import {formCreateName} from './component';
import baseComponent from "./mixins";

export default function coreComponent(fComponent) {
    return {
        name: `${formCreateName}Core`,
        mixins: [baseComponent()],
        render: () => {
            return fComponent.fRender.render(fComponent.vm);
        },
        created() {
            this._fComponent = fComponent;
            this._fComponent._type = 'rules';
            fComponent.boot(this);
        },
        mounted() {
            fComponent.mounted(this);
            this.$f = fComponent.fCreateApi;
            this.__init();
            this.$watch('rules', n => {
                this._fComponent.reload(n, this.unique);
            });
        }
    }
};
