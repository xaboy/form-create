/*! form-create v1.3 | github https://github.com/xaboy/form-create | author xaboy */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = undefined;

var _util = __webpack_require__(1);

var makerFactory = function makerFactory(type, attrs) {
    return function $m(title, field) {
        var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var rule = baseRule();
        rule.type = type;
        rule.title = title;
        rule.field = field;
        rule.value = value;
        return new make(rule, attrs);
    };
};

var baseRule = function baseRule() {
    return {
        props: {},
        event: {},
        validate: [],
        options: [],
        slot: {}
    };
};

var make = function make(rule, attrs) {
    var _this = this;

    this.rule = rule;
    attrs.forEach(function (attr) {
        _this[attr] = attrHandlers[attr];
    });
};

var attrHandlers = {};

var objAttrs = ['props', 'event', 'slot'];

objAttrs.forEach(function (attr) {
    attrHandlers[attr] = function (opt) {
        this.rule[attr] = Object.assign(this.rule[attr], opt);
        return this;
    };
});

var arrAttrs = ['validate', 'options'];

arrAttrs.forEach(function (attr) {
    attrHandlers[attr] = function (opt) {
        if (!(0, _util.isArray)(opt)) opt = [opt];
        this.rule[attr] = this.rule[attr].concat(opt);
        return this;
    };
});

make.prototype.getRule = function () {
    return this.rule;
};

make.prototype.setValue = function (value) {
    this.rule.value = value;
    return this;
};

make.prototype.model = function (model, field) {
    if (!field) field = this.rule.field;
    this.rule.model = function (v) {
        model[field] = v;
    };
};

exports.default = makerFactory;
exports.make = make;

/***/ }),
/* 1 */
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

var isArray = Array.isArray;

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

var uniqueId = function () {
	var id = 0;
	return function () {
		return id++;
	};
}();

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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(1);

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

var handler = function handler(vm, _ref) {
    var model = _ref.model,
        field = _ref.field,
        type = _ref.type,
        _ref$title = _ref.title,
        title = _ref$title === undefined ? '' : _ref$title,
        _ref$options = _ref.options,
        options = _ref$options === undefined ? [] : _ref$options,
        _ref$props = _ref.props,
        props = _ref$props === undefined ? {} : _ref$props,
        _ref$validate = _ref.validate,
        validate = _ref$validate === undefined ? [] : _ref$validate,
        _ref$event = _ref.event,
        event = _ref$event === undefined ? {} : _ref$event,
        _ref$value = _ref.value,
        value = _ref$value === undefined ? '' : _ref$value,
        _ref$slot = _ref.slot,
        slot = _ref$slot === undefined ? {} : _ref$slot;

    field = field.toString();
    this.type = type;
    this.model = model;
    this.value = value;
    this.rule = {
        title: title, options: options, props: props, slot: slot,
        validate: (0, _util.isArray)(validate) ? validate : [validate],
        event: Object.keys(event).reduce(function (initial, eventName) {
            initial['on-' + eventName] = event[eventName];
            return initial;
        }, {})
    };
    this.field = field;
    this.vm = vm;
    this.unique = (0, _util.uniqueId)();
    this.refName = field + '' + this.unique;
    this.el = {};
    this.init();
};

handler.prototype = {
    init: function init() {},
    toParseValue: function toParseValue(value) {
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
        this.vm.changeFormData(this.field, this.toParseValue(n.value));
    },
    mounted: function mounted() {
        this.el = this.vm.$refs[this.refName];
    }
};

exports.default = handlerFactory;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cvm = __webpack_require__(5);

var _cvm2 = _interopRequireDefault(_cvm);

var _props = __webpack_require__(6);

var _props2 = _interopRequireDefault(_props);

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
    init: function init() {},
    parse: function parse() {
        throw new Error('请实现parse方法');
    },
    inputProps: function inputProps() {
        var _this = this;

        var _handler = this.handler,
            refName = _handler.refName,
            unique = _handler.unique,
            field = _handler.field,
            props = _handler.rule.props;

        return this.props.props(Object.assign(props, { model: 'formData.' + field, value: this.vm.formData[field], elementId: refName })).ref(refName).key('fip' + unique).on(this.event).on('input', function (value) {
            _this.vm.$emit('input', value);
            _this.vm.$set(_this.vm.formData, field, value);
        });
    }
};

