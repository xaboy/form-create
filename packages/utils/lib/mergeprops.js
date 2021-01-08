export const normalMerge = ['attrs', 'props', 'domProps', 'scopedSlots'];
export const toArrayMerge = ['class', 'style', 'directives'];
export const functionalMerge = ['on', 'nativeOn'];

const mergeProps = (objects, initial = {}, opt = {}) => {
    const _normalMerge = [...normalMerge, ...opt['normal'] || []];
    const _toArrayMerge = [...toArrayMerge, ...opt['array'] || []];
    const _functionalMerge = [...functionalMerge, ...opt['functional'] || []];
    const propsMerge = opt['props'] || [];

    return objects.reduce((a, b) => {
        for (const key in b) {
            if (a[key]) {
                if (propsMerge.indexOf(key) > -1) {
                    a[key] = mergeProps([b[key]], a[key]);
                } else if (_normalMerge.indexOf(key) > -1) {
                    a[key] = {...a[key], ...b[key]}
                } else if (_toArrayMerge.indexOf(key) > -1) {
                    const arrA = a[key] instanceof Array ? a[key] : [a[key]];
                    const arrB = b[key] instanceof Array ? b[key] : [b[key]];
                    a[key] = [...arrA, ...arrB]
                } else if (_functionalMerge.indexOf(key) > -1) {
                    for (const event in b[key]) {
                        if (a[key][event]) {
                            const arrA = a[key][event] instanceof Array ? a[key][event] : [a[key][event]];
                            const arrB = b[key][event] instanceof Array ? b[key][event] : [b[key][event]];
                            a[key][event] = [...arrA, ...arrB]
                        } else {
                            a[key][event] = b[key][event]
                        }
                    }
                } else if (key === 'hook') {
                    for (let hook in b[key]) {
                        if (a[key][hook]) {
                            a[key][hook] = mergeFn(a[key][hook], b[key][hook])
                        } else {
                            a[key][hook] = b[key][hook]
                        }
                    }
                } else {
                    a[key] = b[key]
                }
            } else {
                if (_normalMerge.indexOf(key) > -1 || _functionalMerge.indexOf(key) > -1 || propsMerge.indexOf(key) > -1) {
                    a[key] = {...b[key]}
                } else if (_toArrayMerge.indexOf(key) > -1) {
                    a[key] = b[key] instanceof Array ? [...b[key]] : (typeof b[key] === 'object' ? {...b[key]} : b[key]);
                } else
                    a[key] = b[key];
            }
        }
        return a
    }, initial);
}

const mergeFn = (fn1, fn2) =>
    function () {
        fn1 && fn1.apply(this, arguments);
        fn2 && fn2.apply(this, arguments);
    };

export default mergeProps;
