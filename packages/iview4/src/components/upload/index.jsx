import {iviewConfig} from '../../core/config';
import {hasSlot, toArray, toString, uniqueId} from '@form-create/utils';
import style from '../../style/index.css';

function parseFile(file) {
    return {
        url: file,
        name: getFileName(file)
    };
}

function getFileName(file) {
    return toString(file).split('/').pop()
}

const NAME = 'fc-ivu-upload';


export default {
    name: NAME,

    props: {
        ctx: {
            type: Object,
            default: () => ({props: {}})
        },
        children: {
            type: Array,
            default: () => ([])
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
        handleIcon: [String, Boolean],
        previewMask: undefined,
        value: [Array, String]
    },
    data() {
        return {
            uploadList: [],
            unique: uniqueId(),
            previewVisible: false,
            previewImage: ''
        }
    },
    created() {
        if (this.ctx.props.showUploadList === undefined)
            this.ctx.props.showUploadList = false;
        this.ctx.props.defaultFileList = toArray(this.value).map(parseFile);
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
            return NAME + unique + this.unique;
        },
        isDisabled() {
            return this.ctx.props.disabled === true;
        },
        onRemove(file) {
            if (this.isDisabled()) return;
            this.$refs.upload.handleRemove(file);
        },
        handleClick(file) {
            if (this.isDisabled()) return;
            this.onHandle(file);
        },

        makeDefaultBtn() {
            return <div class={style['fc-upload-btn']}>
                <icon props={{
                    type: this.uploadType === 'file' ? 'ios-cloud-upload-outline' : iviewConfig.imgUpIcon,
                    size: 20
                }}/>
            </div>
        },
        makeItem(file, index) {
            return this.uploadType === 'image'
                ? <img src={file.url} key={this.key('img' + index)}/>
                : <icon props={{type: iviewConfig.fileIcon, size: 40}} key={this.key('i' + index)}/>
        },
        makeRemoveIcon(file, index) {
            return <icon type='ios-trash-outline' on-click={() => this.onRemove(file)} key={this.key('ri' + index)}/>;
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

                return <div class={style['fc-upload-cover']}>{icons}</div>;
            }
        },

        makeFiles() {
            return this.uploadList.map((file, index) => <div key={this.key(index)}
                class={style['fc-files']}>{file.showProgress ? this.makeProgress(file, index) : [this.makeItem(file, index), this.makeIcons(file, index)]}</div>);
        },
        makeUpload() {
            return <Upload ref="upload"
                style={{display: 'inline-block'}} {...this.ctx}
                key={this.key('upload')}>{this.children}</Upload>;
        },
        initChildren() {
            if (!hasSlot(this.children, 'default'))
                this.children.push(this.makeDefaultBtn());
        },
        update() {
            let files = this.$refs.upload.fileList.map((file) => file.url).filter((url) => url !== undefined);
            this.$emit('input', this.maxLength === 1 ? (files[0] || '') : files);
        },
        handleCancel() {
            this.previewVisible = false;
        },
    },
    render() {
        const isShow = (!this.maxLength || this.maxLength > this.uploadList.length);

        if (this.$refs.upload) {
            if (this.ctx.props.showUploadList === undefined)
                this.ctx.props.showUploadList = this.$refs.upload.showUploadList;
            this.ctx.props.defaultFileList = this.$refs.upload.defaultFileList;
        }

        this.initChildren();

        return (
            <div class={{
                [style['fc-upload']]: true,
                [style['fc-hide-btn']]: !isShow
            }}>{[this.ctx.props.showUploadList ? [] : this.makeFiles(), this.makeUpload()]}
                <Modal mask={this.previewMask} title={this.modalTitle} v-model={this.previewVisible} footerHide={true}>
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
}
