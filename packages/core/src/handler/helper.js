import {enumerable, getRule} from '../frame/util';
import is from '@form-create/utils/lib/type';


export default function useHelper(rules) {
    if (!Array.isArray(rules) || rules.findField) return;
    Object.defineProperties(rules, {
        findField: enumerable(findField),
        findName: enumerable(findName),
        setValue: enumerable(setValue),
    })
}

function find(field, name, origin) {
    if (!this.length) return;
    let children = [];
    for (let i = 0; i < this.length; i++) {
        if (!is.Object(this[i])) continue;
        let rule = getRule(this[i]);
        if (rule[name] === field) return origin ? rule : this[i];
        if (is.trueArray(rule.children)) children = children.concat(rule.children);
        is.trueArray(rule.control) && rule.control.forEach(r => {
            children = children.concat(r.rule);
        })
    }
    return find.call(children, field, name, origin);
}

function findField(field) {
    return find.call(this, field, 'field');
}

function findName(field) {
    return find.call(this, field, 'name');
}

function setValue(formData) {
    Object.keys(formData).forEach(field => {
        const rule = find.call(this, field, 'field', true);
        if (rule) rule.value = formData[field];
    });
}
