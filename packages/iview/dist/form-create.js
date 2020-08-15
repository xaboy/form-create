/*!
 * @form-create/iview v1.0.18
 * (c) 2018-2020 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@form-create/component-ivu-checkbox'), require('@form-create/component-ivu-frame'), require('@form-create/component-ivu-radio'), require('@form-create/component-ivu-select'), require('@form-create/component-ivu-tree'), require('@form-create/component-ivu-upload'), require('@form-create/component-ivu-group'), require('iview'), require('@form-create/core'), require('@form-create/utils')) :
  typeof define === 'function' && define.amd ? define(['exports', '@form-create/component-ivu-checkbox', '@form-create/component-ivu-frame', '@form-create/component-ivu-radio', '@form-create/component-ivu-select', '@form-create/component-ivu-tree', '@form-create/component-ivu-upload', '@form-create/component-ivu-group', 'iview', '@form-create/core', '@form-create/utils'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.formCreate = {}, global.checkbox$1, global.frame$1, global.radio$1, global.select$2, global.tree$2, global.upload$1, global.group, global.iview, global.createFormCreate, global.utils));
}(this, (function (exports, checkbox$1, frame$1, radio$1, select$2, tree$2, upload$1, group, iview, createFormCreate, utils) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var checkbox__default = /*#__PURE__*/_interopDefaultLegacy(checkbox$1);
  var frame__default = /*#__PURE__*/_interopDefaultLegacy(frame$1);
  var radio__default = /*#__PURE__*/_interopDefaultLegacy(radio$1);
  var select__default = /*#__PURE__*/_interopDefaultLegacy(select$2);
  var tree__default = /*#__PURE__*/_interopDefaultLegacy(tree$2);
  var upload__default = /*#__PURE__*/_interopDefaultLegacy(upload$1);
  var group__default = /*#__PURE__*/_interopDefaultLegacy(group);
  var iview__default = /*#__PURE__*/_interopDefaultLegacy(iview);
  var createFormCreate__default = /*#__PURE__*/_interopDefaultLegacy(createFormCreate);

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  var ivuVersion = iview__default['default'].version && iview__default['default'].version.split('.')[0] > 2 ? 3 : 2;
  var iview2 = {
    _v: 2,
    resetBtnType: 'ghost',
    resetBtnIcon: 'refresh',
    submitBtnIcon: 'ios-upload',
    fileIcon: 'document-text',
    fileUpIcon: 'folder',
    imgUpIcon: 'image',
    infoIcon: 'ios-information-outline',
    removeIcon: 'ios-minus-outline',
    addIcon: 'ios-plus-outline'
  };
  var iview3 = {
    _v: 3,
    resetBtnType: 'default',
    resetBtnIcon: 'md-refresh',
    submitBtnIcon: 'ios-share',
    fileIcon: 'md-document',
    fileUpIcon: 'ios-folder-open',
    imgUpIcon: 'md-images',
    infoIcon: 'ios-information-circle-outline',
    removeIcon: 'ios-remove-circle-outline',
    addIcon: 'ios-add-circle-outline'
  };
  var iviewConfig = function () {
    if (typeof iview__default['default'] === 'undefined') return iview2;
    return iview__default['default'].version && iview__default['default'].version.split('.')[0] > 2 ? iview3 : iview2;
  }();
  function getConfig() {
    return {
      form: {
        inline: false,
        labelPosition: 'right',
        labelWidth: 125,
        showMessage: true,
        autocomplete: 'off',
        size: undefined
      },
      row: {
        gutter: 0,
        type: undefined,
        align: undefined,
        justify: undefined,
        className: undefined
      },
      info: {
        type: 'poptip',
        trigger: 'hover',
        placement: 'top-start',
        wordWrap: true,
        icon: iviewConfig.infoIcon
      },
      submitBtn: {
        type: 'primary',
        size: 'large',
        shape: undefined,
        "long": true,
        htmlType: 'button',
        disabled: false,
        icon: iviewConfig.submitBtnIcon,
        innerText: '提交',
        loading: false,
        show: true,
        col: undefined,
        click: undefined
      },
      resetBtn: {
        type: iviewConfig.resetBtnType,
        size: 'large',
        shape: undefined,
        "long": true,
        htmlType: 'button',
        disabled: false,
        icon: iviewConfig.resetBtnIcon,
        innerText: '重置',
        loading: false,
        show: false,
        col: undefined,
        click: undefined
      }
    };
  }

  var components = [checkbox__default['default'], radio__default['default'], select__default['default'], tree__default['default']];
  ivuVersion === 3 ? components.push(frame__default['default'], upload__default['default'], group__default['default']) : components.push(frame__default['default'].v2, upload__default['default'].v2, group__default['default'].v2);

  var parser = /*#__PURE__*/function (_BaseParser) {
    _inherits(parser, _BaseParser);

    var _super = _createSuper(parser);

    function parser() {
      _classCallCheck(this, parser);

      return _super.apply(this, arguments);
    }

    _createClass(parser, [{
      key: "render",
      value: function render(children) {
        var _this = this;

        return this.vNode.checkbox({
          props: {
            ctx: this.$render.inputVData(this, true).get(),
            options: this.rule.options,
            value: this.$handle.getFormData(this),
            children: children
          },
          on: {
            input: function input(n) {
              _this.$render.onInput(_this, n);
            }
          }
        });
      }
    }]);

    return parser;
  }(createFormCreate.BaseParser);

  var name = 'checkbox';
  var checkbox = {
    parser: parser,
    name: name
  };

  var Parser = /*#__PURE__*/function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    var _super = _createSuper(Parser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _super.apply(this, arguments);
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var props = this.rule.props;
        if (props.startDate) utils.$set(props, 'startDate', utils.timeStampToDate(props.startDate));
      }
    }, {
      key: "isRange",
      value: function isRange() {
        return this.el.type.includes('range') || this.el.multiple;
      }
    }, {
      key: "_toValue",
      value: function _toValue(val) {
        var value = this.el.formatDate(val || ''),
            separator = this.el.separator,
            isRange = this.isRange();
        if (!value) return isRange ? this.el.multiple ? [] : ['', ''] : value;else if (isRange) return value.split(separator);else return value;
      }
    }, {
      key: "toValue",
      value: function toValue(formValue) {
        var el = this.$handle.vm.$refs[this.refName];

        if (el) {
          this.el = el;
          return this._toValue(formValue);
        }

        return formValue;
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        var isArr = Array.isArray(value),
            props = this.rule.props,
            parseValue,
            type = props.type || 'date';

        if (['daterange', 'datetimerange'].indexOf(type) !== -1) {
          if (isArr) {
            parseValue = value.map(function (time) {
              return !time ? '' : utils.timeStampToDate(time);
            });
          } else {
            parseValue = ['', ''];
          }
        } else if ('date' === type && props.multiple === true) {
          parseValue = toString(value);
        } else {
          parseValue = isArr ? value[0] || '' : value;
          parseValue = !parseValue ? '' : utils.timeStampToDate(parseValue);
        }

        return parseValue;
      }
    }, {
      key: "mounted",
      value: function mounted() {
        var _this = this;

        this.toFormValue = function (val) {
          var v = _this.el.parseDate(val);

          return _this.isRange() ? v : v[0];
        };

        this.toValue = this._toValue;
      }
    }]);

    return Parser;
  }(createFormCreate.BaseParser);

  var name$1 = 'datePicker';
  var datePicker = {
    parser: Parser,
    name: name$1
  };

  var Parser$1 = /*#__PURE__*/function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    var _super = _createSuper(Parser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _super.apply(this, arguments);
    }

    _createClass(Parser, [{
      key: "render",
      value: function render(children) {
        var data = this.$render.inputVData(this).props('field', this.field);
        return this.vNode.frame(data, children);
      }
    }, {
      key: "closeModel",
      value: function closeModel() {
        this.el.closeModel && this.el.closeModel();
      }
    }]);

    return Parser;
  }(createFormCreate.BaseParser);

  var name$2 = 'frame';
  var frame = {
    parser: Parser$1,
    name: name$2
  };

  var name$3 = 'hidden';

  var parser$1 = /*#__PURE__*/function (_BaseParser) {
    _inherits(parser, _BaseParser);

    var _super = _createSuper(parser);

    function parser() {
      _classCallCheck(this, parser);

      return _super.apply(this, arguments);
    }

    _createClass(parser, [{
      key: "render",
      value: function render() {
        return [];
      }
    }]);

    return parser;
  }(createFormCreate.BaseParser);

  var hidden = {
    parser: parser$1,
    name: name$3
  };

  var Parser$2 = /*#__PURE__*/function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    var _super = _createSuper(Parser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _super.apply(this, arguments);
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var props = this.rule.props;
        if (props.autosize && props.autosize.minRows) utils.$set(props, 'rows', props.autosize.minRows || 2);
      }
    }]);

    return Parser;
  }(createFormCreate.BaseParser);

  var name$4 = 'input';
  var input = {
    parser: Parser$2,
    name: name$4
  };

  var Parser$3 = /*#__PURE__*/function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    var _super = _createSuper(Parser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _super.apply(this, arguments);
    }

    _createClass(Parser, [{
      key: "toFormValue",
      value: function toFormValue(value) {
        return this.rule.options.filter(function (opt) {
          return opt.value === value;
        }).reduce(function (initial, opt) {
          return opt.label;
        }, '');
      }
    }, {
      key: "toValue",
      value: function toValue(parseValue) {
        return this.rule.options.filter(function (opt) {
          return opt.label === parseValue;
        }).reduce(function (initial, opt) {
          return opt.value;
        }, '');
      }
    }, {
      key: "render",
      value: function render(children) {
        return this.vNode.radio(this.$render.inputVData(this).props({
          'options': this.rule.options
        }), children);
      }
    }]);

    return Parser;
  }(createFormCreate.BaseParser);

  var name$5 = 'radio';
  var radio = {
    parser: Parser$3,
    name: name$5
  };

  var Parser$4 = /*#__PURE__*/function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    var _super = _createSuper(Parser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _super.apply(this, arguments);
    }

    _createClass(Parser, [{
      key: "render",
      value: function render(children) {
        return this.vNode.select(this.$render.inputVData(this).props('options', this.rule.options), children);
      }
    }]);

    return Parser;
  }(createFormCreate.BaseParser);

  var name$6 = 'select';
  var select = {
    parser: Parser$4,
    name: name$6
  };

  var Parser$5 = /*#__PURE__*/function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    var _super = _createSuper(Parser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _super.apply(this, arguments);
    }

    _createClass(Parser, [{
      key: "toFormValue",
      value: function toFormValue(value) {
        var rule = this.rule,
            isArr = Array.isArray(value),
            props = rule.props,
            min = props.min || 0,
            parseValue;

        if (props.range === true) {
          parseValue = isArr ? value : [min, parseFloat(value) || min];
        } else {
          parseValue = isArr ? parseFloat(value[0]) || min : parseFloat(value);
        }

        return parseValue;
      }
    }]);

    return Parser;
  }(createFormCreate.BaseParser);

  var name$7 = 'slider';
  var slider = {
    parser: Parser$5,
    name: name$7
  };

  var parser$2 = /*#__PURE__*/function (_BaseParser) {
    _inherits(parser, _BaseParser);

    var _super = _createSuper(parser);

    function parser() {
      _classCallCheck(this, parser);

      return _super.apply(this, arguments);
    }

    _createClass(parser, [{
      key: "render",
      value: function render(children) {
        var rule = this.rule,
            slot = rule.props.slot || {};
        return this.vNode["switch"](this.$render.inputVData(this).scopedSlots({
          open: function open() {
            return slot.open;
          },
          close: function close() {
            return slot.close;
          }
        }).get(), children);
      }
    }]);

    return parser;
  }(createFormCreate.BaseParser);

  var name$8 = 'switch';
  var iswitch = {
    parser: parser$2,
    name: name$8
  };

  var Parser$6 = /*#__PURE__*/function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    var _super = _createSuper(Parser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _super.apply(this, arguments);
    }

    _createClass(Parser, [{
      key: "render",
      value: function render(children) {
        var _this = this;

        var data = this.$render.parserToData(this).get();
        return this.vNode.tree({
          props: {
            ctx: data,
            children: children,
            value: this.$handle.getFormData(this),
            type: data.props.type
          },
          ref: this.refName,
          key: this.key,
          on: {
            input: function input(value) {
              _this.$render.onInput(_this, value);
            }
          }
        });
      }
    }]);

    return Parser;
  }(createFormCreate.BaseParser);

  var name$9 = 'tree';
  var tree = {
    parser: Parser$6,
    name: name$9
  };

  var Parser$7 = /*#__PURE__*/function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    var _super = _createSuper(Parser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _super.apply(this, arguments);
    }

    _createClass(Parser, [{
      key: "render",
      value: function render(children) {
        var _this = this;

        var ctx = this.$render.parserToData(this).get();
        var key = this.key,
            refName = this.refName;
        delete ctx.props.defaultFileList;
        var props = {
          uploadType: ctx.props.uploadType,
          maxLength: ctx.props.maxLength,
          modalTitle: ctx.props.modalTitle,
          handleIcon: ctx.props.handleIcon,
          onHandle: ctx.props.onHandle,
          allowRemove: ctx.props.allowRemove,
          value: this.$handle.getFormData(this),
          ctx: ctx,
          children: children
        };
        return this.vNode.upload({
          props: props,
          key: key,
          ref: refName,
          on: {
            input: function input(n) {
              _this.$render.onInput(_this, n);
            }
          }
        });
      }
    }]);

    return Parser;
  }(createFormCreate.BaseParser);

  var name$a = 'upload';
  var upload = {
    parser: Parser$7,
    name: name$a
  };

  var parsers = [checkbox, datePicker, frame, hidden, input, radio, select, slider, iswitch, tree, upload];

  var nodes = {
    button: 'i-button',
    icon: 'Icon',
    slider: 'Slider',
    rate: 'Rate',
    upload: 'fc-upload',
    cascader: 'Cascader',
    colorPicker: 'Color-Picker',
    timePicker: 'Time-Picker',
    datePicker: 'Date-Picker',
    'switch': 'i-switch',
    select: 'fc-select',
    checkbox: 'fc-checkbox',
    radio: 'fc-radio',
    inputNumber: 'Input-Number',
    input: 'i-input',
    formItem: 'Form-Item',
    form: 'i-form',
    frame: 'fc-frame',
    col: 'i-col',
    row: 'row',
    tree: 'fc-tree',
    autoComplete: 'AutoComplete',
    group: 'fc-group'
  };

  function styleInject(css, ref) {
    if (ref === void 0) ref = {};
    var insertAt = ref.insertAt;

    if (!css || typeof document === 'undefined') {
      return;
    }

    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');
    style.type = 'text/css';

    if (insertAt === 'top') {
      if (head.firstChild) {
        head.insertBefore(style, head.firstChild);
      } else {
        head.appendChild(style);
      }
    } else {
      head.appendChild(style);
    }

    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
  }

  var css_248z = ".form-create .form-create .ivu-form-item {\n    margin-bottom: 24px;\n}\n\n.form-create .form-create .ivu-form-item .ivu-form-item {\n    margin-bottom: 0px;\n}\n\n.form-create .fc-group .ivu-icon + .ivu-icon {\n    margin-left: 3px;\n}\n\n.form-create .fc-upload .ivu-icon {\n    vertical-align: middle;\n}\n\n.form-create .__fc_h {\n    display: none;\n}\n\n.form-create .__fc_v {\n    visibility: hidden;\n}\n\n.fc-pop2 {\n    text-align: left;\n    vertical-align: -0.2em;\n}\n\n.fc-pop3 {\n    vertical-align: 0.1em;\n}\n";
  styleInject(css_248z);

  function isTooltip(info) {
    return info.type === 'tooltip';
  }

  var Form = /*#__PURE__*/function (_BaseForm) {
    _inherits(Form, _BaseForm);

    var _super = _createSuper(Form);

    function Form() {
      _classCallCheck(this, Form);

      return _super.apply(this, arguments);
    }

    _createClass(Form, [{
      key: "inputVData",
      value: function inputVData(parser) {
        if (!parser.rule.props.size && this.options.form.size) parser.vData.props('size', this.options.form.size);
      }
    }, {
      key: "validate",
      value: function validate(call) {
        this.getFormRef().validate(function (valid) {
          call && call(valid);
        });
      }
    }, {
      key: "validateField",
      value: function validateField(field, call) {
        this.getFormRef().validateField(field, call);
      }
    }, {
      key: "resetField",
      value: function resetField(parser) {
        this.vm.$refs[parser.formItemRefName].resetField();
      }
    }, {
      key: "clearValidateState",
      value: function clearValidateState(parser) {
        var fItem = this.vm.$refs[parser.formItemRefName];

        if (fItem) {
          fItem.validateMessage = '';
          fItem.validateState = '';
        }
      }
    }, {
      key: "beforeRender",
      value: function beforeRender() {
        this.propsData = this.vData.props(this.options.form).props({
          model: this.$handle.formData,
          rules: this.$handle.validate,
          key: 'form' + this.unique
        }).ref(this.refName).nativeOn({
          submit: utils.preventDefault
        })["class"](this.options.form.className)["class"]('form-create', true).key(this.unique).get();
      }
    }, {
      key: "render",
      value: function render(vn) {
        if (vn.length > 0) vn.push(this.makeFormBtn());
        return this.vNode.form(this.propsData, [this.options.row === false ? vn : this.makeRow(vn)]);
      }
    }, {
      key: "makeRow",
      value: function makeRow(vn) {
        var _class = {},
            row = this.options.row || {};
        if (row["class"]) _class[row["class"]] = true;
        return this.vNode.row({
          props: row || {},
          key: 'fr' + this.unique,
          "class": _class
        }, vn);
      }
    }, {
      key: "container",
      value: function container(child, parser) {
        return this.makeFormItem(parser, child);
      }
    }, {
      key: "makeFormItem",
      value: function makeFormItem(parser, child) {
        var fItemUnique = "fItem".concat(parser.key).concat(this.unique),
            rule = parser.rule,
            field = parser.field,
            formItemRefName = parser.formItemRefName,
            col = this.getGetCol(parser),
            labelWidth = !col.labelWidth && !rule.title ? 0 : col.labelWidth,
            _this$propsData$props = this.propsData.props,
            inline = _this$propsData$props.inline,
            _col = _this$propsData$props.col,
            propsData = this.vData.props({
          prop: field,
          label: rule.title,
          // labelFor: unique,
          rules: rule.validate,
          labelWidth: labelWidth,
          required: rule.props.required
        }).key(fItemUnique).ref(formItemRefName)["class"](rule.className).get(),
            node = this.vNode.formItem(propsData, [child, this.makeFormPop(parser, fItemUnique)]);
        return inline === true || _col === false ? node : this.makeCol(col, parser, fItemUnique, [node]);
      }
    }, {
      key: "makeFormPop",
      value: function makeFormPop(_ref, unique) {
        var rule = _ref.rule;

        if (rule.title) {
          var titleProp = utils.isString(rule.title) ? {
            title: rule.title
          } : rule.title;
          var info = this.options.info || {},
              svn = [titleProp.title || ''];

          if (rule.info) {
            svn.push(this.vNode.make(isTooltip(info) ? 'Tooltip' : 'Poptip', {
              props: _objectSpread2(_objectSpread2({}, info), {}, {
                content: rule.info
              }),
              "class": 'fc-pop' + iviewConfig._v,
              key: "pop".concat(unique)
            }, [this.vNode.icon({
              props: {
                type: info.icon || iviewConfig.infoIcon,
                size: 16
              }
            })]));
          }

          return this.vNode.make('span', _objectSpread2(_objectSpread2({}, titleProp), {}, {
            slot: 'label'
          }), svn);
        }
      }
    }, {
      key: "makeCol",
      value: function makeCol(col, parser, fItemUnique, VNodeFn) {
        var _cls;

        if (col.span === undefined) col.span = 24;
        var cls = (_cls = {}, _defineProperty(_cls, css_248z.__fc_h, !!parser.rule.hidden), _defineProperty(_cls, css_248z.__fc_v, !!parser.rule.visibility), _cls);
        if (col["class"]) cls[col["class"]] = true;
        return this.vNode.col({
          props: col,
          "class": cls,
          key: "".concat(fItemUnique, "col1")
        }, VNodeFn);
      }
    }, {
      key: "makeFormBtn",
      value: function makeFormBtn() {
        var btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if (submitBtnShow) btn.push(this.makeSubmitBtn(resetBtnShow ? 19 : 24));
        if (resetBtnShow) btn.push(this.makeResetBtn(4));
        return this.propsData.props.inline === true ? btn : btn.length ? this.vNode.col({
          props: {
            span: 24
          },
          key: "".concat(this.unique, "col2")
        }, btn) : [];
      }
    }, {
      key: "makeResetBtn",
      value: function makeResetBtn(span) {
        var _this = this;

        var resetBtn = this.vm.resetProps,
            props = resetBtn.col || {
          span: span,
          push: 1
        };
        return this.vNode.col({
          props: props,
          key: "".concat(this.unique, "col3")
        }, [this.vNode.button({
          key: "frsbtn".concat(this.unique),
          props: resetBtn,
          on: {
            'click': function click() {
              var fApi = _this.$handle.fCreateApi;
              utils.isFunction(resetBtn.click) ? resetBtn.click(fApi) : fApi.resetFields();
            }
          }
        }, [resetBtn.innerText])]);
      }
    }, {
      key: "makeSubmitBtn",
      value: function makeSubmitBtn(span) {
        var _this2 = this;

        var submitBtn = this.vm.buttonProps,
            props = submitBtn.col || {
          span: span
        };
        return this.vNode.col({
          props: props,
          key: "".concat(this.unique, "col4")
        }, [this.vNode.button({
          key: "fbtn".concat(this.unique),
          props: submitBtn,
          on: {
            'click': function click() {
              var fApi = _this2.$handle.fCreateApi;
              utils.isFunction(submitBtn.click) ? submitBtn.click(fApi) : fApi.submit();
            }
          }
        }, [submitBtn.innerText])]);
      }
    }]);

    return Form;
  }(createFormCreate.BaseForm);

  var name$b = 'datePicker';
  var datePicker$1 = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce(function (maker, type) {
    maker[type] = createFormCreate.creatorTypeFactory(name$b, type.toLowerCase());
    return maker;
  }, {});

  var name$c = 'frame';
  var types = {
    frameInputs: ['input', 0],
    frameFiles: ['file', 0],
    frameImages: ['image', 0],
    frameInputOne: ['input', 1],
    frameFileOne: ['file', 1],
    frameImageOne: ['image', 1]
  };
  var maker = Object.keys(types).reduce(function (maker, key) {
    maker[key] = createFormCreate.creatorTypeFactory(name$c, function (m) {
      return m.props({
        type: types[key][0],
        maxLength: types[key][1]
      });
    });
    return maker;
  }, {});
  maker.frameInput = maker.frameInputs;
  maker.frameFile = maker.frameFiles;
  maker.frameImage = maker.frameImages;

  var name$d = 'input';
  var maker$1 = ['password', 'url', 'email', 'text', 'textarea'].reduce(function (maker, type) {
    maker[type] = createFormCreate.creatorTypeFactory(name$d, type);
    return maker;
  }, {});
  maker$1.idate = createFormCreate.creatorTypeFactory(name$d, 'date');

  var name$e = 'select';
  var select$1 = {
    selectMultiple: createFormCreate.creatorTypeFactory(name$e, true, 'multiple'),
    selectOne: createFormCreate.creatorTypeFactory(name$e, false, 'multiple')
  };

  var name$f = 'slider';
  var slider$1 = {
    sliderRange: createFormCreate.creatorTypeFactory(name$f, true, 'range')
  };

  var name$g = 'timePicker';
  var timePicker = {
    time: createFormCreate.creatorTypeFactory(name$g, 'time'),
    timeRange: createFormCreate.creatorTypeFactory(name$g, 'timerange')
  };

  var name$h = 'tree';
  var types$1 = {
    'treeSelected': 'selected',
    'treeChecked': 'checked'
  };
  var tree$1 = Object.keys(types$1).reduce(function (maker, key) {
    maker[key] = createFormCreate.creatorTypeFactory(name$h, types$1[key]);
    return maker;
  }, {});

  var name$i = 'upload';
  var types$2 = {
    image: ['image', 0],
    file: ['file', 0],
    uploadFileOne: ['file', 1],
    uploadImageOne: ['image', 1]
  };
  var maker$2 = Object.keys(types$2).reduce(function (maker, key) {
    maker[key] = createFormCreate.creatorTypeFactory(name$i, function (m) {
      return m.props({
        uploadType: types$2[key][0],
        maxLength: types$2[key][1]
      });
    });
    return maker;
  }, {});
  maker$2.uploadImage = maker$2.image;
  maker$2.uploadFile = maker$2.file;

  var maker$3 = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, datePicker$1), maker), maker$1), select$1), slider$1), timePicker), tree$1), maker$2),
      names = ['autoComplete', 'cascader', 'colorPicker', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'timePicker', 'group'];

  names.forEach(function (name) {
    maker$3[name] = createFormCreate.creatorFactory(name);
  });
  maker$3.auto = maker$3.autoComplete;
  maker$3.number = maker$3.inputNumber;
  maker$3.color = maker$3.colorPicker;

  maker$3.hidden = function (field, value) {
    return createFormCreate.creatorFactory('hidden')('', field, value);
  };

  createFormCreate.VNode.use(nodes);
  var drive = {
    ui: "iview",
    version: "1.0.18",
    formRender: Form,
    components: components,
    parsers: parsers,
    makers: maker$3,
    getConfig: getConfig
  };

  var _createFormCreate = createFormCreate__default['default'](drive),
      FormCreate = _createFormCreate.FormCreate,
      install = _createFormCreate.install;

  createFormCreate.Creator.prototype.event = function (key, value) {
    var _this = this;

    var event;

    if (!utils.isPlainObject(key)) {
      event = _defineProperty({}, key, value);
    } else {
      event = key;
    }

    Object.keys(event).forEach(function (eventName) {
      var name = utils.toString(eventName).indexOf('on-') === 0 ? eventName : "on-".concat(eventName);

      _this.on(name, event[eventName]);
    });
    return this;
  };

  if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;

    if (window.Vue) {
      install(window.Vue);
    }
  }

  var maker$4 = FormCreate.maker;

  exports.default = FormCreate;
  exports.maker = maker$4;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
