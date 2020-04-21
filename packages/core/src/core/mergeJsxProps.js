const normalMerge = ['attrs', 'props', 'domProps'];
const toArrayMerge = ['class', 'style', 'directives'];
const functionalMerge = ['on', 'nativeOn'];

const mergeJsxProps = (objects, initial) =>
    objects.reduce((a, b) => {
        for (const key in b) {
            if (a[key]) {
                if (normalMerge.indexOf(key) !== -1) {
                    a[key] = {...a[key], ...b[key]}
                } else if (toArrayMerge.indexOf(key) !== -1) {
                    const arrA = a[key] instanceof Array ? a[key] : [a[key]];
                    const arrB = b[key] instanceof Array ? b[key] : [b[key]];
                    a[key] = [...arrA, ...arrB]
                } else if (functionalMerge.indexOf(key) !== -1) {
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
                a[key] = b[key]
            }
        }
        return a
    }, initial);

const mergeFn = (fn1, fn2) =>
    function () {
        fn1 && fn1.apply(this, arguments);
        fn2 && fn2.apply(this, arguments);
    };

export default mergeJsxProps
