import formBuilderRender from "./form-builder-render";
import {assign, isArray, throwIfMissing} from "./util";

const formBuilderName = 'form-builder';

const formBuilderStyleElId = 'form-builder-style';

const formBuilder = function(rules){
    if(!this instanceof formBuilder)
        throwIfMissing('formBuilder is a constructor and should be called with the `new` keyword');
    this.init(rules);
};

formBuilder.default = {
    options : {
        formProps:{
            labelWidth:125,
            labelPosition:'right',
            showMessage:true,
            autocomplete:'off',
            inline:false
        },
        form:{
            ref:'formBuilder',
            method:'POST',
            action:'',
            onSubmit:(e)=>{}
        },
        upload:{
            //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
            beforeUpload:()=>{},
            //文件上传时的钩子，返回字段为 event, file, fileList
            onProgress:(event, file, fileList)=>{},
            //文件上传成功时的钩子，返回字段为 response, file, fileList
            onSuccess:(response, file, fileList)=>{},
            //文件上传失败时的钩子，返回字段为 error, file, fileList
            onError:(error, file, fileList)=>{},
            //点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
            onPreview:(file)=>{},
            //文件列表移除文件时的钩子，返回字段为 file, fileList
            onRemove:(file, fileList)=>{},
            //文件格式验证失败时的钩子，返回字段为 file, fileList
            onFormatError:(file, fileList)=>{},
            //文件超出指定大小限制时的钩子，返回字段为 file, fileList
            onExceededSize:(file, fileList)=>{},
            onView:(file)=>{},
            handleView:true,
            handleRemove:true
        }
    }
};

const formBuilderStyle = '.form-builder-upload .form-builder-upload-list{display: inline-block;width: 60px;height: 60px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;}' +
    '.form-builder-upload .form-builder-upload-list img{width:100%;height:100%;display:block;}' +
    '.form-builder-upload .ivu-upload{display: inline-block;}' +
    '.form-builder-upload .ivu-upload .form-builder-upload-btn{ width: 58px;height: 58px;line-height: 58px;}' +
    '.form-builder-upload .ivu-upload .form-builder-upload-btn i{font-size: 20px;}' +
    '.form-builder-upload  .form-upload-list-cover{ display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); }' +
    '.form-builder-upload  .form-upload-list-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' +
    '.form-builder-upload .form-builder-upload-list:hover .form-upload-list-cover{ display: block; }';


formBuilder.formBuilderSetStyle = function () {
    if (document.getElementById(formBuilderStyleElId) !== null) return;
    let style = document.createElement('style');
    style.id = formBuilderStyleElId;
    style.innerText = formBuilderStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
};

formBuilder.install = function(Vue){
    let that = this;
    Vue.prototype.$formBuilder = function(rules,el = undefined){
        formBuilder.formBuilderSetStyle();
        let fBuilder = new that(rules),$fb = Vue.extend(fBuilder.component())
            ,$vm = new $fb().$mount(),dom = el === undefined ? document.body : document.querySelector(el);
        dom.appendChild($vm.$el);
        return $vm._api();
    };
};

const _datePicker = ['datepicker', 'timepicker'];

const _checkedType = ['checkbox','radio'];

formBuilder.prototype = {
    init(rules){
        this._data = {
            original : Array.isArray(rules) ? rules : [],
            rules:{},
            formData:{},
            validate:{},
            vm:null
        };
        this.options = assign({},formBuilder.default.options);
        this._data.original.filter((rule)=>rule.field !== undefined).map((rule)=> {
            rule.props === undefined && (rule.props = {});
            rule.type = rule.type === undefined ? 'text' : rule.type.toLowerCase();
            let parseValue;
            if(rule.type !== 'hidden'){
                this._data.rules[rule.field] = {
                    field: rule.field,
                    type: rule.type,
                    title: rule.title,
                    options: rule.options || [],
                    props: rule.props || {}
                };
                this._data.validate[rule.field] = rule.validate === undefined
                    ? []
                    : (isArray(rule.validate)
                        ? rule.validate
                        : [rule.validate]);
                if(rule.type === 'switch')
                    this._data.rules[rule.field]['slot'] = rule.slot === undefined  ? {} : rule.slot;
                else if (_datePicker.indexOf(rule.type) !== -1){
                    parseValue = formBuilderRender.tidyDateInput(rule,rule.value);
                }else if(_checkedType.indexOf(rule.type) !== -1){
                    parseValue = formBuilderRender.tidyCheckedInput(rule,rule.value);
                }else if(rule.type === 'inputnumber') {
                    parseValue = parseFloat(rule.value);
                }else if(rule.type === 'upload'){
                    parseValue = isArray(rule.value) ? rule.value : [rule.value];
                }else
                    parseValue = rule.value.toString();
            }else
                parseValue = rule.value;
            this._data.formData[rule.field] = parseValue;
        });
    },
    field(){
        return Object.keys(this._data.formData);
    },
    rules(){
        return this._data.rules
    },
    formData(){
        return this._data.formData;
    },
    validate(){
        return this._data.validate;
    },
    _bindWatch(){
        this.field().map((field)=>{
            this.vm.$watch(`formData.${field}`,(n,o)=>{
            //TODO watch
            });
        });
    },
    component(){
        let formData = this.formData(),_this = this;
        return {
            name:formBuilderName,
            data:()=>{
                return {
                    formData:formData
                }
            },
            render:function(createElement){
                let render =  _this.render();
                return render.parse();
            },
            beforeCreate:function(){
                _this.vm = this;
            },
            methods:{
                parseData:function(){
                    return formBuilderRender.parseData(this.formData,_this.rules());
                },
                _api:function () {
                    return {
                        formData : this.parseData,
                        change(field,value){
                            let rule = _this._data.rules[field];
                            if(rule !== undefined) {
                                if (_datePicker.indexOf(rule.type) !== -1) {
                                    value = formBuilderRender.tidyDateInput(rule, value);
                                } else if (_checkedType.indexOf(rule.type) !== -1) {
                                    value = formBuilderRender.tidyCheckedInput(rule, value);
                                } else if (rule.type === 'inputnumber') {
                                    value = parseFloat(value);
                                }else if(rule.type === 'upload'){
                                    value = isArray(value) ? value : [value];
                                }else
                                    value = value.toString();
                            }
                            _this.vm.$set(_this.vm.formData,field,value);
                        },
                        validate(successFn,errorFn){
                            _this.vm.$refs.formBuilder.validate((valid)=>{
                                valid === true ? successFn() : errorFn();
                            });
                        },
                        validateField(field,errorFn){
                            _this.vm.$refs.formBuilder.validateField(field,errorFn);
                        },
                        resetField(){
                            _this.vm.$refs.formBuilder.resetFields();
                        }
                    };
                }
            },
            mounted:function(){
                // _this._bindWatch();
            }
        }
    },
    render(){
        return  new formBuilderRender({
            vm : this.vm,
            rules : this.rules(),
            formData : this.formData(),
            validate:this.validate()
        },this.options);
    }
};

export default formBuilder;