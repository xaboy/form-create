import Vue from 'vue';

export function $nt(fn) {
    Vue.nextTick(fn);
}

export const _toString = Object.prototype.toString;

export function toRawType(value) {
    return _toString.call(value).slice(8, -1)
}

export function isUndef(v) {
    return v === undefined || v === null
}

export function toString(val) {
    return val == null
        ? ''
        : typeof val === 'object'
            ? JSON.stringify(val, null, 2)
            : String(val)
}

export function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to
}

export function debounce(fn, wait) {
    var timeout = null;
    return function (...arg) {
        if (timeout !== null)
            clearTimeout(timeout);
        timeout = setTimeout(()=>fn(...arg), wait);
    }
}

export function isDate(arg) {
    return _toString.call(arg) === '[object Date]'
}

export function isPlainObject(arg) {
    return _toString.call(arg) === '[object Object]'
}

export function isFunction(arg) {
    return _toString.call(arg) === '[object Function]'
}

export function isString(arg) {
    return _toString.call(arg) === '[object String]'
}

export function isBool(arg) {
    return _toString.call(arg) === '[object Boolean]'
}

export function toLine(name) {
    return name.replace(/([A-Z])/g, '-$1').toLowerCase()
}

export function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n)
}

export function toArray(a) {
    return Array.isArray(a) ? a : [a]
}

export function ATS(a) {
    return Array.isArray(a) ? (a[0] || '') : a
}

export function isElement(arg) {
    return typeof arg === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg)
}

export function deepExtend(origin, target = {}) {
    let isArr = false;
    for (let key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            let clone = target[key];
            if ((isArr = Array.isArray(clone)) || isPlainObject(clone)) {
                let nst = origin[key] === undefined;
                if (isArr) {
                    isArr = false;
                    nst && (origin[key] = []);
                } else {
                    nst && (origin[key] = {});
                }
                deepExtend(origin[key], clone);
            } else {
                origin[key] = clone;
            }
        }
    }
    return origin
}

let id = 0;

export function uniqueId() {
    return ++id
}

export function dateFormat(fmt, date = new Date) {
    let o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
                ? (o[k])
                : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt
}

export function errMsg(){

    return '\n\x67\x69\x74\x68\x75\x62\x3a\x68\x74\x74\x70' +
        '\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f' +
        '\x6d\x2f\x78\x61\x62\x6f\x79\x2f\x66\x6f\x72\x6d\x2d' +
        '\x63\x72\x65\x61\x74\x65\n\x64\x6f\x63\x75\x6d\x65' +
        '\x6e\x74\x3a\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77' +
        '\x2e\x66\x6f\x72\x6d\x2d\x63\x72\x65\x61\x74\x65\x2e' +
        '\x63\x6f\x6d';
}
