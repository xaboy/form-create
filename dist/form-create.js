/*! formCreate v1.0.0 | github https://github.com/xaboy/form-create.git */
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
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

var isObject = function isObject(arg) {
    return toString.call(arg) === '[object Object]';
};

var isFunction = function isFunction(arg) {
    return toString.call(arg) === '[object Function]';
};

var isString = function isString(arg) {
    return toString.call(arg) === '[object String]';
};

var isArray = Array.isArray;

exports.concat = concat;
exports.assign = assign;
exports.toString = toString;
exports.throwIfMissing = throwIfMissing;
exports.isObject = isObject;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isString = isString;
exports.isArray = isArray;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _formCreate = __webpack_require__(2);

var _formCreate2 = _interopRequireDefault(_formCreate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (typeof window !== 'undefined') {
    window["formCreate"] = _formCreate2.default;
    if (window.Vue && (window.iview || window.iView)) {
        window.Vue.use(_formCreate2.default);
    }
}

exports.default = _formCreate2.default;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _formCreateRender = __webpack_require__(3);

var _formCreateRender2 = _interopRequireDefault(_formCreateRender);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formCreateName = 'form-create';

var formCreateStyleElId = 'form-create-style';

var formCreate = function formCreate(rules) {
    if (!this instanceof formCreate) (0, _util.throwIfMissing)('formCreate is a constructor and should be called with the `new` keyword');
    this.init(rules);
};

formCreate.default = {
    options: {
        formProps: {
            labelWidth: 125,
            labelPosition: 'right',
            showMessage: true,
            autocomplete: 'off',
            inline: false
        },
        form: {
            ref: 'formCreate',
            method: 'POST',
            action: '',
            onSubmit: function onSubmit(e) {}
        },
        upload: {
            //上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传
            beforeUpload: function beforeUpload() {},
            //文件上传时的钩子，返回字段为 event, file, fileList
            onProgress: function onProgress(event, file, fileList) {},
            //文件上传成功时的钩子，返回字段为 response, file, fileList
            onSuccess: function onSuccess(response, file, fileList) {},
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
            onView: function onView(file) {},
            handleView: true,
            handleRemove: true
        }
    }
};

var formCreateStyle = '.form-create-upload .form-create-upload-list{display: inline-block;width: 60px;height: 60px;text-align: center;line-height: 60px;border: 1px solid transparent;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 0 1px 1px rgba(0,0,0,.2);margin-right: 4px;}' + '.form-create-upload .form-create-upload-list img{width:100%;height:100%;display:block;}' + '.form-create-upload .ivu-upload{display: inline-block;}' + '.form-create-upload .ivu-upload .form-create-upload-btn{ width: 58px;height: 58px;line-height: 58px;}' + '.form-create-upload .ivu-upload .form-create-upload-btn i{font-size: 20px;}' + '.form-create-upload  .form-upload-list-cover{ display: none; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); }' + '.form-create-upload  .form-upload-list-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.form-create-upload .form-create-upload-list:hover .form-upload-list-cover{ display: block; }' + '.form-create-upload .ivu-upload-list-file{ display: inline-block;float: left; }' + '.form-create-upload .ivu-upload-list{ position: absolute;left: 0; }' + '.form-create-upload .ivu-upload-select .form-create-upload-btn{ background: #fff;border: 1px dashed #dddee1;border-radius: 4px;text-align: center;cursor: pointer;position: relative;overflow: hidden;transition: border-color .2s ease; }';

formCreate.formCreateSetStyle = function () {
    if (document.getElementById(formCreateStyleElId) !== null) return;
    var style = document.createElement('style');
    style.id = formCreateStyleElId;
    style.innerText = formCreateStyle;
    document.getElementsByTagName('head')[0].appendChild(style);
};

formCreate.install = function (Vue) {
    var that = this;
    Vue.prototype.$formCreate = function (rules) {
        var el = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        formCreate.formCreateSetStyle();
        var fBuilder = new that(rules),
            $fb = Vue.extend(fBuilder.component()),
            $vm = new $fb().$mount(),
            dom = el === undefined ? document.body : document.querySelector(el);
        dom.appendChild($vm.$el);
        return $vm._api();
    };
};

var _datePicker = ['datepicker', 'timepicker'];

var _checkedType = ['checkbox', 'radio'];

formCreate.prototype = {
    init: function init(rules) {
        var _this2 = this;

        this._data = {
            original: Array.isArray(rules) ? rules : [],
            rules: {},
            formData: {},
            validate: {},
            vm: null
        };
        this.options = (0, _util.assign)({}, formCreate.default.options);
        this._data.original.filter(function (rule) {
            return rule.field !== undefined;
        }).map(function (rule) {
            rule.props === undefined && (rule.props = {});
            rule.type = rule.type === undefined ? 'input' : rule.type.toLowerCase();
            var parseValue = void 0;
            if (rule.type !== 'hidden') {
                _this2._data.rules[rule.field] = {
                    field: rule.field,
                    type: rule.type,
                    title: rule.title,
                    options: rule.options || [],
                    props: rule.props || {}
                };
                _this2._data.validate[rule.field] = rule.validate === undefined ? [] : (0, _util.isArray)(rule.validate) ? rule.validate : [rule.validate];
                if (rule.type === 'switch') {
                    _this2._data.rules[rule.field]['slot'] = rule.slot === undefined ? {} : rule.slot;
                    parseValue = rule.value;
                } else if (rule.type === 'select' && rule.props && rule.props.multiple === true) {
                    parseValue = rule.value === undefined || rule.value === '' ? [] : (0, _util.isArray)(rule.value) ? rule.value : [rule.value];
                } else if (_datePicker.indexOf(rule.type) !== -1) {
                    parseValue = _formCreateRender2.default.tidyDateInput(rule, rule.value);
                } else if (_checkedType.indexOf(rule.type) !== -1) {
                    parseValue = _formCreateRender2.default.tidyCheckedInput(rule, rule.value);
                } else if (rule.type === 'inputnumber') {
                    parseValue = parseFloat(rule.value);
                } else if (rule.type === 'upload') {
                    parseValue = (0, _util.isArray)(rule.value) ? rule.value : [rule.value];
                } else parseValue = rule.value;
            } else parseValue = rule.value;
            _this2._data.formData[rule.field] = parseValue;
        });
    },
    field: function field() {
        return Object.keys(this._data.formData);
    },
    rules: function rules() {
        return this._data.rules;
    },
    formData: function formData() {
        return this._data.formData;
    },
    validate: function validate() {
        return this._data.validate;
    },
    _bindWatch: function _bindWatch() {
        var _this3 = this;

        this.field().map(function (field) {
            _this3.vm.$watch("formData." + field, function (n, o) {
                //TODO watch
            });
        });
    },
    component: function component() {
        var formData = this.formData(),
            _this = this;
        return {
            name: formCreateName,
            data: function data() {
                return {
                    formData: formData
                };
            },
            render: function render(createElement) {
                var render = _this.render();
                return render.parse();
            },
            beforeCreate: function beforeCreate() {
                _this.vm = this;
            },
            methods: {
                parseData: function parseData() {
                    return _formCreateRender2.default.parseData(this.formData, _this.rules());
                },
                _api: function _api() {
                    var _this4 = this;

                    return {
                        formData: function formData() {
                            return _this4.parseData();
                        },
                        changeField: function changeField(field, value) {
                            var rule = _this._data.rules[field];
                            if (rule !== undefined) {
                                if (_datePicker.indexOf(rule.type) !== -1) {
                                    value = _formCreateRender2.default.tidyDateInput(rule, value);
                                } else if (_checkedType.indexOf(rule.type) !== -1) {
                                    value = _formCreateRender2.default.tidyCheckedInput(rule, value);
                                } else if (rule.type === 'inputnumber') {
                                    value = parseFloat(value);
                                } else if (rule.type === 'upload') {
                                    value = (0, _util.isArray)(value) ? value : [value];
                                }
                            }
                            _this.vm.$set(_this.vm.formData, field, value);
                        },
                        validate: function validate(successFn, errorFn) {
                            _this.vm.$refs.formCreate.validate(function (valid) {
                                valid === true ? successFn() : errorFn();
                            });
                        },
                        validateField: function validateField(field, errorFn) {
                            _this.vm.$refs.formCreate.validateField(field, errorFn);
                        },
                        resetFields: function resetFields() {
                            _this.vm.$refs.formCreate.resetFields();
                        },
                        remove: function remove() {
                            _this.vm.$el.remove();
                            _this.vm.$destroy();
                        },

                        fields: function fields() {
                            return _this.field();
                        }
                    };
                }
            },
            mounted: function mounted() {
                // _this._bindWatch();
            }
        };
    },
    render: function render() {
        return new _formCreateRender2.default({
            vm: this.vm,
            rules: this.rules(),
            formData: this.formData(),
            validate: this.validate()
        }, this.options);
    }
};

exports.default = formCreate;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dateToTimeStamp = exports.timeStampToDate = undefined;

var _props = __webpack_require__(4);

var _props2 = _interopRequireDefault(_props);

var _cvm = __webpack_require__(5);

var _cvm2 = _interopRequireDefault(_cvm);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formCreateRender = function formCreateRender(_ref) {
    var vm = _ref.vm,
        rules = _ref.rules,
        formData = _ref.formData,
        validate = _ref.validate;
    var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    this.vm = vm;
    this.rules = rules;
    this.cvm = _cvm2.default.init(vm.$createElement);
    this.form = {
        model: formData,
        rules: validate
    };
    this.options = opt;
};

var timeStampToDate = function timeStampToDate(timeStamp) {
    return (0, _util.isDate)(timeStamp) ? timeStamp : new Date(parseInt(timeStamp));
};

var dateToTimeStamp = function dateToTimeStamp(date) {
    var timeStamp = Date.parse(date);
    return Number.isNaN(timeStamp) ? '' : timeStamp;
};

var _datePickerType = ['daterange', 'datetimerange', 'timerange'];

formCreateRender.parseData = function (formData, rules) {
    var parseData = {};
    Object.keys(formData).map(function (field) {
        var value = formData[field],
            rule = rules[field],
            parseValue = void 0;
        if (rule !== undefined) {
            if (['datepicker', 'timepicker'].indexOf(rule.type) !== -1) {
                parseValue = Array.isArray(value) ? value.map(function (date) {
                    return date === '' ? '' : dateToTimeStamp(date);
                }) : value === '' ? '' : dateToTimeStamp(value);
            } else if (['checkbox', 'radio'].indexOf(rule.type) !== -1) {
                if (Array.isArray(value)) {
                    parseValue = [];
                    value.map(function (value) {
                        rule.options.map(function (option, k) {
                            option.label === value && parseValue.push(option.value);
                        });
                    });
                } else {
                    rule.options.map(function (option, k) {
                        option.label === value && (parseValue = option.value);
                    });
                }
            } else parseValue = value;
        } else parseValue = value;

        parseData[field] = parseValue;
    });
    return parseData;
};

formCreateRender.tidyDateInput = function (rule, value) {
    if (_datePickerType.indexOf(rule.props.type) !== -1) {
        Array.isArray(value) || (value = ['', '']);
        return value.map(function (time) {
            return time === '' ? '' : timeStampToDate(time);
        });
    } else {
        return value === '' ? '' : timeStampToDate(value);
    }
};
formCreateRender.tidyCheckedInput = function (rule, value) {
    var parseValue = void 0;
    if (Array.isArray(rule.value)) {
        parseValue = [];
        value.map(function (val) {
            rule.options.map(function (option) {
                option.value === val && parseValue.push(option.label);
            });
        });
    } else {
        rule.options.map(function (option, k) {
            option.value === value && (parseValue = option.label);
        });
    }
    return parseValue;
};

formCreateRender.prototype = {
    parse: function parse() {
        var _this = this;

        return this.makeForm(function () {
            return Object.keys(_this.rules).map(function (field) {
                var rule = _this.rules[field];
                return _this.makeFormItem(rule.field, rule.title, function () {
                    return [_this[rule.type].call(_this, rule)];
                });
            });
        });
    },
    makeForm: function makeForm(VNodeFn) {
        var options = this.options,
            t = _props2.default.init().props({ model: this.form.model, rules: this.form.rules }).ref(options.form.ref).attrs({ method: options.form.method, action: options.form.action }).nativeOn('submit', function (e) {
            e.preventDefault();
            options.form.onSubmit(e);
        });
        return this.cvm.form(t.get(), VNodeFn);
    },
    makeFormItem: function makeFormItem(prop, label, VNodeFn) {
        var options = this.options,
            t = _props2.default.init().props({ prop: prop, label: label, labelWidth: options.formProps.labelWidth, labelFor: prop, showMessage: options.formProps.showMessage });
        return this.cvm.formItem(t.get(), VNodeFn);
    },
    makeInput: function makeInput(rule) {
        var t = this.inputProps(rule);
        return this.cvm.input(t.get());
    },
    makeInputNumber: function makeInputNumber(rule) {
        var t = this.inputProps(rule);
        return this.cvm.inputNumber(t.get());
    },
    makeRadio: function makeRadio(rule) {
        var _this2 = this;

        var t = this.inputProps(rule);
        return this.cvm.radioGroup(t.get(), function () {
            return rule.options.map(function (option) {
                return _this2.cvm.radio({ props: option });
            });
        });
    },
    makeCheckBox: function makeCheckBox(rule) {
        var _this3 = this;

        var t = this.inputProps(rule);
        return this.cvm.checkboxGroup(t.get(), function () {
            return rule.options.map(function (option) {
                return _this3.cvm.checkbox({ props: option });
            });
        });
    },
    makeSelect: function makeSelect(rule) {
        var _this4 = this;

        var t = this.inputProps(rule);
        return this.cvm.select(t.get(), rule.options.map(function (option) {
            return _this4.cvm.option({ props: option });
        }));
    },
    makeSwitch: function makeSwitch(rule) {
        var t = this.inputProps(rule).scopedSlots({
            open: function open() {
                return rule.slot.open;
            },
            close: function close() {
                return rule.slot.close;
            }
        });
        return this.cvm.switch(t.get());
    },
    makeDatePicker: function makeDatePicker(rule) {
        rule.props.type || (rule.props.type = 'date');
        var t = this.inputProps(rule);
        return this.cvm.datePicker(t.get());
    },
    makeTimePicker: function makeTimePicker(rule) {
        rule.props.type || (rule.props.type = 'time');
        var t = this.inputProps(rule);
        return this.cvm.timePicker(t.get());
    },
    makeColorPicker: function makeColorPicker(rule) {
        var t = this.inputProps(rule);
        return this.cvm.colorPicker(t.get());
    },
    makeUpload: function makeUpload(rule) {
        var _this5 = this;

        var options = this.options,
            data = _props2.default.init().props(rule.props).props({
            'beforeUpload': function beforeUpload() {
                var _options$upload, _rule$props;

                rule.props.beforeUpload === undefined ? (_options$upload = options.upload).beforeUpload.apply(_options$upload, arguments) : (_rule$props = rule.props).beforeUpload.apply(_rule$props, arguments);
            },
            'onProgress': function onProgress() {
                var _options$upload2, _rule$props2;

                rule.props.onProgress === undefined ? (_options$upload2 = options.upload).onProgress.apply(_options$upload2, arguments) : (_rule$props2 = rule.props).onProgress.apply(_rule$props2, arguments);
            },
            'onSuccess': function onSuccess(response, file, fileList) {
                var push = function push(filePath) {
                    _this5.getInputValue(rule.field).push(filePath);
                };
                rule.props.onSuccess === undefined ? options.upload.onSuccess(push, response, file, fileList) : rule.props.onSuccess(push, response, file, fileList);
            },
            'onPreview': function onPreview() {
                var _options$upload3, _rule$props3;

                rule.props.onPreview === undefined ? (_options$upload3 = options.upload).onPreview.apply(_options$upload3, arguments) : (_rule$props3 = rule.props).onPreview.apply(_rule$props3, arguments);
            },
            'onRemove': function onRemove() {
                var _options$upload4, _rule$props4;

                rule.props.onRemove === undefined ? (_options$upload4 = options.upload).onRemove.apply(_options$upload4, arguments) : (_rule$props4 = rule.props).onRemove.apply(_rule$props4, arguments);
            },
            'onFormatError': function onFormatError() {
                var _options$upload5, _rule$props5;

                rule.props.onFormatError === undefined ? (_options$upload5 = options.upload).onFormatError.apply(_options$upload5, arguments) : (_rule$props5 = rule.props).onFormatError.apply(_rule$props5, arguments);
            },
            'onExceededSize': function onExceededSize() {
                var _options$upload6, _rule$props6;

                rule.props.onExceededSize === undefined ? (_options$upload6 = options.upload).onExceededSize.apply(_options$upload6, arguments) : (_rule$props6 = rule.props).onExceededSize.apply(_rule$props6, arguments);
            },
            'onError': function onError() {
                var _options$upload7, _rule$props7;

                rule.props.onError === undefined ? (_options$upload7 = options.upload).onError.apply(_options$upload7, arguments) : (_rule$props7 = rule.props).onError.apply(_rule$props7, arguments);
            }
        }).get();
        return function () {
            var render = [],
                value = _this5.getInputValue(rule.field);
            return _this5.cvm.make('div', { class: { 'form-create-upload': true } }, function () {
                render.push(function () {
                    return value.map(function (img) {
                        return _this5.cvm.make('div', { class: { 'form-create-upload-list': true } }, function (img) {
                            var container = [_this5.cvm.make('img', { attrs: { src: img } })];
                            if (options.upload.handleRemove !== false || options.upload.handleView !== false) container.push(_this5.cvm.make('div', { class: { 'form-upload-list-cover': true } }, function (img) {
                                var icon = [];
                                if (options.upload.handleView !== false) {
                                    icon.push(_this5.cvm.icon({ props: { type: 'ios-eye-outline' }, nativeOn: { 'click': function click() {
                                                options.upload.onView(img);
                                                options.upload.handleView === true || !(0, _util.isFunction)(options.upload.handleView) ? _this5.vm.$Modal.info({
                                                    render: function render(h) {
                                                        return h('img', { attrs: { src: img, style: "width: 100%;max-height: 300px;margin-top: 10px;" } });
                                                    },
                                                    title: "查看图片",
                                                    closable: true
                                                }) : options.upload.handleView(img);
                                            } } }));
                                }
                                if (options.upload.handleRemove !== false) {
                                    icon.push(_this5.cvm.icon({ props: { type: 'ios-trash-outline' }, nativeOn: { 'click': function click() {
                                                var fileList = _this5.getInputValue(rule.field);
                                                fileList.splice(fileList.indexOf(img), 1);
                                                options.upload.onRemove(img, fileList);
                                            } } }));
                                }
                                return icon;
                            }(img)));
                            return container;
                        }(img));
                    });
                }());
                if (!rule.props['max-length'] || rule.props['max-length'] > _this5.getInputValue(rule.field).length) render.push(function () {
                    return _this5.cvm.upload(data, function () {
                        return [_this5.cvm.make('div', { class: { 'form-create-upload-btn': true } }, [_this5.cvm.icon({ props: { type: "camera", size: 20 } })])];
                    });
                }());
                return render;
            });
        }();
    },
    inputProps: function inputProps(rule) {
        var _this6 = this;

        return _props2.default.init().props(rule.props).props('model', "formData." + rule.field).props('value', this.getInputValue(rule.field)).on('input', function (value) {
            return _this6.changeInputValue(rule.field, value);
        });
    },
    changeInputValue: function changeInputValue(field, value) {
        this.vm.$emit('input', value);
        this.vm.$set(this.vm.formData, field, value);
    },
    getInputValue: function getInputValue(field) {
        return this.vm.formData[field];
    },
    input: function input(rule) {
        return this.makeInput(rule);
    },
    radio: function radio(rule) {
        return this.makeRadio(rule);
    },
    checkbox: function checkbox(rule) {
        return this.makeCheckBox(rule);
    },
    select: function select(rule) {
        return this.makeSelect(rule);
    },
    switch: function _switch(rule) {
        return this.makeSwitch(rule);
    },
    inputnumber: function inputnumber(rule) {
        return this.makeInputNumber(rule);
    },
    datepicker: function datepicker(rule) {
        return this.makeDatePicker(rule);
    },
    timepicker: function timepicker(rule) {
        return this.makeTimePicker(rule);
    },
    colorpicker: function colorpicker(rule) {
        return this.makeColorPicker(rule);
    },
    upload: function upload(rule) {
        return this.makeUpload(rule);
    }
};

exports.default = formCreateRender;
exports.timeStampToDate = timeStampToDate;
exports.dateToTimeStamp = dateToTimeStamp;

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

props.init = function () {
    return new props();
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
        } else if ((0, _util.isObject)(classList)) {
            this._data.class = (0, _util.assign)({}, this._data.class, classList);
        } else {
            this._data.class[classList.toString()] = status === undefined ? true : status;
        }
        return this;
    },
    style: function style() {
        var _style = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:style');

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if ((0, _util.isObject)(_style)) {
            this._data.style = (0, _util.assign)({}, this._data.style, _style);
        } else if (value !== undefined) {
            this._data.style[_style.toString()] = value;
        }
        return this;
    },
    attrs: function attrs() {
        var _attrs = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:attrs');

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        if ((0, _util.isObject)(_attrs)) {
            this._data.attrs = (0, _util.assign)({}, this._data.attrs, _attrs);
        } else {
            this._data.attrs[_attrs.toString()] = value;
        }
        return this;
    },
    props: function props() {
        var _props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:props');

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if ((0, _util.isObject)(_props)) {
            this._data.props = (0, _util.assign)({}, this._data.props, _props);
        } else {
            this._data.props[_props.toString()] = value;
        }
        return this;
    },
    domProps: function domProps() {
        var _domProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:domProps');

        var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

        if ((0, _util.isObject)(_domProps)) {
            this._data.domProps = (0, _util.assign)({}, this._data.domProps, _domProps);
        } else {
            this._data.domProps[_domProps.toString()] = value;
        }
        return this;
    },
    on: function on() {
        var onType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:onType');
        var call = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        if ((0, _util.isObject)(onType)) {
            this._data.on = (0, _util.assign)({}, this._data.on, onType);
        } else {
            this._data.on[onType.toString()] = call;
        }

        return this;
    },
    nativeOn: function nativeOn() {
        var onType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : (0, _util.throwIfMissing)('缺少参数:onType');
        var call = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

        if ((0, _util.isObject)(onType)) {
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

        if ((0, _util.isObject)(scopedSlot)) {
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
/* 5 */
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

cvm.init = function (createElement) {
    return new cvm(createElement);
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
    modal: function modal(data, VNodeFn) {
        return this.make('Modal', data, VNodeFn);
    },
    make: function make(nodeName, data, VNodeFn) {
        if ((0, _util.isString)(data)) data = { domProps: { innerHTML: data } };
        return this.$h(nodeName, data, this.getVNode(VNodeFn));
    },
    getVNode: function getVNode(VNode) {
        return (0, _util.isFunction)(VNode) ? VNode() : VNode;
    }
};

exports.default = cvm;

/***/ })
/******/ ]);