import toArray from '@form-create/utils/lib/toarray';
import './style.css';
import getSlot from '@form-create/utils/lib/slot';

function parseFile(file) {
    return {
        url: file,
        name: getFileName(file)
    };
}

function getFileName(file) {
    return ('' + file).split('/').pop()
}

const NAME = 'fcUpload';


export default function createUpload(config) {
    return {
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
            maxLength: {
                type: Number,
                default: 0
            },
            allowRemove: {
                type: Boolean,
                default: true
            },
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
                previewImage: '',
                cacheFiles:[],
            }
        },
        created() {
            if (this.formCreateInject.prop.props.showUploadList === undefined)
                this.formCreateInject.prop.props.showUploadList = false;
            this.formCreateInject.prop.props.defaultFileList = toArray(this.value).map(parseFile);
        },
        watch: {
            value(n) {
                if (this.$refs.upload.fileList.every(file => {
                    return !file.status || file.status === 'finished';
                })) {
                    this.$refs.upload.fileList = toArray(n).map(parseFile);
                    this.uploadList = this.$refs.upload.fileList;
                }
            },
            maxLength(n, o) {
                if (o === 1 || n === 1)
                    this.update();
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
                if (this.isDisabled()) return;
                this.$refs.upload.handleRemove(file);
            },
            handleClick(file) {
                this.onHandle(file);
            },
            makeItem(file, index) {
                return this.uploadType === 'image'
                    ? <img src={file.url} key={this.key('img' + index)}/>
                    : <icon props={{type: config.fileIcon, size: 40}} key={this.key('i' + index)}/>
            },
            makeRemoveIcon(file, index) {
                return <icon type='ios-trash-outline' on-click={() => this.onRemove(file)}
                    key={this.key('ri' + index)}/>;
            },
            makeHandleIcon(file, index) {
                return <icon
                    type={(this.handleIcon === true || this.handleIcon === undefined) ? 'ios-eye-outline' : this.handleIcon}
                    on-click={() => this.handleClick(file)} key={this.key('hi' + index)}/>;
            },
            makeProgress(file, index) {
                return <Progress props={{percent: file.percentage, hideInfo: true}} style="width:90%"
                    key={this.key('pg' + index)}/>
            },
            makeIcons(file, index) {
                const icons = [];
                if (this.allowRemove || this.handleIcon !== false) {
                    if ((this.uploadType !== 'file' && this.handleIcon !== false) || (this.uploadType === 'file' && this.handleIcon))
                        icons.push(this.makeHandleIcon(file, index));
                    if (this.allowRemove)
                        icons.push(this.makeRemoveIcon(file, index));

                    return <div class="fc-upload-cover">{icons}</div>;
                }
            },
            makeFiles() {
                return this.uploadList.map((file, index) => this.$scopedSlots.fileList ? this.$scopedSlots.fileList({
                    file,
                    index,
                    vm: this
                }) : <div key={this.key(index)}
                    class="fc-files">{file.showProgress ? this.makeProgress(file, index) : [this.makeItem(file, index), this.makeIcons(file, index)]}</div>);
            },
            makeUpload() {
                const isShow = (!this.maxLength || this.maxLength > this.uploadList.length);
                return <Upload {...this.formCreateInject.prop} ref="upload"
                    style={{display: 'inline-block'}}
                    key={this.key('upload')}>
                    {isShow ? <template slot="default">
                        {this.$slots.default || <div class="fc-upload-btn">
                            <icon props={{
                                type: this.uploadType === 'file' ? 'ios-cloud-upload-outline' : config.imgUpIcon,
                                size: 20
                            }}/>
                        </div>}
                    </template> : null}{getSlot(this.$slots,['default'])}
                </Upload>;
            },
            update() {
                let files = this.$refs.upload.fileList.map((file) => file.url).filter((url) => url !== undefined);
                if(this.cacheFiles.length !== files.length){
                    this.cacheFiles = [...files];
                    this.$emit('input', this.maxLength === 1 ? (files[0] || '') : files);
                }
            },
            handleCancel() {
                this.previewVisible = false;
            },
        },
        render() {
            if (this.$refs.upload) {
                if (this.formCreateInject.prop.props.showUploadList === undefined)
                    this.formCreateInject.prop.props.showUploadList = this.$refs.upload.showUploadList;
                this.formCreateInject.prop.props.defaultFileList = this.$refs.upload.defaultFileList;
            }
            return (
                <div
                    class="_fc-upload">{[this.formCreateInject.prop.props.showUploadList ? [] : this.makeFiles(), this.makeUpload()]}
                    <Modal title={this.modalTitle} v-model={this.previewVisible} footerHide={true}>
                        <img alt="example" style="width: 100%" src={this.previewImage}/>
                    </Modal>
                </div>);
        },
        mounted() {
            this.uploadList = this.$refs.upload.fileList;
            this.$watch(() => this.$refs.upload.fileList, () => {
                this.update();
            }, {deep: true});
        }
    };
}
