import formRender from './form';
import hidden from '../iview/hidden';
import checkbox from './checkbox';
import radio from './radio';
import input from '../iview/input';
import autocomplete from '../iview/autoComplete';
import inputnumber from '../iview/inputNumber';
import select from "../iview/select";
import cascader from "../iview/cascader";
import slider from "../iview/slider";
import timepicker from "./timePicker";
import datepicker from "./datePicker";
import rate from "../iview/rate";
import colorpicker from "../iview/colorPicker";
import tree from "./tree";
import upload from "./upload";
import frame from "./frame";
import iswitch from "../iview/switch";
import makerFactory from '../../factory/maker'
import VNode from "../../factory/vNode";
import getConfig from './config'
import getGlobalApi from './fApi'

export const componentList = {
    hidden, checkbox, radio, input, autocomplete, inputnumber, select, cascader, slider, timepicker, datepicker,
    rate, colorpicker, tree, upload, frame, switch: iswitch
};


export const style = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' +
    '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' +
    '.fc-upload .el-upload{display: block;}' +
    '.fc-upload-btn{border: 1px dashed #c0ccda;cursor: pointer;}' + '.fc-upload .fc-upload-con{display:inline-block;}' +
    '.fc-upload .fc-upload-cover{opacity: 0; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); transition: opacity .3s;}' +
    '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' +
    '.fc-files:hover .fc-upload-cover{opacity: 1; }' +
    '.form-create .el-form-item .el-rate{margin-top:10px;}' +
    '.form-create .el-form-item .el-tree{margin-top:7px;}' +
    '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

export const nodes = {
    modal: 'el-dialog',
    progress: 'el-progress',
    button: 'el-button',
    icon: 'i',
    slider: 'el-slider',
    rate: 'el-rate',
    upload: 'el-upload',
    cascader: 'el-cascader',
    colorPicker: 'el-color-picker',
    timePicker: 'el-time-picker',
    datePicker: 'el-date-picker',
    'switch': 'el-switch',
    option: 'el-option',
    select: 'el-select',
    checkbox: 'el-checkbox',
    checkboxGroup: 'el-checkbox-Group',
    checkboxBtn: 'el-checkbox-button',
    radio: 'el-radio',
    radioGroup: 'el-radio-group',
    radioBtn: 'el-radio-button',
    inputNumber: 'el-input-number',
    input: 'el-input',
    formItem: 'el-form-Item',
    form: 'el-form',
    col: 'el-col',
    row: 'el-row',
    tree: 'el-tree',
    autoComplete: 'el-autocomplete',
};

export function install(FormCreate) {
    FormCreate.maker = makerFactory(componentList);
    VNode.use(nodes);
}

export default {

    componentList,
    formRender,
    style,
    getConfig,
    getGlobalApi,

    install
}
