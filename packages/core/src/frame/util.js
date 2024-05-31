import is from '@form-create/utils/lib/type';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {arrayAttrs, normalAttrs} from './attrs';
import {logError} from '@form-create/utils/lib/console';
import {parseJson, toJson} from '@form-create/utils/lib/json';
import deepExtend from '@form-create/utils/lib/deepextend';

export {parseFn} from '@form-create/utils/lib/json';
export {parseJson, toJson}

export function enumerable(value, writable) {
    return {
        value,
        enumerable: false,
        configurable: false,
        writable: !!writable
    }
}

//todo 优化位置
export function copyRule(rule) {
    return copyRules([rule])[0];
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
