import {iviewConfig} from '../../core/config';
import {hasSlot, toArray, toString} from '@form-create/utils';
import {defaultOnHandle} from '../../core/modal';
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


export default {
    name: 'fc-iview-upload',

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
                defaultOnHandle(file.url, this.modalTitle)
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
        modalTitle: {
            type: String,
            default: '预览'
        },
        handleIcon: [String, Boolean],
        value: [Array, String]
    },
    data() {
        return {
            uploadList: []
        }
    },
    created() {
        if (this.ctx.props.showUploadList === undefined)
            this.ctx.props.showUploadList = false;
        this.ctx.props.defaultFileList = toArray(this.value).map(parseFile);
    },
    watch: {
        value(n) {
            this.$refs.upload.fileList = toArray(n).map(parseFile);
            this.uploadList = this.$refs.upload.fileList;
        },
        maxLength(n, o) {
            if (o === 1 || n === 1)
                this.update();
        }
    },
    methods: {
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
        makeItem(file) {
            return this.uploadType === 'image'
                ? <img src={file.url}/>
                : <icon props={{type: iviewConfig.fileIcon, size: 40}}/>
        },
        makeRemoveIcon(file) {
            return <icon type='ios-trash-outline' on-click={() => this.onRemove(file)}/>;
        },
        makeHandleIcon(file) {
            return <icon
                type={(this.handleIcon === true || this.handleIcon === undefined) ? 'ios-eye-outline' : this.handleIcon}
                on-click={() => this.handleClick(file)}/>;
        },
        makeProgress(file) {
            return <Progress props={{percent: file.percentage, hideInfo: true}} style="width:90%"/>
        },
        makeIcons(file) {
            const icons = [];
            if (this.allowRemove || this.handleIcon !== false) {
                if ((this.uploadType !== 'file' && this.handleIcon !== false) || (this.uploadType === 'file' && this.handleIcon))
                    icons.push(this.makeHandleIcon(file));
                if (this.allowRemove)
                    icons.push(this.makeRemoveIcon(file));

                return <div class={style['fc-upload-cover']}>{icons}</div>;
            }
        },

        makeFiles() {
            return this.uploadList.map(file => <div
                class={style['fc-files']}>{file.showProgress ? this.makeProgress(file) : [this.makeItem(file), this.makeIcons(file)]}</div>);
        },
        makeUpload() {
            return <Upload ref="upload"
                style={{display: 'inline-block'}} {...this.ctx}>{this.children}</Upload>;
        },
        initChildren() {
            if (!hasSlot(this.children, 'default'))
                this.children.push(this.makeDefaultBtn());
        },
        update() {
            let files = this.$refs.upload.fileList.map((file) => file.url).filter((url) => url !== undefined);
            this.$emit('input', this.maxLength === 1 ? (files[0] || '') : files);
        }
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
            }}>{[this.ctx.props.showUploadList ? [] : this.makeFiles(), this.makeUpload()]}</div>);
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
        this.$watch(() => this.$refs.upload.fileList, () => {
            this.update();
        }, {deep: true});
    }
}