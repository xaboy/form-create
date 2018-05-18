/*! form-create v1.1 | github https://github.com/xaboy/form-builder.git */
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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
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

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRender = exports.uploadRender = exports.colorpickerRender = exports.timepickerRender = exports.datepickerRender = exports.switchRender = exports.selectRender = exports.checkboxRender = exports.radioRender = exports.inputnumberRender = exports.inputRender = exports.hiddenRender = exports.formRender = undefined;

var _cvm = __webpack_require__(2);

var _cvm2 = _interopRequireDefault(_cvm);

var _props = __webpack_require__(5);

var _props2 = _interopRequireDefault(_props);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var render = function render(vm, handler) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    this.handler = handler;
    this.options = options;
    this.vm = vm;
    this.cvm = _cvm2.default.instance(vm.$createElement);
    this.init();
};

render.prototype = {
    props: _props2.default.instance(),
    init: function init() {
        this.event = this.handler.rule.event;
    },
    parse: function parse() {
        throw new Error('请实现parse方法');
    },
    inputProps: function inputProps() {
        var _this = this;

        var _handler = this.handler,
            refName = _handler.refName,
            unique = _handler.unique,
            _handler$rule = _handler.rule,
            props = _handler$rule.props,
            field = _handler$rule.field;

        return this.props.props(Object.assign(props, { model: 'formData.' + field, value: this.vm.formData[field], elementId: refName })).ref(refName).key('fip' + unique).on(this.event).on('input', function (value) {
            _this.vm.$emit('input', value);
            _this.vm.$set(_this.vm.formData, field, value);
        });
    }
};

var renderFactory = function renderFactory(prototypeExtend) {
    var $r = function $r(vm, handler, options) {
        render.call(this, vm, handler, options);
    };
    $r.prototype = Object.create(render.prototype);
    Object.assign($r.prototype, prototypeExtend);
    $r.prototype.constructor = $r;
    return $r;
};

var hiddenRender = renderFactory({
    parse: function parse() {
        return [];
    }
});

var inputRender = renderFactory({
    parse: function parse() {
        this.propsData = this.inputProps().get();
        return [this.cvm.input(this.propsData)];
    }
});

var inputnumberRender = renderFactory({
    parse: function parse() {
        this.propsData = this.inputProps().get();
        return [this.cvm.inputNumber(this.propsData)];
    }
});

var radioRender = renderFactory({
    parse: function parse() {
        var _this2 = this;

        this.propsData = this.inputProps().get();
        var _handler2 = this.handler,
            unique = _handler2.unique,
            options = _handler2.rule.options;

        return [this.cvm.radioGroup(this.propsData, function () {
            return options.map(function (option, index) {
                return _this2.cvm.radio({ props: option, key: 'ropt' + index + unique });
            });
        })];
    }
});

var checkboxRender = renderFactory({
    parse: function parse() {
        var _this3 = this;

        this.propsData = this.inputProps().get();
        var _handler3 = this.handler,
            unique = _handler3.unique,
            options = _handler3.rule.options;

        return [this.cvm.checkboxGroup(this.propsData, function () {
            return options.map(function (option, index) {
                return _this3.cvm.checkbox({ props: option, key: 'copt' + index + unique });
            });
        })];
    }
});

var selectRender = renderFactory({
    parse: function parse() {
        var _this4 = this;

        this.propsData = this.inputProps().get();
        var _handler4 = this.handler,
            unique = _handler4.unique,
            options = _handler4.rule.options;

        return [this.cvm.select(this.propsData, function () {
            return options.map(function (option, index) {
                return _this4.cvm.option({ props: option, key: 'sopt' + index + unique });
            });
        })];
    }
});

