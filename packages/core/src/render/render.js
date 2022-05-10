import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {invoke, makeSlotBag, mergeRule} from '../frame/util';
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
                const slots = this.renderChildren(ctx.loadChildrenPending(), ctx);
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
            const opt = ctx.loadPending({key: 'options', origin: ctx.prop.options, def: []});
            ctx.prop.options = opt;
            if (ctx.prop.optionsTo && opt) {
                deepSet(ctx.prop, ctx.prop.optionsTo, opt);
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
            try {
                if (ctx.type === 'hidden') return;
                const rule = ctx.rule;
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
                    prop.preview = !!(hasProperty(prop, 'preview') ? prop.preview : (this.options.preview || false))
                    prop.props.formCreateInject = this.injectProp(ctx);
                    let cacheFlag = prop.cache !== false;
                    const preview = prop.preview;

                    if (prop.hidden) {
                        this.setCache(ctx, undefined, parent);
                        return;
                    }
                    vn = (...slotValue) => {
                        const inject = {
                            rule,
                            prop,
                            preview,
                            api: this.$handle.api,
                            model: prop.model || {},
                            slotValue
                        }
                        if (slotValue.length && rule.slotUpdate) {
                            invoke(() => rule.slotUpdate(inject))
                        }
                        let children = {};
                        const _load = ctx.loadChildrenPending();
                        if (ctx.parser.renderChildren) {
                            children = ctx.parser.renderChildren(_load, ctx);
                        } else if (ctx.parser.loadChildren !== false) {
                            children = this.renderChildren(_load, ctx);
                        }
                        const slot = this.getTypeSlot(ctx.type);
                        let _vn;
                        if (slot) {
                            inject.children = children;
                            _vn = slot(inject)
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
                        cacheFlag && this.setCache(ctx, () => _vn, parent);
                        return _vn
                    };
                    this.setCache(ctx, vn, parent);
                }
                return (...args) => {
                    const cache = this.getCache(ctx);
                    return cache && cache(...args);
                };
            } catch (e) {
                console.error(e);
                return;
            }
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
        isFragment(ctx) {
            return ctx.type === 'fragment' || ctx.type === 'template';
        },
        injectProp(ctx) {
            const state = this.vm.setupState;
            if (!state.ctxInject[ctx.id]) {
                state.ctxInject[ctx.id] = {
                    api: this.$handle.api,
                    form: this.fc.create,
                    subForm: subForm => {
                        this.$handle.addSubForm(ctx, subForm);
                    },
                    getSubForm: () => {
                        return this.$handle.subForm[ctx.id];
                    },
                    options: [],
                    children: [],
                    preview: false,
                    field: ctx.field,
                    rule: ctx.rule,
                    input: ctx.input,
                }
            }
            const inject = state.ctxInject[ctx.id];
            extend(inject, {
                preview: ctx.prop.preview,
                options: ctx.prop.options,
                children: ctx.loadChildrenPending()
            });
            return inject;
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
                const model = {
                    callback: (value) => {
                        this.onInput(ctx, value);
                    },
                    value: this.$handle.getFormData(ctx)
                };
                props.push({
                    on: {
                        [`update:${field}`]: model.callback
                    },
                    props: {
                        [field]: model.value
                    }
                })
                ctx.prop.model = model;
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
        renderChildren(children, ctx) {
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
            if (prop.component)
                return this.vNode.makeComponent(prop.component, prop, children);
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
            const props = {...rule};
            delete props.type;
            delete props.is;
            return this.vNode.make(type, props, slotBag.mergeBag(children).getSlots());
        }
    })
}
