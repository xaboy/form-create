import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {_vue as Vue} from '../frame';
import {tip} from '@form-create/utils/lib/console';
import {invoke, mergeRule} from '../frame/util';
import toCase, {lower} from '@form-create/utils/lib/tocase';
import {deepSet} from '@form-create/utils';

function setTempProps(vm, ctx, api) {
    if (!vm.$props) return;

    const {prop} = ctx;
    const keys = Object.keys(vm.$props);
    const inject = injectProp(ctx, api);
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
}

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
            this.renderList = {};
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
            if (!this.vm.isShow) {
                return;
            }
            this.$h = this.vm.$createElement;
            this.$manager.beforeRender();

            const vn = this.sort.map((id) => {
                return this.renderCtx(this.$handle.ctxs[id]);
            }).filter((val) => val !== undefined);

            return this.$manager.render(vn);
        },
        makeVm(rule) {
            const vm = rule.vm;
            if (!vm)
                return new Vue;
            else if (is.Function(vm))
                return invoke(() => vm(this.$handle.getInjectData(rule)));
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
        renderTemp(ctx) {
            if (!Vue.compile) {
                tip('当前使用的Vue构建版本不支持compile,无法使用template功能');
                return [];
            }
            const rule = ctx.prop;
            const {id, key} = ctx;

            if (!this.renderList[id]) {
                if (!ctx.el) {
                    ctx.el = this.makeVm(rule);
                    this.vm.$nextTick(() => ctx.parser.mounted(ctx));
                }

                let vm = ctx.el;
                if (ctx.input)
                    vm.$on((vm.$options.model && vm.$options.model.event) || 'input', (value) => {
                        this.onInput(ctx, value);
                    });

                this.renderList[id] = {
                    vm,
                    template: Vue.compile(rule.template)
                };
            }

            const {vm, template} = this.renderList[id];

            setTempProps(vm, ctx, this.$handle.api);

            const vn = template.render.call(vm);

            if (is.Undef(vn.data)) vn.data = {};
            vn.key = key;
            vn.data.ref = ctx.ref;
            vn.data.key = key;
            return vn;
        },
        renderSides(vn, ctx, temp) {
            const prop = ctx[temp ? 'rule' : 'prop'];
            return [this.renderRule(prop.prefix), vn, this.renderRule(prop.suffix)];
        },
        renderCtx(ctx, parent) {
            if (ctx.type === 'hidden') return;
            if (!this.cache[ctx.id]) {
                let vn;
                let cacheFlag = true;
                const _type = ctx.trueType;
                const none = !(is.Undef(ctx.rule.display) || !!ctx.rule.display);
                if (_type === 'template' && !ctx.rule.template) {
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
                    this.setOptions(ctx);
                    this.ctxProp(ctx);
                    let prop = ctx.prop;

                    if (prop.hidden) {
                        this.setCache(ctx, undefined, parent);
                        return;
                    }

                    if (_type === 'template' && prop.template) {
                        vn = this.renderTemp(ctx);
                        cacheFlag = false;
                    } else {
                        vn = ctx.parser.render(this.renderChildren(ctx), ctx);
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
        ctxProp(ctx, custom) {
            const {ref, key, rule} = ctx;
            this.$manager.mergeProp(ctx, custom);
            ctx.parser.mergeProp(ctx, custom);
            const props = [
                {
                    props: injectProp(ctx, this.$handle.api),
                    ref: ref,
                    key: rule.key || `${key}fc`,
                    slot: undefined,
                }
            ]

            if (!custom) {
                props.push({
                    on: {
                        'hook:mounted': () => {
                            this.onMounted(ctx);
                        },
                        'fc.sub-form': (subForm) => {
                            this.$handle.addSubForm(ctx, subForm);
                        }
                    },
                    model: ctx.input ? {
                        value: this.$handle.getFormData(ctx),
                        callback: (value) => {
                            this.onInput(ctx, value);
                        },
                        expression: `formData.${ctx.field}`
                    } : undefined,
                })
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
                if (!this.$handle.isRepeatRule(child.__origin__ || child) && child.type) {
                    this.vm.$nextTick(() => {
                        this.$handle.loadChildren(children, ctx);
                        this.$handle.refresh();
                    });
                }
            });

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
            let data = [[children]];
            if (is.trueArray(rule.children)) {
                data.push(rule.children.map(v => this.renderRule(v)));
            }
            return this.$h(type, {...rule}, data);
        }
    })
}
