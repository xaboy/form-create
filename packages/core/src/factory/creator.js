import extend from '@form-create/utils/lib/extend';
import deepExtend from '@form-create/utils/lib/deepextend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is from '@form-create/utils/lib/type';
import {attrs, arrayAttrs} from '../core/attrs';

const baseRule = () => ({
    props: {},
    on: {},
    validate: [],
    options: [],
    col: {},
    children: [],
    control: [],
    emit: [],
    type: undefined,
})

export function factory(name, init) {
    return (title, field, value) => {
        var creator = new Creator(name, title, field, value);
        init && init(creator);
        return creator;
    };
}

export function creatorFactory(name) {
    return (title, field, value, props = {}) => new Creator(name, title, field, value, props);
}

export function creatorTypeFactory(name, type, typeName = 'type') {
    return (title, field, value, props = {}) => {
        const maker = new Creator(name, title, field, value, props);
        if (is.Function(type)) type(maker);
        else maker.props(typeName, type);
        return maker;
    };
}

export default function Creator(type, title, field, value, props) {
    this._data = baseRule();
    extend(this._data, {type, title, field, value, props: props || {}});
}

extend(Creator.prototype, {
    getRule() {
        return this._data;
    },
    setProp(key, value) {
        this._data[key] = value;
        return this;
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
})

attrs.forEach(name => {
    Creator.prototype[name] = function (key, value) {
        mergeProps([{[name]: value === undefined ? key : {[key]: value}}], this._data, {array: arrayAttrs});
        return this;
    };
});
