import cvm from './cvm'
import props from './props'
import {uniqueId} from "./util";

const render = function (vm, handler, options = {}) {
    this.handler = handler;
    this.options = options;
    this.vm = vm;
    this.cvm = cvm.instance(vm.$createElement);
    this.init();
};

render.prototype = {
    props: props.instance(),
    init(){
        this.event = this.handler.rule.event;
    },
    parse(){
        throw new Error('请实现parse方法');
    },
    inputProps(){
        let {refName,unique,rule:{props,field}} = this.handler;
        return this.props
            .props(Object.assign(props,{model:`formData.${field}`,value:this.vm.formData[field],elementId:refName}))
            .ref(refName).key(`fip${unique}`).on(this.event).on('input',(value)=>{
                this.vm.$emit('input',value);
                this.vm.$set(this.vm.formData,field,value);
            });
    }
};

const renderFactory = function (prototypeExtend) {
    let $r = function (vm,handler,options) {
        render.call(this,vm,handler,options);
    };
    $r.prototype = Object.create(render.prototype);
    Object.assign($r.prototype, prototypeExtend);
    $r.prototype.constructor = $r;
    return $r;
};

const hiddenRender = renderFactory({
    parse(){
        return [];
    }
});

const inputRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.input(this.propsData)];
    }
});

const inputnumberRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.inputNumber(this.propsData)];
    }
});

const radioRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.radioGroup(this.propsData,()=>options.map((option,index)=>this.cvm.radio({props:option,key:`ropt${index}${unique}`})))];
    }
});

const checkboxRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.checkboxGroup(this.propsData,()=>options.map((option,index)=>this.cvm.checkbox({props:option,key:`copt${index}${unique}`})))];
    }
});

const selectRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        let {unique,rule:{options}} = this.handler;
        return [this.cvm.select(this.propsData,()=>options.map((option,index)=>this.cvm.option({props:option,key:`sopt${index}${unique}`})))];
    }
});

const switchRender = renderFactory({
    parse(){
        let {slot} = this.handler.rule;
        this.propsData = this.inputProps().scopedSlots({
            open:()=>slot.open,
            close:()=>slot.close
        }).get();
        return [this.cvm.switch(this.propsData)]
    }
});

const datepickerRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.datePicker(this.propsData)];
    }
});

const timepickerRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.timePicker(this.propsData)];
    }
});

const colorpickerRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.colorPicker(this.propsData)];
    }
});

const cascaderRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        return [this.cvm.cascader(this.propsData)];
    }
});

