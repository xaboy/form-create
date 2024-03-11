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
    validate() {
        const form = this.form();
        if (form) {
            return form.validate();
        }
        return new Promise(v => v());
    },
    validateField(field) {
        const form = this.form();
        if (form) {
            return new Promise((resolve, reject) => {
                form.validateField(field, e => {
                    e ? reject(e) : resolve(null);
                });
            })
        }
        return new Promise(v => v());
    },
    clearValidateState(ctx) {
        const fItem = this.vm.$refs[ctx.wrapRef];
        if (fItem) {
            fItem.validateMessage = '';
            fItem.validateState = '';
        }
    },
    tidyOptions(options) {
        ['submitBtn', 'resetBtn', 'row', 'info', 'wrap', 'col', 'title'].forEach(name => {
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
            title: this.options.title || {},
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
    },
    getDefaultOptions() {
        return getConfig();
    },
    update() {
        const form = this.options.form;
        this.rule = {
            props: {...form},
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
            rules: $handle.validate(),
        });
    },
    render(children) {
        if (children.length) {
            children.push(this.makeFormBtn());
        }
        return this.$r(this.rule, isFalse(this.options.row.show) ? children : [this.makeRow(children)]);
    },
    makeWrap(ctx, children) {
        const rule = ctx.prop;
        const uni = `${this.key}${ctx.key}`;
        const col = rule.col;
        const isTitle = this.isTitle(rule);
        const labelWidth = (!col.labelWidth && !isTitle) ? 0 : col.labelWidth;
        const {inline, col: _col} = this.rule.props;
        const item = isFalse(rule.wrap.show) ? children : this.$r(mergeProps([rule.wrap, {
            props: {
                labelWidth: labelWidth === void 0 ? labelWidth : toString(labelWidth),
                label: isTitle ? rule.title.title : undefined,
                ...(rule.wrap || {}),
                prop: ctx.id,
                rules: rule.validate,
            },
            class: rule.className,
            key: `${uni}fi`,
            ref: ctx.wrapRef,
            type: 'formItem',
        }]), [children, isTitle ? this.makeInfo(rule, uni, ctx) : null]);
        return (inline === true || isFalse(_col) || isFalse(col.show)) ? item : this.makeCol(rule, uni, [item]);
    },
    isTitle(rule) {
        if (this.options.form.title === false) return false;
        const title = rule.title;
        return !((!title.title && !title.native) || isFalse(title.show))
    },
    makeInfo(rule, uni, ctx) {
        const titleProp = rule.title;
        const infoProp = rule.info;
        const isTip = isTooltip(infoProp);
        const form = this.options.form;
        const titleSlot = this.getSlot('title');
        const children = [titleSlot ? titleSlot({title: titleProp.title || '', rule: ctx.rule, options: this.options}) : ((titleProp.title || '') + (form.labelSuffix || form['label-suffix'] || ''))];

        if (!isFalse(infoProp.show) && (infoProp.info || infoProp.native) && !isFalse(infoProp.icon)) {
            const prop = {
                type: infoProp.type || 'popover',
                props: {...infoProp},
                key: `${uni}pop`,
                slot: 'label'
            };
            const field = 'content';
            if (infoProp.info && !hasProperty(prop.props, field)) {
                prop.props[field] = infoProp.info;
            }
            children[infoProp.align !== 'left' ? 'unshift' : 'push'](this.$r(mergeProps([infoProp, prop]), [
                this.$r({
                    type: 'i',
                    slot: isTip ? 'default' : 'reference',
                    class: infoProp.icon === true ? 'el-icon-warning' : infoProp.icon,
                    key: `${uni}i`
                })
            ]));
        }
        return this.$r(mergeProps([titleProp, {
            props: titleProp,
            slot: titleProp.slot || 'label',
            key: `${uni}tit`,
            type: titleProp.type || 'span',
        }]), children);
    },
    makeCol(rule, uni, children) {
        const col = rule.col;
        return this.$r({
            class: col.class,
            type: 'col',
            props: col || {span: 24},
            key: `${uni}col`
        }, children);
    },
    makeRow(children) {
        const row = this.options.row || {};
        return this.$r({
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
        const item = this.$r({
            type: 'formItem',
            key: `${this.key}fb`
        }, vn);

        return this.rule.props.inline === true
            ? item
            : this.$r({
                type: 'col',
                props: {span: 24},
                key: `${this.key}fc`
            }, [item]);
    },
    makeResetBtn() {
        const resetBtn = this.options.resetBtn;
        return this.$r({
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

        return this.$r({
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
