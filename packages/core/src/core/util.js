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

        return val;
    });
}


export function parseJson(json) {
    return JSON.parse(json, function (k, v) {
        if (v.indexOf && v.indexOf('function') > -1) {
            return eval('(function(){return ' + v + ' })()')
        }
        return v;
    });
}