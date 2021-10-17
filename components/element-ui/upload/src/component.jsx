import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';
import './style.css';

function parseFile(file, i) {
    return {
        url: file,
        name: getFileName(file),
        uid: i
    };
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
            default: 'file'
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
        modalTitle: String,
        handleIcon: {
            type: [String, Boolean],
            default: () => undefined
        },
        value: [Array, String]
    },
    data() {
        return {
            uploadList: [],
            previewVisible: false,
            previewImage: ''
        }
    },
    created() {
        if (this.formCreateInject.prop.props.showFileList === undefined) {
            this.formCreateInject.prop.props.showFileList = false;
        }
        this.formCreateInject.prop.props.fileList = toArray(this.value).map(parseFile);
    },
    watch: {
        value(n) {
            if (this.$refs.upload.uploadFiles.every(file => {
                return !file.status || file.status === 'success';
            })) {
                this.$refs.upload.uploadFiles = toArray(n).map(parseFile);
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
            return this.uploadList.map((file, index) => this.$scopedSlots.fileList ? this.$scopedSlots.fileList({
                file,
                index,
                vm: this
            }) : <div key={this.key(index)}
                class='fc-files'>{(file.percentage !== undefined && file.status !== 'success') ? this.makeProgress(file, index) : [this.makeItem(file, index), this.makeIcons(file, index)]}</div>);
        },
        makeUpload() {
            const isShow = (!this.limit || this.limit > this.uploadList.length);
            return <ElUpload {...this.formCreateInject.prop} ref="upload"
                style={{display: 'inline-block'}}
                key={this.key('upload')}>
                {isShow ? <template slot="default">
                    {this.$slots.default || <div class='fc-upload-btn'>
                        <i class="el-icon-upload2"/>
                    </div>}
                </template> : null}{getSlot(this.$slots, ['default'])}
            </ElUpload>;
        },
        update() {
            let files = this.$refs.upload.uploadFiles.map((file) => file.url).filter((url) => url !== undefined);
            this.$emit('input', this.limit === 1 ? (files[0] || '') : files);
        },
        handleCancel() {
            this.previewVisible = false;
        },
    },
    render() {
        if (this.$refs.upload) {
            if (this.formCreateInject.prop.props.showFileList === undefined) {
                this.formCreateInject.prop.props.showFileList = this.$refs.upload.showFileList;
            }
            this.formCreateInject.prop.props.fileList = this.$refs.upload.fileList;
        }
        return (
            <div
                class='_fc-upload'>{[this.formCreateInject.prop.props.showFileList ? [] : this.makeFiles(), this.makeUpload()]}
                <el-dialog appendToBody={true} modal={this.previewMask} title={this.modalTitle}
                    visible={this.previewVisible}
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
    }
}
