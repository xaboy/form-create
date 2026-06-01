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
            status: 'finished',
            id: uid + 1
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
        name: String,
        onPreview: Function,
        modalTitle: String,
        previewMask: undefined,
        customRequest: Function,
        formCreateInject: Object,
        listType: {
            type: String,
            default: 'image-card'
        },
        uploadText: String,
    },
    emits: ['update:modelValue', 'finish', 'fc.el'],
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
        handleChange({event, file}) {
            this.$emit('finish', ...arguments);
            const list = this.uploadList;
            this.onSuccess(event ? JSON.parse(event.target.response) : file?.file.res, file);
            if (file.url) list.push({
                url: file.url,
                file,
            });
            this.input(list);

        },
        input(n) {
            this.$emit('update:modelValue', n.map((v) => v.is_string ? v.url : (v.value || v.url)).filter((url) => url !== undefined));
        },
        inputRemove(n) {
            if (n.length < this.uploadList.length) {
                this.input(n);
            }
        },
        handlePreview(file) {
            if (this.onPreview) {
                this.onPreview(...arguments)
            } else if (this.listType === 'image-card') {
                this.previewImage = file.url;
                this.previewVisible = true;
            }
        },
        doCustomRequest(option) {
            const request = this.customRequest;
            if (request) {
                return request(option);
            }
            const onProgress = option.onProgress;
            option.method = option.method || 'post';
            option.file = option.file?.file || option.file;
            option.filename = this.name || 'file';
            option.source = 'upload';
            option.onSuccess = (e) => {
                option.file.res = e;
                option.onFinish();
            };
            if (onProgress) {
                option.onProgress = (evt) => {
                    onProgress(evt.percent, evt);
                }
            }
            return this.formCreateInject.api.fetch(option);
        }

    },
    render() {
        return <div class="_fc-upload" style="width: 100%;">
            <n-upload max={this.limit || undefined}  listType={this.listType} name={this.name} {...this.$attrs} onPreview={this.handlePreview}
                onFinish={this.handleChange} key={this.uploadList.length}
                customRequest={this.doCustomRequest}
                defaultFileList={this.uploadList} onUpdate:fileList={this.inputRemove}
                      v-slots={this.$slots} ref="el">
                {(['text', 'image'].indexOf(this.listType) === -1 ? undefined : <NButton>{this.formCreateInject.t('clickToUpload') || this.uploadText || '点击上传'}</NButton>)}
            </n-upload>
            <NModal preset={'card'} mask={this.previewMask} title={this.modalTitle} show={this.previewVisible}
                style="width: 600px;"
                onUpdate:show={(n) => this.previewVisible = n}>
                <img style="width: 100%" src={this.previewImage}/>
            </NModal>
        </div>;
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
});
