const formCreateName = 'FormCreate';

const $FormCreate = ()=>({
    name:formCreateName,
    template:'<div class="fc-component"></div>',
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
            api:{}
        }
    },
    mounted:function(){
        this.api = this.$formCreate(this.rule,Object.assign(this.option,{el:this.$el}));
        if(this.value !== undefined)
            this.api.model(this.value);
    }
});

export {
    $FormCreate,
    formCreateName
};