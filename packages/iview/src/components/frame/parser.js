import {BaseParser} from '@form-create/core';
import {$set, errMsg, isUndef, toString} from '@form-create/utils';
import {iviewConfig} from '../../config';
import {defaultOnHandle, mount} from '../../modal';


export function parseRule(rule) {
    let props = rule.props;
    if (!props.type) $set(props, 'type', 'input');
    if (!props.icon) $set(props, 'icon', iviewConfig.fileUpIcon);
    if (!props.width) $set(props, 'width', '500px');
    if (!props.height) $set(props, 'height', '370px');
    if (isUndef(props.spin)) $set(props, 'spin', true);
    if (!props.title) $set(props, 'title', '请选择' + rule.title);
    if (!props.maxLength) $set(props, 'maxLength', 0);

    if (!props.okBtnText) $set(props, 'okBtnText', '确定');
    if (!props.closeBtnText) $set(props, 'closeBtnText', '关闭');
    if (!props.modalTitle) $set(props, 'modalTitle', '预览');
    if (!props.loadingText) $set(props, 'loadingText', '加载中...');

    let handleIcon = props.handleIcon;
    if (props.type === 'file' && props.handleIcon === undefined)
        handleIcon = false;
    else
        handleIcon = (props.handleIcon === true || props.handleIcon === undefined) ? 'ios-eye-outline' : props.handleIcon;
    $set(props, 'handleIcon', handleIcon);
    if (props.allowRemove === undefined) $set(props, 'allowRemove', true);

}


const eventList = {onOpen: 'on-open', onChange: 'on-change', onCancel: 'on-cancel', onOk: 'on-ok'};

//TODO children 属性
export default class Parser extends BaseParser {
    init() {
        parseRule(this.rule);
    }

    toFormValue(value) {
        let parseValue, oldValue = value, isArr = Array.isArray(oldValue);
        if (oldValue === '')
            parseValue = [];
        else if (!isArr)
            parseValue = [oldValue];
        else
            parseValue = oldValue;
        this.parseValue = parseValue;
        return parseValue;
    }

    toValue(parseValue) {
        return this.rule.props.maxLength != 1
            ? parseValue
            : (parseValue[0] === undefined
                ? ''
                : parseValue[0]);
    }

    watchValue(n) {
        this.onChange(n);
    }

    watchFormValue(n) {
        this.parseValue = n;
    }

    render(children) {
        this._props = this.rule.props;
        this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
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
        let unique = this.unique, props = this.r.inputVData(this).props({
            type: 'text',
            value: this.parseValue.toString(),
            icon: this._props.icon,
            readonly: true,
            clearable: true
        }).on('on-click', () => {
            this.showModel();
        }).on('input', () => {
        }).key('ifit' + unique).class('__fc_h', hidden === true);
        return [this.vNode.input(props)];
    }

    makeGroup(render) {
        let unique = this.unique, field = this.field;
        return [this.vNode.make('div', {
            key: `ifgp1${unique}`,
            class: {'fc-upload fc-frame': true},
            ref: this.refName,
            props: {value: this.vm._formData(field)}
        }, render),
        this.makeInput(true)
        ]
    }

    makeImage() {
        let unique = this.unique;
        let vNode = this.parseValue.map((src, index) => {
            return this.vNode.make('div', {key: `ifid1${unique}${index}`, class: {'fc-files': true}}, [
                this.vNode.make('img', {key: `ifim${unique}${index}`, attrs: {src}}),
                this.makeIcons(src, unique, index)
            ]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    }

    makeFile() {
        let unique = this.unique;
        let vNode = this.parseValue.map((src, index) => {
            return this.vNode.make('div', {key: `iffd2${unique}${index}`, class: {'fc-files': true}}, [
                this.vNode.icon({key: `iff${unique}${index}`, props: {type: iviewConfig.fileIcon, size: 40}}),
                this.makeIcons(src, unique, index)
            ]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    }

    makeBtn() {
        let props = this.rule.props;
        if (props.maxLength > 0 && this.parseValue.length >= props.maxLength) return;
        let unique = this.unique;
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
        let unique = this.unique;
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
                        this.parseValue.splice(index, 1);
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
        let fn = this.rule.event['on-remove'];
        if (fn)
            return fn(src, this.getValue());
    }

    onHandle(src) {
        if (this._props.disabled === true) return;
        let fn = this.rule.event['on-handle'];
        if (fn)
            return fn(src);
        else
            defaultOnHandle(src, this._props.modalTitle);
    }

    valid(field) {
        if (field !== this.field)
            throw new Error('无效的表单字段' + errMsg());
    }

    onCloseModal() {
        this.$modal.onClose();
        this.$modal = null;
    }

    showModel() {
        let isShow = false !== this.onOpen(),
            {width, height, src, title, okBtnText, closeBtnText} = this._props;
        if (!isShow) return;

        mount({width, title}, (vNode, _vm) => {
            this.$modal = _vm;
            return [this.makeSpin(vNode), vNode.make('iframe', {
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
                        const spin = _vm.$refs.spin;
                        if (spin)
                            spin.$el.parentNode.removeChild(spin.$el);
                        try {
                            if (this.options.iframeHelper === true) {
                                let iframe = e.path[0].contentWindow;

                                iframe[`${this.field}_change`] = (val) => {
                                    this.setValue(val);
                                };


                                iframe['form_create_helper'] = {
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
                                        return this.rule.value;
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
    Parser.prototype[k] = function () {
        let fn = this.rule.event[eventList[k]];
        if (fn)
            return fn(this.handle.getValue(this.type));
    }
});

