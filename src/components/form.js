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
        rules:validate
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
        let unique = this.unique,propsData = this.props.props(Object.assign({},this.options.form,this.form)).ref(this.refName).class('form-create',true).key(unique).get(),
            vn = this.renderSort.map((field)=>{
                let render = this.renders[field],{key,rule:{type}} = render.handler;
                if(type !== 'hidden')
                    return this.makeFormItem(render.handler,render.parse(),`fItem${key}${unique}`);

            });
        if(false !== this.options.submitBtn)
            vn.push(this.makeSubmitBtn(unique));
        return this.cvm.form(propsData,vn);
    },
    makeFormItem({rule,refName,unique,field},VNodeFn){
        let propsData = this.props.props({
            prop: field,
            label: rule.title,
            labelFor:refName,
            rules: rule.validate,
        }).key(unique).get();
        return this.cvm.formItem(propsData,VNodeFn);
    },
    makeSubmitBtn(unique){
        return this.cvm.button({key:`fbtn${unique}`,props:this.vm.buttonProps,on:{"click":()=>{
            this.fCreateApi.submit();
        }}},[this.cvm.span(this.options.submitBtn.innerText)]);
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