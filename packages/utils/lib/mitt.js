// https://github.com/developit/mitt

export default function Mitt(all) {
    all = all || new Map();

    const mitt = {

        $on(type, handler) {
            const handlers = all.get(type);
            const added = handlers && handlers.push(handler);
            if (!added) {
                all.set(type, [handler]);
            }
        },

        $once(type, handler) {
            handler._once = true;
            mitt.$on(type, handler);
        },

        $off(type, handler) {
            const handlers = all.get(type);
            if (handlers) {
                handlers.splice(handlers.indexOf(handler) >>> 0, 1);
            }
        },

        $emit(type, ...args) {
            (all.get(type) || []).slice().map((handler) => {
                if (handler._once) {
                    mitt.$off(type, handler);
                    delete handler._once;
                }
                handler(...args);
            });
            (all.get('*') || []).slice().map((handler) => {
                handler(type, args);
            });
        }
    };

    return mitt;
}