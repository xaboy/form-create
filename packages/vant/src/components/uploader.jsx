import {defineComponent, ref, toRef, watch} from 'vue';
import toArray from '@form-create/utils/lib/toarray';

const NAME = 'fcUploader';

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

function getFileName(file) {
    return ('' + file).split('/').pop()
}

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        value: Array,
        afterRead: Function,
        action: String,
        headers: Object,
        method: String,
        multiple: Boolean,
        data: Object,
        uploadName: String,
        onSuccess: Function,
        onError: Function,
        maxCount: Number,
    },
    emits: ['input', 'delete'],
    setup(props, _) {

        const afterRead = toRef(props, 'afterRead');
        const modelValue = toRef(props, 'value', []);

        const fileList = ref(toArray(modelValue.value).map(parseFile).map(parseUpload));

        watch(() => modelValue.value, (n) => {
            fileList.value = toArray(n).map(parseFile).map(parseUpload);
        })

        const uploadValue = () => {
            let files = fileList.value.map((v) => v.is_string ? v.url : (v.value || v.url)).filter((url) => url !== undefined);
            _.emit('input', props.maxCount === 1 ? (files[0] || '') : files);
        };

        const uploadFile = (file, onSuccess) => {
            file.status = 'uploading';
            if (afterRead.value) {
                return afterRead.value(file);
            } else {
                const data = {...props.data || {}};
                data[props.uploadName || 'file'] = file.file;
                props.formCreateInject.api.fetch({
                    action: props.action,
                    dataType: 'formData',
                    source: 'upload',
                    headers: props.headers || {},
                    method: props.method || 'post',
                    data
                }).then(res => {
                    file.status = 'success';
                    props.onSuccess && props.onSuccess(res, file);
                    onSuccess(true);
                }).catch(e => {
                    onSuccess(false);
                    file.status = 'failed';
                    file.message = props.formCreateInject.t('uploadFail') || '上传失败';
                    props.onError && props.onError(e, file);
                });
            }
        }



        return {
            fileList,
            modelValue,
            onDelete(file) {
                uploadValue();
                _.emit('delete', file);
            },
            uploadFiles(file) {
                const files = Array.isArray(file) ? file : [file];
                Promise.all(files.map((file) => {
                    return new Promise(resolve => {
                        uploadFile(file, resolve);
                    })
                })).then((res) => {
                    if(res.filter((item) => !!item).length > 0) {
                        uploadValue();
                    }
                });
            },
            uploadFile
        }
    },
    render() {
        return <van-uploader {...this.formCreateInject.prop} multiple={this.multiple} fileList={this.fileList} maxCount={this.maxCount}
            onInput={(v) => this.fileList = v} scopedSlots={this.$scopedSlots}
            afterRead={this.uploadFiles} onDelete={this.onDelete}/>
    }

});
