import Creator, {creatorFactory} from "./creator";
import {extend, isPlainObject, isString, isUndef, isValidChildren} from "../core/util";

export default function makerFactory(componentList) {

    let _m = {};

    Object.keys(componentList).forEach(key => {
        const component = componentList[key];

        const undef = isUndef(component.maker);

        if (undef || component.maker[component.name] === undefined)
            _m[component.name] = creatorFactory(component.name);

        if (!undef)
            extend(_m, component.maker);
    });

    const commonMaker = creatorFactory('');

    extend(_m, {
        create(type, field, title) {
            let make = commonMaker('', field);
            make.rule.type = type;
            make.rule.title = title;
            return make;
        },
        createTmp(template, vm, field, title) {
            let make = commonMaker('', field);
            make.rule.type = 'template';
            make.rule.template = template;
            make.rule.title = title;
            make.rule.vm = vm;
            return make;
        }
    });
    _m.template = _m.createTmp;

    _m.parse = parse;

    return _m;
};

function parse(rule, toMaker = false) {
    if (isString(rule))
        rule = JSON.parse(rule);

    if (rule instanceof Creator)
        return toMaker ? rule : rule.getRule();
    if (isPlainObject(rule)) {
        const maker = ruleToMaker(rule);
        return toMaker ? maker : maker.getRule();
    } else if (!Array.isArray(rule))
        return rule;
    else {
        const rules = rule.map(r => parse(r, toMaker));
        Object.defineProperty(rules, 'find', {
            value: findField,
            enumerable: false,
            configurable: false
        });

        return rules;
    }
}

function findField(field) {
    let children = [];
    for (let i in this) {
        const rule = this[i] instanceof Creator ? this[i].rule : this[i];
        if (rule.field === field)
            return this[i];
        if (isValidChildren(rule.children))
            children = children.concat(rule.children);
    }
    if (children.length > 0)
        return findField.call(children, field);
}

function ruleToMaker(rule) {
    const maker = new Creator();
    Object.keys(rule).forEach(key => {
        if (Object.keys(maker._data).indexOf(key) === -1) {
            maker.rule[key] = rule[key];
        } else {
            maker._data[key] = rule[key];
        }
    });
    return maker;
}
