import {throwIfMissing,isFunction,isString} from './util'

const cvm = function(createElement = throwIfMissing('缺少参数:createElement')){
    this.$h = createElement
};

let _instance = null;

let vm = null;

cvm.instance = (createElement)=>{
    if(false === _instance instanceof cvm)
        _instance = new cvm(createElement);
    return _instance;
};

cvm.setVm = ($vm)=>{
    vm = $vm;
};
cvm.clearVm = ()=>{
    vm = null;
};

cvm.prototype = {
    make(nodeName,data,VNodeFn){
        if(isString(data)) data = {domProps:{innerHTML:data}};
        let Node = this.$h(nodeName,data,this.getVNode(VNodeFn));
        if(vm !== null)
            Node.context = vm;
        return Node;
    },
    getVNode(VNode){
        return isFunction(VNode) ? VNode() : VNode;
    }
};

const nodes = {modal:'Modal',progress:'i-progress',button:'i-button',icon:'Icon',span:'span',slider:'Slider',rate:'Rate',upload:'Upload',cascader:'Cascader',colorPicker:'Color-Picker',timePicker:'Time-Picker',datePicker:'Date-Picker','switch':'i-switch',option:'i-option',select:'i-select',checkbox:'Checkbox',checkboxGroup:'Checkbox-Group',radio:'Radio',radioGroup:'Radio-Group',inputNumber:'Input-Number',input:'i-input',formItem:'Form-Item',form:'i-form'};

Object.keys(nodes).forEach((k)=>{
	cvm.prototype[k] = function (data,VNodeFn){
		return this.make(nodes[k],data,VNodeFn);
	}
});



export default cvm
