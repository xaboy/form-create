const concat = [].concat;

const assign = Object.assign;

const toString = Object.prototype.toString;

const throwIfMissing = (errorMsg = 'Missing parameter') => {throw new Error(errorMsg)};

const isDate = (arg)=>toString.call(arg)  === '[object Date]';

const isObject = (arg)=>toString.call(arg) === '[object Object]';

const isFunction = (arg)=>toString.call(arg) === '[object Function]';

const isString = (arg)=>toString.call(arg) === '[object String]';

const isArray  = Array.isArray;

export {
    concat,assign,toString,throwIfMissing,isObject,isDate,isFunction,isString,isArray
}