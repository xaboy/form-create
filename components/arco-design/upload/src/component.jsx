import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';

const parseFile = function (file, uid) {
        if (typeof file === 'object') {
            return file;
        }
        return {
            url: file,
            is_string: true,
            name: getFileName(file),
            status: 'done',
            uid: uid + 1
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
        modelValue: {
            type: [Array, String, Object],
            default: () => []
        },
        onSuccess: {
            type: Function,
            required: true
        },
        onPreview: Function,
        customRequest: Function,
        formCreateInject: Object,
        modalTitle: String,
        previewMask: undefined,
    },
    emits: ['update:modelValue', 'success', 'fc.el'],
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
        handleChange(file) {
            this.onSuccess(...arguments);
            const list = this.uploadList;
            if (file.url || file.value) list.push(file);
            this.input(list);
        },
        input(n) {
            this.$emit('update:modelValue', n.map(v => v.is_string ? v.url : (v.value || v.url)));
        },
        inputRemove(n) {
            if (n.length < this.uploadList.length) {
                this.input(n);
            }
        },
        handlePreview(file) {
            if (this.onPreview) {
                this.onPreview(...arguments)
            } else {
                this.previewImage = file.url;
                this.previewVisible = true;
            }
        },
        doCustomRequest(option) {
            if (this.customRequest) {
                return this.customRequest(option);
            } else {
                const onProgress = option.onProgress;
                if (!option.data) {
                    option.data = {}
                }
                option.method = 'post';
                option.file = option.fileItem.file;
                option.source = 'upload';
                if (onProgress) {
                    option.onProgress = (evt) => {
                        onProgress(evt.percent, evt);
                    }
                }
                this.formCreateInject.api.fetch(option);
            }
        }
    },
    render() {
        return <div class="_fc-upload">
            <AUpload listType={'picture-card'} {...this.$attrs} onPreview={this.handlePreview}
                onSuccess={this.handleChange} customRequest={this.doCustomRequest}
                ref="upload" fileList={this.uploadList} onUpdate:fileList={this.inputRemove}
                v-slots={this.$slots}/>
            <aModal mask={this.previewMask} title={this.modalTitle || '预览'} visible={this.previewVisible}
                onCancel={() => this.previewVisible = false} footer={null}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </div>;
    },
    mounted() {
        this.$emit('fc.el', this.$refs.upload);
    }
});
