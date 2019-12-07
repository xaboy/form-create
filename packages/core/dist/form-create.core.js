/*!
 * @form-create/core v1.0.5
 * (c) 2018-2019 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';
import Vue from 'vue';

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
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
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

function $set(target, field, value) {
  Vue.set(target, field, value);
}
function $del(target, field) {
  Vue.delete(target, field);
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
function toArray(value) {
  return Array.isArray(value) ? value : isUndef(value) || value === '' ? [] : [value];
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
function errMsg(i) {
  return '\n\x67\x69\x74\x68\x75\x62\x3a\x68\x74\x74\x70' + '\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f' + '\x6d\x2f\x78\x61\x62\x6f\x79\x2f\x66\x6f\x72\x6d\x2d' + '\x63\x72\x65\x61\x74\x65\n\x64\x6f\x63\x75\x6d\x65' + '\x6e\x74\x3a\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77' + '\x2e\x66\x6f\x72\x6d\x2d\x63\x72\x65\x61\x74\x65\x2e' + '\x63\x6f\x6d' + (i || '');
}

var formCreateName = 'FormCreate';
function $FormCreate(FormCreate, components) {
  return {
    name: formCreateName,
    props: {
      rule: {
        type: Array,
        required: true,
        default: function _default() {
          return {};
        }
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
    data: function data() {
      return {
        formData: undefined,
        buttonProps: undefined,
        resetProps: undefined,
        $f: undefined,
        isShow: true,
        unique: 1
      };
    },
    components: components,
    render: function render() {
      return this.formCreate.render();
    },
    methods: {
      _buttonProps: function _buttonProps(props) {
        this.$set(this, 'buttonProps', deepExtend(this.buttonProps, props));
      },
      _resetProps: function _resetProps(props) {
        this.$set(this, 'resetProps', deepExtend(this.resetProps, props));
      },
      _refresh: function _refresh() {
        this.unique += 1;
      }
    },
    watch: {
      option: '_refresh',
      rule: function rule(n) {
        this.formCreate.handle.reloadRule(n);
      }
    },
    beforeCreate: function beforeCreate() {
      var _this$$options$propsD = this.$options.propsData,
          rule = _this$$options$propsD.rule,
          option = _this$$options$propsD.option;
      this.formCreate = new FormCreate(rule, option);
      this.formCreate.beforeCreate(this);
    },
    created: function created() {
      this.formCreate.created();
      this.$f = this.formCreate.api();
      this.$emit('input', this.$f);
    },
    mounted: function mounted() {
      var formCreate = this.formCreate;
      formCreate.mounted();
      this.$emit('input', this.$f);
    },
    beforeDestroy: function beforeDestroy() {
      this.formCreate.handle.reloadRule([]);
      this.formCreate.handle.$render.clearCacheAll();
    }
  };
}

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
          $set(_this._data.class, toString(cls), true);
        });
      } else if (isPlainObject(classList)) {
        $set(this._data, 'class', extend(this._data.class, classList));
      } else {
        $set(this._data.class, toString(classList), status === undefined ? true : status);
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
      var _this2 = this;

      var data = Object.keys(this._data).reduce(function (initial, key) {
        var value = _this2._data[key];
        if (value === undefined) return initial;
        if (Array.isArray(value) && !value.length) return initial;
        if (!Object.keys(value).length && key !== 'props') return initial;
        initial[key] = value;
        return initial;
      }, {});
      this.init();
      return data;
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
    validate: [],
    options: [],
    col: {},
    children: [],
    emit: [],
    template: undefined,
    emitPrefix: undefined,
    native: undefined,
    info: undefined
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
    extend(_this._data, baseRule());
    extend(_this._data, {
      type: type,
      title: title,
      field: field,
      value: value
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
    key: "getRule",
    value: function getRule() {
      return this._data;
    }
  }, {
    key: "event",
    value: function event() {
      this.on.apply(this, arguments);
      return this;
    }
  }]);

  return Creator;
}(VData);
var keyAttrs = ['emitPrefix', 'className', 'value', 'name', 'title', 'native', 'info', 'hidden', 'visibility'];
keyAttrs.forEach(function (attr) {
  Creator.prototype[attr] = function (value) {
    $set(this._data, attr, value);
    return this;
  };
});
var objAttrs = ['col'];
objAttrs.forEach(function (attr) {
  Creator.prototype[attr] = function (opt) {
    $set(this._data, attr, extend(this._data[attr], opt));
    return this;
  };
});
var arrAttrs = ['validate', 'options', 'children', 'emit'];
arrAttrs.forEach(function (attr) {
  Creator.prototype[attr] = function (opt) {
    if (!Array.isArray(opt)) opt = [opt];
    $set(this._data, attr, this._data[attr].concat(opt));
    return this;
  };
});

function toJson(obj) {
  return JSON.stringify(obj, function (key, val) {
    if (val instanceof Creator) {
      return val.getRule();
    }

    if (val && val._isVue === true) return undefined;

    if (typeof val !== 'function') {
      return val;
    }

    if (val.__inject) val = val.__origin;
    if (val.__emit) return undefined;
    return '' + val;
  });
}
function parseJson(json) {
  return JSON.parse(json, function (k, v) {
    if (v.indexOf && v.indexOf('function') > -1) {
      try {
        return eval('(function(){return ' + v + ' })()');
      } catch (e) {
        console.error("[form-create]\u89E3\u6790\u5931\u8D25:".concat(v));
        return undefined;
      }
    }

    return v;
  });
}
function enumerable(value) {
  return {
    value: value,
    enumerable: false,
    configurable: false
  };
}

function makerFactory() {
  var maker = {};
  var commonMaker = creatorFactory('');
  extend(maker, {
    create: function create(type, field, title) {
      var make = commonMaker('', field);
      make._data.type = type;
      make._data.title = title;
      return make;
    },
    createTmp: function createTmp(template, vm, field, title) {
      var make = commonMaker('', field);
      make._data.type = 'template';
      make._data.template = template;
      make._data.title = title;
      make._data.vm = vm;
      return make;
    }
  });
  maker.template = maker.createTmp;
  maker.parse = parse;
  return maker;
}

function parse(rule) {
  var toMaker = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  if (isString(rule)) rule = parseJson(rule);
  if (rule instanceof Creator) return toMaker ? rule : rule.getRule();

  if (isPlainObject(rule)) {
    var maker = ruleToMaker(rule);
    return toMaker ? maker : maker.getRule();
  } else if (!Array.isArray(rule)) return rule;else {
    var rules = rule.map(function (r) {
      return parse(r, toMaker);
    });
    Object.defineProperties(rules, {
      find: enumerable(findField),
      model: enumerable(model)
    });
    return rules;
  }
}

function findField(field, origin) {
  var children = [];

  for (var i in this) {
    var rule = this[i] instanceof Creator ? this[i]._data : this[i];
    if (rule.field === field) return origin === true ? rule : this[i];
    if (isValidChildren(rule.children)) children = children.concat(rule.children);
  }

  if (children.length > 0) return findField.call(children, field);
}

function model(formData) {
  var _this = this;

  Object.keys(formData).forEach(function (field) {
    var rule = _this.find(field, true);

    if (rule) rule.value = formData[field];
  });
}

function ruleToMaker(rule) {
  var maker = new Creator();
  Object.keys(rule).forEach(function (key) {
    maker._data[key] = rule[key];
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
        VNode.prototype[toString(k).toLocaleLowerCase()] = VNode.prototype[k] = function (data, VNodeFn) {
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
    this.vNode = new VNode();
    this.id = id;
    this.watch = [];
    this.originType = rule.type;
    this.type = toString(rule.type).toLocaleLowerCase();
    this.isDef = true;
    this.el = undefined;

    if (!rule.field) {
      this.field = '_def_' + uniqueId();
      this.isDef = false;
    } else {
      this.field = rule.field;
    }

    this.name = rule.name;
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
      this.$handle = handle;
      this.$render = handle.$render;
      this.vm = handle.vm;
      this.options = handle.options;
      this.vNode.setVm(this.vm);
      this.deleted = false;
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
  function Render(handle) {
    _classCallCheck(this, Render);

    this.$handle = handle;
    this.fc = handle.fc;
    this.vm = handle.vm;
    this.options = handle.options;
    this.$form = handle.$form;
    this.vNode = new VNode(this.vm);
    this.vData = new VData();
    this.cache = {};
    this.renderList = {};
  }

  _createClass(Render, [{
    key: "clearCache",
    value: function clearCache(parser) {
      var clear = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      if (!this.cache[parser.id]) return;
      if (this.cacheStatus(parser)) this.$handle.refresh();
      var parent = this.cache[parser.id].parent;
      this.cache[parser.id] = null;
      if (parent && clear) this.clearCache(parent, clear);
    }
  }, {
    key: "clearCacheAll",
    value: function clearCacheAll() {
      this.cache = {};
    }
  }, {
    key: "setCache",
    value: function setCache(parser, vnode, parent) {
      this.cache[parser.id] = {
        vnode: vnode,
        use: false,
        parent: parent
      };
    }
  }, {
    key: "cacheStatus",
    value: function cacheStatus(parser) {
      return this.cache[parser.id] && (this.cache[parser.id].use === true || this.cache[parser.id].parent);
    }
  }, {
    key: "getCache",
    value: function getCache(parser) {
      var cache = this.cache[parser.id];
      cache.use = true;
      return cache.vnode;
    }
  }, {
    key: "initOrgChildren",
    value: function initOrgChildren() {
      var parsers = this.$handle.parsers;
      this.orgChildren = Object.keys(parsers).reduce(function (initial, id) {
        var children = parsers[id].rule.children;
        initial[id] = isValidChildren(children) ? _toConsumableArray(children) : [];
        return initial;
      }, {});
    }
  }, {
    key: "run",
    value: function run() {
      var _this = this;

      if (!this.vm.isShow) return;
      this.$form.beforeRender();
      var vn = this.$handle.sortList.map(function (id) {
        var parser = _this.$handle.parsers[id];
        if (parser.type === 'hidden') return;
        return _this.renderParser(parser);
      }).filter(function (val) {
        return val !== undefined;
      });
      return this.$form.render(vn);
    }
  }, {
    key: "setGlobalConfig",
    value: function setGlobalConfig(parser) {
      if (!this.options.global) return;

      if (this.options.global['*']) {
        this.toData(parser, this.options.global['*']);
      }

      if (this.options.global[parser.type]) {
        this.toData(parser, this.options.global[parser.type]);
      }
    }
  }, {
    key: "renderTemplate",
    value: function renderTemplate(parser) {
      var _this2 = this;

      var id = parser.id,
          rule = parser.rule,
          key = parser.key;

      if (_vue.compile === undefined) {
        console.error('使用的 Vue 版本不支持 compile' + errMsg());
        return [];
      }

      if (!this.renderList[id]) {
        var _vm = rule.vm;
        if (isUndef(rule.vm)) _vm = new _vue();else if (isFunction(rule.vm)) _vm = rule.vm(this.$handle.getInjectData(rule));
        this.renderList[id] = {
          vm: _vm,
          template: _vue.compile(rule.template)
        };
      }

      var _this$renderList$id = this.renderList[id],
          vm = _this$renderList$id.vm,
          template = _this$renderList$id.template;
      setTemplateProps(vm, parser, this.$handle.fCreateApi);
      vm.$off('input');
      vm.$on('input', function (value) {
        _this2.onInput(parser, value);
      });
      var vn = template.render.call(vm);
      if (vn.data === undefined) vn.data = {};
      vn.key = key;
      return vn;
    }
  }, {
    key: "renderParser",
    value: function renderParser(parser, parent) {
      parser.vData.get();
      this.setGlobalConfig(parser);

      if (!this.cache[parser.id] || parser.type === 'template') {
        var type = parser.type,
            rule = parser.rule,
            form = this.$form,
            vn;

        if (type === 'template' && rule.template) {
          vn = this.renderTemplate(parser);

          if (parent) {
            this.setCache(parser, vn, parent);
            return vn;
          }
        } else if (!this.$handle.isNoVal(parser)) {
          var children = this.renderChildren(parser);
          vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
        } else {
          vn = this.defaultRender(parser, this.renderChildren(parser));

          if (parent) {
            this.setCache(parser, vn, parent);
            return vn;
          }
        }

        if (rule.native !== true) vn = form.container(vn, parser);
        this.setCache(parser, vn, parent);
        return vn;
      }

      return this.getCache(parser);
    }
  }, {
    key: "toData",
    value: function toData(parser, data) {
      Object.keys(parser.vData._data).forEach(function (key) {
        if (data[key] !== undefined) parser.vData[key](data[key]);
      });
      return parser.vData;
    }
  }, {
    key: "parserToData",
    value: function parserToData(parser) {
      return this.toData(parser, parser.rule);
    }
  }, {
    key: "inputVData",
    value: function inputVData(parser, custom) {
      var _this3 = this;

      var refName = parser.refName,
          key = parser.key;
      this.parserToData(parser);
      var data = parser.vData.ref(refName).key('fc_item' + key).props('formCreate', this.$handle.fCreateApi);
      if (!custom) data.on('input', function (value) {
        _this3.onInput(parser, value);
      }).props('value', this.$handle.getFormData(parser));
      this.$form.inputVData && this.$form.inputVData(parser, custom);
      return data;
    }
  }, {
    key: "onInput",
    value: function onInput(parser, value) {
      this.$handle.onInput(parser, value);
    }
  }, {
    key: "renderChildren",
    value: function renderChildren(parser) {
      var _this4 = this;

      var children = parser.rule.children,
          orgChildren = this.orgChildren[parser.id];

      if (!isValidChildren(children)) {
        orgChildren.forEach(function (child) {
          if (!isString(child) && child.__fc__) {
            _this4.$handle.removeField(child.__fc__);
          }
        });
        this.orgChildren[parser.id] = [];
        return [];
      }

      this.orgChildren[parser.id].forEach(function (child) {
        if (children.indexOf(child) === -1 && !isString(child) && child.__fc__) {
          _this4.$handle.removeField(child.__fc__);
        }
      });
      return children.map(function (child) {
        if (isString(child)) return child;

        if (child.__fc__) {
          return _this4.renderParser(child.__fc__, parser);
        }

        if (child.type) $de(function () {
          return _this4.$handle.reloadRule();
        });
      });
    }
  }, {
    key: "defaultRender",
    value: function defaultRender(parser, children) {
      if (this.vNode[parser.type]) return this.vNode[parser.type](this.inputVData(parser), children);
      if (this.vNode[parser.originType]) return this.vNode[parser.originType](this.inputVData(parser), children);
      return this.vNode.make(parser.originType, this.inputVData(parser), children);
    }
  }]);

  return Render;
}();

function setTemplateProps(vm, parser, fApi) {
  if (!vm.$props) return;
  var rule = parser.rule;
  var keys = Object.keys(vm.$props);
  keys.forEach(function (key) {
    if (rule.props[key] !== undefined) vm.$props[key] = rule.props[key];
  });

  if (keys.indexOf('value') !== -1) {
    vm.$props.value = parser.rule.value;
  }

  vm.$props.formCreate = fApi;
}

function baseApi(h) {
  function tidyFields(fields) {
    var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!fields) fields = all ? Object.keys(h.fieldList) : h.fields();else if (!Array.isArray(fields)) fields = [fields];
    return fields;
  }

  return {
    formData: function formData() {
      var parsers = h.fieldList;
      return Object.keys(parsers).reduce(function (initial, id) {
        var parser = parsers[id];
        initial[parser.field] = deepExtend({}, {
          value: parser.rule.value
        }).value;
        return initial;
      }, {});
    },
    getValue: function getValue(field) {
      var parser = h.fieldList[field];
      if (!parser) return;
      return deepExtend({}, {
        value: parser.rule.value
      }).value;
    },
    setValue: function setValue(field, value) {
      var formData = field;
      if (!isPlainObject(field)) formData = _defineProperty({}, field, value);
      Object.keys(formData).forEach(function (key) {
        var parser = h.fieldList[key];
        if (!parser) return;
        parser.rule.value = formData[key];
      });
    },
    changeValue: function changeValue(field, value) {
      this.setValue(field, value);
    },
    changeField: function changeField(field, value) {
      this.setValue(field, value);
    },
    removeField: function removeField(field) {
      var parser = h.getParser(field);
      if (!parser) return;
      var fields = parser.root.map(function (rule) {
        return rule.__field__;
      }),
          index = fields.indexOf(field);
      if (index === -1) return;
      parser.root.splice(index, 1);
      if (h.sortList.indexOf(parser.id) === -1) this.reload();
      return parser.rule.__origin__;
    },
    destroy: function destroy() {
      h.vm.$el.parentNode.removeChild(h.vm.$el);
      h.vm.$destroy();
    },
    fields: function fields() {
      return h.fields();
    },
    append: function append(rule, after, isChild) {
      var fields = Object.keys(h.fieldList),
          index = h.sortList.length,
          rules = h.rules;
      if (rule.field && fields.indexOf(rule.field) !== -1) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());
      var parser = h.getParser(after);

      if (parser) {
        if (isChild) {
          rules = parser.rule.children;
          index = parser.rule.children.length;
        } else {
          index = parser.root.indexOf(parser.rule.__origin__);
        }
      }

      rules.splice(index + 1, 0, rule);
    },
    prepend: function prepend(rule, after, isChild) {
      var fields = Object.keys(h.fieldList),
          index = 0,
          rules = h.rules;
      if (rule.field && fields.indexOf(rule.field) !== -1) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());
      var parser = h.getParser(after);

      if (parser) {
        if (isChild) {
          rules = parser.rule.children;
        } else {
          index = parser.root.indexOf(parser.rule.__origin__);
        }
      }

      rules.splice(index, 0, rule);
    },
    hidden: function hidden(_hidden, fields) {
      tidyFields(fields, true).forEach(function (field) {
        var parser = h.getParser(field);
        if (!parser) return;
        $set(parser.rule, 'hidden', !!_hidden);
        h.$render.clearCache(parser, true);
      });
      h.refresh();
    },
    hiddenStatus: function hiddenStatus(id) {
      var parser = h.getParser(id);
      if (!parser) return;
      return !!parser.rule.hidden;
    },
    visibility: function visibility(_visibility, fields) {
      tidyFields(fields, true).forEach(function (field) {
        var parser = h.getParser(field);
        if (!parser) return;
        $set(parser.rule, 'visibility', !!_visibility);
        h.$render.clearCache(parser, true);
      });
      h.refresh();
    },
    visibilityStatus: function visibilityStatus(id) {
      var parser = h.getParser(id);
      if (!parser) return;
      return !!parser.rule.visibility;
    },
    disabled: function disabled(_disabled, fields) {
      tidyFields(fields, true).forEach(function (field) {
        var parser = h.fieldList[field];
        if (!parser) return;
        h.vm.$set(parser.rule.props, 'disabled', !!_disabled);
      });
    },
    model: function model() {
      return Object.keys(h.trueData).reduce(function (initial, key) {
        initial[key] = h.trueData[key].rule;
        return initial;
      }, {});
    },
    component: function component() {
      return Object.keys(h.customData).reduce(function (initial, key) {
        initial[key] = h.customData[key].rule;
        return initial;
      }, {});
    },
    bind: function bind() {
      var bind = {},
          properties = {};
      Object.keys(h.fieldList).forEach(function (field) {
        var parser = h.fieldList[field];
        properties[field] = {
          get: function get() {
            return parser.rule.value;
          },
          set: function set(value) {
            parser.rule.value = value;
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
    set: function set(node, field, value) {
      h.vm.$set(node, field, value);
    },
    reload: function reload(rules) {
      h.reloadRule(rules);
    },
    updateOptions: function updateOptions(options) {
      deepExtend(h.options, options);
      this.refresh(true);
    },
    onSubmit: function onSubmit(fn) {
      this.options({
        onSubmit: fn
      });
    },
    sync: function sync(field) {
      var parser = h.getParser(field);

      if (parser) {
        h.$render.clearCache(parser, true);
        h.refresh();
      }
    },
    refresh: function refresh(clear) {
      if (clear) h.$render.clearCacheAll();
      h.refresh();
    },
    hideForm: function hideForm(isShow) {
      h.vm.isShow = !isShow;
    },
    changeStatus: function changeStatus() {
      return h.changeStatus;
    },
    clearChangeStatus: function clearChangeStatus() {
      h.changeStatus = false;
    },
    updateRule: function updateRule(id, rule, cover) {
      var parser = h.getParser(id);

      if (parser) {
        cover ? Object.keys(rule).forEach(function (key) {
          parser.rule[key] = rule[key];
        }) : deepExtend(parser.rule, rule);
        return parser.rule.__origin__;
      }
    },
    getRule: function getRule(id) {
      var parser = h.getParser(id);

      if (parser) {
        return parser.rule;
      }
    },
    updateRules: function updateRules(rules, cover) {
      var _this = this;

      Object.keys(rules).forEach(function (id) {
        _this.updateRule(id, rules[id], cover);
      });
    },
    updateValidate: function updateValidate(id, validate, merge) {
      var parser = h.getParser(id);

      if (parser) {
        parser.rule.validate = merge ? parser.rule.validate.concat(validate) : validate;
      }
    },
    updateValidates: function updateValidates(validates, merge) {
      var _this2 = this;

      Object.keys(validates).forEach(function (id) {
        _this2.updateValidate(id, validates[id], merge);
      });
    },
    method: function method(id, name) {
      var el = this.el(id);
      if (!el || !el[name]) throw new Error('方法不存在' + errMsg());
      return function () {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        el[name](args);
      };
    },
    toJson: function toJson$1() {
      return toJson(this.rule);
    },
    on: function on() {
      var _h$vm;

      (_h$vm = h.vm).$on.apply(_h$vm, arguments);
    },
    once: function once() {
      var _h$vm2;

      (_h$vm2 = h.vm).$once.apply(_h$vm2, arguments);
    },
    off: function off() {
      var _h$vm3;

      (_h$vm3 = h.vm).$off.apply(_h$vm3, arguments);
    },
    trigger: function trigger(id, event) {
      var el = this.el(id);

      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      el && el.$emit.apply(el, [event].concat(args));
    },
    el: function el(id) {
      var parser = h.getParser(id);
      if (parser) return parser.el;
    }
  };
}

function getRule(rule) {
  if (isFunction(rule.getRule)) return rule.getRule();else return rule;
}

var Handle =
/*#__PURE__*/
function () {
  function Handle(fc) {
    _classCallCheck(this, Handle);

    var vm = fc.vm,
        rules = fc.rules,
        options = fc.options;
    this.watching = false;
    this.vm = vm;
    this.fc = fc;
    this.id = uniqueId();
    this.options = options;
    this.validate = {};
    this.formData = {};
    this.fCreateApi = undefined;

    this.__init(rules);

    this.$form = new fc.drive.formRender(this, this.id);
    this.$render = new Render(this);
    this.loadRule(this.rules, false);
    this.$render.initOrgChildren();
    this.$form.init();
  }

  _createClass(Handle, [{
    key: "__init",
    value: function __init(rules) {
      this.fieldList = {};
      this.trueData = {};
      this.parsers = {};
      this.customData = {};
      this.sortList = [];
      this.rules = rules;
      this.origin = _toConsumableArray(this.rules);
      this.changeStatus = false;
    }
  }, {
    key: "loadRule",
    value: function loadRule(rules, child) {
      var _this = this;

      rules.map(function (_rule) {
        if (child && isString(_rule)) return;
        if (!_rule.type) return console.error('未定义生成规则的 type 字段' + errMsg());
        var parser;

        if (_rule.__fc__) {
          parser = _rule.__fc__;
          if (parser.vm !== _this.vm && !parser.deleted) return console.error("".concat(_rule.type, "\u89C4\u5219\u6B63\u5728\u5176\u4ED6\u7684 <form-create> \u4E2D\u4F7F\u7528") + errMsg());
          parser.update(_this);
          var _rule2 = parser.rule;

          _this.parseOn(_rule2);

          _this.parseProps(_rule2);
        } else {
          parser = _this.createParser(_this.parseRule(_rule));
        }

        var children = parser.rule.children,
            rule = parser.rule;
        if (!_this.notField(parser.field)) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());

        _this.setParser(parser);

        if (!_rule.__fc__) {
          bindParser(_rule, parser);
        }

        if (isValidChildren(children)) {
          _this.loadRule(children, true);
        }

        if (!child) {
          _this.sortList.push(parser.id);
        }

        if (!_this.isNoVal(parser)) Object.defineProperty(parser.rule, 'value', {
          get: function get() {
            return parser.toValue(_this.getFormData(parser));
          },
          set: function set(value) {
            if (_this.isChange(parser, value)) {
              _this.refresh();

              _this.$render.clearCache(parser, true);

              _this.setFormData(parser, parser.toFormValue(value));
            }
          }
        });
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
      var id = this.id + '' + uniqueId(),
          parsers = this.fc.parsers,
          type = toString(rule.type).toLocaleLowerCase();
      var Parser = parsers[type] ? parsers[type] : BaseParser;
      return new Parser(this, rule, id);
    }
  }, {
    key: "parseRule",
    value: function parseRule(_rule) {
      var def = defRule(),
          rule = getRule(_rule);
      Object.defineProperties(rule, {
        __origin__: enumerable(_rule)
      });
      Object.keys(def).forEach(function (k) {
        if (isUndef(rule[k])) $set(rule, k, def[k]);
      });
      if (rule.field && this.options.formData[rule.field] !== undefined) rule.value = this.options.formData[rule.field];
      rule.options = parseArray(rule.options);
      this.parseOn(rule);
      this.parseProps(rule);
      return rule;
    }
  }, {
    key: "parseOn",
    value: function parseOn(rule) {
      this.parseInjectEvent(rule, rule.on || {});

      if (!this.watching) {
        this.margeEmit(rule);
      }
    }
  }, {
    key: "margeEmit",
    value: function margeEmit(rule) {
      var emitEvent = this.parseEmit(rule);
      if (Object.keys(emitEvent).length > 0) extend(rule.on, emitEvent);
    }
  }, {
    key: "parseProps",
    value: function parseProps(rule) {
      this.parseInjectEvent(rule, rule.props || {});
    }
  }, {
    key: "parseInjectEvent",
    value: function parseInjectEvent(rule, on) {
      var _this2 = this;

      if (this.options.injectEvent || rule.inject) Object.keys(on).forEach(function (k) {
        if (isFunction(on[k])) on[k] = _this2.inject(rule, on[k]);
      });
      return on;
    }
  }, {
    key: "getInjectData",
    value: function getInjectData(self, inject) {
      var _this$vm$$options$pro = this.vm.$options.propsData,
          option = _this$vm$$options$pro.option,
          rule = _this$vm$$options$pro.rule;
      return {
        $f: this.fCreateApi,
        rule: rule,
        self: self.__origin__,
        option: option,
        inject: inject || rule.inject || {}
      };
    }
  }, {
    key: "inject",
    value: function inject(self, _fn, _inject) {
      if (_fn.__inject) {
        if (this.watching) return _fn;
        _fn = _fn.__origin;
      }

      var h = this;

      var fn = function fn() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        args.unshift(h.getInjectData(self, _inject));

        _fn.apply(void 0, args);
      };

      fn.__inject = true;
      fn.__origin = _fn;
      return fn;
    }
  }, {
    key: "parseEmit",
    value: function parseEmit(rule) {
      var _this3 = this;

      var event = {},
          emit = rule.emit,
          emitPrefix = rule.emitPrefix,
          field = rule.field;
      if (!Array.isArray(emit)) return event;
      emit.forEach(function (config) {
        var inject,
            eventName = config;

        if (isPlainObject(config)) {
          eventName = config.name;
          inject = config.inject;
        }

        if (!eventName) return;
        var emitKey = emitPrefix ? emitPrefix : field;
        var fieldKey = toLine("".concat(emitKey, "-").concat(eventName)).replace('_', '-');

        var fn = function fn() {
          var _this3$vm;

          for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            arg[_key2] = arguments[_key2];
          }

          (_this3$vm = _this3.vm).$emit.apply(_this3$vm, [fieldKey].concat(arg));
        };

        fn.__emit = true;
        event[eventName] = _this3.options.injectEvent || config.inject !== undefined ? _this3.inject(rule, fn, inject) : fn;
      });
      return event;
    }
  }, {
    key: "run",
    value: function run() {
      if (this.vm.unique > 0) return this.$render.run();else {
        this.vm.unique = 1;
        return [];
      }
    }
  }, {
    key: "setParser",
    value: function setParser(parser) {
      var id = parser.id,
          field = parser.field,
          name = parser.name,
          rule = parser.rule;
      if (this.parsers[id]) return;
      this.parsers[id] = parser;
      if (name) $set(this.customData, name, parser);
      if (this.isNoVal(parser)) return;
      this.fieldList[field] = parser;
      $set(this.formData, field, parser.toFormValue(rule.value));
      $set(this.validate, field, rule.validate || []);
      $set(this.trueData, field, parser);
    }
  }, {
    key: "notField",
    value: function notField(id) {
      return this.parsers[id] === undefined;
    }
  }, {
    key: "isChange",
    value: function isChange(parser, value) {
      return JSON.stringify(parser.rule.value) !== JSON.stringify(value);
    }
  }, {
    key: "onInput",
    value: function onInput(parser, value) {
      if (!this.isNoVal(parser) && this.isChange(parser, parser.toValue(value))) {
        this.$render.clearCache(parser);
        this.setFormData(parser, value);
        this.changeStatus = true;
      }
    }
  }, {
    key: "getParser",
    value: function getParser(id) {
      if (this.fieldList[id]) return this.fieldList[id];else if (this.customData[id]) return this.customData[id];else if (this.parsers[id]) return this.parsers[id];
    }
  }, {
    key: "created",
    value: function created() {
      var vm = this.vm;
      vm.$set(vm, 'buttonProps', this.options.submitBtn);
      vm.$set(vm, 'resetProps', this.options.resetBtn);
      vm.$set(vm, 'formData', this.formData);
      if (this.fCreateApi === undefined) this.fCreateApi = this.fc.drive.getGlobalApi(this, baseApi(this));
      this.fCreateApi.rule = this.rules;
      this.fCreateApi.config = this.options;
    }
  }, {
    key: "addParserWitch",
    value: function addParserWitch(parser) {
      var _this4 = this;

      var vm = this.vm;
      Object.keys(parser.rule).forEach(function (key) {
        if (['field', 'type', 'value', 'vm', 'template', 'name', 'config'].indexOf(key) !== -1 || parser.rule[key] === undefined) return;

        try {
          parser.watch.push(vm.$watch(function () {
            return parser.rule[key];
          }, function (n, o) {
            if (o === undefined) return;
            _this4.watching = true;
            if (key === 'validate') _this4.validate[parser.field] = n;else if (key === 'props') _this4.parseProps(parser.rule);else if (key === 'on') _this4.parseOn(parser.rule);else if (key === 'emit') _this4.margeEmit(parser.rule);

            _this4.$render.clearCache(parser);

            _this4.watching = false;
          }, {
            deep: key !== 'children',
            immediate: true
          }));
        } catch (e) {//
        }
      });
    }
  }, {
    key: "mountedParser",
    value: function mountedParser() {
      var _this5 = this;

      var vm = this.vm;
      Object.keys(this.parsers).forEach(function (id) {
        var parser = _this5.parsers[id];
        if (parser.watch.length === 0) _this5.addParserWitch(parser);
        parser.el = vm.$refs[parser.refName] || {};
        if (parser.defaultValue === undefined) parser.defaultValue = deepExtend({}, {
          value: parser.rule.value
        }).value;
        parser.mounted && parser.mounted();
      });
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var mounted = this.options.mounted;
      this.mountedParser();
      mounted && mounted(this.fCreateApi);
      this.fc.$emit('mounted', this.fCreateApi);
    }
  }, {
    key: "reload",
    value: function reload() {
      var onReload = this.options.onReload;
      this.mountedParser();
      onReload && onReload(this.fCreateApi);
      this.fc.$emit('on-reload', this.fCreateApi);
    }
  }, {
    key: "removeField",
    value: function removeField(parser, value) {
      var id = parser.id,
          field = parser.field,
          index = this.sortList.indexOf(id);
      delParser(parser, value);
      $del(this.parsers, id);

      if (index !== -1) {
        this.sortList.splice(index, 1);
      }

      if (!this.fieldList[field]) {
        $del(this.validate, field);
        $del(this.formData, field);
        $del(this.customData, field);
        $del(this.fieldList, field);
        $del(this.trueData, field);
      }
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

      var parsers = _objectSpread2({}, this.parsers);

      var formData = this.fCreateApi.formData();

      this.__init(rules);

      this.loadRule(rules, false);
      Object.keys(parsers).filter(function (id) {
        return _this6.parsers[id] === undefined;
      }).forEach(function (id) {
        return _this6.removeField(parsers[id], formData[parsers[id].field]);
      });
      this.$render.initOrgChildren();
      this.created();
      vm.$nextTick(function () {
        _this6.reload();
      });
      vm.$f = this.fCreateApi;
      this.$render.clearCacheAll();
      this.refresh();
    }
  }, {
    key: "setFormData",
    value: function setFormData(parser, value) {
      $set(this.formData, parser.field, value);
    }
  }, {
    key: "getFormData",
    value: function getFormData(parser) {
      return this.formData[parser.field];
    }
  }, {
    key: "fields",
    value: function fields() {
      return Object.keys(this.formData);
    }
  }, {
    key: "isNoVal",
    value: function isNoVal(parser) {
      return !parser.isDef;
    }
  }]);

  return Handle;
}();
function delParser(parser, value) {
  parser.watch.forEach(function (unWatch) {
    return unWatch();
  });
  parser.watch = [];
  parser.deleted = true;
  Object.defineProperty(parser.rule, 'value', {
    value: value
  });
}

