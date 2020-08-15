/*!
 * @form-create/ant-design-vue v1.0.18
 * (c) 2018-2020 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@form-create/component-antdv-upload'), require('@form-create/component-antdv-frame'), require('@form-create/component-antdv-group'), require('@form-create/core'), require('moment'), require('@form-create/utils')) :
    typeof define === 'function' && define.amd ? define(['exports', '@form-create/component-antdv-upload', '@form-create/component-antdv-frame', '@form-create/component-antdv-group', '@form-create/core', 'moment', '@form-create/utils'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.formCreate = {}, global.upload$1, global.frame$1, global.group, global.createFormCreate, global.moment, global.utils));
}(this, (function (exports, upload$1, frame$1, group, createFormCreate, moment, utils) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    var upload__default = /*#__PURE__*/_interopDefaultLegacy(upload$1);
    var frame__default = /*#__PURE__*/_interopDefaultLegacy(frame$1);
    var group__default = /*#__PURE__*/_interopDefaultLegacy(group);
    var createFormCreate__default = /*#__PURE__*/_interopDefaultLegacy(createFormCreate);
    var moment__default = /*#__PURE__*/_interopDefaultLegacy(moment);

    var components = [upload__default['default'], frame__default['default'], group__default['default']];

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

    var Parser = /*#__PURE__*/function (_BaseParser) {
      _inherits(Parser, _BaseParser);

      var _super = _createSuper(Parser);

      function Parser() {
        _classCallCheck(this, Parser);

        return _super.apply(this, arguments);
      }

      _createClass(Parser, [{
        key: "render",
        value: function render(children) {
          return this.vNode.checkbox(this.$render.inputVData(this).props({
            'options': this.rule.options
          }), children);
        }
      }]);

      return Parser;
    }(createFormCreate.BaseParser);

    var name = 'checkbox';
    var checkbox = {
      parser: Parser,
      name: name
    };

    var FORMAT_TYPE = {
      date: 'YYYY-MM-DD',
      month: 'YYYY-MM',
      week: 'YYYY-wo',
      range: 'YYYY-MM-DD HH:mm:ss'
    };

    var _getType = function getType(type) {
      if (['date', 'month', 'week', 'range'].indexOf(type) === -1) return 'date';
      return type;
    };

    var toMoment = function toMoment(val) {
      return val instanceof moment__default['default'] ? val : moment__default['default'](val);
    };

    var Parser$1 = /*#__PURE__*/function (_BaseParser) {
      _inherits(Parser, _BaseParser);

      var _super = _createSuper(Parser);

      function Parser() {
        _classCallCheck(this, Parser);

        return _super.apply(this, arguments);
      }

      _createClass(Parser, [{
        key: "toFormValue",
        value: function toFormValue(value) {
          var parseValue,
              type = this.getType();
          var isArr = Array.isArray(value);

          if (type === 'range') {
            if (isArr) {
              parseValue = value.map(function (v) {
                return v ? toMoment(v) : null;
              });
            } else {
              parseValue = [];
            }
          } else {
            parseValue = isArr ? (value[0] ? toMoment(value[0]) : null) || null : value ? toMoment(value) : null;
          }

          return parseValue;
        }
      }, {
        key: "toValue",
        value: function toValue(formValue) {
          var format = this.getFormat();
          if (Array.isArray(formValue)) return formValue.map(function (v) {
            return v ? v.format(format) : v;
          });else return formValue ? formValue.format(format) : formValue;
        }
      }, {
        key: "getFormat",
        value: function getFormat() {
          return this.rule.props.format || (this.el ? this.el.format : '') || FORMAT_TYPE[_getType(this.rule.props.type)];
        }
      }, {
        key: "getType",
        value: function getType() {
          return _getType(this.rule.props.type);
        }
      }, {
        key: "render",
        value: function render(children) {
          var type = this.getType() + 'Picker';
          return this.vNode[type](this.$render.inputVData(this), [children]);
        }
      }]);

      return Parser;
    }(createFormCreate.BaseParser);

    var name$1 = 'datePicker';
    var datePicker = {
      parser: Parser$1,
      name: name$1
    };

    var Parser$2 = /*#__PURE__*/function (_BaseParser) {
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
      parser: Parser$2,
      name: name$2
    };

    var name$3 = 'hidden';

    var parser = /*#__PURE__*/function (_BaseParser) {
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
      parser: parser,
      name: name$3
    };

    var Parser$3 = /*#__PURE__*/function (_BaseParser) {
      _inherits(Parser, _BaseParser);

      var _super = _createSuper(Parser);

      function Parser() {
        _classCallCheck(this, Parser);

        return _super.apply(this, arguments);
      }

      _createClass(Parser, [{
        key: "render",
        value: function render(children) {
          var type = this.rule.props.type;
          if (['textarea', 'search'].indexOf(type) === -1) type = 'input';
          var Type = type === 'textarea' ? 'ATextarea' : type === 'search' ? 'AInputSearch' : 'AInput';
          return this.vNode.make(Type, this.$render.inputVData(this), [children]);
        }
      }]);

      return Parser;
    }(createFormCreate.BaseParser);

    var name$4 = 'input';
    var input = {
      parser: Parser$3,
      name: name$4
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
          return this.vNode.radio(this.$render.inputVData(this).props({
            'options': this.rule.options
          }), children);
        }
      }]);

      return Parser;
    }(createFormCreate.BaseParser);

    var name$5 = 'radio';
    var radio = {
      parser: Parser$4,
      name: name$5
    };

    var Parser$5 = /*#__PURE__*/function (_BaseParser) {
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
      }, {
        key: "toFormValue",
        value: function toFormValue(val) {
          return utils.isUndef(val) ? undefined : val;
        }
      }]);

      return Parser;
    }(createFormCreate.BaseParser);

    var name$6 = 'select';
    var select = {
      parser: Parser$5,
      name: name$6
    };

    var toMoment$1 = function toMoment(val, format) {
      return val instanceof moment__default['default'] ? val : moment__default['default'](val, format);
    };

    var Parser$6 = /*#__PURE__*/function (_BaseParser) {
      _inherits(Parser, _BaseParser);

      var _super = _createSuper(Parser);

      function Parser() {
        _classCallCheck(this, Parser);

        return _super.apply(this, arguments);
      }

      _createClass(Parser, [{
        key: "toFormValue",
        value: function toFormValue(value) {
          return value ? toMoment$1(value, this.getFormat()) : null;
        }
      }, {
        key: "toValue",
        value: function toValue(formValue) {
          return formValue ? formValue.format(this.getFormat()) : formValue;
        }
      }, {
        key: "getFormat",
        value: function getFormat() {
          return this.rule.props.format || (this.el ? this.el.format : '') || 'HH:mm:ss';
        }
      }]);

      return Parser;
    }(createFormCreate.BaseParser);

    var name$7 = 'timePicker';
    var timePicker = {
      parser: Parser$6,
      name: name$7
    };

    var parser$1 = /*#__PURE__*/function (_BaseParser) {
      _inherits(parser, _BaseParser);

      var _super = _createSuper(parser);

      function parser(handle, rule, id) {
        var _this;

        _classCallCheck(this, parser);

        _this = _super.call(this, handle, rule, id);
        _this.modelEvent = 'check';
        var props = _this.rule.props;
        if (!props.replaceFields) props.replaceFields = {
          key: 'id'
        };else if (!props.replaceFields.key) props.replaceFields.key = 'id';
        return _this;
      }

      _createClass(parser, [{
        key: "render",
        value: function render(children) {
          var data = this.$render.inputVData(this).props('checkedKeys', this.$handle.getFormData(this)).props('checkable', true).get();
          return this.vNode.tree(data, [children]);
        }
      }]);

      return parser;
    }(createFormCreate.BaseParser);

    var name$8 = 'tree';
    var tree = {
      parser: parser$1,
      name: name$8
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
          var _this = this;

          var data = this.$render.inputVData(this).get();
          return this.vNode.upload({
            props: _objectSpread2(_objectSpread2({}, data.props), {}, {
              ctx: data,
              children: children,
              value: this.$handle.getFormData(this)
            }),
            on: {
              input: function input(v) {
                _this.$render.onInput(_this, v);
              }
            }
          });
        }
      }, {
        key: "toFormValue",
        value: function toFormValue(value) {
          return utils.toArray(value);
        }
      }, {
        key: "toValue",
        value: function toValue(formValue) {
          return this.rule.props.limit === 1 ? formValue[0] || '' : formValue;
        }
      }]);

      return parser;
    }(createFormCreate.BaseParser);

    var name$9 = 'upload';
    var upload = {
      parser: parser$2,
      name: name$9
    };

    var parsers = [checkbox, datePicker, frame, hidden, input, radio, select, timePicker, tree, upload];

    var UNDEF = undefined;
    function getConfig() {
      return {
        form: {
          hideRequiredMark: false,
          layout: 'horizontal',
          labelAlign: 'right',
          labelCol: {
            span: 4
          },
          wrapperCol: {
            span: 20
          },
          colon: UNDEF,
          validateOnRuleChange: true
        },
        row: {
          gutter: 0,
          type: UNDEF,
          align: UNDEF,
          justify: UNDEF
        },
        info: {
          type: 'popover',
          placement: 'topLeft',
          icon: 'question-circle-o'
        },
        submitBtn: {
          disabled: false,
          ghost: false,
          icon: 'upload',
          loading: false,
          shape: UNDEF,
          size: UNDEF,
          type: 'primary',
          block: true,
          innerText: '提交',
          htmlType: UNDEF,
          show: true,
          col: UNDEF,
          click: UNDEF
        },
        resetBtn: {
          disabled: false,
          ghost: false,
          icon: 'sync',
          loading: false,
          shape: UNDEF,
          size: UNDEF,
          type: 'default',
          block: true,
          innerText: '重置',
          htmlType: UNDEF,
          show: false,
          col: UNDEF,
          click: UNDEF
        }
      };
    }

    var nodes = {
      button: 'a-button',
      icon: 'a-icon',
      slider: 'a-slider',
      rate: 'a-rate',
      upload: 'fc-update',
      cascader: 'a-cascader',
      timePicker: 'a-time-picker',
      datePicker: 'a-date-picker',
      rangePicker: 'a-range-picker',
      weekPicker: 'a-week-picker',
      monthPicker: 'a-month-picker',
      'switch': 'a-switch',
      select: 'a-select',
      checkbox: 'a-checkbox-group',
      radio: 'a-radio-group',
      inputNumber: 'a-input-number',
      search: 'a-input-search',
      textarea: 'a-textarea',
      formItem: 'a-form-model-item',
      form: 'a-form-model',
      frame: 'fc-frame',
      col: 'a-col',
      row: 'a-row',
      tree: 'a-tree',
      autoComplete: 'a-auto-complete',
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

    var css_248z = ".form-create .form-create .ant-form-item {\n    margin-bottom: 22px;\n}\n\n.form-create .form-create .ant-form-item .ant-form-item {\n    margin-bottom: 0px;\n}\n\n.form-create .form-create .ant-form-item.ant-form-item-with-help {\n    margin-bottom: 3px;\n}\n\n.form-create .form-create .ant-form-item .ant-form-item.ant-form-item-with-help {\n    margin-bottom: -22px;\n}\n\n.form-create .__fc_h {\n    display: none;\n}\n\n.form-create .__fc_v {\n    visibility: hidden;\n}\n";
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
        key: "getItemCol",
        value: function getItemCol(parser, field) {
          var col = this.getGetCol(parser, field);
          return Object.keys(col).length ? col : undefined;
        }
      }, {
        key: "makeFormItem",
        value: function makeFormItem(parser, child) {
          var fItemUnique = "fItem".concat(parser.key).concat(this.unique),
              isVertical = this.propsData.props.layout === 'vertical',
              rule = parser.rule,
              field = parser.field,
              formItemRefName = parser.formItemRefName,
              col = this.getGetCol(parser),
              _this$propsData$props = this.propsData.props,
              layout = _this$propsData$props.layout,
              _col = _this$propsData$props.col,
              propsData = this.vData.props({
            prop: field,
            labelCol: isVertical ? {} : this.getItemCol(parser, 'labelCol'),
            wrapperCol: isVertical ? {} : this.getItemCol(parser, 'wrapperCol'),
            rules: rule.validate,
            required: rule.props.required
          }).key(fItemUnique).ref(formItemRefName)["class"](rule.className).get(),
              node = this.vNode.formItem(propsData, [child, this.makeFormPop(parser, fItemUnique)]);
          return layout === 'inline' || _col === false ? node : this.makeCol(col, parser, fItemUnique, [node]);
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
                svn = [titleProp.title || ''],
                isTool = isTooltip(info);

            if (rule.info) {
              svn.push(this.vNode.make(isTool ? 'ATooltip' : 'APopover', {
                props: _objectSpread2(_objectSpread2({}, info), {}, _defineProperty({}, isTool ? 'title' : 'content', rule.info)),
                key: "pop".concat(unique)
              }, [this.vNode.icon({
                props: {
                  type: info.icon || 'question-circle-o',
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
          return this.propsData.props.layout === 'inline' ? btn : btn.length ? this.vNode.col({
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

    var name$a = 'datePicker';
    var datePicker$1 = ['date', 'month', 'week'].reduce(function (initial, type) {
      initial[type] = createFormCreate.creatorTypeFactory(name$a, type);
      return initial;
    }, {
      dateRange: createFormCreate.creatorTypeFactory(name$a, 'range'),
      datetimeRange: createFormCreate.creatorTypeFactory(name$a, function (m) {
        return m.props({
          type: 'range',
          showTime: true
        });
      })
    });

    var name$b = 'frame';
    var types = {
      frameInputs: ['input', 0],
      frameFiles: ['file', 0],
      frameImages: ['image', 0],
      frameInputOne: ['input', 1],
      frameFileOne: ['file', 1],
      frameImageOne: ['image', 1]
    };
    var maker = Object.keys(types).reduce(function (maker, key) {
      maker[key] = createFormCreate.creatorTypeFactory(name$b, function (m) {
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

    var name$c = 'input';
    var maker$1 = ['password', 'url', 'email', 'text', 'textarea', 'search'].reduce(function (maker, type) {
      maker[type] = createFormCreate.creatorTypeFactory(name$c, type);
      return maker;
    }, {});
    maker$1.idate = createFormCreate.creatorTypeFactory(name$c, 'date');

    var name$d = 'select';
    var select$1 = {
      selectMultiple: createFormCreate.creatorTypeFactory(name$d, 'multiple', 'mode'),
      selectTags: createFormCreate.creatorTypeFactory(name$d, 'tags', 'mode'),
      selectCombobox: createFormCreate.creatorTypeFactory(name$d, 'combobox', 'mode')
    };

    var name$e = 'slider';
    var slider = {
      sliderRange: createFormCreate.creatorTypeFactory(name$e, true, 'range')
    };

    var name$f = 'upload';
    var types$1 = {
      image: ['image', 0],
      file: ['file', 0],
      uploadFileOne: ['file', 1],
      uploadImageOne: ['image', 1]
    };
    var maker$2 = Object.keys(types$1).reduce(function (maker, key) {
      maker[key] = createFormCreate.creatorTypeFactory(name$f, function (m) {
        return m.props({
          uploadType: types$1[key][0],
          maxLength: types$1[key][1]
        });
      });
      return maker;
    }, {});
    maker$2.uploadImage = maker$2.image;
    maker$2.uploadFile = maker$2.file;

    var maker$3 = _objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2(_objectSpread2({}, datePicker$1), maker), maker$1), select$1), slider), maker$2),
        names = ['autoComplete', 'cascader', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'switch', 'rate', 'slider', 'timePicker'];

    names.forEach(function (name) {
      maker$3[name] = createFormCreate.creatorFactory(name);
    });
    maker$3.auto = maker$3.autoComplete;
    maker$3.number = maker$3.inputNumber;
    maker$3.time = maker$3.timePicker;

    maker$3.hidden = function (field, value) {
      return createFormCreate.creatorFactory('hidden')('', field, value);
    };

    var modelEvents = {
      'input': 'change.value',
      'switch': {
        prop: 'checked',
        event: 'change'
      }
    };
    ['autoComplete', 'cascader', 'inputNumber', 'rate', 'slider', 'change', 'timePicker', 'datePicker', 'select'].forEach(function (n) {
      return modelEvents[n] = 'change';
    });

    createFormCreate.VNode.use(nodes);
    var drive = {
      ui: "ant-design-vue",
      version: "".concat("1.0.18"),
      formRender: Form,
      components: components,
      parsers: parsers,
      makers: maker$3,
      getConfig: getConfig,
      modelEvents: modelEvents
    };

    var _createFormCreate = createFormCreate__default['default'](drive),
        FormCreate = _createFormCreate.FormCreate,
        install = _createFormCreate.install;

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
