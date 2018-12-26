/*! form-create v1.5 | github https://github.com/xaboy/form-create | author xaboy */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"), require("iview"));
	else if(typeof define === 'function' && define.amd)
		define("formCreate", ["vue", "iview"], factory);
	else if(typeof exports === 'object')
		exports["formCreate"] = factory(require("vue"), require("iview"));
	else
		root["formCreate"] = factory(root["Vue"], root["iview"]);
})(typeof self !== 'undefined' ? self : this, function(__WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_11__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 13);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.parseRule = parseRule;
exports.parseArray = parseArray;
exports.parseEmit = parseEmit;
exports.parseEvent = parseEvent;
exports.parseProps = parseProps;
exports.parseCol = parseCol;

var _util = __webpack_require__(2);

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Handler = function () {
    function Handler(vm) {
        var _rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Handler);

        var rule = parseRule(_rule, vm);

        this.rule = rule;
        this.type = rule.type;
        this.field = rule.field;
        this.vm = vm;

        var id = (0, _util.uniqueId)();
        this.id = id;
        this.unique = 'fc_' + id;
        this.refName = '__' + this.field + id;
        this.key = 'key_' + id;
        this.el = {};
        this.childrenHandlers = [];
        this.watch = [];

        this.init();

        this.parseValue = this.toParseValue(this.rule.value);
    }

    _createClass(Handler, [{
        key: 'init',
        value: function init() {}
    }, {
        key: 'toParseValue',
        value: function toParseValue(value) {
            return value;
        }
    }, {
        key: 'toTrueValue',
        value: function toTrueValue(parseValue) {
            return parseValue;
        }
    }, {
        key: 'setTrueValue',
        value: function setTrueValue(value) {
            this.rule.value = value;
            this.vm.changeTrueData(this.field, value);
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.vm.getTrueDataValue(this.field);
        }
    }, {
        key: 'setParseValue',
        value: function setParseValue(parseValue) {
            this.setTrueValue(this.toTrueValue(parseValue));
        }
    }, {
        key: 'watchTrueValue',
        value: function watchTrueValue(n) {
            this.rule.value = n;
            this.vm.changeFormData(this.field, this.toParseValue(n));
        }
    }, {
        key: 'watchParseValue',
        value: function watchParseValue(n) {}
    }, {
        key: 'mounted',
        value: function mounted() {
            var _this = this;

            this.el = this.vm.$refs[this.refName];
            this.defaultValue = this.toTrueValue(this.vm.$refs['fItem' + this.refName] ? this.vm.$refs['fItem' + this.refName].initialValue : (0, _util.deepExtend)({}, { value: this.rule.value }).value);
            if (this.childrenHandlers.length > 0) this.childrenHandlers.forEach(function (handler) {
                _newArrowCheck(this, _this);

                return handler.mounted();
            }.bind(this));
        }
    }]);

    return Handler;
}();

exports.default = Handler;
function parseRule(rule, vm) {
    var _rule$validate = rule.validate,
        validate = _rule$validate === undefined ? [] : _rule$validate,
        _rule$event = rule.event,
        event = _rule$event === undefined ? {} : _rule$event,
        _rule$col = rule.col,
        col = _rule$col === undefined ? {} : _rule$col,
        _rule$emit = rule.emit,
        emit = _rule$emit === undefined ? [] : _rule$emit,
        _rule$props = rule.props,
        props = _rule$props === undefined ? {} : _rule$props,
        _rule$on = rule.on,
        on = _rule$on === undefined ? {} : _rule$on,
        _rule$options = rule.options,
        options = _rule$options === undefined ? [] : _rule$options,
        _rule$title = rule.title,
        title = _rule$title === undefined ? '' : _rule$title,
        _rule$value = rule.value,
        value = _rule$value === undefined ? '' : _rule$value,
        _rule$field = rule.field,
        field = _rule$field === undefined ? '' : _rule$field;

    rule.col = parseCol(col);
    rule.props = parseProps(props);
    rule.emitEvent = parseEmit(field, rule.emitPrefix, emit, vm);
    rule.event = (0, _util.extend)(parseEvent(event), rule.emitEvent);
    rule.validate = parseArray(validate);
    rule.options = parseArray(options);
    rule.title = title;
    rule.value = value;
    rule.field = field;

    if (!field) console.error('规则的 field 字段不能空' + (0, _util.errMsg)());

    if (Object.keys(rule.emitEvent).length > 0) (0, _util.extend)(on, rule.emitEvent);
    rule.on = on;
    return rule;
}

function parseArray(validate) {
    return Array.isArray(validate) ? validate : [];
}

function parseEmit(field, emitPrefix, emit, vm) {
    var _this2 = this;

    var event = {};

    if (!Array.isArray(emit)) return event;

    emit.forEach(function (eventName) {
        _newArrowCheck(this, _this2);

        var fieldKey = (0, _util.toLine)(String(field) + '-' + String(eventName)).replace('_', '-');

        var emitKey = emitPrefix ? (String(emitPrefix) + '-').toLowerCase() + (0, _util.toLine)(eventName) : emitPrefix;

        event['on-' + String(eventName)] = event['' + String(eventName)] = function () {
            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            _newArrowCheck(this, _this2);

            vm.$emit.apply(vm, [fieldKey].concat(arg));
            if (emitKey && fieldKey !== emitKey) vm.$emit.apply(vm, [emitKey].concat(arg));
        }.bind(this);
    }.bind(this));

    return event;
}

function parseEvent(event) {
    Object.keys(event).forEach(function (eventName) {
        var _name = (0, _util.toString)(eventName).indexOf('on-') === 0 ? eventName : 'on-' + String(eventName);

        if (_name !== eventName) {
            event[_name] = event[eventName];
            // delete event[eventName];
        }
    });

    return event;
}

function parseProps(props) {
    if ((0, _util.isUndef)(props.hidden)) props.hidden = false;
    if ((0, _util.isUndef)(props.visibility)) props.visibility = false;

    return props;
}

function parseCol(col) {
    if ((0, _util.isNumeric)(col)) {
        return { span: col };
    } else if (col.span === undefined) col.span = 24;

    return col;
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(2);

var _vNode = __webpack_require__(8);

var _vNode2 = _interopRequireDefault(_vNode);

var _vData = __webpack_require__(6);

var _vData2 = _interopRequireDefault(_vData);

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Render = function () {
    function Render(vm, handler) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Render);

        this.vm = vm;
        this.handler = handler;
        this.options = options;
        this.vNode = new _vNode2.default(vm);
        this.vData = new _vData2.default();
        this.cache = null;
        this.$tickEvent = [];

        this.init();
    }

    _createClass(Render, [{
        key: "init",
        value: function init() {}
    }, {
        key: "cacheParse",
        value: function cacheParse() {
            var _this = this;

            if (!(this.cache && this.handler.rule.type !== '__tmp')) {
                this.cache = this.parse();
            }
            var eventList = [].concat(_toConsumableArray(this.$tickEvent));
            this.$tickEvent = [];
            (0, _util.$nt)(function () {
                _newArrowCheck(this, _this);

                eventList.forEach(function (event) {
                    _newArrowCheck(this, _this);

                    return event();
                }.bind(this));
            }.bind(this));
            return this.cache;
        }
    }, {
        key: "sync",
        value: function sync(event) {
            if ((0, _util.isFunction)(event)) this.$tickEvent.push(event);
            this.clearCache();
            this.vm.sync();
        }
    }, {
        key: "clearCache",
        value: function clearCache() {
            var _this2 = this;

            this.cache = null;
            if (this.handler.childrenHandlers.length > 0) this.handler.childrenHandlers.forEach(function (handler) {
                _newArrowCheck(this, _this2);

                return handler.render.clearCache();
            }.bind(this));
        }
    }, {
        key: "parse",
        value: function parse() {
            var _this3 = this;

            var _handler = this.handler,
                type = _handler.type,
                rule = _handler.rule,
                childrenHandlers = _handler.childrenHandlers,
                refName = _handler.refName,
                key = _handler.key;

            if (rule.type === '__tmp') {
                var vn = _vue2.default.compile(rule.template, {}).render.call(rule._vm || this.vm);
                if (vn.data === undefined) vn.data = {};
                (0, _util.extend)(vn.data, rule);
                vn.key = key;
                return [vn];
            } else {
                rule.ref = refName;
                if ((0, _util.isUndef)(rule.key)) rule.key = 'def' + (0, _util.uniqueId)();
                var _vn = this.vNode.make(type, (0, _util.extend)({}, rule), function () {
                    _newArrowCheck(this, _this3);

                    var vn = [];
                    if (childrenHandlers.length > 0) vn = childrenHandlers.map(function (handler) {
                        _newArrowCheck(this, _this3);

                        return handler.render.cacheParse();
                    }.bind(this));
                    return vn;
                }.bind(this));
                _vn.key = key;
                return [_vn];
            }
        }
    }, {
        key: "inputProps",
        value: function inputProps() {
            var _this4 = this;

            var _handler2 = this.handler,
                refName = _handler2.refName,
                unique = _handler2.unique,
                key = _handler2.key,
                field = _handler2.field,
                _handler2$rule = _handler2.rule,
                props = _handler2$rule.props,
                event = _handler2$rule.event;

            return this.vData.props((0, _util.extend)(props, { value: this.vm.cptData[field], elementId: unique })).ref(refName).key(key + '' + (0, _util.uniqueId)()).on(event).on('input', function (value) {
                _newArrowCheck(this, _this4);

                this.onInput(value);
            }.bind(this));
        }
    }, {
        key: "onInput",
        value: function onInput(value) {
            this.vm.$set(this.vm.cptData, this.handler.field, value);
        }
    }]);

    return Render;
}();

exports.default = Render;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._toString = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.$nt = $nt;
exports.toRawType = toRawType;
exports.isUndef = isUndef;
exports.toString = toString;
exports.extend = extend;
exports.debounce = debounce;
exports.isDate = isDate;
exports.isPlainObject = isPlainObject;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isBool = isBool;
exports.toLine = toLine;
exports.isNumeric = isNumeric;
exports.toArray = toArray;
exports.ATS = ATS;
exports.isElement = isElement;
exports.deepExtend = deepExtend;
exports.uniqueId = uniqueId;
exports.dateFormat = dateFormat;
exports.errMsg = errMsg;

var _vue = __webpack_require__(5);

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function $nt(fn) {
    _vue2.default.nextTick(fn);
}

var _toString = exports._toString = Object.prototype.toString;

function toRawType(value) {
    return _toString.call(value).slice(8, -1);
}

function isUndef(v) {
    return v === undefined || v === null;
}

function toString(val) {
    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

function extend(to, _from) {
    for (var key in _from) {
        to[key] = _from[key];
    }
    return to;
}

function debounce(fn, wait) {
    var timeout = null;
    return function () {
        var _this = this;

        for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
            arg[_key] = arguments[_key];
        }

        if (timeout !== null) clearTimeout(timeout);
        timeout = setTimeout(function () {
            _newArrowCheck(this, _this);

            return fn.apply(undefined, arg);
        }.bind(this), wait);
    };
}

function isDate(arg) {
    return _toString.call(arg) === '[object Date]';
}

function isPlainObject(arg) {
    return _toString.call(arg) === '[object Object]';
}

function isFunction(arg) {
    return _toString.call(arg) === '[object Function]';
}

function isString(arg) {
    return _toString.call(arg) === '[object String]';
}

function isBool(arg) {
    return _toString.call(arg) === '[object Boolean]';
}

function toLine(name) {
    var line = name.replace(/([A-Z])/g, '-$1').toLowerCase();
    if (line.indexOf('-') === 0) line = line.substr(1);
    return line;
}

function isNumeric(n) {
    return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
}

function toArray(a) {
    return Array.isArray(a) ? a : [a];
}

function ATS(a) {
    return Array.isArray(a) ? a[0] || '' : a;
}

function isElement(arg) {
    return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg);
}

