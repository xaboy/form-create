/**
 * 通过表单类型获取和处理value
 * 设计模式:亨元模式,策略模式
 **/

import {isArray, isDate} from "./util";

/**
 * 处理器构造器
 * @param handle
 * @param getValue
 * @returns {f}
 */
const handlerFactory = function (handle,getValue) {
  let f = function (rule) {
      this.rule = {
          field: rule.field,
          type: rule.type,
          title: rule.title || '',
          options: rule.options || [],
          props: rule.props || {},
          validate:rule.validate === undefined ? [] : (
              isArray(rule.validate) ? rule.validate : [rule.validate]
          ),
          value:rule.value,
          original:rule
      };
      this.rule.parseValue = this.handle();
  };
  f.prototype = {
      handle,getValue,
      getRule(){
          return this.rule;
      }
  };
  return f;
};

/**
 * 默认处理器
 */
const baseComputed = handlerFactory(function () {
    return this.rule.value;
},function () {
    return this.rule.parseValue;
});

/**
 * 单选框/多选框处理器
 */
const checkedComputed = handlerFactory(function () {
    let parseValue ;
    if(isArray(this.rule.value)){
        parseValue = [];
        this.rule.value.forEach((val)=>{
            this.rule.options.forEach((option)=>{
                option.value === val && (parseValue.push(option.label));
            });
        });
    }else{
        this.rule.options.forEach((option)=>{
            option.value === this.rule.value && (parseValue = option.label);
        });
    }
    return parseValue;
},function () {
    let parseValue ;
    if(isArray(this.rule.parseValue)){
        parseValue = [];
        this.rule.parseValue.forEach((value)=>{
            this.rule.options.forEach((option)=>{
                option.label === value && (parseValue.push(option.value));
            });
        });
    }else{
        this.rule.options.forEach((option)=>{
            option.label === this.rule.parseValue && (parseValue = option.value);
        });
    }
    return parseValue;
});

/**
 * 选择器处理器
 */
const selectedComputed = handlerFactory(function () {
   if(this.rule.props && this.rule.props.multiple === true && !isArray(this.rule.value))
       return [this.rule.value];
   else
       return this.rule.value;
},function () {
    return this.rule.parseValue;
});

/**
 * 时间选择器/日期选择器处理器
 */
const dateComputed = handlerFactory(function () {
    let parseValue = this.rule.value;
    if( ['daterange','datetimerange','timerange'].indexOf(this.rule.props.type) !== -1){
        isArray(parseValue) || (parseValue = ['','']);
        return parseValue.map((time)=>time === '' ? '' : this.timeStampToDate(time));
    }else{
        return parseValue === '' ? '' : this.timeStampToDate(parseValue);
    }
},function () {
    let value = this.rule.parseValue;
    return Array.isArray(value)
        ? value.map(date => date === '' ? '' : this.dateToTimeStamp(date))
        : value === '' ? '' : this.dateToTimeStamp(value);
});

dateComputed.prototype.timeStampToDate = function (timeStamp){
    return isDate(timeStamp) ? timeStamp : new Date(parseInt(timeStamp));
};
dateComputed.prototype.dateToTimeStamp = function(date){
    let timeStamp = Date.parse(date);
    return Number.isNaN(timeStamp) ? '' : timeStamp;
};

/**
 * 数字输入框处理器
 */
const inputNumberComputed = handlerFactory(function () {
   return parseFloat(this.rule.value);
},function () {
    return this.rule.parseValue;
});

/**
 * 文件上传处理器
 */
const uploadComputed = handlerFactory(function () {
    return isArray(this.rule.value) ? this.rule.value : (
        !this.rule.value ? [] : [this.rule.value]
    );
},function () {
    return this.rule.parseValue;
});

const switchComputed = handlerFactory(function () {
    if(this.rule.slot === undefined) this.rule.slot = {};
    return this.rule.value;
},function () {
    return this.rule.parseValue;
});

const inputType = (function () {
    let typeList = {
        hidden:(rule)=>new baseComputed(rule),
        input:(rule)=>new baseComputed(rule),
        radio:(rule)=>new checkedComputed(rule),
        checkbox:(rule)=>new checkedComputed(rule),
        switch:(rule)=>new switchComputed(rule),
        select:(rule)=>new selectedComputed(rule),
        datepicker:(rule)=>new dateComputed(rule),
        timepicker:(rule)=>new dateComputed(rule),
        inputnumber:(rule)=>new inputNumberComputed(rule),
        colorpicker:(rule)=>new baseComputed(rule),
        upload:(rule)=>new uploadComputed(rule),
    };

    return function (rule) {
        if(typeList[rule.type] === undefined)
            console.error(`${rule.type} 表单类型不存在`);
        else
            return typeList[rule.type](rule);
    }
})();

export default inputType;