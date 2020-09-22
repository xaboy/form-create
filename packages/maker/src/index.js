import extend from '@form-create/utils/lib/extend';
import deepExtend from '@form-create/utils/lib/deepextend';
import mergeProps, {normalMerge, toArrayMerge, functionalMerge} from '@form-create/utils/lib/mergeprops';


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

const keyAttrs = ['slot', 'emitPrefix', 'className', 'value', 'name', 'title', 'native', 'info', 'hidden', 'visibility', 'inject', 'model', 'options', 'emit'];

export const allMerge = [...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge, 'ref', 'key'];

export function factory(name, init) {
    return (title, field, value) => {
        var creator = new Maker(name, title, field, value);
        init && init(creator);
        return creator;
    };
}

export default function Maker(type, title, field, value) {
    this._data = baseRule();
    extend(this._data, {type, title, field, value});
}

Maker.prototype = {
    constructor: Maker,
    getRule() {
        return this._data;
    },
    event(...args) {
        this.on(...args);
        return this;
    },
    clone() {
        const clone = new this.constructor();
        clone._data = deepExtend({}, this._data);
        return clone;
    },
};

[...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge].forEach(name => {
    Maker.prototype[name] = function (value) {
        mergeProps([{[name]: value}], this._data);
        return this;
    };
});
