/*! form-create v1.4 | github https://github.com/xaboy/form-create | author xaboy */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("formCreate", [], factory);
	else if(typeof exports === 'object')
		exports["formCreate"] = factory();
	else
		root["formCreate"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	return __webpack_require__(__webpack_require__.s = 68);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(40);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (innerThis, boundThis) {
  if (innerThis !== boundThis) {
    throw new TypeError("Cannot instantiate an arrow function");
  }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(108), __esModule: true };

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._toString = undefined;

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _stringify = __webpack_require__(50);

var _stringify2 = _interopRequireDefault(_stringify);

var _typeof2 = __webpack_require__(41);

var _typeof3 = _interopRequireDefault(_typeof2);

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _toString = exports._toString = Object.prototype.toString;

function toRawType(value) {
    return _toString.call(value).slice(8, -1);
}

function isUndef(v) {
    return v === undefined || v === null;
}

function toString(val) {
    return val == null ? '' : (typeof val === 'undefined' ? 'undefined' : (0, _typeof3.default)(val)) === 'object' ? (0, _stringify2.default)(val, null, 2) : String(val);
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
            (0, _newArrowCheck3.default)(this, _this);
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
    return name.replace(/([A-Z])/g, '-$1').toLowerCase();
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
    return (typeof arg === 'undefined' ? 'undefined' : (0, _typeof3.default)(arg)) === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg);
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _keys = __webpack_require__(15);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.parseRule = parseRule;
exports.parseArray = parseArray;
exports.parseEmit = parseEmit;
exports.parseEvent = parseEvent;
exports.parseProps = parseProps;
exports.parseCol = parseCol;

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Handler = function () {
    function Handler(vm) {
        var _rule = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        (0, _classCallCheck3.default)(this, Handler);

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
        this.init();
        this.childrenHandlers = [];

        this.parseValue = this.toParseValue(this.rule.value);
    }

    (0, _createClass3.default)(Handler, [{
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
            this.vm.changeFormData(this.field, this.toParseValue(n));
        }
    }, {
        key: 'watchParseValue',
        value: function watchParseValue(n) {}
    }, {
        key: 'mounted',
        value: function mounted() {
            this.el = this.vm.$refs[this.refName];
            this.defaultValue = this.toTrueValue(this.vm.$refs['fItem' + this.refName] ? this.vm.$refs['fItem' + this.refName].initialValue : (0, _util.deepExtend)({}, { value: this.rule.value }).value);
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
    rule.emitEvent = parseEmit(field, emit, vm);
    rule.event = (0, _util.extend)(parseEvent(event), rule.emitEvent);
    rule.validate = parseArray(validate);
    rule.options = parseArray(options);
    rule.title = title;
    rule.value = value;
    rule.field = field;

    if ((0, _keys2.default)(rule.emitEvent).length > 0) (0, _util.extend)(rule.on, rule.emitEvent);

    return rule;
}

function parseArray(validate) {
    return Array.isArray(validate) ? validate : [];
}

function parseEmit(field, emit, vm) {
    var _this = this;

    var event = {};

    if (!Array.isArray(emit)) return event;

    emit.forEach(function (eventName) {
        (0, _newArrowCheck3.default)(this, _this);

        event['on-' + String(eventName)] = event['' + String(eventName)] = function () {
            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            (0, _newArrowCheck3.default)(this, _this);

            vm.$emit.apply(vm, [(0, _util.toLine)(String(field) + '-' + String(eventName)).replace('_', '-')].concat(arg));
        }.bind(this);
    }.bind(this));

    return event;
}

function parseEvent(event) {
    (0, _keys2.default)(event).forEach(function (eventName) {
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _util = __webpack_require__(4);

var _vNode = __webpack_require__(62);

var _vNode2 = _interopRequireDefault(_vNode);

var _vData = __webpack_require__(48);

var _vData2 = _interopRequireDefault(_vData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Render = function () {
    function Render(vm, handler) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        (0, _classCallCheck3.default)(this, Render);

        this.vm = vm;
        this.handler = handler;
        this.options = options;
        this.vNode = new _vNode2.default(vm);
        this.vData = new _vData2.default();
        this.cache = null;
        this.$tickEvent = [];

        this.init();
    }

    (0, _createClass3.default)(Render, [{
        key: "init",
        value: function init() {}
    }, {
        key: "cacheParse",
        value: function cacheParse() {
            var _this = this;

            if (!(this.cache && this.handler.rule.type !== '__tmp')) {
                this.cache = this.parse();
            }
            var eventList = [].concat((0, _toConsumableArray3.default)(this.$tickEvent));
            this.$tickEvent = [];
            this.vm.$nextTick(function () {
                (0, _newArrowCheck3.default)(this, _this);

                eventList.forEach(function (event) {
                    (0, _newArrowCheck3.default)(this, _this);
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
                (0, _newArrowCheck3.default)(this, _this2);
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
                var vn = this.vm.constructor.super.compile(rule.template, {}).render.call(rule._vm || this.vm);
                (0, _util.extend)(vn.data, rule);
                vn.key = key;
                return [vn];
            } else {
                rule.ref = refName;
                var _vn = this.vNode.make(type, (0, _util.extend)({}, rule), function () {
                    (0, _newArrowCheck3.default)(this, _this3);

                    var vn = [];
                    if (childrenHandlers.length > 0) vn = childrenHandlers.map(function (handler) {
                        (0, _newArrowCheck3.default)(this, _this3);
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
                (0, _newArrowCheck3.default)(this, _this4);

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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(41);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(110);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(114);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(41);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 9 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

exports.baseRule = baseRule;
exports.creatorFactory = creatorFactory;
exports.creatorTypeFactory = creatorTypeFactory;

var _util = __webpack_require__(4);

var _vData = __webpack_require__(48);

var _vData2 = _interopRequireDefault(_vData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function baseRule() {
    return {
        event: {},
        validate: [],
        options: [],
        col: {},
        children: [],
        emit: [],
        template: null
    };
}

function creatorFactory(name) {
    var _this = this;

    return function (title, field, value) {
        var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        (0, _newArrowCheck3.default)(this, _this);
        return new Creator(name, title, field, value, props);
    }.bind(this);
}

function creatorTypeFactory(name, type) {
    var _this2 = this;

    var typeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'type';

    return function (title, field, value) {
        var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
        (0, _newArrowCheck3.default)(this, _this2);

        var maker = new Creator(name, title, field, value, props);
        if ((0, _util.isFunction)(type)) type(maker);else maker.props(typeName, type);
        return maker;
    }.bind(this);
}

var Creator = function (_VData) {
    (0, _inherits3.default)(Creator, _VData);

    function Creator(type, title, field, value) {
        var props = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
        (0, _classCallCheck3.default)(this, Creator);

        var _this3 = (0, _possibleConstructorReturn3.default)(this, (Creator.__proto__ || (0, _getPrototypeOf2.default)(Creator)).call(this));

        _this3.rule = (0, _util.extend)(baseRule(), { type: type, title: title, field: field, value: value });
        _this3.props({ hidden: false, visibility: false });
        if ((0, _util.isPlainObject)(props)) _this3.props(props);
        return _this3;
    }

    (0, _createClass3.default)(Creator, [{
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
    }]);
    return Creator;
}(_vData2.default);

exports.default = Creator;


var objAttrs = ['event', 'col'];

objAttrs.forEach(function (attr) {
    (0, _newArrowCheck3.default)(undefined, undefined);

    Creator.prototype[attr] = function (opt) {
        this.rule[attr] = (0, _util.extend)(this.rule[attr], opt);
        return this;
    };
}.bind(undefined));

var arrAttrs = ['validate', 'options', 'children', 'emit'];

arrAttrs.forEach(function (attr) {
    (0, _newArrowCheck3.default)(undefined, undefined);

    Creator.prototype[attr] = function (opt) {
        if (!Array.isArray(opt)) opt = [opt];
        this.rule[attr] = this.rule[attr].concat(opt);
        return this;
    };
}.bind(undefined));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(35)('wks');
var uid = __webpack_require__(30);
var Symbol = __webpack_require__(12).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var core = __webpack_require__(9);
var ctx = __webpack_require__(38);
var hide = __webpack_require__(21);
var has = __webpack_require__(16);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(22);
var IE8_DOM_DEFINE = __webpack_require__(53);
var toPrimitive = __webpack_require__(39);
var dP = Object.defineProperty;

exports.f = __webpack_require__(18) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(70), __esModule: true };

/***/ }),
/* 16 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(72);
var defined = __webpack_require__(31);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(24)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.componentCommon = exports.getGlobalApi = exports.formCreateStyle = exports.iviewConfig = undefined;

var _defineProperty = __webpack_require__(40);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _keys = __webpack_require__(15);

var _keys2 = _interopRequireDefault(_keys);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

exports.getComponent = getComponent;
exports.getUdfComponent = getUdfComponent;
exports.getConfig = getConfig;
exports.timeStampToDate = timeStampToDate;

var _util = __webpack_require__(4);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _componentList = __webpack_require__(63);

var _componentList2 = _interopRequireDefault(_componentList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iviewConfig = exports.iviewConfig = function () {
    var iview2 = {
        _v: 2,
        resetBtnType: 'ghost',
        resetBtnIcon: 'refresh',
        submitBtnIcon: 'ios-upload',
        fileIcon: 'document-text',
        fileUpIcon: 'folder',
        imgUpIcon: 'camera'
    };
    var iview3 = {
        _v: 3,
        resetBtnType: 'default',
        resetBtnIcon: 'md-refresh',
        submitBtnIcon: 'ios-share',
        fileIcon: 'md-document',
        fileUpIcon: 'ios-folder-open',
        imgUpIcon: 'md-images'
    };
    if (typeof iview === 'undefined') return iview2;
    return iview.version && iview.version.split('.')[0] == 3 ? iview3 : iview2;
}();

function getComponent(vm, rule, createOptions) {
    var name = rule.type.toLowerCase(),
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
                (0, _newArrowCheck3.default)(this, _this);
            }.bind(this),
            onProgress: function onProgress(event, file, fileList) {
                (0, _newArrowCheck3.default)(this, _this);
            }.bind(this),
            onSuccess: function onSuccess(response, file, fileList) {
                (0, _newArrowCheck3.default)(this, _this);
            }.bind(this),
            onError: function onError(error, file, fileList) {
                (0, _newArrowCheck3.default)(this, _this);
            }.bind(this),
            onPreview: function onPreview(file) {
                (0, _newArrowCheck3.default)(this, _this);
            }.bind(this),
            onRemove: function onRemove(file, fileList) {
                (0, _newArrowCheck3.default)(this, _this);
            }.bind(this),
            onFormatError: function onFormatError(file, fileList) {
                (0, _newArrowCheck3.default)(this, _this);
            }.bind(this),
            onExceededSize: function onExceededSize(file, fileList) {
                (0, _newArrowCheck3.default)(this, _this);
            }.bind(this),
            handleIcon: 'ios-eye-outline',
            allowRemove: true
        },
        onSubmit: function onSubmit(formData) {
            (0, _newArrowCheck3.default)(this, _this);
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
            show: true
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
            show: false
        },
        mounted: function mounted() {
            (0, _newArrowCheck3.default)(this, _this);
        }.bind(this)
    };
};

var formCreateStyle = exports.formCreateStyle = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' + ' .fc-files>.ivu-icon{vertical-align: middle;}' + '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' + '.fc-upload .ivu-upload{display: inline-block;}' + '.fc-upload-btn{border: 1px dashed #dddee1;}' + '.fc-upload .fc-upload-cover{ display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); }' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-files:hover .fc-upload-cover{ display: block; }' + '.fc-upload .ivu-upload-list-file{ display: inline-block;float: left; }' + '.fc-upload .ivu-upload-list{ position: absolute;left: 0; }' + '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

function getGlobalApi(fComponent) {
    var _this2 = this,
        _this9 = this;

    var vm = fComponent.vm;
    return {
        // core:fComponent,
        formData: function formData() {
            (0, _newArrowCheck3.default)(this, _this2);

            return (0, _keys2.default)(vm.trueData).reduce(function (initial, key) {
                (0, _newArrowCheck3.default)(this, _this2);

                initial[key] = vm.trueData[key].value;
                return initial;
            }.bind(this), {});
        }.bind(this),
        getValue: function getValue(field) {
            (0, _newArrowCheck3.default)(this, _this2);

            field = (0, _util.toString)(field);
            var handler = fComponent.handlers[field];
            if (handler === undefined) console.error(String(field) + ' \u5B57\u6BB5\u4E0D\u5B58\u5728!');else {
                return handler.getValue();
            }
        }.bind(this),
        changeField: function changeField(field, value) {
            (0, _newArrowCheck3.default)(this, _this2);

            field = (0, _util.toString)(field);
            var handler = fComponent.handlers[field];
            if (handler === undefined) console.error(String(field) + ' \u5B57\u6BB5\u4E0D\u5B58\u5728!');else {
                if ((0, _util.isFunction)(value)) value(vm.getTrueData(field), function (changeValue) {
                    (0, _newArrowCheck3.default)(this, _this2);

                    this.changeField(field, changeValue);
                }.bind(this));else {
                    handler.setTrueValue(value);
                    handler.render.sync();
                }
            }
        }.bind(this),
        removeField: function removeField(field) {
            (0, _newArrowCheck3.default)(this, _this2);

            fComponent.removeField((0, _util.toString)(field));
            vm.sync();
        }.bind(this),
        validate: function validate(successFn, errorFn) {
            (0, _newArrowCheck3.default)(this, _this2);

            fComponent.getFormRef().validate(function (valid) {
                (0, _newArrowCheck3.default)(this, _this2);

                valid === true ? successFn && successFn() : errorFn && errorFn();
            }.bind(this));
        }.bind(this),
        validateField: function validateField(field, callback) {
            (0, _newArrowCheck3.default)(this, _this2);

            fComponent.getFormRef().validateField((0, _util.toString)(field), callback);
        }.bind(this),
        resetFields: function resetFields() {
            var _this3 = this;

            var handlers = fComponent.handlers;
            (0, _keys2.default)(vm.trueData).forEach(function (key) {
                (0, _newArrowCheck3.default)(this, _this3);

                vm.$set(vm.trueData[key], 'value', handlers[key].defaultValue);
            }.bind(this));
        },
        destroy: function destroy() {
            (0, _newArrowCheck3.default)(this, _this2);

            vm.$el.parentNode.removeChild(vm.$el);
            vm.$destroy();
        }.bind(this),
        fields: function fields() {
            (0, _newArrowCheck3.default)(this, _this2);
            return fComponent.fields();
        }.bind(this),
        append: function append(rule, after) {
            (0, _newArrowCheck3.default)(this, _this2);

            fComponent.append(rule, after, false);
        }.bind(this),
        prepend: function prepend(rule, after) {
            (0, _newArrowCheck3.default)(this, _this2);

            fComponent.append(rule, after, true);
        }.bind(this),
        submit: function submit(successFn, failFn) {
            var _this4 = this;

            this.validate(function () {
                (0, _newArrowCheck3.default)(this, _this4);

                var formData = this.formData();
                if ((0, _util.isFunction)(successFn)) successFn(formData);else fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
            }.bind(this), function () {
                (0, _newArrowCheck3.default)(this, _this4);
                return failFn && failFn();
            }.bind(this));
        },
        hidden: function hidden(fields) {
            var _this5 = this;

            var hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!Array.isArray(fields)) fields = [fields];
            fields.forEach(function (field) {
                (0, _newArrowCheck3.default)(this, _this5);

                vm.$set(vm.trueData[field].rule.props, 'hidden', !!hidden);
            }.bind(this));
        },
        visibility: function visibility(fields) {
            var _this6 = this;

            var visibility = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!Array.isArray(fields)) fields = [fields];
            fields.forEach(function (field) {
                (0, _newArrowCheck3.default)(this, _this6);

                vm.$set(vm.trueData[field].rule.props, 'visibility', !!visibility);
            }.bind(this));
        },
        model: function model(fields) {
            var _this7 = this;

            var model = {};
            if (!fields) fields = this.fields();else if (!Array.isArray(fields)) fields = [fields];
            fields.forEach(function (field) {
                (0, _newArrowCheck3.default)(this, _this7);

                var handler = fComponent.handlers[field];
                if (!handler) throw new Error(String(field) + '\u5B57\u6BB5\u4E0D\u5B58\u5728');
                model[field] = handler.vm.getTrueData(field);
            }.bind(this));
            return model;
        },
        bind: function bind(fields) {
            var _this8 = this;

            var bind = {},
                vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!Array.isArray(fields)) fields = [fields];
            fields.forEach(function (field) {
                (0, _newArrowCheck3.default)(this, _this8);

                bind[field] = vm.trueData[field].value;
                (0, _defineProperty2.default)(bind, field, {
                    get: function get() {
                        (0, _newArrowCheck3.default)(this, _this8);

                        return vm.trueData[field].value;
                    }.bind(this),
                    set: function set(value) {
                        (0, _newArrowCheck3.default)(this, _this8);

                        vm.$set(vm.trueData[field], 'value', value);
                    }.bind(this),
                    enumerable: true,
                    configurable: true
                });
            }.bind(this));
            return bind;
        },

        submitStatus: function submitStatus() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            (0, _newArrowCheck3.default)(this, _this2);

            vm.changeButtonProps(props);
        }.bind(this),
        resetStatus: function resetStatus() {
            var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            (0, _newArrowCheck3.default)(this, _this2);

            vm.changeResetProps(props);
        }.bind(this),
        btn: {
            loading: function loading() {
                var _loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                (0, _newArrowCheck3.default)(this, _this9);

                vm.changeButtonProps({ loading: _loading });
            }.bind(this),
            finish: function finish() {
                this.loading(false);
            },
            disabled: function disabled() {
                var _disabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                (0, _newArrowCheck3.default)(this, _this9);

                vm.changeButtonProps({ disabled: _disabled });
            }.bind(this)
        },
        resetBtn: {
            loading: function loading() {
                var _loading2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                (0, _newArrowCheck3.default)(this, _this9);

                vm.changeResetProps({ loading: _loading2 });
            }.bind(this),
            finish: function finish() {
                this.loading(false);
            },
            disabled: function disabled() {
                var _disabled2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                (0, _newArrowCheck3.default)(this, _this9);

                vm.changeResetProps({ disabled: _disabled2 });
            }.bind(this)
        },
        closeModal: function closeModal() {
            (0, _newArrowCheck3.default)(this, _this9);

            vm.$Modal.remove();
        }.bind(this),
        set: function set(node, field, value) {
            (0, _newArrowCheck3.default)(this, _this9);

            vm.$set(node, field, value);
        }.bind(this),
        reload: function reload(rules) {
            (0, _newArrowCheck3.default)(this, _this9);

            return fComponent.reload(rules);
        }.bind(this),
        options: function options(_options) {
            (0, _newArrowCheck3.default)(this, _this9);

            (0, _util.deepExtend)(fComponent.options, _options);
            vm.sync();
        }.bind(this),
        onSuccess: function onSuccess(fn) {
            this.setOption({ onSubmit: fn });
        },

        sync: function sync(field, callback) {
            (0, _newArrowCheck3.default)(this, _this9);

            if (fComponent.handlers[field]) fComponent.handlers[field].render.sync(callback);else throw new Error(String(field) + '\u5B57\u6BB5\u4E0D\u5B58\u5728');
        }.bind(this),
        refresh: function refresh() {
            (0, _newArrowCheck3.default)(this, _this9);

            vm.refresh();
        }.bind(this),
        vm: fComponent
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
        (0, _newArrowCheck3.default)(undefined, undefined);

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
            this.$set(this.cptData, field, value);
        },
        changeTrueData: function changeTrueData(field, value) {
            this.$set(this.trueData[field], 'value', value);
        },
        getTrueDataValue: function getTrueDataValue(field) {
            return this.trueData[field].value;
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
                (0, _newArrowCheck3.default)(this, _this10);

                var unWatch = this.$watch(String(type) + '.' + String(index) + '.value', function (n) {
                    (0, _newArrowCheck3.default)(this, _this10);

                    if (this.trueData[rule.field] === undefined) return unWatch();
                    this.$set(this.trueData[rule.field], 'value', n);
                }.bind(this));
                this.watchs.push(unWatch);
            }.bind(this));
        },
        unWatch: function unWatch() {
            var _this11 = this;

            this.watchs.forEach(function (unWatch) {
                (0, _newArrowCheck3.default)(this, _this11);
                return unWatch();
            }.bind(this));
            this.watchs = [];
        },
        refresh: function refresh() {
            this.unique += 1;
        },
        sync: function sync() {
            var _this12 = this;

            if (!this._sync) this._sync = (0, _util.debounce)(function () {
                (0, _newArrowCheck3.default)(this, _this12);

                this.$nextTick(function () {
                    (0, _newArrowCheck3.default)(this, _this12);

                    this.fComponent.fRender.cacheUnique = this.unique + 1;
                    this.unique += 1;
                }.bind(this));
            }.bind(this), 100);
            this._sync();
        }
    }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _getOwnPropertyDescriptor = __webpack_require__(120);

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);

  if (desc === undefined) {
    var parent = (0, _getPrototypeOf2.default)(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(14);
var createDesc = __webpack_require__(25);
module.exports = __webpack_require__(18) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 23 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(31);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(51);
var enumBugKeys = __webpack_require__(36);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 30 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 31 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 32 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 33 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(35)('keys');
var uid = __webpack_require__(30);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(9);
var global = __webpack_require__(12);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(29) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 36 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(13);
var core = __webpack_require__(9);
var fails = __webpack_require__(24);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(75);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(23);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(76), __esModule: true };

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(78);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(88);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(22);
var dPs = __webpack_require__(82);
var enumBugKeys = __webpack_require__(36);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(54)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(83).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(14).f;
var has = __webpack_require__(16);
var TAG = __webpack_require__(11)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(11);


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(12);
var core = __webpack_require__(9);
var LIBRARY = __webpack_require__(29);
var wksExt = __webpack_require__(44);
var defineProperty = __webpack_require__(14).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 46 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(46);
var createDesc = __webpack_require__(25);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(39);
var has = __webpack_require__(16);
var IE8_DOM_DEFINE = __webpack_require__(53);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(18) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.defVData = defVData;

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        (0, _classCallCheck3.default)(this, VData);

        this.init();
    }

    (0, _createClass3.default)(VData, [{
        key: 'class',
        value: function _class(classList) {
            var _this = this;

            var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if ((0, _util.isUndef)(classList)) return this;

            if (Array.isArray(classList)) {
                classList.map(function (cls) {
                    (0, _newArrowCheck3.default)(this, _this);

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

            this._data.directives = this._data.directives.call((0, _util.toArray)(_directives));

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
    (0, _newArrowCheck3.default)(undefined, undefined);

    VData.prototype[key] = function (val) {
        this._data[key] = val;
        return this;
    };
}.bind(undefined));

objList.forEach(function (key) {
    (0, _newArrowCheck3.default)(undefined, undefined);

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
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = __webpack_require__(50);

var _stringify2 = _interopRequireDefault(_stringify);

var _keys = __webpack_require__(15);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

exports.margeGlobal = margeGlobal;
exports.parseRules = parseRules;
exports.initStyle = initStyle;

var _util = __webpack_require__(4);

var _common = __webpack_require__(19);

var _form = __webpack_require__(136);

var _form2 = _interopRequireDefault(_form);

var _formCreateComponent = __webpack_require__(137);

var _formCreateComponent2 = _interopRequireDefault(_formCreateComponent);

var _component = __webpack_require__(67);

var _maker = __webpack_require__(138);

var _maker2 = _interopRequireDefault(_maker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '1.5.0';

var formCreateStyleElId = 'form-create-style';

function margeGlobal(_options) {
    if ((0, _util.isBool)(_options.sumbitBtn)) _options.sumbitBtn = { show: _options.sumbitBtn };
    if ((0, _util.isBool)(_options.resetBtn)) _options.resetBtn = { show: _options.resetBtn };
    var options = (0, _util.deepExtend)((0, _common.getConfig)(), _options);
    options.el = !options.el ? window.document.body : (0, _util.isElement)(options.el) ? options.el : document.querySelector(options.el);

    return options;
}

function parseRules(rules) {
    var _this = this;

    var parse = {};
    rules.filter(function (rule) {
        (0, _newArrowCheck3.default)(this, _this);
        return rule.type !== undefined;
    }.bind(this)).forEach(function (rule) {
        (0, _newArrowCheck3.default)(this, _this);

        if ((0, _util.isFunction)(rule.getRule)) rule = rule.getRule();

        if (!rule.field) rule.field = '';
        parse[(0, _util.toString)(rule.field)] = rule;
    }.bind(this));

    return parse;
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
        var _this2 = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        (0, _classCallCheck3.default)(this, FormCreate);

        console.log('constructor');
        console.log(options);
        this.options = margeGlobal(options);
        console.log(this.options);
        this.rules = Array.isArray(rules) ? rules : [];
        this.rules.forEach(function (rule, index) {
            (0, _newArrowCheck3.default)(this, _this2);

            if ((0, _util.isFunction)(rule.getRule)) this.rules[index] = rule.getRule();
        }.bind(this));
        this.handlers = {};
        this.fRender = {};
        this.formData = {};
        this.validate = {};
        this.trueData = {};
        this.fieldList = [];
        initStyle();
    }

    (0, _createClass3.default)(FormCreate, [{
        key: "init",
        value: function init(vm) {
            var _this3 = this;

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
                (0, _newArrowCheck3.default)(this, _this3);
                return vm.$nextTick(fn);
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
            var _this4 = this;

            this.rules.forEach(function (rule) {
                (0, _newArrowCheck3.default)(this, _this4);

                // rule.field = rule.field === undefined ? '' : toString(rule.field);
                if (this.notField(rule.field)) {
                    var handler = (0, _common.getComponent)(this.vm, rule, this.options);
                    this.createChildren(handler);
                    this.setHandler(handler);
                    this.fieldList.push(handler.field);
                } else {
                    console.error(String(rule.field) + " \u5B57\u6BB5\u5DF2\u5B58\u5728");
                }
            }.bind(this));
        }
    }, {
        key: "createChildren",
        value: function createChildren(handler) {
            var _this5 = this;

            if (Array.isArray(handler.rule.children) && handler.rule.children.length > 0) {
                handler.rule.children.map(function (rule) {
                    (0, _newArrowCheck3.default)(this, _this5);

                    if ((0, _util.isFunction)(rule.getRule)) rule = rule.getRule();
                    rule.field = rule.field === undefined ? '' : (0, _util.toString)(rule.field);
                    if (this.notField(rule.field)) {
                        var _handler = (0, _common.getComponent)(this.vm, rule, this.options);
                        this.createChildren(_handler);
                        handler.childrenHandlers.push(_handler);
                    } else {
                        console.error(String(rule.field) + " \u5B57\u6BB5\u5DF2\u5B58\u5728");
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
            var _this6 = this;

            this.vm = vm;
            vm.$nextTick(function () {
                (0, _newArrowCheck3.default)(this, _this6);

                (0, _keys2.default)(this.handlers).map(function (field) {
                    (0, _newArrowCheck3.default)(this, _this6);

                    var handler = this.handlers[field];
                    console.log(vm.cptData[field] !== undefined, field);
                    if (vm.cptData[field] !== undefined) this.addHandlerWatch(handler);
                    handler.mounted();
                }.bind(this));
                console.log(this.options);
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
            var _this7 = this;

            if ((0, _util.isFunction)(rule.getRule)) rule = rule.getRule();
            if ((0, _keys2.default)(this.handlers).indexOf((0, _util.toString)(rule.field)) !== -1) throw new Error(String(rule.field) + "\u5B57\u6BB5\u5DF2\u5B58\u5728");
            var handler = (0, _common.getComponent)(this.vm, rule, this.options);
            this.createChildren(handler);
            this.vm.setField(handler.field);
            this.fRender.setRender(handler, after || '', pre);
            this.setHandler(handler);
            this.addHandlerWatch(handler);
            handler.render.sync(function () {
                (0, _newArrowCheck3.default)(this, _this7);

                handler.mounted();
            }.bind(this));
        }
    }, {
        key: "removeField",
        value: function removeField(field) {
            var _this8 = this;

            if (this.handlers[field] === undefined) throw new Error(String(field) + "\u5B57\u6BB5\u4E0D\u5B58\u5728");
            var watch = this.handlers[field].watch;

            // this.trueData[field] && (this.trueData[field].rule.props.hidden = true);
            delete this.handlers[field];
            delete this.validate[field];
            watch && watch.forEach(function (unWatch) {
                (0, _newArrowCheck3.default)(this, _this8);
                return unWatch();
            }.bind(this));
            this.vm.removeFormData(field);
            this.fRender.removeRender(field);
            delete this.formData[field];
            delete this.trueData[field];
            // render.cache = null;
            // this.vm.refresh();
        }
    }, {
        key: "addHandlerWatch",
        value: function addHandlerWatch(handler) {
            var _this9 = this;

            if (handler.noValue === true) return;
            var field = handler.field;

            var unWatch = this.vm.$watch("cptData." + String(field), (0, _util.debounce)(function (n, o) {
                (0, _newArrowCheck3.default)(this, _this9);

                if (this.handlers[field] !== undefined) {
                    var trueValue = handler.toTrueValue(n),
                        json = (0, _stringify2.default)(trueValue);
                    if (this.vm.jsonData[field] !== json) {
                        this.vm.jsonData[field] = json;
                        handler.setTrueValue(trueValue);
                        handler.watchParseValue(n);
                    }
                } else unWatch();
            }.bind(this), 50), { deep: true });

            var unWatch2 = this.vm.$watch("trueData." + String(field) + ".value", (0, _util.debounce)(function (n, o) {
                (0, _newArrowCheck3.default)(this, _this9);

                if (n === undefined) return;
                if (this.handlers[field] !== undefined) {
                    var json = (0, _stringify2.default)(n);
                    if (this.vm.jsonData[field] !== json) {
                        this.vm.jsonData[field] = json;
                        handler.watchTrueValue(n);
                        this.vm.changeFormData(handler.toParseValue(n));
                        this.vm.$nextTick(function () {
                            (0, _newArrowCheck3.default)(this, _this9);
                            return handler.render.sync();
                        }.bind(this));
                    }
                } else unWatch2();
            }.bind(this), 50), { deep: true });

            handler.watch = [unWatch, unWatch2];

            var bind = (0, _util.debounce)(function (n, o) {
                (0, _newArrowCheck3.default)(this, _this9);

                console.trace('---------------chage---------------');
                if (this.handlers[field] !== undefined) {
                    this.$tick(function () {
                        (0, _newArrowCheck3.default)(this, _this9);
                        return handler.render.sync();
                    }.bind(this));
                } else unWatch();
            }.bind(this), 100);

            (0, _keys2.default)(this.vm.trueData[field].rule).map(function (key) {
                (0, _newArrowCheck3.default)(this, _this9);

                if (key === 'value') return;
                var unWatch = this.vm.$watch("trueData." + String(field) + ".rule." + String(key), bind, { deep: true });
                handler.watch.push(unWatch);
            }.bind(this));
        }
    }, {
        key: "reload",
        value: function reload(rules) {
            var _this10 = this;

            if (!rules) {
                this.vm.refresh();
            } else {
                this.vm.unWatch();
                (0, _keys2.default)(this.handlers).forEach(function (field) {
                    (0, _newArrowCheck3.default)(this, _this10);
                    return this.removeField(field);
                }.bind(this));
                this.vm.isShow = false;
                this.constructor(rules, this.options);
                this.init(this.vm);
                this.vm.init();
                this.vm.$nextTick(function () {
                    (0, _newArrowCheck3.default)(this, _this10);

                    this.vm.isShow = true;
                    setTimeout(function () {
                        (0, _newArrowCheck3.default)(this, _this10);
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
            return (0, _keys2.default)(this.formData);
        }
    }], [{
        key: "create",
        value: function create(rules) {
            var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var _vue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.Vue;

            var opt = (0, _util.isElement)(_opt) ? { el: _opt } : _opt;
            var fComponent = new FormCreate(rules, opt),
                $vm = fComponent.create(_vue);
            return fComponent.fCreateApi;
        }
    }, {
        key: "install",
        value: function install(Vue) {
            console.trace('install');
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

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(69), __esModule: true };

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(16);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(73)(false);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(33);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(18) && !__webpack_require__(24)(function () {
  return Object.defineProperty(__webpack_require__(54)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(23);
var document = __webpack_require__(12).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(80)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(56)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(29);
var $export = __webpack_require__(13);
var redefine = __webpack_require__(57);
var hide = __webpack_require__(21);
var Iterators = __webpack_require__(26);
var $iterCreate = __webpack_require__(81);
var setToStringTag = __webpack_require__(43);
var getPrototypeOf = __webpack_require__(58);
var ITERATOR = __webpack_require__(11)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(21);


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(16);
var toObject = __webpack_require__(27);
var IE_PROTO = __webpack_require__(34)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 59 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(51);
var hiddenKeys = __webpack_require__(36).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(98);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _keys = __webpack_require__(15);

var _keys2 = _interopRequireDefault(_keys);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

exports.parseVData = parseVData;
exports.getVNode = getVNode;

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseVData(data) {
    if ((0, _util.isString)(data)) data = { domProps: { innerHTML: data } };else if (data && (0, _util.isFunction)(data.get)) data = data.get();

    return data;
}

function getVNode(VNode) {
    return (0, _util.isFunction)(VNode) ? VNode() : VNode || [];
}

var VNode = function () {
    function VNode(vm) {
        (0, _classCallCheck3.default)(this, VNode);

        this.setVm(vm);
    }

    (0, _createClass3.default)(VNode, [{
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
    tree: 'Tree'
};

(0, _keys2.default)(nodes).forEach(function (k) {
    (0, _newArrowCheck3.default)(undefined, undefined);

    VNode.prototype[k] = function (data, VNodeFn) {
        return this.make(nodes[k], data, VNodeFn);
    };
}.bind(undefined));

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hidden = __webpack_require__(107);

var _hidden2 = _interopRequireDefault(_hidden);

var _input = __webpack_require__(117);

var _input2 = _interopRequireDefault(_input);

var _radio = __webpack_require__(118);

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = __webpack_require__(119);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _switch = __webpack_require__(123);

var _switch2 = _interopRequireDefault(_switch);

var _select = __webpack_require__(124);

var _select2 = _interopRequireDefault(_select);

var _datePicker = __webpack_require__(125);

var _datePicker2 = _interopRequireDefault(_datePicker);

var _timePicker = __webpack_require__(126);

var _timePicker2 = _interopRequireDefault(_timePicker);

var _inputNumber = __webpack_require__(127);

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _colorPicker = __webpack_require__(130);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _upload = __webpack_require__(66);

var _upload2 = _interopRequireDefault(_upload);

var _cascader = __webpack_require__(131);

var _cascader2 = _interopRequireDefault(_cascader);

var _rate = __webpack_require__(132);

var _rate2 = _interopRequireDefault(_rate);

var _slider = __webpack_require__(133);

var _slider2 = _interopRequireDefault(_slider);

var _frame = __webpack_require__(134);

var _frame2 = _interopRequireDefault(_frame);

var _tree = __webpack_require__(135);

var _tree2 = _interopRequireDefault(_tree);

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
    tree: _tree2.default
};

exports.default = componentList;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(40);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(128), __esModule: true };

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = __webpack_require__(61);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.getFileName = getFileName;
exports.parseValue = parseValue;

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(4);

var _common = __webpack_require__(19);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
        key: "init",
        value: function init() {
            var props = this.rule.props;
            props.defaultFileList = [];
            props.showUploadList = false;
            props.uploadType = !props.uploadType ? 'file' : props.uploadType;
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
                (0, _newArrowCheck3.default)(this, _this2);
                return this.push(file);
            }.bind(this));
            this.rule.props.defaultFileList = this.parseValue;
            return this.parseValue;
        }
    }, {
        key: "mounted",
        value: function mounted() {
            (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "mounted", this).call(this);
            // this.el.fileList = this.parseValue;
            console.log(this.el);
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
                (0, _newArrowCheck3.default)(this, _this3);
                return file.url;
            }.bind(this)).filter(function (file) {
                (0, _newArrowCheck3.default)(this, _this3);
                return file !== undefined;
            }.bind(this));
            return this.rule.props.maxLength <= 1 ? files[0] || '' : files;
        }
    }, {
        key: "changeParseValue",
        value: function changeParseValue(parseValue) {
            this.parseValue = parseValue;
            this.vm.changeFormData(this.field, parseValue);
            this.vm.getTrueData(this.field).rule.props.defaultFileList = parseValue;
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
                (0, _newArrowCheck3.default)(this, _this4);

                b = b && (pic.percentage === undefined || pic.status === 'finished');
            }.bind(this));
            if (b) (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "watchTrueValue", this).call(this, n);
        }
    }]);
    return handler;
}(_handler2.default);

//const propsEventType = ['beforeUpload','onProgress','onPreview','onRemove','onFormatError','onExceededSize','onError'];

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "init",
        value: function init() {
            var _this6 = this;

            var handler = this.handler;
            this.uploadOptions = (0, _util.extend)((0, _util.extend)({}, this.options.upload), this.handler.rule.props);
            this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
            this.propsData = this.vData.props(this.uploadOptions).props('onSuccess', function () {
                (0, _newArrowCheck3.default)(this, _this6);
                return this.onSuccess.apply(this, arguments);
            }.bind(this)).ref(handler.refName).key("fip" + String(handler.unique)).get();
        }
    }, {
        key: "onSuccess",
        value: function onSuccess(response, file, fileList) {
            var url = this.uploadOptions.onSuccess.call(null, response, file, fileList);
            if (!(0, _util.isUndef)(url)) {
                fileList.push({
                    url: url,
                    name: getFileName(url)
                });
                this.handler.changeParseValue(this.handler.el.fileList);
                this.sync();
            }
        }
    }, {
        key: "defaultOnHandle",
        value: function defaultOnHandle(src) {
            var _this7 = this;

            this.vm.$Modal.remove();
            setTimeout(function () {
                (0, _newArrowCheck3.default)(this, _this7);

                this.vm.$Modal.info({
                    title: "预览",
                    render: function render(h) {
                        (0, _newArrowCheck3.default)(this, _this7);

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
            console.log(this.uploadOptions);
            if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'ios-eye-outline';
            var value = this.vm.cptData[this.handler.field],
                render = [].concat((0, _toConsumableArray3.default)(value.map(function (file, index) {
                (0, _newArrowCheck3.default)(this, _this8);

                if (file.status === undefined || file.status === 'finished') {
                    return this.makeUploadView(file.url, "" + String(index) + String(unique), index);
                } else if (file.showProgress) {
                    return this.makeProgress(file, "" + String(index) + String(unique));
                }
            }.bind(this))));
            render.push(this.makeUploadBtn(unique, !this.uploadOptions.maxLength || this.uploadOptions.maxLength > this.vm.cptData[this.handler.field].length));
            return [this.vNode.make('div', { key: "div4" + String(unique), class: { 'fc-upload': true } }, render)];
        }
    }, {
        key: "makeUploadView",
        value: function makeUploadView(src, key, index) {
            var _this9 = this;

            return this.vNode.make('div', { key: "div1" + String(key), class: { 'fc-files': true } }, function () {
                (0, _newArrowCheck3.default)(this, _this9);

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
                (0, _newArrowCheck3.default)(this, _this10);

                var icon = [];
                if (!!this.uploadOptions.handleIcon) icon.push(this.makeHandleIcon(src, key, index));
                if (this.uploadOptions.allowRemove === true) icon.push(this.makeRemoveIcon(src, key, index));
                return icon;
            }.bind(this));
        }
    }, {
        key: "makeProgress",
        value: function makeProgress(file, unique) {
            return this.vNode.make('div', { key: "div3" + String(unique), class: { 'fc-files': true } }, [this.vNode.progress({ key: "upp" + String(unique), props: { percent: file.percentage, hideInfo: true } })]);
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
                        (0, _newArrowCheck3.default)(this, _this11);

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
                        (0, _newArrowCheck3.default)(this, _this12);

                        this.onHandle(src);
                    }.bind(this)
                }
            });
        }
    }]);
    return render;
}(_render2.default);

var maker = {
    image: (0, _creator.creatorTypeFactory)(name, 'image', 'uploadType'),
    file: (0, _creator.creatorTypeFactory)(name, 'file', 'uploadType')
};

exports.default = { handler: handler, render: render, maker: maker, name: name };

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formCreateName = exports.$FormCreate = undefined;

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _formCreate = __webpack_require__(49);

var _formCreate2 = _interopRequireDefault(_formCreate);

var _common = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formCreateName = 'FormCreate';

var $FormCreate = function () {
    (0, _newArrowCheck3.default)(undefined, undefined);
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
                    (0, _newArrowCheck3.default)(undefined, undefined);

                    return {};
                }.bind(undefined)
            },
            option: {
                type: Object,
                default: function _default() {
                    (0, _newArrowCheck3.default)(undefined, undefined);

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
                (0, _newArrowCheck3.default)(this, _this);

                this.fComponent.reload(n);
            }.bind(this));
            this.init();
        }
    };
}.bind(undefined);

exports.$FormCreate = $FormCreate;
exports.formCreateName = formCreateName;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _formCreate = __webpack_require__(49);

var _formCreate2 = _interopRequireDefault(_formCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(_formCreate2.default);
}

module.exports.default = module.exports = _formCreate2.default;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(9);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(71);
module.exports = __webpack_require__(9).Object.keys;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(27);
var $keys = __webpack_require__(28);

__webpack_require__(37)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(32);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(52);
var toAbsoluteIndex = __webpack_require__(74);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 75 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(77);
var $Object = __webpack_require__(9).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(13);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(18), 'Object', { defineProperty: __webpack_require__(14).f });


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(79), __esModule: true };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
__webpack_require__(84);
module.exports = __webpack_require__(44).f('iterator');


/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(33);
var defined = __webpack_require__(31);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(42);
var descriptor = __webpack_require__(25);
var setToStringTag = __webpack_require__(43);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(21)(IteratorPrototype, __webpack_require__(11)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(14);
var anObject = __webpack_require__(22);
var getKeys = __webpack_require__(28);

module.exports = __webpack_require__(18) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(12).document;
module.exports = document && document.documentElement;


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(85);
var global = __webpack_require__(12);
var hide = __webpack_require__(21);
var Iterators = __webpack_require__(26);
var TO_STRING_TAG = __webpack_require__(11)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(86);
var step = __webpack_require__(87);
var Iterators = __webpack_require__(26);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(56)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(89), __esModule: true };

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(90);
__webpack_require__(95);
__webpack_require__(96);
__webpack_require__(97);
module.exports = __webpack_require__(9).Symbol;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(12);
var has = __webpack_require__(16);
var DESCRIPTORS = __webpack_require__(18);
var $export = __webpack_require__(13);
var redefine = __webpack_require__(57);
var META = __webpack_require__(91).KEY;
var $fails = __webpack_require__(24);
var shared = __webpack_require__(35);
var setToStringTag = __webpack_require__(43);
var uid = __webpack_require__(30);
var wks = __webpack_require__(11);
var wksExt = __webpack_require__(44);
var wksDefine = __webpack_require__(45);
var enumKeys = __webpack_require__(92);
var isArray = __webpack_require__(93);
var anObject = __webpack_require__(22);
var isObject = __webpack_require__(23);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(39);
var createDesc = __webpack_require__(25);
var _create = __webpack_require__(42);
var gOPNExt = __webpack_require__(94);
var $GOPD = __webpack_require__(47);
var $DP = __webpack_require__(14);
var $keys = __webpack_require__(28);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(60).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(46).f = $propertyIsEnumerable;
  __webpack_require__(59).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(29)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(21)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(30)('meta');
var isObject = __webpack_require__(23);
var has = __webpack_require__(16);
var setDesc = __webpack_require__(14).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(24)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(28);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(46);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(32);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(60).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 95 */
/***/ (function(module, exports) {



/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('asyncIterator');


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(45)('observable');


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(55);
__webpack_require__(100);
module.exports = __webpack_require__(9).Array.from;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(38);
var $export = __webpack_require__(13);
var toObject = __webpack_require__(27);
var call = __webpack_require__(101);
var isArrayIter = __webpack_require__(102);
var toLength = __webpack_require__(52);
var createProperty = __webpack_require__(103);
var getIterFn = __webpack_require__(104);

$export($export.S + $export.F * !__webpack_require__(106)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(22);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(26);
var ITERATOR = __webpack_require__(11)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(14);
var createDesc = __webpack_require__(25);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(105);
var ITERATOR = __webpack_require__(11)('iterator');
var Iterators = __webpack_require__(26);
module.exports = __webpack_require__(9).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(32);
var TAG = __webpack_require__(11)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(11)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(64);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "hidden";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    return handler;
}(_handler2.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            return [];
        }
    }]);
    return render;
}(_render2.default);

var maker = (0, _defineProperty3.default)({}, name, function (field, value) {
    (0, _newArrowCheck3.default)(undefined, undefined);
    return (0, _creator.creatorFactory)(name)('', field, value);
}.bind(undefined));

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(109);
module.exports = __webpack_require__(9).Object.getPrototypeOf;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(27);
var $getPrototypeOf = __webpack_require__(58);

__webpack_require__(37)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(111), __esModule: true };

/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(112);
module.exports = __webpack_require__(9).Object.setPrototypeOf;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(13);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(113).set });


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(23);
var anObject = __webpack_require__(22);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(38)(Function.call, __webpack_require__(47).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(115), __esModule: true };

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(116);
var $Object = __webpack_require__(9).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(13);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(42) });


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.render = exports.handler = undefined;

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(10);

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "input";

var handler = exports.handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
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
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.input(this.inputProps().get())];
        }
    }]);
    return render;
}(_render2.default);

var maker = ['password', 'url', 'email', 'text'].reduce(function (initial, type) {
    (0, _newArrowCheck3.default)(undefined, undefined);

    initial[type] = (0, _creator.creatorTypeFactory)(name, type);
    return initial;
}.bind(undefined), {});

maker.idate = (0, _creator.creatorTypeFactory)(name, 'date');

exports.default = { render: render, handler: handler, name: name, maker: maker };

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler2 = __webpack_require__(5);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "radio";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var _this2 = this;

            return this.rule.options.filter(function (opt) {
                (0, _newArrowCheck3.default)(this, _this2);
                return opt.value === value;
            }.bind(this)).reduce(function (initial, opt) {
                (0, _newArrowCheck3.default)(this, _this2);
                return opt.label;
            }.bind(this), '');
        }
    }, {
        key: "toTrueValue",
        value: function toTrueValue(parseValue) {
            var _this3 = this;

            return this.rule.options.filter(function (opt) {
                (0, _newArrowCheck3.default)(this, _this3);
                return opt.label === parseValue;
            }.bind(this)).reduce(function (initial, opt) {
                (0, _newArrowCheck3.default)(this, _this3);
                return opt.value;
            }.bind(this), '');
        }
    }]);
    return handler;
}(_handler3.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            var _this5 = this;

            var _handler = this.handler,
                unique = _handler.unique,
                options = _handler.rule.options;

            return [this.vNode.radioGroup(this.inputProps().get(), function () {
                (0, _newArrowCheck3.default)(this, _this5);
                return options.map(function (option, index) {
                    (0, _newArrowCheck3.default)(this, _this5);

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
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler2 = __webpack_require__(5);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "checkbox";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var _this2 = this;

            if (!value) value = [];else if (!Array.isArray(value)) value = [value];
            return this.rule.options.filter(function (opt) {
                (0, _newArrowCheck3.default)(this, _this2);
                return value.indexOf(opt.value) !== -1;
            }.bind(this)).map(function (option) {
                (0, _newArrowCheck3.default)(this, _this2);
                return option.label;
            }.bind(this));
        }
    }, {
        key: "toTrueValue",
        value: function toTrueValue(parseValue) {
            var _this3 = this;

            var value = this.rule.options.filter(function (opt) {
                (0, _newArrowCheck3.default)(this, _this3);
                return parseValue.indexOf(opt.label) !== -1;
            }.bind(this)).map(function (opt) {
                (0, _newArrowCheck3.default)(this, _this3);
                return opt.value;
            }.bind(this));
            if (this.rule.options.length === 1) return value[0] === undefined ? '' : value[0];else return value;
        }
    }, {
        key: "watchParseValue",
        value: function watchParseValue(n) {
            (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "watchParseValue", this).call(this, n);
            this.render.sync();
        }
    }]);
    return handler;
}(_handler3.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            var _this5 = this;

            var _handler = this.handler,
                unique = _handler.unique,
                options = _handler.rule.options,
                key = _handler.key;

            return [this.vNode.checkboxGroup(this.inputProps().key(key).get(), function () {
                (0, _newArrowCheck3.default)(this, _this5);
                return options.map(function (option, index) {
                    (0, _newArrowCheck3.default)(this, _this5);

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
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(121), __esModule: true };

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(122);
var $Object = __webpack_require__(9).Object;
module.exports = function getOwnPropertyDescriptor(it, key) {
  return $Object.getOwnPropertyDescriptor(it, key);
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(17);
var $getOwnPropertyDescriptor = __webpack_require__(47).f;

__webpack_require__(37)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "switch";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
        key: "init",
        value: function init() {
            if (this.rule.slot === undefined) this.rule.slot = {};
        }
    }]);
    return handler;
}(_handler2.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            var _this3 = this;

            var slot = this.handler.rule.slot;

            this.propsData = this.inputProps().scopedSlots({
                open: function open() {
                    (0, _newArrowCheck3.default)(this, _this3);
                    return slot.open;
                }.bind(this),
                close: function close() {
                    (0, _newArrowCheck3.default)(this, _this3);
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
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler2 = __webpack_require__(5);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "select";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var isArr = Array.isArray(value);
            if (this.rule.props.multiple === true) return isArr === true ? value : [value];else return isArr === true ? value[0] || '' : value;
        }
    }]);
    return handler;
}(_handler3.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            var _this3 = this;

            var _handler = this.handler,
                unique = _handler.unique,
                options = _handler.rule.options;

            return [this.vNode.select(this.inputProps().get(), function () {
                (0, _newArrowCheck3.default)(this, _this3);
                return options.map(function (option, index) {
                    (0, _newArrowCheck3.default)(this, _this3);
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
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _common = __webpack_require__(19);

var _creator = __webpack_require__(10);

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "datePicker";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
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
                        (0, _newArrowCheck3.default)(this, _this2);
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
            console.log(parseValue, value);
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
            (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "mounted", this).call(this);
            this.rule.value = this.el.publicStringValue;
            this.vm.changeFormData(this.field, this.toParseValue(this.el.publicStringValue));
        }
    }]);
    return handler;
}(_handler2.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.datePicker(this.inputProps().key(this.handler.key).get())];
        }
    }]);
    return render;
}(_render2.default);

