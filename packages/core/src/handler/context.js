import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import BaseParser from '../factory/parser';
import {$del} from '@form-create/utils/lib/modify';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {condition, deepGet, invoke} from '../frame/util';
import {toRef, watch} from 'vue';
import {attrs} from '../frame/attrs';
import {deepSet} from '@form-create/utils';

const noneKey = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject', 'sync', 'payload', 'optionsTo', 'update', 'slotUpdate', 'computed', 'component', 'cache'];

export default function useContext(Handler) {
    extend(Handler.prototype, {
        getCtx(id) {
            return this.getFieldCtx(id) || this.getNameCtx(id)[0] || this.ctxs[id];
        },
        getCtxs(id) {
            return this.fieldCtx[id] || this.nameCtx[id] || (this.ctxs[id] ? [this.ctxs[id]] : []);
        },
        setIdCtx(ctx, key, type) {
            const field = `${type}Ctx`;
            if (!this[field][key]) {
                this[field][key] = [ctx];
            } else {
                this[field][key].push(ctx);
            }
        },
        rmIdCtx(ctx, key, type) {
            const field = `${type}Ctx`;
            const lst = this[field][key];
            if (!lst) return false;
            const flag = lst.splice(lst.indexOf(ctx) >>> 0, 1).length > 0;
            if (!lst.length) {
                delete this[field][key];
            }
            return flag;
        },
        getFieldCtx(field) {
            return (this.fieldCtx[field] || [])[0];
        },
        getNameCtx(name) {
            return this.nameCtx[name] || [];
        },
        setCtx(ctx) {
            let {id, field, name, rule} = ctx;
            this.ctxs[id] = ctx;
            name && this.setIdCtx(ctx, name, 'name');
            if (!ctx.input) return;
            this.setIdCtx(ctx, field, 'field');
            this.setFormData(ctx, ctx.parser.toFormValue(rule.value, ctx));
            if (this.isMounted && !this.reloading) {
                this.vm.emit('change', ctx.field, rule.value, ctx.origin, this.api);
            }
        },
        getParser(ctx) {
            const list = this.fc.parsers;
            const renderDriver = this.fc.renderDriver;
            if(renderDriver) {
                const list = renderDriver.parsers || {};
                const parser = list[ctx.originType] || list[toCase(ctx.type)] || list[ctx.trueType];
                if(parser) {
                    return parser;
                }
            }
            return list[ctx.originType] || list[toCase(ctx.type)] || list[ctx.trueType] || BaseParser;
        },
        bindParser(ctx) {
            ctx.setParser(this.getParser(ctx));
        },
        getType(alias) {
            const map = this.fc.CreateNode.aliasMap;
            const type = map[alias] || map[toCase(alias)] || alias;
            return toCase(type);
        },
        noWatch(fn) {
            if (!this.noWatchFn) {
                this.noWatchFn = fn;
            }
            invoke(fn);
            if (this.noWatchFn === fn) {
                this.noWatchFn = null;
            }
        },
        watchCtx(ctx) {
            const all = attrs();
            all.filter(k => k[0] !== '_' && k[0] !== '$' && noneKey.indexOf(k) === -1).forEach((key) => {
                const ref = toRef(ctx.rule, key);
                const flag = key === 'children';
                ctx.refRule[key] = ref;
                ctx.watch.push(watch(flag ? () => is.Function(ref.value) ? ref.value : [...(ref.value || [])] : () => ref.value, (_, o) => {
                    let n = ref.value;
                    if (this.isBreakWatch()) return;
                    if (flag && ctx.parser.loadChildren === false) {
                        this.$render.clearCache(ctx);
                        this.nextRefresh();
                        return;
                    }
                    this.watching = true;
                    if (key === 'link') {
                        ctx.link();
                        return;
                    } else if (['props', 'on', 'deep'].indexOf(key) > -1) {
                        this.parseInjectEvent(ctx.rule, n || {});
                        if (key === 'props' && ctx.input) {
                            this.setFormData(ctx, ctx.parser.toFormValue(ctx.rule.value, ctx));
                        }
                    } else if (key === 'emit') {
                        this.parseEmit(ctx);
                    } else if (key === 'hidden' && Boolean(n) !== Boolean(o)) {
                        this.$render.clearCacheAll();
                    } else if (['prefix', 'suffix'].indexOf(key) > -1)
                        n && this.loadFn(n, ctx.rule);
                    else if (key === 'type') {
                        ctx.updateType();
                        this.bindParser(ctx);
                    } else if (flag) {
                        if (is.Function(o)) {
                            o = ctx.getPending('children', []);
                        }
                        if (is.Function(n)) {
                            n = ctx.loadChildrenPending();
                        }
                        this.updateChildren(ctx, n, o);
                    }
                    this.$render.clearCache(ctx);
                    this.refresh();
                    this.watching = false;
                }, {deep: !flag, sync: flag}));
            });
            if (ctx.input) {
                const val = toRef(ctx.rule, 'value');
                ctx.watch.push(watch(() => val.value, () => {
                    let formValue = ctx.parser.toFormValue(val.value, ctx);
                    if (this.isChange(ctx, formValue)) {
                        this.setValue(ctx, val.value, formValue, true);
                    }
                }));
            }
            this.bus.$once('load-end', () => {
                let computed = ctx.rule.computed;
                if (!computed) {
                    return;
                }
                if (typeof computed !== 'object') {
                    computed = {value: computed}
                }
                Object.keys(computed).forEach(k => {
                    ctx.watch.push(watch(() => {
                        const item = computed[k];
                        if (!item) return undefined;
                        let fn;
                        if (typeof item === 'object') {
                            const group = ctx.getParentGroup();
                            const checkCondition = (item) => {
                                item = Array.isArray(item) ? {mode: 'AND', group: item} : item;
                                if (!is.trueArray(item.group)) {
                                    return true;
                                }
                                const or = item.mode === 'OR';
                                let valid = true;
                                for (let i = 0; i < item.group.length; i++) {
                                    const one = item.group[i];
                                    let flag;
                                    if (one.mode) {
                                        flag = checkCondition(one);
                                    } else if (!condition[one.condition]) {
                                        flag = false;
                                    } else {
                                        flag = (new Function('_$', '_$val', '$form', '_group', `with($form){with(this){with(_group){ return _$['${one.condition}'](${one.field}, ${one.compare ? one.compare : '_$val'}); }}}`)).call(this.api.form, condition, one.value, this.api.top.form, group ? (this.subRuleData[group.id] || {}) : {});
                                    }
                                    if (or && flag) {
                                        return true;
                                    }
                                    if (!or) {
                                        valid = valid && flag;
                                    }
                                }
                                return or ? false : valid;
                            }
                            const val = checkCondition(item);
                            return item.invert === true ? !val : val;
                        } else if (is.Function(item)) {
                            fn = () => item(this.api.form, this.api);
                        } else {
                            const group = ctx.getParentGroup();
                            fn = () => (new Function('_formulas', '$form', '_group', '$rule', '$api', `with($form){with(this){with(_group){with(_formulas){ return ${item} }}}}`)).call(this.api.form, this.fc.formulas, this.api.top.form, group ? (this.subRuleData[group.id] || {}) : {}, ctx.rule, this.api);
                        }
                        return invoke(fn, undefined);
                    }, (n) => {
                        setTimeout(() => {
                            if (k === 'value') {
                                this.onInput(ctx, n);
                            } else if (k[0] === '$') {
                                this.api.setEffect(ctx.id, k, n);
                            } else {
                                deepSet(ctx.rule, k, n);
                            }
                        });
                    }, {immediate: k === 'value' ? [undefined, null, ''].indexOf(ctx.rule.value) > -1 : true}));
                });

            });
            this.watchEffect(ctx);
        },
        updateChildren(ctx, n, o) {
            this.deferSyncValue(() => {
                o && o.forEach((child) => {
                    if ((n || []).indexOf(child) === -1 && child && !is.String(child) && child.__fc__ && child.__fc__.parent === ctx) {
                        this.rmCtx(child.__fc__);
                    }
                });
                if (is.trueArray(n)) {
                    this.loadChildren(n, ctx);
                    this.bus.$emit('update', this.api);
                }
            });
        },
        rmSub(sub) {
            is.trueArray(sub) && sub.forEach(r => {
                r && r.__fc__ && this.rmCtx(r.__fc__);
            })
        },
        rmCtx(ctx) {
            if (ctx.deleted) return;
            const {id, field, input, name} = ctx;

            $del(this.ctxs, id);
            $del(this.formData, id);
            $del(this.subForm, id);
            $del(this.vm.setupState.ctxInject, id);
            const group = ctx.getParentGroup();
            if (group && this.subRuleData[group.id]) {
                $del(this.subRuleData[group.id], field);
            }
            if (ctx.group) {
                $del(this.subRuleData, id);
            }

            input && this.rmIdCtx(ctx, field, 'field');
            name && this.rmIdCtx(ctx, name, 'name');

            if (input && !hasProperty(this.fieldCtx, field)) {
                $del(this.form, field);
            }

            this.deferSyncValue(() => {
                if (!this.reloading) {
                    if (ctx.parser.loadChildren !== false) {
                        const children = ctx.getPending('children', ctx.rule.children);
                        if (is.trueArray(children)) {
                            children.forEach(h => h.__fc__ && this.rmCtx(h.__fc__));
                        }
                    }
                    if (ctx.root === this.rules) {
                        this.vm.setupState.renderRule();
                    }
                }
            }, input);

            const index = this.sort.indexOf(id);
            if (index > -1) {
                this.sort.splice(index, 1);
            }

            this.$render.clearCache(ctx);
            ctx.delete();
            this.effect(ctx, 'deleted');
            input && !this.fieldCtx[field] && this.vm.emit('remove-field', field, ctx.rule, this.api);
            ctx.rule.__ctrl || this.vm.emit('remove-rule', ctx.rule, this.api);
            return ctx;
        },
    })
}
