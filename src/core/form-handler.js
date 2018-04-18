import {isArray, isDate} from "./util";
import {getRender} from "./form-render";

let handler = function (vm,{field,type,title = '',options=[],props={},validate = [],event = {},value = '',slot = {}}) {
    this.rule = {
        field, type, title, options, props,slot,value,
        validate: isArray(validate) ? validate : [validate],
        event: Object.keys(event).reduce(function (initial,eventName) {
            initial[`on-${eventName}`] = event[eventName];
            return initial;
        },{}),
    };
    this.vm = vm;
    this.verify();
    this.handle();
};

handler.prototype = {
    el(){
        if(!this._el)
            this._el = this.vm.$refs[this.rule.field];
        return this._el || {};
    },
    handle(){
        this.changeParseValue(this.rule.value);
    },
    verify(){

    },
    getField(){
        return this.rule.field;
    },
    getValidate(){
        return this.rule.validate;
    },
    getValue(){
        return this.parseValue;
    },
    changeValue(value){
        this.rule.value = value;
        this.handle();
    },
    getRule(){
        return this.rule;
    },
    getParseValue(){
        return this.parseValue
    },
    changeParseValue(parseValue,b = true){
        if(b === true)
            this.vm.changeFormData(this.rule.field,parseValue);
        this.parseValue = parseValue;
    }
};

/**
 * 构造器
 * @param prototypeExtend
 * @returns {$f}
 */
const handlerFactory = function (prototypeExtend = {}) {
    let $h = function (vm, rule) {
        handler.call(this,vm,rule);
    };
    $h.prototype = Object.create(handler.prototype);
    Object.assign($h.prototype, prototypeExtend);
    $h.prototype.constructor = $h;
    return $h;
};


/**
 * 默认处理器
 */
const baseHandler = handlerFactory();

/**
 * 单选框/多选框处理器
 */
const checkedHandler = handlerFactory({
    handle() {
        let parseValue;
        if (isArray(this.rule.value)) {
            parseValue = [];
            this.rule.value.forEach((val) => {
                this.rule.options.forEach((option) => {
                    option.value === val && (parseValue.push(option.label));
                });
            });
        } else {
            this.rule.options.forEach((option) => {
                option.value === this.rule.value && (parseValue = option.label);
            });
        }
        this.changeParseValue(parseValue);
    }, getValue() {
        let parseValue = '';
        if (isArray(this.parseValue)) {
            parseValue = [];
            this.parseValue.forEach((value) => {
                this.rule.options.forEach((option) => {
                    option.label === value && (parseValue.push(option.value));
                });
            });
            parseValue = this.rule.options.length === 1
                ? (parseValue[0] || '')
                : parseValue;
        } else {
            this.rule.options.forEach((option) => {
                option.label === this.parseValue && (parseValue = option.value);
            });
        }
        return parseValue;
    }
});

/**
 * 选择器处理器
 */
const selectedHandler = handlerFactory({
    handle() {
        let parseValue = ((this.rule.props && this.rule.props.multiple === true && !isArray(this.rule.value))
            ? [this.rule.value]
            : this.rule.value);
        this.changeParseValue(parseValue);
    }
});

/**
 * 时间选择器/日期选择器处理器
 */
const dateHandler = handlerFactory({
    verify(){
        this.rule.props.type = !this.rule.props.type
            ? this.rule.type === 'datepicker'
                ? 'date' : 'time'
            : this.rule.props.type;
    },
    handle() {
        let parseValue = this.rule.value;
        if (['daterange', 'datetimerange', 'timerange'].indexOf(this.rule.props.type) !== -1) {
            isArray(parseValue) || (parseValue = ['', '']);
            parseValue = parseValue.map((time) => !time ? '' : this.timeStampToDate(time));
        } else {
            isArray(parseValue) && (parseValue = parseValue[0]);
            parseValue = !parseValue ? '' : this.timeStampToDate(parseValue);
        }
        this.changeParseValue(parseValue);
    }, getValue() {
        return this.el().publicStringValue;
    }, timeStampToDate(timeStamp) {
        if(isDate(timeStamp))
            return timeStamp;
        else{
            let date = new Date(timeStamp);
            return date.toString() === 'Invalid Date' ? timeStamp : date;
        }
    }, dateToTimeStamp(date) {
        let timeStamp = Date.parse(date);
        return Number.isNaN(timeStamp) ? date : timeStamp;
    }
});

/**
 * 数字输入框处理器
 */
const inputNumberHandler = handlerFactory({
    handle() {
        let parseValue = parseFloat(this.rule.value);
        if (Number.isNaN(parseValue)) parseValue = '';
        this.changeParseValue(parseValue);
    }
});

/**
 * 文件上传处理器
 */
const uploadHandler = handlerFactory({
    verify(){
        this.rule.props.defaultFileList = [];
        this.rule.props.showUploadList = false;
        this.rule.props.uploadType = !this.rule.props.uploadType
            ? 'file'
            : this.rule.props.uploadType;
    },
    handle() {
        let files = isArray(this.rule.value) ? this.rule.value : (
            !this.rule.value ? [] : [this.rule.value]
        );
        this.changeParseValue({
            files,
            status:'normal'
        });
    },
    push(filePath){
        this.parseValue.files.push(filePath);
        this.changeParseValue(this.parseValue);
    },
    getValue(){
        return this.rule.props.maxLength <= 1
            ? (this.parseValue.files[0] || '')
            : this.parseValue.files;
    }
});

/**
 * 开关处理器
 */
const switchHandler = handlerFactory({
    verify(){
        if (this.rule.slot === undefined) this.rule.slot = {};
    }
});

const cascaderHandler = handlerFactory({
    verify(){
        if(!this.rule.props.data) this.rule.props.data = [];
        if(!isArray(this.rule.value)) this.rule.value = [];
    },
    getValue(){
        return this.el().value;
    }
});

const handlerList = {
    hidden: baseHandler,
    input: baseHandler,
    radio: checkedHandler,
    checkbox: checkedHandler,
    switch: switchHandler,
    select: selectedHandler,
    datepicker: dateHandler,
    timepicker: dateHandler,
    inputnumber: inputNumberHandler,
    colorpicker: baseHandler,
    upload: uploadHandler,
    cascader:cascaderHandler,
};

const formHandler = function (vm, rule, createOptions) {
    let handler = handlerList[rule.type],render = getRender(rule.type);
    if (handler === undefined || render === undefined)
        throw new Error(`${rule.type} 表单类型不存在`);
    else{
        let $h = new handler(vm, rule);
        $h.render = new render(vm, $h, createOptions);
        return $h;
    }
};

export default formHandler;