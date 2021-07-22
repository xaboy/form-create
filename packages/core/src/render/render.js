import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is from '@form-create/utils/lib/type';
import {makeSlotBag, mergeRule, toProps} from '../frame/util';
import toCase, {lower} from '@form-create/utils/lib/tocase';
import {deepSet} from '@form-create/utils';
import {computed, Fragment, h, resolveComponent} from 'vue';

function injectProp(ctx, api) {
    return {
        formCreate: api,
        formCreateField: ctx.field,
        formCreateOptions: ctx.prop.options,
        formCreateRule: (function () {
            const temp = {...ctx.prop};
            return temp.on = temp.on ? {...temp.on} : {}, temp;
        }()),
    }
}


export default function useRender(Render) {
    extend(Render.prototype, {
        initRender() {
            this.cacheConfig = {};
            this.clearOrgChildren();
        },
        initOrgChildren() {
            const ctxs = this.$handle.ctxs;
            this.orgChildren = Object.keys(ctxs).reduce((initial, id) => {
                const children = ctxs[id].rule.children;
                initial[id] = is.trueArray(children) ? [...children] : [];

                return initial;
            }, {});

        },
        clearOrgChildren() {
            this.orgChildren = {};
        },
        render() {
            // debugger
            console.log('renderrrrr');
            if (!this.vm.isShow) {
                return;
            }
            this.$h = h;
            this.$manager.beforeRender();

            const slotBag = makeSlotBag();

            const vn = this.sort.map((id) => {
                const ctx = this.$handle.ctxs[id];
                this.renderSlot(slotBag, ctx);
            }).filter((val) => val !== undefined);

            return this.$manager.render(slotBag);
        },
        renderSlot(slotBag, ctx, parent) {
            if (this.isFragment(ctx)) {
                const slots = this.renderChildren(ctx);
                const def = slots?.default;
                slotBag.setSlot(ctx.rule.slot, () => def && def());
                delete slots.default;
                slotBag.mergeBag(slots);
            } else {
                slotBag.setSlot(ctx.rule.slot, this.renderCtx(ctx, parent));
            }
        },
        mergeGlobal(ctx) {
            const g = this.$handle.options.global;
            if (!g) return;
            if (!this.cacheConfig[ctx.trueType]) {
                this.cacheConfig[ctx.trueType] = computed(() => {
                    const g = this.$handle.options.global;
                    return mergeRule({}, [g['*'], g[ctx.originType] || g[ctx.type] || g[ctx.type] || {}]);
                });
            }
            ctx.prop = mergeRule({}, [this.cacheConfig[ctx.trueType].value, ctx.prop]);
        },
        setOptions(ctx) {
            if (ctx.prop.optionsTo && ctx.prop.options) {
                deepSet(ctx.prop, ctx.prop.optionsTo, ctx.prop.options);
            }
        },
        renderSides(vn, ctx, temp) {
            const prop = ctx[temp ? 'rule' : 'prop'];
            return [this.renderRule(prop.prefix), vn, this.renderRule(prop.suffix)];
        },
        renderCtx(ctx, parent) {
            if (ctx.type === 'hidden') return;
            if (!this.cache[ctx.id]) {
                let vn;
                const _type = ctx.trueType;
                const none = !(is.Undef(ctx.rule.display) || !!ctx.rule.display);
                if (_type === 'template') {
                    vn = this.renderChildren(ctx).default();
                    if (none) {
                        this.display(vn);
                    }
                    vn = this.item(ctx, vn);
                } else if (_type === 'fcFragment') {
                    vn = this.renderChildren(ctx);
                } else {
                    ctx.initProp();
                    this.mergeGlobal(ctx);
                    this.$manager.tidyRule(ctx);
                    this.setOptions(ctx);
                    this.ctxProp(ctx);
                    let prop = ctx.prop;

                    if (prop.hidden) {
                        this.setCache(ctx, undefined, parent);
                        return;
                    }
                    vn = this.vNode.h('FcFragment', injectProp(ctx, this.$handle.api), () => {
                        let _vn = ctx.parser.render(this.renderChildren(ctx), ctx);
                        _vn = this.renderSides(_vn, ctx);
                        if ((!(!ctx.input && is.Undef(prop.native))) && prop.native !== true) {
                            _vn = this.$manager.makeWrap(ctx, _vn);
                        }
                        if (none) {
                            _vn = this.display(_vn);
                        }
                        return this.item(ctx, _vn)
                    });
                }
                this.setCache(ctx, vn, parent);
                ctx._vnode = vn;
                return vn;
            }

            return this.getCache(ctx);
        },
        display(vn) {
            if (Array.isArray(vn)) {
                const data = [];
                vn.forEach(v => {
                    if (Array.isArray(v)) return this.display(v);
                    if (this.none(v)) data.push(v);
                })
                return data;
            } else {
                return this.none(vn);
            }
        },
        none(vn) {
            if (vn) {
                if (Array.isArray(vn.props.style)) {
                    vn.props.style.push({display: 'none'});
                } else {
                    vn.props.style = [vn.props.style, {display: 'none'}];
                }
                return vn;
            }
        },
        item(ctx, vn) {
            return this.$h(Fragment, {
                key: ctx.key,
            }, vn);
        },
        isFragment(ctx) {
            return ctx.type === 'fragment' || (ctx.type === 'template' && !ctx.rule.template);
        },
        ctxProp(ctx, custom) {
            const {ref, key, rule} = ctx;
            this.$manager.mergeProp(ctx, custom);
            ctx.parser.mergeProp(ctx, custom);
            const props = [
                {
                    ref: ref,
                    key: rule.key || `${key}fc`,
                    slot: undefined,
                }
            ]

            if (!custom) {
                const data = {
                    on: {
                        vnodeMounted: () => {
                            this.onMounted(ctx);
                        },
                        'fc.sub-form': (subForm) => {
                            this.$handle.addSubForm(ctx, subForm);
                        }
                    }
                };
                if (ctx.input) {
                    data.on['update:modelValue'] = (value) => {
                        console.log(value, ctx.field);
                        this.onInput(ctx, value);
                    };
                    data.props = {
                        modelValue: this.$handle.getFormData(ctx),
                    }
                }
                props.push(data);
            }
            mergeProps(props, ctx.prop);
            return ctx.prop;
        },
        onMounted(ctx) {
            ctx.el = this.vm.$refs[ctx.ref];
            ctx.parser.mounted(ctx);
            this.$handle.effect(ctx, 'mounted');
        },
        onInput(ctx, value) {
            this.$handle.onInput(ctx, value);
        },
        renderChildren(ctx) {
            const {children} = ctx.rule, orgChildren = this.orgChildren[ctx.id];

            const isRm = child => {
                return !is.String(child) && child.__fc__ && !this.$handle.ctxs[child.__fc__.id];
            }

            if (!is.trueArray(children) && orgChildren) {
                this.$handle.deferSyncValue(() => {
                    orgChildren.forEach(child => {
                        if (!child) return;
                        if (isRm(child)) {
                            this.$handle.rmCtx(child.__fc__);
                        }
                    });
                });
                this.orgChildren[ctx.id] = [];
                return {};
            }

            orgChildren && this.$handle.deferSyncValue(() => {
                orgChildren.forEach(child => {
                    if (!child) return;
                    if (children.indexOf(child) === -1 && isRm(child)) {
                        this.$handle.rmCtx(child.__fc__);
                    }
                });
            });

            if (!children.length) return {};
            const slotBag = makeSlotBag()
            children.map(child => {
                if (!child) return;
                if (is.String(child)) return slotBag.setSlot(null, child);
                if (child.__fc__) {
                    return this.renderSlot(slotBag, child.__fc__, ctx);
                }
                if (!this.$handle.isRepeatRule(child.__origin__ || child) && child.type) {
                    this.vm.$nextTick(() => {
                        this.$handle.loadChildren(children, ctx);
                        this.$handle.refresh();
                    });
                }
            });
            return slotBag.getSlots();

        },
        defaultRender(ctx, children) {
            const prop = ctx.prop;
            if (this.vNode[ctx.type])
                return this.vNode[ctx.type](prop, children);
            if (this.vNode[ctx.originType])
                return this.vNode[ctx.originType](prop, children);
            return this.vNode.make(lower(ctx.originType), prop, children);
        },
        renderRule(rule, children, origin) {
            if (!rule) return undefined;
            if (is.String(rule)) return rule;

            let type;
            if (origin) {
                type = rule.type;
            } else {
                type = rule.is;
                if (rule.type) {
                    type = toCase(rule.type);
                    const alias = this.vNode.aliasMap[type];
                    if (alias) type = toCase(alias);
                }
            }

            if (!type) return undefined;

            const slotBag = makeSlotBag();
            if (is.trueArray(rule.children)) {
                rule.children.forEach(v => {
                    slotBag.setSlot(v?.slot, () => this.renderRule(v));
                });
            }
            return this.$h(resolveComponent(type), toProps(rule), slotBag.mergeBag(children).getSlots());

        }
    })
}
