export function format(type, msg, rule) {
    return (`[form-create ${type}]: ${msg}` + (rule ? ('\n\n' + JSON.stringify(rule)) : ''))
}

export function tip(msg, rule) {
    console.warn(format('tip', msg, rule));
}

export function err(msg, rule) {
    console.error(format('err', msg, rule));
}
