import getConfig from './config';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import toString from '@form-create/utils/lib/tostring';

function isTooltip(info) {
    return info.type === 'tooltip';
}

const upperCaseReg = /[A-Z]/;

export function isAttr(name, value) {
    return (!upperCaseReg.test(name) && (is.String(value) || is.Number(value)))
}

function tidy(name, title) {
    if (is.String(title)) {
        return {[name]: title, show: true};
    } else if (is.Object(title) && title.title && !hasProperty(title, 'show')) {
        title.show = true;
    }
    return title;
}

export default {
    validate(call) {
        this.form().validate((valid) => {
            call && call(valid);
        });
    },
    validateField(field, call) {
        this.form().validateField(field, call);
    },
    resetField(parser) {
        this.vm.$refs[parser.formItemRefName].resetField();
    },
    clearValidateState(parser) {
        const fItem = this.vm.$refs[parser.formItemRefName];
        if (fItem) {
            fItem.validateMessage = '';
            fItem.validateState = '';
        }
    },
    tidyOptions(options) {
        if (is.Boolean(options.submitBtn)) options.submitBtn = {show: options.submitBtn};
        if (is.Boolean(options.resetBtn)) options.resetBtn = {show: options.resetBtn};
        if (is.Boolean(options.row)) options.row = {show: options.row};
        return options;
    },
    tidyRule({prop}) {
        prop.title = tidy('title', prop.title);
        prop.info = tidy('info', prop.info);
        return prop;
    },
    mergeProp(parser) {
        let props = parser.prop.props;
        parser.prop = mergeProps([{
            attrs: Object.keys(props).reduce((initial, val) => {
                if (isAttr(val, props[val]))
                    initial[val] = props[val];
                return initial;
            }, {}),
        }, parser.prop], {
            info: {
                trigger: 'hover',
                placement: 'top-start',
                icon: 'el-icon-warning',
                show: false,
            },
            title: {show: false},
            col: {span: 24}
        }, {normal: ['title', 'info', 'col']});
        props = parser.prop.props;
        if (!props.size && this.options.form.size)
            props.size = this.options.form.size;
    },
    getDefaultOptions() {
        return getConfig();
    },
    beforeRender() {
        const form = this.options.form;
        this.rule = mergeProps([{
            props: form,
            nativeOn: {
                submit: (e) => {
                    e.preventDefault();
                }
            },
            class: [form.className, form.class],
            style: form.style
        }, {
            props: {
                model: this.$handle.formData,
                rules: this.$handle.validate,
            },
            key: this.key,
            ref: this.ref,
            class: 'form-create',
            type: 'form',
        }])
    },
    render(children) {
        if (children.length)
            children.push(this.makeFormBtn());
        return this.$render.renderRule(this.rule, this.options.row.show ? [this.makeRow(children)] : children);
    },
    makeFormItem(parser, children) {
        const rule = parser.prop;
        const uni = `${this.key}${parser.key}`;
        const col = rule.col;
        const labelWidth = (!col.labelWidth && !rule.title.show) ? 0 : col.labelWidth, {inline, col: _col} = this.rule.props;
        const item = this.$render.renderRule(mergeProps([{
            props: {
                title: rule.title.title,
                labelWidth: labelWidth === void 0 ? labelWidth : toString(labelWidth),
            }
        }, rule.formItem || {}, {
            type: 'formItem',
            props: {
                prop: parser.field,
                rules: rule.validate,
            },
            class: rule.className,
            key: `${uni}fi`,
            ref: parser.formItemRefName
        }]), [children, this.makeInfo(rule, uni)]);
        return (inline === true || _col === false) ? item : this.makeCol(rule, uni, [item]);
    },
    makeInfo(rule, uni) {
        const titleProp = rule.title;
        const infoProp = rule.info;
        if (!titleProp.title || titleProp.show === false) return;
        const isTip = isTooltip(infoProp);
        const children = [titleProp.title];

        const titleFn = (pop) => this.$render.renderRule({
            ...titleProp,
            slot: titleProp.slot || (pop ? (isTip ? 'default' : 'reference') : 'label'),
            key: `${uni}tit`,
            type: titleProp.type || 'span',
        }, children);

        if (infoProp.show !== false && infoProp.info) {
            if (infoProp.icon !== false) {
                children.push(this.$render.renderRule({
                    type: 'i',
                    class: infoProp.icon === true ? 'el-icon-warning' : infoProp.icon,
                    key: `${uni}i`
                }));
            }
            return this.$render.renderRule({
                type: infoProp.type || 'popover',
                props: {...infoProp, content: infoProp.info},
                key: `${uni}pop`,
                slot: 'label'
            }, [
                titleFn(true)
            ])
        }
        return titleFn();
    },
    makeCol(rule, uni, children) {
        const col = rule.col;
        return this.$render.renderRule({
            class: col.class,
            type: 'col',
            props: col || {span: 24},
            key: `${uni}col`
        }, children);
    },
    makeRow(children) {
        const row = this.options.row;
        return this.$render.renderRule({
            type: 'row',
            props: row,
            class: row.class,
            key: `${this.key}row`
        }, children)
    },
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
            type: 'formItem',
            key: `${this.key}fb`
        }, vn);

        return this.rule.props.inline === true
            ? item
            : this.$render.renderRule({
                type: 'col',
                props: {span: 24},
                key: `${this.key}fc`
            }, [item]);
    },
    makeResetBtn() {
        const resetBtn = this.options.resetBtn;

        return this.$render.renderRule({
            type: 'button',
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
    },
    makeSubmitBtn() {
        const submitBtn = this.options.submitBtn;

        return this.$render.renderRule({
            type: 'button',
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