function parseArray(validate) {
  return Array.isArray(validate) ? validate : [];
}

function defRule() {
  return {
    validate: [],
    col: {},
    emit: [],
    props: {},
    on: {},
    options: [],
    title: undefined,
    value: '',
    field: '',
    name: undefined,
    className: undefined
  };
}

function bindParser(rule, parser) {
  Object.defineProperties(rule, {
    __field__: enumerable(parser.field),
    __fc__: enumerable(parser)
  });
}

var _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
function createFormCreate(drive) {
  var components = {},
      parsers = {},
      maker = makerFactory(),
      globalConfig = drive.getConfig(),
      data = {};

  function setParser(id, parser) {
    id = toString(id);
    parsers[id.toLocaleLowerCase()] = parser;
    FormCreate.maker[id] = creatorFactory(id);
  }

  function createParser() {
    return (
      /*#__PURE__*/
      function (_BaseParser) {
        _inherits(Parser, _BaseParser);

        function Parser() {
          _classCallCheck(this, Parser);

          return _possibleConstructorReturn(this, _getPrototypeOf(Parser).apply(this, arguments));
        }

        return Parser;
      }(BaseParser)
    );
  }

  function component(id, component) {
    id = toString(id);

    var _id = id.toLocaleLowerCase();

    if (_id === 'form-create' || _id === 'formcreate') return get$FormCreate();
    if (component === undefined) return components[id];else components[id] = component;
  }

  function margeGlobal(config, _options) {
    if (isBool(_options.sumbitBtn)) _options.sumbitBtn = {
      show: _options.sumbitBtn
    };
    if (isBool(_options.resetBtn)) _options.resetBtn = {
      show: _options.resetBtn
    };
    var options = deepExtend(config, _options);
    $set(options, 'el', !options.el ? window.document.body : isElement(options.el) ? options.el : document.querySelector(options.el));
    return options;
  }

  function get$FormCreate() {
    return _vue.extend($FormCreate(FormCreate, components));
  }

  function bindAttr(formCreate) {
    extend(formCreate, {
      version: drive.version,
      ui: drive.ui,
      maker: maker,
      component: component,
      setParser: setParser,
      createParser: createParser,
      data: data,
      $form: function $form() {
        return get$FormCreate();
      },
      parseJson: function parseJson$1(json) {
        return parseJson(json);
      }
    });
  }

  function install(Vue, options) {
    if (Vue._installedFormCreate === true) return;
    Vue._installedFormCreate = true;
    if (options && isPlainObject(options)) margeGlobal(globalConfig, options);
    Vue.use(FormCreate);
  }

  function _create(rules, option) {
    var $vm = new _vue({
      data: function data() {
        return {
          rule: rules,
          option: isElement(option) ? {
            el: option
          } : option
        };
      },
      render: function render() {
        var h = arguments[0];
        return h("form-create", _mergeJSXProps([{
          "ref": 'fc'
        }, {
          "props": this.$data
        }]));
      }
    });
    $vm.$mount();
    return $vm;
  }

  var FormCreate =
  /*#__PURE__*/
  function () {
    function FormCreate(rules) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      _classCallCheck(this, FormCreate);

      this.fCreateApi = undefined;
      this.drive = drive;
      this.parsers = parsers;
      this.vm = undefined;
      this.rules = Array.isArray(rules) ? rules : [];
      this.options = margeGlobal(deepExtend({
        formData: {}
      }, globalConfig), options);
    }

    _createClass(FormCreate, [{
      key: "beforeCreate",
      value: function beforeCreate(vm) {
        this.vm = vm;
        this.handle = new Handle(this);
      }
    }, {
      key: "created",
      value: function created() {
        this.handle.created();
      }
    }, {
      key: "api",
      value: function api() {
        return this.handle.fCreateApi;
      }
    }, {
      key: "render",
      value: function render() {
        return this.handle.run();
      }
    }, {
      key: "mounted",
      value: function mounted() {
        this.handle.mounted();
      }
    }, {
      key: "$emit",
      value: function $emit(eventName) {
        var _this$$parent, _this$vm;

        for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          params[_key - 1] = arguments[_key];
        }

        if (this.$parent) (_this$$parent = this.$parent).$emit.apply(_this$$parent, ["fc:".concat(eventName)].concat(params));

        (_this$vm = this.vm).$emit.apply(_this$vm, [eventName].concat(params));
      }
    }], [{
      key: "create",
      value: function create(rules) {
        var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var parent = arguments.length > 2 ? arguments[2] : undefined;

        var $vm = _create(rules, _opt);

        var _this = $vm.$refs.fc.formCreate;
        _this.parent = parent;

        _this.options.el.appendChild($vm.$el);

        return _this.handle.fCreateApi;
      }
    }, {
      key: "install",
      value: function install(Vue) {
        var $formCreate = function $formCreate(rules) {
          var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return FormCreate.create(rules, opt, this);
        };

        bindAttr($formCreate);
        Vue.prototype.$formCreate = $formCreate;
        Vue.component(formCreateName, get$FormCreate());
        _vue = Vue;
      }
    }, {
      key: "init",
      value: function init(rules) {
        var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var $vm = _create(rules, _opt),
            formCreate = $vm.$refs.fc.formCreate;

        return {
          mount: function mount($el) {
            if ($el && isElement($el)) formCreate.options.el = $el;
            formCreate.options.el.appendChild($vm.$el);
            return formCreate.handle.fCreateApi;
          },
          remove: function remove() {
            formCreate.options.el.removeChild($vm.$el);
          },
          destroy: function destroy() {
            this.remove();
            $vm.$destroy();
          },
          $f: formCreate.handle.fCreateApi
        };
      }
    }]);

    return FormCreate;
  }();

  bindAttr(FormCreate);
  drive.components.forEach(function (component) {
    FormCreate.component(component.name, component);
  });
  drive.parsers.forEach(function (_ref) {
    var name = _ref.name,
        parser = _ref.parser;
    FormCreate.setParser(name, parser);
  });
  Object.keys(drive.makers).forEach(function (name) {
    FormCreate.maker[name] = drive.makers[name];
  });
  return {
    FormCreate: FormCreate,
    install: install
  };
}

