import {deepExtend, isUndef} from '@form-create/utils';

const PREFIX = '[[FORM-CREATE-PREFIX-';
const SUFFIX = '-FORM-CREATE-SUFFIX]]';

export function toJson(obj) {
    return JSON.stringify(deepExtend([], obj, true), function (key, val) {
        if (val && val._isVue === true)
            return undefined;

        if (typeof val !== 'function') {
            return val;
        }
        if (val.__inject)
            val = val.__origin;

        if (val.__emit)
            return undefined;

        return PREFIX + val + SUFFIX;
    });
}

function makeFn(fn) {
    return eval('(function(){return ' + fn + ' })()')
}

export function parseJson(json, mode) {
    return JSON.parse(json, function (k, v) {
        if (isUndef(v) || !v.indexOf) return v;
        try {
            if (v.indexOf(SUFFIX) > 0 && v.indexOf(PREFIX) === 0) {
                v = v.replace(SUFFIX, '').replace(PREFIX, '');
                return makeFn(v.indexOf('function') === -1 && v.indexOf('(') !== 0 ? 'function ' + v : v);
            } else if (!mode && v.indexOf('function') > -1)
                return makeFn(v)
        } catch (e) {
            console.error(`[form-create]解析失败:${v}`);
            return undefined;
        }
        return v;
    });
}

export function enumerable(value) {
    return {
        value,
        enumerable: false,
        configurable: false
    }
}

export function copyRule(rule, mode) {
    return copyRules([rule], mode)[0];
}

export function copyRules(rules, mode) {
    return deepExtend([], rules, mode);
}
