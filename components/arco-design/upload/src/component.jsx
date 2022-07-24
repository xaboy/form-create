import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';

const parseFile = function (file, uid) {
        return {
            url: file,
            name: getFileName(file),
            status: 'done',
            uid: uid + 1
        };
    }, getFileName = function (file) {
        return ('' + file).split('/').pop()
    }, parseUpload = function (file) {
        return {url: file.url, file};
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
    emits: ['update:modelValue', 'success'],
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
            if (file.url) list.push({
                url: file.url,
                file,
            });
            this.input(list);
        },
        input(n) {
            this.$emit('update:modelValue', n.map(v => v.url));
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
        }
    },
    render() {
        return <>
            <AUpload list-type={'picture-card'} {...this.$attrs} onPreview={this.handlePreview}
                onSuccess={this.handleChange}
                ref="upload" fileList={this.uploadList} onUpdate:fileList={this.inputRemove}
                v-slots={this.$slots}/>
            <aModal mask={this.previewMask} title={this.modalTitle} visible={this.previewVisible}
                onCancel={() => this.previewVisible = false} footer={null}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </>;
    }
});
