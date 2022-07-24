import {defineComponent} from 'vue';

const NAME = 'fcUpload';


function parseFile(file, i) {
    return {
        url: file,
        name: getFileName(file),
        status: 'success',
        uid: i
    };
}

function getFileName(file) {
    return ('' + file).split('/').pop()
}

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
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
            uploadList: this.modelValue.map(parseFile)
        }
    },
    methods: {
        handleRemove({index}) {
            this.uploadList.splice(index, 1)
            this.onRemove && this.onRemove(...arguments)
            this.input()
        },
        handleSuccess({file, fileList}) {
            this.uploadList = fileList;
            if (file.status === 'success') {
                this.onSuccess && this.onSuccess(...arguments)
            }
            this.input()
        },
        input() {
            this.$emit('update:modelValue', this.uploadList.map(v => v.url));
        }
    },
    render() {
        const {
            uploadList,
            handleSuccess, handleRemove, $slots
        } = this
        return <>
            <t-upload
                theme="image"
                accept="image/*"
                modelValue={uploadList}
                {...this.$attrs}
                onSuccess={handleSuccess}
                onRemove={handleRemove}
                v-slots={$slots}
            >
            </t-upload>
        </>
    }
});