function deepExtend(origin) {
    var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var isArr = false;
    for (var key in target) {
        if (Object.prototype.hasOwnProperty.call(target, key)) {
            var clone = target[key];
            if ((isArr = Array.isArray(clone)) || isPlainObject(clone)) {
                var nst = origin[key] === undefined;
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
}

var id = 0;

function uniqueId() {
    return ++id;
}

function dateFormat(fmt) {
    var date = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Date();

    var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    }return fmt;
}

function errMsg() {

    return '\n\x67\x69\x74\x68\x75\x62\x3a\x68\x74\x74\x70' + '\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f' + '\x6d\x2f\x78\x61\x62\x6f\x79\x2f\x66\x6f\x72\x6d\x2d' + '\x63\x72\x65\x61\x74\x65\n\x64\x6f\x63\x75\x6d\x65' + '\x6e\x74\x3a\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77' + '\x2e\x66\x6f\x72\x6d\x2d\x63\x72\x65\x61\x74\x65\x2e' + '\x63\x6f\x6d';
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.baseRule = baseRule;
exports.creatorFactory = creatorFactory;
exports.creatorTypeFactory = creatorTypeFactory;

var _util = __webpack_require__(2);

var _vData = __webpack_require__(6);

var _vData2 = _interopRequireDefault(_vData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function baseRule() {
    return {
        event: {},
        validate: [],
        options: [],
        col: {},
        children: [],
        emit: [],
        template: null,
        emitPrefix: null
    };
}

function creatorFactory(name) {
    var _this = this;

    return function (title, field, value) {
        var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _newArrowCheck(this, _this);

        return new Creator(name, title, field, value, props);
    }.bind(this);
}

function creatorTypeFactory(name, type) {
    var _this2 = this;

    var typeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'type';

    return function (title, field, value) {
        var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        _newArrowCheck(this, _this2);

        var maker = new Creator(name, title, field, value, props);
        if ((0, _util.isFunction)(type)) type(maker);else maker.props(typeName, type);
        return maker;
    }.bind(this);
}

var Creator = function (_VData) {
    _inherits(Creator, _VData);

    function Creator(type, title, field, value) {
        var props = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

        _classCallCheck(this, Creator);

        var _this3 = _possibleConstructorReturn(this, (Creator.__proto__ || Object.getPrototypeOf(Creator)).call(this));

        _this3.rule = (0, _util.extend)(baseRule(), { type: type, title: title, field: field, value: value });
        _this3.props({ hidden: false, visibility: false });
        if ((0, _util.isPlainObject)(props)) _this3.props(props);
        return _this3;
    }

    _createClass(Creator, [{
        key: "type",
        value: function type(_type) {
            this.props('type', _type);
            return this;
        }
    }, {
        key: "get",
        value: function get() {
            return this._data;
        }
    }, {
        key: "getRule",
        value: function getRule() {
            return (0, _util.extend)(this.rule, this.get());
        }
    }, {
        key: "setValue",
        value: function setValue(value) {
            this.rule.value = value;
            return this;
        }
    }, {
        key: "emitPrefix",
        value: function emitPrefix(prefix) {
            this.rule.emitPrefix = prefix;
            return this;
        }
    }]);

    return Creator;
}(_vData2.default);

exports.default = Creator;


var objAttrs = ['event', 'col'];

objAttrs.forEach(function (attr) {
    _newArrowCheck(undefined, undefined);

    Creator.prototype[attr] = function (opt) {
        this.rule[attr] = (0, _util.extend)(this.rule[attr], opt);
        return this;
    };
}.bind(undefined));

var arrAttrs = ['validate', 'options', 'children', 'emit'];

arrAttrs.forEach(function (attr) {
    _newArrowCheck(undefined, undefined);

    Creator.prototype[attr] = function (opt) {
        if (!Array.isArray(opt)) opt = [opt];
        this.rule[attr] = this.rule[attr].concat(opt);
        return this;
    };
}.bind(undefined));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.componentCommon = exports.getGlobalApi = exports.formCreateStyle = exports.iviewConfig = exports.iview3 = exports.iview2 = undefined;
exports.getComponent = getComponent;
exports.getUdfComponent = getUdfComponent;
exports.getConfig = getConfig;
exports.timeStampToDate = timeStampToDate;

var _util = __webpack_require__(2);

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _componentList = __webpack_require__(9);

var _componentList2 = _interopRequireDefault(_componentList);

var _iview = __webpack_require__(11);

var _iview2 = _interopRequireDefault(_iview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var iview2 = exports.iview2 = {
    _v: 2,
    resetBtnType: 'ghost',
    resetBtnIcon: 'refresh',
    submitBtnIcon: 'ios-upload',
    fileIcon: 'document-text',
    fileUpIcon: 'folder',
    imgUpIcon: 'camera'
};

var iview3 = exports.iview3 = {
    _v: 3,
    resetBtnType: 'default',
    resetBtnIcon: 'md-refresh',
    submitBtnIcon: 'ios-share',
    fileIcon: 'md-document',
    fileUpIcon: 'ios-folder-open',
    imgUpIcon: 'md-images'
};

var iviewConfig = exports.iviewConfig = function () {
    if (typeof _iview2.default === 'undefined') return iview2;
    return _iview2.default.version && _iview2.default.version.split('.')[0] == 3 ? iview3 : iview2;
}();

function getComponent(vm, rule, createOptions) {
    var name = (0, _util.toString)(rule.type).toLowerCase(),
        component = _componentList2.default[name] === undefined ? getUdfComponent() : _componentList2.default[name];

    var $h = new component.handler(vm, rule);
    $h.render = new component.render(vm, $h, createOptions);
    $h.noValue = component.noValue;
    return $h;
};

function getUdfComponent() {
    return {
        handler: _handler2.default,
        render: _render2.default,
        noValue: true
    };
}

function getConfig() {
    var _this = this;

    return {
        el: null,
        iframeHelper: false,
        switchMaker: true,
        form: {
            inline: false,
            labelPosition: 'right',
            labelWidth: 125,
            showMessage: true,
            autocomplete: 'off'
        },
        row: {
            gutter: 0,
            type: undefined,
            align: undefined,
            justify: undefined,
            className: undefined
        },
        upload: {
            beforeUpload: function beforeUpload() {
                _newArrowCheck(this, _this);
            }.bind(this),
            onProgress: function onProgress(event, file, fileList) {
                _newArrowCheck(this, _this);
            }.bind(this),
            onSuccess: function onSuccess(response, file, fileList) {
                _newArrowCheck(this, _this);
            }.bind(this),
            onError: function onError(error, file, fileList) {
                _newArrowCheck(this, _this);
            }.bind(this),
            onPreview: function onPreview(file) {
                _newArrowCheck(this, _this);
            }.bind(this),
            onRemove: function onRemove(file, fileList) {
                _newArrowCheck(this, _this);
            }.bind(this),
            onFormatError: function onFormatError(file, fileList) {
                _newArrowCheck(this, _this);
            }.bind(this),
            onExceededSize: function onExceededSize(file, fileList) {
                _newArrowCheck(this, _this);
            }.bind(this),
            handleIcon: 'ios-eye-outline',
            allowRemove: true
        },
        onSubmit: function onSubmit(formData) {
            _newArrowCheck(this, _this);
        }.bind(this),
        submitBtn: {
            type: "primary",
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: iviewConfig.submitBtnIcon,
            innerText: "提交",
            loading: false,
            show: true,
            col: undefined
        },
        resetBtn: {
            type: iviewConfig.resetBtnType,
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: iviewConfig.resetBtnIcon,
            innerText: "重置",
            loading: false,
            show: false,
            col: undefined
        },
        mounted: function mounted() {
            _newArrowCheck(this, _this);
        }.bind(this)
    };
};

var formCreateStyle = exports.formCreateStyle = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' + ' .fc-files>.ivu-icon{vertical-align: middle;}' + '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' + '.fc-upload .ivu-upload{display: inline-block;}' + '.fc-upload-btn{border: 1px dashed #c0ccda;}' + '.fc-upload-btn>ivu-icon{vertical-align:sub;}' + '.fc-upload .fc-upload-cover{opacity: 0; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); transition: opacity .3s;}' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-files:hover .fc-upload-cover{opacity: 1; }' + '.fc-upload .ivu-upload-list-file{ display: inline-block;float: left; }' + '.fc-upload .ivu-upload-list{ position: absolute;left: 0; }' + '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

function getGlobalApi(fComponent) {
    var _this2 = this,
        _this9 = this;

    var vm = fComponent.vm;
    return {
        formData: function formData() {
            _newArrowCheck(this, _this2);

            return Object.keys(vm.trueData).reduce(function (initial, key) {
                _newArrowCheck(this, _this2);

                initial[key] = vm.trueData[key].value;
                return initial;
            }.bind(this), {});
        }.bind(this),
        getValue: function getValue(field) {
            _newArrowCheck(this, _this2);

            field = (0, _util.toString)(field);
            var handler = fComponent.handlers[field];
            if (handler === undefined) throw new Error(String(field) + ' \u5B57\u6BB5\u4E0D\u5B58\u5728!' + (0, _util.errMsg)());else {
                return handler.getValue();
            }
        }.bind(this),
        changeField: function changeField(field, value) {
            _newArrowCheck(this, _this2);

            field = (0, _util.toString)(field);
            var handler = fComponent.handlers[field];
            if (handler === undefined) throw new Error(String(field) + ' \u5B57\u6BB5\u4E0D\u5B58\u5728!' + (0, _util.errMsg)());else {
                if ((0, _util.isFunction)(value)) value(vm.getTrueData(field), function (changeValue) {
                    _newArrowCheck(this, _this2);

                    this.changeField(field, changeValue);
                }.bind(this));else {
                    handler.setTrueValue(value);
                    handler.render.sync();
                }
            }
        }.bind(this),
        removeField: function removeField(field) {
            _newArrowCheck(this, _this2);

            fComponent.removeField((0, _util.toString)(field));
            vm.sync();
        }.bind(this),
        validate: function validate(successFn, errorFn) {
            _newArrowCheck(this, _this2);

            fComponent.getFormRef().validate(function (valid) {
                _newArrowCheck(this, _this2);

                valid === true ? successFn && successFn() : errorFn && errorFn();
            }.bind(this));
        }.bind(this),
        validateField: function validateField(field, callback) {
            _newArrowCheck(this, _this2);

            if (fComponent.notField(field)) throw new Error(String(field) + '\u5B57\u6BB5\u4E0D\u5B58\u5728' + (0, _util.errMsg)());
            fComponent.getFormRef().validateField(field, callback);
        }.bind(this),
        resetFields: function resetFields() {
            var _this3 = this;

            var handlers = fComponent.handlers;
            Object.keys(vm.trueData).forEach(function (key) {
                _newArrowCheck(this, _this3);

                vm.$set(vm.trueData[key], 'value', handlers[key].defaultValue);
            }.bind(this));
        },
        destroy: function destroy() {
            _newArrowCheck(this, _this2);

            vm.$el.parentNode.removeChild(vm.$el);
            vm.$destroy();
        }.bind(this),
        fields: function fields() {
            _newArrowCheck(this, _this2);

            return fComponent.fields();
        }.bind(this),
        append: function append(rule, after) {
            _newArrowCheck(this, _this2);

            fComponent.append(rule, after, false);
        }.bind(this),
        prepend: function prepend(rule, after) {
            _newArrowCheck(this, _this2);

            fComponent.append(rule, after, true);
        }.bind(this),
        submit: function submit(successFn, failFn) {
            var _this4 = this;

            this.validate(function () {
                _newArrowCheck(this, _this4);

                var formData = this.formData();
                if ((0, _util.isFunction)(successFn)) successFn(formData);else fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
            }.bind(this), function () {
                _newArrowCheck(this, _this4);

                return failFn && failFn();
            }.bind(this));
        },
        hidden: function hidden(fields) {
            var _this5 = this;

            var hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!Array.isArray(fields)) fields = [fields];
            fields.forEach(function (field) {
                _newArrowCheck(this, _this5);

                vm.$set(vm.trueData[field].rule.props, 'hidden', !!hidden);
            }.bind(this));
        },
        visibility: function visibility(fields) {
            var _this6 = this;

            var visibility = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!Array.isArray(fields)) fields = [fields];
            fields.forEach(function (field) {
                _newArrowCheck(this, _this6);

                vm.$set(vm.trueData[field].rule.props, 'visibility', !!visibility);
            }.bind(this));
        },
        model: function model(fields) {
            var _this7 = this;

            var model = {};
            if (!fields) fields = this.fields();else if (!Array.isArray(fields)) fields = [fields];
            fields.forEach(function (field) {
                _newArrowCheck(this, _this7);

                var handler = fComponent.handlers[field];
                if (!handler) throw new Error(String(field) + '\u5B57\u6BB5\u4E0D\u5B58\u5728' + (0, _util.errMsg)());
                model[field] = handler.vm.getTrueData(field);
            }.bind(this));
            return model;
        },
        bind: function bind(fields) {
            var _this8 = this;

            var bind = {},
                properties = {},
                vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!Array.isArray(fields)) fields = [fields];
            fields.forEach(function (field) {
                _newArrowCheck(this, _this8);

                var rule = vm.trueData[field];
                properties[field] = {
                    get: function get() {
                        return rule.value;
                    },
                    set: function set(value) {
                        rule.value = value;
                    },

                    enumerable: true,
                    configurable: true
                };
            }.bind(this));
            Object.defineProperties(bind, properties);
            return bind;
        },

        submitStatus: function submitStatus() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _newArrowCheck(this, _this2);

            vm.changeButtonProps(props);
        }.bind(this),
        resetStatus: function resetStatus() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            _newArrowCheck(this, _this2);

            vm.changeResetProps(props);
        }.bind(this),
        btn: {
            loading: function loading() {
                var _loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                _newArrowCheck(this, _this9);

                vm.changeButtonProps({ loading: _loading });
            }.bind(this),
            finish: function finish() {
                this.loading(false);
            },
            disabled: function disabled() {
                var _disabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                _newArrowCheck(this, _this9);

                vm.changeButtonProps({ disabled: _disabled });
            }.bind(this)
        },
        resetBtn: {
            loading: function loading() {
                var _loading2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                _newArrowCheck(this, _this9);

                vm.changeResetProps({ loading: _loading2 });
            }.bind(this),
            finish: function finish() {
                this.loading(false);
            },
            disabled: function disabled() {
                var _disabled2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                _newArrowCheck(this, _this9);

                vm.changeResetProps({ disabled: _disabled2 });
            }.bind(this)
        },
        closeModal: function closeModal() {
            _newArrowCheck(this, _this9);

            vm.$Modal.remove();
        }.bind(this),
        set: function set(node, field, value) {
            _newArrowCheck(this, _this9);

            vm.$set(node, field, value);
        }.bind(this),
        reload: function reload(rules) {
            _newArrowCheck(this, _this9);

            return fComponent.reload(rules);
        }.bind(this),
        options: function options(_options) {
            _newArrowCheck(this, _this9);

            (0, _util.deepExtend)(fComponent.options, _options);
            vm.sync();
        }.bind(this),
        onSuccess: function onSuccess(fn) {
            this.options({ onSubmit: fn });
        },

        sync: function sync(field, callback) {
            _newArrowCheck(this, _this9);

            if (fComponent.handlers[field]) fComponent.handlers[field].render.sync(callback);else throw new Error(String(field) + '\u5B57\u6BB5\u4E0D\u5B58\u5728' + (0, _util.errMsg)());
        }.bind(this),
        refresh: function refresh() {
            _newArrowCheck(this, _this9);

            vm.refresh();
        }.bind(this)
        // vm: fComponent,
    };
}

exports.getGlobalApi = getGlobalApi;
function timeStampToDate(timeStamp) {
    if ((0, _util.isDate)(timeStamp)) return timeStamp;else {
        var date = new Date(timeStamp);
        return date.toString() === 'Invalid Date' ? timeStamp : date;
    }
}

var componentCommon = exports.componentCommon = {
    data: function data() {
        _newArrowCheck(undefined, undefined);

        return {
            rules: {},
            cptData: {},
            buttonProps: {},
            resetProps: {},
            trueData: {},
            jsonData: {},
            $f: {},
            isShow: true,
            watchs: [],
            unique: 1,
            other: {}
        };
    }.bind(undefined),
    methods: {
        changeFormData: function changeFormData(field, value) {
            if (Object.keys(this.cptData).indexOf(field) !== -1) this.$set(this.cptData, field, value);
        },
        changeTrueData: function changeTrueData(field, value) {
            this.$set(this.trueData[field], 'value', value);
        },
        getTrueDataValue: function getTrueDataValue(field) {
            return this.trueData[field] === undefined ? undefined : this.trueData[field].value;
        },
        getTrueData: function getTrueData(field) {
            return this.trueData[field];
        },
        getFormData: function getFormData(field) {
            return this.cptData[field];
        },
        removeFormData: function removeFormData(field) {
            delete this.cptData[field];
            delete this.trueData[field];
            delete this.jsonData[field];
            // this.$delete(this.cptData, field);
            // this.$delete(this.trueData, field);
            // this.$delete(this.jsonData, field);
        },
        changeButtonProps: function changeButtonProps(props) {
            this.$set(this, 'buttonProps', (0, _util.deepExtend)(this.buttonProps, props));
        },
        changeResetProps: function changeResetProps(props) {
            this.$set(this, 'resetProps', (0, _util.deepExtend)(this.resetProps, props));
        },
        setField: function setField(field) {
            this.$set(this.cptData, field, '');
            this.$set(this.trueData, field, {});
        },
        init: function init() {
            var _this10 = this;

            var type = this.fComponent._type;
            this[type].forEach(function (rule, index) {
                _newArrowCheck(this, _this10);

                var unWatch = this.$watch(String(type) + '.' + String(index) + '.value', function (n) {
                    _newArrowCheck(this, _this10);

                    if (this.trueData[rule.field] === undefined) return unWatch();
                    this.$set(this.trueData[rule.field], 'value', n);
                }.bind(this));
                this.watchs.push(unWatch);
            }.bind(this));
        },
        unWatch: function unWatch() {
            var _this11 = this;

            this.watchs.forEach(function (unWatch) {
                _newArrowCheck(this, _this11);

                return unWatch();
            }.bind(this));
            this.watchs = [];
        },
        refresh: function refresh() {
            this.unique += 1;
        },
        sync: function sync() {
            // if (!this._sync)
            //     this._sync = debounce(() => {
            //         this.$nextTick(() => {
            //             this.fComponent.fRender.cacheUnique = this.unique + 1;
            //             this.unique += 1;
            //         });
            //     }, 50);
            // this._sync();

            this.fComponent.fRender.cacheUnique = this.unique + 1;
            this.unique += 1;
        }
    }
};

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.defVData = defVData;

var _util = __webpack_require__(2);

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function defVData() {
    return {
        class: {},
        style: {},
        attrs: {},
        props: {},
        domProps: {},
        on: {},
        nativeOn: {},
        directives: [],
        scopedSlots: {},
        slot: undefined,
        key: undefined,
        ref: undefined
    };
}

var VData = function () {
    function VData() {
        _classCallCheck(this, VData);

        this.init();
    }

    _createClass(VData, [{
        key: 'class',
        value: function _class(classList) {
            var _this = this;

            var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if ((0, _util.isUndef)(classList)) return this;

            if (Array.isArray(classList)) {
                classList.map(function (cls) {
                    _newArrowCheck(this, _this);

                    this._data.class[(0, _util.toString)(cls)] = true;
                }.bind(this));
            } else if ((0, _util.isPlainObject)(classList)) {
                this._data.class = (0, _util.extend)(this._data.class, classList);
            } else {
                this._data.class[(0, _util.toString)(classList)] = status === undefined ? true : status;
            }

            return this;
        }
    }, {
        key: 'directives',
        value: function directives(_directives) {
            if ((0, _util.isUndef)(_directives)) return this;

            this._data.directives = this._data.directives.concat((0, _util.toArray)(_directives));

            return this;
        }
    }, {
        key: 'init',
        value: function init() {
            this._data = defVData();
            return this;
        }
    }, {
        key: 'get',
        value: function get() {
            this._prev = this._data;
            this.init();
            return this._prev;
        }
    }]);

    return VData;
}();

exports.default = VData;


var keyList = ['ref', 'key', 'slot'];
var objList = ['scopedSlots', 'nativeOn', 'on', 'domProps', 'props', 'attrs', 'style'];

keyList.forEach(function (key) {
    _newArrowCheck(undefined, undefined);

    VData.prototype[key] = function (val) {
        this._data[key] = val;
        return this;
    };
}.bind(undefined));

objList.forEach(function (key) {
    _newArrowCheck(undefined, undefined);

    VData.prototype[key] = function (obj, val) {
        if ((0, _util.isUndef)(obj)) return this;

        if ((0, _util.isPlainObject)(obj)) {
            this._data[key] = (0, _util.extend)(this._data[key], obj);
        } else {
            this._data[key][(0, _util.toString)(obj)] = val;
        }

        return this;
    };
}.bind(undefined));

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.margeGlobal = margeGlobal;
exports.getRule = getRule;
exports.initStyle = initStyle;

var _util = __webpack_require__(2);

var _common = __webpack_require__(4);

var _form = __webpack_require__(30);

var _form2 = _interopRequireDefault(_form);

var _formCreateComponent = __webpack_require__(31);

var _formCreateComponent2 = _interopRequireDefault(_formCreateComponent);

var _component = __webpack_require__(12);

var _maker = __webpack_require__(32);

var _maker2 = _interopRequireDefault(_maker);

var _vue2 = __webpack_require__(5);

var _vue3 = _interopRequireDefault(_vue2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var version = '1.5.2';

var formCreateStyleElId = 'form-create-style';

function margeGlobal(_options) {
    if ((0, _util.isBool)(_options.sumbitBtn)) _options.sumbitBtn = { show: _options.sumbitBtn };
    if ((0, _util.isBool)(_options.resetBtn)) _options.resetBtn = { show: _options.resetBtn };
    var options = (0, _util.deepExtend)((0, _common.getConfig)(), _options);
    options.el = !options.el ? window.document.body : (0, _util.isElement)(options.el) ? options.el : document.querySelector(options.el);

    return options;
}

function getRule(rule) {
    if ((0, _util.isFunction)(rule.getRule)) return rule.getRule();else return rule;
}

function initStyle() {
    if (document.getElementById(formCreateStyleElId) !== null) return;
    var style = document.createElement('style');
    style.id = formCreateStyleElId;
    style.innerText = _common.formCreateStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
}

var FormCreate = function () {
    function FormCreate(rules) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, FormCreate);

        this.options = margeGlobal(options);
        this.rules = Array.isArray(rules) ? rules : [];

        this.handlers = {};
        this.fRender = {};
        this.formData = {};
        this.validate = {};
        this.trueData = {};
        this.fieldList = [];
        this.switchMaker = this.options.switchMaker;

        initStyle();
    }

    _createClass(FormCreate, [{
        key: "init",
        value: function init(vm) {
            var _this = this;

            this.vm = vm;
            this.createHandler();
            this.fCreateApi = (0, _common.getGlobalApi)(this);
            vm.$set(vm, 'cptData', this.formData);
            vm.$set(vm, 'trueData', this.trueData);
            vm.$set(vm, 'buttonProps', this.options.submitBtn);
            vm.$set(vm, 'resetProps', this.options.resetBtn);
            vm.$set(vm, 'rules', this.rules);
            this.fRender = new _form2.default(this);

            this.$tick = (0, _util.debounce)(function (fn) {
                _newArrowCheck(this, _this);

                return (0, _util.$nt)(fn);
            }.bind(this), 100);
        }
    }, {
        key: "setHandler",
        value: function setHandler(handler) {
            var rule = handler.rule,
                field = handler.field;
            this.handlers[field] = handler;
            if (handler.noValue === true) return;
            this.formData[field] = handler.parseValue;
            this.validate[field] = rule.validate;
            this.trueData[field] = {
                value: handler.rule.value,
                rule: handler.rule
            };
        }
    }, {
        key: "notField",
        value: function notField(field) {
            return this.fieldList.indexOf(field) === -1;
        }
    }, {
        key: "createHandler",
        value: function createHandler() {
            var _this2 = this;

            this.rules.forEach(function (rule, index) {
                _newArrowCheck(this, _this2);

                rule = getRule(rule);
                if (this.switchMaker) this.rules[index] = rule;
                rule.field = rule.field === undefined ? '' : (0, _util.toString)(rule.field);
                if (this.notField(rule.field)) {
                    var handler = (0, _common.getComponent)(this.vm, rule, this.options);
                    this.createChildren(handler);
                    this.setHandler(handler);
                    this.fieldList.push(handler.field);
                } else {
                    console.error(String(rule.field) + " \u5B57\u6BB5\u5DF2\u5B58\u5728" + (0, _util.errMsg)());
                }
            }.bind(this));
        }
    }, {
        key: "createChildren",
        value: function createChildren(handler) {
            var _this3 = this;

            if (Array.isArray(handler.rule.children) && handler.rule.children.length > 0) {
                handler.rule.children.map(function (rule, index) {
                    _newArrowCheck(this, _this3);

                    rule = getRule(rule);
                    if (this.switchMaker) handler.rule.children[index] = rule;
                    rule.field = rule.field === undefined ? '' : (0, _util.toString)(rule.field);
                    if (this.notField(rule.field)) {
                        var _handler = (0, _common.getComponent)(this.vm, rule, this.options);
                        this.createChildren(_handler);
                        handler.childrenHandlers.push(_handler);
                    } else {
                        console.error(String(rule.field) + " \u5B57\u6BB5\u5DF2\u5B58\u5728" + (0, _util.errMsg)());
                    }
                }.bind(this));
            }
        }
    }, {
        key: "create",
        value: function create(Vue) {
            var $fCreate = Vue.extend(this.component()),
                $vm = new $fCreate().$mount();
            this.options.el.appendChild($vm.$el);
            return $vm;
        }
    }, {
        key: "mounted",
        value: function mounted(vm) {
            var _this4 = this;

            this.vm = vm;
            (0, _util.$nt)(function () {
                _newArrowCheck(this, _this4);

                Object.keys(this.handlers).map(function (field) {
                    _newArrowCheck(this, _this4);

                    var handler = this.handlers[field];
                    if (vm.cptData[field] !== undefined) this.addHandlerWatch(handler);
                    handler.mounted();
                }.bind(this));
                this.options.mounted && this.options.mounted(this.fCreateApi);
            }.bind(this));
        }
    }, {
        key: "component",
        value: function component() {
            return (0, _formCreateComponent2.default)(this);
        }
    }, {
        key: "append",
        value: function append(rule, after, pre) {
            var _this5 = this;

            if ((0, _util.isFunction)(rule.getRule)) rule = rule.getRule();
            if (Object.keys(this.handlers).indexOf((0, _util.toString)(rule.field)) !== -1) throw new Error(String(rule.field) + "\u5B57\u6BB5\u5DF2\u5B58\u5728" + (0, _util.errMsg)());
            var handler = (0, _common.getComponent)(this.vm, rule, this.options);
            this.createChildren(handler);
            this.vm.setField(handler.field);
            this.fRender.setRender(handler, after || '', pre);
            this.setHandler(handler);
            this.addHandlerWatch(handler);
            handler.render.sync(function () {
                _newArrowCheck(this, _this5);

                handler.mounted();
            }.bind(this));
        }
    }, {
        key: "removeField",
        value: function removeField(field) {
            var _this6 = this;

            if (this.handlers[field] === undefined) throw new Error(String(field) + "\u5B57\u6BB5\u4E0D\u5B58\u5728" + (0, _util.errMsg)());
            var watch = this.handlers[field].watch;

            delete this.handlers[field];
            delete this.validate[field];
            watch && watch.forEach(function (unWatch) {
                _newArrowCheck(this, _this6);

                return unWatch();
            }.bind(this));
            this.vm.removeFormData(field);
            this.fRender.removeRender(field);
            delete this.formData[field];
            delete this.trueData[field];
        }
    }, {
        key: "addHandlerWatch",
        value: function addHandlerWatch(handler) {
            var _this7 = this;

            if (handler.noValue === true) return;
            var field = handler.field;

            var unWatch = this.vm.$watch("cptData." + String(field), function (n, o) {
                _newArrowCheck(this, _this7);

                if (this.handlers[field] !== undefined) {
                    var trueValue = handler.toTrueValue(n),
                        json = JSON.stringify(trueValue);
                    if (this.vm.jsonData[field] !== json) {
                        this.vm.jsonData[field] = json;
                        handler.setTrueValue(trueValue);
                        handler.watchParseValue(n);
                    }
                } else unWatch();
            }.bind(this), { deep: true });

            var unWatch2 = this.vm.$watch("trueData." + String(field) + ".value", function (n, o) {
                _newArrowCheck(this, _this7);

                if (n === undefined) return;
                if (this.handlers[field] !== undefined) {
                    var json = JSON.stringify(n);
                    if (this.vm.jsonData[field] !== json) {
                        this.vm.jsonData[field] = json;
                        handler.watchTrueValue(n);
                        (0, _util.$nt)(function () {
                            _newArrowCheck(this, _this7);

                            return handler.render.sync();
                        }.bind(this));
                    }
                } else unWatch2();
            }.bind(this), { deep: true });

            handler.watch.push(unWatch, unWatch2);

            var bind = (0, _util.debounce)(function (n, o) {
                _newArrowCheck(this, _this7);

                if (this.handlers[field] !== undefined) {
                    this.$tick(function () {
                        _newArrowCheck(this, _this7);

                        return handler.render.sync();
                    }.bind(this));
                } else unWatch();
            }.bind(this), 100);

            Object.keys(this.vm.trueData[field].rule).map(function (key) {
                _newArrowCheck(this, _this7);

                if (key === 'value') return;
                handler.watch.push(this.vm.$watch("trueData." + String(field) + ".rule." + String(key), bind, { deep: true }));
            }.bind(this));
        }
    }, {
        key: "reload",
        value: function reload(rules) {
            var _this8 = this;

            if (!rules) {
                this.vm.refresh();
            } else {
                this.vm.unWatch();
                Object.keys(this.handlers).forEach(function (field) {
                    _newArrowCheck(this, _this8);

                    return this.removeField(field);
                }.bind(this));
                this.vm.isShow = false;
                this.constructor(rules, this.options);
                this.init(this.vm);
                this.vm.init();
                (0, _util.$nt)(function () {
                    _newArrowCheck(this, _this8);

                    this.vm.isShow = true;
                    setTimeout(function () {
                        _newArrowCheck(this, _this8);

                        return this.mounted(this.vm);
                    }.bind(this));
                }.bind(this));
            }
            return this.vm.$f = this.fCreateApi;
        }
    }, {
        key: "getFormRef",
        value: function getFormRef() {
            return this.vm.$refs[this.fRender.refName];
        }
    }, {
        key: "fields",
        value: function fields() {
            return Object.keys(this.formData);
        }
    }], [{
        key: "create",
        value: function create(rules) {
            var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _vue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : _vue3.default;

            var opt = (0, _util.isElement)(_opt) ? { el: _opt } : _opt;
            var fComponent = new FormCreate(rules, opt),
                $vm = fComponent.create(_vue);
            return fComponent.fCreateApi;
        }
    }, {
        key: "install",
        value: function install(Vue) {
            Vue.prototype.$formCreate = function (rules) {
                var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                return FormCreate.create(rules, opt, Vue);
            };

            Vue.prototype.$formCreate.version = version;
            Vue.prototype.$formCreate.maker = _maker2.default;
            Vue.component(_component.formCreateName, (0, _component.$FormCreate)());
        }
    }]);

    return FormCreate;
}();