exports.default = renderFactory;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getMaker = exports.timeStampToDate = exports.getGlobalApi = exports.createHandler = exports.formCreateStyle = exports.getConfig = exports.getComponent = undefined;

var _util = __webpack_require__(1);

var _cascader = __webpack_require__(10);

var _cascader2 = _interopRequireDefault(_cascader);

var _checkbox = __webpack_require__(11);

var _checkbox2 = _interopRequireDefault(_checkbox);

var _colorPicker = __webpack_require__(12);

var _colorPicker2 = _interopRequireDefault(_colorPicker);

var _datePicker = __webpack_require__(13);

var _datePicker2 = _interopRequireDefault(_datePicker);

var _input = __webpack_require__(14);

var _input2 = _interopRequireDefault(_input);

var _inputNumber = __webpack_require__(15);

var _inputNumber2 = _interopRequireDefault(_inputNumber);

var _radio = __webpack_require__(16);

var _radio2 = _interopRequireDefault(_radio);

var _select = __webpack_require__(17);

var _select2 = _interopRequireDefault(_select);

var _switch = __webpack_require__(18);

var _switch2 = _interopRequireDefault(_switch);

var _timePicker = __webpack_require__(19);

var _timePicker2 = _interopRequireDefault(_timePicker);

var _hidden = __webpack_require__(20);

var _hidden2 = _interopRequireDefault(_hidden);

var _upload = __webpack_require__(7);

var _upload2 = _interopRequireDefault(_upload);

var _rate = __webpack_require__(21);

var _rate2 = _interopRequireDefault(_rate);

var _slider = __webpack_require__(22);

var _slider2 = _interopRequireDefault(_slider);

var _frame = __webpack_require__(23);

var _frame2 = _interopRequireDefault(_frame);

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
    frame: _frame2.default
};

var getComponent = function getComponent(componentName) {
    if (componentList[componentName] === undefined) throw new Error(componentName + ' \u8868\u5355\u7C7B\u578B\u4E0D\u5B58\u5728');
    return componentList[componentName];
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
            loading: false
        },
        mounted: function mounted() {}
    };
};

var createHandler = function createHandler(vm, rule, createOptions) {
    var component = getComponent(rule.type),
        $h = new component.handler(vm, rule);
    $h.render = new component.render(vm, $h, createOptions);
    return $h;
};

var formCreateStyle = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;box-sizing: border-box;}' + ' .fc-files>.ivu-icon{transform: translateY(20%);}' + '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' + '.fc-upload .ivu-upload{display: inline-block;}' + '.fc-upload-btn{border: 1px dashed #dddee1;}' + '.fc-upload .fc-upload-cover{ display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); }' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-files:hover .fc-upload-cover{ display: block; }' + '.fc-upload .ivu-upload-list-file{ display: inline-block;float: left; }' + '.fc-upload .ivu-upload-list{ position: absolute;left: 0; }' + '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';

var getGlobalApi = function getGlobalApi(fComponent) {
    var vm = fComponent.vm;
    return {
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
        model: function model(_model, fields) {
            if (!fields) fields = this.fields();else if (!(0, _util.isArray)(fields)) fields = [fields];
            fields.forEach(function (field) {
                var handler = fComponent.handlers[field];
                if (!handler) throw new Error(field + '\u5B57\u6BB5\u4E0D\u5B58\u5728');
                handler.model = function (v) {
                    _model[field] = v;
                };
                handler.model(handler.vm.getTrueData(field));
            });
        },

        submitStatus: function submitStatus() {
            var _props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var props = (0, _util.deepExtend)(Object.create(null), _props);
            vm.changeButtonProps(props);
        },
        btn: {
            loading: function loading() {
                vm.changeButtonProps({ loading: true });
            },
            finish: function finish() {
                vm.changeButtonProps({ loading: false });
            }
        },
        closeModal: function closeModal() {
            vm.$Modal.remove();
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
    var maker = Object.keys(componentList).reduce(function (initial, name) {
        initial[name] = componentList[name].make;
        return initial;
    }, {});
    maker.number = componentList.inputnumber.make;
    maker.time = componentList.timepicker.make;
    maker.date = componentList.datepicker.make;
    maker.color = componentList.colorpicker.make;
    return maker;
};

exports.getComponent = getComponent;
exports.getConfig = getConfig;
exports.formCreateStyle = formCreateStyle;
exports.createHandler = createHandler;
exports.getGlobalApi = getGlobalApi;
exports.timeStampToDate = timeStampToDate;
exports.getMaker = getMaker;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(1);

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
        return (0, _util.isFunction)(VNode) ? VNode() : VNode;
    }
};

var nodes = { modal: 'Modal', progress: 'i-progress', button: 'i-button', icon: 'Icon', span: 'span', slider: 'Slider', rate: 'Rate', upload: 'Upload', cascader: 'Cascader', colorPicker: 'Color-Picker', timePicker: 'Time-Picker', datePicker: 'Date-Picker', 'switch': 'i-switch', option: 'i-option', select: 'i-select', checkbox: 'Checkbox', checkboxGroup: 'Checkbox-Group', radio: 'Radio', radioGroup: 'Radio-Group', inputNumber: 'Input-Number', input: 'i-input', formItem: 'Form-Item', form: 'i-form' };

Object.keys(nodes).forEach(function (k) {
    cvm.prototype[k] = function (data, VNodeFn) {
        return this.make(nodes[k], data, VNodeFn);
    };
});

exports.default = cvm;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(1);

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
            this._data[key] = (0, _util.assign)({}, this._data[key], obj);
        } else {
            this._data[key][obj.toString()] = val;
        }
        return this;
    };
});

