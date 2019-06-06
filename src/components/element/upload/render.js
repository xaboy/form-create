import Render from "../../../factory/render";
import {extend, isUndef} from "../../../core/util";
import {defaultOnHandle} from "../modal";


export default class render extends Render {
    init() {
        let handler = this.handler;
        this.uploadOptions = extend({...this.options.upload}, this.handler.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        this.propsData = this.vData.props(this.uploadOptions).class('fc-upload-con', true)
            .props('onSuccess', (...args) => this.onSuccess(...args))
            // .props('onRemove', (...args) => this.onRemove(...args))
            .ref(handler.refName).key(`fip${handler.unique}`).get();
    }

    // onRemove(...args) {
    //     this.handler.changeParseValue(this.handler.el.uploadFiles);
    //     this.uploadOptions.onRemove && this.uploadOptions.onRemove(...args);
    //     this.sync();
    // }

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
        this.handler.changeParseValue(this.handler.el.uploadFiles);
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
        if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'el-icon-view';
        let value = this.vm._formData(field),
            render = this.uploadOptions.showFileList ? [] : [...value.map((file, index) => {
                if (!isUndef(file.percentage) && file.showProgress !== false && file.status !== 'success') {
                    return this.makeProgress(file, `uppg${index}${unique}`);
                } else if (file.status === undefined || file.status === 'success') {
                    return this.makeUploadView(file.url, `upview${index}${unique}`, index)
                }
            })];
        const isShow = (!this.uploadOptions.limit || this.uploadOptions.limit > value.length);
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
        return this.vNode.make('div', {key: `div1${key}`, class: ['fc-files']}, () => {
            let container = [];
            if (this.handler.rule.props.uploadType === 'image') {
                container.push(this.vNode.make('img', {key: `img${key}`, attrs: {src}}));
            } else {
                container.push(this.vNode.icon({key: `file${key}`, 'class': ['el-icon-tickets']}))
            }
            if (this.issetIcon)
                container.push(this.makeIcons(src, key, index));
            return container;
        });
    }

    makeIcons(src, key, index) {
        return this.vNode.make('div', {key: `div2${key}`, class: ['fc-upload-cover']}, () => {
            let icon = [];
            if (!!this.uploadOptions.handleIcon)
                icon.push(this.makeHandleIcon(src, key, index));
            if (this.uploadOptions.allowRemove === true)
                icon.push(this.makeRemoveIcon(src, key, index));
            return icon;
        });
    }

    makeProgress(file, unique) {
        return this.vNode.make('div', {key: `div3${unique}`, class: ['fc-files']}, [
            this.vNode.progress({
                key: `upp${unique}`,
                props: {percentage: file.percentage, type: 'circle', width: 54},
            })
        ]);
    }

    makeUploadBtn(unique, isShow) {
        return this.vNode.upload(this.propsData,
            isShow === true ? [
                this.vNode.make('div', {key: `div5${unique}`, class: ['fc-upload-btn']}, [
                    this.vNode.icon({
                        key: `upi${unique}`,
                        'class': ['el-icon-upload2']
                    })
                ])
            ] : []);
    }

    makeRemoveIcon(src, key, index) {
        return this.vNode.icon({
            key: `upri${key}${index}`, 'class': ['el-icon-delete'], on: {
                'click': () => {
                    if (this.uploadOptions.disabled === true) return;
                    let fileList = this.handler.el.uploadFiles, file = fileList[index];
                    this.handler.el.handleRemove(file);

                    // fileList.splice(index, 1);
                    // this.onRemove(file, fileList);
                }
            }
        });
    }

    makeHandleIcon(src, key, index) {
        return this.vNode.icon({
            key: `uphi${key}${index}`,
            'class': [this.uploadOptions.handleIcon === true ? 'el-icon-view' : this.uploadOptions.handleIcon],
            on: {
                'click': () => {
                    if (this.uploadOptions.disabled === true) return;
                    this.onHandle(src);
                }
            }
        });
    }
}