exports.default = FormCreate;


FormCreate.maker = _maker2.default;
FormCreate.version = version;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.parseVData = parseVData;
exports.getVNode = getVNode;

var _util = __webpack_require__(2);

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function parseVData(data) {
    if ((0, _util.isString)(data)) data = { domProps: { innerHTML: data } };else if (data && (0, _util.isFunction)(data.get)) data = data.get();

    return data;
}

function getVNode(VNode) {
    return (0, _util.isFunction)(VNode) ? VNode() : VNode || [];
}

var VNode = function () {
    function VNode(vm) {
        _classCallCheck(this, VNode);

        this.setVm(vm);
    }

    _createClass(VNode, [{
        key: 'setVm',
        value: function setVm(vm) {
            this.vm = vm;
            this.$h = vm.$createElement;
        }
    }, {
        key: 'make',
        value: function make(nodeName, data, VNodeFn) {
            if ((0, _util.isString)(data)) data = { domProps: { innerHTML: data } };
            var Node = this.$h(nodeName, parseVData(data), getVNode(VNodeFn));
            Node.context = this.vm;

            return Node;
        }
    }]);

    return VNode;
}();

exports.default = VNode;


var nodes = {
    modal: 'Modal',
    progress: 'i-progress',
    button: 'i-button',
    icon: 'Icon',
    span: 'span',
    slider: 'Slider',
    rate: 'Rate',
    upload: 'Upload',
    cascader: 'Cascader',
    colorPicker: 'Color-Picker',
    timePicker: 'Time-Picker',
    datePicker: 'Date-Picker',
    'switch': 'i-switch',
    option: 'i-option',
    select: 'i-select',
    checkbox: 'Checkbox',
    checkboxGroup: 'Checkbox-Group',
    radio: 'Radio',
    radioGroup: 'Radio-Group',
    inputNumber: 'Input-Number',
    input: 'i-input',
    formItem: 'Form-Item',
    form: 'i-form',
    col: 'i-col',
    row: 'row',
    tree: 'Tree',
    AutoComplete: 'AutoComplete'
};