exports.default = props;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler2 = __webpack_require__(2);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(1);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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
        this.el = this.vm.$refs[this.refName] || {};
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
        n.rule.props.defaultFileList.forEach(function (pic) {
            b = b && (pic.percentage === undefined || pic.status === 'finished');
        });
        if (b) this.vm.changeFormData(this.field, this.toParseValue(n.value));
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
        this.vm.$Modal.info({
            title: "预览",
            render: function render(h) {
                return h('img', { attrs: { src: src }, style: "width: 100%" });
            }
        });
    },
    onHandle: function onHandle(src) {
        var fn = this.uploadOptions.onHandle;
        if (fn) return fn(src);else this.defaultOnHandle(src);
    },
    parse: function parse() {
        var _this3 = this;

        var _handler = this.handler,
            rule = _handler.rule,
            unique = _handler.unique;

        this.uploadOptions = Object.assign(Object.create(null), this.options.upload, rule.props);
        if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'ios-eye-outline';
        var value = this.vm.formData[this.handler.field],
            render = [].concat(_toConsumableArray(value.map(function (file, index) {
            if (file.status === undefined || file.status === 'finished') {
                return _this3.makeUploadView(file.url, "" + index + unique, index);
            } else if (file.showProgress) {
                return _this3.makeProgress(file, "" + index + unique);
            }
        })));
        render.push(this.makeUploadBtn(unique, !this.uploadOptions.maxLength || this.uploadOptions.maxLength > this.vm.formData[this.handler.field].length));
        return [this.cvm.make('div', { key: "div4" + unique, class: { 'fc-upload': true } }, render)];
    },
    makeUploadView: function makeUploadView(src, key, index) {
        var _this4 = this;

        return this.cvm.make('div', { key: "div1" + key, class: { 'fc-files': true } }, function () {
            var container = [];
            if (_this4.handler.rule.props.uploadType === 'image') {
                container.push(_this4.cvm.make('img', { key: "img" + key, attrs: { src: src } }));
            } else {
                container.push(_this4.cvm.icon({ key: "file" + key, props: { type: "document-text", size: 40 } }));
            }
            if (_this4.issetIcon) container.push(_this4.makeIcons(src, key, index));
            return container;
        });
    },
    makeIcons: function makeIcons(src, key, index) {
        var _this5 = this;

        return this.cvm.make('div', { key: "div2" + key, class: { 'fc-upload-cover': true } }, function () {
            var icon = [];
            if (!!_this5.uploadOptions.handleIcon) icon.push(_this5.makeHandleIcon(src, key, index));
            if (_this5.uploadOptions.allowRemove === true) icon.push(_this5.makeRemoveIcon(src, key, index));
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
        var _this6 = this;

        return this.cvm.icon({ key: "upri" + key + index, props: { type: 'ios-trash-outline' }, nativeOn: { 'click': function click() {
                    _this6.handler.el.fileList.splice(index, 1);
                    _this6.handler.changeParseValue(_this6.handler.el.fileList);
                } } });
    },
    makeHandleIcon: function makeHandleIcon(src, key, index) {
        var _this7 = this;

        return this.cvm.icon({ key: "uphi" + key + index, props: { type: this.uploadOptions.handleIcon.toString() }, nativeOn: { 'click': function click() {
                    _this7.onHandle(src);
                } } });
    }
});