const uploadRender = renderFactory({
    init(){
        let field = this.handler.getField();
        this.uploadOptions = Object.assign(Object.create(null),this.options.upload,this.handler.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        this.propsData = this.props.props(this.uploadOptions)
            .props('onSuccess',(response, file, fileList)=>{
                let pic = this.uploadOptions.onSuccess.call(null,response, file, fileList);
                setTimeout(()=>{
                    this.vm.formData[field].status = 'normal';
                    pic && this.handler.push(pic);
                },300)
            }).props('beforeUpload',(...arg)=>{
                return this.uploadOptions.beforeUpload.call(null,...arg);
            }).props('onProgress',(...arg)=>{
                this.vm.formData[field].status = arg[1];
                return this.uploadOptions.onProgress.call(null,...arg);
            }).props('onPreview',(...arg)=>{
                return this.uploadOptions.onPreview.call(null,...arg);
            }).props('onRemove',(...arg)=>{
                return this.uploadOptions.onRemove.call(null,...arg);
            }).props('onFormatError',(...arg)=>{
                return this.uploadOptions.onFormatError.call(null,...arg);
            }).props('onExceededSize',(...arg)=>{
                return this.uploadOptions.onExceededSize.call(null,...arg);
            }).props('onError',(...arg)=>{
                return this.uploadOptions.onError.call(null,...arg);
            }).ref(this.handler.refName).key(`fip${this.handler.unique}`).get();
    },
    parse(){
        let {rule,unique} = this.handler,
            value = this.vm.formData[rule.field],
            render = [...value.files.map((img,index)=>this.makeUploadView(img,`${index}${unique}`))];
        if(value.status.showProgress === true)
            render.push(this.makeProgress(value.status,unique));
        if(!this.uploadOptions.maxLength || this.uploadOptions.maxLength > this.vm.formData[rule.field].files.length)
            render.push(this.makeUploadBtn(unique));
        return [this.cvm.make('div',{key:`div4${unique}`,class:{'fc-upload':true}},render)];
    },
    makeUploadView(src,key){
        return this.cvm.make('div',{key:`div1${key}`,class:{'fc-files':true}},()=>{
            let container = [];
            if(this.uploadOptions.uploadType === 'image'){
                container.push(this.cvm.make('img',{key:`img${key}`,attrs:{src}}));
            }else{
                container.push(this.cvm.icon({key:`file${key}`,props:{type:"document-text", size:40}}))
            }
            if(this.issetIcon)
                container.push(this.makeIcons(src,key));
            return container;
        });
    },
    makeIcons(src,key){
        return this.cvm.make('div',{key:`div2${key}`,class:{'fc-upload-cover':true}},()=>{
            let icon = [];
            if(!!this.uploadOptions.handleIcon)
                icon.push(this.makeHandleIcon(src,key));
            if(this.uploadOptions.allowRemove === true)
                icon.push(this.makeRemoveIcon(src,key));
            return icon;
        });
    },
    makeProgress(file,unique) {
        return this.cvm.make('div', {key:`div3${unique}`,class: {'fc-files': true}}, [
            this.cvm.progress({key:`upp${unique}`,props:{percent:file.percentage,hideInfo:true}})
        ]);
    },
    makeUploadBtn(unique){
        return this.cvm.upload(this.propsData,[
            this.cvm.make('div',{key:`div5${unique}`,class:{'fc-upload-btn':true}},[
                this.cvm.icon({key:`upi${unique}`,props:{type:"camera", size:20}})
            ])
        ]);
    },
    makeRemoveIcon(src,key){
        return this.cvm.icon({key:`uph${key}`,props:{type:'ios-trash-outline'},nativeOn:{'click':()=>{
            let {files} = this.handler.getParseValue();
            files.splice(files.indexOf(src),1);
        }}});
    },
    makeHandleIcon(src,key){
        return this.cvm.icon({key:`uph${key}`,props:{type:this.uploadOptions.handleIcon.toString()},nativeOn:{'click':()=>{
            this.uploadOptions.onHandle(src);
        }}});
    }
});

const renderList = {
    hidden: hiddenRender,
    input: inputRender,
    radio: radioRender,
    checkbox: checkboxRender,
    switch: switchRender,
    select: selectRender,
    datepicker: datepickerRender,
    timepicker: timepickerRender,
    inputnumber: inputnumberRender,
    colorpicker: colorpickerRender,
    upload: uploadRender,
    cascader: cascaderRender,
};

const getRender = function (type) {
    return renderList[type];
};

const formRender = function ({vm,options,fieldList,handlers,formData,validate,fCreateApi}) {
    this.vm = vm;
    this.options = options;
    this.handlers = handlers;
    this.renderSort = fieldList;
    console.log(fieldList);
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

formRender.prototype = {
    parse(){
        let unique = this.unique,propsData = this.props.props(Object.assign({},this.options.form,this.form)).ref(this.refName).key(unique).get(),
            vn = this.renderSort.map((field)=>{
                let render = this.renders[field],{key,rule:{type}} = render.handler;
                if(type !== 'hidden')
                    return this.makeFormItem(render.handler,render.parse(),`fItem${key}${unique}`);
            });
        if(false !== this.options.submitBtn)
            vn.push(this.makeSubmitBtn(unique));
        return this.cvm.form(propsData,vn);
    },
    makeFormItem({rule,refName,unique},VNodeFn){
        let propsData = this.props.props({
            prop: rule.field,
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
        this.renders[handler.rule.field] = handler.render;
        if(after !== undefined)
            this.changeSort(handler.rule.field,after,pre);
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

export {
    formRender,
    hiddenRender,
    inputRender,
    inputnumberRender,
    radioRender,
    checkboxRender,
    selectRender,
    switchRender,
    datepickerRender,
    timepickerRender,
    colorpickerRender,
    uploadRender,
    getRender
}