Object.keys(nodes).forEach(function (k) {
    _newArrowCheck(undefined, undefined);

    VNode.prototype[k] = function (data, VNodeFn) {
        return this.make(nodes[k], data, VNodeFn);
    };
}.bind(undefined));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hidden = __webpack_require__(14);

var _hidden2 = _interopRequireDefault(_hidden);

var _input = __webpack_require__(15);

var _input2 = _interopRequireDefault(_input);

var _radio = __webpack_require__(16);

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = __webpack_require__(17);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _switch = __webpack_require__(18);

var _switch2 = _interopRequireDefault(_switch);

var _select = __webpack_require__(19);

var _select2 = _interopRequireDefault(_select);

var _datePicker = __webpack_require__(20);

var _datePicker2 = _interopRequireDefault(_datePicker);

var _timePicker = __webpack_require__(21);

var _timePicker2 = _interopRequireDefault(_timePicker);

var _inputNumber = __webpack_require__(22);

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _colorPicker = __webpack_require__(23);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _upload = __webpack_require__(10);

var _upload2 = _interopRequireDefault(_upload);

var _cascader = __webpack_require__(24);

var _cascader2 = _interopRequireDefault(_cascader);

var _rate = __webpack_require__(25);

var _rate2 = _interopRequireDefault(_rate);

var _slider = __webpack_require__(26);

var _slider2 = _interopRequireDefault(_slider);

var _frame = __webpack_require__(27);

var _frame2 = _interopRequireDefault(_frame);

var _tree = __webpack_require__(28);

var _tree2 = _interopRequireDefault(_tree);

var _autoComplete = __webpack_require__(29);

var _autoComplete2 = _interopRequireDefault(_autoComplete);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var componentList = {
    hidden: _hidden2.default,
    input: _input2.default,
    radio: _radio2.default,
    checkbox: _checkbox2.default,
    switch: _switch2.default,
    select: _select2.default,
    datepicker: _datePicker2.default,
    timepicker: _timePicker2.default,
    inputnumber: _inputNumber2.default,
    colorpicker: _colorPicker2.default,
    upload: _upload2.default,
    cascader: _cascader2.default,
    rate: _rate2.default,
    slider: _slider2.default,
    frame: _frame2.default,
    tree: _tree2.default,
    autocomplete: _autoComplete2.default
};

exports.default = componentList;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.getFileName = getFileName;
exports.parseValue = parseValue;

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(2);

var _common = __webpack_require__(4);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "upload";

function getFileName(pic) {
    var res = (0, _util.toString)(pic).split('/'),
        file = res[res.length - 1],
        index = file.indexOf('.');
    return index === -1 ? file : file.substr(0, index);
}

