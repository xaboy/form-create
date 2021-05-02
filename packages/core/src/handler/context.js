import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import BaseParser from '../factory/parser';
import {$del, $set} from '@form-create/utils/lib';
import is from '@form-create/utils/lib/type';
import {invoke} from '../frame/util';


export default function useContext(Handler) {
    extend(Handler.prototype, {
        getCtx(id) {
            return this.fieldCtx[id] || this.nameCtx[id] || this.ctxs[id];
        },
        setCtx(ctx) {
            let {id, field, name, rule} = ctx;
            this.ctxs[id] = ctx;
            if (name) $set(this.nameCtx, name, ctx);
            if (!ctx.input) return;
            this.fieldCtx[field] = ctx;
            this.setFormData(ctx, ctx.parser.toFormValue(rule.value, ctx));
            if (this.isMounted && !this.reloading) {
                this.vm.$emit('change', ctx.field, rule.value, ctx.origin, this.api);
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
            const vm = this.vm;
            const none = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject', 'sync', 'payload', 'optionsTo'];
            Object.keys(ctx.rule).filter(k => none.indexOf(k) === -1).forEach((key) => {
                const flag = key === 'children';
                ctx.watch.push(vm.$watch(() => ctx.rule[key], (n, o) => {
                    if (this.loading || this.noWatchFn || this.reloading) return;
                    this.watching = true;
                    // if (key === 'hidden')
                    //     ctx.updateKey(true);
                    // else
                    if (key === 'link') {
                        ctx.link();
                        return;
                    } else if (['props', 'on', 'nativeOn'].indexOf(key) > -1) {
                        this.parseInjectEvent(ctx.rule, n || {});
                        if (key === 'props' && ctx.input) {
                            this.setFormData(ctx, ctx.parser.toFormValue(ctx.rule.value, ctx));
                        }
                    } else if (['emit', 'nativeEmit'].indexOf(key) > -1)
                        this.parseEmit(ctx, key === 'emit');
                    else if (key === 'type') {
                        ctx.updateType();
                        this.bindParser(ctx);
                    } else if (key === 'children') {
                        const flag = is.trueArray(n);
                        this.deferSyncValue(() => {
                            if (n !== o) {
                                this.rmSub(o);
                                this.$render.initOrgChildren();
                            }
                            flag && this.loadChildren(n, ctx);
                        });
                    }
                    this.$render.clearCache(ctx);
                    this.watching = false;
                }, {deep: !flag, sync: flag}));
            });
            this.watchEffect(ctx);
        },
        rmSub(sub) {
            is.trueArray(sub) && sub.forEach(r => {
                r && r.__fc__ && this.rmCtx(r.__fc__);
            })
        },
        rmCtx(ctx) {
            if (ctx.deleted) return;
            const {id, field, name} = ctx;
            if (ctx.input) {
                Object.defineProperty(ctx.rule, 'value', {
                    value: ctx.rule.value,
                    writable: true
                });
            }

            $del(this.ctxs, id);
            $del(this.$render.renderList, id);
            $del(this.$render.orgChildren, id);
            $del(ctx, 'cacheValue');

            const f = this.fieldCtx[field];

            if (field && (!f || f === ctx)) {
                $del(this.formData, field);
                $del(this.form, field);
                $del(this.fieldCtx, field);
                $del(this.subForm, field);
                this.vm.$nextTick(() => this.vm.$emit('removeField', field, ctx.rule, this.api));
            }
            if (name && this.nameCtx[name] === ctx) {
                $del(this.nameCtx, name);
            }
            if (!this.reloading) {
                this.deferSyncValue(() => {
                    if (is.trueArray(ctx.rule.children)) {
                        ctx.rule.children.forEach(h => h.__fc__ && this.rmCtx(h.__fc__));
                    }
                    this.syncValue();
                })
                if (ctx.root === this.rules) {
                    this.vm._renderRule();
                }
            }

            const index = this.sort.indexOf(id);
            if (index > -1) {
                this.sort.splice(index, 1);
            }

            this.$render.clearCache(ctx);
            ctx.delete();
            this.effect(ctx, 'deleted');
            this.vm.$nextTick(() => this.vm.$emit('removeRule', ctx.rule, this.api));
            return ctx;
        },
    })
}
