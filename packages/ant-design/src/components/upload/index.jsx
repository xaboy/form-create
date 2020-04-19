import {hasSlot, toArray, toString} from '@form-create/utils';

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


export default {
    name: 'fc-antd-update',
    props: {
        limit: {
            type: Number,
            default: 0
        },
        ctx: {
            type: Object,
            default: () => ({props: {}})
        },
        children: {
            type: Array,
            default: () => []
        },
        value: {
            type: [Array, String],
            default: () => []
        },
        onSuccess: {
            type: Function,
            required: true
        }
    },
    data() {
        const fileList = toArray(this.value).map(parseFile);
        return {
            defaultUploadList: fileList,
            previewImage: '',
            previewVisible: false,
            uploadList: fileList.map(parseUpload)
        };
    },
    watch: {
        value(n) {
            const fileList = toArray(n).map(parseFile);
            this.$refs.upload.sFileList = fileList;
            this.uploadList = fileList.map(parseUpload)
        }
    },
    methods: {
        initChildren() {
            if (!hasSlot(this.children, 'default'))
                this.children.push(this.makeBtn())
        },
        makeBtn() {
            return <div>
                <AIcon type="plus"/>
            </div>
        },
        handlePreview(file) {
            this.previewImage = file.url;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
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
        this.initChildren();
        return <div>
            <AUpload {...this.ctx} on-preview={this.handlePreview} on-change={this.handleChange}
                ref="upload" defaultFileList={this.defaultUploadList}>{this.children}</AUpload>
            <aModal visible={this.previewVisible} footer={null} on-cancel={this.handleCancel}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </div>;
    }
}