function parseValue(value) {
    return Array.isArray(value) ? value : !value ? [] : [value];
}

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            var props = this.rule.props;
            props.defaultFileList = [];
            props.showUploadList = false;
            props.uploadType = !props.uploadType ? 'file' : props.uploadType;
            if (props.maxLength === undefined) props.maxLength = 0;
            if (props.action === undefined) props.action = '';
            if (props.uploadType === 'file' && props.handleIcon === undefined) props.handleIcon = false;
            this.parseValue = [];
            this.rule.value = parseValue(this.rule.value);
        }
    }, {
        key: "toParseValue",
        value: function toParseValue(value) {
            var _this2 = this;

            var files = parseValue(value);
            this.parseValue.splice(0, this.parseValue.length);
            files.forEach(function (file) {
                _newArrowCheck(this, _this2);

                return this.push(file);
            }.bind(this));
            this.rule.props.defaultFileList = this.parseValue;
            return this.parseValue;
        }
    }, {
        key: "mounted",
        value: function mounted() {
            _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "mounted", this).call(this);
            // this.el.fileList = this.parseValue;
            this.rule.props.defaultFileList = this.parseValue;
            this.changeParseValue(this.el.fileList);
        }
    }, {
        key: "push",
        value: function push(file) {
            this.parseValue.push({
                url: file,
                name: getFileName(file)
            });
        }
    }, {
        key: "toTrueValue",
        value: function toTrueValue(parseValue) {
            var _this3 = this;

            if (!parseValue) return [];
            var files = parseValue.map(function (file) {
                _newArrowCheck(this, _this3);

                return file.url;
            }.bind(this)).filter(function (file) {
                _newArrowCheck(this, _this3);

                return file !== undefined;
            }.bind(this));
            return this.rule.props.maxLength === 1 ? files[0] || '' : files;
        }
    }, {
        key: "changeParseValue",
        value: function changeParseValue(parseValue) {
            this.parseValue = parseValue;
            this.vm.changeFormData(this.field, parseValue);
        }

        // watchParseValue(n){
        //
        // }

    }, {
        key: "watchTrueValue",
        value: function watchTrueValue(n) {
            var _this4 = this;

            var b = true;
            this.rule.props.defaultFileList.forEach(function (pic) {
                _newArrowCheck(this, _this4);

                b = b && (pic.percentage === undefined || pic.status === 'finished');
            }.bind(this));
            if (b) _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "watchTrueValue", this).call(this, n);
        }
    }]);

    return handler;
}(_handler2.default);

//const propsEventType = ['beforeUpload','onProgress','onPreview','onRemove','onFormatError','onExceededSize','onError'];

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "init",
        value: function init() {
            var _this6 = this;

            var handler = this.handler;
            this.uploadOptions = (0, _util.extend)((0, _util.extend)({}, this.options.upload), this.handler.rule.props);
            this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
            this.propsData = this.vData.props(this.uploadOptions).props('onSuccess', function () {
                _newArrowCheck(this, _this6);

                return this.onSuccess.apply(this, arguments);
            }.bind(this)).ref(handler.refName).key("fip" + String(handler.unique)).get();
        }
    }, {
        key: "onSuccess",
        value: function onSuccess(response, file, fileList) {
            var url = this.uploadOptions.onSuccess.call(null, response, file, fileList);

            if (!(0, _util.isUndef)(url)) {
                file.url = url;
                file.showProgress = false;

                // fileList.push({
                //     url,
                //     name: getFileName(url)
                // });
                // this.handler.changeParseValue(this.handler.el.fileList);
            } else {
                var index = fileList.indexOf(file);
                if (index !== -1) fileList.splice(index, 1);
            }
        }
    }, {
        key: "defaultOnHandle",
        value: function defaultOnHandle(src) {
            var _this7 = this;

            this.vm.$Modal.remove();
            setTimeout(function () {
                _newArrowCheck(this, _this7);

                this.vm.$Modal.info({
                    title: "预览",
                    render: function render(h) {
                        _newArrowCheck(this, _this7);

                        return h('img', { attrs: { src: src }, style: "width: 100%", key: 'ifmd' + (0, _util.uniqueId)() });
                    }.bind(this),
                    showCancel: true,
                    closable: true,
                    scrollable: true
                });
            }.bind(this), 301);
        }
    }, {
        key: "onHandle",
        value: function onHandle(src) {
            var fn = this.uploadOptions.onHandle;
            if (fn) return fn(src);else this.defaultOnHandle(src);
        }
    }, {
        key: "parse",
        value: function parse() {
            var _this8 = this;

            var unique = this.handler.unique;

            this.init();
            if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'ios-eye-outline';
            var value = this.vm.cptData[this.handler.field],
                render = [].concat(_toConsumableArray(value.map(function (file, index) {
                _newArrowCheck(this, _this8);

                if (file.showProgress) {
                    return this.makeProgress(file, "uppg" + String(index) + String(unique));
                } else if (file.status === undefined || file.status === 'finished') {
                    return this.makeUploadView(file.url, "upview" + String(index) + String(unique), index);
                }
            }.bind(this))));
            render.push(this.makeUploadBtn(unique, !this.uploadOptions.maxLength || this.uploadOptions.maxLength > this.vm.cptData[this.handler.field].length));
            return [this.vNode.make('div', { key: "div4" + String(unique), class: { 'fc-upload': true } }, render)];
        }
    }, {
        key: "cacheParse",
        value: function cacheParse() {
            return this.parse();
        }
    }, {
        key: "makeUploadView",
        value: function makeUploadView(src, key, index) {
            var _this9 = this;

            return this.vNode.make('div', { key: "div1" + String(key), class: { 'fc-files': true } }, function () {
                _newArrowCheck(this, _this9);

                var container = [];
                if (this.handler.rule.props.uploadType === 'image') {
                    container.push(this.vNode.make('img', { key: "img" + String(key), attrs: { src: src } }));
                } else {
                    container.push(this.vNode.icon({ key: "file" + String(key), props: { type: _common.iviewConfig.fileIcon, size: 40 } }));
                }
                if (this.issetIcon) container.push(this.makeIcons(src, key, index));
                return container;
            }.bind(this));
        }
    }, {
        key: "makeIcons",
        value: function makeIcons(src, key, index) {
            var _this10 = this;

            return this.vNode.make('div', { key: "div2" + String(key), class: { 'fc-upload-cover': true } }, function () {
                _newArrowCheck(this, _this10);

                var icon = [];
                if (!!this.uploadOptions.handleIcon) icon.push(this.makeHandleIcon(src, key, index));
                if (this.uploadOptions.allowRemove === true) icon.push(this.makeRemoveIcon(src, key, index));
                return icon;
            }.bind(this));
        }
    }, {
        key: "makeProgress",
        value: function makeProgress(file, unique) {
            return this.vNode.make('div', { key: "div3" + String(unique), class: { 'fc-files': true } }, [this.vNode.progress({ key: "upp" + String(unique), props: { percent: file.percentage, hideInfo: true }, style: { width: '90%' } })]);
        }
    }, {
        key: "makeUploadBtn",
        value: function makeUploadBtn(unique, isShow) {
            return this.vNode.upload(this.propsData, isShow === true ? [this.vNode.make('div', { key: "div5" + String(unique), class: { 'fc-upload-btn': true } }, [this.vNode.icon({
                key: "upi" + String(unique),
                props: {
                    type: this.handler.rule.props.uploadType === 'file' ? _common.iviewConfig.fileUpIcon : _common.iviewConfig.imgUpIcon,
                    size: 20
                }
            })])] : []);
        }
    }, {
        key: "makeRemoveIcon",
        value: function makeRemoveIcon(src, key, index) {
            var _this11 = this;

            return this.vNode.icon({
                key: "upri" + String(key) + String(index), props: { type: 'ios-trash-outline' }, nativeOn: {
                    'click': function click() {
                        _newArrowCheck(this, _this11);

                        this.handler.el.fileList.splice(index, 1);
                        this.handler.changeParseValue(this.handler.el.fileList);
                        this.sync();
                        this.propsData.props.onRemove && this.propsData.props.onRemove(this.handler.el.fileList);
                    }.bind(this)
                }
            });
        }
    }, {
        key: "makeHandleIcon",
        value: function makeHandleIcon(src, key, index) {
            var _this12 = this;

            return this.vNode.icon({
                key: "uphi" + String(key) + String(index), props: { type: (0, _util.toString)(this.uploadOptions.handleIcon) }, nativeOn: {
                    'click': function click() {
                        _newArrowCheck(this, _this12);

                        this.onHandle(src);
                    }.bind(this)
                }
            });
        }
    }]);

    return render;
}(_render2.default);

var types = {
    image: ['image', 0],
    file: ['file', 0],
    uploadFileOne: ['file', 1],
    uploadImageOne: ['image', 1]
};

var maker = Object.keys(types).reduce(function (initial, key) {
    _newArrowCheck(undefined, undefined);

    initial[key] = (0, _creator.creatorTypeFactory)(name, function (m) {
        _newArrowCheck(undefined, undefined);

        return m.props({ uploadType: types[key][0], maxLength: types[key][1] });
    }.bind(undefined));
    return initial;
}.bind(undefined), {});

maker.uploadImage = maker.image;
maker.uploadFile = maker.file;

exports.default = { handler: handler, render: render, maker: maker, name: name };

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formCreateName = exports.$FormCreate = undefined;

var _formCreate = __webpack_require__(7);

var _formCreate2 = _interopRequireDefault(_formCreate);

var _common = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var formCreateName = 'FormCreate';

var $FormCreate = function () {
    _newArrowCheck(undefined, undefined);

    return {
        name: formCreateName,
        render: function render() {
            return this.fComponent.fRender.parse(this.fComponent.vm);
        },

        props: {
            rule: {
                type: Array,
                required: true,
                default: function _default() {
                    _newArrowCheck(undefined, undefined);

                    return {};
                }.bind(undefined)
            },
            option: {
                type: Object,
                default: function _default() {
                    _newArrowCheck(undefined, undefined);

                    return {};
                }.bind(undefined),
                required: false
            },
            value: Object
        },
        data: _common.componentCommon.data,
        methods: _common.componentCommon.methods,
        created: function created() {
            this.fComponent = new _formCreate2.default(this.rule, this.option);
            this.fComponent._type = 'rule';
            this.fComponent.init(this);
        },
        mounted: function mounted() {
            var _this = this;

            this.fComponent.mounted(this);
            this.$f = this.fComponent.fCreateApi;
            this.$watch('rule', function (n) {
                _newArrowCheck(this, _this);

                this.fComponent.reload(n);
            }.bind(this));
            this.init();
        }
    };
}.bind(undefined);

exports.$FormCreate = $FormCreate;
exports.formCreateName = formCreateName;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _formCreate = __webpack_require__(7);

var _formCreate2 = _interopRequireDefault(_formCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(_formCreate2.default);
} /**
   *
   * JS表单生成器
   * Author: xaboy
   * Github: https://github.com/xaboy/form-create
   */

module.exports.default = module.exports = _formCreate2.default;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "hidden";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [];
        }
    }]);

    return render;
}(_render2.default);

var maker = _defineProperty({}, name, function (field, value) {
    _newArrowCheck(undefined, undefined);

    return (0, _creator.creatorFactory)(name)('', field, value);
}.bind(undefined));

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render = exports.handler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(3);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "input";

var handler = exports.handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            var props = this.rule.props;

            if (props.autosize && props.autosize.minRows) props.rows = props.autosize.minRows || 2;
        }
    }, {
        key: "toParseValue",
        value: function toParseValue(v) {
            return (0, _util.toString)(v);
        }
    }]);

    return handler;
}(_handler2.default);

var render = exports.render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.input(this.inputProps().get())];
        }
    }]);

    return render;
}(_render2.default);

var maker = ['password', 'url', 'email', 'text'].reduce(function (initial, type) {
    _newArrowCheck(undefined, undefined);

    initial[type] = (0, _creator.creatorTypeFactory)(name, type);
    return initial;
}.bind(undefined), {});

maker.idate = (0, _creator.creatorTypeFactory)(name, 'date');

exports.default = { render: render, handler: handler, name: name, maker: maker };

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler2 = __webpack_require__(0);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "radio";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var _this2 = this;

            return this.rule.options.filter(function (opt) {
                _newArrowCheck(this, _this2);

                return opt.value === value;
            }.bind(this)).reduce(function (initial, opt) {
                _newArrowCheck(this, _this2);

                return opt.label;
            }.bind(this), '');
        }
    }, {
        key: "toTrueValue",
        value: function toTrueValue(parseValue) {
            var _this3 = this;

            return this.rule.options.filter(function (opt) {
                _newArrowCheck(this, _this3);

                return opt.label === parseValue;
            }.bind(this)).reduce(function (initial, opt) {
                _newArrowCheck(this, _this3);

                return opt.value;
            }.bind(this), '');
        }
    }]);

    return handler;
}(_handler3.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            var _this5 = this;

            var _handler = this.handler,
                unique = _handler.unique,
                options = _handler.rule.options;

            return [this.vNode.radioGroup(this.inputProps().get(), function () {
                _newArrowCheck(this, _this5);

                return options.map(function (option, index) {
                    _newArrowCheck(this, _this5);

                    var clone = (0, _util.extend)({}, option);
                    delete clone.value;

                    return this.vNode.radio({
                        props: clone,
                        key: "ropt" + String(index) + String(unique)
                    });
                }.bind(this));
            }.bind(this))];
        }
    }]);

    return render;
}(_render2.default);

