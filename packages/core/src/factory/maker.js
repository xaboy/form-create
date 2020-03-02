import Creator, {creatorFactory} from './creator';
import {parseJson, enumerable} from '../core/util';
import {extend, isPlainObject, isString, isValidChildren} from '@form-create/utils';


const commonMaker = creatorFactory('');

export function create(type, field, title) {
    let make = commonMaker('', field);
    make._data.type = type;
    make._data.title = title;
    return make;
}

export function createTmp(template, vm, field, title) {
    let make = commonMaker('', field);
    make._data.type = 'template';
    make._data.template = template;
    make._data.title = title;
    make._data.vm = vm;
    return make;
}

export default function makerFactory() {
    let maker = {};

    extend(maker, {
        create,
        createTmp
    });
    maker.template = createTmp;
    maker.parse = parse;

    return maker;
}

function parse(rule, toMaker = false) {
    if (isString(rule)) rule = parseJson(rule);

    if (rule instanceof Creator) return toMaker ? rule : rule.getRule();
    if (isPlainObject(rule)) {
        const maker = ruleToMaker(rule);
        return toMaker ? maker : maker.getRule();
    } else if (!Array.isArray(rule)) return rule;
    else {
        const rules = rule.map(r => parse(r, toMaker));
        Object.defineProperties(rules, {
            find: enumerable(findField),
            model: enumerable(model)
        });

        return rules;
    }
}

function findField(field, origin) {
    let children = [];
    for (let i in this) {
        const rule = this[i] instanceof Creator ? this[i]._data : this[i];
        if (rule.field === field) return origin === true ? rule : this[i];
        if (isValidChildren(rule.children)) children = children.concat(rule.children);
    }
    if (children.length > 0) return findField.call(children, field);
}

function model(formData) {
    Object.keys(formData).forEach(field => {
        const rule = this.find(field, true);
        if (rule) rule.value = formData[field];
    });
}

function ruleToMaker(rule) {
    const maker = new Creator();
    Object.keys(rule).forEach(key => {
        maker._data[key] = rule[key];
    });
    return maker;
}
