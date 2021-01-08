import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import BaseParser from '../factory/parser';
import {$del, $set} from '@form-create/utils/lib';
import is from '@form-create/utils/lib/type';


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
            $set(this.formData, field, ctx.parser.toFormValue(rule.value, ctx));
            $set(this.validate, field, rule.validate || []);
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
        watchCtx(ctx) {
            const vm = this.vm;
            const none = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject'];
            Object.keys(ctx.rule).filter(k => none.indexOf(k) === -1).forEach((key) => {
                ctx.watch.push(vm.$watch(() => ctx.rule[key], (n, o) => {
                    this.watching = true;
                    if (key === 'hidden')
                        ctx.updateKey(true);
                    else if (key === 'link') {
                        ctx.link();
                        return;
                    } else if (key === 'validate') {
                        if (ctx.input) {
                            this.validate[ctx.field] = n || []
                        } else return;
                    } else if (['props', 'on', 'nativeOn'].indexOf(key) > -1)
                        this.parseInjectEvent(ctx.rule, n || {});
                    else if (['emit', 'nativeEmit'].indexOf(key) > -1)
                        this.parseEmit(ctx, key === 'emit');
                    else if (key === 'type') {
                        ctx.updateType();
                        this.bindParser(ctx);
                    } else if (key === 'children') {
                        const flag = is.trueArray(n);
                        if (n !== o) {
                            this.$render.orgChildren[ctx.id] = flag ? [...n] : [];
                            this.rmSub(o);
                        }
                        flag && this.loadChildren(n, ctx);
                    }
                    this.$render.clearCache(ctx);
                    this.watching = false;
                }, {deep: key !== 'children'}));
            });
            this.watchEffect(ctx);
        },
        rmSub(sub) {
            is.trueArray(sub) && sub.forEach(r => {
                r && r.__fc__ && this._rmCtx(r.__fc__);
            })
        },
        rmCtx(ctx, reloadFlag) {
            this._rmCtx(ctx);
            if (!reloadFlag) {
                this.$render.initOrgChildren();
                this.syncValue();
            }
        },
        _rmCtx(ctx) {
            if (ctx.deleted) return;
            const {id, field, name} = ctx;
            if (ctx.input) {
                Object.defineProperty(ctx.rule, 'value', {
                    value: ctx.rule.value,
                    writable: true
                });
            }

            if (is.trueArray(ctx.rule.children)) {
                ctx.rule.children.forEach(h => h.__fc__ && this._rmCtx(h.__fc__));
            }

            $del(this.ctxs, id);
            $del(this.validate, field);
            $del(this.formData, field);
            $del(this.form, field);
            $del(this.fieldCtx, field);
            $del(this.$render.renderList, id);
            $del(this.nameCtx, name);
            $del(this.subForm, field);
            $del(ctx, 'cacheValue');

            const index = this.sort.indexOf(id);
            if (index > -1) {
                this.sort.splice(index, 1);
            }

            ctx.delete();
            this.effect(ctx, 'deleted');
            return ctx;
        },
    })
}
