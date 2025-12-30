import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {invoke, parseFn} from '../frame/util';
import toCase from '@form-create/utils/lib/tocase';
import {upper} from '@form-create/utils/lib/toline';


export default function useLifecycle(Handler) {
    extend(Handler.prototype, {
        mounted() {
            const _mounted = () => {
                this.isMounted = true;
                this.lifecycle('mounted');
            }
            if (this.pageEnd) {
                _mounted();
            } else {
                this.bus.$once('page-end', _mounted);
            }
        },
        lifecycle(name) {
            this.fc.targetFormDriver(name, this.api, this.fc);
            this.vm.emit(name, this.api);
            this.emitEvent(name, this.api);
        },
        emitEvent(name, ...args) {
            const _fn = this.options[name] || this.options[toCase('on-' + name)];
            if (_fn) {
                const fn = parseFn(_fn);
                is.Function(fn) && invoke(() => fn(...args));
            }
            this.bus.$emit(name, ...args);
        },
        targetHook(ctx, name, args) {
            let hook = ctx.prop?.hook?.[name];

            let run = (on, p) => {
                if (on) {
                    on = Array.isArray(on) ? on : [on];
                    on.forEach(fn => {
                        invoke(() => fn({args: Object.values(args || {}), ...args || {}, self: ctx.rule, rule: ctx.rule, parent: p?.rule, $f: this.api, api: this.api, option: this.vm.props.option}));
                    });
                }
            }
            run(hook);
            let deepName = 'deep' + upper(name);
            let parent = ctx.parent;
            while (parent) {
                let deepHook = parent.prop?.hook?.[deepName];
                run(deepHook, parent);
                parent = parent.parent;
            }
        }
    })
}
