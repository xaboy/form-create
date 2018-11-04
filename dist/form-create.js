/*! form-create v1.4 | github https://github.com/xaboy/form-create | author xaboy */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var concat = [].concat;

var assign = Object.assign;

var toString = Object.prototype.toString;

var throwIfMissing = function throwIfMissing() {
	var errorMsg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Missing parameter';

	throw new Error(errorMsg);
};

var isDate = function isDate(arg) {
	return toString.call(arg) === '[object Date]';
};

var isPlainObject = function isPlainObject(arg) {
	return toString.call(arg) === '[object Object]';
};

var isFunction = function isFunction(arg) {
	return toString.call(arg) === '[object Function]';
};

var isString = function isString(arg) {
	return toString.call(arg) === '[object String]';
};

var isBool = function isBool(arg) {
	return toString.call(arg) === '[object Boolean]';
};

var isArray = Array.isArray;

var toLine = function toLine(name) {
	return name.replace(/([A-Z])/g, '-$1').toLowerCase();
};

var isNumeric = function isNumeric(n) {
	return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
};

var TA = function TA(a) {
	return isArray(a) ? a : [a];
};

var ATS = function ATS(a) {
	return isArray(a) ? a[0] || '' : a;
};

var isElement = function isElement(arg) {
	return (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg);
};

var deepExtend = function deepExtend(origin) {
	var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	var isArr = false;
	for (var key in target) {
		if (Object.prototype.hasOwnProperty.call(target, key)) {
			var clone = target[key];
			if ((isArr = isArray(clone)) || isPlainObject(clone)) {
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
};

var id = 0;

var uniqueId = function uniqueId() {
	return ++id;
};

var dateFormat = function dateFormat(fmt) {
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
};

exports.concat = concat;
exports.assign = assign;
exports.toString = toString;
exports.throwIfMissing = throwIfMissing;
exports.isPlainObject = isPlainObject;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isArray = isArray;
exports.deepExtend = deepExtend;
exports.isElement = isElement;
exports.uniqueId = uniqueId;
exports.dateFormat = dateFormat;
exports.isNumeric = isNumeric;
exports.isBool = isBool;
exports.ATS = ATS;
exports.TA = TA;
exports.toLine = toLine;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var handlerFactory = function handlerFactory() {
    var prototypeExtend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var $h = function $h(vm, rule) {
        handler.call(this, vm, rule);
    };
    $h.prototype = Object.create(handler.prototype);
    Object.assign($h.prototype, prototypeExtend);
    $h.prototype.constructor = $h;
    return $h;
};

var handler = function handler(vm, rule) {
    var model = rule.model,
        field = rule.field,
        type = rule.type,
        _rule$validate = rule.validate,
        validate = _rule$validate === undefined ? [] : _rule$validate,
        _rule$event = rule.event,
        event = _rule$event === undefined ? {} : _rule$event,
        _rule$value = rule.value,
        value = _rule$value === undefined ? '' : _rule$value,
        _rule$col = rule.col,
        col = _rule$col === undefined ? {} : _rule$col,
        _rule$emit = rule.emit,
        emit = _rule$emit === undefined ? [] : _rule$emit,
        _rule$props = rule.props,
        props = _rule$props === undefined ? {} : _rule$props;

    field = field.toString();
    this.type = type;
    this.model = model;
    this.value = value;
    if ((0, _util.isNumeric)(col)) {
        col = { span: col };
    } else if (col.span === undefined) col.span = 24;
    if (props && props.hidden === undefined) props.hidden = false;
    if (props && props.visibility === undefined) props.visibility = false;
    rule.event = Object.keys(event).reduce(function (initial, eventName) {
        initial['on-' + eventName] = event[eventName];
        return initial;
    }, {});

    emit.forEach(function (eventName) {
        rule.event['on-' + eventName] = function () {
            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            vm.$emit.apply(vm, [(0, _util.toLine)(field + '-' + eventName).replace('_', '-')].concat(arg));
        };
    });

    rule.validate = (0, _util.isArray)(validate) ? validate : [validate];
    rule.col = col;
    rule.props = props;
    this.rule = rule;
    this.field = field;
    this.vm = vm;
    this.unique = (0, _util.uniqueId)();
    this.refName = field + '' + this.unique;
    this.el = {};
    this.init();
};

handler.prototype = {
    init: function init() {},
    toParseValue: function toParseValue() {
        var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        return value.toString();
    },
    toTrueValue: function toTrueValue(parseValue) {
        return parseValue;
    },
    setValue: function setValue(value) {
        this.vm.changeTrueData(this.field, value);
    },
    getValue: function getValue() {
        return this.vm.getTrueDataValue(this.field);
    },
    setParseValue: function setParseValue(parseValue) {
        this.setValue(this.toTrueValue(parseValue));
    },
    watchTrueValue: function watchTrueValue(n) {
        this.vm.changeFormData(this.field, this.toParseValue(n));
    },
    mounted: function mounted() {},
    mounted_: function mounted_() {
        this.el = this.vm.$refs[this.refName];
        this.mounted();
    }
};

exports.default = handlerFactory;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cvm = __webpack_require__(6);

var _cvm2 = _interopRequireDefault(_cvm);

var _props = __webpack_require__(4);

var _props2 = _interopRequireDefault(_props);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var renderFactory = function renderFactory(prototypeExtend) {
    var $r = function $r(vm, handler, options) {
        render.call(this, vm, handler, options);
    };
    $r.prototype = Object.create(render.prototype);
    Object.assign($r.prototype, prototypeExtend);
    $r.prototype.constructor = $r;
    return $r;
};

var render = function render(vm, handler) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    this.handler = handler;
    this.options = options;
    this.vm = vm;
    this.cvm = _cvm2.default.instance(vm.$createElement);
    this.event = handler.rule.event;
    this.init();
};

render.prototype = {
    props: _props2.default.instance(),
    init: function init() {
        this.handler.rule = Object.assign(this.handler.rule, { ref: this.handler.refName, key: 'fco' + (0, _util.uniqueId)() });
    },
    parse: function parse() {
        var _this = this;

        var _handler = this.handler,
            type = _handler.type,
            rule = _handler.rule,
            childrenHandlers = _handler.childrenHandlers;

        if (rule.type === '__tmp') {
            return [this.vm.constructor.super.compile(rule.template, {}).render.call(rule._vm || this.vm)];
        }
        return [this.cvm.make(type, Object.assign({}, rule), function () {
            var vn = [];
            if (childrenHandlers.length > 0) vn = childrenHandlers.map(function (handler) {
                return _this.parse.call(handler.render);
            });
            return vn;
        })];
    },
    inputProps: function inputProps() {
        var _this2 = this;

        var _handler2 = this.handler,
            refName = _handler2.refName,
            unique = _handler2.unique,
            field = _handler2.field,
            props = _handler2.rule.props;

        return this.props.props(Object.assign(props, { model: 'cptData.' + field, value: this.vm.cptData[field], elementId: refName })).ref(refName).key('fip' + unique).on(this.event).on('input', function (value) {
            _this2.vm.$emit('input', value);
            _this2.vm.$set(_this2.vm.cptData, field, value);
        });
    }
};

exports.default = renderFactory;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports._init = exports.componentCommon = exports.getMaker = exports.timeStampToDate = exports.getGlobalApi = exports.formCreateStyle = exports.getConfig = exports.getComponent = undefined;

var _util = __webpack_require__(0);

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _componentList = __webpack_require__(7);

var _componentList2 = _interopRequireDefault(_componentList);

var _maker = __webpack_require__(26);

var _maker2 = _interopRequireDefault(_maker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getComponent = function getComponent(vm, rule, createOptions) {
    var name = rule.type.toLowerCase(),
        component = _componentList2.default[name] === undefined ? getUdfComponent() : _componentList2.default[name];

    var $h = new component.handler(vm, rule);
    $h.render = new component.render(vm, $h, createOptions);
    $h.noValue = component.noValue;
    return $h;
};

var getUdfComponent = function getUdfComponent() {
    return {
        handler: (0, _handler2.default)({}),
        render: (0, _render2.default)({}),
        noValue: true
    };
};

var getConfig = function getConfig() {
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
            beforeUpload: function beforeUpload() {},
            onProgress: function onProgress(event, file, fileList) {},
            onSuccess: function onSuccess(response, file, fileList) {},
            onError: function onError(error, file, fileList) {},
            onPreview: function onPreview(file) {},
            onRemove: function onRemove(file, fileList) {},
            onFormatError: function onFormatError(file, fileList) {},
            onExceededSize: function onExceededSize(file, fileList) {},
            handleIcon: 'ios-eye-outline',
            allowRemove: true
        },
        onSubmit: function onSubmit(formData) {},
        submitBtn: {
            type: "primary",
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: "ios-upload",
            innerText: "提交",
            loading: false,
            show: true
        },
        resetBtn: {
            type: "ghost",
            size: "large",
            shape: undefined,
            long: true,
            htmlType: "button",
            disabled: false,
            icon: "refresh",
            innerText: "重置",
            loading: false,
            show: false
        },
        mounted: function mounted() {}
    };
};

var formCreateStyle = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;box-sizing: border-box;}' + ' .fc-files>.ivu-icon{transform: translateY(20%);}' + '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' + '.fc-upload .ivu-upload{display: inline-block;}' + '.fc-upload-btn{border: 1px dashed #dddee1;}' + '.fc-upload .fc-upload-cover{ display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); }' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-files:hover .fc-upload-cover{ display: block; }' + '.fc-upload .ivu-upload-list-file{ display: inline-block;float: left; }' + '.fc-upload .ivu-upload-list{ position: absolute;left: 0; }' + '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

var getGlobalApi = function getGlobalApi(fComponent) {
    var vm = fComponent.vm;
    return {
        // core:fComponent,
        formData: function formData() {
            var data = {};
            fComponent.fields().map(function (field) {
                field = field.toString();
                data[field] = fComponent.handlers[field].getValue();
            });
            return data;
        },
        getValue: function getValue(field) {
            field = field.toString();
            var handler = fComponent.handlers[field];
            if (handler === undefined) console.error(field + ' \u5B57\u6BB5\u4E0D\u5B58\u5728!');else {
                return handler.getValue();
            }
        },
        changeField: function changeField(field, value) {
            field = field.toString();
            var handler = fComponent.handlers[field];
            if (handler === undefined) console.error(field + ' \u5B57\u6BB5\u4E0D\u5B58\u5728!');else {
                if ((0, _util.isFunction)(value)) value(vm.getTrueData(field), function change(changeValue) {
                    handler.setValue(changeValue);
                });else handler.setValue(value);
            }
        },
        removeField: function removeField(field) {
            fComponent.removeField(field.toString());
        },
        validate: function validate(successFn, errorFn) {
            fComponent.getFormRef().validate(function (valid) {
                valid === true ? successFn && successFn() : errorFn && errorFn();
            });
        },
        validateField: function validateField(field, callback) {
            fComponent.getFormRef().validateField(field.toString(), callback);
        },
        resetFields: function resetFields() {
            fComponent.getFormRef().resetFields();
            vm.$nextTick(function () {
                fComponent.getFormRef().resetFields();
            });
        },
        destroy: function destroy() {
            vm.$el.remove();
            vm.$destroy();
        },
        fields: function fields() {
            return fComponent.fields();
        },
        append: function append(rule, after) {
            fComponent.append(rule, after, false);
        },
        prepend: function prepend(rule, after) {
            fComponent.append(rule, after, true);
        },
        submit: function submit(successFn) {
            var _this = this;

            this.validate(function () {
                var formData = _this.formData();
                if ((0, _util.isFunction)(successFn)) successFn(formData);else fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
            });
        },
        hidden: function hidden(fields) {
            var _hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!(0, _util.isArray)(fields)) fields = [fields];
            fields.forEach(function (field) {
                vm.$set(vm.trueData[field].rule.props, 'hidden', !!_hidden);
            });
        },
        visibility: function visibility(fields) {
            var _visibility = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!(0, _util.isArray)(fields)) fields = [fields];
            fields.forEach(function (field) {
                vm.$set(vm.trueData[field].rule.props, 'visibility', !!_visibility);
            });
        },
        model: function model(fields) {
            var model = {};
            if (!fields) fields = this.fields();else if (!(0, _util.isArray)(fields)) fields = [fields];
            fields.forEach(function (field) {
                var handler = fComponent.handlers[field];
                if (!handler) throw new Error(field + '\u5B57\u6BB5\u4E0D\u5B58\u5728');
                handler.model = function (v) {
                    model[field] = v;
                };
                handler.model(handler.vm.getTrueData(field));
            });
            return model;
        },
        bind: function bind(fields) {
            var bind = {},
                vm = fComponent.vm;
            if (!fields) fields = this.fields();else if (!(0, _util.isArray)(fields)) fields = [fields];
            fields.forEach(function (field) {
                bind[field] = vm.trueData[field].value;
                Object.defineProperty(bind, field, {
                    get: function get() {
                        return vm.trueData[field].value;
                    },
                    set: function set(value) {
                        vm.$set(vm.trueData[field], 'value', value);
                    },
                    enumerable: true,
                    configurable: true
                });
            });
            return bind;
        },

        submitStatus: function submitStatus() {
            var _props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var props = (0, _util.deepExtend)(Object.create(null), _props);
            vm.changeButtonProps(props);
        },
        resetStatus: function resetStatus() {
            var _props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var props = (0, _util.deepExtend)(Object.create(null), _props);
            vm.changeResetProps(props);
        },
        btn: {
            loading: function loading() {
                var _loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                vm.changeButtonProps({ loading: _loading });
            },
            finish: function finish() {
                this.loading(false);
            },
            disabled: function disabled() {
                var _disabled = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                vm.changeButtonProps({ disabled: _disabled });
            }
        },
        resetBtn: {
            loading: function loading() {
                var _loading2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                vm.changeResetProps({ loading: _loading2 });
            },
            finish: function finish() {
                this.loading(false);
            },
            disabled: function disabled() {
                var _disabled2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

                vm.changeResetProps({ disabled: _disabled2 });
            }
        },
        closeModal: function closeModal() {
            vm.$Modal.remove();
        },
        set: function set(node, field, value) {
            vm.$set(node, field, value);
        },
        reload: function reload(rules) {
            fComponent.reload(rules);
        }
    };
};

