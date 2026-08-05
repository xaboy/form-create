import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {invoke, makeSlotBag, mergeRule} from '../frame/util';
import toCase, {lower} from '@form-create/utils/lib/tocase';
import {deepSet, toLine} from '@form-create/utils';
import {computed, nextTick} from 'vue';

//manager.mergeProp / makeWrap 会改写的布局字段；value-only 复用前必须从 rule 重建
const layoutPropKeys = ['info', 'wrap', 'col', 'title'];

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
                //fragment 自身不产出 vnode，原先每轮渲染都要重算一次 prop。
                //prop 的依赖与 renderCtx 完全相同，因此沿用 clearCache 的失效时机按 ctx 记忆
                if (this.force || !this.fragmentProp[ctx.id]) {
                    ctx.initProp();
                    this.mergeGlobal(ctx);
                    ctx.initNone();
                    this.fragmentProp[ctx.id] = true;
                }
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
            //缓存按 trueType 共享，闭包只保留类型名，避免长期持有首个该类型的 ctx
            const {trueType, originType, type} = ctx;
            if (!this.cacheConfig[trueType]) {
                this.cacheConfig[trueType] = computed(() => {
                    const g = this.$handle.options.global;
                    return mergeRule({}, [g['*'] || g.default || {}, g[originType] || g[type] || {}]);
                });
            }
            ctx.prop = mergeRule({}, [this.cacheConfig[trueType].value, ctx.prop]);
        },
        //value-only 跳过了 tidyRule/mergeProp，而 makeWrap 会原地 delete wrap.title/class，
        //render 也会改写 wrap/native。这里从 rule 还原布局字段再走 manager 合并，
        //避免污染后的 prop 被下一轮复用。
        renewLayoutProp(ctx) {
            const prop = ctx.prop;
            if (!prop) return;
            const rule = ctx.rule;
            layoutPropKeys.forEach(name => {
                if (hasProperty(rule, name)) {
                    const val = rule[name];
                    //浅拷贝，避免后续 deepSet / tidyRule 写回污染原始 rule
                    prop[name] = is.Object(val) ? {...val} : val;
                } else {
                    delete prop[name];
                }
            });
            if (hasProperty(rule, 'native')) {
                prop.native = rule.native;
            } else {
                delete prop.native;
            }
            this.$manager.tidyRule(ctx);
            //与完整构建对齐：deep 可能写 wrap/col/title，必须在 mergeProp 前重放
            this.deepSet(ctx);
            this.$manager.mergeProp(ctx);
        },
        setOptions(ctx) {
            const opt = ctx.loadPending({key: 'options', origin: ctx.prop.options, def: []});
            ctx.prop.options = opt;
            if (ctx.prop.optionsTo && opt) {
                deepSet(ctx.prop, ctx.prop.optionsTo, opt);
            }
        },
        deepSet(ctx) {
            const deep = ctx.prop.deep;
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
                if (this.force || (!this.cache[ctx.id]) || this.cache[ctx.id].slot !== rule.slot) {
                    let vn;
                    //value-only：setValue 已写回 model，父链也只需重拼 vnode，不必重跑 prop 管线
                    const reuseProp = !this.force && this.valueOnly[ctx.id] && ctx.prop;
                    delete this.valueOnly[ctx.id];
                    if (!reuseProp) {
                        ctx.initProp();
                        this.mergeGlobal(ctx);
                        ctx.initNone();
                        this.$manager.tidyRule(ctx);
                        this.deepSet(ctx);
                        this.setOptions(ctx);
                        this.ctxProp(ctx);
                    } else {
                        //makeWrap / render 会原地改写 wrap、native 等布局字段；
                        //value-only 跳过了 tidyRule/mergeProp，必须从 rule 重建后再合并
                        this.renewLayoutProp(ctx);
                    }
                    let prop = ctx.prop;
                    prop.preview = !!(prop.preview != null ? prop.preview : this.$handle.preview);
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
                        Object.keys(prop.renderSlots || {}).forEach(key => {
                            children[key] = (...args) => {
                                if (is.Function(prop.renderSlots[key])) {
                                    return invoke(() => prop.renderSlots[key](...args));
                                }
                                const rule = this.parseSide(prop.renderSlots[key], ctx);
                                return this.renderRule(rule);
                            }
                        })
                        const slot = this.getTypeSlot(ctx);
                        let _vn;
                        if (slot) {
                            inject.children = children;
                            _vn = slot(inject)
                        } else {
                            //children 每轮 vn() 新建；内置 parser 不 mutate，无需再浅拷贝
                            _vn = preview ? ctx.parser.preview(children, ctx) : ctx.parser.render(children, ctx);
                        }
                        _vn = this.renderSides(_vn, ctx);
                        if (prop.title?.show) {
                            prop.wrap = {show: true, ... prop.wrap||{}};
                            if(!prop.native) {
                                prop.native = false;
                            }
                        }
                        if (((!(!ctx.input && is.Undef(prop.native))) || prop.col?.show === true) && prop.native !== true) {
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
                vn.props.class = this.mergeClass(vn.props.class, 'fc-none')
                return vn;
            }
        },
        mergeClass(target, value) {
            if (Array.isArray(target)) {
                target.push(value);
            } else {
                return target ? [target, value] : value;
            }
            return target;
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
                    slots: () => {
                        return this.vm.setupState.top.slots;
                    },
                    getWrap: () => {
                        return this.vm.refs[ctx.wrapRef];
                    },
                    options: [],
                    children: [],
                    preview: false,
                    id: ctx.id,
                    field: ctx.field,
                    rule: ctx.rule,
                    input: ctx.input,
                    t: (...args) => {
                        return this.$handle.api.t(...args);
                    },
                    updateValue: (data) => {
                        this.$handle.onUpdateValue(ctx, data);
                    }
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
        //事件回调挂在 ctx 上复用，避免 cache miss 时换新函数逼迫子组件更新
        ensureCtxHandlers(ctx) {
            if (ctx.handlers) {
                return ctx.handlers;
            }
            const render = this;
            ctx.handlers = {
                vnodeMounted(vn) {
                    vn.el.__rule__ = ctx.rule;
                    render.onMounted(ctx, vn.el);
                },
                vnodeBeforeUnmount() {
                    render.$handle.effect(ctx, 'beforeUnmount');
                    render.$handle.targetHook(ctx, 'beforeUnmount');
                },
                fcUpdateValue(data) {
                    render.$handle.onUpdateValue(ctx, data);
                },
                fcEl(el) {
                    ctx.exportEl = el;
                    if (el) {
                        (el.$el || el).__rule__ = ctx.rule;
                    }
                },
                modelCallback(value) {
                    render.tmpInput && render.tmpInput(ctx.field, value, ctx.rule);
                    render.onInput(ctx, value);
                },
                modelEmit() {
                    render.onEmitInput(ctx);
                }
            };
            return ctx.handlers;
        },
        ctxProp(ctx) {
            const {ref, key, rule} = ctx;
            this.$manager.mergeProp(ctx);
            ctx.parser.mergeProp(ctx);
            const handlers = this.ensureCtxHandlers(ctx);
            const props = [
                {
                    ref: ref,
                    key: rule.key || `${key}fc`,
                    slot: undefined,
                    on: {
                        vnodeMounted: handlers.vnodeMounted,
                        vnodeBeforeUnmount: handlers.vnodeBeforeUnmount,
                        'fc.updateValue': handlers.fcUpdateValue,
                        'fc.el': handlers.fcEl
                    }
                }
            ]

            if (ctx.input) {
                if (this.vm.props.disabled === true) {
                    ctx.prop.props.disabled = true;
                }
                const field = this.getModelField(ctx);
                const model = {
                    callback: handlers.modelCallback,
                    modelField: field,
                    value: this.$handle.getFormData(ctx)
                };
                props.push({
                    on: {
                        [`update:${field}`]: model.callback,
                        ...(ctx.prop.modelEmit ? {
                            [ctx.prop.modelEmit]: handlers.modelEmit
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
            this.$handle.targetHook(ctx, 'mounted');
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
                if (is.String(child) || is.Number(child)) return slotBag.setSlot(null, `${child}`);
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
            if (prop.component) {
                if (typeof prop.component === 'string') {
                    return this.vNode.make(prop.component, prop, children);
                } else {
                    return this.vNode.makeComponent(prop.component, prop, children);
                }
            }
            if (this.vNode[ctx.type])
                return this.vNode[ctx.type](prop, children);
            if (this.vNode[ctx.originType])
                return this.vNode[ctx.originType](prop, children);
            return this.vNode.make(lower(prop.type), prop, children);
        },
        createChildrenVnodes(ctx, onInput, force) {
            this.force = force !== false;
            this.tmpInput = onInput;
            const res = this.renderChildren(ctx.rule.children, ctx);
            this.force = false;
            this.tmpInput = null;
            return res;
        },
        createRuleVnode(ctx, onInput, force) {
            this.force = force !== false;
            this.tmpInput = onInput;
            const slotBag = makeSlotBag();
            this.renderSlot(slotBag, ctx, ctx.parent);
            this.force = false;
            this.tmpInput = null;
            return slotBag.getSlots();
        },
        renderRule(rule, children, origin) {
            if (!rule) return undefined;
            if (is.String(rule) || is.Number(rule)) return `${rule}`;

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
