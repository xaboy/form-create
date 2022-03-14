import deepExtend from '@form-create/utils/lib/deepextend';
import is from '@form-create/utils/lib/type';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {arrayAttrs, normalAttrs} from './attrs';
import {logError} from '@form-create/utils/lib/console';
import {isVNode} from 'vue';
import {upper} from '@form-create/utils/lib/toline';

export {parseJson, parseFn, toJson} from '@form-create/utils/lib/json';

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
        getSlot(slot, val) {
            slot = slotName(slot);
            const children = [];
            (slotBag[slot] || []).forEach(fn => {
                if (Array.isArray(fn)) {
                    children.push(...fn);
                } else if (is.Function(fn)) {
                    const res = fn(...(val||[]));
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
                slots[k] = (...args) => {
                    return this.getSlot(k, args);
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

export function toProps(rule) {
    const prop = {...(rule.props || {})};

    Object.keys(rule.on || {}).forEach(k => {
        const name = `on${upper(k)}`;
        if (Array.isArray(prop[name])) {
            prop[name] = [...prop[name], rule.on[k]];
        } else if (prop[name]) {
            prop[name] = [prop[name], rule.on[k]];
        } else {
            prop[name] = rule.on[k];
        }
    })
    prop.key = rule.key;
    prop.ref = rule.ref;
    prop.class = rule.class;
    prop.style = rule.style;
    if (prop.slot) delete prop.slot;

    return prop;
}