exports.default = { handler: handler, render: render, name: name };

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _handler2 = __webpack_require__(0);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "checkbox";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var _this2 = this;

            if (!value) value = [];else if (!Array.isArray(value)) value = [value];
            return this.rule.options.filter(function (opt) {
                _newArrowCheck(this, _this2);

                return value.indexOf(opt.value) !== -1;
            }.bind(this)).map(function (option) {
                _newArrowCheck(this, _this2);

                return option.label;
            }.bind(this));
        }
    }, {
        key: "toTrueValue",
        value: function toTrueValue(parseValue) {
            var _this3 = this;

            var value = this.rule.options.filter(function (opt) {
                _newArrowCheck(this, _this3);

                return parseValue.indexOf(opt.label) !== -1;
            }.bind(this)).map(function (opt) {
                _newArrowCheck(this, _this3);

                return opt.value;
            }.bind(this));
            if (this.rule.options.length === 1) return value[0] === undefined ? '' : value[0];else return value;
        }
    }, {
        key: "watchParseValue",
        value: function watchParseValue(n) {
            _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "watchParseValue", this).call(this, n);
            this.render.sync();
        }
    }]);

    return handler;
}(_handler3.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            var _this5 = this;

            var _handler = this.handler,
                unique = _handler.unique,
                options = _handler.rule.options,
                key = _handler.key;

            return [this.vNode.checkboxGroup(this.inputProps().key(key).get(), function () {
                _newArrowCheck(this, _this5);

                return options.map(function (option, index) {
                    _newArrowCheck(this, _this5);

                    var clone = (0, _util.extend)({}, option);
                    delete clone.value;
                    return this.vNode.checkbox({
                        props: clone,
                        key: "copt" + String(index) + String(unique)
                    });
                }.bind(this));
            }.bind(this))];
        }
    }]);

    return render;
}(_render2.default);

exports.default = { handler: handler, render: render, name: name };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "switch";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            if (this.rule.slot === undefined) this.rule.slot = {};
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            var _this3 = this;

            var slot = this.handler.rule.slot;

            this.propsData = this.inputProps().scopedSlots({
                open: function open() {
                    _newArrowCheck(this, _this3);

                    return slot.open;
                }.bind(this),
                close: function close() {
                    _newArrowCheck(this, _this3);

                    return slot.close;
                }.bind(this)
            }).get();
            return [this.vNode.switch(this.propsData)];
        }
    }]);

    return render;
}(_render2.default);

exports.default = { handler: handler, render: render, name: name };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler2 = __webpack_require__(0);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "select";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var isArr = Array.isArray(value);
            if (this.rule.props.multiple === true) return isArr === true ? value : [value];else return isArr === true ? value[0] || '' : value;
        }
    }]);

    return handler;
}(_handler3.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            var _this3 = this;

            var _handler = this.handler,
                unique = _handler.unique,
                options = _handler.rule.options;

            return [this.vNode.select(this.inputProps().get(), function () {
                _newArrowCheck(this, _this3);

                return options.map(function (option, index) {
                    _newArrowCheck(this, _this3);

                    return this.vNode.option({
                        props: option,
                        key: "sopt" + String(index) + String(unique)
                    });
                }.bind(this));
            }.bind(this))];
        }
    }]);

    return render;
}(_render2.default);

var maker = {
    selectMultiple: (0, _creator.creatorTypeFactory)(name, true, 'multiple'),
    selectOne: (0, _creator.creatorTypeFactory)(name, false, 'multiple')
};

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _common = __webpack_require__(4);

var _creator = __webpack_require__(3);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "datePicker";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            var props = this.rule.props;
            props.type = !props.type ? 'date' : (0, _util.toString)(props.type).toLowerCase();
            if (props.startDate === undefined) props.startDate = (0, _common.timeStampToDate)(props.startDate);
        }
    }, {
        key: "toParseValue",
        value: function toParseValue(value) {
            var _this2 = this;

            var isArr = Array.isArray(value),
                props = this.rule.props,
                parseValue = void 0;
            if (['daterange', 'datetimerange'].indexOf(props.type) !== -1) {
                if (isArr) {
                    parseValue = value.map(function (time) {
                        _newArrowCheck(this, _this2);

                        return !time ? '' : (0, _common.timeStampToDate)(time);
                    }.bind(this));
                } else {
                    parseValue = ['', ''];
                }
            } else if ('date' === props.type && props.multiple === true) {
                parseValue = (0, _util.toString)(value);
            } else {
                parseValue = isArr ? value[0] || '' : value;
                parseValue = !parseValue ? '' : (0, _common.timeStampToDate)(parseValue);
            }
            return parseValue;
        }
    }, {
        key: "toTrueValue",
        value: function toTrueValue() {
            return this.el.publicStringValue;
        }
    }, {
        key: "mounted",
        value: function mounted() {
            _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "mounted", this).call(this);
            this.rule.value = this.el.publicStringValue;
            this.vm.changeFormData(this.field, this.toParseValue(this.el.publicStringValue));
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.datePicker(this.inputProps().key(this.handler.key).get())];
        }
    }]);

    return render;
}(_render2.default);

var maker = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce(function (initial, type) {
    _newArrowCheck(undefined, undefined);

    initial[type] = (0, _creator.creatorTypeFactory)(name, type.toLowerCase());
    return initial;
}.bind(undefined), {});

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.getTime = getTime;

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(2);

var _common = __webpack_require__(4);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = 'timePicker';

function getTime(date) {
    return (0, _util.isDate)(date) ? (0, _util.dateFormat)('hh:mm:ss', date) : date;
}

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            var props = this.rule.props;
            if (!props.type) props.type = 'time';
            if (props.confirm === undefined) props.confirm = true;
        }
    }, {
        key: "toParseValue",
        value: function toParseValue(value) {
            var _this2 = this;

            var parseValue = void 0,
                isArr = Array.isArray(value);
            if ('timerange' === this.rule.props.type) {
                if (isArr) {
                    parseValue = value.map(function (time) {
                        _newArrowCheck(this, _this2);

                        return !time ? '' : getTime((0, _common.timeStampToDate)(time));
                    }.bind(this));
                } else {
                    parseValue = ['', ''];
                }
            } else {
                isArr && (value = value[0]);
                parseValue = !value ? '' : getTime((0, _common.timeStampToDate)(value));
            }
            return parseValue;
        }
    }, {
        key: "mounted",
        value: function mounted() {
            _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "mounted", this).call(this);
            this.rule.value = this.el.publicStringValue;
            this.vm.changeFormData(this.field, this.toParseValue(this.el.publicStringValue));
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.timePicker(this.inputProps().key(this.handler.key).get())];
        }
    }]);

    return render;
}(_render2.default);

var maker = {
    time: (0, _creator.creatorTypeFactory)(name, 'time'),
    timeRange: (0, _creator.creatorTypeFactory)(name, 'timerange')
};

exports.default = { handler: handler, render: render, maker: maker, name: name };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "inputNumber";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var parseValue = parseFloat(value);
            if (Number.isNaN(parseValue)) parseValue = 0;
            return parseValue;
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.inputNumber(this.inputProps().get())];
        }
    }]);

    return render;
}(_render2.default);

var maker = {
    number: (0, _creator.creatorFactory)(name)
};

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "colorPicker";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "watchParseValue",
        value: function watchParseValue(n) {
            _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "watchParseValue", this).call(this, n);
            this.render.sync();
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.colorPicker(this.inputProps().key(this.handler.key).get())];
        }
    }]);

    return render;
}(_render2.default);

var maker = {
    color: (0, _creator.creatorFactory)(name)
};

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = 'cascader';

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            var rule = this.rule;
            if (!rule.props.data) rule.props.data = [];
            if (!Array.isArray(this.rule.value)) this.rule.value = [];
        }
    }, {
        key: "toParseValue",
        value: function toParseValue(value) {
            return Array.isArray(value) ? value : [];
        }
    }, {
        key: "mounted",
        value: function mounted() {
            _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "mounted", this).call(this);
            this.vm.changeFormData(this.field, this.toParseValue(this.el.value));
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.cascader(this.inputProps().get())];
        }
    }]);

    return render;
}(_render2.default);

exports.default = { handler: handler, render: render, name: name };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "rate";

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var parseValue = parseFloat(value);
            if (Number.isNaN(parseValue)) parseValue = 0;
            return parseValue;
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.rate(this.inputProps().get())];
        }
    }]);

    return render;
}(_render2.default);

exports.default = { handler: handler, render: render, name: name };

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "slider";

// function parseRule(rule) {
//
//     rule.props.min = rule.props.min === undefined
//         ? 0
//         : parseFloat(rule.props.min) || 0;
//
//     let value = !rule.value ? 0 : rule.value, isArr = Array.isArray(value), props = rule.props, min = props.min,
//         parseValue;
//     if (props.range === true) {
//         parseValue = isArr ? value : [min, (parseFloat(value) || min)];
//     } else {
//         parseValue = isArr ? (parseFloat(value[0]) || min) : parseFloat(value);
//     }
//     rule.value = parseValue;
// }

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            var rule = this.rule;
            rule.props.min = rule.props.min === undefined ? 0 : parseFloat(rule.props.min) || 0;
        }
    }, {
        key: "toParseValue",
        value: function toParseValue(value) {
            var rule = this.rule,
                isArr = Array.isArray(value),
                props = rule.props,
                min = props.min,
                parseValue = void 0;
            if (props.range === true) {
                parseValue = isArr ? value : [min, parseFloat(value) || min];
            } else {
                parseValue = isArr ? parseFloat(value[0]) || min : parseFloat(value);
            }
            return parseValue;
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.slider(this.inputProps().get())];
        }
    }]);

    return render;
}(_render2.default);

var maker = {
    sliderRange: (0, _creator.creatorTypeFactory)(name, true, 'range')
};

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

exports.parseRule = parseRule;

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(2);

var _upload = __webpack_require__(10);

var _upload2 = _interopRequireDefault(_upload);

var _common = __webpack_require__(4);

var _creator = __webpack_require__(3);

var _iview = __webpack_require__(11);

var _iview2 = _interopRequireDefault(_iview);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = "frame";

function parseRule(rule) {
    var props = rule.props;
    if (!props.type) props.type = 'input';
    if (!props.icon) props.icon = _common.iviewConfig.fileUpIcon;
    if (!props.width) props.width = '500px';
    if (!props.height) props.height = '370px';
    if (props.spin === undefined) props.spin = true;
    if (!props.title) props.title = '请选择' + rule.title;
    if (!props.maxLength) props.maxLength = 0;
    props.multiple = props.maxLength != 1;
    if (props.type === 'file' && props.handleIcon === undefined) props.handleIcon = false;else props.handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'ios-eye-outline' : props.handleIcon;
    if (props.allowRemove === undefined) props.allowRemove = true;
}

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            parseRule(this.rule);
        }
    }, {
        key: "toParseValue",
        value: function toParseValue(value) {
            var parseValue = void 0,
                oldValue = value,
                isArr = Array.isArray(oldValue);
            if (oldValue === '') parseValue = [];else if (!isArr) parseValue = [oldValue];else parseValue = oldValue;
            this.parseValue = parseValue;
            return parseValue;
        }
    }, {
        key: "toTrueValue",
        value: function toTrueValue(parseValue) {
            return this.rule.props.multiple === true ? parseValue : parseValue[0] === undefined ? '' : parseValue[0];
        }
    }, {
        key: "watchTrueValue",
        value: function watchTrueValue(n) {
            _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "watchTrueValue", this).call(this, n);
            this.render.sync();
        }
    }, {
        key: "watchParseValue",
        value: function watchParseValue(n) {
            _get(handler.prototype.__proto__ || Object.getPrototypeOf(handler.prototype), "watchParseValue", this).call(this, n);
            this.parseValue = n;
            this.render.sync();
        }
    }]);

    return handler;
}(_handler2.default);