var timeStampToDate = function timeStampToDate(timeStamp) {
    if ((0, _util.isDate)(timeStamp)) return timeStamp;else {
        var date = new Date(timeStamp);
        return date.toString() === 'Invalid Date' ? timeStamp : date;
    }
};

var getMaker = function getMaker() {
    return _maker2.default;
};

var componentCommon = {
    data: function data() {
        return {
            rules: {},
            cptData: {},
            buttonProps: {},
            resetProps: {},
            trueData: {},
            jsonData: {},
            $f: {},
            isShow: true,
            watchs: []
        };
    },
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
            this.$delete(this.cptData, field);
            this.$delete(this.trueData, field);
            this.$delete(this.jsonData, field);
        },
        changeButtonProps: function changeButtonProps(props) {
            this.$set(this, 'buttonProps', Object.assign(this.buttonProps, props));
        },
        changeResetProps: function changeResetProps(props) {
            this.$set(this, 'resetProps', Object.assign(this.resetProps, props));
        },
        setField: function setField(field) {
            this.$set(this.cptData, field, '');
            this.$set(this.trueData, field, {});
        },
        init: function init() {
            var _this2 = this;

            var type = this.fComponent._type;
            this[type].forEach(function (rule, index) {
                var unWatch = _this2.$watch(type + '.' + index + '.value', function (n) {
                    if (_this2.trueData[rule.field] === undefined) return unWatch();
                    _this2.$set(_this2.trueData[rule.field], 'value', n);
                });
                _this2.watchs.push(unWatch);
            });
            this.$watch(type, function (n) {
                _this2.fComponent.reload(n);
            });
        },
        unWatch: function unWatch() {
            this.watchs.forEach(function (unWatch) {
                return unWatch();
            });
            this.watchs = [];
        }
    }
};

