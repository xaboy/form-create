import {formCreate} from './formCreate';

const formCreateName = 'FormCreate';

const $FormCreate = ()=>({
    name:formCreateName,
    render(){
        return this.fComponent.fRender.parse(this.fComponent.vm);
    },
    props:{
        rule:{
            type: Array,
            required: true
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
    data:()=>{
        return {
            formData:{},
            buttonProps:{},
            resetProps:{},
            trueData:{},
            jsonData:{},
            $f:{},
            $model:{},
        }
    },
    methods:{
        changeFormData(field,value){
            this.$set(this.formData,field,value);
        },
        changeTrueData(field,value){
            this.$set(this.trueData[field],'value',value);
        },
        getTrueDataValue(field){
            return this.trueData[field].value;
        },
        getTrueData(field){
            return this.trueData[field];
        },
        getFormData(field){
            return this.formData[field];
        },
        removeFormData(field){
            this.$delete(this.formData,field);
            this.$delete(this.trueData,field);
            this.$delete(this.jsonData,field);
        },
        changeButtonProps(props){
            this.$set(this,'buttonProps',Object.assign(this.buttonProps,props));
        },
        changeResetProps(props){
            this.$set(this,'resetProps',Object.assign(this.resetProps,props));
        },
        setField(field){
            this.$set(this.formData,field,'');
            this.$set(this.trueData,field,{});
        },
    },
    created(){
        this.fComponent = new formCreate(this.rule,this.option);
        this.fComponent.init(this);
    },
    mounted(){
        this.fComponent.mounted(this);
        this.$f = this.fComponent.fCreateApi;
        // if(this.value !== undefined)
        this.$f.model(this.$model);
    }
});

export {
    $FormCreate,
    formCreateName
};