var eventList = { onOpen: 'on-open', onChange: 'on-change', onCancel: 'on-cancel', onOk: 'on-ok' };

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "init",
        value: function init() {
            var _this3 = this;

            var field = this.handler.field;
            this.handler.watch.push(this.vm.$watch("cptData." + String(field), function () {
                _newArrowCheck(this, _this3);

                this.onChange();
            }.bind(this), { deep: true }));
            this._props = this.handler.rule.props;
            this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
        }
    }, {
        key: "parse",
        value: function parse() {
            var type = this._props.type,
                vNode = void 0;
            if (type === 'image') vNode = this.makeGroup(this.makeImage());else if (type === 'file') vNode = this.makeGroup(this.makeFile());else vNode = this.makeInput();
            return vNode;
        }
    }, {
        key: "makeInput",
        value: function makeInput(hidden) {
            var _this4 = this;

            var unique = this.handler.unique,
                props = this.inputProps().props({
                type: "text",
                value: this.handler.parseValue.toString(),
                icon: this._props.icon,
                readonly: true,
                clearable: true
            }).on('on-click', function () {
                _newArrowCheck(this, _this4);

                this.showModel();
            }.bind(this)).key('ifit' + unique).style({ display: hidden === true ? 'none' : 'inline-block' }).get();
            return [this.vNode.input(props)];
        }
    }, {
        key: "makeGroup",
        value: function makeGroup(render) {
            var unique = this.handler.unique,
                field = this.handler.field;
            return [this.vNode.make('div', {
                key: "ifgp1" + String(unique),
                class: { 'fc-upload fc-frame': true },
                ref: this.handler.refName,
                props: { value: this.vm.cptData[field] }
            }, render), this.makeInput(true)];
        }
    }, {
        key: "makeImage",
        value: function makeImage() {
            var _this5 = this;

            var unique = this.handler.unique;
            var vNode = this.handler.parseValue.map(function (src, index) {
                _newArrowCheck(this, _this5);

                return this.vNode.make('div', { key: "ifid1" + String(unique) + String(index), class: { 'fc-files': true } }, [this.vNode.make('img', { key: "ifim" + String(unique) + String(index), attrs: { src: src } }), this.makeIcons(src, unique, index)]);
            }.bind(this));
            vNode.push(this.makeBtn());
            return vNode;
        }
    }, {
        key: "makeFile",
        value: function makeFile() {
            var _this6 = this;

            var unique = this.handler.unique;
            var vNode = this.handler.parseValue.map(function (src, index) {
                _newArrowCheck(this, _this6);

                return this.vNode.make('div', { key: "iffd2" + String(unique) + String(index), class: { 'fc-files': true } }, [this.vNode.icon({ key: "iff" + String(unique) + String(index), props: { type: _common.iviewConfig.fileIcon, size: 40 } }), this.makeIcons(src, unique, index)]);
            }.bind(this));
            vNode.push(this.makeBtn());
            return vNode;
        }
    }, {
        key: "makeBtn",
        value: function makeBtn() {
            var _this7 = this;

            var props = this.handler.rule.props;
            if (props.maxLength > 0 && this.handler.parseValue.length >= props.maxLength) return;
            var unique = this.handler.unique;
            return this.vNode.make('div', {
                key: "ifbd3" + String(unique), class: { 'fc-upload-btn': true }, on: {
                    click: function click() {
                        _newArrowCheck(this, _this7);

                        this.showModel();
                    }.bind(this)
                }
            }, [this.vNode.icon({ key: "ifbi3" + String(unique), props: { type: this._props.icon, size: 20 } })]);
        }
    }, {
        key: "makeSpin",
        value: function makeSpin() {
            if (true !== this._props.spin) return;
            var unique = this.handler.unique;
            return this.vNode.make('Spin', {
                props: { fix: true },
                key: 'ifsp' + unique,
                class: {
                    'fc-spin': true
                }
            }, [this.vNode.icon({
                props: {
                    type: 'load-c',
                    size: 18
                },
                class: {
                    'fc-spin-icon-load': true
                },
                key: 'ifspi' + unique
            }), this.vNode.make('div', {
                domProps: {
                    innerHTML: '加载中...'
                },
                key: 'ifspd' + unique
            })]);
        }
    }, {
        key: "makeIcons",
        value: function makeIcons(src, key, index) {
            var _this8 = this;

            if (this.issetIcon === true) return this.vNode.make('div', { key: "ifis" + String(key) + String(index), class: { 'fc-upload-cover': true } }, function () {
                _newArrowCheck(this, _this8);

                var icon = [];
                if (this._props.handleIcon !== false) icon.push(this.makeHandleIcon(src, key, index));
                if (this._props.allowRemove === true) icon.push(this.makeRemoveIcon(src, key, index));
                return icon;
            }.bind(this));
        }
    }, {
        key: "makeRemoveIcon",
        value: function makeRemoveIcon(src, key, index) {
            var _this9 = this;

            return this.vNode.icon({
                key: "ifri" + String(key) + String(index), props: { type: 'ios-trash-outline' }, nativeOn: {
                    'click': function click() {
                        _newArrowCheck(this, _this9);

                        if (this.onRemove(src) !== false) {
                            this.handler.parseValue.splice(index, 1);
                            this.sync();
                        }
                    }.bind(this)
                }
            });
        }
    }, {
        key: "makeHandleIcon",
        value: function makeHandleIcon(src, key, index) {
            var _this10 = this;

            var props = this._props;
            return this.vNode.icon({
                key: "ifhi" + String(key) + String(index), props: { type: toString(props.handleIcon) }, nativeOn: {
                    'click': function click() {
                        _newArrowCheck(this, _this10);

                        this.onHandle(src);
                    }.bind(this)
                }
            });
        }
    }, {
        key: "onRemove",
        value: function onRemove(src) {
            var fn = this.handler.rule.event['on-remove'];
            if (fn) return fn(src, this.handler.getValue());
        }
    }, {
        key: "onHandle",
        value: function onHandle(src) {
            var fn = this.handler.rule.event['on-handle'];
            if (fn) return fn(src);else this.defaultOnHandle(src);
        }
    }, {
        key: "valid",
        value: function valid(field) {
            if (field !== this.handler.field) throw new Error('无效的表单字段' + (0, _util.errMsg)());
        }
    }, {
        key: "showModel",
        value: function showModel() {
            var _this11 = this;

            var isShow = false !== this.onOpen(),
                _props = this._props,
                width = _props.width,
                height = _props.height,
                src = _props.src,
                title = _props.title;

            if (!isShow) return;
            this.vm.$Modal.remove();
            setTimeout(function () {
                _newArrowCheck(this, _this11);

                this.vm.$Modal.confirm({
                    title: title,
                    render: function render() {
                        _newArrowCheck(this, _this11);

                        return [this.makeSpin(), this.vNode.make('iframe', {
                            attrs: {
                                src: src
                            },
                            style: {
                                'height': height,
                                'border': "0 none",
                                'width': "100%"
                            },
                            on: {
                                'load': function load(e) {
                                    _newArrowCheck(this, _this11);

                                    if (this._props.spin === true) {
                                        var spin = document.getElementsByClassName('fc-spin')[0];
                                        spin && spin.parentNode.removeChild(spin);
                                    }
                                    try {
                                        if (this.options.iframeHelper === true) {
                                            var iframe = e.path[0].contentWindow;

                                            iframe[String(this.handler.field) + "_change"] = function (val) {
                                                _newArrowCheck(this, _this11);

                                                this.handler.setParseValue(val);
                                            }.bind(this);

                                            iframe["form_create_helper"] = {
                                                close: function close(field) {
                                                    _newArrowCheck(this, _this11);

                                                    this.valid(field);
                                                    _iview2.default.Modal.remove();
                                                }.bind(this),
                                                set: function set(field, value) {
                                                    _newArrowCheck(this, _this11);

                                                    this.valid(field);
                                                    iframe[String(field) + "_change"](value);
                                                }.bind(this),
                                                get: function get(field) {
                                                    _newArrowCheck(this, _this11);

                                                    this.valid(field);
                                                    return this.handler.rule.value;
                                                }.bind(this)
                                            };
                                        }
                                    } catch (e) {}
                                }.bind(this)
                            },
                            key: 'ifmd' + (0, _util.uniqueId)()
                        })];
                    }.bind(this),
                    onOk: function onOk() {
                        _newArrowCheck(this, _this11);

                        return this.onOk();
                    }.bind(this),
                    onCancel: function onCancel() {
                        _newArrowCheck(this, _this11);

                        return this.onCancel();
                    }.bind(this),
                    showCancel: true,
                    closable: true,
                    scrollable: true,
                    width: width
                });
            }.bind(this), 301);
        }
    }]);

    return render;
}(_render2.default);

render.prototype.defaultOnHandle = _upload2.default.render.prototype.defaultOnHandle;
Object.keys(eventList).forEach(function (k) {
    _newArrowCheck(undefined, undefined);

    render.prototype[k] = function () {
        var fn = this.handler.rule.event[eventList[k]];
        if (fn) return fn(this.handler.getValue());
    };
}.bind(undefined));

var types = {
    frameInputs: ['input', 0],
    frameFiles: ['file', 0],
    frameImages: ['image', 0],
    frameInputOne: ['input', 1],
    frameFileOne: ['file', 1],
    frameImageOne: ['image', 1]
};

var maker = Object.keys(types).reduce(function (initial, key) {
    _newArrowCheck(undefined, undefined);

    initial[key] = (0, _creator.creatorTypeFactory)(name, function (m) {
        _newArrowCheck(undefined, undefined);

        return m.props({ type: types[key][0], maxLength: types[key][1] });
    }.bind(undefined));
    return initial;
}.bind(undefined), {});

maker.frameInput = maker.frameInputs;
maker.frameFile = maker.frameFiles;
maker.frameImage = maker.frameImages;

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.parseRule = parseRule;
exports.isMultiple = isMultiple;

var _handler2 = __webpack_require__(0);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(2);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = 'tree';

function parseRule(rule) {
    var props = rule.props;
    if (props.data === undefined) props.data = [];
    if (props.type === undefined) props.type = 'checked';
    if (props.multiple === undefined) props.multiple = false;
    if (isMultiple(rule) && Array.isArray(rule.value)) rule.value = this.rule.value[0] || '';
    rule.value = (0, _util.toArray)(rule.value);

    return rule;
}

function isMultiple(rule) {
    return !rule.props.multiple && rule.props.type === 'selected';
}

var handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            parseRule(this.rule);

            this._data = {};
            this.data(this.rule.props.data);

            this._parseValue();
        }
    }, {
        key: "_parseValue",
        value: function _parseValue() {
            var _this2 = this;

            this.rule.value.forEach(this.rule.props.type === 'selected' ? function (v) {
                _newArrowCheck(this, _this2);

                return this.selected(v);
            }.bind(this) : function (v) {
                _newArrowCheck(this, _this2);

                return this.checked(v);
            }.bind(this));
            var value = [],
                props = this.rule.props;
            props.type === 'selected' ? Object.keys(this._data).forEach(function (key) {
                _newArrowCheck(this, _this2);

                var node = this._data[key];
                if (node.selected === true) value.push(node.id);
            }.bind(this)) : Object.keys(this._data).forEach(function (key) {
                _newArrowCheck(this, _this2);

                var node = this._data[key];
                if (node.checked === true) value.push(node.id);
            }.bind(this));

            this.rule.value = value;
        }
    }, {
        key: "toParseValue",
        value: function toParseValue(value) {
            value = (0, _util.toArray)(value);
            this.choose(value);
            this.parseValue = value;
            return value;
        }
    }, {
        key: "choose",
        value: function choose(value) {
            var _this3 = this;

            var rule = this.rule,
                _data = this._data;

            rule.props.type === 'selected' ? Object.keys(_data).forEach(function (key) {
                _newArrowCheck(this, _this3);

                this.vm.$set(_data[key], 'selected', value.indexOf(_data[key].id) !== -1);
            }.bind(this)) : Object.keys(_data).forEach(function (key) {
                _newArrowCheck(this, _this3);

                this.vm.$set(_data[key], 'checked', value.indexOf(_data[key].id) !== -1);
            }.bind(this));
        }
    }, {
        key: "checked",
        value: function checked(v) {
            if (this._data[v] !== undefined) {
                this.vm.$set(this._data[v], 'checked', true);
            }
        }
    }, {
        key: "selected",
        value: function selected(v) {
            if (this._data[v] !== undefined) {
                this.vm.$set(this._data[v], 'selected', true);
            }
        }
    }, {
        key: "toTrueValue",
        value: function toTrueValue(parseValue) {
            var value = parseValue;
            return !isMultiple(this.rule) ? value : value[0] || '';
        }
    }, {
        key: "watchParseValue",
        value: function watchParseValue(n) {
            this.choose(n);
        }
    }, {
        key: "selectedNodeToValue",
        value: function selectedNodeToValue(nodes) {
            var _this4 = this;

            var value = [];
            nodes.forEach(function (node) {
                _newArrowCheck(this, _this4);

                if (node.selected === true) value.push(node.id);
            }.bind(this));
            return value;
        }
    }, {
        key: "checkedNodeToValue",
        value: function checkedNodeToValue(nodes) {
            var _this5 = this;

            var value = [];
            nodes.forEach(function (node) {
                _newArrowCheck(this, _this5);

                if (node.checked === true) value.push(node.id);
            }.bind(this));
            return value;
        }
    }, {
        key: "toValue",
        value: function toValue() {
            return this.rule.props.type === 'selected' ? this.selectedNodeToValue(this.el.getSelectedNodes()) : this.checkedNodeToValue(this.el.getCheckedNodes());
        }
    }, {
        key: "data",
        value: function data(_data2) {
            var _this6 = this;

            _data2.forEach(function (node) {
                _newArrowCheck(this, _this6);

                this._data[node.id] = node;
                if (node.children !== undefined && Array.isArray(node.children)) this.data(node.children);
            }.bind(this));
        }
    }]);

    return handler;
}(_handler3.default);

