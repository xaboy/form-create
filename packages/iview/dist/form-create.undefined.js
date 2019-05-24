/*!
 * @form-create/iview v0.0.1
 * (c) 2018-2019 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('iview')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue', 'iview'], factory) :
  (global = global || self, factory(global.formCreate = {}, global.Vue, global.iview));
}(this, function (exports, Vue$1, iview) { 'use strict';

  Vue$1 = Vue$1 && Vue$1.hasOwnProperty('default') ? Vue$1['default'] : Vue$1;
  iview = iview && iview.hasOwnProperty('default') ? iview['default'] : iview;

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

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

  function _extends() {
    _extends = Object.assign || function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];

        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }

      return target;
    };

    return _extends.apply(this, arguments);
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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function $nt(fn) {
    Vue$1.nextTick(fn);
  }
  function $set(target, field, value) {
    Vue$1.set(target, field, value);
  }
  function $del(target, field) {
    Vue$1["delete"](target, field);
  }
  function isValidChildren(children) {
    return Array.isArray(children) && children.length > 0;
  }
  var _toString = Object.prototype.toString;
  function isUndef(v) {
    return v === undefined || v === null;
  }
  function toString(val) {
    return val == null ? '' : _typeof(val) === 'object' ? JSON.stringify(val, null, 2) : String(val);
  }
  function extend(to, _from) {
    for (var key in _from) {
      $set(to, key, _from[key]);
    }

    return to;
  }
  function debounce(fn, wait) {
    var timeout = null;
    return function () {
      for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      if (timeout !== null) clearTimeout(timeout);
      timeout = setTimeout(function () {
        return fn.apply(void 0, arg);
      }, wait);
    };
  }
  function isType(arg, type) {
    return _toString.call(arg) === '[object ' + type + ']';
  }
  function isDate(arg) {
    return isType(arg, 'Date');
  }
  function isPlainObject(arg) {
    return isType(arg, 'Object');
  }
  function isFunction(arg) {
    return isType(arg, 'Function');
  }
  function isString(arg) {
    return isType(arg, 'String');
  }
  function isBool(arg) {
    return isType(arg, 'Boolean');
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
  function isElement(arg) {
    return _typeof(arg) === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg);
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
            nst && $set(origin, key, []);
          } else {
            nst && $set(origin, key, {});
          }

          deepExtend(origin[key], clone);
        } else {
          $set(origin, key, clone);
        }
      }
    }

    return origin;
  }
  var id = 0;
  function uniqueId() {
    return ++id;
  }
  function toDefSlot(slot, $h, rule) {
    return [slot && isFunction(slot) ? slot.call(rule, $h) : slot];
  }
  function timeStampToDate(timeStamp) {
    if (isDate(timeStamp)) return timeStamp;else {
      var date = new Date(timeStamp);
      return date.toString() === 'Invalid Date' ? timeStamp : date;
    }
  }
  function preventDefault(e) {
    e.preventDefault();
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
    }

    return fmt;
  }
  function errMsg(i) {
    return '\n\x67\x69\x74\x68\x75\x62\x3a\x68\x74\x74\x70' + '\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f' + '\x6d\x2f\x78\x61\x62\x6f\x79\x2f\x66\x6f\x72\x6d\x2d' + '\x63\x72\x65\x61\x74\x65\n\x64\x6f\x63\x75\x6d\x65' + '\x6e\x74\x3a\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77' + '\x2e\x66\x6f\x72\x6d\x2d\x63\x72\x65\x61\x74\x65\x2e' + '\x63\x6f\x6d' + (i || '');
  }

  function getBaseConfig() {
    return {
      mounted: function mounted($f) {},
      onReload: function onReload($f) {},
      onSubmit: function onSubmit(formData, $f) {},
      el: null,
      switchMaker: true,
      iframeHelper: false
    };
  }
  var formCreateStyleElId = 'form-create-style';
  var formCreateName = 'FormCreate';

  function coreComponent(fc, mixin) {
    return {
      name: "".concat(formCreateName, "Core"),
      mixins: [mixin],
      render: function render() {
        return fc.handle.run();
      },
      beforeCreate: function beforeCreate() {
        this._fc = fc;
        fc.beforeCreate(this);
      },
      created: function created() {
        fc.handle.created();
        this.$f = fc.fCreateApi;
      },
      mounted: function mounted() {
        fc.handle.mounted();
        this.$watch('rules', function (n) {
          fc.handle.reloadRule(n);
        });
      }
    };
  }

  function $FormCreate(formCreate, mixin) {
    return {
      name: formCreateName,
      mixins: [mixin],
      props: {
        rule: {
          type: Array,
          required: true,
          "default": function _default() {
            return {};
          }
        },
        option: {
          type: Object,
          "default": function _default() {
            return {};
          },
          required: false
        },
        value: Object
      },
      render: function render() {
        return this._fc.handle.run();
      },
      beforeCreate: function beforeCreate() {
        var _this$$options$propsD = this.$options.propsData,
            rule = _this$$options$propsD.rule,
            option = _this$$options$propsD.option;
        this._fc = new formCreate(rule, option);

        this._fc.beforeCreate(this);
      },
      created: function created() {
        this._fc.handle.created();

        this.$f = this._fc.handle.fCreateApi;
        this.$emit('input', this.$f);
      },
      mounted: function mounted() {
        var _this = this;

        var _fc = this._fc;

        _fc.handle.mounted();

        this.$watch('rule', function (n) {
          _fc.handle.reloadRule(n);

          _this.$emit('input', _this.$f);
        });
        this.$emit('input', this.$f);
      }
    };
  }

  function getMixins(components) {
    return {
      data: function data() {
        return {
          rules: {},
          components: {},
          cptData: {},
          buttonProps: {},
          resetProps: {},
          trueData: {},
          jsonData: {},
          $f: {},
          isShow: true,
          unique: 1
        };
      },
      components: components,
      methods: {
        _formField: function _formField() {
          return Object.keys(this.trueData);
        },
        _changeFormData: function _changeFormData(field, value) {
          if (Object.keys(this.cptData).indexOf(field) !== -1) {
            this.$set(this.cptData, field, value);
          }
        },
        _changeValue: function _changeValue(field, value) {
          this.$set(this.trueData[field], 'value', value);
        },
        _value: function _value(field) {
          return this.trueData[field] === undefined ? undefined : this.trueData[field].value;
        },
        _trueData: function _trueData(field) {
          return this.trueData[field];
        },
        _formData: function _formData(field) {
          return this.cptData[field];
        },
        _removeField: function _removeField(field) {
          $del(this.cptData, field);
          $del(this.trueData, field);
          $del(this.jsonData, field);
          if (this.components[field] !== undefined) $del(this.components, field);
        },
        _buttonProps: function _buttonProps(props) {
          this.$set(this, 'buttonProps', deepExtend(this.buttonProps, props));
        },
        _resetProps: function _resetProps(props) {
          this.$set(this, 'resetProps', deepExtend(this.resetProps, props));
        },
        _refresh: function _refresh() {
          this.unique += 1;
        },
        _sync: function _sync() {
          this.unique += 1;
          this._fComponent.fRender.cacheUnique = this.unique;
        },
        _change: function _change(field, json) {
          if (this.jsonData[field] !== json) {
            this.jsonData[field] = json;
            return true;
          }

          return false;
        }
      },
      beforeDestroy: function beforeDestroy() {
        this._fc.reload([]);
      },
      mounted: function mounted() {
        var _this = this;

        this._fc.handle.mounted();

        this.$watch('option', function (n) {
          $nt(function () {
            _this._refresh();
          });
        }, {
          deep: true
        });
      }
    };
  }

  function defVData() {
    return {
      "class": {},
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

  var VData =
  /*#__PURE__*/
  function () {
    function VData() {
      _classCallCheck(this, VData);

      this.init();
    }

    _createClass(VData, [{
      key: "class",
      value: function _class(classList) {
        var _this = this;

        var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        if (isUndef(classList)) return this;

        if (Array.isArray(classList)) {
          classList.forEach(function (cls) {
            $set(_this._data["class"], toString(cls), true);
          });
        } else if (isPlainObject(classList)) {
          $set(this._data, 'class', extend(this._data["class"], classList));
        } else {
          $set(this._data["class"], toString(classList), status === undefined ? true : status);
        }

        return this;
      }
    }, {
      key: "directives",
      value: function directives(_directives) {
        if (isUndef(_directives)) return this;
        $set(this._data, 'directives', this._data.directives.concat(toArray(_directives)));
        return this;
      }
    }, {
      key: "init",
      value: function init() {
        this._data = defVData();
        return this;
      }
    }, {
      key: "get",
      value: function get() {
        this._prev = this._data;
        this.init();
        return this._prev;
      }
    }]);

    return VData;
  }();
  var keyList = ['ref', 'key', 'slot'];
  var objList = ['scopedSlots', 'nativeOn', 'on', 'domProps', 'props', 'attrs', 'style'];
  keyList.forEach(function (key) {
    VData.prototype[key] = function (val) {
      $set(this._data, key, val);
      return this;
    };
  });
  objList.forEach(function (key) {
    VData.prototype[key] = function (obj, val) {
      if (isUndef(obj)) return this;

      if (isPlainObject(obj)) {
        $set(this._data, key, extend(this._data[key], obj));
      } else {
        $set(this._data[key], toString(obj), val);
      }

      return this;
    };
  });

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
    return function (title, field, value) {
      var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return new Creator(name, title, field, value, props);
    };
  }
  function creatorTypeFactory(name, type) {
    var typeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'type';
    return function (title, field, value) {
      var props = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var maker = new Creator(name, title, field, value, props);
      if (isFunction(type)) type(maker);else maker.props(typeName, type);
      return maker;
    };
  }

  var Creator =
  /*#__PURE__*/
  function (_VData) {
    _inherits(Creator, _VData);

    function Creator(type, title, field, value) {
      var _this;

      var props = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

      _classCallCheck(this, Creator);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Creator).call(this));
      _this.rule = extend(baseRule(), {
        type: type,
        title: title,
        field: field,
        value: value
      });

      _this.props({
        hidden: false,
        visibility: false
      });

      if (isPlainObject(props)) _this.props(props);
      return _this;
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
        return extend(this.rule, this.get());
      }
    }, {
      key: "setValue",
      value: function setValue(value) {
        $set(this.rule, 'value', value);
        return this;
      }
    }]);

    return Creator;
  }(VData);
  var keyAttrs = ['emitPrefix', 'className', 'defaultSlot'];
  keyAttrs.forEach(function (attr) {
    Creator.prototype[attr] = function (value) {
      $set(this.rule, attr, value);
      return this;
    };
  });
  var objAttrs = ['event', 'col'];
  objAttrs.forEach(function (attr) {
    Creator.prototype[attr] = function (opt) {
      $set(this.rule, attr, extend(this.rule[attr], opt));
      return this;
    };
  });
  var arrAttrs = ['validate', 'options', 'children', 'emit'];
  arrAttrs.forEach(function (attr) {
    Creator.prototype[attr] = function (opt) {
      if (!Array.isArray(opt)) opt = [opt];
      $set(this.rule, attr, this.rule[attr].concat(opt));
      return this;
    };
  });

  function makerFactory(componentList) {
    var _m = {};
    Object.keys(componentList).forEach(function (key) {
      var component = componentList[key];
      var undef = isUndef(component.maker);
      if (undef || component.maker[component.name] === undefined) _m[component.name] = creatorFactory(component.name);
      if (!undef) extend(_m, component.maker);
    });
    var commonMaker = creatorFactory('');
    extend(_m, {
      create: function create(type, field, title) {
        var make = commonMaker('', field);
        make.rule.type = type;
        make.rule.title = title;
        return make;
      },
      createTmp: function createTmp(template, vm, field, title) {
        var make = commonMaker('', field);
        make.rule.type = 'template';
        make.rule.template = template;
        make.rule.title = title;
        make.rule.vm = vm;
        return make;
      }
    });
    _m.template = _m.createTmp;
    _m.parse = parse;
    return _m;
  }

  function parse(rule) {
    var toMaker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (isString(rule)) rule = JSON.parse(rule);
    if (rule instanceof Creator) return toMaker ? rule : rule.getRule();

    if (isPlainObject(rule)) {
      var maker = ruleToMaker(rule);
      return toMaker ? maker : maker.getRule();
    } else if (!Array.isArray(rule)) return rule;else {
      var rules = rule.map(function (r) {
        return parse(r, toMaker);
      });
      Object.defineProperty(rules, 'find', {
        value: findField,
        enumerable: false,
        configurable: false
      });
      return rules;
    }
  }

  function findField(field) {
    var children = [];

    for (var i in this) {
      var rule = this[i] instanceof Creator ? this[i].rule : this[i];
      if (rule.field === field) return this[i];
      if (isValidChildren(rule.children)) children = children.concat(rule.children);
    }

    if (children.length > 0) return findField.call(children, field);
  }

  function ruleToMaker(rule) {
    var maker = new Creator();
    Object.keys(rule).forEach(function (key) {
      if (Object.keys(maker._data).indexOf(key) === -1) {
        maker.rule[key] = rule[key];
      } else {
        maker._data[key] = rule[key];
      }
    });
    return maker;
  }

  function parseVData(data) {
    if (isString(data)) data = {
      domProps: {
        innerHTML: data
      }
    };else if (data && isFunction(data.get)) data = data.get();
    return data;
  }

  function getVNode(VNode) {
    return isFunction(VNode) ? VNode() : VNode || [];
  }

  var VNode =
  /*#__PURE__*/
  function () {
    function VNode(vm) {
      _classCallCheck(this, VNode);

      if (vm) this.setVm(vm);
    }

    _createClass(VNode, [{
      key: "setVm",
      value: function setVm(vm) {
        this.vm = vm;
        this.$h = vm.$createElement;
      }
    }, {
      key: "make",
      value: function make(nodeName, data, VNodeFn) {
        var Node = this.$h(nodeName, parseVData(data), getVNode(VNodeFn));
        Node.context = this.vm;
        return Node;
      }
    }], [{
      key: "use",
      value: function use(nodes) {
        Object.keys(nodes).forEach(function (k) {
          VNode.prototype[k] = function (data, VNodeFn) {
            return this.make(nodes[k], data, VNodeFn);
          };
        });
      }
    }]);

    return VNode;
  }();

  var BaseParser =
  /*#__PURE__*/
  function () {
    function BaseParser(handle, rule, id) {
      _classCallCheck(this, BaseParser);

      this.rule = rule;
      this.vData = new VData();
      this.vNode = new VNode({});
      this.id = id;
      this.watch = [];
      this.type = toString(rule.type);
      this.isDef = true;
      this.el = undefined;

      if (!rule.field) {
        this.field = '_def_' + uniqueId();
        this.isDef = false;
      } else {
        this.field = rule.field;
      }

      this.unique = 'fc_' + id;
      this.key = 'key_' + id;
      this.refName = '__' + this.field + this.id;
      this.formItemRefName = 'fi' + this.refName;
      this.update(handle);
      this.init();
    }

    _createClass(BaseParser, [{
      key: "update",
      value: function update(handle) {
        this.h = handle;
        this.r = handle.render;
        this.vm = handle.vm;
        this.options = handle.options;
        this.vNode.setVm(this.vm);
      }
    }, {
      key: "init",
      value: function init() {}
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        return value;
      }
    }, {
      key: "toValue",
      value: function toValue(formValue) {
        return formValue;
      }
    }]);

    return BaseParser;
  }();

  var $de = debounce(function (fn) {
    return fn();
  }, 1);

  var Render =
  /*#__PURE__*/
  function () {
    function Render(handle, FormRender) {
      _classCallCheck(this, Render);

      this.h = handle;
      this.fc = handle.fc;
      this.vm = handle.vm;
      this.options = handle.options;
      this.form = new FormRender(this, uniqueId());
      this.vNode = new VNode(this.vm);
      this.vData = new VData();
    }

    _createClass(Render, [{
      key: "initOrgChildren",
      value: function initOrgChildren() {
        var parsers = this.h.parsers;
        this.orgChildren = Object.keys(parsers).reduce(function (initial, field) {
          var children = parsers[field].children;
          initial[field] = isValidChildren(children) ? children : [];
          return initial;
        }, {});
      }
    }, {
      key: "getParser",
      value: function getParser(field) {
        return this.h.parsers[field];
      }
    }, {
      key: "run",
      value: function run() {
        var _this = this;

        if (!this.vm.isShow) return;
        this.form.beforeRender();
        var vn = this.h.fieldList.map(function (field) {
          var parser = _this.getParser(field);

          if (parser.type === 'hidden') return;
          return _this.renderParser(parser, false);
        }).filter(function (val) {
          return val !== undefined;
        });
        return this.form.render(vn);
      }
    }, {
      key: "renderParser",
      value: function renderParser(parser, isChild) {
        var type = parser.type,
            rule = parser.rule,
            refName = parser.refName,
            key = parser.key,
            form = this.form,
            vn;

        if (type === 'template' && rule.template) {
          if (_vue.compile === undefined) {
            console.error('使用的 Vue 版本不支持 compile' + errMsg());
            return [];
          }

          if (isUndef(rule.vm)) rule.vm = new _vue();
          vn = _vue.compile(rule.template, {}).render.call(rule.vm);
          if (vn.data === undefined) vn.data = {};
          vn.key = key;
          if (isChild) return vn;
        } else if (!this.h.isNoVal(parser)) {
          var children = this.renderChildren(parser);
          vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
        } else {
          rule.ref = refName;
          if (isUndef(rule.key)) rule.key = parser.key;
          vn = this.vNode.make(type, Object.assign({}, rule), this.renderChildren(parser));
          vn.key = key;
          if (isChild) return vn;
        }

        return form.container(vn, parser);
      }
    }, {
      key: "inputVData",
      value: function inputVData(parser) {
        var _this2 = this;

        var refName = parser.refName,
            key = parser.key,
            field = parser.field,
            rule = parser.rule;
        Object.keys(parser.vData._data).forEach(function (key) {
          if (rule[key] !== undefined) parser.vData._data[key] = rule[key]; // parser.vData[key](rule[key]);
        });
        window.$vm = this.vm;
        var data = parser.vData.props({
          value: this.vm._formData(field)
        }).ref(refName).key('input' + key).on('input', function (value) {
          _this2.onInput(parser, value);
        });
        if (isUndef(rule.props.size)) data.props({
          size: this.h.options.form.size
        });
        return data;
      }
    }, {
      key: "onInput",
      value: function onInput(parser, value) {
        this.h.onInput(parser, value);
      }
    }, {
      key: "renderChildren",
      value: function renderChildren(parser) {
        var _this3 = this;

        var children = parser.rule.children,
            orgChildren = this.orgChildren[parser.field];

        if (!isValidChildren(children)) {
          orgChildren.forEach(function (_rule) {
            _this3.removeField(_rule.__field__);
          });
          this.orgChildren[parser.field] = [];
          return [];
        }

        this.orgChildren[parser.field].forEach(function (child) {
          if (children.indexOf(child) === -1) {
            _this3.removeField(child.__field__);
          }
        });
        return children.map(function (child) {
          if (isString(child)) return child;

          if (child.__fc__) {
            return _this3.renderParser(child.__fc__, true);
          }

          $de(function () {
            return _this3.h.fc.reload();
          });
        });
      }
    }, {
      key: "defaultRender",
      value: function defaultRender(parser, children) {
        var props = this.inputVData(parser);
        return this.vNode[parser.type](props, children);
      }
    }]);

    return Render;
  }();

  function getRule(rule) {
    if (isFunction(rule.getRule)) return rule.getRule();else return rule;
  }
  /**
   * TODO 将 fComponentApi 移动到 FormCreate 里
   * TODO 将 options 一些事件触发移动到 FormCreate 里
   * TODO Form,Parser 里面可以获取到 options 和 handle
   * TODO 通过 emit 方式触发全局配置中的回调
   * TODO ERROR 图片上传进度条无效
   * TODO type 区分大小写问题
   * TODO parser在多个 form-create 中使用的问题
   * TODO 子组件数据发生变化不会印象父组件,父组件不会重新渲染,只渲染子组件
   *
   * FormCreate 负责生成表单,处理 drive 相关
   * Handle 负责处理生成规则,同步 Vm 操作
   * Render 负责处理表单渲染
   * Form 负责生成表单壳子
   */

  var Handle =
  /*#__PURE__*/
  function () {
    function Handle(fc) {
      _classCallCheck(this, Handle);

      var vm = fc.vm,
          rules = fc.rules,
          options = fc.options,
          drive = fc.drive;
      this.vm = vm;
      this.fc = fc;
      this.id = uniqueId();
      this.formRefName = 'fc_' + this.id;
      this.options = options;
      this.drive = drive;
      this.validate = {};
      this.fCreateApi = undefined;
      this.$tick = debounce(function (fn) {
        return fn();
      }, 150);

      this.__init(rules);

      this.render = new Render(this, drive.formRender);
      this.loadRule(this.rules, false);
      this.render.initOrgChildren();
    }

    _createClass(Handle, [{
      key: "__init",
      value: function __init(rules) {
        this.parsers = {};
        this.formData = {};
        this.trueData = {};
        this.customData = {};
        this.fieldList = [];
        this.rules = rules;
        this.origin = _toConsumableArray(this.rules);
      }
    }, {
      key: "loadRule",
      value: function loadRule(rules, child) {
        var _this = this;

        rules.map(function (_rule) {
          if (child && isString(_rule)) return;
          if (!_rule.type) return console.error('未定义生成规则的 type 字段' + errMsg());
          var rule = getRule(_rule),
              parser;

          if (_rule.__fc__) {
            parser = _rule.__fc__;
            parser.update(_this);
          } else {
            parser = _this.createParser(_this.parseRule(rule));
          }

          var children = parser.rule.children;
          if (!_this.notField(parser.field)) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());

          _this.setParser(parser);

          if (!_rule.__fc__) {
            bindParser(_rule, parser);
          }

          if (isValidChildren(children)) {
            _this.loadRule(children, true);
          }

          if (!child) {
            _this.fieldList.push(parser.field);
          }

          return parser;
        }).filter(function (h) {
          return h;
        }).forEach(function (h) {
          h.root = rules;
        });
      }
    }, {
      key: "createParser",
      value: function createParser(rule) {
        var id = this.id + '' + uniqueId();
        var Parser = this.hasParser(rule.type) ? this.getParser(rule.type) : BaseParser;
        return new Parser(this, rule, id);
      }
    }, {
      key: "parseRule",
      value: function parseRule(_rule) {
        var def = defRule(),
            rule = getRule(_rule);
        Object.keys(def).forEach(function (k) {
          if (isUndef(rule[k])) $set(rule, k, def[k]);
        });
        var parseRule = {
          col: parseCol(rule.col),
          props: parseProps(rule.props),
          validate: parseArray(rule.validate),
          options: parseArray(rule.options)
        };
        parseRule.on = parseOn(rule.on, this.parseEmit(rule));
        Object.keys(parseRule).forEach(function (k) {
          $set(rule, k, parseRule[k]);
        });

        if (!rule.field && this.hasParser(rule.type)) {
          console.error('规则的 field 字段不能空' + errMsg());
        }

        if (isUndef(rule.props.elementId)) $set(rule.props, 'elementId', this.unique);
        return rule;
      }
    }, {
      key: "parseEmit",
      value: function parseEmit(rule) {
        var _this2 = this;

        var event = {},
            emit = rule.emit,
            emitPrefix = rule.emitPrefix,
            field = rule.field;
        if (!Array.isArray(emit)) return event;
        emit.forEach(function (eventName) {
          var emitKey = emitPrefix ? emitPrefix : field;
          var fieldKey = toLine("".concat(emitKey, "-").concat(eventName)).replace('_', '-');

          event[eventName] = function () {
            var _this2$vm;

            for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
              arg[_key] = arguments[_key];
            }

            (_this2$vm = _this2.vm).$emit.apply(_this2$vm, [fieldKey].concat(arg));
          };
        });
        return event;
      }
    }, {
      key: "run",
      value: function run() {
        console.trace('------------render------------');
        if (this.vm.unique > 0) return this.render.run();else {
          this.vm.unique = 1;
          return [];
        }
      }
    }, {
      key: "setParser",
      value: function setParser(parser) {
        var field = parser.field,
            isDef = parser.isDef,
            rule = parser.rule;
        this.parsers[field] = parser;

        if (this.isNoVal(parser)) {
          if (isDef === true) $set(this.customData, field, rule);
          return;
        }

        $set(this.formData, field, parser.toFormValue(rule.value));
        $set(this.validate, field, rule.validate);
        $set(this.trueData, field, rule);
      }
    }, {
      key: "notField",
      value: function notField(field) {
        return this.parsers[field] === undefined;
      }
    }, {
      key: "onInput",
      value: function onInput(parser, value) {
        value = isUndef(value) ? '' : value;
        var field = parser.field,
            vm = this.vm,
            trueValue = parser.toValue(value);

        vm._changeFormData(field, value);

        if (!vm._change(field, JSON.stringify(trueValue))) return;
        this.setValue(parser, trueValue);
        parser.watchFormValue && parser.watchFormValue(value, this);
      }
    }, {
      key: "created",
      value: function created() {
        var vm = this.vm;
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        vm.$set(vm, 'components', this.customData);
        if (this.fCreateApi === undefined) this.fCreateApi = this.fc.drive.getGlobalApi(this);
        this.fCreateApi.rule = this.rules;
        this.fCreateApi.config = this.options;
      }
    }, {
      key: "addParserWitch",
      value: function addParserWitch(parser) {
        var _this3 = this;

        if (this.isNoVal(parser)) return;
        var field = parser.field,
            vm = this.vm;
        var unWatch = vm.$watch(function () {
          return vm.cptData[field];
        }, function (n) {
          if (_this3.parsers[field] === undefined) return delParser(parser);
          var trueValue = parser.toValue(n),
              json = JSON.stringify(trueValue);

          if (vm._change(field, json)) {
            console.log(field, 'cptData');

            _this3.setValue(parser, trueValue);

            parser.watchFormValue && parser.watchFormValue(n, _this3);
          }
        }, {
          deep: true
        });
        var unWatch2 = vm.$watch(function () {
          return vm.trueData[field].value;
        }, function (n) {
          if (n === undefined) return;
          if (_this3.parsers[field] === undefined) return delParser(parser);
          var json = JSON.stringify(n);

          if (vm._change(field, json)) {
            console.log(field, 'trueData');
            $set(parser.rule, 'value', n);

            _this3.vm._changeFormData(field, parser.toFormValue(n));

            parser.watchValue && parser.watchValue(n, _this3);
            $nt(function () {
              return _this3.vm._refresh();
            });
          }
        }, {
          deep: true
        });
        parser.watch.push(unWatch, unWatch2); // const bind = () => {
        //     if (this.parsers[field] === undefined)
        //         delParser(parser);
        //     else
        //         this.$tick(() => this.refresh());
        // };
        //
        // Object.keys(vm._trueData(field)).forEach((key) => {
        //     if (key === 'value') return;
        //     parser.watch.push(vm.$watch(() => vm.trueData[field][key], bind, {deep: true, lazy: true}));
        // });
      }
    }, {
      key: "mountedParser",
      value: function mountedParser() {
        var _this4 = this;

        var vm = this.vm;
        Object.keys(this.parsers).forEach(function (field) {
          var parser = _this4.parsers[field];
          if (parser.watch.length === 0) _this4.addParserWitch(parser);
          parser.el = vm.$refs[parser.refName] || {};
          if (parser.defaultValue === undefined) parser.defaultValue = deepExtend({}, {
            value: parser.rule.value
          }).value;
          parser.mounted && parser.mounted(vm);
        });
      }
    }, {
      key: "defJsonData",
      value: function defJsonData() {
        var _this5 = this;

        var vm = this.vm;
        Object.keys(vm.cptData).forEach(function (field) {
          var value = _this5.parsers[field].toValue(vm.cptData[field]);

          vm.jsonData[field] = JSON.stringify(value);

          vm._changeValue(field, value);
        });
      }
    }, {
      key: "mounted",
      value: function mounted() {
        var mounted = this.options.mounted;
        this.mountedParser();
        this.defJsonData();
        mounted && mounted(this.fCreateApi);
        this.fc.$emit('mounted', this.fCreateApi);
      }
    }, {
      key: "reload",
      value: function reload() {
        var onReload = this.options.onReload;
        this.mountedParser();
        this.defJsonData();
        onReload && onReload(this.fCreateApi);
        this.fc.$emit('reload', this.fCreateApi);
      }
    }, {
      key: "removeField",
      value: function removeField(field) {
        if (this.parsers[field] === undefined) return;
        var index = this.fieldList.indexOf(field);
        delParser(this.parsers[field]);
        $del(this.parsers, field);
        $del(this.validate, field);

        if (index !== -1) {
          this.fieldList.splice(index, 1);
        }

        this.vm._removeField(field);
      }
    }, {
      key: "getFormRef",
      value: function getFormRef() {
        return this.vm.$refs[this.formRefName];
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this.vm._refresh();
      }
    }, {
      key: "reloadRule",
      value: function reloadRule(rules) {
        var _this6 = this;

        var vm = this.vm;
        if (!rules) return this.reloadRule(this.rules);
        if (!this.origin.length) this.fCreateApi.refresh();
        this.origin = _toConsumableArray(rules);
        Object.keys(this.parsers).forEach(function (field) {
          return _this6.removeField(field);
        });

        this.__init(rules);

        this.loadRule(rules, false);
        this.render.initOrgChildren();
        this.created();
        $nt(function () {
          _this6.reload();
        });
        vm.$f = this.fCreateApi;
      }
    }, {
      key: "setFormData",
      value: function setFormData(field, value) {
        this.formData[field] = value;
      }
    }, {
      key: "setValue",
      value: function setValue(parser, value) {
        $set(parser.rule, 'value', value);

        this.vm._changeValue(parser.field, value);
      }
    }, {
      key: "getValue",
      value: function getValue(field) {
        return this.vm._value(field);
      }
    }, {
      key: "clearMsg",
      value: function clearMsg(parser) {
        var fItem = this.vm.$refs[parser.formItemRefName];

        if (fItem) {
          fItem.validateMessage = '';
          fItem.validateState = '';
          fItem.validateDisabled = true;
        }
      }
    }, {
      key: "reset",
      value: function reset(parser) {
        this.vm._changeValue(parser.field, parser.defaultValue);

        this.clearMsg(parser);
      }
    }, {
      key: "$emit",
      value: function $emit(parser, eventName) {
        var _this$vm, _parser$el;

        eventName = "fc:".concat(eventName);

        for (var _len2 = arguments.length, params = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          params[_key2 - 2] = arguments[_key2];
        }

        if (parser.type === 'template' && parser.rule.template) (_this$vm = this.vm).$emit.apply(_this$vm, [eventName].concat(params));else if (this.isNoVal(parser) && parser.el.$emit) (_parser$el = parser.el).$emit.apply(_parser$el, [eventName].concat(params));
      }
    }, {
      key: "isNoVal",
      value: function isNoVal(parser) {
        return !this.hasParser(parser.type);
      }
    }, {
      key: "hasParser",
      value: function hasParser(type) {
        return !!this.drive.componentList[type];
      }
    }, {
      key: "getParser",
      value: function getParser(type) {
        return this.drive.componentList[type].parser;
      }
    }]);

    return Handle;
  }();
  function delParser(parser) {
    parser.watch.forEach(function (unWatch) {
      return unWatch();
    });
    parser.watch = [];
    parser.deleted = true;
  }

  function parseOn(on, emitEvent) {
    if (Object.keys(emitEvent).length > 0) extend(on, emitEvent);
    return on;
  }

  function parseArray(validate) {
    return Array.isArray(validate) ? validate : [];
  }

  function parseProps(props) {
    if (isUndef(props.hidden)) $set(props, 'hidden', false);
    if (isUndef(props.visibility)) $set(props, 'visibility', false);
    return props;
  }

  function parseCol(col) {
    if (isNumeric(col)) {
      return {
        span: col
      };
    } else if (col.span === undefined) $set(col, 'span', 24);

    return col;
  }

  function defRule() {
    return {
      validate: [],
      col: {},
      emit: [],
      props: {},
      on: {},
      options: [],
      title: '',
      value: '',
      field: '',
      className: ''
    };
  }

  function bindParser(rule, parser) {
    Object.defineProperties(rule, {
      __field__: {
        value: parser.field,
        enumerable: false,
        configurable: false
      },
      __fc__: {
        value: parser,
        enumerable: false,
        configurable: false
      }
    });
  }

  var _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue$1;
  function createFormCreate(drive) {
    var components = {},
        mixin = getMixins(components),
        maker = makerFactory(drive.componentList);
    VNode.use(drive.nodes);

    function setComponent(id, component) {
      if (component) {
        return _vue.component(toString(id), component);
      } else if (id) return components[toString(id)];else return Object.assign({}, components);
    }

    function initStyle() {
      if (document.getElementById(formCreateStyleElId) !== null) return;
      var style = document.createElement('style');
      style.id = formCreateStyleElId;
      style.innerText = drive.style;
      document.getElementsByTagName('head')[0].appendChild(style);
    }

    function margeGlobal(_options) {
      if (isBool(_options.sumbitBtn)) $set(_options, 'sumbitBtn', {
        show: _options.sumbitBtn
      });
      if (isBool(_options.resetBtn)) $set(_options, 'resetBtn', {
        show: _options.resetBtn
      });
      var options = deepExtend(extend(drive.getConfig(), getBaseConfig()), _options);
      $set(options, 'el', !options.el ? window.document.body : isElement(options.el) ? options.el : document.querySelector(options.el));
      return options;
    }

    var FormCreate =
    /*#__PURE__*/
    function () {
      function FormCreate(rules) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, FormCreate);

        this.fCreateApi = undefined;
        this.$parent = undefined;
        this.drive = drive;
        this.vm = undefined;
        this.rules = Array.isArray(rules) ? rules : [];
        initStyle();
        this.options = margeGlobal(options);
      }

      _createClass(FormCreate, [{
        key: "beforeCreate",
        value: function beforeCreate(vm) {
          this.vm = vm;
          this.handle = new Handle(this);
        }
      }, {
        key: "mount",
        value: function mount(Vue) {
          var $fCreate = Vue.extend(coreComponent(this)),
              $vm = new $fCreate().$mount();
          this.options.el.appendChild($vm.$el);
          return $vm;
        }
      }, {
        key: "$emit",
        value: function $emit(eventName) {
          for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
          }

          if (this.$parent) {
            var _this$$parent;

            (_this$$parent = this.$parent).$emit.apply(_this$$parent, ["fc:".concat(eventName)].concat(params));
          } else {
            var _this$vm;

            (_this$vm = this.vm).$emit.apply(_this$vm, [eventName].concat(params));
          }
        }
      }], [{
        key: "create",
        value: function create(rules) {
          var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var $parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
          var opt = isElement(_opt) ? {
            el: _opt
          } : _opt,
              fComponent = new FormCreate(rules, opt),
              $vm = fComponent.mount(_vue);
          fComponent.$parent = $parent;
          return fComponent.fCreateApi;
        }
      }, {
        key: "install",
        value: function install(Vue) {
          var $formCreate = function $formCreate(rules) {
            var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            return FormCreate.create(rules, opt, this);
          };

          $formCreate.maker = maker;
          $formCreate.version = drive.version;
          $formCreate.ui = drive.ui;
          $formCreate.component = setComponent;
          Vue.prototype.$formCreate = $formCreate;
          Vue.component(formCreateName, Vue.extend($FormCreate(FormCreate, mixin)));
          _vue = Vue;
        }
      }, {
        key: "init",
        value: function init(rules) {
          var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

          var opt = isElement(_opt) ? {
            el: _opt
          } : _opt;
          var fComponent = new FormCreate(rules, opt);

          var $fCreate = _vue.extend(coreComponent(fComponent, mixin));

          var $vm = new $fCreate().$mount();
          return {
            mount: function mount($el) {
              if ($el && isElement($el)) $set(fComponent.options, 'el', $el);
              fComponent.options.el.appendChild($vm.$el);
              return fComponent.fCreateApi;
            },
            remove: function remove() {
              fComponent.options.el.removeChild($vm.$el);
            },
            $f: fComponent.fCreateApi
          };
        }
      }]);

      return FormCreate;
    }();

    FormCreate.version = drive.version;
    FormCreate.ui = drive.ui;
    FormCreate.component = setComponent;
    FormCreate.maker = maker;

    function install(Vue) {
      if (Vue._installedFormCreate === true) return;
      Vue._installedFormCreate = true;
      Vue.use(FormCreate);
    }

    components['form-create'] = _vue.extend($FormCreate(FormCreate, mixin));
    return {
      FormCreate: FormCreate,
      install: install
    };
  }

  var name = 'hidden';

  var parser =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(parser, _BaseParser);

    function parser() {
      _classCallCheck(this, parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(parser).apply(this, arguments));
    }

    _createClass(parser, [{
      key: "render",
      value: function render() {
        return [];
      }
    }]);

    return parser;
  }(BaseParser);

  var maker = _defineProperty({}, name, function (field, value) {
    return creatorFactory(name)('', field, value);
  });

  var hidden = {
    parser: parser,
    name: name,
    maker: maker
  };

  var Parser =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var props = this.rule.props;
        if (props.autosize && props.autosize.minRows) $set(props, 'rows', props.autosize.minRows || 2);
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(v) {
        return toString(v);
      }
    }]);

    return Parser;
  }(BaseParser);

  var name$1 = 'input';
  var maker$1 = ['password', 'url', 'email', 'text', 'textarea'].reduce(function (initial, type) {
    initial[type] = creatorTypeFactory(name$1, type);
    return initial;
  }, {});
  maker$1.idate = creatorTypeFactory(name$1, 'date');
  var input = {
    parser: Parser,
    name: name$1,
    maker: maker$1
  };

  var Parser$1 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
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
        var _this = this;

        var unique = this.unique,
            options = this.rule.options;
        return this.vNode.radioGroup(this.r.inputVData(this), function () {
          return options.map(function (option, index) {
            var clone = Object.assign({}, option);
            delete clone.value;
            return _this.vNode.radio({
              props: clone,
              key: "ropt".concat(index).concat(unique)
            });
          }).concat(children);
        });
      }
    }]);

    return Parser;
  }(BaseParser);

  var name$2 = 'radio';
  var radio = {
    parser: Parser$1,
    name: name$2
  };

  var parser$1 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(parser, _BaseParser);

    function parser() {
      _classCallCheck(this, parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(parser).apply(this, arguments));
    }

    _createClass(parser, [{
      key: "init",
      value: function init() {
        var props = this.rule.props;
        if (isUndef(props.disabled)) $set(props, 'disabled', false);
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        if (!value) value = [];else if (!Array.isArray(value)) value = [value];
        return this.rule.options.filter(function (opt) {
          return value.indexOf(opt.value) !== -1;
        }).map(function (option) {
          return option.label;
        });
      }
    }, {
      key: "toValue",
      value: function toValue(parseValue) {
        var value = this.rule.options.filter(function (opt) {
          return parseValue.indexOf(opt.label) !== -1;
        }).map(function (opt) {
          return opt.value;
        });
        if (this.rule.options.length === 1) return value[0] === undefined ? '' : value[0];else return value;
      }
    }, {
      key: "render",
      value: function render(children) {
        var _this = this;

        var unique = this.unique,
            rule = this.rule;
        return this.vNode.checkboxGroup(this.r.inputVData(this), function () {
          return rule.options.map(function (option, index) {
            var clone = Object.assign({}, option);
            delete clone.value;
            return _this.vNode.checkbox({
              props: clone,
              key: "cbp_".concat(index).concat(unique)
            });
          }).concat(children);
        });
      }
    }, {
      key: "watchFormValue",
      value: function watchFormValue(n, h) {
        h.refresh();
      }
    }]);

    return parser;
  }(BaseParser);

  var name$3 = 'checkbox';
  var checkbox = {
    parser: parser$1,
    name: name$3
  };

  var parser$2 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(parser, _BaseParser);

    function parser() {
      _classCallCheck(this, parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(parser).apply(this, arguments));
    }

    _createClass(parser, [{
      key: "render",
      value: function render(children) {
        var rule = this.rule,
            slot = rule.props.slot || {}; //TODO 优化 slot

        return this.vNode["switch"](this.r.inputVData(this).scopedSlots({
          open: function open() {
            return slot.open;
          },
          close: function close() {
            return slot.close;
          }
        }).style({
          'margin': '4.5px 0px'
        }).get(), children);
      }
    }]);

    return parser;
  }(BaseParser);

  var name$4 = 'switch';
  var maker$2 = {
    sliderRange: creatorTypeFactory(name$4, true, 'range')
  };
  var iswitch = {
    parser: parser$2,
    name: name$4,
    maker: maker$2
  };

  var Parser$2 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "toFormValue",
      value: function toFormValue(value) {
        var isArr = Array.isArray(value);
        if (this.rule.props.multiple === true) return isArr === true ? value : [value];else return isArr === true ? value[0] || '' : value;
      }
    }, {
      key: "render",
      value: function render(children) {
        var _this = this;

        var unique = this.unique,
            rule = this.rule;
        return this.vNode.select(this.r.inputVData(this), function () {
          return rule.options.map(function (option, index) {
            return _this.vNode.option({
              props: option,
              key: "sopt".concat(index).concat(unique)
            }, toDefSlot(option.slot, _this.vm.$createElement, rule));
          }).concat(children);
        });
      }
    }, {
      key: "watchFormValue",
      value: function watchFormValue(n, h) {
        h.refresh();
      }
    }]);

    return Parser;
  }(BaseParser);

  var name$5 = 'select';
  var maker$3 = {
    selectMultiple: creatorTypeFactory(name$5, true, 'multiple'),
    selectOne: creatorTypeFactory(name$5, false, 'multiple')
  };
  var select = {
    parser: Parser$2,
    name: name$5,
    maker: maker$3
  };

  var Parser$3 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var props = this.rule.props;
        $set(props, 'type', !props.type ? 'date' : toString(props.type).toLowerCase());
        if (isUndef(props.startDate)) $set(props, 'startDate', timeStampToDate(props.startDate));
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        var isArr = Array.isArray(value),
            props = this.rule.props,
            parseValue;

        if (['daterange', 'datetimerange'].indexOf(props.type) !== -1) {
          if (isArr) {
            parseValue = value.map(function (time) {
              return !time ? '' : timeStampToDate(time);
            });
          } else {
            parseValue = ['', ''];
          }
        } else if ('date' === props.type && props.multiple === true) {
          parseValue = toString(value);
        } else {
          parseValue = isArr ? value[0] || '' : value;
          parseValue = !parseValue ? '' : timeStampToDate(parseValue);
        }

        return parseValue;
      }
    }, {
      key: "toValue",
      value: function toValue() {
        return this.el.publicStringValue;
      }
    }, {
      key: "mounted",
      value: function mounted(vm) {
        this.rule.value = this.el.publicStringValue;

        vm._changeFormData(this.field, this.toFormValue(this.el.publicStringValue));
      }
    }]);

    return Parser;
  }(BaseParser);

  var name$6 = 'datePicker';
  var maker$4 = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce(function (initial, type) {
    initial[type] = creatorTypeFactory(name$6, type.toLowerCase());
    return initial;
  }, {});
  var datePicker = {
    parser: Parser$3,
    name: name$6,
    maker: maker$4
  };

  function getTime(date) {
    return isDate(date) ? dateFormat('hh:mm:ss', date) : date;
  }

  var Parser$4 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var props = this.rule.props;
        if (!props.type) $set(props, 'type', 'time');
        if (isUndef(props.confirm)) $set(props, 'confirm', true);
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        var parseValue,
            isArr = Array.isArray(value);

        if ('timerange' === this.rule.props.type) {
          if (isArr) {
            parseValue = value.map(function (time) {
              return !time ? '' : getTime(timeStampToDate(time));
            });
          } else {
            parseValue = ['', ''];
          }
        } else {
          isArr && (value = value[0]);
          parseValue = !value ? '' : getTime(timeStampToDate(value));
        }

        return parseValue;
      }
    }, {
      key: "mounted",
      value: function mounted(vm) {
        this.rule.value = this.el.publicStringValue;

        vm._changeFormData(this.field, this.toFormValue(this.el.publicStringValue));
      }
    }]);

    return Parser;
  }(BaseParser);

  var name$7 = 'timePicker';
  var maker$5 = {
    time: creatorTypeFactory(name$7, 'time'),
    timeRange: creatorTypeFactory(name$7, 'timerange')
  };
  var timePicker = {
    parser: Parser$4,
    name: name$7,
    maker: maker$5
  };

  var handler =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(handler, _BaseParser);

    function handler() {
      _classCallCheck(this, handler);

      return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
    }

    _createClass(handler, [{
      key: "toFormValue",
      value: function toFormValue(value) {
        var parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue;
      }
    }]);

    return handler;
  }(BaseParser);

  var name$8 = 'inputNumber';
  var maker$6 = {
    number: creatorFactory(name$8)
  };
  var inputNumber = {
    parser: handler,
    name: name$8,
    maker: maker$6
  };

  var name$9 = 'colorPicker';
  var maker$7 = {
    color: creatorFactory(name$9)
  };

  var parser$3 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(parser, _BaseParser);

    function parser() {
      _classCallCheck(this, parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(parser).apply(this, arguments));
    }

    _createClass(parser, [{
      key: "watchFormValue",
      value: function watchFormValue(n, h) {
        h.refresh();
      }
    }]);

    return parser;
  }(BaseParser);

  var colorPicker = {
    parser: parser$3,
    name: name$9,
    maker: maker$7
  };

  var vNode = new VNode({});

  var Modal = function Modal(options, cb) {
    return {
      name: 'fc-modal',
      data: function data() {
        return Object.assign({
          value: true
        }, options);
      },
      render: function render() {
        vNode.setVm(this);
        return vNode.modal({
          props: this.$data,
          on: {
            'on-visible-change': this.remove
          }
        }, [cb(vNode, this)]);
      },
      methods: {
        onClose: function onClose() {
          this.value = false;
        },
        remove: function remove() {
          this.$el.parentNode.removeChild(this.$el);
        }
      }
    };
  };

  function mount(options, content) {
    var $modal = _vue.extend(Modal(options, content)),
        $vm = new $modal().$mount();
    window.document.body.appendChild($vm.$el);
  }
  function defaultOnHandle(src, title) {
    mount({
      title: title,
      footerHide: true
    }, function (vNode) {
      return vNode.make('img', {
        style: {
          width: '100%'
        },
        attrs: {
          src: src
        }
      });
    });
  }

  var iview2 = {
    _v: 2,
    resetBtnType: 'ghost',
    resetBtnIcon: 'refresh',
    submitBtnIcon: 'ios-upload',
    fileIcon: 'document-text',
    fileUpIcon: 'folder',
    imgUpIcon: 'image'
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
  var iviewConfig = function () {
    if (typeof iview === 'undefined') return iview2;
    return iview.version && iview.version.split('.')[0] == 3 ? iview3 : iview2;
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
      submitBtn: {
        type: "primary",
        size: "large",
        shape: undefined,
        "long": true,
        htmlType: "button",
        disabled: false,
        icon: iviewConfig.submitBtnIcon,
        innerText: "提交",
        loading: false,
        show: true,
        col: undefined,
        click: undefined
      },
      resetBtn: {
        type: iviewConfig.resetBtnType,
        size: "large",
        shape: undefined,
        "long": true,
        htmlType: "button",
        disabled: false,
        icon: iviewConfig.resetBtnIcon,
        innerText: "重置",
        loading: false,
        show: false,
        col: undefined,
        click: undefined
      }
    };
  }

  function getFileName(pic) {
    return toString(pic).split('/').pop();
  }
  function parseValue(value) {
    return Array.isArray(value) ? value : !value ? [] : [value];
  } // TODO 商城时没有进度条

  var Parser$5 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var props = this.rule.props;
        $set(props, 'defaultFileList', []);
        if (isUndef(props.showUploadList)) $set(props, 'showUploadList', false);
        if (isUndef(props.uploadType)) $set(props, 'uploadType', 'file');
        if (props.maxLength === undefined) $set(props, 'maxLength', 0);
        if (props.action === undefined) $set(props, 'action', '');
        if (props.uploadType === 'file' && isUndef(props.handleIcon)) $set(props, 'handleIcon', false);
        if (!props.modalTitle) $set(props, 'modalTitle', '预览');
        if (props.maxLength === 1) $set(this.rule, 'value', parseValue(this.rule.value));
        this.parseValue = [];
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        var _this = this;

        var files = parseValue(value);

        var _value = files.map(function (file) {
          return _this.push(file);
        });

        $set(this.rule.props, 'defaultFileList', _value);
        return _value;
      }
    }, {
      key: "toValue",
      value: function toValue(parseValue) {
        if (isUndef(parseValue)) return [];
        var files = parseValue.map(function (file) {
          return file.url;
        }).filter(function (file) {
          return file !== undefined;
        });
        return this.rule.props.maxLength === 1 ? files[0] || '' : files;
      } // watchValue(n) {
      //     this.parseValue = n;
      //     this.el.fileList = n;
      //     this.h.refresh();
      // }

    }, {
      key: "push",
      value: function push(file) {
        return {
          url: file,
          name: getFileName(file)
        };
      }
    }, {
      key: "mounted",
      value: function mounted(vm) {
        this.vm = vm;
        $set(this.rule.props, 'defaultFileList', this.parseValue);
        this.changeParseValue();
      }
    }, {
      key: "changeParseValue",
      value: function changeParseValue() {
        this.parseValue = this.el.fileList;
        $set(this.rule, 'parseValue', this.el.fileList);

        this.vm._changeFormData(this.field, this.el.fileList);

        this.vm._changeValue(this.field, this.toValue(this.el.fileList));
      }
    }, {
      key: "initProps",
      value: function initProps() {
        var _this2 = this;

        var handler = this;
        this.uploadOptions = extend(Object.assign({}, this.options.upload), this.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        this.propsData = this.vData.props(this.uploadOptions).props('onSuccess', function () {
          return _this2.onSuccess.apply(_this2, arguments);
        }).props('onRemove', function () {
          return _this2.onRemove.apply(_this2, arguments);
        }).props('beforeUpload', function () {
          return _this2.beforeUpload.apply(_this2, arguments);
        }).ref(handler.refName).key("fip".concat(handler.unique)).get();
      }
    }, {
      key: "onRemove",
      value: function onRemove() {
        var _this$uploadOptions;

        // this.parseValue = this.el.fileList;
        // this.vm._changeFormData(this.field, [...this.el.fileList]);
        // this.h.setValue(this, this.toValue(this.el.fileList));
        // $set(this.rule, 'parseValue', this.parseValue);
        this.changeParseValue(); // this.changeParseValue(this.el.fileList);

        this.uploadOptions.onRemove && (_this$uploadOptions = this.uploadOptions).onRemove.apply(_this$uploadOptions, arguments);
      }
    }, {
      key: "beforeUpload",
      value: function beforeUpload() {
        var _this$uploadOptions2;

        // this.changeParseValue();
        this.parseValue = this.el.fileList;

        this.vm._changeFormData(this.field, _toConsumableArray(this.el.fileList));

        this.uploadOptions.beforeUpload && (_this$uploadOptions2 = this.uploadOptions).beforeUpload.apply(_this$uploadOptions2, arguments);
        this.h.refresh();
      }
    }, {
      key: "onSuccess",
      value: function onSuccess(response, file, fileList) {
        var url = this.uploadOptions.onSuccess.call(null, response, file, fileList);

        if (!isUndef(url)) {
          file.url = url;
          file.showProgress = false;
        } else {
          var index = fileList.indexOf(file);
          if (index !== -1) fileList.splice(index, 1);
        }

        this.changeParseValue();
      }
    }, {
      key: "onHandle",
      value: function onHandle(src) {
        var fn = this.uploadOptions.onHandle;
        if (fn) return fn(src);else defaultOnHandle(src, this.uploadOptions.modalTitle);
      }
    }, {
      key: "render",
      value: function render(children) {
        var _this3 = this;

        this.options = this.r.options;
        var unique = this.unique;
        this.initProps();
        if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'ios-eye-outline';
        var value = this.parseValue,
            //this.el ? this.el.fileList : this.vm._formData(field),
        vn = this.uploadOptions.showUploadList ? [] : value.map(function (file, index) {
          if (file.showProgress) {
            return _this3.makeProgress(file, "upp".concat(index).concat(unique).concat(file.uid));
          } else if (file.status === undefined || file.status === 'finished') {
            return _this3.makeUploadView(file, "upv".concat(index).concat(unique).concat(file.uid));
          }
        });
        var isShow = !this.uploadOptions.maxLength || this.uploadOptions.maxLength > value.length;
        vn.push(this.makeUploadBtn(isShow));
        vn.push.apply(vn, _toConsumableArray(children));
        return this.vNode.make('div', {
          key: "".concat(unique, "d4"),
          "class": {
            'fc-upload': true,
            'fc-hide-btn': !isShow
          }
        }, vn);
      }
    }, {
      key: "makeUploadView",
      value: function makeUploadView(file, key) {
        var _this4 = this;

        return this.vNode.make('div', {
          key: "".concat(key, "d1"),
          "class": {
            'fc-files': true
          }
        }, function () {
          var container = [];

          if (_this4.rule.props.uploadType === 'image') {
            container.push(_this4.vNode.make('img', {
              key: "".concat(key, "i"),
              attrs: {
                src: file.url
              }
            }));
          } else {
            container.push(_this4.vNode.icon({
              key: "".concat(key, "f"),
              props: {
                type: iviewConfig.fileIcon,
                size: 40
              }
            }));
          }

          if (_this4.issetIcon) container.push(_this4.makeIcons(file, key));
          return container;
        });
      }
    }, {
      key: "makeIcons",
      value: function makeIcons(file, key) {
        var _this5 = this;

        return this.vNode.make('div', {
          key: "".concat(key, "d2"),
          "class": {
            'fc-upload-cover': true
          }
        }, function () {
          var icon = [];
          if (_this5.uploadOptions.handleIcon) icon.push(_this5.makeHandleIcon(file, key));
          if (_this5.uploadOptions.allowRemove === true) icon.push(_this5.makeRemoveIcon(file, key));
          return icon;
        });
      }
    }, {
      key: "makeProgress",
      value: function makeProgress(file, unique) {
        return this.vNode.make('div', {
          key: "".concat(unique, "d3"),
          "class": {
            'fc-files': true
          }
        }, [this.vNode.progress({
          key: "upp".concat(unique),
          props: {
            percent: file.percentage,
            hideInfo: true
          },
          style: {
            width: '90%'
          }
        })]);
      }
    }, {
      key: "makeUploadBtn",
      value: function makeUploadBtn(isShow) {
        var unique = this.unique;
        return this.vNode.upload(this.propsData, isShow === true ? [this.vNode.make('div', {
          key: "".concat(unique, "d5"),
          "class": {
            'fc-upload-btn': true
          }
        }, [this.vNode.icon({
          key: "upi".concat(unique),
          props: {
            type: this.rule.props.uploadType === 'file' ? 'ios-cloud-upload-outline' : iviewConfig.imgUpIcon,
            size: 20
          }
        })])] : []);
      }
    }, {
      key: "makeRemoveIcon",
      value: function makeRemoveIcon(file, key) {
        var _this6 = this;

        return this.vNode.icon({
          key: "".concat(key, "r"),
          props: {
            type: 'ios-trash-outline'
          },
          nativeOn: {
            'click': function click() {
              if (_this6.isDisabled()) return;

              _this6.el.handleRemove(file);
            }
          }
        });
      }
    }, {
      key: "makeHandleIcon",
      value: function makeHandleIcon(file, key) {
        var _this7 = this;

        return this.vNode.icon({
          key: "".concat(key, "h"),
          props: {
            type: toString(this.uploadOptions.handleIcon)
          },
          nativeOn: {
            'click': function click() {
              if (_this7.isDisabled()) return;

              _this7.onHandle(file.url);
            }
          }
        });
      }
    }, {
      key: "isDisabled",
      value: function isDisabled() {
        return this.uploadOptions.disabled === true;
      }
    }]);

    return Parser;
  }(BaseParser);

  var script = {
    name: 'upload',
    props: {
      options: {
        type: Object,
        "default": function _default() {
          return {};
        }
      }
    },
    data: function data() {
      return {
        uploadList: []
      };
    },
    render: function render() {
      return React.createElement("div", _extends({
        "class": "red"
      }, context.data), context.props.data);
    },
    mounted: function mounted() {
      this.uploadList = this.$refs.upload.fileList;
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  /* script */
  var __vue_script__ = script;
  /* template */

  /* style */

  var __vue_inject_styles__ = undefined;
  /* scoped */

  var __vue_scope_id__ = "data-v-6cac9d4c";
  /* module identifier */

  var __vue_module_identifier__ = undefined;
  /* functional template */

  var __vue_is_functional_template__ = undefined;
  /* style inject */

  /* style inject SSR */

  var Uplaod = normalizeComponent_1({}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, undefined, undefined);

  console.log(Uplaod);
  var name$a = 'upload';
  var types = {
    image: ['image', 0],
    file: ['file', 0],
    uploadFileOne: ['file', 1],
    uploadImageOne: ['image', 1]
  };
  var maker$8 = Object.keys(types).reduce(function (initial, key) {
    initial[key] = creatorTypeFactory(name$a, function (m) {
      return m.props({
        uploadType: types[key][0],
        maxLength: types[key][1]
      });
    });
    return initial;
  }, {});
  maker$8.uploadImage = maker$8.image;
  maker$8.uploadFile = maker$8.file;
  var upload = {
    parser: Parser$5,
    name: name$a,
    maker: maker$8
  };

  var Parser$6 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var rule = this.rule;
        if (!rule.props.data) $set(rule.props, 'data', []);
        if (!rule.props.options) $set(rule.props, 'options', []);
        if (!Array.isArray(this.rule.value)) $set(rule, 'value', []);
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        return Array.isArray(value) ? value : [];
      }
    }, {
      key: "mounted",
      value: function mounted(vm) {
        vm._changeFormData(this.field, this.toFormValue(this.el.value));
      }
    }]);

    return Parser;
  }(BaseParser);

  var name$b = 'cascader';
  var cascader = {
    parser: Parser$6,
    name: name$b
  };

  var Parser$7 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "toFormValue",
      value: function toFormValue(value) {
        var parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue;
      }
    }, {
      key: "watchFormValue",
      value: function watchFormValue(n, h) {
        h.refresh();
      }
    }]);

    return Parser;
  }(BaseParser);

  var name$c = 'rate';
  var rate = {
    parser: Parser$7,
    name: name$c
  };

  var Parser$8 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var rule = this.rule;
        $set(rule.props, 'min', rule.props.min === undefined ? 0 : parseFloat(rule.props.min) || 0);
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        var rule = this.rule,
            isArr = Array.isArray(value),
            props = rule.props,
            min = props.min,
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
  }(BaseParser);

  var name$d = 'slider';
  var maker$9 = {
    sliderRange: creatorTypeFactory(name$d, true, 'range')
  };
  var slider = {
    parser: Parser$8,
    name: name$d,
    maker: maker$9
  };

  function parseRule(rule) {
    var props = rule.props;
    if (!props.type) $set(props, 'type', 'input');
    if (!props.icon) $set(props, 'icon', iviewConfig.fileUpIcon);
    if (!props.width) $set(props, 'width', '500px');
    if (!props.height) $set(props, 'height', '370px');
    if (isUndef(props.spin)) $set(props, 'spin', true);
    if (!props.title) $set(props, 'title', '请选择' + rule.title);
    if (!props.maxLength) $set(props, 'maxLength', 0);
    if (!props.okBtnText) $set(props, 'okBtnText', '确定');
    if (!props.closeBtnText) $set(props, 'closeBtnText', '关闭');
    if (!props.modalTitle) $set(props, 'modalTitle', '预览');
    if (!props.loadingText) $set(props, 'loadingText', '加载中...');
    var handleIcon = props.handleIcon;
    if (props.type === 'file' && props.handleIcon === undefined) handleIcon = false;else handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'ios-eye-outline' : props.handleIcon;
    $set(props, 'handleIcon', handleIcon);
    if (props.allowRemove === undefined) $set(props, 'allowRemove', true);
  }
  var eventList = {
    onOpen: 'on-open',
    onChange: 'on-change',
    onCancel: 'on-cancel',
    onOk: 'on-ok'
  }; //TODO children 属性

  var Parser$9 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        parseRule(this.rule);
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        var parseValue,
            oldValue = value,
            isArr = Array.isArray(oldValue);
        if (oldValue === '') parseValue = [];else if (!isArr) parseValue = [oldValue];else parseValue = oldValue;
        this.parseValue = parseValue;
        return parseValue;
      }
    }, {
      key: "toValue",
      value: function toValue(parseValue) {
        return this.rule.props.maxLength != 1 ? parseValue : parseValue[0] === undefined ? '' : parseValue[0];
      }
    }, {
      key: "watchValue",
      value: function watchValue(n) {
        this.onChange(n);
      }
    }, {
      key: "watchFormValue",
      value: function watchFormValue(n) {
        this.parseValue = n;
      }
    }, {
      key: "render",
      value: function render(children) {
        this._props = this.rule.props;
        this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
        var type = this._props.type,
            vNode;
        if (type === 'image') vNode = this.makeGroup(this.makeImage());else if (type === 'file') vNode = this.makeGroup(this.makeFile());else vNode = this.makeInput();
        return vNode;
      }
    }, {
      key: "makeInput",
      value: function makeInput(hidden) {
        var _this = this;

        var unique = this.unique,
            props = this.r.inputVData(this).props({
          type: 'text',
          value: this.parseValue.toString(),
          icon: this._props.icon,
          readonly: true,
          clearable: true
        }).on('on-click', function () {
          _this.showModel();
        }).on('input', function () {}).key('ifit' + unique)["class"]('__fc_h', hidden === true);
        return [this.vNode.input(props)];
      }
    }, {
      key: "makeGroup",
      value: function makeGroup(render) {
        var unique = this.unique,
            field = this.field;
        return [this.vNode.make('div', {
          key: "ifgp1".concat(unique),
          "class": {
            'fc-upload fc-frame': true
          },
          ref: this.refName,
          props: {
            value: this.vm._formData(field)
          }
        }, render), this.makeInput(true)];
      }
    }, {
      key: "makeImage",
      value: function makeImage() {
        var _this2 = this;

        var unique = this.unique;
        var vNode = this.parseValue.map(function (src, index) {
          return _this2.vNode.make('div', {
            key: "ifid1".concat(unique).concat(index),
            "class": {
              'fc-files': true
            }
          }, [_this2.vNode.make('img', {
            key: "ifim".concat(unique).concat(index),
            attrs: {
              src: src
            }
          }), _this2.makeIcons(src, unique, index)]);
        });
        vNode.push(this.makeBtn());
        return vNode;
      }
    }, {
      key: "makeFile",
      value: function makeFile() {
        var _this3 = this;

        var unique = this.unique;
        var vNode = this.parseValue.map(function (src, index) {
          return _this3.vNode.make('div', {
            key: "iffd2".concat(unique).concat(index),
            "class": {
              'fc-files': true
            }
          }, [_this3.vNode.icon({
            key: "iff".concat(unique).concat(index),
            props: {
              type: iviewConfig.fileIcon,
              size: 40
            }
          }), _this3.makeIcons(src, unique, index)]);
        });
        vNode.push(this.makeBtn());
        return vNode;
      }
    }, {
      key: "makeBtn",
      value: function makeBtn() {
        var _this4 = this;

        var props = this.rule.props;
        if (props.maxLength > 0 && this.parseValue.length >= props.maxLength) return;
        var unique = this.unique;
        return this.vNode.make('div', {
          key: "ifbd3".concat(unique),
          "class": {
            'fc-upload-btn': true
          },
          on: {
            click: function click() {
              if (props.disabled === true) return;

              _this4.showModel();
            }
          }
        }, [this.vNode.icon({
          key: "ifbi3".concat(unique),
          props: {
            type: this._props.icon,
            size: 20
          }
        })]);
      }
    }, {
      key: "makeSpin",
      value: function makeSpin(vNode) {
        if (true !== this._props.spin) return;
        var unique = this.unique;
        return vNode.make('Spin', {
          props: {
            fix: true
          },
          key: 'ifsp' + unique,
          ref: 'spin',
          "class": {
            'fc-spin': true
          }
        }, [vNode.icon({
          props: {
            type: 'load-c',
            size: 18
          },
          "class": {
            'fc-spin-icon-load': true
          },
          key: 'ifspi' + unique
        }), vNode.make('div', {
          domProps: {
            innerHTML: toString(this._props.loadingText)
          },
          key: 'ifspd' + unique
        })]);
      }
    }, {
      key: "makeIcons",
      value: function makeIcons(src, key, index) {
        var _this5 = this;

        if (this.issetIcon === true) return this.vNode.make('div', {
          key: "ifis".concat(key).concat(index),
          "class": {
            'fc-upload-cover': true
          }
        }, function () {
          var icon = [];
          if (_this5._props.handleIcon !== false) icon.push(_this5.makeHandleIcon(src, key, index));
          if (_this5._props.allowRemove === true) icon.push(_this5.makeRemoveIcon(src, key, index));
          return icon;
        });
      }
    }, {
      key: "makeRemoveIcon",
      value: function makeRemoveIcon(src, key, index) {
        var _this6 = this;

        return this.vNode.icon({
          key: "ifri".concat(key).concat(index),
          props: {
            type: 'ios-trash-outline'
          },
          nativeOn: {
            'click': function click() {
              if (_this6._props.disabled === true) return;

              if (_this6.onRemove(src) !== false) {
                _this6.parseValue.splice(index, 1);

                _this6.sync();
              }
            }
          }
        });
      }
    }, {
      key: "makeHandleIcon",
      value: function makeHandleIcon(src, key, index) {
        var _this7 = this;

        var props = this._props;
        return this.vNode.icon({
          key: "ifhi".concat(key).concat(index),
          props: {
            type: toString(props.handleIcon)
          },
          nativeOn: {
            'click': function click() {
              if (props.disabled === true) return;

              _this7.onHandle(src);
            }
          }
        });
      }
    }, {
      key: "onRemove",
      value: function onRemove(src) {
        if (this._props.disabled === true) return;
        var fn = this.rule.event['on-remove'];
        if (fn) return fn(src, this.getValue());
      }
    }, {
      key: "onHandle",
      value: function onHandle(src) {
        if (this._props.disabled === true) return;
        var fn = this.rule.event['on-handle'];
        if (fn) return fn(src);else defaultOnHandle(src, this._props.modalTitle);
      }
    }, {
      key: "valid",
      value: function valid(field) {
        if (field !== this.field) throw new Error('无效的表单字段' + errMsg());
      }
    }, {
      key: "onCloseModal",
      value: function onCloseModal() {
        this.$modal.onClose();
        this.$modal = null;
      }
    }, {
      key: "showModel",
      value: function showModel() {
        var _this8 = this;

        var isShow = false !== this.onOpen(),
            _this$_props = this._props,
            width = _this$_props.width,
            height = _this$_props.height,
            src = _this$_props.src,
            title = _this$_props.title,
            okBtnText = _this$_props.okBtnText,
            closeBtnText = _this$_props.closeBtnText;
        if (!isShow) return;
        mount({
          width: width,
          title: title
        }, function (vNode, _vm) {
          _this8.$modal = _vm;
          return [_this8.makeSpin(vNode), vNode.make('iframe', {
            attrs: {
              src: src
            },
            style: {
              'height': height,
              'border': '0 none',
              'width': '100%'
            },
            on: {
              'load': function load(e) {
                var spin = _vm.$refs.spin;
                if (spin) spin.$el.parentNode.removeChild(spin.$el);

                try {
                  if (_this8.options.iframeHelper === true) {
                    var iframe = e.path[0].contentWindow;

                    iframe["".concat(_this8.field, "_change")] = function (val) {
                      _this8.setValue(val);
                    };

                    iframe['form_create_helper'] = {
                      close: function close(field) {
                        _this8.valid(field);

                        _vm.onClose();
                      },
                      set: function set(field, value) {
                        _this8.valid(field);

                        iframe["".concat(field, "_change")](value);
                      },
                      get: function get(field) {
                        _this8.valid(field);

                        return _this8.rule.value;
                      }
                    };
                  }
                } catch (e) {}
              }
            }
          }), vNode.make('div', {
            slot: 'footer'
          }, [vNode.button({
            on: {
              click: function click() {
                _vm.onClose();

                _this8.onCancel();
              }
            }
          }, [toString(closeBtnText)]), vNode.button({
            props: {
              type: 'primary'
            },
            on: {
              click: function click() {
                _this8.onOk() !== false && _vm.onClose();
              }
            }
          }, [toString(okBtnText)])])];
        });
      }
    }]);

    return Parser;
  }(BaseParser);
  Object.keys(eventList).forEach(function (k) {
    Parser$9.prototype[k] = function () {
      var fn = this.rule.event[eventList[k]];
      if (fn) return fn(this.handle.getValue(this.type));
    };
  });

  var name$e = 'frame';
  var types$1 = {
    frameInputs: ['input', 0],
    frameFiles: ['file', 0],
    frameImages: ['image', 0],
    frameInputOne: ['input', 1],
    frameFileOne: ['file', 1],
    frameImageOne: ['image', 1]
  };
  var maker$a = Object.keys(types$1).reduce(function (initial, key) {
    initial[key] = creatorTypeFactory(name$e, function (m) {
      return m.props({
        type: types$1[key][0],
        maxLength: types$1[key][1]
      });
    });
    return initial;
  }, {});
  maker$a.frameInput = maker$a.frameInputs;
  maker$a.frameFile = maker$a.frameFiles;
  maker$a.frameImage = maker$a.frameImages;
  var frame = {
    parser: Parser$9,
    name: name$e,
    maker: maker$a
  };

  function parseRule$1(rule) {
    var props = rule.props;
    if (props.data === undefined) $set(props, 'data', []);
    if (props.type === undefined) $set(props, 'type', 'checked');
    if (props.multiple === undefined) $set(props, 'multiple', false);
    return rule;
  }
  function isMultiple(rule) {
    return !rule.props.multiple && rule.props.type === 'selected';
  }
  var event = {
    s: 'on-select-change',
    c: 'on-check-change'
  };

  var handler$1 =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(handler, _BaseParser);

    function handler() {
      _classCallCheck(this, handler);

      return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
    }

    _createClass(handler, [{
      key: "init",
      value: function init() {
        parseRule$1(this.rule);
        this._data = {};
        this.data(this.rule.props.data);
        $set(this.rule, 'value', this._parseValue());
      }
    }, {
      key: "_parseValue",
      value: function _parseValue() {
        var _this = this;

        this.rule.value.forEach(this.rule.props.type === 'selected' ? function (v) {
          return _this.selected(v);
        } : function (v) {
          return _this.checked(v);
        });
        var value = [],
            props = this.rule.props;
        props.type === 'selected' ? Object.keys(this._data).forEach(function (key) {
          var node = _this._data[key];
          if (node.selected === true) value.push(node.id);
        }) : Object.keys(this._data).forEach(function (key) {
          var node = _this._data[key];
          if (node.checked === true) value.push(node.id);
        });
        return value;
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(value) {
        value = toArray(value);
        this.choose(value);
        this.parseValue = value;
        return value;
      }
    }, {
      key: "choose",
      value: function choose(value) {
        var rule = this.rule,
            _data = this._data;
        rule.props.type === 'selected' ? Object.keys(_data).forEach(function (key) {
          $set(_data[key], 'selected', value.indexOf(_data[key].id) !== -1);
        }) : Object.keys(_data).forEach(function (key) {
          $set(_data[key], 'checked', value.indexOf(_data[key].id) !== -1);
        });
      }
    }, {
      key: "checked",
      value: function checked(v) {
        if (this._data[v] !== undefined) {
          $set(this._data[v], 'checked', true);
        }
      }
    }, {
      key: "selected",
      value: function selected(v) {
        if (this._data[v] !== undefined) {
          $set(this._data[v], 'selected', true);
        }
      }
    }, {
      key: "toValue",
      value: function toValue(parseValue) {
        var value = parseValue;
        return !isMultiple(this.rule) ? value : value[0] || '';
      }
    }, {
      key: "watchFormValue",
      value: function watchFormValue(n) {
        this.choose(n);
        console.log('watchFormValue');
      }
    }, {
      key: "selectedValue",
      value: function selectedValue(nodes) {
        var value = [];
        nodes.forEach(function (node) {
          if (node.selected === true) value.push(node.id);
        });
        return value;
      }
    }, {
      key: "checkedValue",
      value: function checkedValue(nodes) {
        var value = [];
        nodes.forEach(function (node) {
          if (node.checked === true) value.push(node.id);
        });
        return value;
      }
    }, {
      key: "_toValue",
      value: function _toValue() {
        return this.rule.props.type === 'selected' ? this.selectedValue(this.el.getSelectedNodes()) : this.checkedValue(this.el.getCheckedNodes());
      }
    }, {
      key: "data",
      value: function data(_data2) {
        var _this2 = this;

        _data2.forEach(function (node) {
          _this2._data[node.id] = node;
          if (node.children !== undefined && Array.isArray(node.children)) _this2.data(node.children);
        });
      }
    }, {
      key: "render",
      value: function render(children) {
        var _this3 = this,
            _this$vData$on$on;

        var rule = this.rule,
            refName = this.refName,
            field = this.field,
            unique = this.unique,
            props = this.vData.on(rule.on).on((_this$vData$on$on = {}, _defineProperty(_this$vData$on$on, event.s, function () {
          var _rule$event;

          _this3.vm._changeFormData(field, _this3._toValue());

          console.log(event.s, _this3._toValue());
          rule.event[event.s] && (_rule$event = rule.event)[event.s].apply(_rule$event, arguments);
        }), _defineProperty(_this$vData$on$on, event.c, function () {
          var _rule$event2;

          console.log(event.c, _this3._toValue());

          _this3.vm._changeFormData(field, _this3._toValue());

          rule.event[event.c] && (_rule$event2 = rule.event)[event.c].apply(_rule$event2, arguments);
        }), _this$vData$on$on)).props(rule.props).ref(refName).key("fip".concat(unique)).get();
        var inputProps = this.r.inputVData(this).props({
          type: 'text',
          value: '' + this.rule.value,
          disable: true,
          readonly: true
        }).key('fipit' + unique)["class"]('__fc_h').ref("".concat(refName, "it")).on('input', function () {});
        return [this.vNode.tree(props, children), this.vNode.input(inputProps)];
      }
    }]);

    return handler;
  }(BaseParser);

  var name$f = 'tree';
  var types$2 = {
    'treeSelected': 'selected',
    'treeChecked': 'checked'
  };
  var maker$b = Object.keys(types$2).reduce(function (initial, key) {
    initial[key] = creatorTypeFactory(name$f, types$2[key]);
    return initial;
  }, {});
  var tree = {
    parser: handler$1,
    name: name$f,
    maker: maker$b
  };

  var Parser$a =
  /*#__PURE__*/
  function (_BaseParser) {
    _inherits(Parser, _BaseParser);

    function Parser() {
      _classCallCheck(this, Parser);

      return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
    }

    _createClass(Parser, [{
      key: "init",
      value: function init() {
        var rule = this.rule;
        if (!Array.isArray(rule.data)) $set(rule, 'data', []);
      }
    }, {
      key: "toFormValue",
      value: function toFormValue(v) {
        return toString(v);
      }
    }]);

    return Parser;
  }(BaseParser);

  var name$g = 'autoComplete';
  var maker$c = {
    auto: creatorFactory(name$g)
  };
  var autoComplete = {
    parser: Parser$a,
    name: name$g,
    maker: maker$c
  };

  //TODO ID 代替 field,避免重复

  var Form =
  /*#__PURE__*/
  function () {
    function Form(render, id) {
      _classCallCheck(this, Form);

      this.vm = render.vm;
      this.h = render.h;
      this.options = render.options;
      this.vNode = new VNode(this.vm);
      this.vData = new VData();
      this.unique = id;
      this.refName = "cForm".concat(id);
    }

    _createClass(Form, [{
      key: "beforeRender",
      value: function beforeRender() {
        this.propsData = this.vData.props(this.h.options.form).props({
          model: this.h.formData,
          rules: this.h.validate,
          key: 'form' + this.unique
        }).ref(this.h.formRefName).nativeOn({
          submit: preventDefault
        })["class"]('form-create', true).key(this.unique).get();
      }
    }, {
      key: "render",
      value: function render(vn) {
        var unique = this.unique;
        if (vn.length > 0) vn.push(this.makeFormBtn(unique));
        return this.vNode.form(this.propsData, vn.length > 0 ? [this.vNode.row(extend({
          props: this.h.options.row || {}
        }, {
          key: 'row' + unique
        }), vn)] : []);
      }
    }, {
      key: "container",
      value: function container(child, parser) {
        return this.makeFormItem(parser, child, "fItem".concat(parser.key).concat(this.unique));
      }
    }, {
      key: "makeFormItem",
      value: function makeFormItem(_ref, VNodeFn, fItemUnique) {
        var type = _ref.type,
            rule = _ref.rule,
            unique = _ref.unique,
            field = _ref.field,
            formItemRefName = _ref.formItemRefName;
        var labelWidth = !componentList[type] && !rule.col.labelWidth && !rule.title ? 1 : rule.col.labelWidth,
            className = rule.className,
            propsData = this.vData.props({
          prop: field,
          label: rule.title,
          labelFor: unique,
          rules: rule.validate,
          labelWidth: labelWidth,
          required: rule.props.required
        }).key(fItemUnique).ref(formItemRefName)["class"](className).get(),
            node = this.vNode.formItem(propsData, [VNodeFn]);
        return this.propsData.props.inline === true ? node : this.makeCol(rule, fItemUnique, [node]);
      }
    }, {
      key: "makeCol",
      value: function makeCol(rule, fItemUnique, VNodeFn) {
        return this.vNode.col({
          props: rule.col,
          'class': {
            '__fc_h': rule.props.hidden === true,
            '__fc_v': rule.props.visibility === true
          },
          key: "".concat(fItemUnique, "col1")
        }, VNodeFn);
      }
    }, {
      key: "makeFormBtn",
      value: function makeFormBtn(unique) {
        var btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if (submitBtnShow) btn.push(this.makeSubmitBtn(unique, resetBtnShow ? 19 : 24));
        if (resetBtnShow) btn.push(this.makeResetBtn(unique, 4));
        return this.vNode.col({
          props: {
            span: 24
          },
          key: "".concat(this.unique, "col2")
        }, btn);
      }
    }, {
      key: "makeResetBtn",
      value: function makeResetBtn(unique, span) {
        var _this = this;

        var resetBtn = this.h.options.resetBtn,
            props = isUndef(this.h.options.resetBtn.col) ? {
          span: span,
          push: 1
        } : resetBtn.col;
        return this.vNode.col({
          props: props,
          key: "".concat(this.unique, "col3")
        }, [this.vNode.button({
          key: "frsbtn".concat(unique),
          props: this.vm.resetProps,
          on: {
            'click': function click() {
              var fApi = _this.h.fCreateApi;
              isFunction(resetBtn.click) ? resetBtn.click(fApi) : fApi.resetFields();
            }
          }
        }, [this.vm.resetProps.innerText])]);
      }
    }, {
      key: "makeSubmitBtn",
      value: function makeSubmitBtn(unique, span) {
        var _this2 = this;

        var submitBtn = this.h.options.submitBtn,
            props = isUndef(this.h.options.submitBtn.col) ? {
          span: span
        } : submitBtn.col;
        return this.vNode.col({
          props: props,
          key: "".concat(this.unique, "col4")
        }, [this.vNode.button({
          key: "fbtn".concat(unique),
          props: this.vm.buttonProps,
          on: {
            'click': function click() {
              var fApi = _this2.h.fCreateApi;
              isFunction(submitBtn.click) ? submitBtn.click(fApi) : fApi.submit();
            }
          }
        }, [this.vm.buttonProps.innerText])]);
      }
    }]);

    return Form;
  }();

  function getGlobalApi(h) {
    function tidyFields(fields) {
      var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (!fields) fields = all ? Object.keys(h.parsers) : h.vm._formField();else if (!Array.isArray(fields)) fields = [fields];
      return fields;
    }

    return {
      formData: function formData() {
        var _this = this;

        var parsers = h.parsers;
        return Object.keys(parsers).reduce(function (initial, field) {
          var parser = parsers[field];

          if (h.isNoVal(parser)) {
            h.$emit(parser, 'input', function (val) {
              initial[field] = val;
            }, _this);
          } else {
            initial[field] = deepExtend({}, {
              value: h.vm._value(field)
            }).value;
          }

          return initial;
        }, {});
      },
      getValue: function getValue(field) {
        field = toString(field);
        var parser = h.parsers[field];
        if (!parser) return;
        var val = undefined;
        if (h.isNoVal(parser)) h.$emit(parser, 'input', function (v) {
          val = v;
        }, this);else val = deepExtend({}, {
          value: h.vm._value(field)
        }).value;
        return val;
      },
      setValue: function setValue(field, value) {
        var _this2 = this;

        var formData = field;
        if (!isPlainObject(field)) formData = _defineProperty({}, field, value);
        Object.keys(formData).forEach(function (key) {
          _this2.changeValue(key, formData[key]);
        });
      },
      changeValue: function changeValue(field, value) {
        var _this3 = this;

        field = toString(field);
        var parser = h.parsers[field];
        if (parser === undefined) return;
        if (isFunction(value)) value(h.vm._trueData(field), function (changeValue) {
          _this3.changeField(field, changeValue);
        });else {
          if (h.isNoVal(parser)) h.$emit(parser, 'set-value', value, this);else h.setFormData(field, parser.toFormValue(value));
        }
      },
      changeField: function changeField(field, value) {
        this.setValue(field, value);
      },
      removeField: function removeField(field) {
        var parser = h.parsers[field];
        if (!parser) return;
        var fields = parser.root.map(function (rule) {
          return rule.__field__;
        }),
            index = fields.indexOf(toString(field));
        if (index === -1) return;
        parser.root.splice(index, 1);

        h.vm._refresh();
      },
      validate: function validate(callback) {
        h.getFormRef().validate(function (valid) {
          callback && callback(valid);
        });
      },
      validateField: function validateField(field, callback) {
        if (!h.vm.cptData[field]) return;
        h.getFormRef().validateField(field, callback);
      },
      resetFields: function resetFields(fields) {
        var _this4 = this;

        var parsers = h.parsers;
        tidyFields(fields, true).forEach(function (field) {
          var parser = parsers[field];
          if (!parser) return;
          if (h.isNoVal(parser)) h.$emit(parser, 'reset-field', _this4);else h.reset(parser);
        });
        h.refresh();
      },
      destroy: function destroy() {
        h.vm.$el.parentNode.removeChild(h.vm.$el);
        h.vm.$destroy();
      },
      fields: function fields() {
        return h.vm._formField();
      },
      append: function append(rule, after) {
        var fields = h.fieldList,
            index = fields.indexOf(toString(after));
        if (rule.field && fields.indexOf(toString(rule.field)) !== -1) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());

        if (isUndef(after)) {
          index = fields.length;
        } else if (index === -1) return;

        h.rules.splice(index + 1, 0, rule);
      },
      prepend: function prepend(rule, after) {
        var fields = h.fieldList,
            index = fields.indexOf(toString(after));
        if (rule.field && fields.indexOf(toString(rule.field)) !== -1) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());

        if (isUndef(after)) {
          index = 0;
        } else if (index === -1) return;else index--;

        h.rules.splice(index + 1, 0, rule);
      },
      submit: function submit(successFn, failFn) {
        var _this5 = this;

        this.validate(function (valid) {
          if (valid) {
            var formData = _this5.formData();

            if (isFunction(successFn)) successFn(formData, _this5);else h.options.onSubmit && h.options.onSubmit(formData);
          } else {
            failFn && failFn();
          }
        });
      },
      hidden: function hidden(_hidden, fields) {
        tidyFields(fields, true).forEach(function (field) {
          var parser = h.parsers[field];
          if (!parser) return;
          h.vm.$set(parser.rule.props, 'hidden', !!_hidden);
        });
      },
      visibility: function visibility(_visibility, fields) {
        tidyFields(fields).forEach(function (field) {
          var parser = h.parsers[field];
          if (!parser) return;
          h.vm.$set(parser.rule.props, 'visibility', !!_visibility);
        });
      },
      disabled: function disabled(_disabled, fields) {
        tidyFields(fields, true).forEach(function (field) {
          var parser = h.parsers[field];
          if (!parser) return;
          h.vm.$set(parser.rule.props, 'disabled', !!_disabled);
        });
      },
      clearValidateState: function clearValidateState(fields) {
        tidyFields(fields).forEach(function (field) {
          var parser = h.parsers[field];
          if (!parser) return;
          h.clearMsg(parser);
        });
        h.refresh();
      },
      model: function model() {
        return Object.assign({}, h.vm.trueData);
      },
      component: function component() {
        return Object.assign({}, h.vm.components);
      },
      bind: function bind(fields) {
        var bind = {},
            properties = {};
        tidyFields(fields).forEach(function (field) {
          var rule = h.vm._trueData(field);

          if (!rule) return console.error("".concat(field, " \u5B57\u6BB5\u4E0D\u5B58\u5728") + errMsg());
          properties[field] = {
            get: function get() {
              return rule.value;
            },
            set: function set(value) {
              h.vm.$set(rule, 'value', value);
            },
            enumerable: true,
            configurable: true
          };
        });
        Object.defineProperties(bind, properties);
        return bind;
      },
      submitBtnProps: function submitBtnProps() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        h.vm._buttonProps(props);
      },
      resetBtnProps: function resetBtnProps() {
        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        h.vm._resetProps(props);
      },
      btn: {
        loading: function loading() {
          var _loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

          h.vm._buttonProps({
            loading: !!_loading
          });
        },
        finish: function finish() {
          this.loading(false);
        },
        disabled: function disabled() {
          var _disabled2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

          h.vm._buttonProps({
            disabled: !!_disabled2
          });
        },
        show: function show() {
          var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

          h.vm._buttonProps({
            show: !!isShow
          });
        }
      },
      resetBtn: {
        loading: function loading() {
          var _loading2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

          h.vm._resetProps({
            loading: !!_loading2
          });
        },
        finish: function finish() {
          this.loading(false);
        },
        disabled: function disabled() {
          var _disabled3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

          h.vm._resetProps({
            disabled: !!_disabled3
          });
        },
        show: function show() {
          var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

          h.vm._resetProps({
            show: !!isShow
          });
        }
      },
      closeModal: function closeModal(field) {
        var parser = h.parsers[field];
        parser && parser.onCloseModal && parser.onCloseModal();
      },
      set: function set(node, field, value) {
        h.vm.$set(node, field, value);
      },
      reload: function reload(rules) {
        h.reloadRule(rules);
      },
      options: function options(_options) {
        deepExtend(h.options, _options);
      },
      onSuccess: function onSuccess(fn) {
        this.onSubmit(fn);
      },
      onSubmit: function onSubmit(fn) {
        this.options({
          onSubmit: fn
        });
      },
      // sync: (field, callback) => {
      //     if (h.parsers[field])
      //         h.parsers[field].render.sync(callback);
      // },
      refresh: function refresh() {
        h.vm._refresh();
      },
      show: function show() {
        var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        h.vm.isShow = !!isShow;
      }
    };
  }

  var componentList = {
    hidden: hidden,
    input: input,
    radio: radio,
    checkbox: checkbox,
    "switch": iswitch,
    select: select,
    datePicker: datePicker,
    timePicker: timePicker,
    inputNumber: inputNumber,
    colorPicker: colorPicker,
    upload: upload,
    cascader: cascader,
    rate: rate,
    slider: slider,
    frame: frame,
    tree: tree,
    autoComplete: autoComplete
  };
  var style = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' + ' .fc-files>.ivu-icon{vertical-align: middle;}' + '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' + '.fc-upload .ivu-upload{display: inline-block;}' + '.fc-upload-btn{border: 1px dashed #c0ccda;cursor: pointer;}' + '.fc-upload-btn>ivu-icon{vertical-align:sub;}' + '.fc-upload .fc-upload-cover{opacity: 0; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); transition: opacity .3s;}' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-files:hover .fc-upload-cover{opacity: 1; }' + '.fc-hide-btn .ivu-upload .ivu-upload{display:none;}' + '.fc-upload .ivu-upload-list{margin-top: 0;}' + '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';
  var nodes = {
    modal: 'Modal',
    progress: 'i-progress',
    button: 'i-button',
    icon: 'Icon',
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
    autoComplete: 'AutoComplete'
  };
  var drive = {
    ui: undefined,
    version: "0.0.1",
    nodes: nodes,
    componentList: componentList,
    formRender: Form,
    style: style,
    getGlobalApi: getGlobalApi,
    getConfig: getConfig
  };

  var _createFormCreate = createFormCreate(drive),
      FormCreate = _createFormCreate.FormCreate,
      install = _createFormCreate.install;

  if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;

    if (window.Vue) {
      install(Vue);
    }
  }

  var maker$d = FormCreate.maker;

  exports.default = FormCreate;
  exports.maker = maker$d;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
