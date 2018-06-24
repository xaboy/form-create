const formCreateName = 'form-create';

const formCreateComponent = function (fComponent) {
    return {
        name:formCreateName,
        data() {
            return {
                formData:{},
                buttonProps:{},
                trueData:{},
                jsonData:{}
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
            },
            changeButtonProps(props){
                this.$set(this,'buttonProps',Object.assign(this.buttonProps,props));
            },
	        setField(field){
		        this.$set(this.formData,field,'');
		        this.$set(this.trueData,field,{});
            },
        },
        mounted(){
            Object.keys(this.formData).map((field)=>{
                let handler = fComponent.handlers[field];
	            handler.model && handler.model(this.getTrueData(field));
                fComponent.addHandlerWatch(handler);
	            handler.mounted();
            });
	        fComponent.options.mounted && fComponent.options.mounted();
        }
    }
};

export default formCreateComponent;