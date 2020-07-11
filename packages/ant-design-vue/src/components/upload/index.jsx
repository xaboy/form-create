import {deepExtend, hasSlot, toString} from '@form-create/utils';
import style from '../../style/index.css';

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
        initChildren() {
            if (!hasSlot(this.children, 'default'))
                this.children.push(this.makeBtn())
        },
        makeBtn() {
            return <div>
                <AIcon type="plus"/>
            </div>
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
        const isShow = (!this.limit || this.limit > this.uploadList.length);
        this.initChildren();
        const ctx = {...this.ctx};
        ctx.on = deepExtend({}, ctx.on || {});
        return <div class={{[style['fc-hide-btn']]: !isShow}}>
            <AUpload {...ctx} on-preview={this.onHandle.bind(this)}
                on-change={this.handleChange}
                ref="upload" defaultFileList={this.defaultUploadList}>{this.children}</AUpload>
            <aModal mask={this.previewMask} title={this.modalTitle} v-model={this.previewVisible} footer={null}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </div>;
    }
}
