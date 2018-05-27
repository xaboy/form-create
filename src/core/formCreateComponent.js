const formCreateName = 'form-create';

const formCreateComponent = function (fComponent) {
    return {
        name:formCreateName,
        data() {
            return {
                formData:{},
                buttonProps:{}
            }
        },
        render:()=>{
            return fComponent.fRender.parse(fComponent.vm);
        },
        created(){
            fComponent.init(this);
        },
        methods:{
            changeFormData(field,value){
                this.$set(this.formData,field,value);
            },
            removeFormData(field){
                this.$delete(this.formData,field);
            },
            changeButtonProps(props){
                this.$set(this,'buttonProps',Object.assign(this.buttonProps,props));
            },
            setField(field,value){
                this.$set(this.formData,field,value);
            },
        },
        mounted(){
            Object.keys(this.formData).map((field)=>{
                fComponent.addHandlerWatch(fComponent.handlers[field]);
                fComponent.handlers[field].mounted();
            });
        }
    }
};

export default formCreateComponent;