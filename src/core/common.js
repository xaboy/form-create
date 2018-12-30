import {deepExtend, isFunction, isDate, toString, extend, debounce, errMsg} from "./util";
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
    imgUpIcon: 'camera',
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
    let name = toString(rule.type).toLowerCase(), component = componentList[name] === undefined
        ? getUdfComponent()
        : componentList[name];

    let $h = new component.handler(vm, rule);
    $h.render = new component.render(vm, $h, createOptions);
    $h.noValue = component.noValue;
    return $h
};

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
        },
        mounted: () => {
        },
        onReload: () => {
        },
        onSubmit: (formData) => {
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
    '.fc-upload .ivu-upload-list-file{ display: inline-block;float: left; }' +
    '.fc-upload .ivu-upload-list{ position: absolute;left: 0; }' +
    '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

export function toDefSlot(slot, $h, rule) {
    return [slot && isFunction(slot) ? slot.call(rule, $h) : slot]
}

export function getGlobalApi(fComponent) {
    let vm = fComponent.vm;
    return {
        formData: () => {
            return Object.keys(vm.trueData).reduce((initial, key) => {
                initial[key] = vm.trueData[key].value;
                return initial;
            }, {});
        },
        getValue: (field) => {
            field = toString(field);
            let handler = fComponent.handlers[field];
            if (handler === undefined)
                throw new Error(`${field} 字段不存在!` + errMsg());
            else {
                return handler.getValue();
            }
        },
        changeField: (field, value) => {
            field = toString(field);
            let handler = fComponent.handlers[field];
            if (handler === undefined)
                throw new Error(`${field} 字段不存在!` + errMsg());
            else {
                if (isFunction(value))
                    value(vm.getTrueData(field), (changeValue) => {
                        this.changeField(field, changeValue);
                    });
                else {
                    handler.setTrueValue(value);
                    handler.render.sync();
                }

            }
        },
        removeField: (field) => {
            fComponent.removeField(toString(field));
            vm.sync();
        },
        validate: (successFn, errorFn) => {
            fComponent.getFormRef().validate((valid) => {
                valid === true ? (successFn && successFn()) : (errorFn && errorFn());
            });
        },
        validateField: (field, callback) => {
            if (fComponent.notField(field))
                throw new Error(`${field}字段不存在` + errMsg());
            fComponent.getFormRef().validateField(field, callback);
        },
        resetFields: function () {
            let handlers = fComponent.handlers;
            Object.keys(vm.trueData).forEach(key => {
                vm.$set(vm.trueData[key], 'value', handlers[key].defaultValue);
            });

        },
        destroy: () => {
            vm.$el.parentNode.removeChild(vm.$el);
            vm.$destroy();
        },
        fields: () => fComponent.fields(),
        append: (rule, after) => {
            fComponent.append(rule, after, false);
        },
        prepend: (rule, after) => {
            fComponent.append(rule, after, true);
        },
        submit(successFn, failFn) {
            this.validate(() => {
                let formData = this.formData();
                if (isFunction(successFn))
                    successFn(formData);
                else
                    fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
            }, () => failFn && failFn());
        },
        hidden(fields, hidden = true) {
            var vm = fComponent.vm;
            if (!fields)
                fields = this.fields();
            else if (!Array.isArray(fields))
                fields = [fields];
            fields.forEach((field) => {
                vm.$set(vm.trueData[field].rule.props, 'hidden', !!hidden);
            })
        },
        visibility(fields, visibility = true) {
            var vm = fComponent.vm;
            if (!fields)
                fields = this.fields();
            else if (!Array.isArray(fields))
                fields = [fields];
            fields.forEach((field) => {
                vm.$set(vm.trueData[field].rule.props, 'visibility', !!visibility);
            })
        },
        model(fields) {
            let model = {};
            if (!fields)
                fields = this.fields();
            else if (!Array.isArray(fields))
                fields = [fields];
            fields.forEach((field) => {
                let handler = fComponent.handlers[field];
                if (!handler)
                    throw new Error(`${field}字段不存在` + errMsg());
                model[field] = handler.vm.getTrueData(field);
            });
            return model;
        },
        bind(fields) {
            let bind = {}, properties = {}, vm = fComponent.vm;
            if (!fields)
                fields = this.fields();
            else if (!Array.isArray(fields))
                fields = [fields];
            fields.forEach((field) => {
                const rule = vm.trueData[field];
                properties[field] = {
                    get() {
                        return rule.value;
                    },
                    set(value) {
                        rule.value = value;
                    },
                    enumerable: true,
                    configurable: true
                };
            });
            Object.defineProperties(bind, properties);
            return bind;
        },
        submitStatus: (props = {}) => {
            vm.changeButtonProps(props);
        },
        resetStatus: (props = {}) => {
            vm.changeResetProps(props);
        },
        btn: {
            loading: (loading = true) => {
                vm.changeButtonProps({loading: loading});
            },
            finish: function () {
                this.loading(false);
            },
            disabled: (disabled = true) => {
                vm.changeButtonProps({disabled: disabled});
            }
        },
        resetBtn: {
            loading: (loading = true) => {
                vm.changeResetProps({loading: loading});
            },
            finish: function () {
                this.loading(false);
            },
            disabled: (disabled = true) => {
                vm.changeResetProps({disabled: disabled});
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
            vm.sync();
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
            else
                throw new Error(`${field}字段不存在` + errMsg());
        },
        refresh: () => {
            vm.refresh();
        },
        // vm: fComponent,
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
            cptData: {},
            buttonProps: {},
            resetProps: {},
            trueData: {},
            jsonData: {},
            $f: {},
            isShow: true,
            watchs: [],
            unique: 1,
            other: {}
        }
    },
    methods: {
        changeFormData(field, value) {
            if (Object.keys(this.cptData).indexOf(field) !== -1)
                this.$set(this.cptData, field, value);
        },
        changeTrueData(field, value) {
            this.$set(this.trueData[field], 'value', value);
        },
        getTrueDataValue(field) {
            return this.trueData[field] === undefined ? undefined : this.trueData[field].value;
        },
        getTrueData(field) {
            return this.trueData[field];
        },
        getFormData(field) {
            return this.cptData[field];
        },
        removeFormData(field) {
            delete this.cptData[field];
            delete this.trueData[field];
            delete this.jsonData[field];
            // this.$delete(this.cptData, field);
            // this.$delete(this.trueData, field);
            // this.$delete(this.jsonData, field);
        },
        changeButtonProps(props) {
            this.$set(this, 'buttonProps', deepExtend(this.buttonProps, props));
        },
        changeResetProps(props) {
            this.$set(this, 'resetProps', deepExtend(this.resetProps, props));
        },
        setField(field) {
            this.$set(this.cptData, field, '');
            this.$set(this.trueData, field, {});
        },
        init() {
            const type = this.fComponent._type;
            this[type].forEach((rule, index) => {
                let unWatch = this.$watch(`${type}.${index}.value`, n => {
                    if (this.trueData[rule.field] === undefined) return unWatch();
                    this.$set(this.trueData[rule.field], 'value', n);
                });
                this.watchs.push(unWatch);
            });

        },
        unWatch() {
            this.watchs.forEach(unWatch => unWatch());
            this.watchs = [];
        },
        refresh() {
            this.unique += 1;
        },
        sync() {
            // if (!this._sync)
            //     this._sync = debounce(() => {
            //         this.$nextTick(() => {
            //             this.fComponent.fRender.cacheUnique = this.unique + 1;
            //             this.unique += 1;
            //         });
            //     }, 50);
            // this._sync();

            this.fComponent.fRender.cacheUnique = this.unique + 1;
            this.unique += 1;
        }
    }
};
