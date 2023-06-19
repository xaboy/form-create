import extend from '@form-create/utils/lib/extend';

export default function useCache(Render) {
    extend(Render.prototype, {
        initCache() {
            this.clearCacheAll();
        },
        clearCache(ctx) {
            if(ctx.rule.cache){
                return;
            }
            if (!this.cache[ctx.id]) {
                return;
            }
            if (this.cache[ctx.id].use === true || this.cache[ctx.id].parent) {
                this.$handle.refresh();
            }
            this.cache[ctx.id] = null;
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
            if(cache){
                cache.use = true;
                return cache.vnode;
            }
            return undefined;
        }
    })

}
