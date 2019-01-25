import {isFunction, isDate, toString} from "./util";
import Handler from '../factory/handler';
import Render from '../factory/render';
import componentList from './componentList';
import iview from 'iview';

export const iview2 = {
    _v: 2,
    resetBtnType: 'ghost',
    resetBtnIcon: 'refresh',
    submitBtnIcon: 'ios-upload',
    fileIcon: 'document-text',
    fileUpIcon: 'folder',
    imgUpIcon: 'image',
};

export const iview3 = {
    _v: 3,
    resetBtnType: 'default',
    resetBtnIcon: 'md-refresh',
    submitBtnIcon: 'ios-share',
    fileIcon: 'md-document',
    fileUpIcon: 'ios-folder-open',
    imgUpIcon: 'md-images',
};

export const iviewConfig = (function () {
    if (typeof iview === 'undefined') return iview2;
    return (iview.version && iview.version.split('.')[0] == 3) ? iview3 : iview2;
}());

export function getConfig() {
    return {
        el: null,
        iframeHelper: false,
        switchMaker: true,
        form: {
            inline: false,
            labelPosition: 'right',
            labelWidth: 125,
            showMessage: true,
            autocomplete: 'off',
            size: undefined,
        },
        row: {
            gutter: 0,
            type: undefined,
            align: undefined,
            justify: undefined,
            className: undefined
        },
        upload: {
            beforeUpload: () => {
            },
            onProgress: (event, file, fileList) => {
            },
            onSuccess: (response, file, fileList) => {
            },
            onError: (error, file, fileList) => {
            },
            onPreview: (file) => {
            },
            onRemove: (file, fileList) => {
            },
            onFormatError: (file, fileList) => {
            },
            onExceededSize: (file, fileList) => {
            },
            handleIcon: 'ios-eye-outline',
            allowRemove: true
        },
        submitBtn: {
            type: "primary",
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: iviewConfig.submitBtnIcon,
            innerText: "提交",
            loading: false,
            show: true,
            col: undefined,
            click: undefined,
        },
        resetBtn: {
            type: iviewConfig.resetBtnType,
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: iviewConfig.resetBtnIcon,
            innerText: "重置",
            loading: false,
            show: false,
            col: undefined,
            click: undefined,
        },
        mounted: ($f) => {
        },
        onReload: ($f) => {
        },
        onSubmit: (formData, $f) => {
        },
    };
};

export const formCreateStyle = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' +
    ' .fc-files>.ivu-icon{vertical-align: middle;}' +
    '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' +
    '.fc-upload .ivu-upload{display: inline-block;}' +
    '.fc-upload-btn{border: 1px dashed #c0ccda;}' +
    '.fc-upload-btn>ivu-icon{vertical-align:sub;}' +
    '.fc-upload .fc-upload-cover{opacity: 0; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); transition: opacity .3s;}' +
    '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' +
    '.fc-files:hover .fc-upload-cover{opacity: 1; }' +
    '.fc-hide-btn .ivu-upload .ivu-upload{display:none;}' +
    '.fc-upload .ivu-upload-list{margin-top: 0;}' +
    '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

export function toDefSlot(slot, $h, rule) {
    return [slot && isFunction(slot) ? slot.call(rule, $h) : slot]
}


export function timeStampToDate(timeStamp) {
    if (isDate(timeStamp))
        return timeStamp;
    else {
        let date = new Date(timeStamp);
        return date.toString() === 'Invalid Date' ? timeStamp : date;
    }
}

export function getComponent(vm, rule, createOptions) {
    let name = toString(rule.type).toLowerCase(), component = isComponent(name)
        ? componentList[name] : getUdfComponent();

    return new component.handler(vm, rule, component.render, createOptions, component.noValue);
}

export function isComponent(type) {
    return componentList[type] !== undefined;
}

export function getUdfComponent() {
    return {
        handler: Handler,
        render: Render,
        noValue: true
    }
}
