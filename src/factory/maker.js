import {creatorFactory} from "./creator";
import {extend, isPlainObject, isString, isUndef} from "../core/util";
import Creator from "./creator";

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
        create(type, field) {
            let make = commonMaker('', field);
            make.rule.type = type;
            return make;
        },
        createTmp(template, vm, field) {
            let make = commonMaker('', field);
            make.rule.type = 'template';
            make.rule.template = template;
            make.rule.vm = vm;
            return make;
        }
    });
    _m.template = _m.createTmp;

    _m.parse = parse;

    return _m;
};

function parse(rule) {
    if (isString(rule))
        rule = JSON.parse(rule);
    if (isPlainObject(rule))
        return ruleToMaker(rule);
    else if (rule instanceof Creator || !Array.isArray(rule))
        return rule;
    else {
        const rules = rule.map(r => parse(r));
        Object.defineProperty(rules, 'find', {
            value: findField,
            enumerable: false,
            configurable: false
        });

        return rules;
    }
    //TODO 处理 maker 生成器,处理递归搜索
}

function findField(field) {
    for (let i in this) {
        if (this[i].rule.field === field)
            return this[i];
    }
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
