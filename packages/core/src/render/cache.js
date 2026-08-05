import extend from '@form-create/utils/lib/extend';

export default function useCache(Render) {
    extend(Render.prototype, {
        initCache() {
            this.clearCacheAll();
        },
        //把 formData 写回已构建的 prop.model / props[field]，供 value-only 重建 vnode 使用
        syncModelProp(ctx) {
            const prop = ctx.prop;
            if (!prop || !prop.model) {
                return false;
            }
            const field = prop.model.modelField;
            const value = this.$handle.getFormData(ctx);
            prop.model.value = value;
            if (!prop.props) {
                prop.props = {};
            }
            prop.props[field] = value;
            return true;
        },
        //type: 'prop' 全量失效；'value' 仅值变更，父链同样尽量复用已有 prop
        //options.valueOnly !== false 时启用（默认开启）
        clearCache(ctx, type) {
            if (ctx.rule.cache) {
                return;
            }
            const valueMode = type === 'value' && this.$handle.options.valueOnly !== false;
            if (valueMode && ctx.prop) {
                if (ctx.prop.model) {
                    this.syncModelProp(ctx);
                }
                //输入节点与祖先布局节点都可跳过 initProp 管线
                this.valueOnly[ctx.id] = true;
            } else {
                //fragment 只缓存 prop，不缓存 vnode，单独存放但共用这里的失效时机
                delete this.fragmentProp[ctx.id];
                delete this.valueOnly[ctx.id];
            }
            if (!this.cache[ctx.id]) {
                if (ctx.parent) {
                    this.clearCache(ctx.parent, type);
                }
                return;
            }
            if (this.cache[ctx.id].use === true || this.cache[ctx.id].parent) {
                this.$handle.refresh();
            }
            if (this.cache[ctx.id].parent) {
                this.clearCache(this.cache[ctx.id].parent, type);
            }
            //删除而非置空，否则已移除的 ctx 会在 cache 上永久留下一个键
            delete this.cache[ctx.id];
        },
        clearCacheAll() {
            this.cache = {};
            this.fragmentProp = {};
            this.valueOnly = {};
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
            if (cache) {
                cache.use = true;
                return cache.vnode;
            }
            return undefined;
        }
    })

}
