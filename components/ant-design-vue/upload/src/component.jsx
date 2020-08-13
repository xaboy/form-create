import toString from '@form-create/utils/lib/tostring';
import deepExtend from '@form-create/utils/lib/deepextend';

const parseFile = function (file, uid) {
        return {
            url: file,
            name: getFileName(file),
            status: 'done',
            uid: uid + 1
        };
    }, getFileName = function (file) {
        return toString(file).split('/').pop()
    }, parseUpload = function (file) {
        return {url: file.url, file};
    };

const NAME = 'fc-update';

export default {
    name: NAME,
    props: {
        limit: {
            type: Number,
            default: 0
        },
        ctx: {
            type: Object,
            default: () => ({props: {}})
        },
        value: {
            type: Array,
            default: () => []
        },
        onSuccess: {
            type: Function,
            required: true
        },
        onHandle: {
            type: Function,
            default: function (file) {
                this.previewImage = file.url;
                this.previewVisible = true;
            }
        },
        modalTitle: String,
        previewMask: undefined,
    },
    data() {
        const fileList = this.value.map(parseFile);
        return {
            defaultUploadList: fileList,
            previewImage: '',
            previewVisible: false,
            uploadList: fileList.map(parseUpload)
        };
    },
    watch: {
        value(n) {
            const fileList = n.map(parseFile);
            this.$refs.upload.sFileList = fileList;
            this.uploadList = fileList.map(parseUpload)
        }
    },
    methods: {
        handleChange({file, fileList}) {
            const list = this.uploadList;
            if (file.status === 'done') {
                this.onSuccess(file, fileList);
                if (file.url) list.push({
                    url: file.url,
                    file: fileList[fileList.length - 1]
                });
                this.input();
            } else if (file.status === 'removed') {
                list.forEach((v, i) => {
                    if (v.file === file) {
                        list.splice(i, 1);
                    }
                });
                this.input();
            }
        },
        input() {
            this.$emit('input', this.uploadList.map(v => v.url));
        },

    },
    render() {
        const isShow = (!this.limit || this.limit > this.uploadList.length);
        const ctx = {...this.ctx};
        ctx.on = deepExtend({}, ctx.on || {});
        return <div>
            <AUpload {...ctx} on-preview={this.onHandle.bind(this)}
                on-change={this.handleChange}
                ref="upload" defaultFileList={this.defaultUploadList}>
                {isShow ? <template slot="default"><AIcon type="plus"/></template> : null}
            </AUpload>
            <aModal mask={this.previewMask} title={this.modalTitle} v-model={this.previewVisible} footer={null}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </div>;
    }
}
