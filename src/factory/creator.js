import {$set, extend, isFunction, isPlainObject} from "../core/util";
import VData from "./vData";

export function baseRule() {
    return {
        event: {},
        validate: [],
        options: [],
        col: {},
        children: [],
        emit: [],
        template: null,
        emitPrefix: null
    }
}

export function creatorFactory(name) {
    return (title, field, value, props = {}) => new Creator(name, title, field, value, props)
}

export function creatorTypeFactory(name, type, typeName = 'type') {
    return (title, field, value, props = {}) => {
        const maker = new Creator(name, title, field, value, props);
        if (isFunction(type))
            type(maker);
        else
            maker.props(typeName, type);
        return maker
    }
}

export default class Creator extends VData {
    constructor(type, title, field, value, props = {}) {
        super();

        this.rule = extend(baseRule(), {type, title, field, value});
        this.props({hidden: false, visibility: false});
        if (isPlainObject(props))
            this.props(props);
    }

    type(type) {
        this.props('type', type);
        return this
    }

    get() {
        return this._data;
    }

    getRule() {
        return extend(this.rule, this.get());
    }

    setValue(value) {
        $set(this.rule, 'value', value);
        return this
    }
}

const keyAttrs = ['emitPrefix', 'className', 'defaultSlot'];

keyAttrs.forEach((attr) => {
    Creator.prototype[attr] = function (value) {
        $set(this.rule, attr, value);
        return this;
    }
});

const objAttrs = ['event', 'col'];

objAttrs.forEach((attr) => {
    Creator.prototype[attr] = function (opt) {
        $set(this.rule, attr, extend(this.rule[attr], opt));
        return this;
    }
});

const arrAttrs = ['validate', 'options', 'children', 'emit'];

arrAttrs.forEach((attr) => {
    Creator.prototype[attr] = function (opt) {
        if (!Array.isArray(opt)) opt = [opt];
        $set(this.rule, attr, this.rule[attr].concat(opt));
        return this;
    }
});
