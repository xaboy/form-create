export default function toLine(name) {
    let line = name.replace(/([A-Z])/g, '-$1').toLocaleLowerCase();
    if (line.indexOf('-') === 0)
        line = line.substr(1);
    return line;
}

export function upper(str) {
    return str.replace(str[0], str[0].toLocaleUpperCase());
}


export function _parseProp(rule){
    const prop = {...(rule.props || {})};
    Object.keys(rule.nativeOn || {}).forEach(k=>{
        prop[(`on${upper(k)}`)] = rule.nativeOn[k];
    })
    Object.keys(rule.on || {}).forEach(k=>{
        prop[(`on${upper(k)}`)] = rule.on[k];
    })
    prop.key = rule.key;
    prop.ref = rule.ref;
    prop.class = rule.class;
    prop.style = rule.style;
    if(prop.slot) delete  prop.slot;

    return prop;
}