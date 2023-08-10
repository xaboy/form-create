import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {_vue as Vue} from '../frame';
import {tip} from '@form-create/utils/lib/console';
import {invoke, mergeRule} from '../frame/util';
import toCase, {lower} from '@form-create/utils/lib/tocase';
import {$set, deepSet, toLine} from '@form-create/utils';

export default function useRender(Render) {
    extend(Render.prototype, {
        initRender() {
            this.tempList = {};
            this.clearOrgChildren();
        },
        initOrgChildren() {
            const ctxs = this.$handle.ctxs;
            this.orgChildren = Object.keys(ctxs).reduce((initial, id) => {
                if (ctxs[id].parser.loadChildren !== false) {
                    const children = ctxs[id].rule.children;
                    initial[id] = is.trueArray(children) ? [...children] : [];
                }

                return initial;
            }, {});

        },
        clearOrgChildren() {
            this.orgChildren = {};
        },
        getTypeSlot(ctx) {
            const _fn = (vm) => {
                if (vm) {
                    let slot = undefined;
                    if (ctx.rule.field) {
                        slot = vm.$scopedSlots['field-' + toLine(ctx.rule.field)] || vm.$scopedSlots['field-' + ctx.rule.field];
                    }
                    if (!slot) {
                        slot = vm.$scopedSlots['type-' + toLine(ctx.type)] || vm.$scopedSlots['type-' + ctx.type];
                    }
                    if (slot) {
                        return slot;
                    }
                    return _fn(vm.$pfc);
                }
            }
            return _fn(this.vm);
        },
        render() {
            if (!this.vm.isShow) {
                return;
            }
            this.$h = this.vm.$createElement;
            this.$manager.beforeRender();

            let vn;

            const make = () => this.renderList();
            make.renderSlot = slot => this.renderList(slot);
            make.renderName = name => this.renderId(name);
            make.renderField = field => this.renderId(field, 'field');

            if (this.vm.$scopedSlots.container) {
                vn = [this.vm.$scopedSlots.container(make)];
            } else {
                vn = make();
            }
            return this.$manager.render(vn);
        },
        renderList(slot) {
            return this.sort.map((id) => {
                return slot ? this.renderSlot(this.$handle.ctxs[id], slot) : this.renderCtx(this.$handle.ctxs[id]);
            }).filter((val) => val !== undefined);
        },
        makeVm(rule) {
            const vm = rule.vm;
            if (!vm)
                return new Vue;
            else if (is.Function(vm))
                return invoke(() => rule.vm(this.$handle.getInjectData(rule)));
            else if (!vm._isVue)
                return new Vue(vm);
            return vm;
        },
        mergeGlobal(ctx) {
            const g = this.$handle.options.global;
            if (!g) return;
            //todo 缓存配置,更新 option 更新
            if (!ctx.cacheConfig)
                ctx.cacheConfig = g[ctx.originType] || g[ctx.type] || g[ctx.trueType] || {};
            ctx.prop = mergeRule({}, [g['*'], ctx.cacheConfig, ctx.prop]);
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
        setTempProps(vm, ctx) {
            if (!vm.$props) return;

            const {prop} = ctx;
            const keys = Object.keys(vm.$props);
            const inject = this.injectProp(ctx);
            const injectKeys = Object.keys(inject);

            keys.forEach(key => {
                if (hasProperty(prop.props, key))
                    vm.$props[key] = prop.props[key];
                else if (injectKeys.indexOf(key) > -1) vm.$props[key] = inject[key];
            });

            const key = (vm.$options.model && vm.$options.model.prop) || 'value';
            if (keys.indexOf(key) > -1) {
                vm.$props[key] = prop.value;
            }
        },
        renderTemp(ctx) {
            if (!Vue.compile) {
                tip('当前使用的Vue构建版本不支持compile,无法使用template功能');
                return [];
            }
            const rule = ctx.prop;
            const {id, key} = ctx;

            if (!this.tempList[id]) {
                if (!ctx.el) {
                    ctx.el = this.makeVm(rule);
                    this.vm.$nextTick(() => ctx.parser.mounted(ctx));
                }

                let vm = ctx.el;
                if (ctx.input)
                    vm.$on((vm.$options.model && vm.$options.model.event) || 'input', (value) => {
                        this.onInput(ctx, value);
                    });

                this.tempList[id] = {
                    vm,
                    template: Vue.compile(rule.template)
                };
            }

            const {vm, template} = this.tempList[id];

            this.setTempProps(vm, ctx);

            const vn = template.render.call(vm);

            if (is.Undef(vn.data)) vn.data = {};
            vn.key = key;
            vn.data.ref = ctx.ref;
            vn.data.key = key;
            return vn;
        },
        parseSide(side, ctx) {
            return is.Object(side) ? mergeRule({props: {formCreateInject: ctx.prop.props.formCreateInject}}, side) : side;
        },
        renderSides(vn, ctx, temp) {
            const prop = ctx[temp ? 'rule' : 'prop'];
            return [this.renderRule(this.parseSide(prop.prefix, ctx)), vn, this.renderRule(this.parseSide(prop.suffix, ctx))];

        },
        renderSlot(ctx, slot) {
            return ctx.rule.slot === slot ? this.renderCtx(ctx) : undefined;
        },
        renderId(name, type) {
            const ctxs = this.$handle[type === 'field' ? 'fieldCtx' : 'nameCtx'][name]
            return ctxs ? ctxs.map(ctx => this.renderCtx(ctx, ctx.parent)) : undefined;
        },
        renderCtx(ctx, parent) {
            if (ctx.type === 'hidden') return;
            const rule = ctx.rule;
            if ((!this.cache[ctx.id]) || this.cache[ctx.id].slot !== rule.slot) {
                let vn;
                let cacheFlag = rule.cache !== false;
                const _type = ctx.trueType;
                const none = !(is.Undef(rule.display) || !!rule.display);
                if (_type === 'template' && !rule.template) {
                    vn = this.renderSides(this.renderChildren(ctx), ctx, true);
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
                    this.deepSet(ctx);
                    this.setOptions(ctx);
                    this.ctxProp(ctx);
                    let prop = ctx.prop;
                    prop.preview = !!(hasProperty(prop, 'preview') ? prop.preview : (this.options.preview || false))
                    prop.props.formCreateInject = this.injectProp(ctx);
                    const preview = prop.preview;

                    if (prop.hidden) {
                        this.setCache(ctx, undefined, parent);
                        return;
                    }

                    if (_type === 'template' && prop.template) {
                        vn = this.renderTemp(ctx);
                        cacheFlag = false;
                    } else {
                        let children = [];
                        if (ctx.parser.renderChildren) {
                            children = ctx.parser.renderChildren(ctx);
                        } else if (ctx.parser.loadChildren !== false) {
                            children = this.renderChildren(ctx);
                        }
                        const slot = this.getTypeSlot(ctx);
                        if (slot) {
                            vn = slot({
                                rule,
                                prop,
                                preview,
                                children,
                                api: this.$handle.api,
                                model: prop.model || {}
                            });
                        } else {
                            vn = preview ? ctx.parser.preview(children, ctx) : ctx.parser.render(children, ctx);
                        }
                    }
                    vn = this.renderSides(vn, ctx);
                    if ((!(!ctx.input && is.Undef(prop.native))) && prop.native !== true) {
                        vn = this.$manager.makeWrap(ctx, vn);
                    }
                    if (none) {
                        vn = this.display(vn);
                    }
                    vn = this.item(ctx, vn)
                }
                if (cacheFlag) {
                    this.setCache(ctx, vn, parent);
                }
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
            if (vn && vn.data) {
                if (Array.isArray(vn.data.style)) {
                    vn.data.style.push({display: 'none'});
                } else if(is.String(vn.data.style)) {
                    vn.data.style += ';display:none;';
                } else {
                    vn.data.style = [vn.data.style, {display: 'none'}];
                }
                return vn;
            }
        },
        item(ctx, vn) {
            return this.$h('fcFragment', {
                slot: ctx.rule.slot,
                key: ctx.key,
            }, [vn]);
        },
        injectProp(ctx) {
            if (!this.vm.ctxInject[ctx.id]) {
                $set(this.vm.ctxInject, ctx.id, {
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
                    prop: {},
                    preview: false,
                    field: ctx.field,
                    rule: ctx.rule,
                    input: ctx.input,
                });
            }
            const inject = this.vm.ctxInject[ctx.id];
            extend(inject, {
                preview: ctx.prop.preview,
                options: ctx.prop.options,
                children: ctx.rule.children,
                prop: (function () {
                    const temp = {...ctx.prop};
                    temp.on = temp.on ? {...temp.on} : {};
                    delete temp.model;
                    return temp;
                }()),
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
                        'hook:mounted': () => {
                            this.onMounted(ctx);
                        },
                        'fc.sub-form': (subForm) => {
                            this.$handle.addSubForm(ctx, subForm);
                        },
                        'fc.el': (el) => {
                            ctx.exportEl = el;
                            if (el) {
                                (el.$el || el).__rule__ = ctx.rule;
                            }
                        }
                    },
                }
            ]

            if (!custom && ctx.input) {
                ctx.prop.model = {
                    value: this.$handle.getFormData(ctx),
                    callback: (value) => {
                        this.onInput(ctx, value);
                    },
                    expression: `formData.${ctx.id}`
                };
            }
            mergeProps(props, ctx.prop);
            return ctx.prop;
        },
        onMounted(ctx) {
            ctx.el = this.vm.$refs[ctx.ref];
            if (ctx.el) {
                (ctx.el.$el || ctx.el).__rule__ = ctx.rule;
            }
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
                return [];
            }

            orgChildren && this.$handle.deferSyncValue(() => {
                orgChildren.forEach(child => {
                    if (!child) return;
                    if (children.indexOf(child) === -1 && isRm(child)) {
                        this.$handle.rmCtx(child.__fc__);
                    }
                });
            });

            return children.map(child => {
                if (!child) return;
                if (is.String(child)) return child;
                if (child.__fc__) {
                    return this.renderCtx(child.__fc__, ctx);
                }
                if (child.type) {
                    this.vm.$nextTick(() => {
                        this.$handle.loadChildren(children, ctx);
                        this.$handle.refresh();
                    });
                }
            });

        },
        defaultRender(ctx, children) {
            const prop = ctx.prop;
            if(prop.component)
                return this.vNode.makeComponent(prop.component, prop, children)
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
            let data = [[children]];
            if (is.trueArray(rule.children)) {
                data.push(rule.children.map(v => this.renderRule(v)));
            }
            return this.$h(type, {...rule}, data);
        }
    })
}
