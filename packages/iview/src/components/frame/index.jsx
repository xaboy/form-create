import {iviewConfig} from '../../core/config';
import {defaultOnHandle, mount} from '../../core/modal';
import style from '../../style/index.css';
import {toArray} from '@form-create/utils';
//组件不依赖 iviewConfig
export default {
    name: 'fc-iview-frame',
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
        modalTitle: {
            type: String,
            default: '预览'
        },
        handleIcon: {
            type: [String, Boolean],
            default: ''
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
                defaultOnHandle(src, this.modalTitle)
            }
        },
        modal: {
            type: Object,
            default: () => ({})
        },
        value: [Array, String, Number]

    },
    data() {
        return {
            modalVm: null,
            fileList: toArray(this.value)
        }
    },
    watch: {
        value(n) {
            this.$emit('on-change', n);
            this.fileList = toArray(n);
        },
        fileList(n) {
            this.$emit('input', this.maxLength === 1 ? (n[0] || '') : n);
        }
    },
    methods: {

        closeModel() {
            this.modalVm && this.modalVm.onClose();
            this.modalVm = null;
        },

        showModel() {
            if (this.disabled || false === this.onOpen()) return;

            const {width, height, src, title, okBtnText, closeBtnText} = this.$props;

            mount({width, title, ...this.modal}, (vNode, _vm) => {
                this.modalVm = _vm;
                return [vNode.make('iframe', {
                    attrs: {
                        src
                    },
                    style: {
                        'height': height,
                        'border': '0 none',
                        'width': '100%'
                    },
                    on: {
                        'load': (e) => {
                            this.onLoad(e);

                            try {
                                if (this.helper === true) {
                                    let iframe = e.path[0].contentWindow;

                                    iframe['form_create_helper'] = {
                                        close: (field) => {
                                            this.valid(field);
                                            _vm.onClose();
                                        },
                                        set: (field, value) => {
                                            this.valid(field);
                                            if (!this.disabled)
                                                this.$emit('input', value);

                                        },
                                        get: (field) => {
                                            this.valid(field);
                                            return this.value;
                                        }
                                    };

                                }
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    },
                }), vNode.make('div', {slot: 'footer'}, [
                    vNode.button({
                        on: {
                            click: () => {

                                this.onCancel() !== false && _vm.onClose();
                            }
                        }
                    }, [closeBtnText]),
                    vNode.button({
                        props: {type: 'primary'}, on: {
                            click: () => {
                                this.onOk() !== false && _vm.onClose();
                            }
                        }
                    }, [okBtnText])
                ])]
            });
        },

        makeInput() {
            const props = {
                type: 'text',
                value: this.fileList.toString(),
                icon: this.icon,
                readonly: true,
                clearable: false
            };

            return <Input props={props} on={{'on-click': () => this.showModel()}}/>
        },

        makeGroup(children) {
            if (!this.maxLength || this.fileList.length < this.maxLength)
                children.push(this.makeBtn());
            return <div class={style['fc-upload']}>{...children}</div>
        },

        makeItem(children) {
            return <div class={style['fc-files']}>{...children}</div>;
        },
        valid(field) {
            if (field !== this.field)
                throw new Error('frame 无效的字段值');
        },

        makeIcons(val) {
            if (this.handleIcon !== false || this.allowRemove === true) {
                const icons = [];
                if ((this.type !== 'file' && this.handleIcon !== false) || (this.type === 'file' && this.handleIcon))
                    icons.push(this.makeHandleIcon(val));
                if (this.allowRemove)
                    icons.push(this.makeRemoveIcon(val));

                return <div class={style['fc-upload-cover']}>{icons}</div>
            }
        },
        makeHandleIcon(val) {
            return <icon
                props={{type: (this.handleIcon === true || this.handleIcon === undefined) ? 'ios-eye-outline' : this.handleIcon}}
                on-click={() => this.handleClick(val)}/>
        },

        makeRemoveIcon(val) {
            return <icon props={{type: 'ios-trash-outline'}} on-click={() => this.handleRemove(val)}/>
        },

        makeFiles() {
            return this.makeGroup(this.fileList.map(src => {
                return this.makeItem([<icon props={{type: iviewConfig.fileIcon, size: 40}}
                    on-click={() => this.handleClick(src)}/>, this.makeIcons(src)])
            }))
        },
        makeImages() {
            return this.makeGroup(this.fileList.map(src => {
                return this.makeItem([<img src={src}/>, this.makeIcons(src)])
            }))
        },
        makeBtn() {
            return <div class={style['fc-upload-btn']} on-click={() => this.showModel()}>
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
        }
    },
    render() {
        const type = this.type;

        if (type === 'input')
            return this.makeInput();
        else if (type === 'image')
            return this.makeImages();
        else
            return this.makeFiles();
    }
}
