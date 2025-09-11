function isPromise(value) {
    return value && typeof value === 'object' && typeof value.then === 'function';
}

export default function toPromise(value) {
    if (isPromise(value)) {
        return value;
    }
    return Promise.resolve(value);
}