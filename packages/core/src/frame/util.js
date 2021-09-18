import deepExtend from '@form-create/utils/lib/deepextend';
import is from '@form-create/utils/lib/type';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {arrayAttrs, normalAttrs} from './attrs';
import {logError} from '@form-create/utils/lib/console';
export {parseJson,parseFn,toJson} from '@form-create/utils/lib/json';

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
