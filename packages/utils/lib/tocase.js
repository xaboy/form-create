export default function toCase(name) {
    return name.replace(/(-[a-z])/g, function (v) {
        return v.replace('-', '').toLocaleUpperCase();
    });
}
