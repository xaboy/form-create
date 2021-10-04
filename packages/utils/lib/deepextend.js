import {$set} from './modify';
import is from './type';

export default function deepExtend(origin, target = {}, mode) {
    let isArr = false;
    for (let key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            let clone = target[key];
            if ((isArr = Array.isArray(clone)) || is.Object(clone)) {
                let nst = origin[key] === undefined;
                if (isArr) {
                    isArr = false;
                    nst && $set(origin, key, []);
                } else if (clone._clone && mode !== undefined) {
                    if (mode) {
                        clone = clone.getRule();
                        nst && $set(origin, key, {});
                    } else {
                        $set(origin, key, clone._clone());
                        continue;
                    }
                } else {
                    nst && $set(origin, key, {});
                }
                origin[key] = deepExtend(origin[key], clone, mode);
            } else if (is.Undef(clone)) {
                $set(origin, key, clone);
            } else if (clone.__json !== undefined) {
                $set(origin, key, clone.__json);
            } else if (clone.__origin !== undefined) {
                $set(origin, key, clone.__origin);
            } else {
                $set(origin, key, clone);
            }
        }
    }
    return (mode !== undefined && Array.isArray(origin)) ? origin.filter(v => !v || !v.__ctrl) : origin
}

export function deepCopy(value) {
    return deepExtend({}, {value}).value;
}

export function deepExtendArgs(origin, ...lst) {
    lst.forEach(target => {
        origin = deepExtend(origin, target);
    });
    return origin;
}
