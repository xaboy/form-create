const concat = [].concat;

const assign = Object.assign;

const toString = Object.prototype.toString;

const throwIfMissing = (errorMsg = 'Missing parameter') => {
	throw new Error(errorMsg)
};

const isDate = (arg) => toString.call(arg) === '[object Date]';

const isPlainObject = (arg) => toString.call(arg) === '[object Object]';

const isFunction = (arg) => toString.call(arg) === '[object Function]';

const isString = (arg) => toString.call(arg) === '[object String]';

const isBool = (arg) => toString.call(arg) === '[object Boolean]';

const isArray = Array.isArray;

const toLine = (name) => name.replace(/([A-Z])/g, '-$1').toLowerCase();

const isNumeric = (n)=>{
	return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
};

const TA = (a)=>{
	return isArray(a) ? a : [a];
};

const ATS = (a)=>{
	return isArray(a) ? (a[0] || '') : a;
};

const isElement = (arg) => typeof arg === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg);

const deepExtend = function (origin, target = {}) {
	let isArr = false;
	for (let key in target) {
		if (Object.prototype.hasOwnProperty.call(target, key)) {
			let clone = target[key];
			if ((isArr = isArray(clone)) || isPlainObject(clone)) {
				let nst = origin[key] === undefined;
				if (isArr) {
					isArr = false;
					nst && (origin[key] = []);
				} else {
					nst && (origin[key] = {});
				}
				deepExtend(origin[key], clone);
			} else {
				origin[key] = clone;
			}
		}
	}
	return origin;
};

let id = 0;

const uniqueId = () => ++id;

const dateFormat = (fmt, date = new Date) => {
	let o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"q+": Math.floor((date.getMonth() + 3) / 3),
		"S": date.getMilliseconds()
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (let k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1)
				? (o[k])
				: (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
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
	isElement,
	uniqueId,
	dateFormat,
	isNumeric,
    isBool,
	ATS,TA,toLine
}