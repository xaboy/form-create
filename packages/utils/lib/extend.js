import {$set} from './modify';

export default function extend(to, _from) {
    for (var key in _from) {
        if (_from.hasOwnProperty(key))
            $set(to, key, _from[key]);
    }
    return to
}

export function copy(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    return obj instanceof Array ? [...obj] : {...obj};
}
