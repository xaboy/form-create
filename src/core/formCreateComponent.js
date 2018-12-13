import {formCreateName} from './component';
import {componentCommon} from "./common";

export default function formCreateComponent(fComponent) {
    return {
        name: `${formCreateName}Core`,
        data: componentCommon.data,
        render: () => {
            return fComponent.fRender.parse(fComponent.vm);
        },
        methods: componentCommon.methods,
        created() {
            this.fComponent = fComponent;
            this.fComponent._type = 'rules';
            fComponent.init(this);
        },
        mounted() {
            fComponent.mounted(this);
            this.$f = fComponent.fCreateApi;
            this.init();
            this.$watch('rules', n => {
                this.fComponent.reload(n);
            })
        }
    }
};