var BaseForm =
/*#__PURE__*/
function () {
  function BaseForm(handle) {
    _classCallCheck(this, BaseForm);

    this.$handle = handle;
    this.vm = handle.vm;
    this.drive = this.$handle.fc.drive;
    this.options = handle.options;
    this.vNode = new VNode(this.vm);
    this.vData = new VData();
    this.unique = handle.id;
  }

  _createClass(BaseForm, [{
    key: "init",
    value: function init() {
      this.$render = this.$handle.$render;
    }
  }, {
    key: "getGetCol",
    value: function getGetCol(parser) {
      var col = parser.rule.col || {},
          mCol = {},
          pCol = {};
      if (!this.options.global) return col;

      if (this.options.global['*']) {
        mCol = this.options.global['*'].col || {};
      }

      if (this.options.global[parser.type]) {
        pCol = this.options.global[parser.type].col || {};
      }

      col = deepExtend(deepExtend(deepExtend({}, mCol), pCol), col);
      return col;
    }
  }, {
    key: "beforeRender",
    value: function beforeRender() {}
  }, {
    key: "render",
    value: function render() {}
  }, {
    key: "inputVData",
    value: function inputVData() {}
  }]);

  return BaseForm;
}();

export default createFormCreate;
export { BaseForm, BaseParser, Creator, Handle, Render, VData, VNode, _vue as Vue, baseApi, creatorFactory, creatorTypeFactory, makerFactory, parseJson, toJson };