var _init = function _init() {
    if (!Object.assign) {
        Object.assign = function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i];

                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        };
    }
};

exports.getComponent = getComponent;
exports.getConfig = getConfig;
exports.formCreateStyle = formCreateStyle;
exports.getGlobalApi = getGlobalApi;
exports.timeStampToDate = timeStampToDate;
exports.getMaker = getMaker;
exports.componentCommon = componentCommon;
exports._init = _init;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var props = function props() {
    this._data = this._initData();
    this._prev = null;
};

var _instance = null;

props.instance = function () {
    if (false === _instance instanceof props) _instance = new props();
    return _instance;
};

props.prototype = {
    _initData: function _initData() {
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
    },
    class: function _class() {
        var _this = this;

        var classList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:classList');
        var status = arguments[1];

        if ((0, _util.isArray)(classList)) {
            classList.map(function (cls) {
                _this._data.class[cls.toString()] = true;
            });
        } else if ((0, _util.isPlainObject)(classList)) {
            this._data.class = (0, _util.assign)({}, this._data.class, classList);
        } else {
            this._data.class[classList.toString()] = status === undefined ? true : status;
        }
        return this;
    },
    directives: function directives() {
        var _directives = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:directives');

        this._data.directives = _util.concat.call.apply(_util.concat, _toConsumableArray(this._data.directives).concat(_toConsumableArray(_directives)));
        return this;
    },
    init: function init() {
        this._data = this._initData();
    },
    get: function get() {
        this._prev = this._data;
        this.init();
        return this._prev;
    },
    getPrev: function getPrev() {
        return this._prev;
    }
};

var keyList = ['ref', 'key', 'slot'];
var objList = ['scopedSlots', 'nativeOn', 'on', 'domProps', 'props', 'attrs', 'style'];

keyList.forEach(function (key) {
    props.prototype[key] = function (val) {
        this._data[key] = val;
        return this;
    };
});

objList.forEach(function (key) {
    props.prototype[key] = function () {
        var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:' + key);
        var val = arguments[1];

        if ((0, _util.isPlainObject)(obj)) {
            this._data[key] = (0, _util.assign)(this._data[key], obj);
        } else {
            this._data[key][obj.toString()] = val;
        }
        return this;
    };
});

exports.default = props;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formCreate = undefined;

var _util = __webpack_require__(0);

var _common = __webpack_require__(3);

var _form = __webpack_require__(28);

var _form2 = _interopRequireDefault(_form);

var _formCreateComponent = __webpack_require__(29);

var _formCreateComponent2 = _interopRequireDefault(_formCreateComponent);

var _component = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '1.4.4';

var maker = (0, _common.getMaker)();

var formCreateStyleElId = 'form-create-style';

(0, _common._init)();

var formCreate = function formCreate(rules, _options) {
    if (!this instanceof formCreate) throwIfMissing('formCreate is a constructor and should be called with the `new` keyword');

    if ((0, _util.isBool)(_options.sumbitBtn)) _options.sumbitBtn = { show: _options.sumbitBtn };
    if ((0, _util.isBool)(_options.resetBtn)) _options.resetBtn = { show: _options.resetBtn };

    var options = (0, _util.deepExtend)((0, _util.deepExtend)(Object.create(null), (0, _common.getConfig)()), _options);
    options.el = !options.el ? window.document.body : (0, _util.isElement)(options.el) ? options.el : document.querySelector(options.el);
    this.options = options;

    this.initCreate(rules);
};

formCreate.createStyle = function () {
    if (document.getElementById(formCreateStyleElId) !== null) return;
    var style = document.createElement('style');
    style.id = formCreateStyleElId;
    style.innerText = _common.formCreateStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
};

formCreate.create = function (rules) {
    var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var _vue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.Vue;

    var opt = (0, _util.isElement)(_opt) ? { el: _opt } : _opt;

    var fComponent = new formCreate(rules, (0, _util.deepExtend)(Object.create(null), opt)),
        $vm = fComponent.create(_vue);
    return fComponent.fCreateApi;
};

formCreate.install = function (Vue) {
    var globalOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    formCreate.createStyle();
    Vue.prototype.$formCreate = function (rules, opt) {
        return formCreate.create(rules, (0, _util.deepExtend)((0, _util.deepExtend)(Object.create(null), opt), globalOptions), Vue);
    };

    Vue.prototype.$formCreate.version = version;
    Vue.prototype.$formCreate.maker = maker;
    Vue.component(_component.formCreateName, (0, _component.$FormCreate)());
};

formCreate.prototype = {
    setHandler: function setHandler(handler) {
        var rule = handler.rule,
            field = handler.field;
        this.handlers[field] = handler;
        if (handler.noValue === true) return;
        this.formData[field] = handler.toParseValue(handler.value);
        this.validate[field] = rule.validate;
        this.trueData[field] = {
            value: handler.toTrueValue(this.formData[field]),
            rule: handler.rule
        };
    },
    notField: function notField(field) {
        return this.fieldList.indexOf(field) === -1;
    },
    createHandler: function createHandler() {
        var _this = this;

        this.rules.filter(function (rule) {
            return rule.type !== undefined || rule.field !== undefined;
        }).forEach(function (rule) {
            rule.field = rule.field === undefined ? '' : rule.field;
            if (_this.notField(rule.field.toString())) {
                var handler = (0, _common.getComponent)(_this.vm, rule, _this.options);
                _this.createChildren(handler);
                _this.setHandler(handler);
                _this.fieldList.push(handler.field);
            } else {
                console.error(rule.field + " \u5B57\u6BB5\u5DF2\u5B58\u5728");
            }
        });
    },
    createChildren: function createChildren(handler) {
        var _this2 = this;

        handler.childrenHandlers = [];
        if ((0, _util.isArray)(handler.rule.children) && handler.rule.children.length > 0) {
            handler.rule.children.map(function (rule) {
                if ((0, _util.isFunction)(rule.getRule)) rule = rule.getRule();
                rule.field = rule.field === undefined ? '' : rule.field;
                if (_this2.notField(rule.field.toString())) {
                    var _handler = (0, _common.getComponent)(_this2.vm, rule, _this2.options);
                    _this2.createChildren(_handler);
                    handler.childrenHandlers.push(_handler);
                } else {
                    console.error(rule.field + " \u5B57\u6BB5\u5DF2\u5B58\u5728");
                }
            });
        }
    },
    initCreate: function initCreate(rules) {
        var _this3 = this;

        this.rules = Array.isArray(rules) ? rules : [];
        this.handlers = {};
        this.fRender = {};
        this.formData = {};
        this.validate = {};
        this.trueData = {};
        this.fieldList = [];

        this.rules.forEach(function (rule, index) {
            if ((0, _util.isFunction)(rule.getRule)) _this3.rules[index] = rule.getRule();
        });
    },
    init: function init(vm) {
        this.vm = vm;
        this.createHandler();
        this.fCreateApi = (0, _common.getGlobalApi)(this);
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        this.fRender = new _form2.default(this);
    },
    create: function create(Vue) {
        var $fCreate = Vue.extend(this.component()),
            $vm = new $fCreate().$mount();
        this.options.el.appendChild($vm.$el);
        return $vm;
    },
    mounted: function mounted(vm) {
        var _this4 = this;

        Object.keys(vm.cptData).map(function (field) {
            var handler = _this4.handlers[field];
            handler.model && handler.model(vm.getTrueData(field));
            _this4.addHandlerWatch(handler);
            handler.mounted_();
        });
        this.options.mounted && this.options.mounted();
        this.vm = vm;
    },
    component: function component() {
        return (0, _formCreateComponent2.default)(this);
    },
    append: function append(rule, after, pre) {
        if ((0, _util.isFunction)(rule.getRule)) rule = rule.getRule();
        if (Object.keys(this.handlers).indexOf(rule.field.toString()) !== -1) throw new Error(rule.field + "\u5B57\u6BB5\u5DF2\u5B58\u5728");
        var handler = (0, _common.getComponent)(this.vm, rule, this.options);
        this.createChildren(handler);
        this.vm.setField(handler.field);
        this.fRender.setRender(handler, after || '', pre);
        this.setHandler(handler);
        this.addHandlerWatch(handler);
        this.vm.$nextTick(function () {
            handler.mounted_();
        });
    },
    removeField: function removeField(field) {
        if (this.handlers[field] === undefined) throw new Error(field + "\u5B57\u6BB5\u4E0D\u5B58\u5728");
        this.handlers[field].watch && this.handlers[field].watch.forEach(function (unWatch) {
            return unWatch();
        });
        this.vm.removeFormData(field);
        delete this.handlers[field];
        delete this.validate[field];
        this.fRender.removeRender(field);
        delete this.formData[field];
        delete this.trueData[field];
    },
    addHandlerWatch: function addHandlerWatch(handler) {
        var _this5 = this;

        if (handler.noValue === true) return;
        var field = handler.field;
        var unWatch = this.vm.$watch("cptData." + field, function (n, o) {
            if (_this5.handlers[field] !== undefined) {
                handler.setParseValue(n);
            } else unWatch();
        }, { deep: true });
        var unWatch2 = this.vm.$watch("trueData." + field + ".value", function (n, o) {
            if (n === undefined) return;
            if (_this5.handlers[field] !== undefined) {
                var json = JSON.stringify(n);
                if (_this5.vm.jsonData[field] !== json) {
                    _this5.vm.jsonData[field] = json;
                    handler.model && handler.model(_this5.vm.getTrueData(field));
                    handler.watchTrueValue(n);
                    handler.rule.value = n;
                }
            } else unWatch2();
        }, { deep: true });
        handler.watch = [unWatch, unWatch2];
    },
    reload: function reload() {
        var _this6 = this;

        var rules = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.rules;

        this.vm.unWatch();
        Object.keys(this.handlers).forEach(function (field) {
            return _this6.removeField(field);
        });
        this.vm.isShow = false;
        this.initCreate(rules);
        this.init(this.vm);
        this.fRender.parse(this.vm);
        this.vm.init();
        this.vm.$nextTick(function () {
            _this6.vm.isShow = true;
            setTimeout(function () {
                return _this6.mounted(_this6.vm);
            });
        });
    },
    getFormRef: function getFormRef() {
        return this.vm.$refs[this.fRender.refName];
    },
    fields: function fields() {
        return Object.keys(this.formData);
    }
};

