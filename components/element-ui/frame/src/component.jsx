import toArray from '@form-create/utils/lib/toarray';
import Mitt from '@form-create/utils/lib/mitt';
import {defineComponent, nextTick, resolveComponent} from 'vue';
import './style.css';
import IconCircleClose from './IconCircleClose.vue';
import IconDocument from './IconDocument.vue';
import IconDelete from './IconDelete.vue';
import IconView from './IconView.vue';
import IconFolderOpened from './IconFolderOpened.vue';

const NAME = 'fcFrame';

export default defineComponent({
    name: NAME,
    props: {
        type: {
            type: String,
            default: 'input'
        },
        field: String,
        helper: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        src: {
            type: String,
            required: true
        },
        icon: {
            type: String,
            default: 'IconFolderOpened'
        },
        width: {
            type: String,
            default: '500px'
        },
        height: {
            type: String,
            default: '370px'
        },
        maxLength: {
            type: Number,
            default: 0
        },
        okBtnText: {
            type: String,
            default: '确定'
        },
        closeBtnText: {
            type: String,
            default: '关闭'
        },
        modalTitle: String,
        handleIcon: {
            type: [String, Boolean],
            default: undefined,
        },
        title: String,
        allowRemove: {
            type: Boolean,
            default: true
        },
        onOpen: {
            type: Function,
            default: () => {
            }
        },
        onOk: {
            type: Function,
            default: () => {
            }
        },
        onCancel: {
            type: Function,
            default: () => {
            }
        },
        onLoad: {
            type: Function,
            default: () => {
            }
        },
        onBeforeRemove: {
            type: Function,
            default: () => {
            }
        },
        onRemove: {
            type: Function,
            default: () => {
            }
        },
        onHandle: Function,
        modal: {
            type: Object,
            default: () => ({})
        },
        srcKey: [String, Number],
        modelValue: [Array, String, Number, Object],
        previewMask: undefined,
        footer: {
            type: Boolean,
            default: true
        },
        reload: {
            type: Boolean,
            default: true
        },
        closeBtn: {
            type: Boolean,
            default: true
        },
        okBtn: {
            type: Boolean,
            default: true
        },
        formCreateInject: Object,
    },
    emits: ['update:modelValue', 'change'],
    components: {
        IconFolderOpened,
        IconView,
    },
    data() {
        return {
            fileList: toArray(this.modelValue),
            previewVisible: false,
            frameVisible: false,
            previewImage: '',
            bus: new Mitt()
        }
    },
    watch: {
        modelValue(n) {
            this.fileList = toArray(n);
        }
    },
    methods: {
        close() {
            this.closeModel(true);
        },
        closeModel(close) {
            this.bus.$emit(close ? '$close' : '$ok');
            if (this.reload) {
                this.bus.$off('$ok');
                this.bus.$off('$close');
            }
            this.frameVisible = false;
        },
        handleCancel() {
            this.previewVisible = false;
        },

        showModel() {
            if (this.disabled || false === this.onOpen()) {
                return;
            }
            this.frameVisible = true;
        },
        input() {
            const n = this.fileList;
            const val = this.maxLength === 1 ? (n[0] || '') : n;
            this.$emit('update:modelValue', val);
            this.$emit('change', val);
        },
        makeInput() {
            return <ElInput {...{
                type: 'text',
                modelValue: (this.fileList.map(v => this.getSrc(v))).toString(),
                readonly: true
            }} key={1} v-slots={{
                append: () => <ElButton icon={resolveComponent(this.icon)} onClick={() => this.showModel()}/>,
                suffix: () => this.fileList.length && !this.disabled ?
                    <ElIcon class="el-input__icon _fc-upload-icon" onClick={() => {
                        this.fileList = [];
                        this.input();
                    }}>
                        <IconCircleClose/>
                    </ElIcon> : null
            }}/>
        },
        makeGroup(children) {
            if (!this.maxLength || this.fileList.length < this.maxLength) {
                children.push(this.makeBtn());
            }
            return <div key={2}>{children}</div>
        },

        makeItem(index, children) {
            return <div class="_fc-files" key={'3' + index}>{children}</div>;
        },
        valid(f) {
            const field = this.formCreateInject.field || this.field;
            if (field && f !== field) {
                throw new Error('[frame]无效的字段值');
            }
        },
        makeIcons(val, index) {
            if (this.handleIcon !== false || this.allowRemove === true) {
                const icons = [];
                if ((this.type !== 'file' && this.handleIcon !== false) || (this.type === 'file' && this.handleIcon)) {
                    icons.push(this.makeHandleIcon(val, index));
                }
                if (this.allowRemove) {
                    icons.push(this.makeRemoveIcon(val, index));
                }
                return <div class="_fc-upload-cover" key={4}>{icons}</div>
            }
        },
        makeHandleIcon(val, index) {
            const Type = resolveComponent((this.handleIcon === true || this.handleIcon === undefined) ? 'icon-view' : this.handleIcon);
            return <ElIcon onClick={() => this.handleClick(val)} key={'5' + index}><Type/></ElIcon>
        },

        makeRemoveIcon(val, index) {
            return <ElIcon onClick={() => this.handleRemove(val)} key={'6' + index}>
                <IconDelete/>
            </ElIcon>
        },

        makeFiles() {
            return this.makeGroup(this.fileList.map((src, index) => {
                return this.makeItem(index, [<ElIcon onClick={() => this.handleClick(src)}>
                    <IconDocument/>
                </ElIcon>, this.makeIcons(src, index)])
            }))
        },
        makeImages() {
            return this.makeGroup(this.fileList.map((src, index) => {
                return this.makeItem(index, [<img src={this.getSrc(src)}/>, this.makeIcons(src, index)])
            }))
        },
        makeBtn() {
            const Type = resolveComponent(this.icon);
            return <div class="_fc-upload-btn" onClick={() => this.showModel()} key={7}>
                <ElIcon><Type/></ElIcon>
            </div>
        },
        handleClick(src) {
            if (this.onHandle) {
                return this.onHandle(src);
            } else {
                this.previewImage = this.getSrc(src);
                this.previewVisible = true;
            }
        },
        handleRemove(src) {
            if (this.disabled) {
                return;
            }
            if (false !== this.onBeforeRemove(src)) {
                this.fileList.splice(this.fileList.indexOf(src), 1);
                this.input();
                this.onRemove(src);
            }
        },
        getSrc(src) {
            return !this.srcKey ? src : src[this.srcKey];
        },
        frameLoad(iframe) {
            this.onLoad(iframe);
            try {
                if (this.helper === true) {
                    iframe['form_create_helper'] = {
                        api: this.formCreateInject.api,
                        close: (field) => {
                            this.valid(field);
                            this.closeModel();
                        },
                        set: (field, value) => {
                            this.valid(field);
                            !this.disabled && this.$emit('update:modelValue', value);
                        },
                        get: (field) => {
                            this.valid(field);
                            return this.modelValue;
                        },
                        onOk: fn => this.bus.$on('$ok', fn),
                        onClose: fn => this.bus.$on('$close', fn)
                    };

                }
            } catch (e) {
                console.error(e);
            }
        },
        makeFooter() {
            const {okBtnText, closeBtnText, closeBtn, okBtn, footer} = this.$props;

            if (!footer) {
                return;
            }
            return <div>
                {closeBtn ? <ElButton
                    onClick={() => (this.onCancel() !== false && (this.frameVisible = false))}>{closeBtnText}</ElButton> : null}
                {okBtn ? <ElButton type="primary"
                    onClick={() => (this.onOk() !== false && this.closeModel())}>{okBtnText}</ElButton> : null}
            </div>
        }
    },
    render() {
        const type = this.type;

        let node;
        if (type === 'input') {
            node = this.makeInput();
        } else if (type === 'image') {
            node = this.makeImages();
        } else {
            node = this.makeFiles();
        }

        const {width = '30%', height, src, title, modalTitle} = this.$props;
        nextTick(() => {
            if (this.$refs.frame) {
                this.frameLoad(this.$refs.frame.contentWindow || {});
            }
        });
        return <div class={{'_fc-frame': true, '_fc-disabled': this.disabled}}>{node}
            <ElDialog appendToBody={true} modal={this.previewMask} title={modalTitle} modelValue={this.previewVisible}
                onClose={this.handleCancel}>
                <img style="width: 100%" src={this.previewImage}/>
            </ElDialog>
            <ElDialog appendToBody={true} {...{width, title, ...this.modal}} modelValue={this.frameVisible}
                onClose={() => (this.closeModel(true))} v-slots={{
                    footer: () => this.makeFooter()
                }}>
                {(this.frameVisible || !this.reload) ? <iframe ref="frame" src={src} frameBorder="0" style={{
                    height,
                    'border': '0 none',
                    'width': '100%'
                }}/> : null}</ElDialog>
        </div>
    },
    beforeMount() {
        const {name, field, api} = this.formCreateInject;
        name && api.on('fc:closeModal:' + name, this.close);
        field && api.on('fc:closeModal:' + field, this.close);
    },
    beforeUnmount() {
        const {name, field, api} = this.formCreateInject;
        name && api.off('fc:closeModal:' + name, this.close);
        field && api.off('fc:closeModal:' + field, this.close);
    }
})
