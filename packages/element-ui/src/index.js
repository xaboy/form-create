import hidden from "./hidden";
import input from "./input";
import radio from "./radio";
import checkbox from "./checkbox";
import iswitch from "./switch";
import select from "./select";
import datepicker from "./datePicker";
import timepicker from "./timePicker";
import inputnumber from "./inputNumber";
import colorpicker from "./colorPicker";
import upload from "./upload";
import cascader from "./cascader";
import rate from "./rate";
import slider from "./slider";
import frame from "./frame";
import tree from "./tree";
import autocomplete from "./autoComplete";
import formRender from './form';
import makerFactory from '../../factory/maker'
import VNode from "../../factory/vNode";
import getConfig from './config';
import getGlobalApi from './fApi';

export const componentList = {
    hidden,
    input,
    radio,
    checkbox,
    switch: iswitch,
    select,
    datepicker,
    timepicker,
    inputnumber,
    colorpicker,
    upload,
    cascader,
    rate,
    slider,
    frame,
    tree,
    autocomplete,
};


export const style = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' +
    ' .fc-files>.ivu-icon{vertical-align: middle;}' +
    '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' +
    '.fc-upload .ivu-upload{display: inline-block;}' +
    '.fc-upload-btn{border: 1px dashed #c0ccda;cursor: pointer;}' +
    '.fc-upload-btn>ivu-icon{vertical-align:sub;}' +
    '.fc-upload .fc-upload-cover{opacity: 0; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); transition: opacity .3s;}' +
    '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' +
    '.fc-files:hover .fc-upload-cover{opacity: 1; }' +
    '.fc-hide-btn .ivu-upload .ivu-upload{display:none;}' +
    '.fc-upload .ivu-upload-list{margin-top: 0;}' +
    '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

export const nodes = {
    modal: 'Modal',
    progress: 'i-progress',
    button: 'i-button',
    icon: 'Icon',
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
    autoComplete: 'AutoComplete',
};

export function install(FormCreate) {
    FormCreate.maker = makerFactory(componentList);
    VNode.use(nodes);
}

export default {

    componentList,
    formRender,
    style,
    getGlobalApi,
    getConfig,


    install
}
