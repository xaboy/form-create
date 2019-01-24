import {formCreateName} from './component';
import {componentCommon} from "./common";
import {$nt} from "./util";

export default function formCreateComponent(fComponent) {
    return {
        name: `${formCreateName}Core`,
        data: componentCommon.data,
        render: () => {
            return fComponent.fRender.render(fComponent.vm);
        },
        methods: componentCommon.methods,
        created() {
            this._fComponent = fComponent;
            this._fComponent._type = 'rules';
            fComponent.init(this);
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
