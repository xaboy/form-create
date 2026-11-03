import deepExtend from '@form-create/utils/lib/deepextend';
import is from '@form-create/utils/lib/type';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {arrayAttrs, normalAttrs} from './attrs';
import {logError} from '@form-create/utils/lib/console';
import {isVNode} from 'vue';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isoWeek from 'dayjs/plugin/isoWeek';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';

dayjs.extend(customParseFormat);
dayjs.extend(isoWeek);
dayjs.extend(quarterOfYear);
import {upper} from '@form-create/utils/lib/toline';
import toCase from '@form-create/utils/lib/tocase';

export {parseJson, parseFn, toJson} from '@form-create/utils/lib/json';
export {dayjs};

export function enumerable(value, writable) {
    return {
        value,
        enumerable: false,
        configurable: false,
        writable: !!writable
    }
}

//todo 优化位置
export function copyRule(rule, mode) {
    return copyRules([rule], mode || false)[0];
}

export function copyRules(rules, mode) {
    return deepExtend([], [...rules], mode || false);
}

//保持同一个引用，mergeProps 才能按 opt 命中分类缓存；
//arrayAttrs / normalAttrs 由 exportAttrs 原地追加，数组引用本身不会变
const ruleMergeOpt = {array: arrayAttrs, normal: normalAttrs};

export function mergeRule(rule, merge) {
    mergeProps(Array.isArray(merge) ? merge : [merge], rule, ruleMergeOpt);
    return rule;
}

export function getRule(rule) {
    const r = is.Function(rule.getRule) ? rule.getRule() : rule;
    if (!r.type) {
        r.type = 'input';
    }
    return r;
}

export function mergeGlobal(target, merge) {
    if (!target) return merge;
    Object.keys(merge || {}).forEach((k) => {
        if (merge[k]) {
            target[k] = mergeRule(target[k] || {}, merge[k])
        }
    });
    return target;
}

export function funcProxy(that, proxy) {
    Object.defineProperties(that, Object.keys(proxy).reduce((initial, k) => {
        initial[k] = {
            get() {
                return proxy[k]();
            }
        }
        return initial;
    }, {}))
}

export function byCtx(rule) {
    return rule.__fc__ || (rule.__origin__ ? rule.__origin__.__fc__ : null)
}

export function invoke(fn, def) {
    try {
        def = fn()
    } catch (e) {
        logError(e);
    }
    return def;
}

export function makeSlotBag() {
    const slotBag = {};
    const slotName = (n) => n || 'default';

    return {
        setSlot(slot, vnFn) {
            slot = slotName(slot);
            if (!vnFn || (Array.isArray(vnFn) && vnFn.length))
                return;
            if (!slotBag[slot]) slotBag[slot] = [];
            slotBag[slot].push(vnFn);
        },
        getSlot(slot, val) {
            slot = slotName(slot);
            const children = [];
            (slotBag[slot] || []).forEach(fn => {
                if (Array.isArray(fn)) {
                    children.push(...fn);
                } else if (is.Function(fn)) {
                    const res = fn(...(val || []));
                    if (Array.isArray(res)) {
                        children.push(...res);
                    } else {
                        children.push(res);
                    }
                } else if (!is.Undef(fn)) {
                    children.push(fn);
                }
            })
            return children;
        },
        getSlots() {
            const slots = {};
            Object.keys(slotBag).forEach(k => {
                slots[k] = (...args) => {
                    return this.getSlot(k, args);
                }
            })
            return slots
        },
        slotLen(slot) {
            slot = slotName(slot);
            return slotBag[slot] ? slotBag[slot].length : 0;
        },
        mergeBag(bag) {
            if (!bag) return this;
            const slots = is.Function(bag.getSlots) ? bag.getSlots() : bag;
            if (Array.isArray(bag) || isVNode(bag)) {
                this.setSlot(undefined, () => bag);
            } else {
                Object.keys(slots).forEach(k => {
                    this.setSlot(k, slots[k]);
                });
            }

            return this;
        }
    };
}

export function toProps(rule) {
    const prop = {...(rule.props || {})};

    Object.keys(rule.on || {}).forEach(k => {
        if (k.indexOf('-') > 0) {
            k = toCase(k);
        }
        const name = `on${upper(k)}`;
        if (Array.isArray(prop[name])) {
            prop[name] = [...prop[name], rule.on[k]];
        } else if (prop[name]) {
            prop[name] = [prop[name], rule.on[k]];
        } else {
            prop[name] = rule.on[k];
        }
    })
    prop.key = rule.key;
    prop.ref = rule.ref;
    prop.class = rule.class;
    prop.id = rule.id;
    prop.style = rule.style;
    if (prop.slot) delete prop.slot;

    return prop;
}

