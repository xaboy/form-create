import {deepExtend, isFunction, isDate, isArray,uniqueId} from "./util";
import creatorFactory from '../factory/creator';
import handlerFactory from '../factory/handler';
import renderFactory from '../factory/render';
import cascaderComponent from '../components/cascader';
import checkboxComponent from '../components/checkbox';
import colorPickerComponent from '../components/colorPicker';
import datePickerComponent from '../components/datePicker';
import inputComponent from '../components/input';
import inputNumberComponent from '../components/inputNumber';
import radioComponent from '../components/radio';
import selectComponent from '../components/select';
import switchComponent from '../components/switch';
import timePickerComponent from '../components/timePicker';
import hiddenComponent from '../components/hidden';
import uploadComponent from '../components/upload';
import rateComponent from '../components/rate';
import sliderComponent from '../components/slider'
import frameComponent from '../components/frame';
import treeComponent from '../components/tree';

const componentList = {
    hidden: hiddenComponent,
    input: inputComponent,
    radio: radioComponent,
    checkbox: checkboxComponent,
    switch: switchComponent,
    select: selectComponent,
    datepicker: datePickerComponent,
    timepicker: timePickerComponent,
    inputnumber: inputNumberComponent,
    colorpicker: colorPickerComponent,
    upload: uploadComponent,
    cascader: cascaderComponent,
    rate:rateComponent,
    slider:sliderComponent,
    frame:frameComponent,
    tree:treeComponent
};


const getComponent = function (vm, rule, createOptions) {
    let component,name = rule.type.toLowerCase();
    if(componentList[name] === undefined){
        component = {
            handler:handlerFactory({}),
            render:renderFactory({}),
            noValue: true
        };
    }else{
        component = componentList[name];
    }
    let $h = new component.handler(vm,rule);
    $h.render = new component.render(vm,$h,createOptions);
    $h.noValue = component.noValue;
    return $h;
};


const getConfig = function () {
    return {
        el:null,
        form:{
            inline:false,
            labelPosition:'right',
            labelWidth:125,
            showMessage:true,
            autocomplete:'off',
        },
        row:{
	        gutter:0,
	        type:undefined,
	        align:undefined,
	        justify:undefined,
	        className:undefined
        },
        upload:{
            beforeUpload:()=>{},
            onProgress:(event, file, fileList)=>{},
            onSuccess:(response, file, fileList)=>{
            },
            onError:(error, file, fileList)=>{},
            onPreview:(file)=>{},
            onRemove:(file, fileList)=>{},
            onFormatError:(file, fileList)=>{},
            onExceededSize:(file, fileList)=>{},
            handleIcon:'ios-eye-outline',
            allowRemove:true
        },
        onSubmit:(formData)=>{},
        submitBtn:{
            type:"primary",
            size:"large",
            shape:undefined,
            long:true,
            htmlType:"button",
            disabled:false,
            icon:"ios-upload",
            innerText:"提交",
            loading:false,
            show:true
        },
        resetBtn:{
            type:"ghost",
            size:"large",
            shape:undefined,
            long:true,
            htmlType:"button",
            disabled:false,
            icon:"refresh",
            innerText:"重置",
            loading:false,
            show:false
        },
        mounted:()=>{}
    };
};

const formCreateStyle = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;box-sizing: border-box;}' +
    ' .fc-files>.ivu-icon{transform: translateY(20%);}'+
    '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' +
    '.fc-upload .ivu-upload{display: inline-block;}' +
    '.fc-upload-btn{border: 1px dashed #dddee1;}' +
    '.fc-upload .fc-upload-cover{ display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); }' +
    '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' +
    '.fc-files:hover .fc-upload-cover{ display: block; }' +
    '.fc-upload .ivu-upload-list-file{ display: inline-block;float: left; }'+
    '.fc-upload .ivu-upload-list{ position: absolute;left: 0; }'+
    '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

