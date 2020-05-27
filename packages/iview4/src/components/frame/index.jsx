import {iviewConfig} from '../../core/config';
import style from '../../style/index.css';
import {isUndef, toArray, uniqueId} from '@form-create/utils';

const NAME = 'fc-ivu-frame';

export default {
    name: NAME,
    props: {
        type: {
            type: String,
            default: 'input'
        },
        field: {
            type: String,
            default: ''
        },
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
            default: iviewConfig.fileUpIcon
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
                this.previewImage = src;
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
        footer: {
            type: Boolean,
            default: true
        },
        reload: {
            type: Boolean,
            default: true
        }

    },
    data() {
        return {
            fileList: toArray(this.value),
            unique: uniqueId(),
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
            this.$emit('on-change', val);
        },
        src(n) {
            this.modalVm && (this.modalVm.src = n);
        }
    },
    methods: {
        key(unique) {
            return NAME + unique + this.unique;
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
            if (this.disabled || false === this.onOpen()) return;
            this.frameVisible = true;
        },

        makeInput() {
            const props = {
                type: 'text',
                value: (this.fileList.map(v => this.getSrc(v))).toString(),
                icon: this.icon,
                readonly: true,
                clearable: false
            };

            return <Input props={props} on={{'on-click': () => this.showModel()}} key={this.key('input')}/>
        },

        makeGroup(children) {
            if (!this.maxLength || this.fileList.length < this.maxLength)
                children.push(this.makeBtn());
            return <div class={style['fc-upload']} key={this.key('group')}>{...children}</div>
        },

        makeItem(index, children) {
            return <div class={style['fc-files']} key={this.key('file' + index)}>{...children}</div>;
        },
        valid(field) {
            if (field !== this.field)
                throw new Error('frame 无效的字段值');
        },

        makeIcons(val, index) {
            if (this.handleIcon !== false || this.allowRemove === true) {
                const icons = [];
                if ((this.type !== 'file' && this.handleIcon !== false) || (this.type === 'file' && this.handleIcon))
                    icons.push(this.makeHandleIcon(val, index));
                if (this.allowRemove)
                    icons.push(this.makeRemoveIcon(val, index));

                return <div class={style['fc-upload-cover']} key={this.key('uc')}>{icons}</div>
            }
        },
        makeHandleIcon(val, index) {
            return <icon
                props={{type: (this.handleIcon === true || this.handleIcon === undefined) ? 'ios-eye-outline' : this.handleIcon}}
                on-click={() => this.handleClick(val)} key={this.key('hi' + index)}/>
        },

        makeRemoveIcon(val, index) {
            return <icon props={{type: 'ios-trash-outline'}} on-click={() => this.handleRemove(val)}
                key={this.key('ri' + index)}/>
        },

        makeFiles() {
            return this.makeGroup(this.fileList.map((src, index) => {
                return this.makeItem(index, [<icon props={{type: iviewConfig.fileIcon, size: 40}}
                    on-click={() => this.handleClick(src)}/>, this.makeIcons(src, index)])
            }))
        },
        makeImages() {
            return this.makeGroup(this.fileList.map((src, index) => {
                return this.makeItem(index, [<img src={this.getSrc(src)}/>, this.makeIcons(src, index)])
            }))
        },
        makeBtn() {
            return <div class={style['fc-upload-btn']} on-click={() => this.showModel()}
                key={this.key('btn')}>
                <icon props={{type: this.icon, size: 20}}/>
            </div>
        },
        handleClick(src) {
            if (this.disabled) return;
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
            return isUndef(this.srcKey) ? src : src[this.srcKey];
        }, frameLoad(e) {
            this.onLoad(e);

            try {
                if (this.helper === true) {
                    let iframe = e.currentTarget.contentWindow;

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
            const {okBtnText, closeBtnText} = this.$props;

            if (!this.footer) return;
            return <div slot="footer">
                <Button on-click={() => (this.onCancel() !== false && this.closeModel(true))}>{closeBtnText}</Button>
                <Button type="primary"
                    on-click={() => (this.onOk() !== false && this.closeModel())}>{okBtnText}</Button>
            </div>
        }
    },
    render() {
        const type = this.type;

        let node;
        if (type === 'input')
            node = this.makeInput();
        else if (type === 'image')
            node = this.makeImages();
        else
            node = this.makeFiles();
        const {width, height, src, title, modalTitle} = this.$props;
        return <div>{node}
            <Modal title={modalTitle} v-model={this.previewVisible} on-close={this.handleCancel}>
                <img alt="example" style="width: 100%" src={this.previewImage}/>
            </Modal>
            <Modal props={{width, title, ...this.modal}} v-model={this.frameVisible}
                on-close={() => (this.closeModel(true))}>
                {(this.frameVisible || !this.reload) ? <iframe src={src} frameBorder="0" style={{
                    'height': height,
                    'border': '0 none',
                    'width': '100%'
                }} on-load={this.frameLoad}/> : null}
                {this.makeFooter()}
            </Modal>
        </div>
    }
}
