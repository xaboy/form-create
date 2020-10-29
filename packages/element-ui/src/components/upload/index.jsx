import {hasSlot, toArray, toString, uniqueId} from '@form-create/utils';
import style from '../../style/index.css';

function parseFile(file, i) {
    return {
        url: file,
        name: getFileName(file),
        uid: i
    };
}

function getFileName(file) {
    return toString(file).split('/').pop()
}

const NAME = 'fc-elm-upload';

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
        previewMask: undefined,
        modalTitle: String,
        handleIcon: [String, Boolean],
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
        if (this.ctx.props.showFileList === undefined)
            this.ctx.props.showFileList = false;
        this.ctx.props.fileList = toArray(this.value).map(parseFile);
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
            this.onHandle(file);
        },

        makeDefaultBtn() {
            return <div class={style['fc-upload-btn']}>
                <i class="el-icon-upload2"/>
            </div>
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
                if ((this.uploadType !== 'file' && this.handleIcon !== false) || (this.uploadType === 'file' && this.handleIcon))
                    icons.push(this.makeHandleIcon(file, index));
                if (this.allowRemove)
                    icons.push(this.makeRemoveIcon(file, index));

                return <div class={style['fc-upload-cover']}>{icons}</div>;
            }
        },
        makeFiles() {
            return this.uploadList.map((file, index) => <div key={this.key(index)}
                class={style['fc-files']}>{(file.percentage !== undefined && file.status !== 'success') ? this.makeProgress(file, index) : [this.makeItem(file, index), this.makeIcons(file, index)]}</div>);
        },
        makeUpload() {
            return <ElUpload ref="upload"
                style={{display: 'inline-block'}} {...this.ctx}
                key={this.key('upload')}>{this.children}</ElUpload>;
        },
        initChildren() {
            if (!hasSlot(this.children, 'default'))
                this.children.push(this.makeDefaultBtn());
        },
        update() {
            let files = this.$refs.upload.uploadFiles.map((file) => file.url).filter((url) => url !== undefined);
            this.$emit('input', this.maxLength === 1 ? (files[0] || '') : files);
        },
        handleCancel() {
            this.previewVisible = false;
        },
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
            }}>{[this.ctx.props.showFileList ? [] : this.makeFiles(), this.makeUpload()]}
                <el-dialog modal={this.previewMask} title={this.modalTitle} visible={this.previewVisible}
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
