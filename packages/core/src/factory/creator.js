import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {attrs} from '../frame/attrs';
import {copyRule, mergeRule} from '../frame/util';
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
        link: [],
        hidden: false,
        value: null,
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
    this._data = extend(baseRule(), {type, title, field, value, props: props || {}});
    this.event = this.on;
}

extend(Creator.prototype, {
    getRule() {
        return this._data;
    },
    setProp(key, value) {
        $set(this._data, key, value);
        return this;
    },
    _clone() {
        const clone = new this.constructor();
        clone._data = copyRule(this._data);
        return clone;
    },
})

attrs.forEach(name => {
    Creator.prototype[name] = function (key) {
        mergeRule(this._data, {[name]: arguments.length < 2 ? key : {[key]: arguments[1]}})
        return this;
    };
});