exports.default = {
    install: formCreate.install,
    default: formCreate,
    create: formCreate.create,
    maker: maker,
    version: version
};
exports.formCreate = formCreate;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var cvm = function cvm() {
    var createElement = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:createElement');

    this.$h = createElement;
};

var _instance = null;

var vm = null;

cvm.instance = function (createElement) {
    if (false === _instance instanceof cvm) _instance = new cvm(createElement);
    return _instance;
};

cvm.setVm = function ($vm) {
    vm = $vm;
};
cvm.clearVm = function () {
    vm = null;
};

cvm.prototype = {
    make: function make(nodeName, data, VNodeFn) {
        if ((0, _util.isString)(data)) data = { domProps: { innerHTML: data } };
        var Node = this.$h(nodeName, data, this.getVNode(VNodeFn));
        if (vm !== null) Node.context = vm;
        return Node;
    },
    getVNode: function getVNode(VNode) {
        return (0, _util.isFunction)(VNode) ? VNode() : VNode || [];
    }
};

var nodes = { modal: 'Modal', progress: 'i-progress', button: 'i-button', icon: 'Icon', span: 'span', slider: 'Slider', rate: 'Rate', upload: 'Upload', cascader: 'Cascader', colorPicker: 'Color-Picker', timePicker: 'Time-Picker', datePicker: 'Date-Picker', 'switch': 'i-switch', option: 'i-option', select: 'i-select', checkbox: 'Checkbox', checkboxGroup: 'Checkbox-Group', radio: 'Radio', radioGroup: 'Radio-Group', inputNumber: 'Input-Number', input: 'i-input', formItem: 'Form-Item', form: 'i-form', col: 'i-col', row: 'row', tree: 'Tree' };

Object.keys(nodes).forEach(function (k) {
    cvm.prototype[k] = function (data, VNodeFn) {
        return this.make(nodes[k], data, VNodeFn);
    };
});

exports.default = cvm;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _hidden = __webpack_require__(11);

var _hidden2 = _interopRequireDefault(_hidden);

var _input = __webpack_require__(12);

var _input2 = _interopRequireDefault(_input);

var _radio = __webpack_require__(13);

var _radio2 = _interopRequireDefault(_radio);

var _checkbox = __webpack_require__(14);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _switch = __webpack_require__(15);

var _switch2 = _interopRequireDefault(_switch);

var _select = __webpack_require__(16);

var _select2 = _interopRequireDefault(_select);

var _datePicker = __webpack_require__(17);

var _datePicker2 = _interopRequireDefault(_datePicker);

var _timePicker = __webpack_require__(18);

var _timePicker2 = _interopRequireDefault(_timePicker);

var _inputNumber = __webpack_require__(19);

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _colorPicker = __webpack_require__(20);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _upload = __webpack_require__(8);

var _upload2 = _interopRequireDefault(_upload);

var _cascader = __webpack_require__(21);

var _cascader2 = _interopRequireDefault(_cascader);

var _rate = __webpack_require__(22);

var _rate2 = _interopRequireDefault(_rate);

var _slider = __webpack_require__(23);

var _slider2 = _interopRequireDefault(_slider);

var _frame = __webpack_require__(24);

var _frame2 = _interopRequireDefault(_frame);

var _tree = __webpack_require__(25);

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
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler2 = __webpack_require__(1);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var handler = (0, _handler3.default)({
    init: function init() {
        var props = this.rule.props;
        props.defaultFileList = [];
        props.showUploadList = false;
        props.uploadType = !props.uploadType ? 'file' : props.uploadType;
        if (props.uploadType === 'file' && props.handleIcon === undefined) props.handleIcon = false;
        this.parseValue = [];
    },
    toParseValue: function toParseValue(value) {
        var _this = this;

        var files = (0, _util.isArray)(value) ? value : !value ? [] : [value];
        this.parseValue.splice(0, this.parseValue.length);
        files.forEach(function (file) {
            return _this.push(file);
        });
        this.rule.props.defaultFileList = this.parseValue;
        return this.parseValue;
    },
    mounted: function mounted() {
        if (this.el.fileList === undefined) this.el.fileList = [];
        this.changeParseValue(this.el.fileList);
    },
    push: function push(file) {
        this.parseValue.push({
            url: file,
            name: this.getFileName(file)
        });
    },
    toTrueValue: function toTrueValue(parseValue) {
        if (!parseValue) return [];
        var files = parseValue.map(function (file) {
            return file.url;
        }).filter(function (file) {
            return file !== undefined;
        });
        return this.rule.props.maxLength <= 1 ? files[0] || '' : files;
    },
    changeParseValue: function changeParseValue(parseValue) {
        this.parseValue = parseValue;
        this.vm.getTrueData(this.field).rule.props.defaultFileList = parseValue;
    },
    watchTrueValue: function watchTrueValue(n) {
        var b = true;
        this.rule.props.defaultFileList.forEach(function (pic) {
            b = b && (pic.percentage === undefined || pic.status === 'finished');
        });
        if (b) this.vm.changeFormData(this.field, this.toParseValue(n));
    },
    getFileName: function getFileName(pic) {
        var res = pic.split('/'),
            file = res[res.length - 1],
            index = file.indexOf('.');
        return index === -1 ? file : file.substr(0, index);
    }
});

var propsEventType = ['beforeUpload', 'onProgress', 'onPreview', 'onRemove', 'onFormatError', 'onExceededSize', 'onError'];

