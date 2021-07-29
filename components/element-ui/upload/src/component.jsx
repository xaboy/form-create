import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';
import './style.css';
import {defineComponent} from 'vue';

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

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        onHandle: Function,
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
        handleIcon: [String, Boolean],
        modelValue: [Array, String]
    },
    emits: ['update:modelValue', 'fc:subform'],
    data() {
        return {
            uploadList: [],
            previewVisible: false,
            previewImage: '',
            fileList: []
        }
    },
    created() {
        this.fileList = toArray(this.modelValue).map(parseFile);
    },
    watch: {
        modelValue(n) {
            if (this.$refs.upload.uploadFiles.every(file => {
                return !file.status || file.status === 'success';
            })) {
                this.$refs.upload.uploadFiles = toArray(n).map(parseFile);
                this.uploadList = this.$refs.upload.uploadFiles;
            }
            this.fileList = toArray(n).map(parseFile);
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
            return this.$attrs.disabled === true;
        },
        onRemove(file) {
            if (this.isDisabled()) {
                return;
            }
            this.$refs.upload.handleRemove(file);
        },
        handleClick(file) {
            if (this.isDisabled()) {
                return;
            }
            window.vm2 = this;
            (this.onHandle || (file => {
                this.previewImage = file.url;
                this.previewVisible = true;
            })
            )(file);
        },
        makeItem(file, index) {
            return this.uploadType === 'image'
                ? <img src={file.url} key={this.key('img' + index)}/>
                : <i class="el-icon-document" key={this.key('i' + index)}/>
        },
        makeRemoveIcon(file, index) {
            return <i class="el-icon-delete" onClick={() => this.onRemove(file)} key={this.key('ri' + index)}/>;
        },
        makeHandleIcon(file, index) {
            return <i
                class={(this.handleIcon === true || this.handleIcon === undefined) ? 'el-icon-view' : this.handleIcon}
                onClick={() => this.handleClick(file)} key={this.key('hi' + index)}/>;
        },
        makeProgress(file, index) {
            return <ElProgress {...{percentage: file.percentage, type: 'circle', width: 52}} style="margin-top:2px;"
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
            return this.uploadList.map((file, index) => <div key={this.key(index)}
                class='fc-files'>{(file.percentage !== undefined && file.status !== 'success') ? this.makeProgress(file, index) : [this.makeItem(file, index), this.makeIcons(file, index)]}</div>);
        },
        makeUpload() {
            const isShow = (!this.limit || this.limit > this.uploadList.length);
            return <ElUpload {...this.$attrs} showFileList={false} fileList={this.fileList} ref="upload"
                style={{display: 'inline-block'}}
                key={this.key('upload')} v-slots={getSlot(this.$slots, ['default'])}>
                {isShow ?
                    (this.$slots.default?.() || <div class='fc-upload-btn'>
                        <i class="el-icon-upload2"/>
                    </div>) : undefined}
            </ElUpload>;
        },
        update() {
            let files = this.$refs.upload.uploadFiles.map((file) => file.url).filter((url) => url !== undefined);
            this.$emit('update:modelValue', this.limit === 1 ? (files[0] || '') : files);
        },
        handleCancel() {
            this.previewVisible = false;
        },
    },
    render() {
        return (
            <div
                class='_fc-upload'>{[this.$attrs.showFileList ? [] : this.makeFiles(), this.makeUpload()]}
                <ElDialog appendToBody={true} modal={this.previewMask} title={this.modalTitle}
                    modelValue={this.previewVisible}
                    onClose={this.handleCancel}>
                    <img alt="example" style="width: 100%" src={this.previewImage}/>
                </ElDialog>
            </div>);
    },
    mounted() {
        this.uploadList = this.$refs.upload.uploadFiles;
        this.$watch(() => this.$refs.upload.uploadFiles, () => {
            this.update();
        }, {deep: true});
    }
})
