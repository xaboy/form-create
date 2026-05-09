import {defineComponent, resolveComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';
import PlusOutlined from './PlusOutlined.vue';
import UploadOutlined from './UploadOutlined.vue';

const parseFile = function (file, uid) {
        if (typeof file === 'object') {
            return file;
        }
        return {
            url: file,
            is_string: true,
            name: getFileName(file),
            status: 'done',
            uid: -1 * (uid + 1)
        };
    }, getFileName = function (file) {
        return ('' + file).split('/').pop()
    }, parseUpload = function (file) {
        return {...file, file, value: file};
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
            type: [Array, String, Object],
            default: () => []
        },
        onSuccess: {
            type: Function,
            required: true
        },
        onPreview: Function,
        listType: String,
        uploadText: String,
        modalTitle: String,
        customRequest: Function,
        formCreateInject: Object,
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
            this.$emit('update:modelValue', this.uploadList.map(v => v.is_string ? v.url : (v.value || v.url)));
        },
        doCustomRequest(option) {
            if(this.customRequest) {
                return this.customRequest(option);
            } else {
                option.source = 'upload';
                this.formCreateInject.api.fetch(option);
            }
        },
    },
    render() {
        const isShow = (!this.limit || this.limit > this.uploadList.length);
        const aModal = resolveComponent('AModal');
        const props = {[aModal.props.open ? 'open' : 'visible']: this.previewVisible}
        return <div class="_fc-upload">
            <AUpload maxCount={this.limit} listType={this.listType || 'picture-card'} {...this.$attrs}
                onPreview={this.handlePreview}
                onChange={this.handleChange} fileList={this.uploadList} customRequest={this.doCustomRequest}
                ref="upload" v-slots={getSlot(this.$slots, ['default'])}>
                {isShow ? (this.$slots.default?.() || ['text', 'picture'].indexOf(this.listType) === -1
                    ? <PlusOutlined style="font-size: 16px; width: 16px;"/>
                    : <AButton><UploadOutlined/>{this.formCreateInject.t('clickToUpload') || this.uploadText || '点击上传'}</AButton>) : null}
            </AUpload>
            <aModal mask={this.previewMask} title={this.modalTitle} {...props}
                onCancel={() => this.previewVisible = false} footer={null}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </div>;
    },
    mounted() {
        this.$emit('fc.el', this.$refs.upload);
    }
});
