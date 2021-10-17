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
            default: 'el-icon-upload2'
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
        },
        src(n) {
            this.modalVm && (this.modalVm.src = n);
        }
    },
    methods: {
        key(unique) {
            return unique;
        },
        closeModel(close) {
            this.$emit(close ? '$close' : '$ok');
            if (this.reload) {
                this.$off('$ok');
                this.$off('$close');
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

        makeInput() {
            const props = {
                type: 'text',
                value: (this.fileList.map(v => this.getSrc(v))).toString(),
                readonly: true
            };

            return <ElInput props={props} key={this.key('input')}>
                {this.fileList.length ? <i slot="suffix" class="el-input__icon el-icon-circle-close"
                    on-click={() => this.fileList = []}/> : null}
                <ElButton icon={this.icon} on={{'click': () => this.showModel()}} slot="append"/>
            </ElInput>
        },

        makeGroup(children) {
            if (!this.maxLength || this.fileList.length < this.maxLength) {
                children.push(this.makeBtn());
            }
            return <div key={this.key('group')}>{...children}</div>
        },

        makeItem(index, children) {
            return <div class='fc-files' key={this.key('file' + index)}>{...children}</div>;
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
                return <div class='fc-upload-cover' key={this.key('uc')}>{icons}</div>
            }
        },
        makeHandleIcon(val, index) {
            return <i
                class={(this.handleIcon === true || this.handleIcon === undefined) ? 'el-icon-view' : this.handleIcon}
                on-click={() => this.handleClick(val)} key={this.key('hi' + index)}/>
        },

        makeRemoveIcon(val, index) {
            return <i class="el-icon-delete" on-click={() => this.handleRemove(val)} key={this.key('ri' + index)}/>
        },

        makeFiles() {
            return this.makeGroup(this.fileList.map((src, index) => {
                return this.makeItem(index, [<i class="el-icon-tickets"
                    on-click={() => this.handleClick(src)}/>, this.makeIcons(src, index)])
            }))
        },
        makeImages() {
            return this.makeGroup(this.fileList.map((src, index) => {
                return this.makeItem(index, [<img src={this.getSrc(src)}/>, this.makeIcons(src, index)])
            }))
        },
        makeBtn() {
            return <div class='fc-upload-btn' on-click={() => this.showModel()} key={this.key('btn')}>
                <i class={this.icon}/>
            </div>
        },
        handleClick(src) {
            return this.onHandle(src);
        },
        handleRemove(src) {
            if (this.disabled) {
                return;
            }
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
                            this.closeModel();
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

            if (!footer) {
                return;
            }
            return <div slot="footer">
                {closeBtn ? <ElButton
                    on-click={() => (this.onCancel() !== false && (this.frameVisible = false))}>{closeBtnText}</ElButton> : null}
                {okBtn ? <ElButton type="primary"
                    on-click={() => (this.onOk() !== false && this.closeModel())}>{okBtnText}</ElButton> : null}
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
        this.$nextTick(() => {
            if (this.$refs.frame) {
                this.frameLoad(this.$refs.frame.contentWindow || {});
            }
        });
        return <div class="_fc-frame">{node}
            <el-dialog appendToBody={true} modal={this.previewMask} title={modalTitle} visible={this.previewVisible}
                on-close={this.handleCancel}>
                <img alt="example" style="width: 100%" src={this.previewImage}/>
            </el-dialog>
            <el-dialog appendToBody={true} props={{width, title, ...this.modal}} visible={this.frameVisible}
                on-close={() => (this.closeModel(true))}>
                {(this.frameVisible || !this.reload) ? <iframe ref="frame" src={src} frameBorder="0" style={{
                    'height': height,
                    'border': '0 none',
                    'width': '100%'
                }}/> : null}
                {this.makeFooter()}
            </el-dialog>
        </div>
    },
    mounted() {
        this.$on('fc.closeModal', this.closeModal);
    }
}
