import Render from "../../../factory/render";
import {errMsg, toString} from "../../../core/util";
import {iviewConfig} from "../config";
import iview from 'iview';
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
        }).key('ifit' + unique).class('__fc_h', hidden === true).get();
        return [this.vNode.input(props)];
    }

    makeGroup(render) {
        let unique = this.handler.unique, field = this.handler.field;
        return [this.vNode.make('div', {
            key: `ifgp1${unique}`,
            class: {'fc-upload fc-frame': true},
            ref: this.handler.refName,
            props: {value: this.vm._formData(field)}
        }, render),
            this.makeInput(true)
        ]
    }

    makeImage() {
        let unique = this.handler.unique;
        let vNode = this.handler.parseValue.map((src, index) => {
            return this.vNode.make('div', {key: `ifid1${unique}${index}`, class: {'fc-files': true}}, [
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
            return this.vNode.make('div', {key: `iffd2${unique}${index}`, class: {'fc-files': true}}, [
                this.vNode.icon({key: `iff${unique}${index}`, props: {type: iviewConfig.fileIcon, size: 40}}),
                this.makeIcons(src, unique, index)
            ]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    }

    makeBtn() {
        let props = this.handler.rule.props;
        if (props.maxLength > 0 && this.handler.parseValue.length >= props.maxLength) return;
        let unique = this.handler.unique;
        return this.vNode.make('div', {
            key: `ifbd3${unique}`, class: {'fc-upload-btn': true}, on: {
                click: () => {
                    if (props.disabled === true) return;
                    this.showModel();
                }
            }
        }, [
            this.vNode.icon({key: `ifbi3${unique}`, props: {type: this._props.icon, size: 20}})
        ])
    }

    makeSpin(vNode) {
        if (true !== this._props.spin) return;
        let unique = this.handler.unique;
        return vNode.make('Spin', {
            props: {fix: true},
            key: 'ifsp' + unique,
            ref: 'spin',
            class: {
                'fc-spin': true
            }
        }, [
            vNode.icon({
                props: {
                    type: 'load-c',
                    size: 18
                },
                class: {
                    'fc-spin-icon-load': true
                },
                key: 'ifspi' + unique
            }),
            vNode.make('div', {
                domProps: {
                    innerHTML: toString(this._props.loadingText)
                },
                key: 'ifspd' + unique
            })
        ])
    }

    makeIcons(src, key, index) {
        if (this.issetIcon === true)
            return this.vNode.make('div', {key: `ifis${key}${index}`, class: {'fc-upload-cover': true}}, () => {
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
            key: `ifri${key}${index}`, props: {type: 'ios-trash-outline'}, nativeOn: {
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
            key: `ifhi${key}${index}`, props: {type: toString(props.handleIcon)}, nativeOn: {
                'click': () => {
                    if (props.disabled === true) return;
                    this.onHandle(src);
                }
            }
        });
    }

    onRemove(src) {
        if (this._props.disabled === true) return;
        let fn = this.handler.rule.event['on-remove'];
        if (fn)
            return fn(src, this.handler.getValue());
    }

    onHandle(src) {
        if (this._props.disabled === true) return;
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
            return [this.makeSpin(vNode), vNode.make('iframe', {
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
                        const spin = _vm.$refs.spin;
                        if (spin)
                            spin.$el.parentNode.removeChild(spin.$el);
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
