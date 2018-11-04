import {formCreateName} from './component';
import {componentCommon} from "./common";

const formCreateComponent = function (fComponent) {
    return {
        name:`${formCreateName}Core`,
        data:componentCommon.data,
        render:()=>{
            return fComponent.fRender.parse(fComponent.vm);
        },
        methods:componentCommon.methods,
        created(){
            this.fComponent = fComponent;
            fComponent.init(this);
        },
        mounted(){
            fComponent.mounted(this);
            this.$f = fComponent.fCreateApi;
            this.init();

            this.$watch('rules',n=>{
                this.fComponent.reload(n);
            })
        }
    }
};

export default formCreateComponent;
