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
var formCreateStyleElId = 'form-create-style';
var formCreateName = 'FormCreate';

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
        unique: 1,
        obData: {},
        group: {
          rules: {},
          components: {},
          cptData: {},
          buttonProps: {},
          resetProps: {},
          trueData: {},
          jsonData: {}
        }
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

      this._prev = this._data;
      this.init();
      return Object.keys(this._prev).reduce(function (initial, key) {
        if (_this2._prev[key] !== undefined) initial[key] = _this2._prev[key];
        return initial;
      }, {});
    }
  }]);

  return VData;
}();
var keyList = ['ref', 'key', 'slot'];
var objList = ['scopedSlots', 'nativeOn', 'on', 'domProps', 'props', 'attrs', 'index.css'];
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
      this.$handle = handle;
      this.$render = handle.render;
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
    this.cache = {};
  } //TODO 如果是子级,刷新最顶级的组件


  _createClass(Render, [{
    key: "clearCache",
    value: function clearCache(parser) {
      console.log('clear--------cache');
      if (this.cacheStatus(parser)) this.h.refresh();
      this.cache[parser.field] = null;
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
      if (!this.cache[parser.field]) {
        var type = parser.type,
            rule = parser.rule,
            refName = parser.refName,
            key = parser.key,
            form = this.form,
            vn;
        console.log(parser.field, 'rendering');

        if (type === 'template' && rule.template) {
          if (exports.Vue.compile === undefined) {
            console.error('使用的 Vue 版本不支持 compile' + errMsg());
            return [];
          }

          if (isUndef(rule.vm)) rule.vm = new exports.Vue();
          vn = exports.Vue.compile(rule.template, {}).render.call(rule.vm);
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
      var _this2 = this;

      var refName = parser.refName,
          key = parser.key,
          field = parser.field,
          rule = parser.rule;
      this.parserToData(parser);
      var data = parser.vData.ref(refName).key('fc_item' + key);
      if (!custom) data.on('input', function (value) {
        _this2.onInput(parser, value);
      }).props('value', this.h.formData[field]);
      if (isUndef(rule.props.size)) data.props('size', this.h.options.form.size);
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
      return this.vNode[parser.type](this.inputVData(parser), children);
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
      this.obData = {};
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

        Object.defineProperty(parser.rule, 'value', {
          get: function get() {
            return parser.toValue(_this.formData[parser.field]);
          },
          set: function set(value) {
            console.trace('set parser', parser.field, value);

            if (_this.vm._change(parser.field, JSON.stringify(value))) {
              _this.render.clearCache(parser);

              _this.formData[parser.field] = parser.toFormValue(value); ///TODO 待优化

              _this.obData[parser.field].id += 1;
              _this.obData[parser.field].value = value;
            } // this.refresh();

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
      console.log('------------render------------');
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

      this.obData[field] = {
        value: parser.rule.value,
        id: 1
      };
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
      // TODO 实时获取当前 field.value 进行对比
      if (this.vm._change(parser.field, JSON.stringify(parser.toValue(value)))) {
        this.formData[parser.field] = value;
        this.render.clearCache(parser);
      }
    }
  }, {
    key: "created",
    value: function created() {
      console.log('---------created---------');
      var vm = this.vm; // vm.$set(vm, 'obData', this.obData);
      //TODO 可以不加到 vm 中

      vm.$set(vm.group, 'rules', this.rules);
      vm.$set(vm.group, 'trueData', this.trueData);
      vm.$set(vm.group, 'components', this.customData); //^^^^^^^^^^^^^^^^^^^^^

      vm.$set(vm.group, 'buttonProps', this.options.submitBtn);
      vm.$set(vm.group, 'resetProps', this.options.resetBtn);
      vm.$set(vm.group, 'cptData', this.formData);
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
          vm = this.vm; //TODO 首次绑定时会自动触发 watch

      Object.keys(parser.rule).forEach(function (key) {
        if (['field', 'type', 'value'].indexOf(key) !== -1) return;
        parser.watch.push(vm.$watch(function () {
          return parser.rule[key];
        }, function (n, o) {
          if (o === undefined) return; // console.trace(key, 'change');

          _this3.render.clearCache(parser); // this.refresh();

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

        vm.jsonData[field] = JSON.stringify(value); //TODO 更新组件的值
        // vm._changeValue(field, value);
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
    value: function setFormData(parser, value) {
      this.formData[parser.field] = value;
    }
  }, {
    key: "getFormData",
    value: function getFormData(parser) {
      return this.formData[parser.field];
    } // setValue(parser, value) {
    //     $set(parser.rule, 'value', value);
    //     this.vm._changeValue(parser.field, value);
    // }
    //
    // getValue(field) {
    //     return this.vm._value(field);
    // }

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
  //TODO 属性需要预定义,避免在内部定义属性
  // if (isUndef(props.hidden)) $set(props, 'hidden', false);
  // if (isUndef(props.visibility)) $set(props, 'visibility', false);
  // 属性有误直接报错
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

exports.Vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
function createFormCreate(drive) {
  var components = {},
      maker = makerFactory(drive.componentList);
  VNode.use(drive.nodes);

  function setComponent(id, component) {
    if (component) {
      return exports.Vue.component(toString(id), component);
    } else if (id) return components[toString(id)];else return Object.assign({}, components);
  }

  function initStyle() {
    if (document.getElementById(formCreateStyleElId) !== null) return;
    var style = document.createElement('index.css');
    style.id = formCreateStyleElId;
    style.innerText = drive.index;
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
        var $fCreate = Vue.extend(coreComponent(this, components)),
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
            $vm = fComponent.mount(exports.Vue);
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

  components['form-create'] = exports.Vue.extend($FormCreate(FormCreate, components));
  return {
    FormCreate: FormCreate,
    install: install
  };
}

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
