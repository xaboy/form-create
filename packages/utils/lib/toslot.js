import is from './type';

/**
 *
 * @param slot
 * @param $h
 * @return {[*]}
 *
 * @deprecated
 */
export function toSlot(slot, $h) {
    return [slot && is.Function(slot) ? slot($h) : slot]
}


/**
 *
 * @param children
 * @param slotName
 * @return {boolean}
 *
 * @deprecated
 */
export function hasSlot(children, slotName) {
    return children.length !== 0 && children.some(child => {
        if (child.data) {
            if ((!child.data.slot && slotName === 'default') || (child.data.slot === slotName))
                return true;
        } else if (slotName === 'default')
            return true;
        return false;
    })
}
