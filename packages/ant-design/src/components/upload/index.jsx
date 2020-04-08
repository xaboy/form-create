import {hasSlot, toArray} from '@form-create/utils';

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
        }
    },
    data() {
        return {
            previewImage: '',
            previewVisible: false,
            uploadList: []
        };
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
            this.previewImage = file.url || file.thumbUrl;
            this.previewVisible = true;
        },
        handleCancel() {
            this.previewVisible = false;
        },
        handleChange({file, fileList}) {
            if (file.status === 'done') {
                this.onSuccess(file, fileList);
                console.log(file, fileList)
            }
        },
        update(fileList) {
            if (fileList.every(file => {
                return !file.status || file.status === 'done';
            })) {
                console.log('fileList', fileList);
                this.$emit('input', fileList.map(file => file.url).filter(url => !!url));
            }
        }
    },
    render() {
        console.log('render');
        this.initChildren();
        return <div>
            <AUpload {...this.ctx} on-preview={this.handlePreview} on-change={this.handleChange}
                ref="upload">{this.children}</AUpload>
            <aModal visible={this.previewVisible} footer={null} on-cancel={this.handleCancel}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </div>;
    },
    mounted() {
        this.$watch(() => this.$refs.upload.sFileList, (n) => {
            this.update(n);
        }, {deep: true});
    }
}
