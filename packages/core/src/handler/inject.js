import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import toLine from '@form-create/utils/lib/toline';
import {extractVar, parseFn} from '../frame/util';


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
        parseEmit(ctx) {
            let event = {}, rule = ctx.rule, {emitPrefix, field, name, inject} = rule;
            let emit = rule.emit || [];
            if (is.trueArray(emit)) {
                emit.forEach(eventName => {
                    if (!eventName) return;
                    let eventInject;
                    let emitKey = emitPrefix || field || name;
                    if (is.Object(eventName)) {
                        eventInject = eventName.inject;
                        eventName = eventName.name;
                        emitKey = eventName.prefix || emitKey;
                    }
                    if (emitKey) {
                        const fieldKey = toLine(`${emitKey}-${eventName}`);
                        const fn = (...arg) => {
                            if (this.vm.emitsOptions) {
                                this.vm.emitsOptions[fieldKey] = null;
                            }
                            this.vm.emit(fieldKey, ...arg);
                            this.vm.emit('emit-event', fieldKey, ...arg);
                            this.bus.$emit(fieldKey, ...arg);
                        };
                        fn.__emit = true;

                        if (!eventInject && inject === false) {
                            event[eventName] = fn;
                        } else {
                            let _inject = eventInject || inject || this.options.injectEvent;
                            event[eventName] = is.Undef(_inject) ? fn : this.inject(rule, fn, _inject);
                        }
                    }

                });
            }
            ctx.computed.on = event;
            return event;
        },
        getInjectData(self, inject) {
            const $api = self.__fc__ && self.__fc__.$api;
            const vm = (self.__fc__ && self.__fc__.$handle.vm) || this.vm.props;
            const {option, rule} = vm.props;
            return {
                $f: $api || this.api,
                api: $api || this.api,
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
        loadStrVar(str, get) {
            if (str && typeof str === 'string' && str.indexOf('{{') > -1 && str.indexOf('}}') > -1) {
                const tmp = str;
                const vars = extractVar(str);
                let lastVal;
                vars.forEach(v => {
                    const split = v.split('||');
                    const field = split[0].trim();
                    if (field) {
                        const def = (split[1] || '').trim();
                        const val = get ? get(field, def) : this.fc.getLoadData(field, def);
                        lastVal = val;
                        str = str.replaceAll(`{{${v}}}`, val == null ? '' : val);
                    }
                })
                if(vars.length === 1 && tmp === `{{${vars[0]}}}`) {
                    return lastVal;
                }
            }
            return str;
        },
        loadFetchVar(options, get) {
            const loadVal = str => {
                return this.loadStrVar(str, get);
            }

            options.action = loadVal(options.action);
            if (options.headers) {
                const _headers = {};
                Object.keys(options.headers).forEach(k => {
                    _headers[loadVal(k)] = loadVal(options.headers[k]);
                });
                options.headers = _headers;
            }
            if (options.data) {
                const _data = {};
                Object.keys(options.data).forEach(k => {
                    _data[loadVal(k)] = loadVal(options.data[k]);
                });
                options.data = _data;
            }

            return options;
        }
    })
}
