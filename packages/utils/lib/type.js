const is = {
    type(arg, type) {
        return Object.prototype.toString.call(arg) === '[object ' + type + ']'
    },
    Undef(v) {
        return v === undefined || v === null
    },
    Element(arg) {
        return typeof arg === 'object' && arg !== null && arg.nodeType === 1 && !is.Object(arg)
    },
    trueArray(data) {
        return Array.isArray(data) && data.length > 0;
    },
    Function(v) {
        const type = this.getType(v);
        return type === 'Function' || type === 'AsyncFunction';
    },
    getType(v) {
        const str = Object.prototype.toString.call(v)
        return /^\[object (.*)\]$/.exec(str)[1]
    },
    empty(value) {
        if (value === undefined || value === null) {
            return true;
        }

        if (Array.isArray(value) && Array.isArray(value) && !value.length) {
            return true;
        }

        return typeof value === 'string' && !value;
    }
};

['Date', 'Object', 'String', 'Boolean', 'Array', 'Number'].forEach(t => {
    is[t] = function (arg) {
        return is.type(arg, t);
    }
})

export function hasProperty(rule, k) {
    return ({}).hasOwnProperty.call(rule, k)
}

export default is;
