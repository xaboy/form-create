import getConfig from './config';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import extend from '@form-create/utils/lib/extend';
import {showNotify} from 'vant';

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

function tidyRule(rule) {
    const _rule = {...rule};
    delete _rule.children;
    return _rule;
}

export default {
    validate() {
        const form = this.form();
        if (form) {
            return form.validate();
        } else {
            return new Promise(v => v());
        }
    },
    validateField(field) {
        return new Promise((resolve, reject) => {
            const form = this.form();
            if (form) {
                form.validate(field).then(resolve).catch(reject);
            } else {
                resolve();
            }
        });
    },
    clearValidateState(ctx) {
        const form = this.form();
        if (form) {
            return form.resetValidation(ctx.id);
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
        ctx.prop = mergeProps([{
            info: this.options.info || {},
            wrap: this.options.wrap || {},
            col: this.options.col || {},
            title: this.options.title || {},
        }, ctx.prop], {
            info: {
                icon: true,
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
            on: {
                submit: (e) => {
                    e.preventDefault();
                }
            },
            class: [form.className, form.class, 'form-create-m', this.options.preview ? 'is-preview' : ''],
            style: form.style,
            type: 'form',
        };
    },
    beforeRender() {
        const {key, ref} = this;
        extend(this.rule, {key, ref});
    },
    render(children) {
        if (children.slotLen() && !this.options.preview) {
            children.setSlot(undefined, () => this.makeFormBtn());
        }
        return this.$r(this.rule, isFalse(this.options.row.show) ? children.getSlots() : [this.makeRow(children)]);
    },
    makeWrap(ctx, children) {
        const rule = ctx.prop;
        const uni = `${this.key}${ctx.key}`;
        const col = rule.col;
        const isTitle = this.isTitle(rule) && rule.wrap.title !== false;
        const {col: _col} = this.rule.props;
        delete rule.wrap.title;
        const item = isFalse(rule.wrap.show) ? children : this.$r(mergeProps([rule.wrap, {
            props: {
                modelValue: ctx.rule.value,
                label: isTitle ? rule.title.title : undefined,
                ...tidyRule(rule.wrap || {}),
                name: ctx.id,
                rules: ctx.injectValidate(),
            },
            class: '_fc-form-item',
            key: `${uni}fi`,
            ref: ctx.wrapRef,
            type: 'formItem',
        }]), {input: () => children, ...(isTitle ? {label: () => this.makeInfo(rule, uni, ctx)} : {})});
        return (isFalse(_col) || isFalse(col.show)) ? item : this.makeCol(rule, uni, [item]);
    },
    isTitle(rule) {
        if (this.options.form.title === false) return false;
        const title = rule.title;
        return !((!title.title && !title.native) || isFalse(title.show))
    },
    makeInfo(rule, uni, ctx) {
        const titleProp = {...rule.title};
        const infoProp = {...rule.info};
        const titleSlot = this.getSlot('title');
        const children = [titleSlot ? titleSlot({
            title: titleProp.title || '',
            rule: ctx.rule,
            options: this.options
        }) : ((titleProp.title || ''))];
        const flag = !isFalse(infoProp.show) && (infoProp.info || infoProp.native) && !isFalse(infoProp.icon);
        if (flag) {
            children[infoProp.align !== 'left' ? 'unshift' : 'push'](this.$r({
                type: infoProp.icon === true ? 'icon-warning' : infoProp.icon,
                style: 'width:1em;',
            }));
        }

        const _prop = mergeProps([titleProp, {
            props: tidyRule(titleProp),
            key: `${uni}tit`,
            class: '_fc-title',
            type: titleProp.type || 'span',
        }]);

        if (flag && infoProp.info && !_prop.props.onClick) {
            _prop.props.onClick = () => {
                showNotify({type: 'warning', message: infoProp.info, duration: 1000});
            }
        }

        delete _prop.props.show;
        delete _prop.props.title;
        delete _prop.props.native;

        return this.$r(_prop, children);
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
        return this.$r({
            type: 'cell',
            key: `${this.key}fb`
        }, vn);
    },

    makeResetBtn() {
        const resetBtn = {...this.options.resetBtn};
        const innerText = resetBtn.innerText;
        delete resetBtn.innerText;
        delete resetBtn.click;
        delete resetBtn.col;
        delete resetBtn.show;
        return this.$r({
            type: 'button',
            props: resetBtn,
            class: '_fc-reset-btn',
            style: {width: resetBtn.width},
            on: {
                click: () => {
                    const fApi = this.$handle.api;
                    this.options.resetBtn.click
                        ? this.options.resetBtn.click(fApi)
                        : fApi.resetFields();
                }
            },
            key: `${this.key}b2`,
        }, [innerText]);
    },
    makeSubmitBtn() {
        const submitBtn = {...this.options.submitBtn};
        const innerText = submitBtn.innerText;
        delete submitBtn.innerText;
        delete submitBtn.click;
        delete submitBtn.col;
        delete submitBtn.show;
        return this.$r({
            type: 'button',
            props: submitBtn,
            class: '_fc-submit-btn',
            style: {width: submitBtn.width},
            on: {
                click: () => {
                    const fApi = this.$handle.api;
                    this.options.submitBtn.click
                        ? this.options.submitBtn.click(fApi)
                        : fApi.submit().catch(() => {
                        });
                }
            },
            key: `${this.key}b1`,
        }, [innerText]);
    }
}
