import Manager from '@form-create/core/src/factory/manager';
import getConfig from './config';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is from '@form-create/utils/lib/type';
import {isString, isType, toString} from '@form-create/utils';

function isTooltip(info) {
    return info.type === 'tooltip';
}

const upperCaseReg = /[A-Z]/;

export function isAttr(name, value) {
    return (!upperCaseReg.test(name) && (isString(value) || isType(value, 'Number')))
}

export default class ElmManager extends Manager {

    constructor(handle) {
        super(handle);
        this.rule = {};
    }

    validate(call) {
        this.form().validate((valid) => {
            call && call(valid);
        });
    }

    validateField(field, call) {
        this.form().validateField(field, call);
    }

    resetField(parser) {
        this.vm.$refs[parser.formItemRefName].resetField();
    }

    clearValidateState(parser) {
        const fItem = this.vm.$refs[parser.formItemRefName];
        if (fItem) {
            fItem.validateMessage = '';
            fItem.validateState = '';
        }
    }

    tidyOptions(options) {
        if (is.Boolean(options.submitBtn)) options.submitBtn = {show: options.submitBtn};
        if (is.Boolean(options.resetBtn)) options.resetBtn = {show: options.resetBtn};
        if (is.Boolean(options.row)) options.row = {show: options.row};
        return options;
    }

    tidyRule({prop}) {
        if (!is.Object(prop.title) && isString(prop.title)) {
            prop.title = {title: prop.title, show: true};
        }
        if (!is.Object(prop.info) && isString(prop.info)) {
            prop.info = {info: prop.info, show: true};
        }
        return prop;
    }

    mergeProp(parser) {
        let props = parser.prop.props;
        parser.prop = mergeProps([{
            attrs: Object.keys(props).reduce((initial, val) => {
                if (isAttr(val, props[val]))
                    initial[val] = props[val];
                return initial;
            }, {}),
        }, parser.prop], {
            info: {show: true},
            title: {show: true},
            col: {span: 24}
        }, {normal: ['title', 'info', 'col']});
        props = parser.prop.props;
        if (!props.size && this.options.form.size)
            props.size = this.options.form.size;
    }

    getDefaultOptions() {
        return getConfig();
    }

    beforeRender() {
        //TODO 优化 options
        this.rule = mergeProps([{
            props: this.options.form,
            nativeOn: {
                submit: (e) => {
                    e.preventDefault();
                }
            },
            class: this.options.form.className
        }, {
            props: {
                model: this.$handle.formData,
                rules: this.$handle.validate,
            },
            key: this.key,
            ref: this.ref,
            class: 'form-create',
            type: 'ElForm',
            tag:'component'
        }])
    }

    render(children) {
        if (children.length)
            children.push(this.makeFormBtn());
        return this.$render.renderRule(this.rule, this.options.row.show ? [this.makeRow(children)] : children);
    }

    makeFormItem(parser, children) {
        //TODO 优化 formItem 配置项和事件
        const rule = parser.prop;
        const uni = `${this.key}${parser.key}`;
        const col = rule.col;
        const labelWidth = (!col.labelWidth && !rule.title.show) ? 0 : col.labelWidth, {inline, col: _col} = this.rule.props;
        const item = this.$render.renderRule({
            type: 'ElFormItem',
            props: {
                prop: parser.field,
                title: rule.title.title,
                rules: rule.validate,
                labelWidth: labelWidth === void 0 ? labelWidth : toString(labelWidth),
                //todo 优化 required 参数
                required: rule.props.required
            },
            class: rule.className,
            key: `${uni}fi`,
            ref: parser.formItemRefName
        }, [children, this.makeInfo(rule, uni)]);
        return (inline === true || _col === false) ? item : this.makeCol(rule, uni, [item]);
    }

    makeInfo(rule, uni) {
        const titleProp = rule.title;
        const infoProp = rule.info;
        if (!titleProp.title || titleProp.show === false) return;
        const children = [titleProp.title];
        const isTip = isTooltip(infoProp);

        const titleFn = (pop) => this.$render.renderRule({
            ...titleProp,
            slot: pop ? (isTip ? 'default' : 'reference') : (titleProp.slot || 'label'),
            key: `${uni}tit`,
            type: titleProp.type || 'span',
        }, children);

        if (infoProp.show !== false && infoProp.info) {
            if (infoProp.icon === false) {
                return this.$render.renderRule({
                    type: isTip ? 'ElTooltip' : 'ElPopover',
                    props: {...infoProp, content: infoProp.info},
                    key: `${uni}pop`,
                    slot: 'label'
                }, [
                    titleFn()
                ])
            } else {
                children.push(this.$render.renderRule({
                    type: isTip ? 'ElTooltip' : 'ElPopover',
                    props: {...infoProp, content: infoProp.info},
                    key: `${uni}popi`
                }, [
                    this.$render.renderRule({
                        type: 'i',
                        class: [infoProp.icon || 'el-icon-warning'],
                        slot: isTip ? 'default' : 'reference',
                        key: `${uni}i`
                    })
                ]));
            }
        }
        return titleFn();
    }

    makeCol(rule, uni, children) {
        const col = rule.col;
        return this.$render.renderRule(mergeProps([{class: col.class, type: 'ElCol', key: `${uni}col`}], {
            props: col || {span: 24},
            class: {
                ['__fc_h']: !!rule.hidden
            }
        }), children);
    }

    makeRow(children) {
        const row = this.options.row;
        return this.$render.renderRule({
            type: 'ElRow',
            props: row,
            class: row.class,
            key: `${this.key}row`
        }, children)
    }

    makeFormBtn() {
        let vn = [];
        if (this.options.submitBtn.show) {
            vn.push(this.makeSubmitBtn())
        }
        if (this.options.resetBtn.show) {
            vn.push(this.makeResetBtn())
        }
        if (!vn.length) return;
        const item = this.$render.renderRule({
            type: 'ElFormItem',
            key: `${this.key}fb`
        }, vn);

        return this.rule.props.inline === true
            ? item
            : this.$render.renderRule({
                type: 'ElCol',
                props: {span: 24},
                key: `${this.key}fc`
            }, [item]);
    }

    makeResetBtn() {
        const resetBtn = this.options.resetBtn;

        return this.$render.renderRule({
            type: 'ElButton',
            props: resetBtn,
            style: {width: resetBtn.width},
            on: {
                click: () => {
                    const fApi = this.$handle.api;
                    resetBtn.click
                        ? resetBtn.click(fApi)
                        : fApi.resetFields();
                }
            },
            key: `${this.key}b2`,
        }, [resetBtn.innerText]);
    }

    makeSubmitBtn() {
        const submitBtn = this.options.submitBtn;

        return this.$render.renderRule({
            type: 'ElButton',
            props: submitBtn,
            style: {width: submitBtn.width},
            on: {
                click: () => {
                    const fApi = this.$handle.api;
                    submitBtn.click
                        ? submitBtn.click(fApi)
                        : fApi.submit();
                }
            },
            key: `${this.key}b1`,
        }, [submitBtn.innerText]);
    }
}
