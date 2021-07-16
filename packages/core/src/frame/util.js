import deepExtend from '@form-create/utils/lib/deepextend';
import is from '@form-create/utils/lib/type';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {arrayAttrs, normalAttrs} from './attrs';
import {err, logError} from '@form-create/utils/lib/console';
import Mitt from './mitt';
import {isVNode} from 'vue';

const PREFIX = '[[FORM-CREATE-PREFIX-';
const SUFFIX = '-FORM-CREATE-SUFFIX]]';

const $T = '$FN:';
const FUNCTION = 'function';

export function toJson(obj, space) {
    return JSON.stringify(deepExtend([], obj, true), function (key, val) {
        if (val && val._isVue === true)
            return undefined;

        if (typeof val !== FUNCTION) {
            return val;
        }
        if (val.__inject)
            val = val.__origin;

        if (val.__emit)
            return undefined;

        return PREFIX + val + SUFFIX;
    }, space);
}

function makeFn(fn) {
    return eval('(' + FUNCTION + '(){return ' + fn + ' })()')
}

export function parseFn(fn, mode) {
    if (fn && is.String(fn)) {
        let v = fn.trim();
        let flag = false;
        if (v.indexOf(SUFFIX) > 0 && v.indexOf(PREFIX) === 0) {
            v = v.replace(SUFFIX, '').replace(PREFIX, '');
            flag = true;
        } else if (v.indexOf($T) === 0) {
            v = v.replace($T, '');
            flag = true;
        } else if (!mode && v.indexOf(FUNCTION) === 0 && v !== FUNCTION) {
            flag = true;
        }
        if (!flag) return fn;
        try {
            return makeFn(v.indexOf(FUNCTION) === -1 && v.indexOf('(') !== 0 ? (FUNCTION + ' ' + v) : v);
        } catch (e) {
            err(`解析失败:${v}`);
            return undefined;
        }
    }
    return fn;
}

export function parseJson(json, mode) {
    return JSON.parse(json, function (k, v) {
        if (is.Undef(v) || !v.indexOf) return v;
        return parseFn(v, mode);
    });
}

export function enumerable(value, writable) {
    return {
        value,
        enumerable: false,
        configurable: false,
        writable: !!writable
    }
}

//todo 优化位置
export function copyRule(rule, mode) {
    return copyRules([rule], mode || false)[0];
}

export function copyRules(rules, mode) {
    return deepExtend([], [...rules], mode || false);
}

export function mergeRule(rule, merge) {
    mergeProps(Array.isArray(merge) ? merge : [merge], rule, {array: arrayAttrs, normal: normalAttrs});
    return rule;
}

export function getRule(rule) {
    return is.Function(rule.getRule) ? rule.getRule() : rule;
}

export function mergeGlobal(target, merge) {
    if (!target) return merge;
    Object.keys(merge || {}).forEach((k) => {
        if (merge[k]) {
            target[k] = mergeRule(target[k] || {}, merge[k])
        }
    });
    return target;
}

export function funcProxy(that, proxy) {
    Object.defineProperties(that, Object.keys(proxy).reduce((initial, k) => {
        initial[k] = {
            get() {
                return proxy[k]();
            }
        }
        return initial;
    }, {}))
}

export function byCtx(rule) {
    return rule.__fc__ || (rule.__origin__ ? rule.__origin__.__fc__ : null)
}

export function invoke(fn, def) {
    try {
        def = fn()
    } catch (e) {
        logError(e);
    }
    return def;
}

export function makeBus() {
    const mitt = new Mitt();

    return {
        $on: mitt.on,
        $once: mitt.once,
        $off: mitt.off,
        $emit: mitt.emit,
    }
}

export function makeSlotBag() {
    const slotBag = {};

    const slotName = (n) => n || 'default';

    return {
        setSlot(slot, vnFn) {
            slot = slotName(slot);
            if (!vnFn || (Array.isArray(vnFn) && vnFn.length))
                return;
            if (!slotBag[slot]) slotBag[slot] = [];
            slotBag[slot].push(vnFn);
        },
        getSlot(slot) {
            slot = slotName(slot);
            const children = [];
            (slotBag[slot] || []).forEach(fn => {
                if (Array.isArray(fn)) {
                    children.push(...fn);
                } else if (is.Function(fn)) {
                    const res = fn();
                    if (Array.isArray(res)) {
                        children.push(...res);
                    } else {
                        children.push(res);
                    }
                } else if (!is.Undef(fn)) {
                    children.push(fn);
                }
            })
            return children;
        },
        getSlots() {
            const slots = {};
            Object.keys(slotBag).forEach(k => {
                slots[k] = () => {
                    return this.getSlot(k);
                }
            })
            return slots
        },
        slotLen(slot) {
            slot = slotName(slot);
            return slotBag[slot] ? slotBag[slot].length : 0;
        },
        mergeBag(bag) {
            if (!bag) return this;
            const slots = is.Function(bag.getSlots) ? bag.getSlots() : bag;
            if (Array.isArray(bag) || isVNode(bag)) {
                this.setSlot(undefined, () => bag);
            } else {
                Object.keys(slots).forEach(k => {
                    this.setSlot(k, slots[k]);
                });
            }

            return this;
        }
    };
}
