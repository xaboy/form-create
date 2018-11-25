import cvm from '../core/cvm';
import props from '../core/props';
import {uniqueId} from "../core/util";


const render = function ({vm,options,fieldList,handlers,formData,validate,fCreateApi}) {
    this.vm = vm;
    this.options = options;
    this.handlers = handlers;
    this.renderSort = fieldList;
    this.renders = this.renderSort.reduce((initial,field)=>{
        initial[field] = handlers[field].render;
        return initial;
    },{});
    this.form = {
        model:formData,
        rules:validate,
        key:'form'+uniqueId()
    };
    this.fCreateApi = fCreateApi;
    this.cvm = cvm.instance(vm.$createElement);
    this.props = props.instance();
    this.unique = uniqueId();
    this.refName = `cForm${this.unique}`;
};
render.prototype = {
    parse(vm){
        cvm.setVm(vm);
        if(!vm.isShow) return ;
        let unique = this.unique,propsData = this.props.props(Object.assign({},this.options.form,this.form)).ref(this.refName).class('form-create',true).key(unique).get(),
            vn = this.renderSort.map((field)=>{
                let render = this.renders[field],{key,type} = render.handler;

                if(type === 'hidden') return ;
                return this.makeFormItem(render.handler,render.parse(),`fItem${key}${unique}`);

            });
        if(vn.length > 0)
            vn.push(this.makeFormBtn(unique));
        return this.cvm.form(propsData,[this.cvm.row({props:this.options.row||{}},vn)]);
    },
    makeFormItem({rule,unique,field},VNodeFn){
        let propsData = this.props.props({
            prop: field,
            label: rule.title,
            labelFor:unique,
            rules: rule.validate,
	        labelWidth:rule.col.labelWidth,
	        required:rule.props.required
        }).key(unique).get();
            return this.cvm.col({props:rule.col,style:{
                    display:rule.props.hidden === true ? 'none' : 'block',
                    visibility:rule.props.visibility === true ? 'hidden' : 'visible'
                }},[this.cvm.formItem(propsData,VNodeFn)]);
    },
    makeFormBtn(unique){
        let btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if(submitBtnShow)
            btn.push(this.makeSubmitBtn(unique,resetBtnShow ? 19 : 24));
        if(resetBtnShow)
            btn.push(this.makeResetBtn(unique,4));

        return this.cvm.col({props:{span:24}},btn);
    },
    makeResetBtn(unique,span){
        return this.cvm.col({props:{span:span,push:1}},[
            this.cvm.button({key:`frsbtn${unique}`,props:this.vm.resetProps,on:{"click":()=>{
                this.fCreateApi.resetFields();
            }}},[this.cvm.span(this.vm.resetProps.innerText)])
        ]);
    },
    makeSubmitBtn(unique,span){
        return  this.cvm.col({props:{span:span}},[
            this.cvm.button({key:`fbtn${unique}`,props:this.vm.buttonProps,on:{"click":()=>{
                this.fCreateApi.submit();
            }}},[this.cvm.span(this.vm.buttonProps.innerText)])
        ]);
    },
    removeRender(field){
        delete this.renders[field];
        this.renderSort.splice(this.renderSort.indexOf(field),1);
    },
    setRender(handler,after,pre){
        this.renders[handler.field] = handler.render;
        if(after !== undefined)
            this.changeSort(handler.field,after,pre);
    },
    changeSort(field,after,pre){
        let index = this.renderSort.indexOf(after.toString());
        if(index !== -1)
            this.renderSort.splice(pre === false ? index+1 : index,0,field);
        else if (!pre)
            this.renderSort.push(field);
        else
            this.renderSort.unshift(field);
    }
};

export default render;
