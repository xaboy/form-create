import {$set} from './modify';

const _extends = Object.assign || function (a) {
    for (let b, c = 1; c < arguments.length; c++) {
        for (let d in b = arguments[c], b) {
            Object.prototype.hasOwnProperty.call(b, d) && ($set(a, d, b[d]));
        }
    }

    return a;
}

export default function extend() {
    return _extends.apply(this, arguments);
}

export function copy(obj) {
    if (typeof obj !== 'object' || obj === null) return obj;
    return obj instanceof Array ? [...obj] : {...obj};
}