export function setPrototypeOf(o, proto) {
    Object.setPrototypeOf(o, proto);
    return o;
}


const changeType = (a, b) => {
    if (typeof a === 'string') {
        return String(b);
    } else if (typeof a === 'number') {
        return Number(b);
    }
    return b;
}

function toTimestamp(value) {
    if (is.Number(value)) {
        if (!Number.isFinite(value) || value < 1e9) {
            return NaN;
        }
        return value >= 1e11 ? value : value * 1000;
    }
    if (!is.String(value)) {
        return NaN;
    }
    const text = value.trim();
    if (/^\d{11,}$/.test(text)) {
        return Number(text);
    }
    if (/^\d{10}$/.test(text)) {
        return Number(text) * 1000;
    }
    return NaN;
}

function parseTime(value) {
    let current;
    if (is.Date(value)) {
        current = dayjs(value);
    } else {
        const timestamp = toTimestamp(value);
        if (!Number.isNaN(timestamp)) {
            current = dayjs(timestamp);
        } else if (is.String(value)) {
            current = dayjs(value.trim().replace('T', ' '), ['YYYY-MM-DD HH:mm:ss', 'YYYY-MM-DD'], true);
        }
    }
    return current && current.isValid() ? current : null;
}

function readOffset(value) {
    if (typeof value !== 'number' || !Number.isInteger(value) || value < 0) {
        return NaN;
    }
    return value;
}

function span(start, end) {
    return [start.valueOf(), end.valueOf()];
}

function everyValue(value, check) {
    if (Array.isArray(value)) {
        return value.length > 0 && value.every(item => check(item));
    }
    return check(value);
}

function compareOffset(value, offset, unit, sign) {
    const count = readOffset(offset);
    if (Number.isNaN(count)) {
        return false;
    }
    const target = dayjs().add(sign * count, unit).valueOf();
    return everyValue(value, (item) => {
        const current = parseTime(item);
        if (!current) {
            return false;
        }
        const time = current.valueOf();
        return sign < 0 ? time < target : time > target;
    });
}

function compareDate(value, target, sign) {
    const right = parseTime(target);
    if (!right) {
        return false;
    }
    const time = right.valueOf();
    return everyValue(value, (item) => {
        const left = parseTime(item);
        if (!left) {
            return false;
        }
        return sign < 0 ? left.valueOf() < time : left.valueOf() > time;
    });
}

const periodRange = {
    recent7Day(now) {
        return span(now.startOf('day').subtract(6, 'day'), now.endOf('day'));
    },
    recent30Day(now) {
        return span(now.startOf('day').subtract(29, 'day'), now.endOf('day'));
    },
    coming7Day(now) {
        return span(now.startOf('day'), now.add(6, 'day').endOf('day'));
    },
    coming30Day(now) {
        return span(now.startOf('day'), now.add(29, 'day').endOf('day'));
    },
    thisWeek(now) {
        return span(now.startOf('isoWeek'), now.endOf('isoWeek'));
    },
    lastWeek(now) {
        const start = now.startOf('isoWeek').subtract(1, 'week');
        return span(start, start.endOf('isoWeek'));
    },
    nextWeek(now) {
        const start = now.startOf('isoWeek').add(1, 'week');
        return span(start, start.endOf('isoWeek'));
    },
    thisMonth(now) {
        return span(now.startOf('month'), now.endOf('month'));
    },
    lastMonth(now) {
        const start = now.startOf('month').subtract(1, 'month');
        return span(start, start.endOf('month'));
    },
    nextMonth(now) {
        const start = now.startOf('month').add(1, 'month');
        return span(start, start.endOf('month'));
    },
    recentMonth(now) {
        return span(now.subtract(1, 'month').startOf('day'), now.endOf('day'));
    },
    comingMonth(now) {
        return span(now.startOf('day'), now.add(1, 'month').endOf('day'));
    },
    recent3Month(now) {
        return span(now.subtract(3, 'month').startOf('day'), now.endOf('day'));
    },
    recent6Month(now) {
        return span(now.subtract(6, 'month').startOf('day'), now.endOf('day'));
    },
    thisQuarter(now) {
        return span(now.startOf('quarter'), now.endOf('quarter'));
    },
    lastQuarter(now) {
        const start = now.startOf('quarter').subtract(1, 'quarter');
        return span(start, start.endOf('quarter'));
    },
    nextQuarter(now) {
        const start = now.startOf('quarter').add(1, 'quarter');
        return span(start, start.endOf('quarter'));
    },
    thisYear(now) {
        return span(now.startOf('year'), now.endOf('year'));
    },
    lastYear(now) {
        const start = now.startOf('year').subtract(1, 'year');
        return span(start, start.endOf('year'));
    },
    nextYear(now) {
        const start = now.startOf('year').add(1, 'year');
        return span(start, start.endOf('year'));
    },
    recentYear(now) {
        return span(now.subtract(1, 'year').startOf('day'), now.endOf('day'));
    },
    comingYear(now) {
        return span(now.startOf('day'), now.add(1, 'year').endOf('day'));
    },
};

