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
            fComponent.init(this);
        },
        mounted(){
            fComponent.mounted(this);
            this.$f = fComponent.fCreateApi;
        }
    }
};

export default formCreateComponent;
