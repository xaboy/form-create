import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';
import IconUpload from './IconUpload.vue';
import IconPlus from './IconPlus.vue';
import './style.css';

function getFileName(file) {
    return ('' + file).split('/').pop();
}

function parseFile(file, i) {
    if (typeof file === 'object') {
        return file;
    }
    return {
        url: file,
        is_string: true,
        name: getFileName(file),
        uid: i
    };
}

function parseUpload(file) {
    return {...file, file, value: file};
}

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
    components: {
        IconUpload,
        IconPlus,
    },
    props: {
        previewMask: undefined,
        onPreview: Function,
        httpRequest: Function,
        modalTitle: String,
        listType: String,
        uploadText: String,
        formCreateInject: Object,
        modelValue: [Array, String, Object],
    },
    emits: ['update:modelValue', 'change', 'remove', 'fc.el'],
    data() {
        return {
            previewVisible: false,
            previewImage: '',
            fileList: []
        };
    },
    created() {
        this.fileList = toArray(this.modelValue).map(parseFile).map(parseUpload);
    },
    watch: {
        modelValue(n) {
            this.fileList = toArray(n).map(parseFile).map(parseUpload);
        }
    },
    methods: {
        handlePreview(file) {
            if (this.onPreview) {
                this.onPreview(...arguments);
            } else {
                if ('text' === this.listType) {
                    window.open(file.url);
                } else {
                    this.previewImage = file.url;
                    this.previewVisible = true;
                }
            }
        },
        update(fileList) {
            if (fileList.some(file => {
                return file.status === 'uploading';
            })) {
                return ;
            }
            const files = fileList
                .map(v => (v.is_string ? v.url : (v.value || v.url)))
                .filter(url => url !== undefined);
            this.$emit('update:modelValue', files);
        },
        handleCancel() {
            this.previewVisible = false;
        },
        handleChange(file, fileList) {
            this.$emit('change', ...arguments);
            if (file.status === 'success') {
                this.update(fileList);
            }
        },
        handleRemove(file, fileList) {
            this.$emit('remove', ...arguments);
            this.update(fileList || this.fileList);
        },
        doHttpRequest(option) {
            if (this.httpRequest) {
                return this.httpRequest(option);
            } else {
                option.method = 'post';
                option.source = 'upload';
                option.dataType= 'formData';
                this.formCreateInject.api.fetch(option);
            }
        }
    },
    render() {
        const len = toArray(this.modelValue).length;
        const listType = this.listType || 'picture-card';
        const limit = this.$attrs.limit;
        const isText = listType === 'text';
        const exceeded = limit ? limit <= len : false;

        const trigger = this.$slots.default
            ? this.$slots.default()
            : (isText
                ? <TinyButton type="primary">
                    <IconUpload class="_fc-tiny-svg-icon" style="margin-right:4px;"/>
                    {this.formCreateInject.t('clickToUpload') || this.uploadText || '点击上传'}
                </TinyButton>
                : <IconPlus class="_fc-upload-plus"/>);
        return (
            <div class={['_fc-upload', exceeded ? '_fc-exceed' : '']}>
                <TinyFileUpload
                    key={len}
                    {...this.$attrs}
                    listType={listType}
                    fileList={this.fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    onRemove={this.handleRemove}
                    httpRequest={this.doHttpRequest}
                    ref="upload"
                    v-slots={{
                        trigger: () => trigger,
                        ...getSlot(this.$slots, ['default'])
                    }}
                />
                <TinyDialogBox
                    appendToBody={true}
                    modal={this.previewMask}
                    title={this.modalTitle}
                    showHeader={!!this.modalTitle}
                    visible={this.previewVisible}
                    {...{'onUpdate:visible': v => (this.previewVisible = v)}}
                    style="--tv-DialogBox-vertical-padding:20px;"
                    onClose={this.handleCancel}>
                    <img style="width: 100%" src={this.previewImage}/>
                </TinyDialogBox>
            </div>
        );
    },
    mounted() {
        this.$emit('fc.el', this.$refs.upload);
    }
});