const getGlobalApi = function (fComponent) {
    let vm = fComponent.vm;
    return {
        formData:()=>{
            let data = {};
            fComponent.fields().map((field)=>{
                field = field.toString();
                data[field] = fComponent.handlers[field].getValue();
            });
            return data;
        },
        getValue:(field)=>{
            field = field.toString();
            let handler = fComponent.handlers[field];
            if(handler === undefined)
                console.error(`${field} 字段不存在!`);
            else{
                return handler.getValue();
            }
        },
        changeField:(field,value)=>{
            field = field.toString();
            let handler = fComponent.handlers[field];
            if(handler === undefined)
                console.error(`${field} 字段不存在!`);
            else{
                if(isFunction(value))
                    value(vm.getTrueData(field),function change(changeValue) {
                        handler.setValue(changeValue);
                    });
                else
	                handler.setValue(value);
            }
        },
        removeField:(field)=>{
            fComponent.removeField(field.toString());
        },
        validate:(successFn,errorFn)=>{
            fComponent.getFormRef().validate((valid)=>{
                valid === true ? (successFn && successFn()) : (errorFn && errorFn());
            });
        },
        validateField:(field,callback)=>{
            fComponent.getFormRef().validateField(field.toString(),callback);
        },
        resetFields:function(){
            fComponent.getFormRef().resetFields();
	        vm.$nextTick(()=>{
		        fComponent.getFormRef().resetFields();
            })
        },
        destroy:()=>{
            vm.$el.remove();
            vm.$destroy();
        },
        fields:()=>fComponent.fields(),
        append:(rule,after)=>{
            fComponent.append(rule,after,false);
        },
        prepend:(rule,after)=>{
            fComponent.append(rule,after,true);
        },
        submit:function(successFn){
            this.validate(()=>{
                let formData = this.formData();
                if(isFunction(successFn))
                    successFn(formData);
                else
                    fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
            });
        },
        hidden(fields,hidden = true) {
            var vm = fComponent.vm;
            if(!fields)
                fields = this.fields();
            else if(!isArray(fields))
                fields = [fields];
            fields.forEach((field)=>{
                vm.$set(vm.trueData[field].rule.props,'hidden',!!hidden);
            })
        },
        visibility(fields,visibility = true) {
            var vm = fComponent.vm;
            if(!fields)
                fields = this.fields();
            else if(!isArray(fields))
                fields = [fields];
            fields.forEach((field)=>{
                vm.$set(vm.trueData[field].rule.props,'visibility',!!visibility);
            })
        },
        model(fields){
            let model = {};
            if(!fields)
                fields = this.fields();
            else if(!isArray(fields))
                fields = [fields];
            fields.forEach((field)=>{
                let handler = fComponent.handlers[field];
                if(!handler)
	                throw new Error(`${field}字段不存在`);
                handler.model = (v)=>{
	                model[field] = v;
                };
	            handler.model(handler.vm.getTrueData(field));
            });
            return model;
        },
        bind(fields){
            let bind = {},vm = fComponent.vm;
            if(!fields)
                fields = this.fields();
            else if(!isArray(fields))
                fields = [fields];
            fields.forEach((field)=>{
                bind[field] = vm.trueData[field].value;
                Object.defineProperty(bind,field,{
                    get:()=>{
                        return vm.trueData[field].value;
                    },
                    set:(value)=>{
                        vm.$set(vm.trueData[field],'value',value);
                    },
                    enumerable:true,
                    configurable:true
                })
            });
            return bind;
        },
        submitStatus:(_props = {})=>{
            let props = deepExtend(Object.create(null),_props);
            vm.changeButtonProps(props);
        },
        resetStatus:(_props = {})=>{
            let props = deepExtend(Object.create(null),_props);
            vm.changeResetProps(props);
        },
        btn:{
            loading:(loading = true)=>{
                vm.changeButtonProps({loading:loading});
            },
            finish:function(){
                this.loading(false);
            },
            disabled:(disabled=true)=>{
                vm.changeButtonProps({disabled:disabled});
            }
        },
        resetBtn:{
            loading:(loading = true)=>{
                vm.changeResetProps({loading:loading});
            },
            finish:function(){
                this.loading(false);
            },
            disabled:(disabled=true)=>{
                vm.changeResetProps({disabled:disabled});
            }
        },
        closeModal:()=>{
            vm.$Modal.remove();
        },
        set:(node,field,value)=>{
            vm.$set(node,field,value);
        }
    };
};

const timeStampToDate =(timeStamp)=>{
    if(isDate(timeStamp))
        return timeStamp;
    else{
        let date = new Date(timeStamp);
        return date.toString() === 'Invalid Date' ? timeStamp : date;
    }
};

const getMaker = function () {
    let maker = {};
    Object.keys(componentList).forEach((name)=>{
        maker[name] = creatorFactory(name);
    });
    maker.hidden = (function () {
        let make = creatorFactory('hidden');
        return make.bind(make,'');
    }());
    maker.create = function (type,field='mp' + uniqueId()) {
        let make = creatorFactory(type,['props','event','validate','slot']);
        return make('',field);
    };
    maker.number = maker.inputnumber;
    maker.time = maker.timepicker;
    maker.date = maker.datepicker;
    maker.color = maker.colorpicker;
    return maker;
};

const componentCommon = {
    data:()=>{
        return {
            cptData:{},
            buttonProps:{},
            resetProps:{},
            trueData:{},
            jsonData:{},
            $f:{},
        }
    },
    methods:{
        changeFormData(field,value){
            this.$set(this.cptData,field,value);
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
            return this.cptData[field];
        },
        removeFormData(field){
            this.$delete(this.cptData,field);
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
            this.$set(this.cptData,field,'');
            this.$set(this.trueData,field,{});
        }
    }
};

const _init = function(){
    if(!Object.assign){
        Object.assign = function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
    }
}

export {
    getComponent,getConfig,formCreateStyle,getGlobalApi,timeStampToDate,getMaker,componentCommon,_init
}