var render = (0, _render2.default)({
    init: function init() {
        var _this2 = this;

        var handler = this.handler;
        this.uploadOptions = Object.assign(Object.create(null), this.options.upload, handler.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        var events = propsEventType.reduce(function (initial, eventName) {
            initial[eventName] = function () {
                var _uploadOptions$eventN;

                for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                    arg[_key] = arguments[_key];
                }

                if (_this2.uploadOptions[eventName]) return (_uploadOptions$eventN = _this2.uploadOptions[eventName]).call.apply(_uploadOptions$eventN, [null].concat(arg));
            };
            return initial;
        }, {});
        this.propsData = this.props.props(this.uploadOptions).props('onSuccess', function (response, file, fileList) {
            var url = _this2.uploadOptions.onSuccess.call(null, response, file, fileList);
            if (url) {
                file.url = url;
                file.name = handler.getFileName(url);
            }
        }).props(events).ref(handler.refName).key("fip" + handler.unique).get();
    },
    defaultOnHandle: function defaultOnHandle(src) {
        var _this3 = this;

        this.vm.$Modal.remove();
        setTimeout(function () {
            _this3.vm.$Modal.info({
                title: "预览",
                render: function render(h) {
                    return h('img', { attrs: { src: src }, style: "width: 100%", key: 'ifmd' + (0, _util.uniqueId)() });
                },
                showCancel: true,
                closable: true,
                scrollable: true
            });
        }, 301);
    },
    onHandle: function onHandle(src) {
        var fn = this.uploadOptions.onHandle;
        if (fn) return fn(src);else this.defaultOnHandle(src);
    },
    parse: function parse() {
        var _this4 = this;

        var _handler = this.handler,
            rule = _handler.rule,
            unique = _handler.unique;

        this.uploadOptions = Object.assign(Object.create(null), this.options.upload, rule.props);
        if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'ios-eye-outline';
        var value = this.vm.cptData[this.handler.field],
            render = [].concat(_toConsumableArray(value.map(function (file, index) {
            if (file.status === undefined || file.status === 'finished') {
                return _this4.makeUploadView(file.url, "" + index + unique, index);
            } else if (file.showProgress) {
                return _this4.makeProgress(file, "" + index + unique);
            }
        })));
        render.push(this.makeUploadBtn(unique, !this.uploadOptions.maxLength || this.uploadOptions.maxLength > this.vm.cptData[this.handler.field].length));
        return [this.cvm.make('div', { key: "div4" + unique, class: { 'fc-upload': true } }, render)];
    },
    makeUploadView: function makeUploadView(src, key, index) {
        var _this5 = this;

        return this.cvm.make('div', { key: "div1" + key, class: { 'fc-files': true } }, function () {
            var container = [];
            if (_this5.handler.rule.props.uploadType === 'image') {
                container.push(_this5.cvm.make('img', { key: "img" + key, attrs: { src: src } }));
            } else {
                container.push(_this5.cvm.icon({ key: "file" + key, props: { type: "document-text", size: 40 } }));
            }
            if (_this5.issetIcon) container.push(_this5.makeIcons(src, key, index));
            return container;
        });
    },
    makeIcons: function makeIcons(src, key, index) {
        var _this6 = this;

        return this.cvm.make('div', { key: "div2" + key, class: { 'fc-upload-cover': true } }, function () {
            var icon = [];
            if (!!_this6.uploadOptions.handleIcon) icon.push(_this6.makeHandleIcon(src, key, index));
            if (_this6.uploadOptions.allowRemove === true) icon.push(_this6.makeRemoveIcon(src, key, index));
            return icon;
        });
    },
    makeProgress: function makeProgress(file, unique) {
        return this.cvm.make('div', { key: "div3" + unique, class: { 'fc-files': true } }, [this.cvm.progress({ key: "upp" + unique, props: { percent: file.percentage, hideInfo: true } })]);
    },
    makeUploadBtn: function makeUploadBtn(unique, isShow) {
        return this.cvm.upload(this.propsData, isShow === true ? [this.cvm.make('div', { key: "div5" + unique, class: { 'fc-upload-btn': true } }, [this.cvm.icon({ key: "upi" + unique, props: { type: "camera", size: 20 } })])] : []);
    },
    makeRemoveIcon: function makeRemoveIcon(src, key, index) {
        var _this7 = this;

        return this.cvm.icon({ key: "upri" + key + index, props: { type: 'ios-trash-outline' }, nativeOn: { 'click': function click() {
                    _this7.handler.el.fileList.splice(index, 1);
                    _this7.handler.changeParseValue(_this7.handler.el.fileList);
                } } });
    },
    makeHandleIcon: function makeHandleIcon(src, key, index) {
        var _this8 = this;

        return this.cvm.icon({ key: "uphi" + key + index, props: { type: this.uploadOptions.handleIcon.toString() }, nativeOn: { 'click': function click() {
                    _this8.onHandle(src);
                } } });
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formCreateName = exports.$FormCreate = undefined;

var _formCreate = __webpack_require__(5);

var _common = __webpack_require__(3);

var formCreateName = 'FormCreate';

var $FormCreate = function $FormCreate() {
    return {
        name: formCreateName,
        render: function render() {
            return this.fComponent.fRender.parse(this.fComponent.vm);
        },

        props: {
            rule: {
                type: Array,
                required: true
            },
            option: {
                type: Object,
                default: function _default() {
                    return {};
                },
                required: false
            },
            value: Object
        },
        data: _common.componentCommon.data,
        methods: _common.componentCommon.methods,
        created: function created() {
            this.fComponent = new _formCreate.formCreate(this.rule, this.option);
            this.fComponent._type = 'rule';
            this.fComponent.init(this);
        },
        mounted: function mounted() {
            this.fComponent.mounted(this);
            this.$f = this.fComponent.fCreateApi;
            this.init();
        }
    };
};

exports.$FormCreate = $FormCreate;
exports.formCreateName = formCreateName;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _formCreate = __webpack_require__(5);

var _formCreate2 = _interopRequireDefault(_formCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined') {
    window["formCreate"] = _formCreate2.default;
    if (window.Vue && (window.iview || window.iView)) {
        window.Vue.use(_formCreate2.default);
    }
}

module.exports.default = module.exports = _formCreate2.default;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        this.rule.props = {};
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        var props = this.rule.props;

        if (props.autosize && props.autosize.minRows) props.rows = props.autosize.minRows || 2;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.input(this.inputProps().get())];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler2 = __webpack_require__(1);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler3.default)({
    toParseValue: function toParseValue(value) {
        value = value.toString();
        return this.rule.options.filter(function (opt) {
            return opt.value.toString() === value;
        }).reduce(function (initial, opt) {
            return opt.label;
        }, '');
    },
    toTrueValue: function toTrueValue(parseValue) {
        parseValue = parseValue.toString();
        return this.rule.options.filter(function (opt) {
            return opt.label.toString() === parseValue;
        }).reduce(function (initial, opt) {
            return opt.value;
        }, '');
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        var _this = this;

        var _handler = this.handler,
            unique = _handler.unique,
            options = _handler.rule.options;

        return [this.cvm.radioGroup(this.inputProps().get(), function () {
            return options.map(function (option, index) {
                return _this.cvm.radio({ props: option, key: "ropt" + index + unique });
            });
        })];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler2 = __webpack_require__(1);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler3.default)({
    toParseValue: function toParseValue(value) {
        if (false === (0, _util.isArray)(value)) value = [value];
        value = value.map(function (v) {
            return v.toString();
        });
        return this.rule.options.filter(function (opt) {
            return value.indexOf(opt.value) !== -1;
        }).map(function (option) {
            return option.label;
        });
    },
    toTrueValue: function toTrueValue(parseValue) {
        var value = this.rule.options.filter(function (opt) {
            return parseValue.indexOf(opt.label) !== -1;
        }).map(function (opt) {
            return opt.value;
        });
        if (this.rule.options.length === 1) return value[0] === undefined ? '' : value[0];else return value;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        var _this = this;

        var _handler = this.handler,
            unique = _handler.unique,
            options = _handler.rule.options;

        return [this.cvm.checkboxGroup(this.inputProps().get(), function () {
            return options.map(function (option, index) {
                return _this.cvm.checkbox({ props: option, key: "copt" + index + unique });
            });
        })];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        if (this.rule.slot === undefined) this.rule.slot = {};
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        var slot = this.handler.rule.slot;

        this.propsData = this.inputProps().scopedSlots({
            open: function open() {
                return slot.open;
            },
            close: function close() {
                return slot.close;
            }
        }).get();
        return [this.cvm.switch(this.propsData)];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler2 = __webpack_require__(1);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler3.default)({
    toParseValue: function toParseValue(value) {
        var isArr = (0, _util.isArray)(value);
        if (this.rule.props.multiple === true) return Array.from(isArr === true ? value : [value]);else return isArr === true ? value[0] || '' : value;
    },
    toTrueValue: function toTrueValue(parseValue) {
        return (0, _util.isArray)(parseValue) ? Array.from(parseValue) : parseValue;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        var _this = this;

        var _handler = this.handler,
            unique = _handler.unique,
            options = _handler.rule.options;

        return [this.cvm.select(this.inputProps().get(), function () {
            return options.map(function (option, index) {
                return _this.cvm.option({ props: option, key: "sopt" + index + unique });
            });
        })];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

var _common = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        var props = this.rule.props;
        props.type = !props.type ? 'date' : props.type;
        if (props.startDate === undefined) props.startDate = (0, _common.timeStampToDate)(props.startDate);
    },
    toParseValue: function toParseValue(value) {
        var isArr = (0, _util.isArray)(value),
            props = this.rule.props,
            parseValue = void 0;
        if (['daterange', 'datetimerange'].indexOf(props.type) !== -1) {
            if (isArr) {
                parseValue = value.map(function (time) {
                    return !time ? '' : (0, _common.timeStampToDate)(time);
                });
            } else {
                parseValue = ['', ''];
            }
        } else if ('date' === props.type && props.multiple === true) {
            parseValue = value.toString();
        } else {
            parseValue = isArr ? value[0] || '' : value;
            parseValue = !parseValue ? '' : (0, _common.timeStampToDate)(parseValue);
        }
        return parseValue;
    },
    toTrueValue: function toTrueValue() {
        return this.el.publicStringValue === undefined ? this.value : this.el.publicStringValue;
    },
    mounted: function mounted() {
        this.vm.changeTrueData(this.field, this.el.publicStringValue);
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.datePicker(this.inputProps().get())];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

var _common = __webpack_require__(3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        var props = this.rule.props;
        if (!props.type) props.type = 'time';
        if (props.confirm === undefined) props.confirm = true;
    },
    toParseValue: function toParseValue(value) {
        var _this = this;

        var parseValue = void 0,
            isArr = (0, _util.isArray)(value);
        if ('timerange' === this.rule.props.type) {
            if (isArr) {
                parseValue = value.map(function (time) {
                    return !time ? '' : _this.getTime((0, _common.timeStampToDate)(time));
                });
            } else {
                parseValue = ['', ''];
            }
        } else {
            isArr && (value = value[0]);
            parseValue = !value ? '' : this.getTime((0, _common.timeStampToDate)(value));
        }
        return parseValue;
    },
    toTrueValue: function toTrueValue() {
        return this.el.publicStringValue === undefined ? this.value : this.el.publicStringValue;
    },
    getTime: function getTime(date) {
        return (0, _util.isDate)(date) ? (0, _util.dateFormat)('hh:mm:ss', date) : date;
    },
    mounted: function mounted() {
        this.vm.changeTrueData(this.field, this.el.publicStringValue);
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.timePicker(this.inputProps().get())];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    toParseValue: function toParseValue(value) {
        var parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.inputNumber(this.inputProps().get())];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.colorPicker(this.inputProps().get())];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        var rule = this.rule;
        if (!rule.props.data) rule.props.data = [];
        if (!(0, _util.isArray)(this.value)) this.value = [];
    },
    toTrueValue: function toTrueValue() {
        return this.el.value === undefined ? this.vm.getFormData(this.field) : this.el.value;
    },
    toParseValue: function toParseValue(value) {
        return (0, _util.isArray)(value) ? Array.from(value) : [];
    },
    mounted: function mounted() {
        this.vm.changeTrueData(this.field, this.el.value);
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.cascader(this.inputProps().get())];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    toParseValue: function toParseValue(value) {
        var parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.rate(this.inputProps().get())];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        this.rule.props.min = this.rule.props.min === undefined ? 0 : parseFloat(this.rule.props.min) || 0;
    },
    toParseValue: function toParseValue(value) {
        var isArr = (0, _util.isArray)(value),
            props = this.rule.props,
            min = props.min,
            parseValue = void 0;
        if (props.range === true) {
            parseValue = isArr ? value : [min, parseFloat(value) || min];
        } else {
            parseValue = isArr ? parseFloat(value[0]) || min : parseFloat(value);
        }
        return parseValue;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.slider(this.inputProps().get())];
    }
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

var _upload = __webpack_require__(8);

var _upload2 = _interopRequireDefault(_upload);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        var props = this.rule.props;
        if (!props.type) props.type = 'input';
        if (!props.icon) props.icon = 'folder';
        if (!props.width) props.width = '500px';
        if (!props.height) props.height = '370px';
        if (props.spin === undefined) props.spin = true;
        if (!props.title) props.title = '请选择' + this.rule.title;
        if (!props.maxLength) props.maxLength = 0;
        props.multiple = props.maxLength.toString() !== '1';
        if (props.type === 'file' && props.handleIcon === undefined) props.handleIcon = false;else props.handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'ios-eye-outline' : props.handleIcon;
        if (props.allowRemove === undefined) props.allowRemove = true;
    },
    toParseValue: function toParseValue(value) {
        var parseValue = void 0,
            oldValue = value,
            isArr = (0, _util.isArray)(oldValue);
        if (oldValue === '') parseValue = [];else if (!isArr) parseValue = [oldValue];else parseValue = oldValue;
        this.parseValue = parseValue;
        return parseValue;
    },
    toTrueValue: function toTrueValue(parseValue) {
        return this.rule.props.multiple === true ? parseValue : parseValue[0] === undefined ? '' : parseValue[0];
    }
});

