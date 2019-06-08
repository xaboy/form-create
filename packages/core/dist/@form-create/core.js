/*!
 * @form-create/core v0.0.1
 * (c) 2018-2019 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

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
  Vue.nextTick(fn);
}
function $set(target, field, value) {
  Vue.set(target, field, value);
}
function $del(target, field) {
  Vue["delete"](target, field);
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
var formCreateName = 'FormCreate';

function getMixins(components) {
  return {
    data: function data() {
      return {
        rules: {},
        components: {},
        formData: {},
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
    beforeDestroy: function beforeDestroy() {
      this._fc.handle.reloadRule([]);
    },
    mounted: function mounted() {
      var _this = this;

      this._fc.handle.mounted();

      this.$watch('option', function () {
        $nt(function () {
          _this._refresh();
        });
      }, {
        deep: true
      });
    }
  };
}

function coreComponent(fc, components) {
  return {
    name: "".concat(formCreateName, "Core"),
    mixins: [getMixins(components)],
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
      this.$watch('rules', function (n) {
        fc.handle.reloadRule(n);
      });
    }
  };
}

function $FormCreate(formCreate, components) {
  return {
    name: formCreateName,
    mixins: [getMixins(components)],
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
      this.$watch('rule', function (n) {
        _fc.handle.reloadRule(n);

        _this.$emit('input', _this.$f);
      });
      this.$emit('input', this.$f);
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
      var _this2 = this;

      var data = Object.keys(this._data).reduce(function (initial, key) {
        var value = _this2._data[key];
        if (value === undefined) return initial;
        if (Array.isArray(value) && !value.length) return initial;
        if (!Object.keys(value).length) return initial;
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
    emitPrefix: undefined
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
    }); // this.rule = extend(baseRule(), {type, title, field, value});
    // this.props({hidden: false, visibility: false});

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
    key: "value",
    value: function value(_value) {
      $set(this._data, 'value', _value);
      return this;
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
var keyAttrs = ['emitPrefix', 'className', 'defaultSlot'];
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
    this.form = handle.$form;
    this.vNode = new VNode(this.vm);
    this.vData = new VData();
    this.cache = {};
    this.renderList = {};
  }

  _createClass(Render, [{
    key: "clearCache",
    value: function clearCache(parser) {
      console.log('clear--------cache');
      if (this.cacheStatus(parser)) this.$handle.refresh();
      this.cache[parser.field] = null;
    }
  }, {
    key: "clearCacheAll",
    value: function clearCacheAll() {
      this.cache = {};
    }
  }, {
    key: "setCache",
    value: function setCache(parser, vnode) {
      this.cache[parser.field] = {
        vnode: vnode,
        use: false
      };
    }
  }, {
    key: "cacheStatus",
    value: function cacheStatus(parser) {
      return this.cache[parser.field] && this.cache[parser.field].use === true;
    }
  }, {
    key: "getCache",
    value: function getCache(parser) {
      var cache = this.cache[parser.field];
      cache.use = true;
      return cache.vnode;
    }
  }, {
    key: "initOrgChildren",
    value: function initOrgChildren() {
      var parsers = this.$handle.parsers;
      this.orgChildren = Object.keys(parsers).reduce(function (initial, id) {
        var children = parsers[id].children;
        initial[id] = isValidChildren(children) ? children : [];
        return initial;
      }, {});
    }
  }, {
    key: "getParser",
    value: function getParser(id) {
      return this.$handle.parsers[id];
    }
  }, {
    key: "run",
    value: function run() {
      var _this = this;

      if (!this.vm.isShow) return;
      this.form.beforeRender();
      var vn = this.$handle.sortList.map(function (id) {
        var parser = _this.getParser(id);

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
      var _this2 = this;

      if (!this.cache[parser.field] || parser.type === 'template') {
        var type = parser.type,
            rule = parser.rule,
            key = parser.key,
            form = this.form,
            vn;
        console.log(parser.field, 'rendering');

        if (type === 'template' && rule.template) {
          if (exports.Vue.compile === undefined) {
            console.error('使用的 Vue 版本不支持 compile' + errMsg());
            return [];
          }

          if (!this.renderList[parser.id]) {
            if (isUndef(rule.vm)) rule.vm = new exports.Vue();
            this.renderList[parser.id] = exports.Vue.compile(rule.template);
            rule.vm.$on('input', function (value) {
              _this2.onInput(parser, value);
            });
          }

          vn = this.renderList[parser.id].render.call(rule.vm);
          if (vn.data === undefined) vn.data = {};
          vn.key = key;

          if (isChild) {
            this.setCache(parser, vn);
            return vn;
          }
        } else if (!this.$handle.isNoVal(parser)) {
          var children = this.renderChildren(parser);
          vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
        } else {
          vn = this.vNode.make(type, this.inputVData(parser), this.renderChildren(parser));

          if (isChild) {
            this.setCache(parser, vn);
            return vn;
          }
        }

        var cache = form.container(vn, parser);
        this.setCache(parser, cache);
        return cache;
      }

      return this.getCache(parser); // return form.container(vn, parser);
    }
  }, {
    key: "parserToData",
    value: function parserToData(parser) {
      Object.keys(parser.vData._data).forEach(function (key) {
        if (parser.rule[key] !== undefined) parser.vData[key](parser.rule[key]);
      });
      return parser.vData;
    }
  }, {
    key: "inputVData",
    value: function inputVData(parser, custom) {
      var _this3 = this;

      var refName = parser.refName,
          key = parser.key,
          rule = parser.rule;
      this.parserToData(parser);
      var data = parser.vData.ref(refName).key('fc_item' + key);
      if (!custom) data.on('input', function (value) {
        _this3.onInput(parser, value);
      }).props('value', this.$handle.getFormData(parser));
      if (isUndef(rule.props.size)) data.props('size', this.$handle.options.form.size);
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
        orgChildren.forEach(function (_rule) {
          _this4.removeField(_rule.__field__);
        });
        this.orgChildren[parser.id] = [];
        return [];
      }

      this.orgChildren[parser.id].forEach(function (child) {
        if (children.indexOf(child) === -1) {
          _this4.removeField(child.__field__);
        }
      });
      return children.map(function (child) {
        if (isString(child)) return child;

        if (child.__fc__) {
          return _this4.renderParser(child.__fc__, true);
        }

        $de(function () {
          return _this4.$handle.fc.reload();
        });
      });
    }
  }, {
    key: "defaultRender",
    value: function defaultRender(parser, children) {
      return this.vNode[parser.type] ? this.vNode[parser.type](this.inputVData(parser), children) : this.vNode.make(parser.type, this.inputVData(parser), children);
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
        options = fc.options;
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

        Object.defineProperty(parser.rule, 'value', {
          get: function get() {
            return parser.toValue(_this.getFormData(parser));
          },
          set: function set(value) {
            console.log('set parser', parser.field, value);

            if (_this.isChange(parser, value)) {
              _this.$render.clearCache(parser);

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
      Object.keys(def).forEach(function (k) {
        if (isUndef(rule[k])) $set(rule, k, def[k]);
      });
      var parseRule = {
        col: parseCol(rule.col),
        validate: parseArray(rule.validate),
        options: parseArray(rule.options)
      };
      parseRule.on = parseOn(rule.on, this.parseEmit(rule));
      Object.keys(parseRule).forEach(function (k) {
        $set(rule, k, parseRule[k]);
      });
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
      console.log(this.id, '------------render------------');
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

      if (this.isNoVal(parser)) {
        if (name) $set(this.customData, name, rule);
        return;
      }

      this.fieldList[field] = parser;
      $set(this.formData, field, parser.toFormValue(rule.value));
      $set(this.validate, field, rule.validate);
      $set(this.trueData, field, rule);
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
        this.formData[parser.field] = value;
      }
    }
  }, {
    key: "created",
    value: function created() {
      console.log('---------created---------');
      var vm = this.vm; //TODO 可以不加到 vm 中
      // vm.$set(vm, 'rules', this.rules);
      // vm.$set(vm, 'trueData', this.trueData);
      // vm.$set(vm, 'components', this.customData);
      //^^^^^^^^^^^^^^^^^^^^^

      vm.$set(vm, 'buttonProps', this.options.submitBtn);
      vm.$set(vm, 'resetProps', this.options.resetBtn);
      vm.$set(vm, 'formData', this.formData);
      if (this.fCreateApi === undefined) this.fCreateApi = this.fc.drive.getGlobalApi(this);
      this.fCreateApi.rule = this.rules;
      this.fCreateApi.config = this.options;
    }
  }, {
    key: "addParserWitch",
    value: function addParserWitch(parser) {
      var _this3 = this;

      if (this.isNoVal(parser)) return;
      console.log('---------mountedParser---------', parser.field);
      var vm = this.vm;
      Object.keys(parser.rule).forEach(function (key) {
        if (['field', 'type', 'value', 'vm', 'template'].indexOf(key) !== -1 || parser.rule[key] === undefined) return;
        parser.watch.push(vm.$watch(function () {
          return parser.rule[key];
        }, function (n, o) {
          if (o === undefined) return;

          _this3.$render.clearCache(parser);

          console.log(key, ' -------------- change');
        }, {
          deep: true,
          immediate: true
        }));
      });
    }
  }, {
    key: "mountedParser",
    value: function mountedParser() {
      var _this4 = this;

      console.log('---------mountedParser---------');
      var vm = this.vm;
      Object.keys(this.parsers).forEach(function (id) {
        var parser = _this4.parsers[id];
        if (parser.watch.length === 0) _this4.addParserWitch(parser);
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
      this.fc.$emit('reload', this.fCreateApi);
    }
  }, {
    key: "removeField",
    value: function removeField(parser) {
      var id = parser.id,
          field = parser.field,
          index = this.sortList.indexOf(id);
      delParser(parser);
      $del(this.parsers, id);
      $del(this.validate, field);

      if (index !== -1) {
        this.sortList.splice(index, 1);
      }

      $del(this.formData, field);
      $del(this.customData, field);
      $del(this.trueData, field);
    }
  }, {
    key: "refresh",
    value: function refresh() {
      this.vm._refresh();
    }
  }, {
    key: "reloadRule",
    value: function reloadRule(rules) {
      var _this5 = this;

      var vm = this.vm;
      if (!rules) return this.reloadRule(this.rules);
      if (!this.origin.length) this.fCreateApi.refresh();
      this.origin = _toConsumableArray(rules);
      var parsers = Object.assign({}, this.parsers);

      this.__init(rules);

      this.loadRule(rules, false);
      Object.keys(parsers).filter(function (id) {
        return _this5.parsers[id] === undefined;
      }).forEach(function (id) {
        return _this5.removeField(parsers[id]);
      });
      this.$render.initOrgChildren();
      this.created();
      $nt(function () {
        _this5.reload();
      });
      vm.$f = this.fCreateApi;
      this.$render.clearCacheAll();
      this.refresh();
    }
  }, {
    key: "setFormData",
    value: function setFormData(parser, value) {
      this.formData[parser.field] = value;
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
      return !parser.isDef;
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
  Object.defineProperty(parser.rule, 'value', {
    value: extend({}, {
      value: parser.rule.value
    }).value
  });
}

function parseOn(on, emitEvent) {
  if (Object.keys(emitEvent).length > 0) extend(on, emitEvent);
  return on;
}

function parseArray(validate) {
  return Array.isArray(validate) ? validate : [];
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

exports.Vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
function createFormCreate(drive) {
  var components = {},
      parsers = {},
      maker = makerFactory();

  function setParser(id, parser) {
    id = toString(id);
    parsers[id.toLocaleLowerCase()] = parser;
    FormCreate.maker[id] = creatorFactory(id);
  }

  function component(id, component) {
    id = toString(id);

    var _id = id.toLocaleLowerCase();

    if (_id === 'form-create' || _id === 'formcreate') return exports.Vue.extend($FormCreate(FormCreate, components));
    if (component === undefined) return components[toString(id)];else components[toString(id)] = component;
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

  function bindAttr(FormCreate) {
    extend(FormCreate, {
      version: drive.version,
      ui: drive.ui,
      maker: maker,
      component: component,
      setParser: setParser
    });
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
      this.options = margeGlobal(options);
    }

    _createClass(FormCreate, [{
      key: "beforeCreate",
      value: function beforeCreate(vm) {
        this.vm = vm;
        this.handle = new Handle(this);
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
      value: function create(rule) {
        var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var $vm = new exports.Vue({
          data: function data() {
            return {
              rule: rule,
              option: isElement(_opt) ? {
                el: _opt
              } : _opt
            };
          },
          render: function render() {
            return React.createElement("form-create", {
              ref: "fc",
              props: this.$data
            });
          }
        });
        $vm.$mount();

        $vm.$refs.fc._fc.options.el.appendChild($vm.$el);

        return $vm.$refs.fc._fc.handle.fCreateApi;
      }
    }, {
      key: "install",
      value: function install(Vue) {
        var $formCreate = function $formCreate(rules) {
          var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return FormCreate.create(rules, opt);
        };

        bindAttr($formCreate);
        Vue.prototype.$formCreate = $formCreate;
        Vue.component(formCreateName, Vue.extend($FormCreate(FormCreate, components)));
        exports.Vue = Vue;
      }
    }, {
      key: "init",
      value: function init(rules) {
        var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var opt = isElement(_opt) ? {
          el: _opt
        } : _opt;
        var fComponent = new FormCreate(rules, opt);

        var $fCreate = exports.Vue.extend(coreComponent(fComponent, components));

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
  }(); // FormCreate.version = drive.version;
  // FormCreate.ui = drive.ui;
  // FormCreate.component = component;
  // FormCreate.maker = maker;
  // FormCreate.setParser = setParser;


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

  function install(Vue) {
    if (Vue._installedFormCreate === true) return;
    Vue._installedFormCreate = true;
    Vue.use(FormCreate);
  }

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
    key: "beforeRender",
    value: function beforeRender() {}
  }, {
    key: "render",
    value: function render() {}
  }]);

  return BaseForm;
}();

exports.BaseForm = BaseForm;
exports.BaseParser = BaseParser;
exports.Creator = Creator;
exports.Handle = Handle;
exports.Render = Render;
exports.VData = VData;
exports.VNode = VNode;
exports.creatorFactory = creatorFactory;
exports.creatorTypeFactory = creatorTypeFactory;
exports.default = createFormCreate;
exports.makerFactory = makerFactory;
