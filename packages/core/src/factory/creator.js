import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {attrs} from '../core/attrs';
import {mergeRule} from '../core/util';
import {_vue} from '../core';
import {$set} from '@form-create/utils/lib';

export function baseRule() {
    return {
        props: {},
        on: {},
        validate: [],
        options: [],
        col: {},
        children: [],
        control: [],
        emit: [],
        hidden: false,
        value: null,
    };
}

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
    this._data = _vue.observable(extend(baseRule(), {type, title, field, value, props: props || {}}))
}

extend(Creator.prototype, {
    getRule() {
        return this._data;
    },
    setProp(key, value) {
        $set(this._data, key, value);
        return this;
    },
    event(...args) {
        this.on(...args);
        return this;
    },
    _clone() {
        const clone = new this.constructor();
        mergeRule(clone._data, this._data);
        return clone;
    },
})

attrs.forEach(name => {
    Creator.prototype[name] = function (key) {
        mergeRule(this._data, {[name]: arguments.length < 2 ? key : {[key]: arguments[1]}})
        return this;
    };
});
