import cvm from './cvm'
import props from './props'

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
        let {props,field} = this.handler.rule;
        return this.props
            .props(Object.assign(props,{model:`formData.${field}`,value:this.vm.formData[field],elementId:field}))
            .ref(field).on(this.event).on('input',(value)=>{
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
        let {options} = this.handler.rule;
        return [this.cvm.radioGroup(this.propsData,()=>options.map((option)=>this.cvm.radio({props:option})))];
    }
});

const checkboxRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        let {options} = this.handler.rule;
        return [this.cvm.checkboxGroup(this.propsData,()=>options.map((option)=>this.cvm.checkbox({props:option})))];
    }
});

const selectRender = renderFactory({
    parse(){
        this.propsData = this.inputProps().get();
        let {options} = this.handler.rule;
        return [this.cvm.select(this.propsData,()=>options.map((option)=>this.cvm.option({props:option})))];
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
            }).ref(field).get();
    },
    parse(){
        let rule = this.handler.rule,
            value = this.vm.formData[rule.field],
            render = [...value.files.map((img)=>this.makeUploadView(img))];
        if(value.status.showProgress === true)
            render.push(this.makeProgress(value.status));
        if(!this.uploadOptions.maxLength || this.uploadOptions.maxLength > this.vm.formData[rule.field].files.length)
            render.push(this.makeUploadBtn());
        return [this.cvm.make('div',{class:{'fc-upload':true}},render)];
    },
    makeUploadView(src){
        return this.cvm.make('div',{class:{'fc-files':true}},()=>{
            let container = [];
            if(this.uploadOptions.uploadType === 'image'){
                container.push(this.cvm.make('img',{attrs:{src}}));
            }else{
                container.push(this.cvm.icon({props:{type:"document-text", size:40}}))
            }
            if(this.issetIcon)
                container.push(this.makeIcons(src));
            return container;
        });
    },
    makeIcons(src){
        return this.cvm.make('div',{class:{'fc-upload-cover':true}},()=>{
            let icon = [];
            if(!!this.uploadOptions.handleIcon)
                icon.push(this.makeHandleIcon(src));
            if(this.uploadOptions.allowRemove === true)
                icon.push(this.makeRemoveIcon(src));
            return icon;
        });
    },
    makeProgress(file) {
        return this.cvm.make('div', {class: {'fc-files': true}}, [
            this.cvm.progress({props:{percent:file.percentage,hideInfo:true}})
        ]);
    },
    makeUploadBtn(){
        return this.cvm.upload(this.propsData,[
            this.cvm.make('div',{class:{'fc-upload-btn':true}},[
                this.cvm.icon({props:{type:"camera", size:20}})
            ])
        ]);
    },
    makeRemoveIcon(src){
        return this.cvm.icon({props:{type:'ios-trash-outline'},nativeOn:{'click':()=>{
            this.options.upload.onRemove(src,()=>{
                let {files} = this.handler.getParseValue();
                files.splice(files.indexOf(src),1);
            });
        }}});
    },
    makeHandleIcon(src){
        return this.cvm.icon({props:{type:this.uploadOptions.handleIcon.toString()},nativeOn:{'click':()=>{
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

const formRender = function ({vm,options,handlers,formData,validate,fCreateApi}) {
    this.vm = vm;
    this.options = options;
    this.handlers = handlers;
    this.renderSort = Object.keys(handlers);
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
};

formRender.prototype = {
    parse(){
        let propsData = this.props.props(Object.assign({},this.options.form,this.form)).ref('cForm').get(),
            vn = this.renderSort.map((field)=>{
                let render = this.renders[field],{type} = render.handler.rule;
                if(type !== 'hidden')
                    return this.makeFormItem(render.handler,render.parse());
            });
        if(false !== this.options.submitBtn)
            vn.push(this.makeSubmitBtn());
        return this.cvm.form(propsData,vn);
    },
    makeFormItem({rule,unique},VNodeFn){
        let propsData = this.props.props({
            prop: rule.field,
            label: rule.title,
            labelFor:rule.field,
            rules: rule.validate,
        }).key(unique).get();
        return this.cvm.formItem(propsData,VNodeFn);
    },
    makeSubmitBtn(){
        return this.cvm.button({props:this.vm.buttonProps,on:{"click":()=>{
            this.fCreateApi.submit();
        }}},[this.cvm.span(this.options.submitBtn.innerText)]);
    },
    removeRender(field){
        delete this.renders[field];
        this.renderSort.splice(this.renderSort.indexOf(field),1);
    },
    setRender(field,render,after,pre){
        this.renders[field] = render;
        this.changeSort(field,after,pre);
    },
    changeSort(field,after,pre){
        let index = this.renderSort.indexOf(after);
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