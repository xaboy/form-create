import {isNumeric, uniqueId, toLine, isUndef, extend, toString, deepExtend} from "../core/util";


export default class Handler {

    constructor(vm, _rule = {}) {
        const rule = parseRule(_rule, vm);

        this.rule = rule;
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

        this.init();

        this.parseValue = this.toParseValue(this.rule.value);
    }

    init() {

    }

    toParseValue(value) {
        return value;
    }

    toTrueValue(parseValue) {
        return parseValue;
    }

    setTrueValue(value) {
        this.vm.changeTrueData(this.field, value);
    }

    getValue() {
        return this.vm.getTrueDataValue(this.field);
    }

    setParseValue(parseValue) {
        this.setTrueValue(this.toTrueValue(parseValue));
    }

    watchTrueValue(n) {
        this.vm.changeFormData(this.field, this.toParseValue(n));
    }

    watchParseValue(n) {
    }

    mounted() {
        this.el = this.vm.$refs[this.refName];
        this.defaultValue = this.toTrueValue(this.vm.$refs['fItem' + this.refName]
            ? this.vm.$refs['fItem' + this.refName].initialValue : deepExtend({}, {value: this.rule.value}).value);
        if (this.childrenHandlers.length > 0)
            this.childrenHandlers.forEach(handler => handler.mounted());
    }
}

export function parseRule(rule, vm) {
    let {validate = [], event = {}, col = {}, emit = [], props = {}, on = {}, options = [], title = '', value = '', field = ''} = rule;
    rule.col = parseCol(col);
    rule.props = parseProps(props);
    rule.emitEvent = parseEmit(field, emit, vm);
    rule.event = extend(parseEvent(event), rule.emitEvent);
    rule.validate = parseArray(validate);
    rule.options = parseArray(options);
    rule.title = title;
    rule.value = value;
    rule.field = field;

    if (Object.keys(rule.emitEvent).length > 0)
        extend(on, rule.emitEvent);
    rule.on = on;
    return rule
}

export function parseArray(validate) {
    return Array.isArray(validate) ? validate : []
}

export function parseEmit(field, emit, vm) {
    let event = {};

    if (!Array.isArray(emit)) return event;

    emit.forEach((eventName) => {
        event[`on-${eventName}`] = event[`${eventName}`] = (...arg) => {
            vm.$emit(toLine(`${field}-${eventName}`).replace('_', '-'), ...arg);
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
