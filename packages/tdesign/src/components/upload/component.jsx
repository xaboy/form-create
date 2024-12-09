import {defineComponent} from 'vue';
import toArray from '@form-create/utils/lib/toarray';

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
    formCreateParser: {
        toFormValue(value) {
            return toArray(value);
        },
        toValue(formValue, ctx) {
            return ctx.prop.props.max === 1 ? (formValue[0] || '') : formValue;
        }
    },
    props: {
        max: {
            type: Number,
            default: 0
        },
        formCreateInject: Object,
        value: {
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
    emits: ['input', 'fc.el'],
    data() {
        return {
            uploadList: toArray(this.value).map(parseFile)
        }
    },
    watch: {
        value(n) {
            this.uploadList = toArray(n).map(parseFile)
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
            this.$emit('input', this.uploadList.map(v => v.url));
        }
    },
    render() {
        const {
            uploadList,
            handleSuccess, handleRemove, $slots
        } = this
        return <div class="_fc-upload">
            <t-upload
                props={{max: this.max, value: uploadList, accept: 'image/*', theme: 'image',...this.formCreateInject.prop.props,...this.$attrs}}
                on={{
                    success: handleSuccess,
                    remove: handleRemove,
                }}
                scopedSlots={$slots}
                ref="el"
            >
            </t-upload>
        </div>
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
});
