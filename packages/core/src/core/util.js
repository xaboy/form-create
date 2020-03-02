import Creator from '../factory/creator';
import {isFunction, isString, isValidChildren} from '@form-create/utils';

export function toJson(obj) {
    return JSON.stringify(obj, function (key, val) {
        if (val instanceof Creator) {
            return val.getRule();
        }

        if (val && val._isVue === true)
            return undefined;

        if (typeof val !== 'function') {
            return val;
        }
        if (val.__inject)
            val = val.__origin;

        if (val.__emit)
            return undefined;

        return '' + val;
    });
}


export function parseJson(json) {
    return JSON.parse(json, function (k, v) {
        if (v.indexOf && v.indexOf('function') > -1) {
            try {
                return eval('(function(){return ' + v + ' })()')
            } catch (e) {
                console.error(`[form-create]解析失败:${v}`);
                return undefined;
            }
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

export function copyRule(rule) {
    return copyRules([rule])[0];
}

export function copyRules(rules) {
    return rules.map(rule => {
        if (isString(rule)) return rule;
        let r;
        if (isFunction(rule.getRule)) {
            r = new Creator();
            r._data = {...rule._data};
            if (r._data.field && r._data.value === undefined)
                r.value(null);
            if (isValidChildren(r._data.children)) {
                r._data.children = copyRules(r._data.children);
            }
        } else {
            r = {...rule};
            if (r.field && r.value === undefined) r.value = null;
            if (isValidChildren(r.children))
                r.children = copyRules(r.children);
        }
        return r;
    })
}