var maker = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce(function (initial, type) {
    (0, _newArrowCheck3.default)(undefined, undefined);

    initial[type] = (0, _creator.creatorTypeFactory)(name, type.toLowerCase());
    return initial;
}.bind(undefined), {});

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.getTime = getTime;

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(4);

var _common = __webpack_require__(19);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'timePicker';

function getTime(date) {
    return (0, _util.isDate)(date) ? (0, _util.dateFormat)('hh:mm:ss', date) : date;
}

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
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
                        (0, _newArrowCheck3.default)(this, _this2);
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
            (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "mounted", this).call(this);
            this.rule.value = this.el.publicStringValue;
            this.vm.changeFormData(this.field, this.toParseValue(this.el.publicStringValue));
        }
    }]);
    return handler;
}(_handler2.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
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
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isNan = __webpack_require__(65);

var _isNan2 = _interopRequireDefault(_isNan);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "inputNumber";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            console.log(value);
            var parseValue = parseFloat(value);
            if ((0, _isNan2.default)(parseValue)) parseValue = 0;
            return parseValue;
        }
    }]);
    return handler;
}(_handler2.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
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
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(129);
module.exports = __webpack_require__(9).Number.isNaN;


/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(13);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "colorPicker";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
        key: "watchParseValue",
        value: function watchParseValue(n) {
            (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "watchParseValue", this).call(this, n);
            this.render.sync();
        }
    }]);
    return handler;
}(_handler2.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
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
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = 'cascader';

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
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
            (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "mounted", this).call(this);
            this.vm.changeFormData(this.field, this.toParseValue(this.el.value));
        }
    }]);
    return handler;
}(_handler2.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.cascader(this.inputProps().get())];
        }
    }]);
    return render;
}(_render2.default);

