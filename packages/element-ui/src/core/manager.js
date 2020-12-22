import getConfig from './config';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import toString from '@form-create/utils/lib/tostring';
import extend from '@form-create/utils/lib/extend';

function isTooltip(info) {
    return info.type === 'tooltip';
}

const upperCaseReg = /[A-Z]/;

export function isAttr(name, value) {
    return (!upperCaseReg.test(name) && (is.String(value) || is.Number(value)))
}

function tidy(props, name) {
    if (!hasProperty(props, name)) return;
    if (is.String(props[name])) {
        props[name] = {[name]: props[name], show: true};
    }
}

function isFalse(val) {
    return val === false;
}

function tidyBool(opt, name) {
    if (hasProperty(opt, name) && !is.Object(opt[name])) {
        opt[name] = {show: !!opt[name]};
    }
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
    resetField(ctx) {
        this.vm.$refs[ctx.wrapRef].resetField();
    },
    clearValidateState(ctx) {
        const fItem = this.vm.$refs[ctx.wrapRef];
        if (fItem) {
            fItem.validateMessage = '';
            fItem.validateState = '';
        }
    },
    tidyOptions(options) {
        ['submitBtn', 'resetBtn', 'row', 'info', 'wrap', 'col'].forEach(name => {
            tidyBool(options, name);
        })
        return options;
    },
    tidyRule({prop}) {
        tidy(prop, 'title');
        tidy(prop, 'info');
        return prop;
    },
    mergeProp(ctx) {
        let props = ctx.prop.props;
        ctx.prop = mergeProps([{
            attrs: Object.keys(props).reduce((initial, val) => {
                if (isAttr(val, props[val]))
                    initial[val] = props[val];
                return initial;
            }, {}),
            info: this.options.info || {},
            wrap: this.options.wrap || {},
            col: this.options.col || {},
        }, ctx.prop], {
            info: {
                trigger: 'hover',
                placement: 'top-start',
                icon: 'el-icon-warning',
            },
            title: {},
            col: {span: 24},
            wrap: {},
        }, {normal: ['title', 'info', 'col', 'wrap']});
        props = ctx.prop.props;
    },
    getDefaultOptions() {
        return getConfig();
    },
    update() {
        const form = this.options.form;
        const h = this.$handle;
        this.rule = {
            props: {...form, model: h.formData, rules: h.validate},
            nativeOn: {
                submit: (e) => {
                    e.preventDefault();
                }
            },
            class: [form.className, form.class, 'form-create'],
            style: form.style,
            type: 'form',
        };
    },
    beforeRender() {
        const {key, ref, $handle} = this;
        extend(this.rule, {key, ref});
        extend(this.rule.props, {
            model: $handle.formData,
            rules: $handle.validate,
        });
    },
    render(children) {
        if (children.length) {
            children.push(this.makeFormBtn());
        }
        return this.$render.renderRule(this.rule, isFalse(this.options.row.show) ? children : [this.makeRow(children)]);
    },
    makeWrap(ctx, children) {
        const rule = ctx.prop;
        const uni = `${this.key}${ctx.key}`;
        const col = rule.col;
        const labelWidth = (!col.labelWidth && isFalse(rule.title.show)) ? 0 : col.labelWidth;
        const {inline, col: _col} = this.rule.props;
        const item = isFalse(rule.wrap.show) ? children : this.$render.renderRule(mergeProps([rule.wrap, {
            props: {
                title: rule.title.title,
                labelWidth: labelWidth === void 0 ? labelWidth : toString(labelWidth),
                ...(rule.wrap || {}),
                prop: ctx.field,
                rules: rule.validate,
            },
            class: rule.className,
            key: `${uni}fi`,
            ref: ctx.wrapRef,
            type: 'formItem',
        }]), [children, this.makeInfo(rule, uni)]);
        return (inline === true || isFalse(_col) || isFalse(col.show)) ? item : this.makeCol(rule, uni, [item]);
    },
    makeInfo(rule, uni) {
        const titleProp = rule.title;
        const infoProp = rule.info;
        if (!titleProp.title || isFalse(titleProp.show)) return;
        const isTip = isTooltip(infoProp);
        const children = [titleProp.title];

        const titleFn = (pop) => this.$render.renderRule(mergeProps([titleProp, {
            props: titleProp,
            slot: titleProp.slot || (pop ? (isTip ? 'default' : 'reference') : 'label'),
            key: `${uni}tit`,
            type: titleProp.type || 'span',
        }]), children);

        if (!isFalse(infoProp.show) && infoProp.info) {
            if (infoProp.icon !== false) {
                children[infoProp.align !== 'left' ? 'unshift' : 'push'](this.$render.renderRule({
                    type: 'i',
                    class: infoProp.icon === true ? 'el-icon-warning' : infoProp.icon,
                    key: `${uni}i`
                }));
            }
            return this.$render.renderRule(mergeProps([infoProp, {
                type: infoProp.type || 'popover',
                props: {...infoProp, content: infoProp.info},
                key: `${uni}pop`,
                slot: 'label'
            }]), [
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
        const row = this.options.row || {};
        return this.$render.renderRule({
            type: 'row',
            props: row,
            class: row.class,
            key: `${this.key}row`
        }, children)
    },
    makeFormBtn() {
        let vn = [];
        if (!isFalse(this.options.submitBtn.show)) {
            vn.push(this.makeSubmitBtn())
        }
        if (!isFalse(this.options.resetBtn.show)) {
            vn.push(this.makeResetBtn())
        }
        if (!vn.length) {
            return;
        }
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
