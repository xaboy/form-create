import {deepExtend, isFunction, isDate} from "./util";
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
    frame:frameComponent
};


const getComponent = function (componentName) {
    if(componentList[componentName] === undefined)
        throw new Error(`${componentName} 表单类型不存在`);
    return componentList[componentName];
};


const getConfig = function (Vue) {
    let vm = new Vue;
    return {
        el:null,
        form:{
            inline:false,
            labelPosition:'right',
            labelWidth:125,
            showMessage:true,
            autocomplete:'off',
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
            onHandle:(src)=>{
                vm.$Modal.info({
                    title:"预览",
                    render:(h)=>{
                        return h('img',{attrs:{src},style:"width: 100%"});
                    }
                });
            },
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
            loading:false
        }
    };
};

const createHandler = function (vm, rule, createOptions) {
    let component = getComponent(rule.type),
        $h = new component.handler(vm,rule);
    $h.render = new component.render(vm,$h,createOptions);
    return $h;
};

const formCreateStyle = '.form-create{padding:25px;} .fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;box-sizing: border-box;}' +
    ' .fc-files>.ivu-icon{transform: translateY(20%);}'+
    '.fc-files img{width:100%;height:100%;display:block;}' +
    '.fc-upload .ivu-upload{display: inline-block;}' +
    '.fc-upload-btn i{font-size: 20px;}' +
    '.fc-upload .fc-upload-cover{ display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); }' +
    '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' +
    '.fc-files:hover .fc-upload-cover{ display: block; }' +
    '.fc-upload .ivu-upload-list-file{ display: inline-block;float: left; }'+
    '.fc-upload .ivu-upload-list{ position: absolute;left: 0; }'+
    '.fc-upload-btn{ width: 58px;height: 58px;line-height: 58px;display:inline-block;background: #fff;border: 1px dashed #dddee1;border-radius: 4px;text-align: center;cursor: pointer;position: relative;overflow: hidden;transition: border-color .2s ease; } .fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

const getGlobalApi = function (fComponent) {
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
                    value(handler.getValue(),function change(changeValue) {
                        handler.changeValue(changeValue);
                    });
                else
                    handler.changeValue(value);
            }
        },
        removeField:(field)=>{
            field = field.toString();
            fComponent.removeField(field);
        },
        validate:(successFn,errorFn)=>{
            fComponent.getFormRef().validate((valid)=>{
                valid === true ? (successFn && successFn()) : (errorFn && errorFn());
            });
        },
        validateField:(field,callback)=>{
            field = field.toString();
            fComponent.getFormRef().validateField(field,callback);
        },
        resetFields:()=>{
            fComponent.getFormRef().resetFields();
        },
        destroy:()=>{
            fComponent.vm.$el.remove();
            fComponent.vm.$destroy();
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
        submitStatus:(_props = {})=>{
            let props = deepExtend(Object.create(null),_props);
            fComponent.vm.changeButtonProps(props);
        },
        // vm:fComponent,
        btn:{
            loading:()=>{
                fComponent.vm.changeButtonProps({loading:true});
            },
            finish:()=>{
                fComponent.vm.changeButtonProps({loading:false});
            }
        },
        closeModal:()=>{
            fComponent.vm.$Modal.remove();
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
    let maker =  Object.keys(componentList).reduce((initial,name)=>{
        initial[name] = componentList[name].make;
        return initial;
    },{});
    maker.number = componentList.inputnumber.make;
    maker.time = componentList.timepicker.make;
    maker.date = componentList.datepicker.make;
    maker.color = componentList.colorpicker.make;
    return maker;
};

export {
    getComponent,getConfig,formCreateStyle,createHandler,getGlobalApi,timeStampToDate,getMaker
}
