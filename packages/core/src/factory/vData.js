import {$set, extend, isPlainObject, isUndef, toArray, toString} from '@form-create/utils';

function defVData() {
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
    };
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
            });
        } else if (isPlainObject(classList)) {
            $set(this._data, 'class', extend(this._data.class, classList));
        } else {
            $set(this._data.class, toString(classList), status === undefined ? true : status);
        }

        return this;
    }

    directives(directives) {
        if (isUndef(directives)) return this;
        $set(this._data, 'directives', this._data.directives.concat(toArray(directives)));
        return this;
    }

    init() {
        this._data = defVData();
        return this;
    }

    get() {
        const data = Object.keys(this._data).reduce((initial, key) => {
            const value = this._data[key];
            if (value === undefined) return initial;
            if (Array.isArray(value) && !value.length) return initial;
            if (!Object.keys(value).length && key !== 'props') return initial;

            initial[key] = value;
            return initial;
        }, {});
        this.init();
        return data;
    }
}

const keyList = ['ref', 'key', 'slot'];
const objList = ['scopedSlots', 'nativeOn', 'on', 'domProps', 'props', 'attrs', 'style'];

keyList.forEach(key => {
    VData.prototype[key] = function (val) {
        $set(this._data, key, val);
        return this;
    };
});

objList.forEach(key => {
    VData.prototype[key] = function (obj, val) {
        if (isUndef(obj)) return this;

        if (isPlainObject(obj)) {
            $set(this._data, key, extend(this._data[key], obj));
        } else {
            $set(this._data[key], toString(obj), val);
        }

        return this;
    };
});

