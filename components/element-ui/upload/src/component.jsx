import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';
import './style.css';

function parseFile(file, i) {
    if (typeof file === 'object') {
        return file;
    }
    return {
        url: file,
        is_string: true,
        name: getFileName(file),
        uid: i
    };
}

function parseUpload(file) {
    return {...file, file, value: file};
}

function getFileName(file) {
    return ('' + file).split('/').pop()
}

const NAME = 'fcUpload';

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
        onHandle: {
            type: Function,
            default(file) {
                this.previewImage = file.url;
                this.previewVisible = true;
            }
        },
        uploadType: {
            type: String,
            default: 'image'
        },
        limit: {
            type: Number,
            default: 0
        },
        allowRemove: {
            type: Boolean,
            default: true
        },
        previewMask: undefined,
        showFileList: Boolean,
        httpRequest: Function,
        modalTitle: String,
        listType: {
            type: String,
            default: 'picture'
        },
        handleIcon: {
            type: [String, Boolean],
            default: () => undefined
        },
        uploadText: String,
        value: [Array, String]
    },
    data() {
        return {
            uploadList: [],
            previewVisible: false,
            previewImage: '',
            cacheFiles: [],
        }
    },
    created() {
        if (this.formCreateInject.prop.props.showFileList === undefined) {
            this.formCreateInject.prop.props.showFileList = false;
        }
        this.formCreateInject.prop.props.fileList = toArray(this.value).map(parseFile).map(parseUpload);
    },
    watch: {
        value(n) {
            if (this.$refs.upload.uploadFiles.every(file => {
                return !file.status || file.status === 'success';
            })) {
                this.$refs.upload.uploadFiles = toArray(n).map(parseFile).map(parseUpload);
                this.uploadList = this.$refs.upload.uploadFiles;
            }
        },
        limit(n, o) {
            if (o === 1 || n === 1) {
                this.update();
            }
        }
    },
    methods: {
        key(unique) {
            return unique;
        },
        isDisabled() {
            return this.formCreateInject.prop.props.disabled === true;
        },
        onRemove(file) {
            if (this.isDisabled()) {
                return;
            }
            this.$refs.upload.handleRemove(file);
        },
        handleClick(file) {
            this.onHandle(file);
        },
        makeItem(file, index) {
            return this.uploadType === 'image'
                ? <img src={file.url} key={this.key('img' + index)}/>
                : <i class="el-icon-tickets" key={this.key('i' + index)}/>
        },
        makeRemoveIcon(file, index) {
            return <i class="el-icon-delete" on-click={() => this.onRemove(file)} key={this.key('ri' + index)}/>;
        },
        makeHandleIcon(file, index) {
            return <i
                class={(this.handleIcon === true || this.handleIcon === undefined) ? 'el-icon-view' : this.handleIcon}
                on-click={() => this.handleClick(file)} key={this.key('hi' + index)}/>;
        },
        makeProgress(file, index) {
            return <ElProgress props={{percentage: file.percentage, type: 'circle', width: 52}} style="margin-top:2px;"
                               key={this.key('pg' + index)}/>
        },
        makeIcons(file, index) {
            const icons = [];
            if (this.allowRemove || this.handleIcon !== false) {
                if ((this.uploadType !== 'file' && this.handleIcon !== false) || (this.uploadType === 'file' && this.handleIcon)) {
                    icons.push(this.makeHandleIcon(file, index));
                }
                if (this.allowRemove) {
                    icons.push(this.makeRemoveIcon(file, index));
                }

                return <div class='fc-upload-cover'>{icons}</div>;
            }
        },
        makeFiles() {
            if (this.listType === 'picture') {
                return this.uploadList.map((file, index) => this.$scopedSlots.fileList ? this.$scopedSlots.fileList({
                    file,
                    index,
                    vm: this
                }) : <div key={this.key(index)}
                          class='fc-files'>{(file.percentage !== undefined && file.status !== 'success') ? this.makeProgress(file, index) : [this.makeItem(file, index), this.makeIcons(file, index)]}</div>);
            }
        },
        makeDefaultSlot() {
            if (this.listType === 'picture') {
                return <div class='fc-upload-btn'>
                    <i class="el-icon-upload2"/>
                </div>;
            } else if(this.listType === 'text') {
                return <ElButton type="primary">{this.formCreateInject.t('clickToUpload') || this.uploadText || '点击上传'}</ElButton>
            } else {
                return <i class="el-icon-upload2"/>
            }
        },
        makeUpload() {
            const isShow = (!this.limit || this.limit > this.uploadList.length);
            return <ElUpload {...this.formCreateInject.prop} {...{
                props: {
                    listType: this.listType,
                    showFileList: this.listType !== 'picture',
                    httpRequest: this.doHttpRequest
                },
                style: {display: 'inline-block'},
                key: this.key('upload'),
                ref: 'upload'
            }}>
                {isShow ? <template slot="default">
                    {this.$slots.default || this.makeDefaultSlot()}
                </template> : null}
            </ElUpload>;
        },
        update() {
            let files = this.$refs.upload.uploadFiles.map((v) => v.is_string ? v.url : (v.value || v.url)).filter((url) => url !== undefined);
            if (JSON.stringify(files) !== JSON.stringify(this.cacheFiles)) {
                this.cacheFiles = [...files];
                this.$emit('input', this.limit === 1 ? (files[0] || '') : files);
            }
        },
        handleCancel() {
            this.previewVisible = false;
        },
        doHttpRequest(option) {
            if (this.httpRequest) {
                return this.httpRequest(option);
            } else {
                option.source = 'upload';
                option.method = 'post';
                this.formCreateInject.api.fetch(option);
            }
        },
    },
    render() {
        if (this.$refs.upload) {
            this.formCreateInject.prop.props.fileList = this.$refs.upload.fileList;
        }
        return (
            <div
                class='_fc-upload'>{[this.makeFiles(), this.makeUpload()]}
                <el-dialog
                    props={{
                        appendToBody: true,
                        modal: this.previewMask,
                        title: this.modalTitle,
                        visible: this.previewVisible
                    }}
                    on-close={this.handleCancel}>
                    <img alt="example" style="width: 100%" src={this.previewImage}/>
                </el-dialog>
            </div>);
    },
    mounted() {
        this.uploadList = this.$refs.upload.uploadFiles;
        this.$watch(() => this.$refs.upload.uploadFiles, () => {
            this.update();
        }, {deep: true});
        this.$emit('fc.el', this.$refs.upload);
    }
}
