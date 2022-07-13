import {defineComponent} from 'vue';

const NAME = 'fcUpload';

import {parseFile, parseUpload} from '@form-create/utils/lib/file'

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        action: String,
        theme: String,
        accept: String,
        multiple: Boolean,
        limit: {
            type: Number,
            default: 0
        },
        modelValue: {
            type: Array,
            default: []
        },
        onSuccess: {
            type: Function,
        },
        onRemove: {
            type: Function,
        },
    },
    data() {
        return {
            uploadList: []
        }
    },
    watch: {
        modelValue(n) {
            this.uploadList = n.map(parseFile).map(parseUpload)
        }
    },
    methods: {
        handleRemove({file, index}) {
            this.uploadList.splice(index, 1)
            this.onRemove && this.onRemove(file, this.uploadList)
            this.input()
        },
        handleSuccess({file, fileList}) {
            this.uploadList = fileList;
            const {onSuccess} = this
            if (file.status === 'success') {
                onSuccess && onSuccess(file, this.uploadList)
            }
            this.input()
            this.$emit('change', ...arguments);
        },
        input() {
            this.$emit('update:modelValue', this.uploadList.map(v => v.url));
        }
    },
    render() {
        const {
            action, theme = 'image', accept = 'image/*',
            multiple, limit, uploadList,
            handleSuccess, handleRemove, $slots
        } = this
        return <>
            <t-upload
                action={action}
                theme={theme}
                accept={accept}
                multiple={multiple}
                max={limit}
                modelValue={uploadList}
                onSuccess={handleSuccess}
                onRemove={handleRemove}
                v-slots={$slots}
            >
            </t-upload>
        </>
    }
});
