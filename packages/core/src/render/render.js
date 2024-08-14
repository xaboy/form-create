import extend, {copy} from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is from '@form-create/utils/lib/type';
import {invoke, makeSlotBag, mergeRule} from '../frame/util';
import toCase, {lower} from '@form-create/utils/lib/tocase';
import {deepSet, toLine} from '@form-create/utils';
import {computed, nextTick} from 'vue';

export default function useRender(Render) {
    extend(Render.prototype, {
        initRender() {
            this.cacheConfig = {};
        },
        getTypeSlot(ctx) {
            const _fn = (vm) => {
                if (vm) {
                    let slot = undefined;
                    if (ctx.rule.field) {
                        slot = vm.slots['field-' + toLine(ctx.rule.field)] || vm.slots['field-' + ctx.rule.field];
                    }
                    if (!slot) {
                        slot = vm.slots['type-' + toLine(ctx.type)] || vm.slots['type-' + ctx.type];
                    }
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
        parseSide(side, ctx) {
            return is.Object(side) ? mergeRule({props: {formCreateInject: ctx.prop.props.formCreateInject}}, side) : side;
        },
        renderSides(vn, ctx, temp) {
            const prop = ctx[temp ? 'rule' : 'prop'];
            return [this.renderRule(this.parseSide(prop.prefix, ctx)), vn, this.renderRule(this.parseSide(prop.suffix, ctx))];
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
                    prop.preview = !!(prop.preview != null ? prop.preview : (this.vm.props.preview !== undefined ? this.vm.props.preview : (this.options.preview || false)));
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
                        const slot = this.getTypeSlot(ctx);
                        let _vn;
                        if (slot) {
                            inject.children = children;
                            _vn = slot(inject)
                        } else {
                            _vn = preview ? ctx.parser.preview(copy(children), ctx) : ctx.parser.render(copy(children), ctx);
                        }
                        _vn = this.renderSides(_vn, ctx);
                        if ((!(!ctx.input && is.Undef(prop.native))) && prop.native !== true) {
                            this.fc.targetFormDriver('updateWrap', ctx)
                            _vn = this.$manager.makeWrap(ctx, _vn);
                        }
                        if (ctx.none) {
                            if (Array.isArray(_vn)) {
                                _vn = _vn.map(v => {
                                    if (!v || !v.__v_isVNode) {
                                        return v;
                                    }
                                    return this.none(v);
                                });
                            } else {
                                _vn = this.none(_vn);
                            }
                        }
                        cacheFlag && this.setCache(ctx, () => {
                            return this.stable(_vn);
                        }, parent);
                        return _vn
                    };
                    this.setCache(ctx, vn, parent);
                }
                return (...args) => {
                    const cache = this.getCache(ctx);
                    if (cache) {
                        return cache(...args);
                    } else if (this.cache[ctx.id]) {
                        return;
                    }
                    const _vn = this.renderCtx(ctx, ctx.parent);
                    if (_vn) {
                        return _vn();
                    }
                };
            } catch (e) {
                console.error(e);
                return;
            }
        },
        none(vn) {
            if (vn) {
                if (Array.isArray(vn.props.class)) {
                    vn.props.class.push('fc-none');
                } else {
                    vn.props.class = vn.props.class ? [vn.props.class, 'fc-none'] : 'fc-none';
                }
                return vn;
            }
        },
        stable(vn) {
            const list = Array.isArray(vn) ? vn : [vn];
            list.forEach(v => {
                if (v && v.__v_isVNode && v.children && typeof v.children === 'object') {
                    v.children.$stable = true;
                    this.stable(v.children);
                }
            });
            return vn;
        },
        getModelField(ctx) {
            return ctx.prop.modelField || ctx.parser.modelField || this.fc.modelFields[this.vNode.aliasMap[ctx.type]] || this.fc.modelFields[ctx.type] || this.fc.modelFields[ctx.originType] || 'modelValue';
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
                    id: ctx.id,
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
        ctxProp(ctx) {
            const {ref, key, rule} = ctx;
            this.$manager.mergeProp(ctx);
            ctx.parser.mergeProp(ctx);
            const props = [
                {
                    ref: ref,
                    key: rule.key || `${key}fc`,
                    slot: undefined,
                    on: {
                        vnodeMounted: (vn) => {
                            vn.el.__rule__ = ctx.rule;
                            this.onMounted(ctx, vn.el);
                        },
                        'fc.updateValue': (data) => {
                            this.$handle.onUpdateValue(ctx, data);
                        },
                        'fc.el': (el) => {
                            ctx.exportEl = el;
                            if (el) {
                                (el.$el || el).__rule__ = ctx.rule;
                            }
                        }
                    }
                }
            ]

            if (ctx.input) {
                if (this.vm.props.disabled === true) {
                    ctx.prop.props.disabled = true;
                }
                const field = this.getModelField(ctx);
                const model = {
                    callback: (value) => {
                        this.onInput(ctx, value);
                    },
                    value: this.$handle.getFormData(ctx)
                };
                props.push({
                    on: {
                        [`update:${field}`]: model.callback,
                        ...(ctx.prop.modelEmit ? {
                            [ctx.prop.modelEmit]: () => this.onEmitInput(ctx)
                        } : {}),
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
            if (ctx.prop.modelEmit) {
                this.$handle.onBaseInput(ctx, value);
                return;
            }
            this.$handle.onInput(ctx, value);
        },
        onEmitInput(ctx) {
            this.$handle.setValue(ctx, ctx.parser.toValue(ctx.modelValue, ctx), ctx.modelValue);
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
            if (prop.component){
                if(typeof prop.component === 'string'){
                    return this.vNode.make(prop.component, prop, children);
                }else{
                    return this.vNode.makeComponent(prop.component, prop, children);
                }
            }
            if (this.vNode[ctx.type])
                return this.vNode[ctx.type](prop, children);
            if (this.vNode[ctx.originType])
                return this.vNode[ctx.originType](prop, children);
            return this.vNode.make(lower(prop.type), prop, children);
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
