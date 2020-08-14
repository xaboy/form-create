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
    trueArray(children) {
        return Array.isArray(children) && children.length > 0;
    }
};

['Date', 'Object', 'Function', 'String', 'Boolean'].forEach(t => {
    is[t] = function (arg) {
        return is.type(arg, t);
    }
})

export default is;