var event = {
    s: 'on-select-change',
    c: 'on-check-change'
};

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            var _this8 = this,
                _vData$on$on;

            var _handler = this.handler,
                rule = _handler.rule,
                refName = _handler.refName,
                field = _handler.field,
                unique = _handler.unique,
                props = this.vData.on(rule.event).on((_vData$on$on = {}, _defineProperty(_vData$on$on, event.s, function (v) {
                _newArrowCheck(this, _this8);

                this.vm.changeFormData(field, this.handler.toValue());
                rule.event[event.s] && rule.event[event.s](v);
            }.bind(this)), _defineProperty(_vData$on$on, event.c, function (v) {
                _newArrowCheck(this, _this8);

                this.vm.changeFormData(field, this.handler.toValue());
                rule.event[event.c] && rule.event[event.c](v);
            }.bind(this)), _vData$on$on)).props(rule.props).ref(refName).key("fip" + String(unique)).get();


            var inputProps = this.inputProps().props({
                type: "text",
                value: this.handler.parseValue.toString(),
                disable: true
            }).key('fipit' + unique).style({ display: 'none' }).ref(String(refName) + "it").get();
            return [this.vNode.tree(props), this.vNode.input(inputProps)];
        }
    }]);

    return render;
}(_render2.default);

var types = { 'treeSelected': 'selected', 'treeChecked': 'checked' };

var maker = Object.keys(types).reduce(function (initial, key) {
    _newArrowCheck(undefined, undefined);

    initial[key] = (0, _creator.creatorTypeFactory)(name, types[key]);
    return initial;
}.bind(undefined), {});

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.handler = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler = __webpack_require__(0);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(1);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var name = 'autoComplete';

var handler = exports.handler = function (_Handler) {
    _inherits(handler, _Handler);

    function handler() {
        _classCallCheck(this, handler);

        return _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).apply(this, arguments));
    }

    _createClass(handler, [{
        key: "init",
        value: function init() {
            var rule = this.rule;
            if (!Array.isArray(rule.data)) rule.data = [];
        }
    }]);

    return handler;
}(_handler2.default);

var render = function (_Render) {
    _inherits(render, _Render);

    function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, (render.__proto__ || Object.getPrototypeOf(render)).apply(this, arguments));
    }

    _createClass(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.AutoComplete(this.inputProps().key(this.handler.key).get())];
        }
    }]);

    return render;
}(_render2.default);

var maker = {
    auto: (0, _creator.creatorFactory)(name)
};

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.getRenders = getRenders;
exports.preventDefault = preventDefault;

var _util = __webpack_require__(2);

var _vNode = __webpack_require__(8);

var _vNode2 = _interopRequireDefault(_vNode);

var _vData = __webpack_require__(6);

var _vData2 = _interopRequireDefault(_vData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function getRenders(handlers, renderSort) {
    var _this = this;

    return renderSort.reduce(function (initial, field) {
        _newArrowCheck(this, _this);

        initial[field] = handlers[field].render;
        return initial;
    }.bind(this), {});
}

function preventDefault(e) {
    e.preventDefault();
}

var Form = function () {
    function Form(_ref) {
        var vm = _ref.vm,
            options = _ref.options,
            fieldList = _ref.fieldList,
            handlers = _ref.handlers,
            formData = _ref.formData,
            validate = _ref.validate,
            fCreateApi = _ref.fCreateApi;

        _classCallCheck(this, Form);

        this.vm = vm;
        this.options = options;
        this.handlers = handlers;
        this.renderSort = fieldList;
        this.renders = getRenders(handlers, fieldList);
        this.form = {
            model: formData,
            rules: validate,
            key: 'form' + (0, _util.uniqueId)()
        };
        this.fCreateApi = fCreateApi;
        this.vNode = new _vNode2.default(vm);
        this.vData = new _vData2.default();
        this.unique = (0, _util.uniqueId)();
        this.refName = "cForm" + String(this.unique);
        this.cacheUnique = 0;
    }

    _createClass(Form, [{
        key: "parse",
        value: function parse(vm) {
            var _this2 = this;

            this.vNode.setVm(vm);
            if (!vm.isShow) return;
            if (this.cacheUnique !== vm.unique) {
                this.renderSort.map(function (field) {
                    _newArrowCheck(this, _this2);

                    this.renders[field].clearCache();
                }.bind(this));
                this.cacheUnique = vm.unique;
            }
            var unique = this.unique,
                propsData = this.vData.props(this.options.form).props(this.form).ref(this.refName).nativeOn({ submit: preventDefault }).class('form-create', true).key(unique).get(),
                vn = this.renderSort.map(function (field) {
                _newArrowCheck(this, _this2);

                var render = this.renders[field],
                    _render$handler = render.handler,
                    key = _render$handler.key,
                    type = _render$handler.type;
                if (type === 'hidden') return;
                return this.makeFormItem(render.handler, render.cacheParse(), "fItem" + String(key) + String(unique));
            }.bind(this));
            if (vn.length > 0) vn.push(this.makeFormBtn(unique));
            return this.vNode.form(propsData, [this.vNode.row((0, _util.extend)({ props: this.options.row || {} }, { key: 'row' + unique }), vn)]);
        }
    }, {
        key: "makeFormItem",
        value: function makeFormItem(_ref2, VNodeFn, fItemUnique) {
            var rule = _ref2.rule,
                unique = _ref2.unique,
                field = _ref2.field,
                refName = _ref2.refName;

            var propsData = this.vData.props({
                prop: field,
                label: rule.title,
                labelFor: unique,
                rules: rule.validate,
                labelWidth: rule.col.labelWidth,
                required: rule.props.required
            }).key(fItemUnique).ref('fItem' + refName).get();
            return this.vNode.col({
                props: rule.col, 'class': {
                    '__fc_h': rule.props.hidden === true,
                    '__fc_v': rule.props.visibility === true
                }, key: String(fItemUnique) + "col1"
            }, [this.vNode.formItem(propsData, VNodeFn)]);
        }
    }, {
        key: "makeFormBtn",
        value: function makeFormBtn(unique) {
            var btn = [],
                submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
                resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
            if (submitBtnShow) btn.push(this.makeSubmitBtn(unique, resetBtnShow ? 19 : 24));
            if (resetBtnShow) btn.push(this.makeResetBtn(unique, 4));

            return this.vNode.col({ props: { span: 24 }, key: String(this.unique) + "col2" }, btn);
        }
    }, {
        key: "makeResetBtn",
        value: function makeResetBtn(unique, span) {
            var _this3 = this;

            var props = (0, _util.isUndef)(this.options.resetBtn.col) ? { span: span, push: 1 } : this.options.resetBtn.col;
            return this.vNode.col({ props: props, key: String(this.unique) + "col3" }, [this.vNode.button({
                key: "frsbtn" + String(unique), props: this.vm.resetProps, on: {
                    "click": function click() {
                        _newArrowCheck(this, _this3);

                        this.fCreateApi.resetFields();
                    }.bind(this)
                }
            }, [this.vNode.span(this.vm.resetProps.innerText)])]);
        }
    }, {
        key: "makeSubmitBtn",
        value: function makeSubmitBtn(unique, span) {
            var _this4 = this;

            var props = (0, _util.isUndef)(this.options.submitBtn.col) ? { span: span } : this.options.submitBtn.col;
            return this.vNode.col({ props: props, key: String(this.unique) + "col4" }, [this.vNode.button({
                key: "fbtn" + String(unique), props: this.vm.buttonProps, on: {
                    "click": function click() {
                        _newArrowCheck(this, _this4);

                        this.fCreateApi.submit();
                    }.bind(this)
                }
            }, [this.vNode.span(this.vm.buttonProps.innerText)])]);
        }
    }, {
        key: "removeRender",
        value: function removeRender(field) {
            delete this.renders[field];
            this.renderSort.splice(this.renderSort.indexOf(field), 1);
        }
    }, {
        key: "setRender",
        value: function setRender(handler, after, pre) {
            this.renders[handler.field] = handler.render;
            if (after !== undefined) this.changeSort(handler.field, after, pre);
        }
    }, {
        key: "changeSort",
        value: function changeSort(field, after, pre) {
            var index = this.renderSort.indexOf((0, _util.toString)(after));
            if (index !== -1) this.renderSort.splice(pre === false ? index + 1 : index, 0, field);else if (!pre) this.renderSort.push(field);else this.renderSort.unshift(field);
        }
    }]);

    return Form;
}();

exports.default = Form;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = formCreateComponent;

var _component = __webpack_require__(12);

var _common = __webpack_require__(4);

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

function formCreateComponent(fComponent) {
    var _this = this;

    return {
        name: String(_component.formCreateName) + 'Core',
        data: _common.componentCommon.data,
        render: function render() {
            _newArrowCheck(this, _this);

            return fComponent.fRender.parse(fComponent.vm);
        }.bind(this),
        methods: _common.componentCommon.methods,
        created: function created() {
            this.fComponent = fComponent;
            this.fComponent._type = 'rules';
            fComponent.init(this);
        },
        mounted: function mounted() {
            var _this2 = this;

            fComponent.mounted(this);
            this.$f = fComponent.fCreateApi;
            this.init();
            this.$watch('rules', function (n) {
                _newArrowCheck(this, _this2);

                this.fComponent.reload(n);
            }.bind(this));
        }
    };
};

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _creator = __webpack_require__(3);

var _componentList = __webpack_require__(9);

var _componentList2 = _interopRequireDefault(_componentList);

var _util = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

var maker = function () {
    _newArrowCheck(undefined, undefined);

    var _m = {};

    Object.keys(_componentList2.default).forEach(function (key) {
        _newArrowCheck(undefined, undefined);

        var component = _componentList2.default[key];

        var undef = (0, _util.isUndef)(component.maker);

        if (undef || component.maker[component.name] === undefined) _m[component.name] = (0, _creator.creatorFactory)(component.name);

        if (!undef) (0, _util.extend)(_m, component.maker);
    }.bind(undefined));

    var commonMaker = (0, _creator.creatorFactory)('');

    (0, _util.extend)(_m, {
        create: function create(type) {
            var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tmp' + (0, _util.uniqueId)();

            var make = commonMaker('', field);
            make.rule.type = type;
            make.col({ labelWidth: 1 });
            return make;
        },
        createTmp: function createTmp(template, vm) {
            var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'tmp' + (0, _util.uniqueId)();

            var make = commonMaker('', field);
            make.rule.type = '__tmp';
            make.rule.template = template;
            make.rule._vm = vm;
            make.col({ labelWidth: 1 });
            return make;
        }
    });
    _m.template = _m.createTmp;

    return _m;
}.bind(undefined)();

exports.default = maker;

/***/ })
/******/ ]);
});