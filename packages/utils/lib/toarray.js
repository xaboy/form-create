export default function toArray(value) {
    return Array.isArray(value)
        ? value
        : ([null, undefined, ''].indexOf(value) > -1 ? [] : [value]);
}
