import getConfig from './config';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import toString from '@form-create/utils/lib/tostring';
import extend from '@form-create/utils/lib/extend';

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
    validate(params) {
        return new Promise((resolve, reject) => {
            const form = this.form();
            if (form) {
                return form.validate(params).then(v => {
                    v === true ? resolve(v) : reject(v);
                }).catch(e=>{
                    //
                });
            } else {
                resolve(true);
            }
        });
    },
    validateField(field) {
        return this.validate({fields:[field]});
    },
    clearValidateState(fields) {
        const form = this.form();
        if (form) {
            return form.clearValidate(fields);
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
        ctx.prop = mergeProps([{
            info: this.options.info || {},
            wrap: this.options.wrap || {},
            col: this.options.col || {},
        }, ctx.prop], {
            info: {
                type: 'popup',
                placement: 'top-left',
                showArrow: true,
                icon: 'QuestionCircleOutlined',
            },
            title: {},
            col: {span: 12},
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
                    e.preventDefault && e.preventDefault();
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
            data: $handle.formData,
        });
    },
    render(children) {
        if (children.slotLen()) {
            children.setSlot(undefined, () => this.makeFormBtn());
        }
        return this.$r(this.rule, isFalse(this.options.row.show) ? children.getSlots() : [this.makeRow(children)]);
    },
    makeWrap(ctx, children) {
        const rule = ctx.prop;
        const uni = `${this.key}${ctx.key}`;
        const col = rule.col;
        const isTitle = this.isTitle(rule);
        const labelWidth = (!col.labelWidth && !isTitle) ? 0 : col.labelWidth;
        const {layout, col: _col} = this.rule.props;
        let item
        if (isFalse(rule.wrap.show)) {
            item = children
        } else {
            item = this.$r(mergeProps([rule.wrap, {
                props: {
                    labelWidth: labelWidth === void 0 ? labelWidth : toString(labelWidth),
                    ...tidyRule(rule.wrap || {}),
                    name: ctx.id,
                    rules: rule.validate,
                    label: isTitle ? () => this.makeInfo(rule, uni, ctx) : undefined,
                },
                class: rule.className,
                key: `${uni}fi`,
                ref: ctx.wrapRef,
                type: 'formItem',
            }]), {default: () => children});
        }
        return (layout === 'inline' || isFalse(_col) || isFalse(col.show)) ? item : this.makeCol(rule, uni, [item]);
    },
    isTitle(rule) {
        if (this.options.form.title === false) return false;
        const title = rule.title;
        return !((!title.title && !title.native) || isFalse(title.show))
    },
    makeInfo(rule, uni, ctx) {
        const titleProp = {...rule.title};
        const infoProp = {...rule.info};
        const form = this.options.form;
        const titleSlot = this.getSlot('title');
        const children = [titleSlot ? titleSlot({title: titleProp.title || '', rule: ctx.rule, options: this.options}) : ((titleProp.title || '') + (form.labelSuffix || form['label-suffix'] || ''))];

        if (!isFalse(infoProp.show) && (infoProp.info || infoProp.native) && !isFalse(infoProp.icon)) {
            const prop = {
                type: infoProp.type || 'popup',
                props: tidyRule(infoProp),
                key: `${uni}pop`
            };

            delete prop.props.icon;
            delete prop.props.show;
            delete prop.props.info;
            delete prop.props.align;
            delete prop.props.native;

            const field = 'content';
            if (infoProp.info && !hasProperty(prop.props, field)) {
                prop.props[field] = infoProp.info;
            }

            children[infoProp.align !== 'left' ? 'unshift' : 'push'](this.$r(mergeProps([infoProp, prop]), {
                [titleProp.slot || 'default']: () => this.$r({
                    type: infoProp.icon === true ? 'QuestionCircleOutlined' : (infoProp.icon || ''),
                    key: `${uni}i`
                })
            }));
        }

        const _prop = mergeProps([titleProp, {
            props: tidyRule(titleProp),
            key: `${uni}tit`,
            type: titleProp.type || 'span',
        }]);

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
            props: col || {span: 12},
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
                props: {span: 12},
                key: `${this.key}fc`
            }, [item]);
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
            style: {width: resetBtn.width, marginLeft: '10px'},
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
            style: {width: submitBtn.width},
            on: {
                click: () => {
                    const fApi = this.$handle.api;
                    this.options.submitBtn.click
                        ? this.options.submitBtn.click(fApi)
                        : fApi.submit().catch(()=>{});
                }
            },
            key: `${this.key}b1`,
        }, [innerText]);
    }
}