exports.default = { handler: handler, render: render, name: name };

/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isNan = __webpack_require__(65);

var _isNan2 = _interopRequireDefault(_isNan);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var name = "rate";

var handler = function (_Handler) {
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
        key: "toParseValue",
        value: function toParseValue(value) {
            var parseValue = parseFloat(value);
            if ((0, _isNan2.default)(parseValue)) parseValue = 0;
            return parseValue;
        }
    }]);
    return handler;
}(_handler2.default);

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            return [this.vNode.rate(this.inputProps().get())];
        }
    }]);
    return render;
}(_render2.default);

exports.default = { handler: handler, render: render, name: name };

/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
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
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
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
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(15);

var _keys2 = _interopRequireDefault(_keys);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _get2 = __webpack_require__(20);

var _get3 = _interopRequireDefault(_get2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.parseRule = parseRule;

var _handler = __webpack_require__(5);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(4);

var _upload = __webpack_require__(66);

var _upload2 = _interopRequireDefault(_upload);

var _common = __webpack_require__(19);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
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
            (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "watchTrueValue", this).call(this, n);
            this.render.sync();
        }
    }, {
        key: "watchParseValue",
        value: function watchParseValue(n) {
            (0, _get3.default)(handler.prototype.__proto__ || (0, _getPrototypeOf2.default)(handler.prototype), "watchParseValue", this).call(this, n);
            this.parseValue = n;
            this.render.sync();
        }
    }]);
    return handler;
}(_handler2.default);

