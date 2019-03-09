import Render from "../../../factory/render";
import {errMsg, toString} from "../../../core/util";
import {defaultOnHandle, mount} from "../modal";


const eventList = {onOpen: 'on-open', onChange: 'on-change', onCancel: 'on-cancel', onOk: 'on-ok'};

export default class render extends Render {
    init() {
        this._props = this.handler.rule.props;
        this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
    }

    parse() {
        this.init();
        let type = this._props.type, vNode;
        if (type === 'image')
            vNode = this.makeGroup(this.makeImage());
        else if (type === 'file')
            vNode = this.makeGroup(this.makeFile());
        else
            vNode = this.makeInput();
        return vNode;
    }

    makeInput(hidden) {
        let unique = this.handler.unique, props = this.inputProps().props({
            type: "text",
            value: this.handler.parseValue.toString(),
            icon: this._props.icon,
            readonly: true,
            clearable: true
        }).on('on-click', () => {
            this.showModel();
        }).on('input', () => {
        }).key('ifit' + unique).style({display: hidden === true ? 'none' : 'inline-block'}).get();
        return [this.vNode.input(props)];
    }

    makeGroup(render) {
        let unique = this.handler.unique, field = this.handler.field;
        return [this.vNode.make('div', {
            key: `ifgp1${unique}`,
            class: ['fc-upload', 'fc-frame'],
            ref: this.handler.refName,
            props: {value: this.vm._formData(field)}
        }, render),
            this.makeInput(true)
        ]
    }

    makeImage() {
        let unique = this.handler.unique;
        let vNode = this.handler.parseValue.map((src, index) => {
            return this.vNode.make('div', {key: `ifid1${unique}${index}`, class: ['fc-files']}, [
                this.vNode.make('img', {key: `ifim${unique}${index}`, attrs: {src}}),
                this.makeIcons(src, unique, index)
            ]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    }

    makeFile() {
        let unique = this.handler.unique;
        let vNode = this.handler.parseValue.map((src, index) => {
            return this.vNode.make('div', {key: `iffd2${unique}${index}`, class: ['fc-files']}, [
                this.vNode.icon({key: `iff${unique}${index}`, class: ['el-icon-tickets']}),
                this.makeIcons(src, unique, index)
            ]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    }

    makeBtn() {
        let props = this.handler.rule.props;
        if (props.maxLenth > 0 && this.handler.parseValue.length >= props.maxLenth) return;
        let unique = this.handler.unique;
        return this.vNode.make('div', {
            key: `ifbd3${unique}`, class: ['fc-upload-btn'], on: {
                click: () => {
                    if (props.disabled === true) return;
                    this.showModel();
                }
            }
        }, [
            this.vNode.icon({key: `ifbi3${unique}`, class: [this._props.icon]})
        ])
    }

    makeIcons(src, key, index) {
        if (this.issetIcon === true)
            return this.vNode.make('div', {key: `ifis${key}${index}`, class: ['fc-upload-cover']}, () => {
                let icon = [];
                if (this._props.handleIcon !== false)
                    icon.push(this.makeHandleIcon(src, key, index));
                if (this._props.allowRemove === true)
                    icon.push(this.makeRemoveIcon(src, key, index));
                return icon;
            });
    }

    makeRemoveIcon(src, key, index) {
        return this.vNode.icon({
            key: `ifri${key}${index}`, 'class': ['el-icon-delete'], on: {
                'click': () => {
                    if (this._props.disabled === true) return;
                    if (this.onRemove(src) !== false) {
                        this.handler.parseValue.splice(index, 1);
                        this.sync();
                    }
                }
            }
        });
    }

    makeHandleIcon(src, key, index) {
        let props = this._props;
        return this.vNode.icon({
            key: `ifhi${key}${index}`, class: [toString(props.handleIcon)], on: {
                'click': () => {
                    if (props.disabled === true) return;
                    this.onHandle(src);
                }
            }
        });
    }

    onRemove(src) {
        let fn = this.handler.rule.event['on-remove'];
        if (fn)
            return fn(src, this.handler.getValue());
    }

    onHandle(src) {
        let fn = this.handler.rule.event['on-handle'];
        if (fn)
            return fn(src);
        else
            defaultOnHandle(src, this._props.modalTitle);
    }

    valid(field) {
        if (field !== this.handler.field)
            throw new Error('无效的表单字段' + errMsg());
    }

    showModel() {
        let isShow = false !== this.onOpen(),
            {width, height, src, title, okBtnText, closeBtnText} = this._props;
        if (!isShow) return;

        mount({width, title}, (vNode, _vm) => {
            this.handler.$modal = _vm;
            return [vNode.make('iframe', {
                attrs: {
                    src
                },
                style: {
                    'height': height,
                    'border': "0 none",
                    'width': '100%'
                },
                on: {
                    'load': (e) => {
                        try {
                            if (this.options.iframeHelper === true) {
                                let iframe = e.path[0].contentWindow;

                                iframe[`${this.handler.field}_change`] = (val) => {
                                    this.handler.setValue(val);
                                };


                                iframe[`form_create_helper`] = {
                                    close: (field) => {
                                        this.valid(field);
                                        _vm.onClose();
                                    },
                                    set: (field, value) => {
                                        this.valid(field);
                                        iframe[`${field}_change`](value)

                                    },
                                    get: (field) => {
                                        this.valid(field);
                                        return this.handler.rule.value;
                                    }
                                };

                            }
                        } catch (e) {
                        }
                    }
                },
            }), vNode.make('div', {slot: 'footer'}, [
                vNode.button({
                    on: {
                        click: () => {
                            _vm.onClose();
                            this.onCancel()
                        }
                    }
                }, [toString(closeBtnText)]),
                vNode.button({
                    props: {type: 'primary'}, on: {
                        click: () => {
                            this.onOk() !== false && _vm.onClose();
                        }
                    }
                }, [toString(okBtnText)])
            ])]
        });
    }
}

Object.keys(eventList).forEach(k => {
    render.prototype[k] = function () {
        let fn = this.handler.rule.event[eventList[k]];
        if (fn)
            return fn(this.handler.getValue());
    }
});
