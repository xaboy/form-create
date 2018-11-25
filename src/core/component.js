import formCreate from './formCreate';
import {componentCommon} from './common';

const formCreateName = 'FormCreate';

const $FormCreate = ()=>({
    name:formCreateName,
    render(){
        return this.fComponent.fRender.parse(this.fComponent.vm);
    },
    props:{
        rule:{
            type: Array,
            required: true,
            default:[]
        },
        option:{
            type: Object,
            default:()=>{
                return {}
            },
            required: false
        },
        value:Object
    },
    data:componentCommon.data,
    methods:componentCommon.methods,
    created(){
        this.fComponent = new formCreate(this.rule,this.option);
        this.fComponent._type='rule';
        this.fComponent.init(this);
        console.time()
    },
    mounted(){
        this.fComponent.mounted(this);
        this.$f = this.fComponent.fCreateApi;
        this.init();
    }
});

export {
    $FormCreate,
    formCreateName
};
