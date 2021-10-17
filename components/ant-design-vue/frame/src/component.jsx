import toArray from '@form-create/utils/lib/toarray';
import './style.css';

const NAME = 'fcFrame';

export default {
    name: NAME,
    props: {
        formCreateInject: {
            type: Object,
            required: true,
        },
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
            default: 'folder'
        },
        width: {
            type: [Number, String],
            default: 500
        },
        height: {
            type: [Number, String],
            default: 370
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
            default: undefined
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
        onHandle: {
            type: Function,
            default(src) {
                this.previewImage = this.getSrc(src);
                this.previewVisible = true;
            }
        },
        modal: {
            type: Object,
            default: () => ({})
        },
        srcKey: {
            type: [String, Number]
        },
        value: [Array, String, Number, Object],
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

    },
    data() {
        return {
            fileList: toArray(this.value),
            previewVisible: false,
            frameVisible: false,
            previewImage: ''
        }
    },
    watch: {
        value(n) {
            this.fileList = toArray(n);
        },
        fileList(n) {
            const val = this.maxLength === 1 ? (n[0] || '') : n;
            this.$emit('input', val);
            this.$emit('change', val);
        }
    },
    methods: {
        key(unique) {
            return unique;
        },
        closeModal(close) {
            this.$emit(close ? '$close' : '$ok');
            if (this.reload) {
                this.$off('$ok');
                this.$off('$close');
            }
            this.frameVisible = false;
        },

        showModal() {
            if (this.disabled || false === this.onOpen()) return;
            this.frameVisible = true;
        },

        makeInput() {
            const props = {
                type: 'text',
                value: (this.fileList.map(v => this.getSrc(v))).toString(),
                readonly: true
            };

            return <AInput props={props} key={this.key('input')}>
                <AIcon type={this.icon} slot="addonAfter" on-click={this.showModal}/>
                {this.fileList.length ?
                    <AIcon type="close-circle" slot="suffix" on-click={() => this.fileList = []}/> : null}
            </AInput>
        },

        makeGroup(children) {
            if (!this.maxLength || this.fileList.length < this.maxLength)
                children.push(this.makeBtn());
            return <div key={this.key('group')}>{...children}</div>
        },

        makeItem(index, children) {
            return <div class='fc-files' key={this.key('file' + index)}>{...children}</div>;
        },
        valid(f) {
            const field = this.formCreateInject.field || this.field;
            if (field && f !== field)
                throw new Error('[frame]无效的字段值');
        },

        makeIcons(val, index) {
            if (this.handleIcon !== false || this.allowRemove === true) {
                const icons = [];
                if ((this.type !== 'file' && this.handleIcon !== false) || (this.type === 'file' && this.handleIcon))
                    icons.push(this.makeHandleIcon(val, index));
                if (this.allowRemove)
                    icons.push(this.makeRemoveIcon(val, index));

                return <div class='fc-upload-cover' key={this.key('uc')}>{icons}</div>
            }
        },
        makeHandleIcon(val, index) {
            return <AIcon
                type={(this.handleIcon === true || this.handleIcon === undefined) ? 'eye-o' : this.handleIcon}
                on-click={() => this.handleClick(val)} key={this.key('hi' + index)}/>
        },

        makeRemoveIcon(val, index) {
            return <AIcon type="delete" on-click={() => this.handleRemove(val)} key={this.key('ri' + index)}/>
        },

        makeFiles() {
            return this.makeGroup(this.fileList.map((src, index) => {
                return this.makeItem(index, [<AIcon type="file"
                    on-click={() => this.handleClick(src)}/>, this.makeIcons(src, index)])
            }))
        },
        makeImages() {
            return this.makeGroup(this.fileList.map((src, index) => {
                return this.makeItem(index, [<img src={this.getSrc(src)}/>, this.makeIcons(src, index)])
            }))
        },
        makeBtn() {
            return <div class='fc-upload-btn' on-click={() => this.showModal()} key={this.key('btn')}>
                <AIcon type={this.icon} theme="filled"/>
            </div>
        },
        handleClick(src) {
            return this.onHandle(src);
        },
        handleRemove(src) {
            if (this.disabled) return;
            if (false !== this.onBeforeRemove(src)) {
                this.fileList.splice(this.fileList.indexOf(src), 1);
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
                        close: (field) => {
                            this.valid(field);
                            this.closeModal();
                        },
                        set: (field, value) => {
                            this.valid(field);
                            if (!this.disabled)
                                this.$emit('input', value);

                        },
                        get: (field) => {
                            this.valid(field);
                            return this.value;
                        },
                        onOk: fn => this.$on('$ok', fn),
                        onClose: fn => this.$on('$close', fn)
                    };

                }
            } catch (e) {
                console.log(e);
            }
        },
        makeFooter() {
            const {okBtnText, closeBtnText, closeBtn, okBtn, footer} = this.$props;

            const node = [];
            if (!footer) return node;

            if (closeBtn)
                node.push(<AButton
                    on-click={() => (this.onCancel() !== false && this.closeModal(true))}>{closeBtnText}</AButton>);
            if (okBtn)
                node.push(<AButton type="primary"
                    on-click={() => (this.onOk() !== false && this.closeModal())}>{okBtnText}</AButton>);
            return node;
        }
    },
    render() {
        const type = this.type;
        let Node;
        if (type === 'input')
            Node = this.makeInput();
        else if (type === 'image')
            Node = this.makeImages();
        else
            Node = this.makeFiles();

        const {width = '30%', height, src, title, modalTitle} = this.$props;
        this.$nextTick(() => {
            if (this.$refs.frame) {
                this.frameLoad(this.$refs.frame.contentWindow || {});
            }
        });
        return <div class="_fc-frame">{Node}
            <aModal mask={this.previewMask} title={modalTitle} v-model={this.previewVisible} footer={null}>
                <img alt="example" style="width: 100%" src={this.previewImage}/>
            </aModal>
            <aModal props={{width, title, ...this.modal}} visible={this.frameVisible}
                on-cancel={() => (this.closeModal(true))}>
                {(this.frameVisible || !this.reload) ? <iframe ref="frame" src={src} frameborder="0" style={{
                    'height': height,
                    'border': '0 none',
                    'width': '100%'
                }}/> : null}
                <div slot="footer">
                    {this.makeFooter()}
                </div>
            </aModal>
        </div>
    },
    mounted() {
        this.$on('fc.closeModal', this.closeModal);
    }
}
