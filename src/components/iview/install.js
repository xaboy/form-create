import hiddenComponent from "./hidden";
import inputComponent from "./input";
import radioComponent from "./radio";
import checkboxComponent from "./checkbox";
import switchComponent from "./switch";
import selectComponent from "./select";
import datePickerComponent from "./datePicker";
import timePickerComponent from "./timePicker";
import inputNumberComponent from "./inputNumber";
import colorPickerComponent from "./colorPicker";
import uploadComponent from "./upload";
import cascaderComponent from "./cascader";
import rateComponent from "./rate";
import sliderComponent from "./slider";
import frameComponent from "./frame";
import treeComponent from "./tree";
import autoCompleteComponent from "./autoComplete";
import formRender from './form';
import iview from 'iview';
import {
    $set,
    deepExtend,
    errMsg,
    isBool,
    isElement,
    isFunction,
    isPlainObject,
    isUndef,
    toString
} from "../../core/util";
import makerFactory from '../../factory/maker'

export const componentList = {
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
    rate: rateComponent,
    slider: sliderComponent,
    frame: frameComponent,
    tree: treeComponent,
    autocomplete: autoCompleteComponent,
};

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

export function getGlobalConfig() {
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
}

export function margeGlobal(_options) {
    if (isBool(_options.sumbitBtn))
        $set(_options, 'sumbitBtn', {show: _options.sumbitBtn});
    if (isBool(_options.resetBtn))
        $set(_options, 'resetBtn', {show: _options.resetBtn});
    let options = deepExtend(getGlobalConfig(), _options);

    $set(options, 'el', !options.el
        ? window.document.body
        : (isElement(options.el)
                ? options.el
                : document.querySelector(options.el)
        ));

    return options
}

