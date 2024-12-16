import deepExtend from '@form-create/utils/lib/deepextend';
import is from '@form-create/utils/lib/type';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {arrayAttrs, normalAttrs} from './attrs';
import {logError} from '@form-create/utils/lib/console';
import {toArray} from "@form-create/utils";

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
    const r = is.Function(rule.getRule) ? rule.getRule() : rule;
    if (!r.type) {
        r.type = 'input';
    }
    return r;
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


function parseChild(child, slot) {
    let vnode = null;
    if (is.Function(child)) {
        vnode = child();
    } else if (Array.isArray(child)) {
        vnode = child.map((item) => parseChild(item, slot));
    } else {
        vnode = child;
    }
    if (vnode && slot) {
        toArray(vnode).forEach((item) => {
            const items = Array.isArray(item) ? item : [item];
            items.forEach((one) => {
                if (one && typeof one === 'object') {
                    if (!one.data) {
                        one.data = {};
                    }
                    if(!one.data.slot || one.data.slot === 'default') {
                        one.data.slot = slot || 'default';
                    }
                }
            })
        })
    }
    return vnode;
}

function parseChildren(children, slot) {
    if (is.Object(children)) {
        const slots = {}
        Object.keys(children).forEach(key => {
            slots[key] = parseChild(children[key], key);
        })
        return slots;
    } else {
        return parseChild(children, slot);
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
            slotBag[slot].push(...(Array.isArray(vnFn) ? vnFn : [vnFn]));
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
            return parseChildren(children, slot);
        },
        getSlots() {
            let slots = [];
            Object.keys(slotBag).forEach(k => {
                slots = slots.concat(this.getSlot(k) || []);
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
            if (Array.isArray(bag) || bag.tag) {
                this.setSlot(undefined, () => bag);
            } else if (Array.isArray(slots)) {
                this.setSlot(undefined, () => slots);
            } else {
                Object.keys(slots).forEach(k => {
                    this.setSlot(k, slots[k]);
                });
            }
            return this;
        }
    };
}

export function setPrototypeOf(o, proto) {
    Object.setPrototypeOf(o, proto);
    return o;
}


const changeType = (a, b) => {
    if (typeof a === 'string') {
        return String(b);
    } else if (typeof a === 'number') {
        return Number(b);
    }
    return b;
}

export const condition = {
    '==': (a, b) => {
        return JSON.stringify(a) === JSON.stringify(changeType(a, b));
    },
    '!=': (a, b) => {
        return !condition['=='](a, b);
    },
    '>': (a, b) => {
        return a > b;
    },
    '>=': (a, b) => {
        return a >= b;
    },
    '<': (a, b) => {
        return a < b;
    },
    '<=': (a, b) => {
        return a <= b;
    },
    on(a, b) {
        return a && a.indexOf && a.indexOf(changeType(a[0], b)) > -1;
    },
    notOn(a, b) {
        return !condition.on(a, b);
    },
    in(a, b) {
        return b && b.indexOf && b.indexOf(a) > -1;
    },
    notIn(a, b) {
        return !condition.in(a, b);
    },
    between(a, b) {
        return a > b[0] && a < b[1];
    },
    notBetween(a, b) {
        return a < b[0] || a > b[1];
    },
    empty(a) {
        return is.empty(a);
    },
    notEmpty(a) {
        return !is.empty(a);
    },
    pattern(a, b) {
        return new RegExp(b, 'g').test(a);
    }
};

export function deepGet(val, split) {
    (Array.isArray(split) ? split : (split || '').split('.')).forEach(k => {
        if (val != null) {
            val = val[k];
        }
    });
    return val;
}

export function extractVar(str) {
    const regex = /{{\s*(.*?)\s*}}/g;
    let match;
    const matches = {};
    while ((match = regex.exec(str)) !== null) {
        if (match[1]) {
            matches[match[1]] = true;
        }
    }
    return Object.keys(matches);
}