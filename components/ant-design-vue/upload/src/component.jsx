import toString from '@form-create/utils/lib/tostring';
import deepExtend from '@form-create/utils/lib/deepextend';
import toArray from '@form-create/utils/lib/toarray';
import getSlot from '@form-create/utils/lib/slot';

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

export default {
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
        formCreateInject: {
            type: Object,
            required: true,
        },
        value: {
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
    data() {
        const fileList = this.value.map(parseFile);
        return {
            defaultUploadList: fileList,
            previewImage: '',
            previewVisible: false,
            uploadList: fileList.map(parseUpload)
        };
    },
    watch: {
        value(n) {
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
            this.$emit('input', this.uploadList.map(v => v.url));
        },

    },
    render() {
        const isShow = (!this.limit || this.limit > this.uploadList.length);
        const ctx = {...this.formCreateInject.prop};
        ctx.on = deepExtend({}, ctx.on || {});
        return <div class='_fc-upload'>
            <AUpload {...ctx}
                {...{
                    on: {
                        preview: this.onHandle.bind(this),
                        change: this.handleChange.bind(this),
                    },
                    props: {
                        defaultFileList: this.defaultUploadList
                    },
                    ref: 'upload'
                }}>
                {isShow ? <template slot="default">{this.$slots.default ||
                    <AIcon type="plus"/>}</template> : null}{getSlot(this.$slots, ['default'])}
            </AUpload>
            <aModal props={{mask: this.previewMask, title: this.modalTitle, footer: null}}
                v-model={this.previewVisible}>
                <img style="width: 100%" src={this.previewImage}/>
            </aModal>
        </div>;
    },
    mounted(){
        this.$emit('fc.el', this.$refs.upload);
    }
}