var eventList = { onOpen: 'on-open', onChange: 'on-change', onCancel: 'on-cancel', onOk: 'on-ok' };

var render = (0, _render2.default)({
    init: function init() {
        var _this = this;

        var field = this.handler.field,
            b = false;
        this.vm.$watch("cptData." + field, function () {
            b === true && _this.onChange();
            b = true;
        });
        this._props = this.handler.rule.props;
        this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
    },
    parse: function parse() {
        var type = this._props.type,
            vNode = void 0;
        if (type === 'image') vNode = this.makeGroup(this.makeImage());else if (type === 'file') vNode = this.makeGroup(this.makeFile());else vNode = this.makeInput();
        return vNode;
    },
    makeInput: function makeInput(hidden) {
        var _this2 = this;

        var unique = this.handler.unique,
            props = this.inputProps().props({
            type: "text",
            value: this.handler.parseValue.toString(),
            icon: this._props.icon,
            readonly: true,
            clearable: true
        }).on('on-click', function () {
            _this2.showModel();
        }).key('ifit' + unique).style({ display: hidden === true ? 'none' : 'inline-block' }).get();
        return [this.cvm.input(props)];
    },
    makeGroup: function makeGroup(render) {
        var unique = this.handler.unique,
            field = this.handler.field;
        return [this.cvm.make('div', { key: "ifgp1" + unique, class: { 'fc-upload fc-frame': true }, ref: this.handler.refName, props: { value: this.vm.cptData[field] } }, render), this.makeInput(true)];
    },
    makeImage: function makeImage() {
        var _this3 = this;

        var unique = this.handler.unique;
        var vNode = this.handler.parseValue.map(function (src, index) {
            return _this3.cvm.make('div', { key: "ifid1" + unique + index, class: { 'fc-files': true } }, [_this3.cvm.make('img', { key: "ifim" + unique + index, attrs: { src: src } }), _this3.makeIcons(src, unique, index)]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    },
    makeFile: function makeFile() {
        var _this4 = this;

        var unique = this.handler.unique;
        var vNode = this.handler.parseValue.map(function (src, index) {
            return _this4.cvm.make('div', { key: "iffd2" + unique + index, class: { 'fc-files': true } }, [_this4.cvm.icon({ key: "iff" + unique + index, props: { type: "document-text", size: 40 } }), _this4.makeIcons(src, unique, index)]);
        });
        vNode.push(this.makeBtn());
        return vNode;
    },
    makeBtn: function makeBtn() {
        var _this5 = this;

        var props = this.handler.rule.props;
        if (props.maxLength > 0 && this.handler.parseValue.length >= props.maxLength) return;
        var unique = this.handler.unique;
        return this.cvm.make('div', { key: "ifbd3" + unique, class: { 'fc-upload-btn': true }, on: { click: function click() {
                    _this5.showModel();
                } } }, [this.cvm.icon({ key: "ifbi" + unique, props: { type: this._props.icon, size: 20 } })]);
    },
    makeSpin: function makeSpin() {
        if (true !== this._props.spin) return;
        var unique = this.handler.unique;
        return this.cvm.make('Spin', {
            props: { fix: true },
            key: 'ifsp' + unique,
            class: {
                'fc-spin': true
            }
        }, [this.cvm.icon({
            props: {
                type: 'load-c',
                size: 18
            },
            class: {
                'fc-spin-icon-load': true
            },
            key: 'ifspi' + unique
        }), this.cvm.make('div', {
            domProps: {
                innerHTML: '加载中...'
            },
            key: 'ifspd' + unique
        })]);
    },
    makeIcons: function makeIcons(src, key, index) {
        var _this6 = this;

        if (this.issetIcon === true) return this.cvm.make('div', { key: "ifis" + key + index, class: { 'fc-upload-cover': true } }, function () {
            var icon = [];
            if (_this6._props.handleIcon !== false) icon.push(_this6.makeHandleIcon(src, key, index));
            if (_this6._props.allowRemove === true) icon.push(_this6.makeRemoveIcon(src, key, index));
            return icon;
        });
    },
    makeRemoveIcon: function makeRemoveIcon(src, key, index) {
        var _this7 = this;

        return this.cvm.icon({ key: "ifri" + key + index, props: { type: 'ios-trash-outline' }, nativeOn: { 'click': function click() {
                    _this7.onRemove(src) !== false && _this7.handler.parseValue.splice(index, 1);
                } } });
    },
    makeHandleIcon: function makeHandleIcon(src, key, index) {
        var _this8 = this;

        var props = this._props;
        return this.cvm.icon({ key: "ifhi" + key + index, props: { type: props.handleIcon.toString() }, nativeOn: { 'click': function click() {
                    _this8.onHandle(src);
                } } });
    },
    onRemove: function onRemove(src) {
        var fn = this.handler.rule.event['on-remove'];
        if (fn) return fn(src, this.handler.getValue());
    },
    onHandle: function onHandle(src) {
        var fn = this.handler.rule.event['on-handle'];
        if (fn) return fn(src);else this.defaultOnHandle(src);
    },
    showModel: function showModel() {
        var _this9 = this;

        var isShow = false !== this.onOpen(),
            _props = this._props,
            width = _props.width,
            height = _props.height,
            src = _props.src,
            title = _props.title;

        if (!isShow) return;
        this.vm.$Modal.remove();
        setTimeout(function () {
            _this9.vm.$Modal.confirm({
                title: title,
                render: function render() {
                    return [_this9.makeSpin(), _this9.cvm.make('iframe', {
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
                                _this9._props.spin === true && document.getElementsByClassName('fc-spin')[0] && document.getElementsByClassName('fc-spin')[0].remove();
                            }
                        },
                        key: 'ifmd' + (0, _util.uniqueId)()
                    })];
                },
                onOk: function onOk() {
                    return _this9.onOk();
                },
                onCancel: function onCancel() {
                    return _this9.onCancel();
                },
                showCancel: true,
                closable: true,
                scrollable: true,
                width: width
            });
        }, 301);
    }
});
render.prototype.defaultOnHandle = _upload2.default.render.prototype.defaultOnHandle;
Object.keys(eventList).forEach(function (k) {
    render.prototype[k] = function () {
        var fn = this.handler.rule.event[eventList[k]];
        if (fn) return fn(this.handler.getValue());
    };
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _handler2 = __webpack_require__(1);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(2);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var handler = (0, _handler3.default)({
	init: function init() {
		var _this = this;

		var props = this.rule.props;
		if (props.data === undefined) props.data = [];
		if (props.type === undefined) props.type = 'checked';
		if (props.multiple === undefined) props.multiple = false;
		if (this.isMultiple() && (0, _util.isArray)(this.value)) this.value = this.value[0] || '';
		this._data = {};
		this.data(props.data);
		var value = (0, _util.TA)(this.value);
		value.forEach(this.rule.props.type === 'selected' ? function (v) {
			return _this.selected(v);
		} : function (v) {
			return _this.checked(v);
		});
		this.value = [];
		props.type === 'selected' ? Object.keys(this._data).forEach(function (key) {
			var node = _this._data[key];
			if (node.selected === true) _this.value.push(node.id);
		}) : Object.keys(this._data).forEach(function (key) {
			var node = _this._data[key];
			if (node.checked === true) _this.value.push(node.id);
		});
	},
	toParseValue: function toParseValue(value) {
		value = [].concat(_toConsumableArray(new Set((0, _util.TA)(value))));
		this.choose(value);
		this.parseValue = value;
		return value;
	},
	choose: function choose(value) {
		var _this2 = this;

		var rule = this.rule,
		    _data = this._data;

		rule.props.type === 'selected' ? Object.keys(_data).forEach(function (key) {
			_this2.vm.$set(_data[key], 'selected', value.indexOf(_data[key].id) !== -1);
		}) : Object.keys(_data).forEach(function (key) {
			_this2.vm.$set(_data[key], 'checked', value.indexOf(_data[key].id) !== -1);
		});
	},
	checked: function checked(v) {
		if (this._data[v] !== undefined) {
			this.vm.$set(this._data[v], 'checked', true);
		}
	},
	selected: function selected(v) {
		if (this._data[v] !== undefined) {
			this.vm.$set(this._data[v], 'selected', true);
		}
	},
	isMultiple: function isMultiple() {
		return !this.rule.props.multiple && this.rule.props.type === 'selected';
	},
	toTrueValue: function toTrueValue(parseValue) {
		// let value = (this.el.getSelectedNodes === undefined
		// 	? parseValue
		// 	: this.toValue());
		var value = parseValue;
		return !this.isMultiple() ? value : value[0] || '';
	},
	selectedNodeToValue: function selectedNodeToValue(nodes) {
		var value = [];
		nodes.forEach(function (node) {
			if (node.selected === true) value.push(node.id);
		});
		return value;
	},
	checkedNodeToValue: function checkedNodeToValue(nodes) {
		var value = [];
		nodes.forEach(function (node) {
			if (node.checked === true) value.push(node.id);
		});
		return value;
	},
	toValue: function toValue() {
		return this.rule.props.type === 'selected' ? this.selectedNodeToValue(this.el.getSelectedNodes()) : this.checkedNodeToValue(this.el.getCheckedNodes());
	},
	data: function data(_data2) {
		var _this3 = this;

		_data2.forEach(function (node) {
			_this3._data[node.id] = node;
			if (node.children !== undefined && (0, _util.isArray)(node.children)) _this3.data(node.children);
		});
	}
});

var render = (0, _render2.default)({
	parse: function parse() {
		var _this4 = this;

		var _handler = this.handler,
		    rule = _handler.rule,
		    refName = _handler.refName,
		    field = _handler.field,
		    unique = _handler.unique,
		    props = this.props.on(rule.event).on({
			'on-select-change': function onSelectChange(v) {
				_this4.vm.changeTrueData(field, _this4.handler.toValue());
				rule.event['on-select-change'] && rule.event['on-select-change'](v);
			},
			'on-check-change': function onCheckChange(v) {
				_this4.vm.changeTrueData(field, _this4.handler.toValue());
				rule.event['on-check-change'] && rule.event['on-check-change'](v);
			}
		}).props(rule.props).ref(refName).key("fip" + unique).get();


		var inputProps = this.inputProps().props({
			type: "text",
			value: this.handler.parseValue.toString(),
			disable: true
		}).key('fipit' + unique).style({ display: 'none' }).ref(refName + "it").get();

		return [this.cvm.tree(props), this.cvm.input(inputProps)];
	}
});

exports.default = { handler: handler, render: render };

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _creator = __webpack_require__(27);

var _creator2 = _interopRequireDefault(_creator);

var _componentList = __webpack_require__(7);

var _componentList2 = _interopRequireDefault(_componentList);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var maker = function () {
    var _m = {};
    Object.keys(_componentList2.default).forEach(function (name) {
        _m[name] = (0, _creator2.default)(name);
    });

    _m.number = _m.inputnumber;
    _m.time = _m.timepicker;
    _m.date = _m.datepicker;
    _m.color = _m.colorpicker;

    var commonMaker = (0, _creator2.default)('');

    Object.assign(_m, {
        hidden: function () {
            var make = (0, _creator2.default)('hidden');
            return make.bind(make, '');
        }(),
        create: function create(type) {
            var field = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '__mp' + (0, _util.uniqueId)();

            var make = commonMaker('', field);
            make.rule.type = type;
            return make;
        },
        createTmp: function createTmp(template, vm) {
            var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '__mp' + (0, _util.uniqueId)();

            var make = commonMaker('', field);
            make.rule.type = '__tmp';
            make.rule.template = template;
            make.rule._vm = vm;
            return make;
        },

        number: _m.inputnumber,
        time: _m.timepicker,
        date: _m.datepicker,
        color: _m.colorpicker
    });

    return _m;
}();

exports.default = maker;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.creator = undefined;

var _util = __webpack_require__(0);

var _props = __webpack_require__(4);

var _props2 = _interopRequireDefault(_props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var creatorFactory = function creatorFactory(type) {
    return function $m(title, field) {
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        return new creator(Object.assign(baseRule(), { type: type, title: title, field: field, value: value }));
    };
};

var baseRule = function baseRule() {
    return {
        event: {},
        validate: [],
        options: [],
        col: {},
        children: [],
        emit: [],
        template: null
    };
};

var creator = function creator(rule) {
    _props2.default.call(this);
    this.rule = rule;
    this.get = function () {
        return this._data;
    };
    this.props({ hidden: false, visibility: false });
};

creator.prototype = _props2.default.prototype;

creator.constructor = creator;

var objAttrs = ['event', 'col'];

objAttrs.forEach(function (attr) {
    creator.prototype[attr] = function (opt) {
        this.rule[attr] = Object.assign(this.rule[attr], opt);
        return this;
    };
});

var arrAttrs = ['validate', 'options', 'children', 'emit'];

arrAttrs.forEach(function (attr) {
    creator.prototype[attr] = function (opt) {
        if (!(0, _util.isArray)(opt)) opt = [opt];
        this.rule[attr] = this.rule[attr].concat(opt);
        return this;
    };
});

creator.prototype.getRule = function () {
    return Object.assign(this.rule, this.get());
};

creator.prototype.setValue = function (value) {
    this.rule.value = value;
    return this;
};

creator.prototype.model = function (model, field) {
    if (!field) field = this.rule.field;
    this.rule.model = function (v) {
        model[field] = v;
    };
};

exports.default = creatorFactory;
exports.creator = creator;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cvm = __webpack_require__(6);

var _cvm2 = _interopRequireDefault(_cvm);

var _props = __webpack_require__(4);

var _props2 = _interopRequireDefault(_props);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var render = function render(_ref) {
    var vm = _ref.vm,
        options = _ref.options,
        fieldList = _ref.fieldList,
        handlers = _ref.handlers,
        formData = _ref.formData,
        validate = _ref.validate,
        fCreateApi = _ref.fCreateApi;

    this.vm = vm;
    this.options = options;
    this.handlers = handlers;
    this.renderSort = fieldList;
    this.renders = this.renderSort.reduce(function (initial, field) {
        initial[field] = handlers[field].render;
        return initial;
    }, {});
    this.form = {
        model: formData,
        rules: validate,
        key: 'form' + (0, _util.uniqueId)()
    };
    this.fCreateApi = fCreateApi;
    this.cvm = _cvm2.default.instance(vm.$createElement);
    this.props = _props2.default.instance();
    this.unique = (0, _util.uniqueId)();
    this.refName = 'cForm' + this.unique;
};

render.prototype = {
    parse: function parse(vm) {
        var _this = this;

        _cvm2.default.setVm(vm);
        if (!vm.isShow) return;
        var unique = this.unique,
            propsData = this.props.props(Object.assign({}, this.options.form, this.form)).ref(this.refName).class('form-create', true).key(unique).get(),
            vn = this.renderSort.map(function (field) {
            var render = _this.renders[field],
                _render$handler = render.handler,
                key = _render$handler.key,
                type = _render$handler.type;

            if (type === 'hidden') return;
            return _this.makeFormItem(render.handler, render.parse(), 'fItem' + key + unique);
        });
        if (vn.length > 0) vn.push(this.makeFormBtn(unique));
        return this.cvm.form(propsData, [this.cvm.row({ props: this.options.row || {} }, vn)]);
    },
    makeFormItem: function makeFormItem(_ref2, VNodeFn) {
        var rule = _ref2.rule,
            refName = _ref2.refName,
            unique = _ref2.unique,
            field = _ref2.field;

        var propsData = this.props.props({
            prop: field,
            label: rule.title,
            labelFor: refName,
            rules: rule.validate,
            labelWidth: rule.col.labelWidth,
            required: rule.props.required
        }).key(unique).get();
        return this.cvm.col({ props: rule.col, style: {
                display: rule.props.hidden === true ? 'none' : 'block',
                visibility: rule.props.visibility === true ? 'hidden' : 'visible'
            } }, [this.cvm.formItem(propsData, VNodeFn)]);
    },
    makeFormBtn: function makeFormBtn(unique) {
        var btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if (submitBtnShow) btn.push(this.makeSubmitBtn(unique, resetBtnShow ? 19 : 24));
        if (resetBtnShow) btn.push(this.makeResetBtn(unique, 4));

        return this.cvm.col({ props: { span: 24 } }, btn);
    },
    makeResetBtn: function makeResetBtn(unique, span) {
        var _this2 = this;

        return this.cvm.col({ props: { span: span, push: 1 } }, [this.cvm.button({ key: 'frsbtn' + unique, props: this.vm.resetProps, on: { "click": function click() {
                    _this2.fCreateApi.resetFields();
                } } }, [this.cvm.span(this.vm.resetProps.innerText)])]);
    },
    makeSubmitBtn: function makeSubmitBtn(unique, span) {
        var _this3 = this;

        return this.cvm.col({ props: { span: span } }, [this.cvm.button({ key: 'fbtn' + unique, props: this.vm.buttonProps, on: { "click": function click() {
                    _this3.fCreateApi.submit();
                } } }, [this.cvm.span(this.vm.buttonProps.innerText)])]);
    },
    removeRender: function removeRender(field) {
        delete this.renders[field];
        this.renderSort.splice(this.renderSort.indexOf(field), 1);
    },
    setRender: function setRender(handler, after, pre) {
        this.renders[handler.field] = handler.render;
        if (after !== undefined) this.changeSort(handler.field, after, pre);
    },
    changeSort: function changeSort(field, after, pre) {
        var index = this.renderSort.indexOf(after.toString());
        if (index !== -1) this.renderSort.splice(pre === false ? index + 1 : index, 0, field);else if (!pre) this.renderSort.push(field);else this.renderSort.unshift(field);
    }
};

exports.default = render;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _component = __webpack_require__(9);

var _common = __webpack_require__(3);

var formCreateComponent = function formCreateComponent(fComponent) {
    return {
        name: _component.formCreateName + 'Core',
        data: _common.componentCommon.data,
        render: function render() {
            return fComponent.fRender.parse(fComponent.vm);
        },
        methods: _common.componentCommon.methods,
        created: function created() {
            this.fComponent = fComponent;
            this.fComponent._type = 'rules';
            fComponent.init(this);
        },
        mounted: function mounted() {
            fComponent.mounted(this);
            this.$f = fComponent.fCreateApi;
            this.init();
        }
    };
};

exports.default = formCreateComponent;

/***/ })
/******/ ]);
});