import Handler from "../../factory/handler";
import Render from "../../factory/render";
import {$set, errMsg, isUndef, uniqueId} from "../../core/util";
import upload from './upload';
import {iviewConfig} from "./install";
import {creatorTypeFactory} from "../../factory/creator";
import iview from 'iview';

const name = "frame";

export function parseRule(rule) {
    let props = rule.props;
    if (!props.type) $set(props, 'type', 'input');
    if (!props.icon) $set(props, 'icon', iviewConfig.fileUpIcon);
    if (!props.width) $set(props, 'width', '500px');
    if (!props.height) $set(props, 'height', '370px');
    if (isUndef(props.spin)) $set(props, 'spin', true);
    if (!props.title) $set(props, 'title', '请选择' + rule.title);
    if (!props.maxLength) $set(props, 'maxLength', 0);

    let handleIcon = props.handleIcon;
    if (props.type === 'file' && props.handleIcon === undefined)
        handleIcon = false;
    else
        handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'ios-eye-outline' : props.handleIcon;
    $set(props, 'handleIcon', handleIcon);

    if (props.allowRemove === undefined) $set(props, 'allowRemove', true);

}

class handler extends Handler {
    init() {
        parseRule(this.rule);
        this.multiple = this.rule.props.maxLength != 1;
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
        return this.multiple === true
            ? parseValue
            : (parseValue[0] === undefined
                ? ''
                : parseValue[0]);
    }

    watchValue(n) {
        super.watchValue(n);
        this.render.onChange(n);
        this.render.sync();
    }

    watchFormValue(n) {
        super.watchFormValue(n);
        this.parseValue = n;
        this.render.sync();

    }
}

const eventList = {onOpen: 'on-open', onChange: 'on-change', onCancel: 'on-cancel', onOk: 'on-ok'};

class render extends Render {
    init() {
        this._props = this.handler.rule.props;
        this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
    }

    parse() {
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
        }).key('ifit' + unique).style({display: hidden === true ? 'none' : 'inline-block'}).get();
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
                    this.showModel();
                }
            }
        }, [
            this.vNode.icon({key: `ifbi3${unique}`, props: {type: this._props.icon, size: 20}})
        ])
    }

    makeSpin() {
        if (true !== this._props.spin) return;
        let unique = this.handler.unique;
        return this.vNode.make('Spin', {
            props: {fix: true},
            key: 'ifsp' + unique,
            class: {
                'fc-spin': true
            }
        }, [
            this.vNode.icon({
                props: {
                    type: 'load-c',
                    size: 18
                },
                class: {
                    'fc-spin-icon-load': true
                },
                key: 'ifspi' + unique
            }),
            this.vNode.make('div', {
                domProps: {
                    innerHTML: '加载中...'
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
            this.defaultOnHandle(src);
    }

    valid(field) {
        if (field !== this.handler.field)
            throw new Error('无效的表单字段' + errMsg());
    }

    showModel() {
        let isShow = false !== this.onOpen(),
            {width, height, src, title} = this._props;
        if (!isShow) return;
        this.vm.$Modal.remove();
        setTimeout(() => {
            this.vm.$Modal.confirm({
                title: title,
                render: () => [
                    this.makeSpin()
                    , this.vNode.make('iframe', {
                        attrs: {
                            src: src
                        },
                        style: {
                            'height': height,
                            'border': "0 none",
                            'width': "100%",
                        },
                        on: {
                            'load': (e) => {
                                if (this._props.spin === true) {
                                    let spin = document.getElementsByClassName('fc-spin')[0];
                                    spin && spin.parentNode.removeChild(spin);
                                }
                                try {
                                    if (this.options.iframeHelper === true) {
                                        let iframe = e.path[0].contentWindow;

                                        iframe[`${this.handler.field}_change`] = (val) => {
                                            this.handler.setValue(val);
                                        };


                                        iframe[`form_create_helper`] = {
                                            close: (field) => {
                                                this.valid(field);
                                                iview.Modal.remove()
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
                        key: 'ifmd' + uniqueId()
                    })],
                onOk: () => {
                    return this.onOk();
                },
                onCancel: () => {
                    return this.onCancel();
                },
                showCancel: true,
                closable: true,
                scrollable: true,
                width: width
            });
        }, 301);
    }
}

render.prototype.defaultOnHandle = upload.render.prototype.defaultOnHandle;
Object.keys(eventList).forEach(k => {
    render.prototype[k] = function () {
        let fn = this.handler.rule.event[eventList[k]];
        if (fn)
            return fn(this.handler.getValue());
    }
});

const types = {
    frameInputs: ['input', 0],
    frameFiles: ['file', 0],
    frameImages: ['image', 0],
    frameInputOne: ['input', 1],
    frameFileOne: ['file', 1],
    frameImageOne: ['image', 1]
};

const maker = Object.keys(types).reduce((initial, key) => {
    initial[key] = creatorTypeFactory(name, m => m.props({type: types[key][0], maxLength: types[key][1]}));
    return initial
}, {});

maker.frameInput = maker.frameInputs;
maker.frameFile = maker.frameFiles;
maker.frameImage = maker.frameImages;

export default {handler, render, name, maker};