var switchRender = renderFactory({
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

var datepickerRender = renderFactory({
    parse: function parse() {
        this.propsData = this.inputProps().get();
        return [this.cvm.datePicker(this.propsData)];
    }
});

var timepickerRender = renderFactory({
    parse: function parse() {
        this.propsData = this.inputProps().get();
        return [this.cvm.timePicker(this.propsData)];
    }
});

var colorpickerRender = renderFactory({
    parse: function parse() {
        this.propsData = this.inputProps().get();
        return [this.cvm.colorPicker(this.propsData)];
    }
});

var cascaderRender = renderFactory({
    parse: function parse() {
        this.propsData = this.inputProps().get();
        return [this.cvm.cascader(this.propsData)];
    }
});

var uploadRender = renderFactory({
    init: function init() {
        var _this5 = this;

        var field = this.handler.getField();
        this.uploadOptions = Object.assign(Object.create(null), this.options.upload, this.handler.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        this.propsData = this.props.props(this.uploadOptions).props('onSuccess', function (response, file, fileList) {
            var pic = _this5.uploadOptions.onSuccess.call(null, response, file, fileList);
            setTimeout(function () {
                _this5.vm.formData[field].status = 'normal';
                pic && _this5.handler.push(pic);
            }, 300);
        }).props('beforeUpload', function () {
            var _uploadOptions$before;

            for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
            }

            return (_uploadOptions$before = _this5.uploadOptions.beforeUpload).call.apply(_uploadOptions$before, [null].concat(arg));
        }).props('onProgress', function () {
            var _uploadOptions$onProg;

            for (var _len2 = arguments.length, arg = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                arg[_key2] = arguments[_key2];
            }

            _this5.vm.formData[field].status = arg[1];
            return (_uploadOptions$onProg = _this5.uploadOptions.onProgress).call.apply(_uploadOptions$onProg, [null].concat(arg));
        }).props('onPreview', function () {
            var _uploadOptions$onPrev;

            for (var _len3 = arguments.length, arg = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                arg[_key3] = arguments[_key3];
            }

            return (_uploadOptions$onPrev = _this5.uploadOptions.onPreview).call.apply(_uploadOptions$onPrev, [null].concat(arg));
        }).props('onRemove', function () {
            var _uploadOptions$onRemo;

            for (var _len4 = arguments.length, arg = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                arg[_key4] = arguments[_key4];
            }

            return (_uploadOptions$onRemo = _this5.uploadOptions.onRemove).call.apply(_uploadOptions$onRemo, [null].concat(arg));
        }).props('onFormatError', function () {
            var _uploadOptions$onForm;

            for (var _len5 = arguments.length, arg = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                arg[_key5] = arguments[_key5];
            }

            return (_uploadOptions$onForm = _this5.uploadOptions.onFormatError).call.apply(_uploadOptions$onForm, [null].concat(arg));
        }).props('onExceededSize', function () {
            var _uploadOptions$onExce;

            for (var _len6 = arguments.length, arg = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
                arg[_key6] = arguments[_key6];
            }

            return (_uploadOptions$onExce = _this5.uploadOptions.onExceededSize).call.apply(_uploadOptions$onExce, [null].concat(arg));
        }).props('onError', function () {
            var _uploadOptions$onErro;

            for (var _len7 = arguments.length, arg = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                arg[_key7] = arguments[_key7];
            }

            return (_uploadOptions$onErro = _this5.uploadOptions.onError).call.apply(_uploadOptions$onErro, [null].concat(arg));
        }).ref(this.handler.refName).key('fip' + this.handler.unique).get();
    },
    parse: function parse() {
        var _this6 = this;

        var _handler5 = this.handler,
            rule = _handler5.rule,
            unique = _handler5.unique,
            value = this.vm.formData[rule.field],
            render = [].concat(_toConsumableArray(value.files.map(function (img, index) {
            return _this6.makeUploadView(img, '' + index + unique);
        })));

        if (value.status.showProgress === true) render.push(this.makeProgress(value.status, unique));
        if (!this.uploadOptions.maxLength || this.uploadOptions.maxLength > this.vm.formData[rule.field].files.length) render.push(this.makeUploadBtn(unique));
        return [this.cvm.make('div', { key: 'div4' + unique, class: { 'fc-upload': true } }, render)];
    },
    makeUploadView: function makeUploadView(src, key) {
        var _this7 = this;

        return this.cvm.make('div', { key: 'div1' + key, class: { 'fc-files': true } }, function () {
            var container = [];
            if (_this7.uploadOptions.uploadType === 'image') {
                container.push(_this7.cvm.make('img', { key: 'img' + key, attrs: { src: src } }));
            } else {
                container.push(_this7.cvm.icon({ key: 'file' + key, props: { type: "document-text", size: 40 } }));
            }
            if (_this7.issetIcon) container.push(_this7.makeIcons(src, key));
            return container;
        });
    },
    makeIcons: function makeIcons(src, key) {
        var _this8 = this;

        return this.cvm.make('div', { key: 'div2' + key, class: { 'fc-upload-cover': true } }, function () {
            var icon = [];
            if (!!_this8.uploadOptions.handleIcon) icon.push(_this8.makeHandleIcon(src, key));
            if (_this8.uploadOptions.allowRemove === true) icon.push(_this8.makeRemoveIcon(src, key));
            return icon;
        });
    },
    makeProgress: function makeProgress(file, unique) {
        return this.cvm.make('div', { key: 'div3' + unique, class: { 'fc-files': true } }, [this.cvm.progress({ key: 'upp' + unique, props: { percent: file.percentage, hideInfo: true } })]);
    },
    makeUploadBtn: function makeUploadBtn(unique) {
        return this.cvm.upload(this.propsData, [this.cvm.make('div', { key: 'div5' + unique, class: { 'fc-upload-btn': true } }, [this.cvm.icon({ key: 'upi' + unique, props: { type: "camera", size: 20 } })])]);
    },
    makeRemoveIcon: function makeRemoveIcon(src, key) {
        var _this9 = this;

        return this.cvm.icon({ key: 'upri' + key, props: { type: 'ios-trash-outline' }, nativeOn: { 'click': function click() {
                    var _handler$getParseValu = _this9.handler.getParseValue(),
                        files = _handler$getParseValu.files;

                    files.splice(files.indexOf(src), 1);
                } } });
    },
    makeHandleIcon: function makeHandleIcon(src, key) {
        var _this10 = this;

        return this.cvm.icon({ key: 'uphi' + key, props: { type: this.uploadOptions.handleIcon.toString() }, nativeOn: { 'click': function click() {
                    _this10.uploadOptions.onHandle(src);
                } } });
    }
});

var renderList = {
    hidden: hiddenRender,
    input: inputRender,
    radio: radioRender,
    checkbox: checkboxRender,
    switch: switchRender,
    select: selectRender,
    datepicker: datepickerRender,
    timepicker: timepickerRender,
    inputnumber: inputnumberRender,
    colorpicker: colorpickerRender,
    upload: uploadRender,
    cascader: cascaderRender
};

var getRender = function getRender(type) {
    return renderList[type];
};

var formRender = function formRender(_ref) {
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

formRender.prototype = {
    parse: function parse() {
        var _this11 = this;

        var unique = this.unique,
            propsData = this.props.props(Object.assign({}, this.options.form, this.form)).ref(this.refName).key(unique).get(),
            vn = this.renderSort.map(function (field) {
            var render = _this11.renders[field],
                _render$handler = render.handler,
                key = _render$handler.key,
                type = _render$handler.rule.type;
            if (type !== 'hidden') return _this11.makeFormItem(render.handler, render.parse(), 'fItem' + key + unique);
        });
        if (false !== this.options.submitBtn) vn.push(this.makeSubmitBtn(unique));
        return this.cvm.form(propsData, vn);
    },
    makeFormItem: function makeFormItem(_ref2, VNodeFn) {
        var rule = _ref2.rule,
            refName = _ref2.refName,
            unique = _ref2.unique;

        var propsData = this.props.props({
            prop: rule.field,
            label: rule.title,
            labelFor: refName,
            rules: rule.validate
        }).key(unique).get();
        return this.cvm.formItem(propsData, VNodeFn);
    },
    makeSubmitBtn: function makeSubmitBtn(unique) {
        var _this12 = this;

        return this.cvm.button({ key: 'fbtn' + unique, props: this.vm.buttonProps, on: { "click": function click() {
                    _this12.fCreateApi.submit();
                } } }, [this.cvm.span(this.options.submitBtn.innerText)]);
    },
    removeRender: function removeRender(field) {
        delete this.renders[field];
        this.renderSort.splice(this.renderSort.indexOf(field), 1);
    },
    setRender: function setRender(handler, after, pre) {
        this.renders[handler.rule.field] = handler.render;
        if (after !== undefined) this.changeSort(handler.rule.field, after, pre);
    },
    changeSort: function changeSort(field, after, pre) {
        var index = this.renderSort.indexOf(after.toString());
        if (index !== -1) this.renderSort.splice(pre === false ? index + 1 : index, 0, field);else if (!pre) this.renderSort.push(field);else this.renderSort.unshift(field);
    }
};

exports.formRender = formRender;
exports.hiddenRender = hiddenRender;
exports.inputRender = inputRender;
exports.inputnumberRender = inputnumberRender;
exports.radioRender = radioRender;
exports.checkboxRender = checkboxRender;
exports.selectRender = selectRender;
exports.switchRender = switchRender;
exports.datepickerRender = datepickerRender;
exports.timepickerRender = timepickerRender;
exports.colorpickerRender = colorpickerRender;
exports.uploadRender = uploadRender;
exports.getRender = getRender;

/***/ }),
/* 2 */
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
    form: function form(data, VNodeFn) {
        return this.make('i-form', data, VNodeFn);
    },
    formItem: function formItem(data, VNodeFn) {
        return this.make('form-Item', data, VNodeFn);
    },
    input: function input(data, VNodeFn) {
        return this.make('i-input', data, VNodeFn);
    },
    inputNumber: function inputNumber(data, VNodeFn) {
        return this.make('Input-Number', data, VNodeFn);
    },
    radioGroup: function radioGroup(data, VNodeFn) {
        return this.make('Radio-Group', data, VNodeFn);
    },
    radio: function radio(data, VNodeFn) {
        return this.make('Radio', data, VNodeFn);
    },
    checkboxGroup: function checkboxGroup(data, VNodeFn) {
        return this.make('Checkbox-Group', data, VNodeFn);
    },
    checkbox: function checkbox(data, VNodeFn) {
        return this.make('Checkbox', data, VNodeFn);
    },
    select: function select(data, VNodeFn) {
        return this.make('i-select', data, VNodeFn);
    },
    option: function option(data, VNodeFn) {
        return this.make('i-option', data, VNodeFn);
    },
    switch: function _switch(data, VNodeFn) {
        return this.make('i-switch', data, VNodeFn);
    },
    datePicker: function datePicker(data, VNodeFn) {
        return this.make('Date-Picker', data, VNodeFn);
    },
    timePicker: function timePicker(data, VNodeFn) {
        return this.make('Time-Picker', data, VNodeFn);
    },
    colorPicker: function colorPicker(data, VNodeFn) {
        return this.make('Color-Picker', data, VNodeFn);
    },
    cascader: function cascader(data, VNodeFn) {
        return this.make('Cascader', data, VNodeFn);
    },
    upload: function upload(data, VNodeFn) {
        return this.make('Upload', data, VNodeFn);
    },
    span: function span(data, VNodeFn) {
        return this.make('span', data, VNodeFn);
    },
    icon: function icon(data, VNodeFn) {
        return this.make('Icon', data, VNodeFn);
    },
    button: function button(data, VNodeFn) {
        return this.make('i-button', data, VNodeFn);
    },
    progress: function progress(data, VNodeFn) {
        return this.make('i-progress', data, VNodeFn);
    },
    modal: function modal(data, VNodeFn) {
        return this.make('Modal', data, VNodeFn);
    },
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

exports.default = cvm;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _formCreate = __webpack_require__(4);

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
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _formRender = __webpack_require__(1);

var _util = __webpack_require__(0);

var _formHandler = __webpack_require__(6);

var _formHandler2 = _interopRequireDefault(_formHandler);

var _cvm = __webpack_require__(2);

var _cvm2 = _interopRequireDefault(_cvm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//formCreate全局配置
var createOptions = {
    //插入节点,默认document.body
    el: null,
    //form配置
    form: {
        //是否开启行内表单模式
        inline: false,
        //表单域标签的位置，可选值为 left、right、top
        labelPosition: 'right',
        //表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
        labelWidth: 125,
        //是否显示校验错误信息
        showMessage: true,
        //原生的 autocomplete 属性，可选值为 off 或 on
        autocomplete: 'off'
    },
    upload: {
        //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
        beforeUpload: function beforeUpload() {},
        //文件上传时的钩子，返回字段为 event, file, fileList
        onProgress: function onProgress(event, file, fileList) {},
        //文件上传成功时的钩子，返回字段为 response, file, fileList,若需有把文件添加到文件列表中,在函数值返回即可
        onSuccess: function onSuccess(response, file, fileList) {
            // return filePath;
        },
        //文件上传失败时的钩子，返回字段为 error, file, fileList
        onError: function onError(error, file, fileList) {},
        //点击已上传的文件链接时的钩子，返回字段为 file， 可以通过 file.response 拿到服务端返回数据
        onPreview: function onPreview(file) {},
        //文件列表移除文件时的钩子，返回字段为 file, fileList
        onRemove: function onRemove(file, fileList) {},
        //文件格式验证失败时的钩子，返回字段为 file, fileList
        onFormatError: function onFormatError(file, fileList) {},
        //文件超出指定大小限制时的钩子，返回字段为 file, fileList
        onExceededSize: function onExceededSize(file, fileList) {},
        //操作按钮的图标 ,设置为false将不显示
        handleIcon: 'ios-eye-outline',
        //点击操作按钮事件
        onHandle: function onHandle(src) {
            methodVm.$Modal.info({
                title: "查看图片",
                render: function render(h) {
                    return h('img', { attrs: { src: src }, style: "width: 100%" });
                }
            });
        },
        //是否可删除,设置为false是不显示删除按钮
        allowRemove: true
    },
    //表单提交事件
    onSubmit: function onSubmit(formData) {},
    //提交按钮配置,设置为false时不显示按钮
    submitBtn: {
        //按钮类型，可选值为primary、ghost、dashed、text、info、success、warning、error或者不设置
        type: "primary",
        //按钮大小，可选值为large、small、default或者不设置
        size: "large",
        //按钮形状，可选值为circle或者不设置
        shape: undefined,
        //开启后，按钮的长度为 100%
        long: true,
        //设置button原生的type，可选值为button、submit、reset
        htmlType: "button",
        //设置按钮为禁用状态
        disabled: false,
        //设置按钮的图标类型
        icon: "ios-upload",
        //按钮文字提示
        innerText: "提交",
        //设置按钮为加载中状态
        loading: false
    }
};

var methodVm = void 0;

var version = '1.1.5';

var formCreateComponent = function formCreateComponent(rules, options) {
    if (!this instanceof formCreateComponent) throwIfMissing('formCreateComponent is a constructor and should be called with the `new` keyword');
    this.rules = Array.isArray(rules) ? rules : [];
    this.handlers = {};
    this.fRender = {};
    this.formData = {};
    this.validate = {};
    this.fieldList = [];
    options.el = !options.el ? window.document.body : (0, _util.isElement)(options.el) ? options.el : document.querySelector(options.el);
    this.options = options;
};

var formCreateName = 'form-create';

var formCreateStyleElId = 'form-create-style';

var formCreateStyle = '.fc-upload .fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;box-sizing: border-box;}' + ' .fc-files>.ivu-icon{transform: translateY(20%);}' + '.fc-upload .fc-files img{width:100%;height:100%;display:block;}' + '.fc-upload .ivu-upload{display: inline-block;}' + '.fc-upload .ivu-upload .fc-upload-btn{ width: 58px;height: 58px;line-height: 58px;}' + '.fc-upload .ivu-upload .fc-upload-btn i{font-size: 20px;}' + '.fc-upload .fc-upload-cover{ display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); }' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-upload .fc-files:hover .fc-upload-cover{ display: block; }' + '.fc-upload .ivu-upload-list-file{ display: inline-block;float: left; }' + '.fc-upload .ivu-upload-list{ position: absolute;left: 0; }' + '.fc-upload .ivu-upload-select .fc-upload-btn{ background: #fff;border: 1px dashed #dddee1;border-radius: 4px;text-align: center;cursor: pointer;position: relative;overflow: hidden;transition: border-color .2s ease; }';

/**
 * 加载css
 */
formCreateComponent.createStyle = function () {
    if (document.getElementById(formCreateStyleElId) !== null) return;
    var style = document.createElement('style');
    style.id = formCreateStyleElId;
    style.innerText = formCreateStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
};

formCreateComponent.install = function (Vue) {
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    methodVm = new Vue();
    formCreateComponent.createStyle();
    var options = (0, _util.deepExtend)((0, _util.deepExtend)(Object.create(null), createOptions), opt);
    Vue.prototype.$formCreate = function (rules) {
        var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if ((0, _util.isElement)(opt)) opt = { el: opt };
        var fComponent = new formCreateComponent(rules, (0, _util.deepExtend)((0, _util.deepExtend)(Object.create(null), options), opt)),
            $vm = fComponent.mount(Vue);
        return fComponent.fCreateApi;
    };
    Vue.prototype.$formCreate.version = version;
};

formCreateComponent.prototype = {
    checkRule: function checkRule(rule) {
        rule.type = rule.type === undefined ? 'input' : rule.type.toLowerCase();
        if (!rule.field) rule.field = '';
        return rule;
    },
    setHandler: function setHandler(handler) {
        var field = handler.rule.field;
        this.handlers[field] = handler;
        this.formData[field] = handler.getParseValue();
        this.validate[field] = handler.getValidate();
    },
    init: function init(vm) {
        var _this = this;

        this.vm = vm;
        this.rules.filter(function (rule) {
            return rule.field !== undefined;
        }).map(function (rule) {
            rule = _this.checkRule(rule);
            var handler = (0, _formHandler2.default)(_this.vm, rule, _this.options);
            _this.setHandler(handler);
            _this.fieldList.push(handler.rule.field);
        });
        this.fCreateApi = this.api();
    },
    mount: function mount(Vue) {
        var $fCreate = Vue.extend(this.component()),
            $vm = new $fCreate().$mount();
        this.options.el.appendChild($vm.$el);
        return $vm;
    },
    component: function component() {
        var fComponent = this;
        return {
            name: formCreateName,
            data: function data() {
                return {
                    formData: {},
                    buttonProps: {}
                };
            },

            render: function render() {
                _cvm2.default.setVm(fComponent.vm);
                return fComponent.fRender.parse();
            },
            created: function created() {
                fComponent.init(this);
                this.$set(this, 'formData', fComponent.formData);
                this.$set(this, 'buttonProps', fComponent.options.submitBtn);
                fComponent.fRender = new _formRender.formRender(fComponent);
            },

            methods: {
                changeFormData: function changeFormData(field, value) {
                    this.$set(this.formData, field, value);
                },
                removeFormData: function removeFormData(field) {
                    this.$delete(this.formData, field);
                },
                changeButtonProps: function changeButtonProps(props) {
                    this.$set(this, 'buttonProps', Object.assign(this.buttonProps, props));
                },
                setField: function setField(field, value) {
                    this.$set(this.formData, field, value);
                }
            },
            mounted: function mounted() {
                Object.keys(this.formData).map(function (field) {
                    fComponent.addHandlerWatch(fComponent.handlers[field]);
                });
            }
        };
    },
    append: function append(rule, after, pre) {
        var _rule = (0, _util.deepExtend)(Object.create(null), this.checkRule(rule));
        var handler = (0, _formHandler2.default)(this.vm, _rule, this.options);
        if (Object.keys(this.handlers).indexOf(handler.rule.field) !== -1) throw new Error(_rule.field + "\u5B57\u6BB5\u5DF2\u5B58\u5728");

        this.fRender.setRender(handler, after, pre);
        this.setHandler(handler);
        this.vm.setField(handler.rule.field, handler.getParseValue());
        this.addHandlerWatch(handler);
    },
    removeField: function removeField(field) {
        if (this.handlers[field] === undefined) throw new Error(field + "\u5B57\u6BB5\u4E0D\u5B58\u5728");

        this.vm.removeFormData(field);
        delete this.handlers[field];
        delete this.validate[field];
        this.fRender.removeRender(field);
        delete this.formData[field];
    },
    addHandlerWatch: function addHandlerWatch(handler) {
        var unWatch = this.vm.$watch("formData." + handler.rule.field, function (n, o) {
            if (handler !== undefined) handler.changeParseValue(n, false);else unWatch();
        });
    },
    getFormRef: function getFormRef() {
        return this.vm.$refs[this.fRender.refName];
    },
    api: function api() {
        var _this2 = this;

        var fComponent = this;
        return {
            formData: function formData() {
                var data = {};
                _this2.fields().map(function (field) {
                    field = field.toString();
                    data[field] = _this2.handlers[field].getValue();
                });
                return data;
            },
            getValue: function getValue(field) {
                field = field.toString();
                var handler = _this2.handlers[field];
                if (handler === undefined) console.error(field + " \u5B57\u6BB5\u4E0D\u5B58\u5728!");else {
                    return handler.getValue();
                }
            },
            changeField: function changeField(field, value) {
                field = field.toString();
                var handler = _this2.handlers[field];
                if (handler === undefined) console.error(field + " \u5B57\u6BB5\u4E0D\u5B58\u5728!");else {
                    handler.changeValue(value);
                }
            },
            removeField: function removeField(field) {
                field = field.toString();
                fComponent.removeField(field);
            },
            validate: function validate(successFn, errorFn) {
                fComponent.getFormRef().validate(function (valid) {
                    valid === true ? successFn && successFn() : errorFn && errorFn();
                });
            },
            validateField: function validateField(field, callback) {
                field = field.toString();
                fComponent.getFormRef().validateField(field, callback);
            },
            resetFields: function resetFields() {
                fComponent.getFormRef().resetFields();
            },
            destroy: function destroy() {
                _this2.vm.$el.remove();
                _this2.vm.$destroy();
            },
            fields: function fields() {
                return _this2.fields();
            },
            append: function append(rule, after) {
                fComponent.append(rule, after, false);
            },
            prepend: function prepend(rule, after) {
                fComponent.append(rule, after, true);
            },
            submit: function submit(successFn) {
                var _this3 = this;

                this.validate(function () {
                    var formData = _this3.formData();
                    if ((0, _util.isFunction)(successFn)) successFn(formData);else fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
                });
            },
            submitStatus: function submitStatus() {
                var _props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                var props = (0, _util.deepExtend)(Object.create(null), _props);
                _this2.vm.changeButtonProps(props);
            },
            btn: {
                loading: function loading() {
                    _this2.vm.changeButtonProps({ loading: true });
                },
                finish: function finish() {
                    _this2.vm.changeButtonProps({ loading: false });
                }
            }
        };
    },
    fields: function fields() {
        return Object.keys(this.formData);
    }
};

exports.default = {
    install: formCreateComponent.install,
    default: formCreateComponent
};

/***/ }),
/* 5 */
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
        var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

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
    style: function style() {
        var _style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:style');

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if ((0, _util.isPlainObject)(_style)) {
            this._data.style = (0, _util.assign)({}, this._data.style, _style);
        } else if (value !== undefined) {
            this._data.style[_style.toString()] = value;
        }
        return this;
    },
    attrs: function attrs() {
        var _attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:attrs');

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        if ((0, _util.isPlainObject)(_attrs)) {
            this._data.attrs = (0, _util.assign)({}, this._data.attrs, _attrs);
        } else {
            this._data.attrs[_attrs.toString()] = value;
        }
        return this;
    },
    props: function props() {
        var _props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:props');

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if ((0, _util.isPlainObject)(_props)) {
            this._data.props = (0, _util.assign)({}, this._data.props, _props);
        } else {
            this._data.props[_props.toString()] = value;
        }
        return this;
    },
    domProps: function domProps() {
        var _domProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:domProps');

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if ((0, _util.isPlainObject)(_domProps)) {
            this._data.domProps = (0, _util.assign)({}, this._data.domProps, _domProps);
        } else {
            this._data.domProps[_domProps.toString()] = value;
        }
        return this;
    },
    on: function on() {
        var onType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:onType');
        var call = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        if ((0, _util.isPlainObject)(onType)) {
            this._data.on = (0, _util.assign)({}, this._data.on, onType);
        } else {
            this._data.on[onType.toString()] = call;
        }
        return this;
    },
    nativeOn: function nativeOn() {
        var onType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:onType');
        var call = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        if ((0, _util.isPlainObject)(onType)) {
            this._data.nativeOn = (0, _util.assign)({}, this._data.nativeOn, onType);
        } else {
            this._data.nativeOn[onType.toString()] = call;
        }
        return this;
    },
    directives: function directives() {
        var _directives = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:directives');

        this._data.directives = _util.concat.call.apply(_util.concat, _toConsumableArray(this._data.directives).concat(_toConsumableArray(_directives)));
        return this;
    },
    scopedSlots: function scopedSlots() {
        var scopedSlot = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:scopedSlot');
        var call = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        if ((0, _util.isPlainObject)(scopedSlot)) {
            this._data.scopedSlots = (0, _util.assign)({}, this._data.scopedSlots, scopedSlot);
        } else {
            this._data.scopedSlots[scopedSlot.toString()] = call;
        }
        return this;
    },
    slot: function slot(_slot) {
        this._data.slot = _slot;
        return this;
    },
    key: function key(_key) {
        this._data.key = _key;
        return this;
    },
    ref: function ref(_ref) {
        this._data.ref = _ref;
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

exports.default = props;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _util = __webpack_require__(0);

var _formRender = __webpack_require__(1);

var handler = function handler(vm, _ref) {
    var field = _ref.field,
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
    this.rule = {
        field: field, type: type, title: title, options: options, props: props, slot: slot,
        value: (0, _util.deepExtend)(Object.create(null), { value: value }).value,
        validate: (0, _util.isArray)(validate) ? validate : [validate],
        event: Object.keys(event).reduce(function (initial, eventName) {
            initial["on-" + eventName] = event[eventName];
            return initial;
        }, {})
    };
    this.vm = vm;
    this.unique = (0, _util.uniqueId)();
    this.verify();
    this.handle();
    this.refName = field + '' + this.unique;
};

handler.prototype = {
    el: function el() {
        if (!this._el) this._el = this.vm.$refs[this.refName];
        return this._el || {};
    },
    handle: function handle() {
        this.changeParseValue(this.rule.value);
    },
    verify: function verify() {},
    getField: function getField() {
        return this.rule.field;
    },
    getValidate: function getValidate() {
        return this.rule.validate;
    },
    getValue: function getValue() {
        return this.parseValue;
    },
    changeValue: function changeValue(value) {
        this.rule.value = value;
        this.handle();
    },
    getRule: function getRule() {
        return this.rule;
    },
    getParseValue: function getParseValue() {
        return this.parseValue;
    },
    changeParseValue: function changeParseValue(parseValue) {
        var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (b === true) this.vm.changeFormData(this.rule.field, parseValue);
        this.parseValue = parseValue;
    }
};

/**
 * 构造器
 * @param prototypeExtend
 * @returns {$f}
 */
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

/**
 * 默认处理器
 */
var baseHandler = handlerFactory();

/**
 * 单选框/多选框处理器
 */
var checkedHandler = handlerFactory({
    handle: function handle() {
        var _this = this;

        var parseValue = void 0;
        if ((0, _util.isArray)(this.rule.value)) {
            parseValue = [];
            this.rule.value.forEach(function (val) {
                _this.rule.options.forEach(function (option) {
                    option.value === val && parseValue.push(option.label);
                });
            });
        } else {
            this.rule.options.forEach(function (option) {
                option.value === _this.rule.value && (parseValue = option.label);
            });
        }
        this.changeParseValue(parseValue);
    },
    getValue: function getValue() {
        var _this2 = this;

        var parseValue = '';
        if ((0, _util.isArray)(this.parseValue)) {
            parseValue = [];
            this.parseValue.forEach(function (value) {
                _this2.rule.options.forEach(function (option) {
                    option.label === value && parseValue.push(option.value);
                });
            });
            parseValue = this.rule.options.length === 1 ? parseValue[0] || '' : parseValue;
        } else {
            this.rule.options.forEach(function (option) {
                option.label === _this2.parseValue && (parseValue = option.value);
            });
        }
        return parseValue;
    }
});

/**
 * 选择器处理器
 */
var selectedHandler = handlerFactory({
    handle: function handle() {
        var isArr = (0, _util.isArray)(this.rule.value);
        if (this.rule.props && this.rule.props.multiple === true) this.changeParseValue(isArr === true ? this.rule.value : [this.rule.value]);else this.changeParseValue(isArr === true ? this.rule.value[0] : this.rule.value);
    }
});

/**
 * 时间选择器/日期选择器处理器
 */
var dateHandler = handlerFactory({
    verify: function verify() {
        this.rule.props.type = !this.rule.props.type ? this.rule.type === 'datepicker' ? 'date' : 'time' : this.rule.props.type;
    },
    handle: function handle() {
        var _this3 = this;

        var parseValue = this.rule.value;
        if (['daterange', 'datetimerange', 'timerange'].indexOf(this.rule.props.type) !== -1) {
            (0, _util.isArray)(parseValue) || (parseValue = ['', '']);
            parseValue = parseValue.map(function (time) {
                return !time ? '' : _this3.timeStampToDate(time);
            });
        } else {
            (0, _util.isArray)(parseValue) && (parseValue = parseValue[0]);
            parseValue = !parseValue ? '' : this.timeStampToDate(parseValue);
        }
        this.changeParseValue(parseValue);
    },
    getValue: function getValue() {
        return this.el().publicStringValue;
    },
    timeStampToDate: function timeStampToDate(timeStamp) {
        if ((0, _util.isDate)(timeStamp)) return timeStamp;else {
            var date = new Date(timeStamp);
            return date.toString() === 'Invalid Date' ? timeStamp : date;
        }
    },
    dateToTimeStamp: function dateToTimeStamp(date) {
        var timeStamp = Date.parse(date);
        return Number.isNaN(timeStamp) ? date : timeStamp;
    }
});

/**
 * 数字输入框处理器
 */
var inputNumberHandler = handlerFactory({
    handle: function handle() {
        var parseValue = parseFloat(this.rule.value);
        if (Number.isNaN(parseValue)) parseValue = '';
        this.changeParseValue(parseValue);
    }
});

/**
 * 文件上传处理器
 */
var uploadHandler = handlerFactory({
    verify: function verify() {
        this.rule.props.defaultFileList = [];
        this.rule.props.showUploadList = false;
        this.rule.props.uploadType = !this.rule.props.uploadType ? 'file' : this.rule.props.uploadType;
    },
    handle: function handle() {
        var files = (0, _util.isArray)(this.rule.value) ? this.rule.value : !this.rule.value ? [] : [this.rule.value];
        this.changeParseValue({
            files: files,
            status: 'normal'
        });
    },
    push: function push(filePath) {
        this.parseValue.files.push(filePath);
        this.changeParseValue(this.parseValue);
    },
    getValue: function getValue() {
        return this.rule.props.maxLength <= 1 ? this.parseValue.files[0] || '' : this.parseValue.files;
    }
});

/**
 * 开关处理器
 */
var switchHandler = handlerFactory({
    verify: function verify() {
        if (this.rule.slot === undefined) this.rule.slot = {};
    }
});

var cascaderHandler = handlerFactory({
    verify: function verify() {
        if (!this.rule.props.data) this.rule.props.data = [];
        if (!(0, _util.isArray)(this.rule.value)) this.rule.value = [];
    },
    getValue: function getValue() {
        return this.el().value;
    }
});

var handlerList = {
    hidden: baseHandler,
    input: baseHandler,
    radio: checkedHandler,
    checkbox: checkedHandler,
    switch: switchHandler,
    select: selectedHandler,
    datepicker: dateHandler,
    timepicker: dateHandler,
    inputnumber: inputNumberHandler,
    colorpicker: baseHandler,
    upload: uploadHandler,
    cascader: cascaderHandler
};

var formHandler = function formHandler(vm, rule, createOptions) {
    var handler = handlerList[rule.type],
        render = (0, _formRender.getRender)(rule.type);
    if (handler === undefined || render === undefined) throw new Error(rule.type + " \u8868\u5355\u7C7B\u578B\u4E0D\u5B58\u5728");else {
        var $h = new handler(vm, rule);
        $h.render = new render(vm, $h, createOptions);
        return $h;
    }
};

exports.default = formHandler;

/***/ })
/******/ ]);
});