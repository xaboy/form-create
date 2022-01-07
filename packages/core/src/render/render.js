import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is from '@form-create/utils/lib/type';
import {makeSlotBag, mergeRule} from '../frame/util';
import toCase, {lower} from '@form-create/utils/lib/tocase';
import {deepSet, toLine} from '@form-create/utils';
import {computed, nextTick} from 'vue';

export default function useRender(Render) {
    extend(Render.prototype, {
        initRender() {
            this.cacheConfig = {};
        },
        getTypeSlot(type) {
            const name = 'type-' + toLine(type);
            const _fn = (vm) => {
                if (vm) {
                    const slot = vm.slots[name] || vm.slots['type-' + type];
                    if (slot) {
                        return slot;
                    }
                    return _fn(vm.setupState.parent);
                }
            }
            return _fn(this.vm);
        },
        render() {
            // console.warn('renderrrrr', this.id);
            if (!this.vm.setupState.isShow) {
                return;
            }
            this.$manager.beforeRender();
            const slotBag = makeSlotBag();
            this.sort.forEach((k) => {
                this.renderSlot(slotBag, this.$handle.ctxs[k]);
            });

            return this.$manager.render(slotBag);
        },
        renderSlot(slotBag, ctx, parent) {
            if (this.isFragment(ctx)) {
                ctx.initProp();
                this.mergeGlobal(ctx);
                ctx.initNone();
                const slots = this.renderChildren(ctx);
                const def = slots.default;
                def && slotBag.setSlot(ctx.rule.slot, () => def());
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
        deepSet(ctx) {
            const deep = ctx.rule.deep;
            deep && Object.keys(deep).sort((a, b) => a.length < b.length ? -1 : 1).forEach(str => {
                deepSet(ctx.prop, str, deep[str]);
            });
        },
        parseSide(side) {
            return is.Object(side) ? mergeRule({}, side) : side;
        },
        renderSides(vn, ctx, temp) {
            const prop = ctx[temp ? 'rule' : 'prop'];
            return [this.renderRule(this.parseSide(prop.prefix)), vn, this.renderRule(this.parseSide(prop.suffix))];
        },
        renderId(name, type) {
            const ctxs = this.$handle[type === 'field' ? 'fieldCtx' : 'nameCtx'][name]
            return ctxs ? ctxs.map(ctx => this.renderCtx(ctx, ctx.parent)) : undefined;
        },
        renderCtx(ctx, parent) {
            if (ctx.type === 'hidden') return;
            const rule = ctx.rule;
            const preview = this.options.preview || false;
            if ((!this.cache[ctx.id]) || this.cache[ctx.id].slot !== rule.slot) {
                let vn;
                ctx.initProp();
                this.mergeGlobal(ctx);
                ctx.initNone();
                this.$manager.tidyRule(ctx);
                this.deepSet(ctx);
                this.setOptions(ctx);
                this.ctxProp(ctx);
                let prop = ctx.prop;

                if (prop.hidden) {
                    this.setCache(ctx, undefined, parent);
                    return;
                }
                vn = () => this.item(ctx, () => {
                    let children = {};
                    if (ctx.parser.renderChildren) {
                        children = ctx.parser.renderChildren(ctx);
                    } else if (ctx.parser.loadChildren !== false) {
                        children = this.renderChildren(ctx);
                    }
                    const slot = this.getTypeSlot(ctx.type);
                    let _vn;
                    if (slot) {
                        _vn = slot({
                            rule,
                            prop,
                            preview,
                            children,
                            api: this.$handle.api,
                            model: prop.model || {}
                        })
                    } else {
                        _vn = preview ? ctx.parser.preview(children, ctx) : ctx.parser.render(children, ctx);
                    }
                    _vn = this.renderSides(_vn, ctx);
                    if ((!(!ctx.input && is.Undef(prop.native))) && prop.native !== true) {
                        _vn = this.$manager.makeWrap(ctx, _vn);
                    }
                    if (ctx.none) {
                        _vn = this.display(_vn);
                    }
                    return _vn
                });
                this.setCache(ctx, vn, parent);
                ctx._vnode = vn;
                return vn;
            }

            return this.getCache(ctx);
        },
        getModelField(ctx) {
            return ctx.rule.modelField || ctx.parser.modelField || this.fc.modelFields[this.vNode.aliasMap[ctx.field]] || this.fc.modelFields[ctx.field] || this.fc.modelFields[ctx.originType] || 'modelValue';
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
            return this.vNode.h('FcFragment', {
                key: ctx.prop.key,
                formCreateInject: this.injectProp(ctx)
            }, vn);
        },
        isFragment(ctx) {
            return ctx.type === 'fragment' || ctx.type === 'template';
        },
        injectProp(ctx) {
            return {
                preview: this.options.preview || false,
                api: this.$handle.api,
                form: this.fc.create,
                subForm: subForm => {
                    this.$handle.addSubForm(ctx, subForm);
                },
                field: ctx.field,
                options: ctx.prop.options || [],
                children: ctx.rule.children,
                rule: ctx.rule,
            }
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
                    on: {
                        vnodeMounted: (vn) => {
                            vn.el.__rule__ = ctx.rule;
                            this.onMounted(ctx, vn.el);
                        }
                    }
                }
            ]

            if (!custom && ctx.input) {
                const field = this.getModelField(ctx);
                props.push({
                    on: {
                        [`update:${field}`]: (value) => {
                            this.onInput(ctx, value);
                        }
                    },
                    props: {
                        [field]: this.$handle.getFormData(ctx)
                    }
                })
            }
            mergeProps(props, ctx.prop);
            return ctx.prop;
        },
        onMounted(ctx, el) {
            ctx.el = this.vm.refs[ctx.ref] || el;
            ctx.parser.mounted(ctx);
            this.$handle.effect(ctx, 'mounted');
        },
        onInput(ctx, value) {
            this.$handle.onInput(ctx, value);
        },
        renderChildren(ctx) {
            const {children} = ctx.rule;

            if (!is.trueArray(children)) return {};
            const slotBag = makeSlotBag()
            children.map(child => {
                if (!child) return;
                if (is.String(child)) return slotBag.setSlot(null, child);
                if (child.__fc__) {
                    return this.renderSlot(slotBag, child.__fc__, ctx);
                }
                if (child.type) {
                    nextTick(() => {
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
                    v && slotBag.setSlot(v?.slot, () => this.renderRule(v));
                });
            }
            return this.vNode.make(type, rule, slotBag.mergeBag(children).getSlots());
        }
    })
}
