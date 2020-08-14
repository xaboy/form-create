export default function toArray(value) {
    return Array.isArray(value)
        ? value
        : ([null, undefined, ''].indexOf(value) ? [] : [value]);
}
