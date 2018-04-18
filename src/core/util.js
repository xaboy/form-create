const concat = [].concat;

const assign = Object.assign;

const toString = Object.prototype.toString;

const throwIfMissing = (errorMsg = 'Missing parameter') => {throw new Error(errorMsg)};

const isDate = (arg)=>toString.call(arg)  === '[object Date]';

const isPlainObject = (arg)=>toString.call(arg) === '[object Object]';

const isFunction = (arg)=>toString.call(arg) === '[object Function]';

const isString = (arg)=>toString.call(arg) === '[object String]';

const isArray  = Array.isArray;

const isElement = (arg)=>typeof arg === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg);

const deepExtend = function (origin,target = {}) {
    let isArr = false;
    for (let key in target){
        if(target.hasOwnProperty(key)) {
            let clone = target[key];
            if((isArr = isArray(clone)) || isPlainObject(clone)){
                let nst = origin[key] === undefined;
                if(isArr){
                    isArr = false;
                    nst && (origin[key] = []);
                }else{
                    nst && (origin[key] = {});
                }
                deepExtend(origin[key],clone);
            }else{
                origin[key] = clone;
            }
        }
    }
    return origin;
};

export {
    concat,
    assign,
    toString,
    throwIfMissing,
    isPlainObject,
    isDate,
    isFunction,
    isString,
    isArray,
    deepExtend,
    isElement
}