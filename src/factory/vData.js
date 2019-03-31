import {$set, extend, isPlainObject, isUndef, toArray, toString} from '../core/util';

export function defVData() {
    return {
        class: {},
        style: {},
        attrs: {},
        props: {},
        domProps: {},
        on: {},
        nativeOn: {},
        directives: [],
        scopedSlots: {},
        slot: undefined,
        key: undefined,
        ref: undefined
    }
}

export default class VData {

    constructor() {
        this.init();
    }

    class(classList, status = true) {
        if (isUndef(classList)) return this;

        if (Array.isArray(classList)) {
            classList.forEach((cls) => {
                $set(this._data.class, toString(cls), true);
            })
        } else if (isPlainObject(classList)) {
            $set(this._data, 'class', extend(this._data.class, classList));
        } else {
            $set(this._data.class, toString(classList), status === undefined ? true : status);
        }

        return this
    }

    directives(directives) {
        if (isUndef(directives)) return this;
        $set(this._data, 'directives', this._data.directives.concat(toArray(directives)));
        return this
    }

    init() {
        this._data = defVData();
        return this
    }

    get() {
        this._prev = this._data;
        this.init();
        return this._prev
    }
}

const keyList = ['ref', 'key', 'slot'];
const objList = ['scopedSlots', 'nativeOn', 'on', 'domProps', 'props', 'attrs', 'style'];

keyList.forEach(key => {
    VData.prototype[key] = function (val) {
        $set(this._data, key, val);
        return this
    }
});

objList.forEach(key => {
    VData.prototype[key] = function (obj, val) {
        if (isUndef(obj)) return this;

        if (isPlainObject(obj)) {
            $set(this._data, key, extend(this._data[key], obj));
        } else {
            $set(this._data[key], toString(obj), val);
        }

        return this
    }
});

