import {throwIfMissing,isFunction,isString} from './util'

const cvm = function(createElement = throwIfMissing('缺少参数:createElement')){
    this.$h = createElement
};

cvm.init = (createElement) => new cvm(createElement);

cvm.prototype = {
    form(data,VNodeFn){
        return this.make('i-form',data,VNodeFn);
    },
    formItem(data,VNodeFn){
        return this.make('form-Item',data,VNodeFn);
    },
    input(data,VNodeFn){
        return this.make('i-input',data,VNodeFn);
    },
    inputNumber(data,VNodeFn){
        return this.make('Input-Number',data,VNodeFn);
    },
    radioGroup(data,VNodeFn){
        return this.make('Radio-Group',data,VNodeFn);
    },
    radio(data,VNodeFn){
        return this.make('Radio',data,VNodeFn);
    },
    checkboxGroup(data,VNodeFn){
        return this.make('Checkbox-Group',data,VNodeFn);
    },
    checkbox(data,VNodeFn){
        return this.make('Checkbox',data,VNodeFn);
    },
    select(data,VNodeFn){
        return this.make('i-select',data,VNodeFn);
    },
    option(data,VNodeFn){
        return this.make('i-option',data,VNodeFn);
    },
    switch(data,VNodeFn){
        return this.make('i-switch',data,VNodeFn);
    },
    datePicker(data,VNodeFn){
        return this.make('Date-Picker',data,VNodeFn);
    },
    timePicker(data,VNodeFn){
        return this.make('Time-Picker',data,VNodeFn);
    },
    colorPicker(data,VNodeFn){
        return this.make('Color-Picker',data,VNodeFn);
    },
    upload(data,VNodeFn){
        return this.make('Upload',data,VNodeFn);
    },
    span(data,VNodeFn){
        return this.make('span',data,VNodeFn);
    },
    icon(data,VNodeFn){
        return this.make('Icon',data,VNodeFn);
    },
    button(data,VNodeFn){
        return this.make('i-button',data,VNodeFn);
    },
    modal(data,VNodeFn){
        return this.make('Modal',data,VNodeFn);
    },
    make(nodeName,data,VNodeFn){
        if(isString(data)) data = {domProps:{innerHTML:data}};
        return this.$h(nodeName,data,this.getVNode(VNodeFn));
    },
    getVNode(VNode){
        return isFunction(VNode) ? VNode() : VNode;
    }
};


export default cvm