var eventList = { onOpen: 'on-open', onChange: 'on-change', onCancel: 'on-cancel', onOk: 'on-ok' };

var render = function (_Render) {
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "init",
        value: function init() {
            var _this3 = this;

            var field = this.handler.field;
            this.vm.$watch("cptData." + String(field), function () {
                (0, _newArrowCheck3.default)(this, _this3);

                this.onChange();
            }.bind(this), { deep: true });
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
                (0, _newArrowCheck3.default)(this, _this4);

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
                (0, _newArrowCheck3.default)(this, _this5);

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
                (0, _newArrowCheck3.default)(this, _this6);

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
                        (0, _newArrowCheck3.default)(this, _this7);

                        this.showModel();
                    }.bind(this)
                }
            }, [this.vNode.icon({ key: "ifbi" + String(unique), props: { type: this._props.icon, size: 20 } })]);
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
                (0, _newArrowCheck3.default)(this, _this8);

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
                        (0, _newArrowCheck3.default)(this, _this9);

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
                        (0, _newArrowCheck3.default)(this, _this10);

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
                (0, _newArrowCheck3.default)(this, _this11);

                this.vm.$Modal.confirm({
                    title: title,
                    render: function render() {
                        (0, _newArrowCheck3.default)(this, _this11);
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
                                'load': function load() {
                                    (0, _newArrowCheck3.default)(this, _this11);

                                    if (this._props.spin === true) {
                                        var spin = document.getElementsByClassName('fc-spin')[0];
                                        spin && spin.parentNode.removeChild(spin);
                                    }
                                }.bind(this)
                            },
                            key: 'ifmd' + (0, _util.uniqueId)()
                        })];
                    }.bind(this),
                    onOk: function onOk() {
                        (0, _newArrowCheck3.default)(this, _this11);

                        return this.onOk();
                    }.bind(this),
                    onCancel: function onCancel() {
                        (0, _newArrowCheck3.default)(this, _this11);

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
(0, _keys2.default)(eventList).forEach(function (k) {
    (0, _newArrowCheck3.default)(undefined, undefined);

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

var maker = (0, _keys2.default)(types).reduce(function (initial, key) {
    (0, _newArrowCheck3.default)(undefined, undefined);

    initial[key] = (0, _creator.creatorTypeFactory)(name, function (m) {
        (0, _newArrowCheck3.default)(undefined, undefined);
        return m.props({ type: types[key][0], maxLength: types[key][1] });
    }.bind(undefined));
    return initial;
}.bind(undefined), {});

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(64);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _keys = __webpack_require__(15);

var _keys2 = _interopRequireDefault(_keys);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _getPrototypeOf = __webpack_require__(3);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = __webpack_require__(7);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(8);

var _inherits3 = _interopRequireDefault(_inherits2);

exports.parseRule = parseRule;
exports.isMultiple = isMultiple;

var _handler2 = __webpack_require__(5);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(6);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(4);

var _creator = __webpack_require__(10);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    (0, _inherits3.default)(handler, _Handler);

    function handler() {
        (0, _classCallCheck3.default)(this, handler);
        return (0, _possibleConstructorReturn3.default)(this, (handler.__proto__ || (0, _getPrototypeOf2.default)(handler)).apply(this, arguments));
    }

    (0, _createClass3.default)(handler, [{
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
                (0, _newArrowCheck3.default)(this, _this2);
                return this.selected(v);
            }.bind(this) : function (v) {
                (0, _newArrowCheck3.default)(this, _this2);
                return this.checked(v);
            }.bind(this));
            var value = [],
                props = this.rule.props;
            props.type === 'selected' ? (0, _keys2.default)(this._data).forEach(function (key) {
                (0, _newArrowCheck3.default)(this, _this2);

                var node = this._data[key];
                if (node.selected === true) value.push(node.id);
            }.bind(this)) : (0, _keys2.default)(this._data).forEach(function (key) {
                (0, _newArrowCheck3.default)(this, _this2);

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

            rule.props.type === 'selected' ? (0, _keys2.default)(_data).forEach(function (key) {
                (0, _newArrowCheck3.default)(this, _this3);

                this.vm.$set(_data[key], 'selected', value.indexOf(_data[key].id) !== -1);
            }.bind(this)) : (0, _keys2.default)(_data).forEach(function (key) {
                (0, _newArrowCheck3.default)(this, _this3);

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
                (0, _newArrowCheck3.default)(this, _this4);

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
                (0, _newArrowCheck3.default)(this, _this5);

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
                (0, _newArrowCheck3.default)(this, _this6);

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
    (0, _inherits3.default)(render, _Render);

    function render() {
        (0, _classCallCheck3.default)(this, render);
        return (0, _possibleConstructorReturn3.default)(this, (render.__proto__ || (0, _getPrototypeOf2.default)(render)).apply(this, arguments));
    }

    (0, _createClass3.default)(render, [{
        key: "parse",
        value: function parse() {
            var _this8 = this,
                _vData$on$on;

            var _handler = this.handler,
                rule = _handler.rule,
                refName = _handler.refName,
                field = _handler.field,
                unique = _handler.unique,
                props = this.vData.on(rule.event).on((_vData$on$on = {}, (0, _defineProperty3.default)(_vData$on$on, event.s, function (v) {
                (0, _newArrowCheck3.default)(this, _this8);

                this.vm.changeFormData(field, this.handler.toValue());
                rule.event[event.s] && rule.event[event.s](v);
            }.bind(this)), (0, _defineProperty3.default)(_vData$on$on, event.c, function (v) {
                (0, _newArrowCheck3.default)(this, _this8);

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

var maker = (0, _keys2.default)(types).reduce(function (initial, key) {
    (0, _newArrowCheck3.default)(undefined, undefined);

    initial[key] = (0, _creator.creatorTypeFactory)(name, types[key]);
    return initial;
}.bind(undefined), {});

exports.default = { handler: handler, render: render, name: name, maker: maker };

/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

exports.getRenders = getRenders;
exports.preventDefault = preventDefault;

var _util = __webpack_require__(4);

var _vNode = __webpack_require__(62);

var _vNode2 = _interopRequireDefault(_vNode);

var _vData = __webpack_require__(48);

var _vData2 = _interopRequireDefault(_vData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRenders(handlers, renderSort) {
    var _this = this;

    return renderSort.reduce(function (initial, field) {
        (0, _newArrowCheck3.default)(this, _this);

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
        (0, _classCallCheck3.default)(this, Form);

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

    (0, _createClass3.default)(Form, [{
        key: "parse",
        value: function parse(vm) {
            var _this2 = this;

            this.vNode.setVm(vm);
            if (!vm.isShow) return;
            console.log('parse----------------');
            if (this.cacheUnique !== vm.unique) {
                this.renderSort.map(function (field) {
                    (0, _newArrowCheck3.default)(this, _this2);

                    this.renders[field].clearCache();
                }.bind(this));
                this.cacheUnique = vm.unique;
            }
            var unique = this.unique,
                propsData = this.vData.props(this.options.form).props(this.form).ref(this.refName).nativeOn({ submit: preventDefault }).class('form-create', true).key(unique).get(),
                vn = this.renderSort.map(function (field) {
                (0, _newArrowCheck3.default)(this, _this2);
                var render = this.renders[field],
                    _render$handler = render.handler,
                    key = _render$handler.key,
                    type = _render$handler.type;
                if (type === 'hidden') return;
                return this.makeFormItem(render.handler, render.cacheParse(), "fItem" + String(key) + String(unique));
            }.bind(this));
            if (vn.length > 0) vn.push(this.makeFormBtn(unique));
            return this.vNode.form(propsData, [this.vNode.row({ props: this.options.row || {} }, vn)]);
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
                }, key: String(fItemUnique) + "col"
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

            return this.vNode.col({ props: { span: 24 } }, btn);
        }
    }, {
        key: "makeResetBtn",
        value: function makeResetBtn(unique, span) {
            var _this3 = this;

            return this.vNode.col({ props: { span: span, push: 1 } }, [this.vNode.button({
                key: "frsbtn" + String(unique), props: this.vm.resetProps, on: {
                    "click": function click() {
                        (0, _newArrowCheck3.default)(this, _this3);

                        this.fCreateApi.resetFields();
                    }.bind(this)
                }
            }, [this.vNode.span(this.vm.resetProps.innerText)])]);
        }
    }, {
        key: "makeSubmitBtn",
        value: function makeSubmitBtn(unique, span) {
            var _this4 = this;

            return this.vNode.col({ props: { span: span } }, [this.vNode.button({
                key: "fbtn" + String(unique), props: this.vm.buttonProps, on: {
                    "click": function click() {
                        (0, _newArrowCheck3.default)(this, _this4);

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
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

exports.default = formCreateComponent;

var _component = __webpack_require__(67);

var _common = __webpack_require__(19);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formCreateComponent(fComponent) {
    var _this = this;

    return {
        name: String(_component.formCreateName) + 'Core',
        data: _common.componentCommon.data,
        render: function render() {
            (0, _newArrowCheck3.default)(this, _this);

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
                (0, _newArrowCheck3.default)(this, _this2);

                this.fComponent.reload(n);
            }.bind(this));
        }
    };
};

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _keys = __webpack_require__(15);

var _keys2 = _interopRequireDefault(_keys);

var _newArrowCheck2 = __webpack_require__(2);

var _newArrowCheck3 = _interopRequireDefault(_newArrowCheck2);

var _creator = __webpack_require__(10);

var _componentList = __webpack_require__(63);

var _componentList2 = _interopRequireDefault(_componentList);

var _util = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maker = function () {
    (0, _newArrowCheck3.default)(undefined, undefined);


    var _m = {};

    (0, _keys2.default)(_componentList2.default).forEach(function (key) {
        (0, _newArrowCheck3.default)(undefined, undefined);

        var component = _componentList2.default[key];

        var undef = (0, _util.isUndef)(component.maker);

        if (undef || component.maker[component.name] === undefined) _m[component.name] = (0, _creator.creatorFactory)(component.name);

        if (!undef) (0, _util.extend)(_m, component.maker);
    }.bind(undefined));

    var commonMaker = (0, _creator.creatorFactory)('');

    (0, _util.extend)(_m, {
        create: function create(type) {
            var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'tmp' + (0, _util.uniqueId)();

            var make = (0, _creator.creatorFactory)('')('', field);
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

    return _m;
}.bind(undefined)();

exports.default = maker;

/***/ })
/******/ ]);
});