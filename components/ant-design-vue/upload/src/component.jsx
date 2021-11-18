import {defineComponent} from 'vue';
import toString from '@form-create/utils/lib/tostring';
import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';
import {PlusOutlined} from '@ant-design/icons-vue';

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

const NAME = 'fcUpload';

export default defineComponent({
    name: NAME,
    formCreateParser: {
        toFormValue(value) {
            return toArray(value);
        },
        toValue(formValue, ctx) {
            return ctx.prop.props.limit === 1 ? (formValue[0] || '') : formValue;
        }
    },
    props: {
        limit: {
            type: Number,
            default: 0
        },
        modelValue: {
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
    emits: ['update:modelValue'],
    components: {
        PlusOutlined
    },
    data() {
        const fileList = this.modelValue.map(parseFile);
        return {
            defaultUploadList: fileList,
            previewImage: '',
            previewVisible: false,
            uploadList: fileList.map(parseUpload)
        };
    },
    watch: {
        modelValue(n) {
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
            this.$emit('update:modelValue', this.uploadList.map(v => v.url));
        },

    },
    render() {
        const isShow = (!this.limit || this.limit > this.uploadList.length);
        return <div>
            <AUpload {...this.$attrs} onPreview={this.onHandle.bind(this)}
                onChange={this.handleChange}
                ref="upload" defaultFileList={this.defaultUploadList} v-slots={getSlot(this.$slots, ['default'])}>
                {isShow ? (this.$slots.default?.() ||
                    <PlusOutlined/>) : null}
            </AUpload>
            <aModal mask={this.previewMask} title={this.modalTitle} visible={this.previewVisible}
                onCancel={() => this.previewVisible = false} footer={null}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </div>;
    }
});