var make = (0, _make2.default)('upload', ['props', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _formCreate = __webpack_require__(9);

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
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(1);

var _common = __webpack_require__(4);

var _form = __webpack_require__(24);

var _form2 = _interopRequireDefault(_form);

var _formCreateComponent = __webpack_require__(25);

var _formCreateComponent2 = _interopRequireDefault(_formCreateComponent);

var _make = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var version = '1.3.0';

var maker = (0, _common.getMaker)();

var formCreateStyleElId = 'form-create-style';

var formCreate = function formCreate(rules, _options) {
    if (!this instanceof formCreate) throwIfMissing('formCreate is a constructor and should be called with the `new` keyword');
    var options = (0, _util.deepExtend)((0, _util.deepExtend)(Object.create(null), (0, _common.getConfig)()), _options);
    this.rules = Array.isArray(rules) ? rules : [];
    this.handlers = {};
    this.fRender = {};
    this.formData = {};
    this.validate = {};
    this.trueData = {};
    this.fieldList = [];
    options.el = !options.el ? window.document.body : (0, _util.isElement)(options.el) ? options.el : document.querySelector(options.el);
    this.options = options;
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

    var v = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.Vue;

    var opt = (0, _util.isElement)(_opt) ? { el: _opt } : _opt;
    var fComponent = new formCreate(rules, (0, _util.deepExtend)(Object.create(null), opt)),
        $vm = fComponent.create(v);
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
};

formCreate.prototype = {
    checkRule: function checkRule(rule) {
        rule.type = rule.type === undefined ? 'hidden' : rule.type.toLowerCase();
        if (!rule.field) rule.field = '';
        return rule;
    },
    setHandler: function setHandler(handler) {
        var rule = handler.rule,
            field = handler.field;
        this.handlers[field] = handler;
        this.formData[field] = handler.toParseValue(handler.value);
        this.validate[field] = rule.validate;
        this.trueData[field] = {
            value: handler.toTrueValue(this.formData[field]),
            rule: handler.rule
        };
    },
    init: function init(vm) {
        var _this = this;

        this.vm = vm;
        this.rules.forEach(function (rule, index) {
            if (rule instanceof _make.make) _this.rules[index] = rule.getRule();
        });
        this.rules.filter(function (rule) {
            return rule.field !== undefined;
        }).forEach(function (rule) {
            rule = _this.checkRule(rule);
            var handler = (0, _common.createHandler)(_this.vm, rule, _this.options);
            if (_this.fieldList.indexOf(handler.field) === -1) {
                _this.setHandler(handler);
                _this.fieldList.push(handler.field);
            } else {
                console.error(handler.field + " \u5B57\u6BB5\u5DF2\u5B58\u5728");
            }
        });
        this.fCreateApi = (0, _common.getGlobalApi)(this);
        vm.$set(vm, 'formData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        this.fRender = new _form2.default(this);
    },
    create: function create(Vue) {
        var $fCreate = Vue.extend(this.component()),
            $vm = new $fCreate().$mount();
        this.options.el.appendChild($vm.$el);
        return $vm;
    },
    component: function component() {
        return (0, _formCreateComponent2.default)(this);
    },
    append: function append(rule, after, pre) {
        if (rule instanceof _make.make) rule = rule.getRule();
        var _rule = (0, _util.deepExtend)(Object.create(null), this.checkRule(rule));
        var handler = (0, _common.createHandler)(this.vm, _rule, this.options);
        if (Object.keys(this.handlers).indexOf(handler.field) !== -1) throw new Error(_rule.field + "\u5B57\u6BB5\u5DF2\u5B58\u5728");
        this.vm.setField(handler.field);
        this.fRender.setRender(handler, after || '', pre);
        this.setHandler(handler);
        this.addHandlerWatch(handler);
        this.vm.$nextTick(function () {
            handler.mounted();
        });
    },
    removeField: function removeField(field) {
        if (this.handlers[field] === undefined) throw new Error(field + "\u5B57\u6BB5\u4E0D\u5B58\u5728");
        this.vm.removeFormData(field);
        delete this.handlers[field];
        delete this.validate[field];
        this.fRender.removeRender(field);
        delete this.formData[field];
        delete this.trueData[field];
    },
    addHandlerWatch: function addHandlerWatch(handler) {
        var _this2 = this;

        var field = handler.field;
        var unWatch = this.vm.$watch("formData." + field, function (n, o) {
            if (handler !== undefined) {
                handler.setParseValue(n);
            } else unWatch();
        }, { deep: true });
        var unWatch2 = this.vm.$watch("trueData." + field, function (n, o) {
            if (handler !== undefined) {
                var json = JSON.stringify(n);
                if (_this2.vm.jsonData[field] !== json) {
                    _this2.vm.jsonData[field] = json;
                    handler.model && handler.model(_this2.vm.getTrueData(field));
                    handler.watchTrueValue(n);
                }
            } else unWatch2();
        }, { deep: true });
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

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(1);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    init: function init() {
        var rule = this.rule;
        if (!rule.props.data) rule.props.data = [];
        if (!(0, _util.isArray)(this.value)) this.value = [];
    },
    toTrueValue: function toTrueValue() {
        if (this.el.value === undefined) return this.vm.getFormData(this.field);else return this.el.value;
    },
    toParseValue: function toParseValue(value) {
        if ((0, _util.isArray)(value)) return Array.from(value);else return [];
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.cascader(this.inputProps().get())];
    }
});

var make = (0, _make2.default)('cascader', ['props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler2 = __webpack_require__(2);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(1);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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

var make = (0, _make2.default)('checkbox', ['options', 'props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.colorPicker(this.inputProps().get())];
    }
});

var make = (0, _make2.default)('colorpicker', ['props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(1);

var _common = __webpack_require__(4);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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
            parseValue = isArr ? parseValue = value[0] || '' : value;
            parseValue = !parseValue ? '' : (0, _common.timeStampToDate)(parseValue);
        }
        return parseValue;
    },
    toTrueValue: function toTrueValue() {
        return this.el.publicStringValue;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.datePicker(this.inputProps().get())];
    }
});

