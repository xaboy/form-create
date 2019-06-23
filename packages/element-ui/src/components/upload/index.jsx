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
    name: 'fc-elm-upload',

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
        if (this.ctx.props.showFileList === undefined)
            this.ctx.props.showFileList = false;
        this.ctx.props.fileList = toArray(this.value).map(parseFile);
    },
    watch: {
        value(n) {
            this.$refs.upload.uploadFiles = toArray(n).map(parseFile);
            this.uploadList = this.$refs.upload.uploadFiles;
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
                <i class="el-icon-upload2"/>
            </div>
        },
        makeItem(file) {
            return this.uploadType === 'image'
                ? <img src={file.url}/>
                : <i class="el-icon-tickets"/>
        },
        makeRemoveIcon(file) {
            return <i class="el-icon-delete" on-click={() => this.onRemove(file)}/>;
        },
        makeHandleIcon(file) {
            return <i
                class={(this.handleIcon === true || this.handleIcon === undefined) ? 'el-icon-view' : this.handleIcon}
                on-click={() => this.handleClick(file)}/>;
        },
        makeProgress(file) {
            return <ElProgress props={{percent: file.percentage, hideInfo: true}} style="width:90%"/>
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
            return <ElUpload ref="upload"
                style={{display: 'inline-block'}} {...this.ctx}>{this.children}</ElUpload>;
        },
        initChildren() {
            if (!hasSlot(this.children, 'default'))
                this.children.push(this.makeDefaultBtn());
        },
        update() {
            let files = this.$refs.upload.uploadFiles.map((file) => file.url).filter((url) => url !== undefined);
            this.$emit('input', this.maxLength === 1 ? (files[0] || '') : files);
        }
    },
    render() {
        const isShow = (!this.maxLength || this.maxLength > this.uploadList.length);

        if (this.$refs.upload) {
            if (this.ctx.props.showFileList === undefined)
                this.ctx.props.showFileList = this.$refs.upload.showFileList;
            this.ctx.props.fileList = this.$refs.upload.fileList;
        }

        this.initChildren();

        return (
            <div class={{
                [style['fc-upload']]: true,
                [style['fc-hide-btn']]: !isShow
            }}>{[this.ctx.props.showFileList ? [] : this.makeFiles(), this.makeUpload()]}</div>);
    },
    mounted() {
        this.uploadList = this.$refs.upload.uploadFiles;
        this.$watch(() => this.$refs.upload.uploadFiles, () => {
            this.update();
        }, {deep: true});
    }
}