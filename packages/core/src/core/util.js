import Creator from '../factory/creator';

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