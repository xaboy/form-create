import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import toLine from '@form-create/utils/lib/toline';
import {parseFn} from '../frame/util';


export default function useInject(Handler) {
    extend(Handler.prototype, {
        parseInjectEvent(rule, on) {
            const inject = rule.inject || this.options.injectEvent;
            return this.parseEventLst(rule, on, inject);
        },
        parseEventLst(rule, data, inject, deep) {
            Object.keys(data).forEach(k => {
                const fn = this.parseEvent(rule, data[k], inject, deep);
                if (fn) {
                    data[k] = fn;
                }
            });
            return data;
        },
        parseEvent(rule, fn, inject, deep) {
            if (is.Function(fn) && ((inject !== false && !is.Undef(inject)) || fn.__inject)) {
                return this.inject(rule, fn, inject)
            } else if (!deep && Array.isArray(fn) && fn[0] && (is.String(fn[0]) || is.Function(fn[0]))) {
                return this.parseEventLst(rule, fn, inject, true);
            } else if (is.String(fn)) {
                const val = parseFn(fn);
                if (val && fn !== val) {
                    return val.__inject ? this.parseEvent(rule, val, inject, true) : val;
                }
            }
        },
        parseEmit(ctx, on) {
            let event = {}, rule = ctx.rule, {emitPrefix, field, name, inject} = rule;
            let emit = rule[on ? 'emit' : 'nativeEmit'] || [];
            if (is.trueArray(emit)) {
                let emitKey = emitPrefix || field || name;
                if (emitKey) {
                    if (!on) emitKey = `native-${emitKey}`;
                    emit.forEach(eventName => {
                        if (!eventName) return;
                        let eventInject;
                        if (is.Object(eventName)) {
                            eventInject = eventName.inject;
                            eventName = eventName.name;
                        }
                        const fieldKey = toLine(`${emitKey}-${eventName}`);
                        const fn = (...arg) => {
                            this.vm.$emit(fieldKey, ...arg);
                            this.vm.$emit('emit-event', fieldKey, ...arg);
                        };
                        fn.__emit = true;

                        if (!eventInject && inject === false) {
                            event[eventName] = fn;
                        } else {
                            let _inject = eventInject || inject || this.options.injectEvent;
                            event[eventName] = is.Undef(_inject) ? fn : this.inject(rule, fn, _inject);
                        }
                    });
                }

            }
            ctx.computed[on ? 'on' : 'nativeOn'] = event;
            return event;
        },
        getInjectData(self, inject) {
            const {option, rule} = this.vm.$options.propsData;
            return {
                api: this.api,
                $f: this.api,
                rule,
                self: self.__origin__,
                option,
                inject
            };
        },
        inject(self, _fn, inject) {
            if (_fn.__origin) {
                if (this.watching && !this.loading)
                    return _fn;
                _fn = _fn.__origin;
            }

            const h = this;

            const fn = function (...args) {
                const data = h.getInjectData(self, inject);
                data.args = [...args];
                args.unshift(data);
                return _fn.apply(this, args);
            };
            fn.__origin = _fn;
            fn.__json = _fn.__json;
            return fn;
        },
    })
}