export function getGlobalApi(fComponent) {
    let vm = fComponent.vm;

    function tidyFields(fields, all = false) {
        if (!fields)
            fields = all ? Object.keys(fComponent.handlers) : vm._formField();
        else if (!Array.isArray(fields))
            fields = [fields];
        return fields;
    }

    return {
        formData: () => {
            return vm._formField().reduce((initial, key) => {
                initial[key] = vm._value(key);
                return initial;
            }, {});
        },
        getValue: (field) => {
            field = toString(field);
            if (vm._formField(field) === undefined)
                throw new Error(`${field} 字段不存在!` + errMsg());
            else {
                return vm._value(field);
            }
        },
        setValue: function (field, value) {
            let formData = field;
            if (!isPlainObject(field))
                formData = {[field]: value};
            Object.keys(formData).forEach(key => {
                this.changeField(key, formData[key]);
            });
        },
        changeValue: function (field, value) {
            this.changeField(field, value);
        },
        changeField: (field, value) => {
            field = toString(field);
            let handler = fComponent.handlers[field];
            if (handler === undefined)
                return;

            if (isFunction(value))
                value(vm._trueData(field), (changeValue) => {
                    this.changeField(field, changeValue);
                });
            else {
                handler.setValue(value);
            }

        },
        removeField: (field) => {
            let handler = fComponent.handlers[field];
            if (!handler)
                return;
            let fields = handler.root.map(rule => rule.__field__), index = fields.indexOf(toString(field));
            if (index === -1)
                return;
            handler.root.splice(index, 1);
            vm._refresh();
        },
        validate: (successFn, errorFn) => {
            fComponent.getFormRef().validate((valid) => {
                valid === true ? (successFn && successFn()) : (errorFn && errorFn());
            });
        },
        validateField: (field, callback) => {
            if (fComponent.notField(field))
                return;
            fComponent.getFormRef().validateField(field, callback);
        },
        resetFields: function (fields) {
            let handlers = fComponent.handlers;
            tidyFields(fields, true).forEach(field => {
                let handler = handlers[field];
                if (!handler) return;

                if (!handler.noValue)
                    handler.reset();
                else
                    handler.$emit('reset-field', this);
            });
            this.refresh();

        },
        destroy: () => {
            vm.$el.parentNode.removeChild(vm.$el);
            vm.$destroy();
        },
        fields: () => vm._formField(),
        append: (rule, after) => {
            let fields = fComponent.fieldList, index = fields.indexOf(toString(after));
            if (isUndef(after)) {
                index = fields.length;
            } else if (index === -1)
                return;
            fComponent.rules.splice(index + 1, 0, rule);

        },
        prepend: (rule, after) => {
            let fields = fComponent.fieldList, index = fields.indexOf(toString(after));
            if (isUndef(after)) {
                index = 0;
            } else if (index === -1)
                return;
            else
                index--;
            fComponent.rules.splice(index + 1, 0, rule);

        },
        submit(successFn, failFn) {
            this.validate(() => {
                let formData = this.formData();
                if (isFunction(successFn))
                    successFn(formData, this);
                else
                    fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
            }, () => failFn && failFn());
        },
        hidden(fields, hidden = true) {
            tidyFields(fields).forEach((field) => {
                if (!fComponent.handlers[field])
                    return;
                vm.$set(vm._trueData(field).rule.props, 'hidden', !!hidden);
            })
        },
        visibility(fields, visibility = true) {
            tidyFields(fields).forEach((field) => {
                if (!fComponent.handlers[field])
                    return;
                vm.$set(vm._trueData(field).rule.props, 'visibility', !!visibility);
            })
        },
        disabled(fields, disabled = true) {
            disabled = !!disabled;
            tidyFields(fields, true).forEach((field) => {
                const handler = fComponent.handlers[field];
                if (!handler)
                    return;

                if (!handler.noValue)
                    vm.$set(vm._trueData(field).rule.props, 'disabled', disabled);
                else
                    handler.$emit('disabled', disabled, this);

                handler.render.sync();
            })
        },
        clearValidateState(fields) {
            tidyFields(fields).forEach(field => {
                const handler = fComponent.handlers[field];
                if (!handler)
                    return;

                handler.clearMsg();
            })
        },
        model(fields) {
            let model = {}, _fields = this.fields();
            tidyFields(fields).forEach((field) => {
                if (_fields.indexOf(field) === -1)
                    return console.error(`${field} 字段不存在` + errMsg());
                model[field] = vm._trueData(field);
            });
            return model;
        },
        component() {
            return {...vm.components};
        },
        bind(fields) {
            let bind = {}, properties = {}, _fields = this.fields();
            tidyFields(fields).forEach((field) => {
                if (_fields.indexOf(field) === -1)
                    return console.error(`${field} 字段不存在` + errMsg());

                const rule = vm._trueData(field);
                properties[field] = {
                    get() {
                        return rule.value;
                    },
                    set(value) {
                        vm.$set(rule, 'value', value);
                    },
                    enumerable: true,
                    configurable: true
                };
            });
            Object.defineProperties(bind, properties);
            return bind;
        },
        submitStatus: (props = {}) => {
            vm._buttonProps(props);
        },
        resetStatus: (props = {}) => {
            vm._resetProps(props);
        },
        btn: {
            loading: (loading = true) => {
                vm._buttonProps({loading: loading});
            },
            finish: function () {
                this.loading(false);
            },
            disabled: (disabled = true) => {
                vm._buttonProps({disabled: disabled});
            }
        },
        resetBtn: {
            loading: (loading = true) => {
                vm._resetProps({loading: loading});
            },
            finish: function () {
                this.loading(false);
            },
            disabled: (disabled = true) => {
                vm._resetProps({disabled: disabled});
            }
        },
        closeModal: () => {
            vm.$Modal.remove();
        },
        set: (node, field, value) => {
            vm.$set(node, field, value);
        },
        reload: (rules) => {
            return fComponent.reload(rules)
        },
        options: (options) => {
            deepExtend(fComponent.options, options);
            vm._sync();
        },
        onSuccess(fn) {
            this.onSubmit(fn);
        },
        onSubmit(fn) {
            this.options({onSubmit: fn});
        },
        sync: (field, callback) => {
            if (fComponent.handlers[field])
                fComponent.handlers[field].render.sync(callback);
        },
        refresh: () => {
            vm._refresh();
        },
        show: (isShow) => {
            vm.isShow = !!isShow;
        }
    };
}


export const style = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' +
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


export function install(FormCreate) {
    FormCreate.maker = makerFactory(componentList);
}

export default {

    componentList,
    formRender,
    style,
    margeGlobal,
    getGlobalApi,


    install
}
