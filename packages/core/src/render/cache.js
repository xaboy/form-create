import extend from '@form-create/utils/lib/extend';

export default function useCache(Render) {
    extend(Render.prototype, {
        clearCache(parser, clear = true) {
            if (!this.cache[parser.id]) {
                clear && parser.parent && this.clearCache(parser.parent, clear);
                return;
            }
            if (this.cache[parser.id].use === true || this.cache[parser.id].parent)
                this.$handle.refresh();
            const parent = this.cache[parser.id].parent;
            this.cache[parser.id] = null;
            clear && parent && this.clearCache(parent, clear);
        },
        clearCacheAll() {
            this.cache = {};
        },
        setCache(parser, vnode, parent) {
            this.cache[parser.id] = {
                vnode,
                use: false,
                parent
            };
        },
        getCache(parser) {
            const cache = this.cache[parser.id];
            cache.use = true;
            return cache.vnode;
        }
    })

}
