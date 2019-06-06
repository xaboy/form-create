import Render from "../../../factory/render";
import {extend, isUndef, toString} from "../../../core/util";
import {iviewConfig} from "../config";
import {defaultOnHandle} from "../modal";

export default class render extends Render {
    init() {
        let handler = this.handler;
        this.uploadOptions = extend({...this.options.upload}, handler.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        this.propsData = this.vData.props(this.uploadOptions)
            .props('onSuccess', (...args) => this.onSuccess(...args))
            .props('onRemove', (...args) => this.onRemove(...args))
            .props('beforeUpload', (...args) => this.beforeUpload(...args))
            .ref(handler.refName).key(`fip${handler.unique}`).get();
    }

    onRemove(...args) {
        this.handler.changeParseValue(this.handler.el.fileList);
        this.uploadOptions.onRemove && this.uploadOptions.onRemove(...args);
        this.sync();
    }

    beforeUpload(...args) {
        this.handler.changeParseValue(this.handler.el.fileList);
        this.uploadOptions.beforeUpload && this.uploadOptions.beforeUpload(...args);
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
        this.handler.changeParseValue(fileList);
    }

    onHandle(src) {
        let fn = this.uploadOptions.onHandle;
        if (fn)
            return fn(src);
        else
            defaultOnHandle(src, this.uploadOptions.modalTitle);
    }

    parse() {
        let {unique, field} = this.handler;
        this.init();
        if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'ios-eye-outline';
        let value = this.vm._formData(field),
            render = this.uploadOptions.showUploadList ? [] : [...value.map((file, index) => {
                if (file.showProgress) {
                    return this.makeProgress(file, `uppg${index}${unique}`);
                } else if (file.status === undefined || file.status === 'finished') {
                    return this.makeUploadView(file.url, `upview${index}${unique}`, index)
                }
            })];
        const isShow = (!this.uploadOptions.maxLength || this.uploadOptions.maxLength > value.length);
        render.push(this.makeUploadBtn(unique, isShow));
        return [this.vNode.make('div', {
            key: `div4${unique}`,
            class: {'fc-upload': true, 'fc-hide-btn': !isShow}
        }, render)];
    }

    cacheParse(form) {
        this.cache = null;
        return super.cacheParse(form);
    }

    makeUploadView(src, key, index) {
        return this.vNode.make('div', {key: `div1${key}`, class: {'fc-files': true}}, () => {
            let container = [];
            if (this.handler.rule.props.uploadType === 'image') {
                container.push(this.vNode.make('img', {key: `img${key}`, attrs: {src}}));
            } else {
                container.push(this.vNode.icon({key: `file${key}`, props: {type: iviewConfig.fileIcon, size: 40}}))
            }
            if (this.issetIcon)
                container.push(this.makeIcons(src, key, index));
            return container;
        });
    }

    makeIcons(src, key, index) {
        return this.vNode.make('div', {key: `div2${key}`, class: {'fc-upload-cover': true}}, () => {
            let icon = [];
            if (!!this.uploadOptions.handleIcon)
                icon.push(this.makeHandleIcon(src, key, index));
            if (this.uploadOptions.allowRemove === true)
                icon.push(this.makeRemoveIcon(src, key, index));
            return icon;
        });
    }

    makeProgress(file, unique) {
        return this.vNode.make('div', {key: `div3${unique}`, class: {'fc-files': true}}, [
            this.vNode.progress({
                key: `upp${unique}`,
                props: {percent: file.percentage, hideInfo: true},
                style: {width: '90%'}
            })
        ]);
    }

    makeUploadBtn(unique, isShow) {
        return this.vNode.upload(this.propsData,
            isShow === true ? [
                this.vNode.make('div', {key: `div5${unique}`, class: {'fc-upload-btn': true}}, [
                    this.vNode.icon({
                        key: `upi${unique}`,
                        props: {
                            type: this.handler.rule.props.uploadType === 'file' ? 'ios-cloud-upload-outline' : iviewConfig.imgUpIcon,
                            size: 20
                        }
                    })
                ])
            ] : []);
    }

    makeRemoveIcon(src, key, index) {
        return this.vNode.icon({
            key: `upri${key}${index}`, props: {type: 'ios-trash-outline'}, nativeOn: {
                'click': () => {
                    if (this.uploadOptions.disabled === true) return;
                    let fileList = this.handler.el.fileList, file = fileList[index];
                    fileList.splice(index, 1);
                    this.onRemove(file, fileList);
                }
            }
        });
    }

    makeHandleIcon(src, key, index) {
        return this.vNode.icon({
            key: `uphi${key}${index}`, props: {type: toString(this.uploadOptions.handleIcon)}, nativeOn: {
                'click': () => {
                    if (this.uploadOptions.disabled === true) return;
                    this.onHandle(src);
                }
            }
        });
    }
}

