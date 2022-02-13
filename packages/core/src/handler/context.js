import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import BaseParser from '../factory/parser';
import {$del} from '@form-create/utils/lib/modify';
import is from '@form-create/utils/lib/type';
import {invoke} from '../frame/util';
import {toRef, watch} from 'vue';
import {attrs} from '../frame/attrs';


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
            const none = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject', 'sync', 'payload', 'optionsTo', 'update'];
            const all = attrs();
            all.filter(k => k[0] !== '_' && none.indexOf(k) === -1).forEach((key) => {
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
                    } else if (key === 'emit')
                        this.parseEmit(ctx);
                    else if (['prefix', 'suffix'].indexOf(key) > -1)
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
                    this.watching = false;
                }, {deep: !flag, sync: flag}));
            });
            if (ctx.input) {
                const val = toRef(ctx.rule, 'value');
                ctx.watch.push(watch(() => val.value, () => {
                    const formValue = ctx.parser.toFormValue(val.value, ctx);
                    if (this.isChange(ctx, formValue)) {
                        this.setValue(ctx, val.value, formValue, true);
                    }
                }));
            }
            this.watchEffect(ctx);
        },
        updateChildren(ctx, n, o) {
            this.deferSyncValue(() => {
                o && o.forEach((child) => {
                    if ((n || []).indexOf(child) === -1 && child && !is.String(child) && child.__fc__) {
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

            input && this.rmIdCtx(ctx, field, 'field');
            name && this.rmIdCtx(ctx, name, 'name');

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
