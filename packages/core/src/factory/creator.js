import {$set, deepExtend, extend, isFunction, isPlainObject} from '@form-create/utils';
import VData from './vData';

function baseRule() {
    return {
        validate: [],
        options: [],
        col: {},
        children: [],
        control: [],
        emit: [],
        template: undefined,
        emitPrefix: undefined,
        native: undefined,
        info: undefined,
    };
}

export function creatorFactory(name) {
    return (title, field, value, props = {}) => new Creator(name, title, field, value, props);
}

export function creatorTypeFactory(name, type, typeName = 'type') {
    return (title, field, value, props = {}) => {
        const maker = new Creator(name, title, field, value, props);
        if (isFunction(type)) type(maker);
        else maker.props(typeName, type);
        return maker;
    };
}

export default class Creator extends VData {
    constructor(type, title, field, value, props = {}) {
        super();
        extend(this._data, baseRule());
        extend(this._data, {type, title, field, value});
        if (isPlainObject(props)) this.props(props);
    }

    type(type) {
        this.props('type', type);
        return this;
    }

    _clone() {
        const clone = new this.constructor();
        clone._data = deepExtend({}, this._data);
        return clone;
    }

    getRule() {
        return this._data;
    }

    event(...args) {
        this.on(...args);
        return this;
    }
}

const keyAttrs = ['emitPrefix', 'className', 'value', 'name', 'title', 'native', 'info', 'hidden', 'visibility', 'inject', 'model'];

keyAttrs.forEach(attr => {
    Creator.prototype[attr] = function (value) {
        $set(this._data, attr, value);
        return this;
    };
});

const objAttrs = ['col'];

objAttrs.forEach(attr => {
    Creator.prototype[attr] = function (opt) {
        $set(this._data, attr, extend(this._data[attr], opt));
        return this;
    };
});

const arrAttrs = ['validate', 'options', 'children', 'emit', 'control'];

arrAttrs.forEach(attr => {
    Creator.prototype[attr] = function (opt) {
        if (!Array.isArray(opt)) opt = [opt];
        $set(this._data, attr, this._data[attr].concat(opt));
        return this;
    };
});
