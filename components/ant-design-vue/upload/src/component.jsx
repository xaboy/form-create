import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';
import PlusOutlined from './PlusOutlined.vue';

const parseFile = function (file, uid) {
        return {
            url: file,
            name: getFileName(file),
            status: 'done',
            uid: -1 * (uid + 1)
        };
    }, getFileName = function (file) {
        return ('' + file).split('/').pop()
    }, parseUpload = function (file) {
        return {url: file.url, file, uid: file.uid};
    };

const NAME = 'fcUpload';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
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
        onPreview: Function,
        modalTitle: String,
        previewMask: undefined,
    },
    emits: ['update:modelValue', 'change', 'fc.el'],
    data() {
        return {
            previewImage: '',
            previewVisible: false,
            uploadList: this.modelValue.map(parseFile).map(parseUpload)
        };
    },
    watch: {
        modelValue(n) {
            this.uploadList = n.map(parseFile).map(parseUpload)
        }
    },
    methods: {
        handlePreview(file) {
            if (this.onPreview) {
                this.onPreview(...arguments);
            } else {
                this.previewImage = file.url;
                this.previewVisible = true;
            }
        },
        handleChange({file, fileList}) {
            this.$emit('change', ...arguments);
            this.uploadList = fileList;
            if (file.status === 'done') {
                this.onSuccess(file, fileList);
                this.input();
            } else if (file.status === 'removed') {
                fileList.forEach((v, i) => {
                    if (v.file === file) {
                        fileList.splice(i, 1);
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
        return <>
            <AUpload maxCount={this.limit} list-type={'picture-card'} {...this.$attrs} onPreview={this.handlePreview}
                onChange={this.handleChange} fileList={this.uploadList}
                ref="upload" v-slots={getSlot(this.$slots, ['default'])}>
                {isShow ? (this.$slots.default?.() ||
                    <PlusOutlined style="font-size: 16px; width: 16px;"/>) : null}
            </AUpload>
            <aModal mask={this.previewMask} title={this.modalTitle} open={this.previewVisible}
                onCancel={() => this.previewVisible = false} footer={null}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </>;
    },
    mounted(){
        this.$emit('fc.el',this.$refs.upload);
    }
});
