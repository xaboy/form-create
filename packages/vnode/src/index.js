import extend from '@form-create/utils/lib/extend';
import deepExtend from '@form-create/utils/lib/deepextend';
import mergeProps, {normalMerge, toArrayMerge, functionalMerge} from '@form-create/utils/lib/mergeprops';
import is from '@form-create/utils/lib/type';


const baseRule = () => ({
    props: {},
    on: {},
    validate: [],
    options: [],
    col: {},
    children: [],
    control: [],
    emit: [],
})

const keyAttrs = ['type', 'slot', 'emitPrefix', 'className', 'value', 'name', 'title', 'native', 'info', 'hidden', 'visibility', 'inject', 'model', 'options', 'emit'];

const toArray = ['validate', 'children', 'control'];

export const allMerge = [...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge, ...toArray, 'ref', 'key'];
//
// export function factory(name, init) {
//     return (title, field, value) => {
//         var creator = new Maker(name, title, field, value);
//         init && init(creator);
//         return creator;
//     };
// }


export function creatorFactory(name) {
    return (title, field, value, props = {}) => new Maker(name, title, field, value, props);
}

export function creatorTypeFactory(name, type, typeName = 'type') {
    return (title, field, value, props = {}) => {
        const maker = new Maker(name, title, field, value, props);
        if (is.Function(type)) type(maker);
        else maker.props(typeName, type);
        return maker;
    };
}

export default function Maker(type, title, field, value, props) {
    this._data = baseRule();
    extend(this._data, {type, title, field, value, props: props || {}});
}

Maker.prototype = {
    constructor: Maker,
    getRule() {
        console.log(this._data);
        return this._data;
    },
    event(...args) {
        this.on(...args);
        return this;
    },
    _clone() {
        const clone = new this.constructor();
        clone._data = deepExtend({}, this._data);
        return clone;
    },
};

[...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge, ...toArray].forEach(name => {
    Maker.prototype[name] = function (value) {
        mergeProps([{[name]: value}], this._data, {array: toArray});
        return this;
    };
});
