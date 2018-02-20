import props from './props'
import cvm from "./cvm";
import {isDate, isFunction} from "./util";

const formBuilderRender = function ({vm,rules,formData,validate},opt = {}) {
    this.vm = vm;
    this.rules = rules;
    this.cvm = cvm.init(vm.$createElement);
    this.form = {
        model:formData,
        rules:validate
    };
    this.options = opt;
};

const timeStampToDate = function (timeStamp){
    return isDate(timeStamp) ? timeStamp : new Date(parseInt(timeStamp));
};

const dateToTimeStamp = function(date){
    let timeStamp = Date.parse(date);
    return Number.isNaN(timeStamp) ? '' : timeStamp;
};

const _datePickerType = ['daterange','datetimerange','timerange'];


formBuilderRender.parseData = (formData,rules) =>{
        let parseData = {};
        Object.keys(formData).map((field)=>{
            let value = formData[field],rule = rules[field],parseValue;
            if(rule !== undefined){
                if(['datepicker','timepicker'].indexOf(rule.type) !== -1){
                    parseValue = Array.isArray(value)
                        ? value.map(date => date === '' ? '' : dateToTimeStamp(date))
                        : value === '' ? '' : dateToTimeStamp(value);
                } else if(['checkbox','radio'].indexOf(rule.type) !== -1){
                    if(Array.isArray(value)){
                        parseValue = [];
                        value.map((value)=>{
                            rule.options.map((v,k)=>{
                                v.props.label === value && (parseValue.push(v.props.value));
                            });
                        });
                    }else{
                        rule.options.map((v,k)=>{
                            v.props.label === value && (parseValue = v.props.value);
                        });
                    }
                }
                else
                    parseValue = value;
            } else
                parseValue = value;


            parseData[field] = parseValue;
        });
        return parseData;
};

formBuilderRender.tidyDateInput = function (rule,value) {
    if( _datePickerType.indexOf(rule.props.type) !== -1){
        Array.isArray(value) || (rule.value = ['','']);
        return value.map((time)=>time === '' ? '' : timeStampToDate(time));
    }else{
        return value === '' ? '' : timeStampToDate(value);
    }
};
formBuilderRender.tidyCheckedInput = function (rule,value) {
    let parseValue ;
    if(Array.isArray(rule.value)){
        parseValue = [];
        value.map((val)=>{
            rule.options.map((option)=>{
                option.props.value === val && (parseValue.push(option.props.label));
            });
        });
    }else{
        rule.options.map((option,k)=>{
            option.props.value === value && (parseValue = option.props.label);
        });
    }
    return parseValue;
};

