import {BaseParser} from '@form-create/core';
import {$set, extend, isUndef, toString, uniqueId} from '@form-create/utils';
import {defaultOnHandle} from '../../modal';
import {iviewConfig} from '../../config';


export function getFileName(pic) {
    return toString(pic).split('/').pop()
}

export function parseValue(value) {
    return Array.isArray(value)
        ? value
        : ((!value ? [] : [value])
        );
}

// TODO 商城时没有进度条
export default class Parser extends BaseParser {
    init() {
        let props = this.rule.props;
        $set(props, 'defaultFileList', []);
        if (isUndef(props.showUploadList)) $set(props, 'showUploadList', false);
        if (isUndef(props.uploadType)) $set(props, 'uploadType', 'file');

        if (props.maxLength === undefined) $set(props, 'maxLength', 0);
        if (props.action === undefined) $set(props, 'action', '');
        if (props.uploadType === 'file' && isUndef(props.handleIcon)) $set(props, 'handleIcon', false);

        if (!props.modalTitle) $set(props, 'modalTitle', '预览');

        if (props.maxLength === 1)
            $set(this.rule, 'value', parseValue(this.rule.value));
        this.parseValue = [];
    }

    toFormValue(value) {
        let files = parseValue(value);

        const _value = files.map((file) => this.push(file));
        $set(this.rule.props, 'defaultFileList', _value);
        return _value;
    }

    toValue(parseValue) {
        if (isUndef(parseValue)) return [];
        let files = parseValue.map((file) => file.url).filter((file) => file !== undefined);
        return this.rule.props.maxLength === 1
            ? (files[0] || '')
            : files;
    }

    // watchValue(n) {
    //     this.parseValue = n;
    //     this.el.fileList = n;
    //     this.h.refresh();
    // }


    push(file) {
        return ({
            url: file,
            name: getFileName(file)
        });
    }

    mounted(vm) {
        this.vm = vm;
        $set(this.rule.props, 'defaultFileList', this.parseValue);
        this.changeParseValue();
    }

    changeParseValue() {
        this.parseValue = this.el.fileList;
        $set(this.rule, 'parseValue', this.el.fileList);
        this.vm._changeFormData(this.field, this.el.fileList);
        this.vm._changeValue(this.field, this.toValue(this.el.fileList));
    }


    initProps() {
        let handler = this;
        this.uploadOptions = extend({...this.options.upload}, this.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        this.propsData = this.vData.props(this.uploadOptions)
            .props('onSuccess', (...args) => this.onSuccess(...args))
            .props('onRemove', (...args) => this.onRemove(...args))
            .props('beforeUpload', (...args) => this.beforeUpload(...args))
            .ref(handler.refName).key(`fip${handler.unique}`).get();
    }

    onRemove(...args) {
        // this.parseValue = this.el.fileList;
        // this.vm._changeFormData(this.field, [...this.el.fileList]);
        // this.h.setValue(this, this.toValue(this.el.fileList));
        // $set(this.rule, 'parseValue', this.parseValue);
        this.changeParseValue();
        // this.changeParseValue(this.el.fileList);

        this.uploadOptions.onRemove && this.uploadOptions.onRemove(...args);
    }

    beforeUpload(...args) {
        // this.changeParseValue();
        this.parseValue = this.el.fileList;
        this.vm._changeFormData(this.field, [...this.el.fileList]);
        this.uploadOptions.beforeUpload && this.uploadOptions.beforeUpload(...args);
        this.h.refresh();
    }

    onSuccess(response, file, fileList) {
        let url = this.uploadOptions.onSuccess.call(null, response, file, fileList);
        if (!isUndef(url)) {
            file.url = url;
            file.showProgress = false;

        } else {
            let index = fileList.indexOf(file);
            if (index !== -1)
                fileList.splice(index, 1);
        }
        this.changeParseValue();
    }

    onHandle(src) {
        let fn = this.uploadOptions.onHandle;
        if (fn)
            return fn(src);
        else
            defaultOnHandle(src, this.uploadOptions.modalTitle);
    }

    render(children) {
        this.options = this.r.options;
        let {unique} = this;
        this.initProps();
        if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'ios-eye-outline';
        let value = this.parseValue,//this.el ? this.el.fileList : this.vm._formData(field),
            vn = this.uploadOptions.showUploadList ? [] : value.map((file, index) => {
                if (file.showProgress) {
                    return this.makeProgress(file, `upp${index}${unique}${file.uid}`);
                } else if (file.status === undefined || file.status === 'finished') {
                    return this.makeUploadView(file, `upv${index}${unique}${file.uid}`)
                }
            });
        const isShow = (!this.uploadOptions.maxLength || this.uploadOptions.maxLength > value.length);
        vn.push(this.makeUploadBtn(isShow));
        vn.push(...children);
        return this.vNode.make('div', {
            key: `${unique}d4`,
            class: {'fc-upload': true, 'fc-hide-btn': !isShow}
        }, vn);
    }

    makeUploadView(file, key) {
        return this.vNode.make('div', {key: `${key}d1`, class: {'fc-files': true}}, () => {
            let container = [];
            if (this.rule.props.uploadType === 'image') {
                container.push(this.vNode.make('img', {key: `${key}i`, attrs: {src: file.url}}));
            } else {
                container.push(this.vNode.icon({key: `${key}f`, props: {type: iviewConfig.fileIcon, size: 40}}))
            }
            if (this.issetIcon)
                container.push(this.makeIcons(file, key));
            return container;
        });
    }

    makeIcons(file, key) {
        return this.vNode.make('div', {key: `${key}d2`, class: {'fc-upload-cover': true}}, () => {
            let icon = [];
            if (this.uploadOptions.handleIcon)
                icon.push(this.makeHandleIcon(file, key));
            if (this.uploadOptions.allowRemove === true)
                icon.push(this.makeRemoveIcon(file, key));
            return icon;
        });
    }

    makeProgress(file, unique) {
        return this.vNode.make('div', {key: `${unique}d3`, class: {'fc-files': true}}, [
            this.vNode.progress({
                key: `upp${unique}`,
                props: {percent: file.percentage, hideInfo: true},
                style: {width: '90%'}
            })
        ]);
    }

    makeUploadBtn(isShow) {
        const unique = this.unique;
        return this.vNode.upload(this.propsData,
            isShow === true ? [
                this.vNode.make('div', {key: `${unique}d5`, class: {'fc-upload-btn': true}}, [
                    this.vNode.icon({
                        key: `upi${unique}`,
                        props: {
                            type: this.rule.props.uploadType === 'file' ? 'ios-cloud-upload-outline' : iviewConfig.imgUpIcon,
                            size: 20
                        }
                    })
                ])
            ] : []);
    }

    makeRemoveIcon(file, key) {
        return this.vNode.icon({
            key: `${key}r`, props: {type: 'ios-trash-outline'}, nativeOn: {
                'click': () => {
                    if (this.isDisabled()) return;
                    this.el.handleRemove(file);
                }
            }
        });
    }

    makeHandleIcon(file, key) {
        return this.vNode.icon({
            key: `${key}h`, props: {type: toString(this.uploadOptions.handleIcon)}, nativeOn: {
                'click': () => {
                    if (this.isDisabled()) return;
                    this.onHandle(file.url);
                }
            }
        });
    }

    isDisabled() {
        return this.uploadOptions.disabled === true;
    }

}

