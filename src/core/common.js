import {deepExtend, isFunction, isDate, toString, errMsg, $del, isUndef, $set, isPlainObject} from "./util";
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

export function getGlobalApi(fComponent) {
    let vm = fComponent.vm;

    function tidyFields(fields) {
        if (!fields)
            fields = vm._formField();
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
        resetFields: function () {
            let handlers = fComponent.handlers;
            vm._formField().forEach(key => {
                handlers[key].reset();
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
            tidyFields(fields).forEach((field) => {
                const handler = fComponent.handlers[field];
                if (!handler)
                    return;
                handler.render.sync();
                vm.$set(vm._trueData(field).rule.props, 'disabled', !!disabled);
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

export function timeStampToDate(timeStamp) {
    if (isDate(timeStamp))
        return timeStamp;
    else {
        let date = new Date(timeStamp);
        return date.toString() === 'Invalid Date' ? timeStamp : date;
    }
}

export const componentCommon = {
    data: () => {
        return {
            rules: {},
            components: {},
            cptData: {},
            buttonProps: {},
            resetProps: {},
            trueData: {},
            jsonData: {},
            $f: {},
            isShow: true,
            watchs: [],
            unique: 1
        }
    },
    methods: {
        _formField() {
            return Object.keys(this.trueData);
        },
        _changeFormData(field, value) {
            if (Object.keys(this.cptData).indexOf(field) !== -1)
                this.$set(this.cptData, field, value);
        },
        _changeValue(field, value) {
            this.$set(this.trueData[field], 'value', value);
        },
        _value(field) {
            return this.trueData[field] === undefined ? undefined : this.trueData[field].value;
        },
        _trueData(field) {
            return this.trueData[field];
        },
        _formData(field) {
            return this.cptData[field];
        },
        _removeField(field) {
            $del(this.cptData, field);
            $del(this.trueData, field);
            $del(this.jsonData, field);

            if (this.components[field] !== undefined)
                $del(this.components, field);

        },
        _buttonProps(props) {
            this.$set(this, 'buttonProps', deepExtend(this.buttonProps, props));
        },
        _resetProps(props) {
            this.$set(this, 'resetProps', deepExtend(this.resetProps, props));
        },
        __init() {
            const type = this._fComponent._type;
            this[type].forEach((rule, index) => {
                let unWatch = this.$watch(`${type}.${index}.value`, n => {
                    if (this.trueData[rule.field] === undefined) return unWatch();
                    this._changeValue(rule.field, n);
                });
                this.watchs.push(unWatch);
            });

        },
        _unWatch() {
            this.watchs.forEach(unWatch => unWatch());
            this.watchs = [];
        },
        _refresh() {
            this.unique += 1;
        },
        _sync() {
            this.unique += 1;
            this._fComponent.fRender.cacheUnique = this.unique;
        },
        _change(field, json) {
            if (this.jsonData[field] !== json) {
                this.jsonData[field] = json;
                return true;
            }
            return false;
        }
    }
};
