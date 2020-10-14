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
                } else if (clone._clone) {
                    clone = clone._clone();
                    //todo 检查逻辑
                    if (mode) {
                        clone = clone.getRule();
                        nst && $set(origin, key, {});
                    } else {
                        $set(origin, key, clone);
                        continue;
                    }
                } else {
                    nst && $set(origin, key, {});
                }
                deepExtend(origin[key], clone, mode);
            } else {
                $set(origin, key, clone);
            }
        }
    }
    return origin
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