formBuilderRender.prototype = {
    parse(){
        return this.makeForm(()=>{
            return Object.keys(this.rules).map((field)=>{
                let rule = this.rules[field];
                return this.makeFormItem(rule.field,rule.title,()=>[this[rule.type].call(this,rule)]);
            });
        });
    },
    makeForm(VNodeFn){
        let options = this.options,t = props.init().props({model:this.form.model,rules:this.form.rules}).ref(options.form.ref)
            .attrs({method:options.form.method,action:options.form.action})
            .nativeOn('submit',(e)=>{
                e.preventDefault();
                options.form.onSubmit(e);
            });
        return this.cvm.form(t.get(),VNodeFn);
    },
    makeFormItem(prop,label,VNodeFn){
        let options = this.options,t = props.init()
            .props({prop,label,labelWidth:options.formProps.labelWidth,labelFor:prop,showMessage:options.formProps.showMessage});
        return this.cvm.formItem(t.get(),VNodeFn);
    },
    makeInput(rule){
        let t = this.inputProps(rule);
        return this.cvm.input(t.get());
    },
    makeInputNumber(rule){
        let t = this.inputProps(rule);
        return this.cvm.inputNumber(t.get());
    },
    makeRadio(rule){
        let t = this.inputProps(rule);
        return this.cvm.radioGroup(t.get(),()=>rule.options.map((option)=>this.cvm.radio({props:option.props})));
    },
    makeCheckBox(rule){
        let t = this.inputProps(rule);
        return this.cvm.checkboxGroup(t.get(),()=>rule.options.map((option)=>this.cvm.checkbox({props:option.props})));
    },
    makeSelect(rule){
        let t = this.inputProps(rule);
        return this.cvm.select(t.get(),rule.options.map((option)=>this.cvm.option({props:option.props})));
    },
    makeSwitch(rule){
        let t = this.inputProps(rule).scopedSlots({
            open:()=>rule.slot.open,
            close:()=>rule.slot.close
        });
        return this.cvm.switch(t.get());
    },
    makeDatePicker(rule){
        rule.props.type || (rule.props.type = 'date');
        let t = this.inputProps(rule);
        return this.cvm.datePicker(t.get());
    },
    makeTimePicker(rule){
        rule.props.type || (rule.props.type = 'time');
        let t = this.inputProps(rule);
        return this.cvm.timePicker(t.get());
    },
    makeColorPicker(rule){
        let t = this.inputProps(rule);
        return this.cvm.colorPicker(t.get());
    },
    makeUpload(rule){
        let options = this.options,data = props.init().props(rule.props).props({
            'value' : this.getInputValue(rule.field),
            'before-upload': options.upload.beforeUpload,
            'on-progress': options.upload.onProgress,
            'on-success': (response, file, fileList)=>{
                options.upload.onSuccess(this.getInputValue(rule.field).push,response, file, fileList);
            },
            'on-preview' : options.upload.onPreview,
            'on-remove' : options.upload.onRemove,
            'on-format-error' : options.upload.onFormatError,
            'on-exceeded-size' : options.upload.onExceededSize,
            'on-error' : options.upload.onError
        }).get();
        return (()=>{
            let render = [],value = this.getInputValue(rule.field);
            return this.cvm.make('div',{class:{'form-builder-upload':true}},()=>{
                render.push((()=>{
                    return value.map((img)=>{
                        return this.cvm.make('div',{class:{'form-builder-upload-list':true}},((img)=>{
                            let container = [this.cvm.make('img',{attrs:{src:img}})];
                            if(options.upload.handleRemove !== false || options.upload.handleView !== false)
                                container.push(this.cvm.make('div',{class:{'form-upload-list-cover':true}},((img)=>{
                                    let icon = [];
                                    if(options.upload.handleView !== false){
                                        icon.push(this.cvm.icon({props:{type:'ios-eye-outline'},nativeOn:{'click':()=>{
                                            options.upload.onView(img);
                                            options.upload.handleView === true || !isFunction(options.upload.handleView)
                                                ? this.vm.$Modal.info({
                                                    render:(h)=>h('img',{attrs:{src:img,style:"width: 100%;max-height: 300px;margin-top: 10px;"}}),
                                                    title:"查看图片",
                                                    closable:true
                                                })
                                                : options.upload.handleView(img);
                                        }}}))
                                    }
                                    if(options.upload.handleRemove !== false){
                                        icon.push(this.cvm.icon({props:{type:'ios-trash-outline'},nativeOn:{'click':()=>{
                                            let fileList = this.getInputValue(rule.field);
                                            fileList.splice(fileList.indexOf(img),1);
                                            options.upload.onRemove(img,fileList);
                                        }}}));
                                    }
                                    return icon;
                                })(img)));
                            return container;
                        })(img));
                    });
                })());
                if(!rule.props['max-length'] || rule.props['max-length'] > this.getInputValue(rule.field).length)
                    render.push((()=>{
                        return this.cvm.upload(data,()=>{
                            return [this.cvm.make('div',{class:{'form-builder-upload-btn':true}},[this.cvm.icon({props:{type:"camera", size:20}})])]
                        })
                    })());
                return render;
            });
        })();
    },
    inputProps(rule){
        return props.init().props(rule.props).props('model',`formData.${rule.field}`).props('value',this.getInputValue(rule.field))
            .on('input',(value)=>this.changeInputValue(rule.field,value));
    },
    changeInputValue(field,value){
        this.vm.$emit('input',value);
        this.vm.$set(this.vm.formData,field,value);
    },
    getInputValue(field)
    {
        return this.vm.formData[field];
    },
    text(rule){
        return this.makeInput(rule);
    },
    radio(rule){
        return this.makeRadio(rule);
    },
    checkbox(rule){
        return this.makeCheckBox(rule);
    },
    select(rule){
        return this.makeSelect(rule);
    },
    switch(rule){
        return this.makeSwitch(rule);
    },
    inputnumber(rule){
        return this.makeInputNumber(rule);
    },
    datepicker(rule){
        return this.makeDatePicker(rule);
    },
    timepicker(rule){
        return this.makeTimePicker(rule);
    },
    colorpicker(rule){
        return this.makeColorPicker(rule);
    },
    upload(rule){
        return this.makeUpload(rule);
    }
};

export default formBuilderRender

export {timeStampToDate,dateToTimeStamp}