function inPeriod(value, name) {
    const build = is.String(name) ? periodRange[name] : null;
    if (!build) {
        return false;
    }
    const [start, end] = build(dayjs());
    return everyValue(value, (item) => {
        const current = parseTime(item);
        return !!current && current.valueOf() >= start && current.valueOf() <= end;
    });
}

export const condition = {
    '==': (a, b) => {
        return JSON.stringify(a) === JSON.stringify(changeType(a, b));
    },
    '!=': (a, b) => {
        return !condition['=='](a, b);
    },
    '>': (a, b) => {
        return a > b;
    },
    '>=': (a, b) => {
        return a >= b;
    },
    '<': (a, b) => {
        return a < b;
    },
    '<=': (a, b) => {
        return a <= b;
    },
    on(a, b) {
        return a && a.indexOf && a.indexOf(changeType(a[0], b)) > -1;
    },
    notOn(a, b) {
        return !condition.on(a, b);
    },
    in(a, b) {
        return b && b.indexOf && b.indexOf(a) > -1;
    },
    notIn(a, b) {
        return !condition.in(a, b);
    },
    between(a, b) {
        return a > b[0] && a < b[1];
    },
    notBetween(a, b) {
        return a < b[0] || a > b[1];
    },
    empty(a) {
        return is.empty(a);
    },
    notEmpty(a) {
        return !is.empty(a);
    },
    pattern(a, b) {
        return new RegExp(b, 'g').test(a);
    },
    beforeDay(a, b) {
        return compareOffset(a, b, 'day', -1);
    },
    afterDay(a, b) {
        return compareOffset(a, b, 'day', 1);
    },
    beforeWeek(a, b) {
        return compareOffset(a, b, 'week', -1);
    },
    afterWeek(a, b) {
        return compareOffset(a, b, 'week', 1);
    },
    beforeMonth(a, b) {
        return compareOffset(a, b, 'month', -1);
    },
    afterMonth(a, b) {
        return compareOffset(a, b, 'month', 1);
    },
    beforeYear(a, b) {
        return compareOffset(a, b, 'year', -1);
    },
    afterYear(a, b) {
        return compareOffset(a, b, 'year', 1);
    },
    beforeDate(a, b) {
        return compareDate(a, b, -1);
    },
    afterDate(a, b) {
        return compareDate(a, b, 1);
    },
    period(a, b) {
        return inPeriod(a, b);
    }
};

export function deepGet(val, split) {
    (Array.isArray(split) ? split : (split || '').split('.')).forEach(k => {
        if (val != null) {
            val = val[k];
        }
    });
    return val;
}

export function extractVar(str) {
    const regex = /{{\s*(.*?)\s*}}/g;
    let match;
    const matches = {};
    while ((match = regex.exec(str)) !== null) {
        if (match[1]) {
            matches[match[1]] = true;
        }
    }
    return Object.keys(matches);
}

export function convertFieldToConditions(field) {
    let parts = field.split('.');
    let conditions = [];
    let currentCondition = '';

    parts.forEach((part, index) => {
        if (index === 0) {
            currentCondition = part;
        } else {
            currentCondition += '.' + part;
        }
        conditions.push(currentCondition);
    });

    return conditions.join(' && ');
}

export function parseTemplateToTree(template) {
    const tokens = [];
    let current = '';
    let depth = 0;

    for (let i = 0; i < template.length; i++) {
        const char = template[i];

        if (char === '[') {
            if (depth === 0 && current) {
                tokens.push({type: 'key', value: current});
                current = '';
            }
            depth++;
            current += char;
        } else if (char === ']') {
            depth--;
            current += char;

            if (depth === 0) {
                tokens.push({
                    type: 'bracket',
                    value: parseTemplateToTree(current.slice(1, -1))
                });
                current = '';
            }
        } else if (char === '.' && depth === 0) {
            if (current) {
                tokens.push({type: 'key', value: current});
                current = '';
            }
        } else {
            current += char;
        }
    }

    if (current) {
        tokens.push({type: 'key', value: current});
    }

    return tokens.map(token => {
        if (token.type === 'key') {
            return {key: token.value};
        } else {
            return {children: token.value};
        }
    });
}
