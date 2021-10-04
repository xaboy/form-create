import extend from '@form-create/utils/lib/extend';

export default function useCache(Render) {
    extend(Render.prototype, {
        initCache() {
            this.clearCacheAll();
        },
        clearCache(ctx) {
            if (!this.cache[ctx.id]) {
                ctx.parent && this.clearCache(ctx.parent);
                return;
            }
            if (this.cache[ctx.id].use === true || this.cache[ctx.id].parent) {
                this.$handle.refresh();
            }
            const parent = this.cache[ctx.id].parent;
            this.cache[ctx.id] = null;
            parent && this.clearCache(parent);
        },
        clearCacheAll() {
            this.cache = {};
        },
        setCache(ctx, vnode, parent) {
            this.cache[ctx.id] = {
                vnode,
                use: false,
                parent,
                slot: ctx.rule.slot
            };
        },
        getCache(ctx) {
            const cache = this.cache[ctx.id];
            cache.use = true;
            return cache.vnode;
        }
    })

}
