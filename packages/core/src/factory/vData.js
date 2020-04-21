import {isPlainObject, isUndef, toString} from '@form-create/utils';
import mergeJsxProps from '../core/mergeJsxProps';

function defVData() {
    return {
        // class: {},
        // style: {},
        // attrs: {},
        props: {},
        // domProps: {},
        on: {},
        // nativeOn: {},
        // directives: [],
        // scopedSlots: {},
        // slot: undefined,
        // key: undefined,
        // ref: undefined
    };
}

export default class VData {

    constructor() {
        this.init();
    }

    merge(props) {
        mergeJsxProps([props], this._data);
        return this;
    }

    class(classList, status = true) {
        if (isUndef(classList)) return this;

        if (Array.isArray(classList)) {
            this.merge({class: classList});
        } else if (isPlainObject(classList)) {
            this.merge(classList);
        } else {
            this.merge({class: {[toString(classList)]: !!status}});
        }

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
            if (isPlainObject(value) && !Object.keys(value).length && key !== 'props') return initial;

            initial[key] = value;
            return initial;
        }, {});
        this.init();
        return data;
    }
}

const keyList = ['ref', 'key', 'slot'];
const objList = ['scopedSlots', 'nativeOn', 'on', 'domProps', 'props', 'attrs', 'style', 'directives'];

keyList.forEach(key => {
    VData.prototype[key] = function (val) {
        this.merge({[key]: val});
        return this;
    };
});

objList.forEach(key => {
    VData.prototype[key] = function (obj, val) {
        if (isUndef(obj)) return this;
        if (isPlainObject(obj)) {
            this.merge({[key]: obj})
        } else {
            this.merge({[key]: {[toString(obj)]: val}})
        }

        return this;
    };
});

export const vdataField = objList.concat(keyList, 'class');
