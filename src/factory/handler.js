import {isNumeric, uniqueId, toLine, isUndef, extend, toString, deepExtend, errMsg} from "../core/util";


export default class Handler {

    constructor(vm, _rule, Render, createOptions, noValue) {

        const rule = parseRule(_rule, vm, noValue);

        this.rule = rule;
        this.noValue = noValue;
        this.type = rule.type;
        this.field = rule.field;
        this.vm = vm;

        const id = uniqueId();
        this.id = id;
        this.unique = 'fc_' + id;
        this.refName = '__' + this.field + id;
        this.key = 'key_' + id;
        this.el = {};
        this.childrenHandlers = [];
        this.watch = [];

        if (isUndef(rule.props.elementId)) rule.props.elementId = this.unique;

        this.init();

        this.parseValue = this.toFormValue(this.rule.value);

        this.render = new Render(vm, this, createOptions);
    }

    init() {

    }

    toFormValue(value) {
        return value;
    }

    toValue(parseValue) {
        return parseValue;
    }

    setValue(value) {
        this.rule.value = value;
        this.vm._changeValue(this.field, value);
    }

    getValue() {
        return this.vm._value(this.field);
    }

    watchValue(n) {
        this.rule.value = n;
        this.vm._changeFormData(this.field, this.toFormValue(n));
    }

    watchFormValue(n) {
    }

    reset() {
        this.vm._changeValue(this.field, this.defaultValue);
    }

    mounted() {

        const refName = 'fItem' + this.refName, vm = this.vm;
        this.el = vm.$refs[this.refName];
        this.defaultValue = this.toValue(vm.$refs[refName]
            ? vm.$refs[refName].initialValue : deepExtend({}, {value: this.rule.value}).value);
        if (this.childrenHandlers.length > 0)
            this.childrenHandlers.forEach(handler => handler.mounted());
    }
}

export function parseRule(rule, vm, n) {
    if (!n && rule.value === undefined)
        console.warn(`${rule.field} 字段未定义 value 属性` + errMsg());
    let {validate = [], event = {}, col = {}, emit = [], props = {}, on = {}, options = [], title = '', value = '', field = '', className = ''} = rule;
    rule.col = parseCol(col);
    rule.props = parseProps(props);
    rule.emitEvent = parseEmit(field, rule.emitPrefix, emit, vm);
    rule.event = extend(parseEvent(event), rule.emitEvent);
    rule.validate = parseArray(validate);
    rule.options = parseArray(options);
    rule.title = title;
    rule.value = value;
    rule.field = field;
    rule.className = className;

    if (!field)
        console.error('规则的 field 字段不能空' + errMsg());

    if (Object.keys(rule.emitEvent).length > 0)
        extend(on, rule.emitEvent);
    rule.on = on;
    return rule
}

export function parseArray(validate) {
    return Array.isArray(validate) ? validate : []
}

export function parseEmit(field, emitPrefix, emit, vm) {
    let event = {};

    if (!Array.isArray(emit)) return event;

    emit.forEach((eventName) => {

        const fieldKey = toLine(`${field}-${eventName}`).replace('_', '-');

        const emitKey = emitPrefix ? (`${emitPrefix}-`).toLowerCase() + toLine(eventName) : emitPrefix;

        event[`on-${eventName}`] = event[`${eventName}`] = (...arg) => {
            vm.$emit(fieldKey, ...arg);
            if (emitKey && fieldKey !== emitKey)
                vm.$emit(emitKey, ...arg);
        };
    });

    return event
}

export function parseEvent(event) {
    Object.keys(event).forEach(function (eventName) {
        const _name = toString(eventName).indexOf('on-') === 0 ? eventName : `on-${eventName}`;

        if (_name !== eventName) {
            event[_name] = event[eventName];
            // delete event[eventName];
        }
    });

    return event
}

export function parseProps(props) {
    if (isUndef(props.hidden))
        props.hidden = false;
    if (isUndef(props.visibility))
        props.visibility = false;

    return props
}

export function parseCol(col) {
    if (isNumeric(col)) {
        return {span: col};
    } else if (col.span === undefined)
        col.span = 24;

    return col
}
