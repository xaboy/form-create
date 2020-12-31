export default function toCase(name) {
    const to = name.replace(/(-[a-z])/g, function (v) {
        return v.replace('-', '').toLocaleUpperCase();
    });

    return to.replace(to[0], to[0].toLowerCase());
}