var make = (0, _make2.default)('datepicker', ['props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.input(this.inputProps().get())];
    }
});

var make = (0, _make2.default)('input', ['props', 'event', 'validate', 'slot']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handler = (0, _handler2.default)({
    toParseValue: function toParseValue(value) {
        var parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = '';
        return parseValue;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.inputNumber(this.inputProps().get())];
    }
});

var make = (0, _make2.default)('inputnumber', ['props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler2 = __webpack_require__(2);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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

var make = (0, _make2.default)('radio', ['options', 'props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler2 = __webpack_require__(2);

var _handler3 = _interopRequireDefault(_handler2);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(1);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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

var make = (0, _make2.default)('select', ['options', 'props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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

var make = (0, _make2.default)('switch', ['slot', 'props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(1);

var _common = __webpack_require__(4);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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
        return this.el.publicStringValue;
    },
    getTime: function getTime(date) {
        return (0, _util.isDate)(date) ? (0, _util.dateFormat)('hh:mm:ss', date) : date;
    }
});

var render = (0, _render2.default)({
    parse: function parse() {
        return [this.cvm.timePicker(this.inputProps().get())];
    }
});

var make = (0, _make2.default)('timepicker', ['props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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

var make = function () {
    var makeRule = (0, _make2.default)('hidden', []);
    return makeRule.bind(makeRule, '');
}();

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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

var make = (0, _make2.default)('rate', ['props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(1);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

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

var make = (0, _make2.default)('slider', ['props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.make = exports.render = exports.handler = undefined;

var _handler = __webpack_require__(2);

var _handler2 = _interopRequireDefault(_handler);

var _render = __webpack_require__(3);

var _render2 = _interopRequireDefault(_render);

var _util = __webpack_require__(1);

var _make = __webpack_require__(0);

var _make2 = _interopRequireDefault(_make);

var _upload = __webpack_require__(7);

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

var eventList = { onOpen: 'on-open', onChange: 'on-change', onOk: 'on-ok' };

var render = (0, _render2.default)({
    init: function init() {
        var _this = this;

        var field = this.handler.field,
            b = false;
        this.vm.$watch("formData." + field, function () {
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
            readonly: true
        }).on('on-click', function () {
            _this2.showModel();
        }).key('ifit' + unique).style({ display: hidden === true ? 'none' : 'inline-block' }).get();
        return [this.cvm.input(props)];
    },
    makeGroup: function makeGroup(render) {
        var unique = this.handler.unique,
            field = this.handler.field;
        return [this.cvm.make('div', { key: "ifgp1" + unique, class: { 'fc-upload fc-frame': true }, ref: this.handler.refName, props: { value: this.vm.formData[field] } }, render), this.makeInput(true)];
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
        // return this.cvm.make('div',{key:`ifgp2${unique}`,class:{'ivu-upload ivu-upload-select':true}})
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

        isShow && this.vm.$Modal.info({
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
                            _this9._props.spin === true && document.getElementsByClassName('fc-spin')[0].remove();
                        }
                    },
                    key: "ifmd" + (0, _util.uniqueId)()
                })];
            },
            onOk: function onOk() {
                _this9.onOk();
            },
            width: width
        });
    }
});
render.prototype.defaultOnHandle = _upload.render.prototype.defaultOnHandle;
Object.keys(eventList).forEach(function (k) {
    render.prototype[k] = function () {
        var fn = this.handler.rule.event['on-open'];
        if (fn) return fn(this.handler.getValue());
    };
});

var make = (0, _make2.default)('frame', ['props', 'event', 'validate']);

var component = { handler: handler, render: render, make: make };

exports.default = component;
exports.handler = handler;
exports.render = render;
exports.make = make;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _cvm = __webpack_require__(5);

var _cvm2 = _interopRequireDefault(_cvm);

var _props = __webpack_require__(6);

var _props2 = _interopRequireDefault(_props);

var _util = __webpack_require__(1);

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
        rules: validate
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
        var unique = this.unique,
            propsData = this.props.props(Object.assign({}, this.options.form, this.form)).ref(this.refName).class('form-create', true).key(unique).get(),
            vn = this.renderSort.map(function (field) {
            var render = _this.renders[field],
                _render$handler = render.handler,
                key = _render$handler.key,
                type = _render$handler.rule.type;
            if (type !== 'hidden') return _this.makeFormItem(render.handler, render.parse(), 'fItem' + key + unique);
        });
        if (false !== this.options.submitBtn) vn.push(this.makeSubmitBtn(unique));
        return this.cvm.form(propsData, vn);
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
            rules: rule.validate
        }).key(unique).get();
        return this.cvm.formItem(propsData, VNodeFn);
    },
    makeSubmitBtn: function makeSubmitBtn(unique) {
        var _this2 = this;

        return this.cvm.button({ key: 'fbtn' + unique, props: this.vm.buttonProps, on: { "click": function click() {
                    _this2.fCreateApi.submit();
                } } }, [this.cvm.span(this.options.submitBtn.innerText)]);
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
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var formCreateName = 'form-create';

var formCreateComponent = function formCreateComponent(fComponent) {
    return {
        name: formCreateName,
        data: function data() {
            return {
                formData: {},
                buttonProps: {},
                trueData: {},
                jsonData: {}
            };
        },

        render: function render() {
            return fComponent.fRender.parse(fComponent.vm);
        },
        created: function created() {
            fComponent.init(this);
        },

        methods: {
            changeFormData: function changeFormData(field, value) {
                this.$set(this.formData, field, value);
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
                return this.formData[field];
            },
            removeFormData: function removeFormData(field) {
                this.$delete(this.formData, field);
                this.$delete(this.trueData, field);
            },
            changeButtonProps: function changeButtonProps(props) {
                this.$set(this, 'buttonProps', Object.assign(this.buttonProps, props));
            },
            setField: function setField(field) {
                this.$set(this.formData, field, '');
                this.$set(this.trueData, field, {});
            }
        },
        mounted: function mounted() {
            var _this = this;

            Object.keys(this.formData).map(function (field) {
                var handler = fComponent.handlers[field];
                handler.model && handler.model(_this.getTrueData(field));
                fComponent.addHandlerWatch(handler);
                handler.mounted();
            });
            fComponent.options.mounted && fComponent.options.mounted();
        }
    };
};

exports.default = formCreateComponent;

/***/ })
/******/ ]);
});