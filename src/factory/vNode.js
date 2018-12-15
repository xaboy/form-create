import {isFunction, isString} from '../core/util'

export function parseVData(data) {
    if (isString(data))
        data = {domProps: {innerHTML: data}};
    else if (data && isFunction(data.get))
        data = data.get();

    return data
}

export function getVNode(VNode) {
    return isFunction(VNode) ? VNode() : (VNode || [])
}

export default class VNode {

    constructor(vm) {
        this.setVm(vm);
    }

    setVm(vm) {
        this.vm = vm;
        this.$h = vm.$createElement;
    }

    make(nodeName, data, VNodeFn) {
        if (isString(data)) data = {domProps: {innerHTML: data}};
        let Node = this.$h(nodeName, parseVData(data), getVNode(VNodeFn));
        Node.context = this.vm;

        return Node
    }
}

const nodes = {
    modal: 'Modal',
    progress: 'i-progress',
    button: 'i-button',
    icon: 'Icon',
    span: 'span',
    slider: 'Slider',
    rate: 'Rate',
    upload: 'Upload',
    cascader: 'Cascader',
    colorPicker: 'Color-Picker',
    timePicker: 'Time-Picker',
    datePicker: 'Date-Picker',
    'switch': 'i-switch',
    option: 'i-option',
    select: 'i-select',
    checkbox: 'Checkbox',
    checkboxGroup: 'Checkbox-Group',
    radio: 'Radio',
    radioGroup: 'Radio-Group',
    inputNumber: 'Input-Number',
    input: 'i-input',
    formItem: 'Form-Item',
    form: 'i-form',
    col: 'i-col',
    row: 'row',
    tree: 'Tree',
    AutoComplete: 'AutoComplete',
};

Object.keys(nodes).forEach((k) => {
    VNode.prototype[k] = function (data, VNodeFn) {
        return this.make(nodes[k], data, VNodeFn);
    }
});
