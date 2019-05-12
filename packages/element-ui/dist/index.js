/*!
 * @form-create/element-ui v0.0.1
 * (c) 2018-2019 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue$1 = _interopDefault(require('vue'));

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

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = _getPrototypeOf(object);
    if (object === null) break;
  }

  return object;
}

function _get(target, property, receiver) {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get;
  } else {
    _get = function _get(target, property, receiver) {
      var base = _superPropBase(target, property);

      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);

      if (desc.get) {
        return desc.get.call(receiver);
      }

      return desc.value;
    };
  }

  return _get(target, property, receiver || target);
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

console.log(Vue$1);
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
    switchMaker: true
  };
}
var formCreateStyleElId = 'form-create-style';
var formCreateName = 'FormCreate';

function coreComponent(fComponent, mixin) {
  return {
    name: "".concat(formCreateName, "Core"),
    mixins: [mixin],
    render: function render() {
      return fComponent.render();
    },
    beforeCreate: function beforeCreate() {
      this._fComponent = fComponent;
      fComponent._type = 'rules';
      fComponent.beforeBoot(this);
    },
    created: function created() {
      fComponent.boot();
      this.$f = fComponent.fCreateApi;
    },
    mounted: function mounted() {
      var _this = this;

      fComponent.mounted(this);
      this.$watch('rules', function (n) {
        _this._fComponent.reload(n);
      });
      this.$watch('option', function (n) {
        $nt(function () {
          _this._sync();
        });
      }, {
        deep: true
      });

      this.__init();
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
      return this._fComponent.render();
    },
    beforeCreate: function beforeCreate() {
      var _this$$options$propsD = this.$options.propsData,
          rule = _this$$options$propsD.rule,
          option = _this$$options$propsD.option;

      var _fc = new formCreate(rule, option);

      this._fComponent = _fc;
      _fc._type = 'rule';

      _fc.beforeBoot(this);
    },
    created: function created() {
      var _fc = this._fComponent;

      _fc.boot();

      this.$f = _fc.fCreateApi;
      this.$emit('input', _fc.fCreateApi);
    },
    mounted: function mounted() {
      var _this = this;

      var _fc = this._fComponent;

      _fc.mounted(this);

      this.$watch('rule', function (n) {
        _fc.reload(n);

        _this.$emit('input', _this.$f);
      });
      this.$watch('option', function (n) {
        $nt(function () {
          _this._sync();
        });
      }, {
        deep: true
      });

      this.__init();

      this.$emit('input', this.$f);
    }
  };
}

var Handler =
/*#__PURE__*/
function () {
  function Handler(vm, _rule, Render, options, noValue) {
    _classCallCheck(this, Handler);

    var rule = parseRule(_rule, vm, noValue);
    this.rule = rule;
    this.noValue = noValue;
    this.type = toString(rule.type).toLowerCase();
    this.isDef = true;
    this.vm = vm;
    this.el = {};
    this.watch = [];
    this.root = [];
    this.orgChildren = [];

    if (!rule.field && noValue) {
      this.field = '_def_' + uniqueId();
      this.isDef = false;
    } else {
      this.field = rule.field;
    }

    this.init();
    var id = uniqueId();
    this.id = id;
    this.unique = 'fc_' + id;
    this.key = 'key_' + id;
    this.refName = '__' + this.field + this.id;
    if (isUndef(rule.props.elementId)) $set(rule.props, 'elementId', this.unique);
    this.refresh();
    this.render = new Render(vm, this, options);
  }

  _createClass(Handler, [{
    key: "refresh",
    value: function refresh() {
      var rule = this.rule;
      this.parseValue = this.toFormValue(rule.value);
      this.orgChildren = isValidChildren(rule.children) ? _toConsumableArray(rule.children) : [];
      this.deleted = false;
      return this;
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
    value: function toValue(parseValue) {
      return parseValue;
    }
  }, {
    key: "setValue",
    value: function setValue(value) {
      this.rule.value = value;

      this.vm._changeValue(this.field, value);
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.vm._value(this.field);
    }
  }, {
    key: "watchValue",
    value: function watchValue(n) {
      $set(this.rule, 'value', n);

      this.vm._changeFormData(this.field, this.toFormValue(n));
    }
  }, {
    key: "watchFormValue",
    value: function watchFormValue(n) {}
  }, {
    key: "reset",
    value: function reset() {
      this.vm._changeValue(this.field, this.defaultValue);

      this.clearMsg();
    }
  }, {
    key: "clearMsg",
    value: function clearMsg() {
      var refName = 'fItem' + this.refName,
          fItem = this.vm.$refs[refName];

      if (fItem) {
        fItem.validateMessage = '';
        fItem.validateState = '';
        fItem.validateDisabled = true;
      }
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var refName = 'fItem' + this.refName,
          vm = this.vm;
      this.el = vm.$refs[this.refName] || {};
      if (this.defaultValue === undefined) this.defaultValue = this.toValue(vm.$refs[refName] && !isUndef(vm.$refs[refName].initialValue) ? vm.$refs[refName].initialValue : deepExtend({}, {
        value: this.rule.value
      }).value);
    }
  }, {
    key: "$emit",
    value: function $emit(eventName) {
      var _this$rule$vm, _this$el;

      eventName = "fc:".concat(eventName);

      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }

      if (this.type === 'template' && this.rule.template) (_this$rule$vm = this.rule.vm).$emit.apply(_this$rule$vm, [eventName].concat(params));else if (this.noValue === true && this.el.$emit) (_this$el = this.el).$emit.apply(_this$el, [eventName].concat(params));
    }
  }]);

  return Handler;
}();

function defRule() {
  return {
    validate: [],
    event: {},
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

function parseRule(rule, vm, noVal) {
  var def = defRule();
  Object.keys(def).forEach(function (k) {
    if (isUndef(rule[k])) $set(rule, k, def[k]);
  });
  var parseRule = {
    col: parseCol(rule.col),
    props: parseProps(rule.props),
    emitEvent: parseEmit(rule.field, rule.emitPrefix, rule.emit, vm),
    validate: parseArray(rule.validate),
    options: parseArray(rule.options)
  };
  parseRule.event = extend(parseEvent(rule.event), parseRule.emitEvent);
  parseRule.on = parseOn(rule.on, parseRule.emitEvent);
  Object.keys(parseRule).forEach(function (k) {
    $set(rule, k, parseRule[k]);
  });

  if (!rule.field && !noVal) {
    console.error('规则的 field 字段不能空' + errMsg());
  }

  return rule;
}

function parseOn(on, emitEvent) {
  if (Object.keys(emitEvent).length > 0) extend(on, emitEvent);
  return on;
}

function parseArray(validate) {
  return Array.isArray(validate) ? validate : [];
}

function parseEmit(field, emitPrefix, emit, vm) {
  var event = {};
  if (!Array.isArray(emit)) return event;
  emit.forEach(function (eventName) {
    var fieldKey = toLine("".concat(field, "-").concat(eventName)).replace('_', '-');
    var emitKey = emitPrefix ? "".concat(emitPrefix, "-").toLowerCase() + toLine(eventName) : emitPrefix;

    event[eventName] = function () {
      for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        arg[_key2] = arguments[_key2];
      }

      vm.$emit.apply(vm, [fieldKey].concat(arg));
      if (emitKey && fieldKey !== emitKey) vm.$emit.apply(vm, [emitKey].concat(arg));
    };

    event["on-".concat(eventName)] = event[eventName];
  });
  return event;
}

function parseEvent(event) {
  Object.keys(event).forEach(function (eventName) {
    var _name = toString(eventName).indexOf('on-') === 0 ? eventName : "on-".concat(eventName);

    if (_name !== eventName) {
      $set(event, _name, event[eventName]);
    }
  });
  return event;
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

    this.setVm(vm);
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

var $de = debounce(function (fn) {
  return fn();
}, 1);

var Render =
/*#__PURE__*/
function () {
  function Render(vm, handler) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    _classCallCheck(this, Render);

    this.vm = vm;
    this.handler = handler;
    this.options = options;
    this.vNode = new VNode(vm);
    this.vData = new VData();
    this.cache = null;
    this.$tickEvent = [];
    this.init();
  }

  _createClass(Render, [{
    key: "init",
    value: function init() {}
  }, {
    key: "cacheParse",
    value: function cacheParse(form, _super) {
      var _this$handler = this.handler,
          noValue = _this$handler.noValue,
          noCache = _this$handler.noCache;
      if (!this.cache || noValue === true || noCache === true) this.cache = _super ? Render.prototype.parse.call(this, form) : this.parse(form);

      var eventList = _toConsumableArray(this.$tickEvent);

      this.$tickEvent = [];
      if (eventList.length) $nt(function () {
        eventList.forEach(function (event) {
          return event();
        });
      });
      return this.cache;
    }
  }, {
    key: "sync",
    value: function sync(event) {
      if (isFunction(event)) this.$tickEvent.push(event);
      this.clearCache();

      this.vm._sync();
    }
  }, {
    key: "clearCache",
    value: function clearCache() {
      this.cache = null;
      var children = this.handler.rule.children;
      if (isValidChildren(children)) children.forEach(function (child) {
        return !isString(child) && child.__handler__.render.clearCache();
      });
    }
  }, {
    key: "childrenParse",
    value: function childrenParse(form) {
      var _this$handler2 = this.handler,
          rule = _this$handler2.rule,
          orgChildren = _this$handler2.orgChildren,
          vm = _this$handler2.vm,
          children = rule.children,
          vn = [];

      if (isValidChildren(children)) {
        orgChildren.forEach(function (_rule) {
          if (children.indexOf(_rule) === -1) {
            vm._fComponent.removeField(_rule.__field__);
          }
        });
        vn = children.map(function (child) {
          if (isString(child)) return [child];

          if (child.__handler__) {
            return child.__handler__.render.cacheParse(form, true);
          }

          $de(function () {
            return vm._fComponent.reload();
          });
        });
        this.handler.orgChildren = _toConsumableArray(children);
      } else if (orgChildren.length > 0) {
        orgChildren.forEach(function (_rule) {
          vm._fComponent.removeField(_rule.__field__);
        });
        this.handler.orgChildren = [];
      }

      return vn;
    }
  }, {
    key: "parse",
    value: function parse(form) {
      var _this$handler3 = this.handler,
          type = _this$handler3.type,
          rule = _this$handler3.rule,
          refName = _this$handler3.refName,
          key = _this$handler3.key,
          noValue = _this$handler3.noValue;

      if (type === 'template' && rule.template) {
        if (_vue.compile === undefined) {
          console.error('使用的 Vue 版本不支持 compile' + errMsg());
          return [];
        }

        if (isUndef(rule.vm)) rule.vm = new _vue();
        var vn = _vue.compile(rule.template, {}).render.call(rule.vm);
        if (vn.data === undefined) vn.data = {};
        extend(vn.data, rule);
        vn.key = key;
        return [vn];
      } else if (!noValue) {
        return form.makeComponent(this.handler.render);
      } else {
        rule.ref = refName;
        if (isUndef(rule.key)) rule.key = 'def' + uniqueId();

        var _vn = this.vNode.make(type, Object.assign({}, rule), this.childrenParse(form));

        _vn.key = key;
        return [_vn];
      }
    }
  }, {
    key: "inputProps",
    value: function inputProps() {
      var _this = this;

      var _this$handler4 = this.handler,
          refName = _this$handler4.refName,
          key = _this$handler4.key,
          field = _this$handler4.field,
          rule = _this$handler4.rule;
      var props = rule.props,
          event = rule.event;
      Object.keys(this.vData._data).forEach(function (key) {
        if (rule[key] !== undefined) _this.vData[key](rule[key]);
      });
      var data = this.vData.props({
        value: this.vm._formData(field)
      }).ref(refName).key(key + 'fc' + field).on(event).on('input', function (value) {
        _this.onInput(value);
      });
      if (isUndef(props.size)) data.props({
        size: this.options.form.size
      });
      return data;
    }
  }, {
    key: "onInput",
    value: function onInput(value) {
      value = isUndef(value) ? '' : value;
      var handler = this.handler,
          _this$handler5 = this.handler,
          field = _this$handler5.field,
          vm = _this$handler5.vm,
          trueValue = handler.toValue(value);

      vm._changeFormData(field, value);

      if (!vm._change(field, JSON.stringify(trueValue))) return;
      handler.setValue(trueValue);
      handler.watchFormValue(value);
    }
  }]);

  return Render;
}();
function defaultRenderFactory(node) {
  var setKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return (
    /*#__PURE__*/
    function (_Render) {
      _inherits(render, _Render);

      function render() {
        _classCallCheck(this, render);

        return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
      }

      _createClass(render, [{
        key: "parse",
        value: function parse(form) {
          var props = this.inputProps();
          if (setKey) props.key(this.handler.key);
          return [this.vNode[node](props.get(), this.childrenParse(form))];
        }
      }]);

      return render;
    }(Render)
  );
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
        if (Object.keys(this.cptData).indexOf(field) !== -1) this.$set(this.cptData, field, value);
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
      __init: function __init() {},
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
      this._fComponent.reload([]);
    }
  };
}

console.log("ele");
var _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue$1;
function getDefComponent() {
  return {
    handler: Handler,
    render: Render,
    noValue: true
  };
}
function getRule(rule) {
  if (isFunction(rule.getRule)) return rule.getRule();else return rule;
}
function bindHandler(rule, handler) {
  Object.defineProperties(rule, {
    __field__: {
      value: handler.field,
      enumerable: false,
      configurable: false
    },
    __handler__: {
      value: handler,
      enumerable: false,
      configurable: false
    }
  });
}
function delHandler(handler) {
  handler.watch.forEach(function (unWatch) {
    return unWatch();
  });
  handler.watch = [];
  handler.deleted = true;
}
function createFormCreate(drive) {
  var components = {},
      version = drive.version,
      // TODO:
  // ui = dirve.name,
  ui = '',
      mixin = getMixins(components);

  function setComponent(id, component) {
    if (component) {
      return _vue.component(toString(id), component);
    } else if (id) return components[toString(id)];else return Object.assign({}, components);
  }

  function getComponent(vm, rule, createOptions) {
    var name = toString(rule.type).toLowerCase(),
        component = isComponent(name) ? drive.componentList[name] : getDefComponent();
    return new component.handler(vm, rule, component.render, createOptions, component.noValue);
  }

  function isComponent(type) {
    return drive.componentList[type] !== undefined;
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

      this.fRender = undefined;
      this.fCreateApi = undefined;
      this.$parent = undefined;
      this.id = uniqueId();
      this.validate = {};

      this.__init(rules, options);

      initStyle();
      this.$tick = debounce(function (fn) {
        return fn();
      }, 150);
    }

    _createClass(FormCreate, [{
      key: "__init",
      value: function __init(rules, options) {
        this.options = margeGlobal(options);
        this.rules = Array.isArray(rules) ? rules : [];
        this.origin = _toConsumableArray(this.rules);
        this.handlers = {};
        this.formData = {};
        this.trueData = {};
        this.components = {};
        this.fieldList = [];
        this.switchMaker = this.options.switchMaker;
      }
    }, {
      key: "render",
      value: function render() {
        return this.fRender.render(this.vm);
      }
    }, {
      key: "beforeBoot",
      value: function beforeBoot(vm) {
        this.vm = vm;
        this.createHandler(this.rules);
        this.fRender = new drive.formRender(this);
      }
    }, {
      key: "boot",
      value: function boot() {
        var vm = this.vm;
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        vm.$set(vm, 'components', this.components);
        if (this.fCreateApi === undefined) this.fCreateApi = drive.getGlobalApi(this);
        this.fCreateApi.rule = this.rules;
        this.fCreateApi.config = this.options;
      }
    }, {
      key: "setHandler",
      value: function setHandler(handler) {
        var rule = handler.rule,
            field = handler.field,
            isDef = handler.isDef;
        this.handlers[field] = handler;

        if (handler.noValue === true) {
          if (isDef === true) $set(this.components, field, rule);
          return;
        }

        $set(this.formData, field, handler.parseValue);
        $set(this.validate, field, rule.validate);
        $set(this.trueData, field, rule);
      }
    }, {
      key: "notField",
      value: function notField(field) {
        return this.handlers[field] === undefined;
      }
    }, {
      key: "createHandler",
      value: function createHandler(rules, child) {
        var _this = this;

        rules.map(function (_rule, index) {
          if (child && isString(_rule)) return;
          if (!_rule.type) return console.error("\u672A\u5B9A\u4E49\u751F\u6210\u89C4\u5219\u7684 type \u5B57\u6BB5" + errMsg());
          var rule = getRule(_rule),
              handler;

          if (_rule.__handler__) {
            handler = _rule.__handler__;
            if (handler.vm !== _this.vm && !handler.deleted) return console.error("\u7B2C".concat(index + 1, "\u6761\u89C4\u5219\u6B63\u5728\u5176\u4ED6\u7684 <form-create> \u4E2D\u4F7F\u7528") + errMsg());
            handler.vm = _this.vm;
            handler.render.vm = _this.vm;
            handler.render.vNode.setVm(_this.vm);
            handler.refresh();
          } else {
            handler = getComponent(_this.vm, rule, _this.options);
          }

          var children = handler.rule.children;
          if (!_this.notField(handler.field)) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());

          if (_this.switchMaker) {
            rules[index] = rule;
            if (!child) _this.origin[index] = rule;
            _rule = rule;
          }

          _this.setHandler(handler);

          if (!_rule.__handler__) {
            bindHandler(_rule, handler);
          }

          if (isValidChildren(children)) _this.createHandler(children, true);
          if (!child) _this.fieldList.push(handler.field);
          return handler;
        }).filter(function (h) {
          return h;
        }).forEach(function (h) {
          h.root = rules;
        });
        return rules;
      }
    }, {
      key: "create",
      value: function create(Vue) {
        var $fCreate = Vue.extend(coreComponent(this)),
            $vm = new $fCreate().$mount();
        this.options.el.appendChild($vm.$el);
        return $vm;
      }
    }, {
      key: "mounted",
      value: function mounted(vm) {
        var _this2 = this;

        var first = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
        this.vm = vm;
        var _this$options = this.options,
            mounted = _this$options.mounted,
            onReload = _this$options.onReload;
        Object.keys(this.handlers).forEach(function (field) {
          var handler = _this2.handlers[field];
          if (handler.watch.length === 0) _this2.addHandlerWatch(handler);
          handler.mounted();
        });
        Object.keys(vm.cptData).forEach(function (field) {
          var value = _this2.handlers[field].toValue(vm.cptData[field]);

          vm.jsonData[field] = JSON.stringify(value);

          vm._changeValue(field, value);
        });

        if (first) {
          mounted && mounted(this.fCreateApi);
          this.$emit('mounted', this.fCreateApi);
        }

        onReload && onReload(this.fCreateApi);
        this.$emit('reload', this.fCreateApi);
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
    }, {
      key: "removeField",
      value: function removeField(field) {
        if (this.handlers[field] === undefined) return;
        var index = this.fieldList.indexOf(field);
        delHandler(this.handlers[field]);
        $del(this.handlers, field);
        $del(this.validate, field);

        if (index !== -1) {
          this.fieldList.splice(index, 1);
        }

        this.vm._removeField(field);
      }
    }, {
      key: "addHandlerWatch",
      value: function addHandlerWatch(handler) {
        var _this3 = this;

        if (handler.noValue === true) return;
        var field = handler.field,
            vm = this.vm;
        var unWatch = vm.$watch(function () {
          return vm.cptData[field];
        }, function (n) {
          if (_this3.handlers[field] === undefined) return delHandler(handler);
          var trueValue = handler.toValue(n),
              json = JSON.stringify(trueValue);

          if (vm._change(field, json)) {
            handler.setValue(trueValue);
            handler.watchFormValue(n);
          }
        }, {
          deep: true
        });
        var unWatch2 = vm.$watch(function () {
          return vm.trueData[field].value;
        }, function (n) {
          if (n === undefined) return;
          if (_this3.handlers[field] === undefined) return delHandler(handler);
          var json = JSON.stringify(n);

          if (vm._change(field, json)) {
            handler.watchValue(n);
            $nt(function () {
              return handler.render.sync();
            });
          }
        }, {
          deep: true
        });
        handler.watch.push(unWatch, unWatch2);

        var bind = function bind() {
          if (_this3.handlers[field] === undefined) delHandler(handler);else _this3.$tick(function () {
            return handler.render.sync();
          });
        };

        Object.keys(vm._trueData(field)).forEach(function (key) {
          if (key === 'value') return;
          handler.watch.push(vm.$watch(function () {
            return vm.trueData[field][key];
          }, bind, {
            deep: true
          }));
        });
      }
    }, {
      key: "reload",
      value: function reload(rules) {
        var _this4 = this;

        var vm = this.vm;
        if (!rules) return this.reload(this.rules);
        if (!this.origin.length) this.fCreateApi.refresh();
        this.origin = _toConsumableArray(rules);
        Object.keys(this.handlers).forEach(function (field) {
          return _this4.removeField(field);
        });

        this.__init(rules, this.options);

        this.beforeBoot(vm);
        this.boot();

        vm.__init();

        $nt(function () {
          _this4.mounted(vm, false);
        });
        vm.$f = this.fCreateApi;
      }
    }, {
      key: "getFormRef",
      value: function getFormRef() {
        return this.vm.$refs[this.fRender.refName];
      }
    }], [{
      key: "create",
      value: function create(rules) {
        var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var $parent = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
        var opt = isElement(_opt) ? {
          el: _opt
        } : _opt;
        var fComponent = new FormCreate(rules, opt),
            $vm = fComponent.create(_vue);
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

        $formCreate.maker = FormCreate.maker;
        $formCreate.version = version;
        $formCreate.ui = ui;
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

  FormCreate.version = version;
  FormCreate.ui = ui;
  FormCreate.component = setComponent;

  function install(Vue) {
    if (Vue._installedFormCreate === true) return;
    Vue._installedFormCreate = true;
    Vue.use(FormCreate);
  }

  components['form-create'] = _vue.extend($FormCreate(FormCreate, mixin)); //

  drive.install(FormCreate);
  return {
    FormCreate: FormCreate,
    install: install
  };
}

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

var Form =
/*#__PURE__*/
function () {
  function Form(fComponent) {
    _classCallCheck(this, Form);

    var id = fComponent.id,
        vm = fComponent.vm,
        fieldList = fComponent.fieldList,
        handlers = fComponent.handlers;
    this.vm = vm;
    this.handlers = handlers;
    this.renderSort = fieldList;
    this._fc = fComponent;
    this.vNode = new VNode(vm);
    this.vData = new VData();
    this.unique = id;
    this.refName = "cForm".concat(id);
    this.cacheUnique = 0;
  }

  _createClass(Form, [{
    key: "getRender",
    value: function getRender(field) {
      return this.handlers[field].render;
    }
  }, {
    key: "render",
    value: function render(vm) {
      var _this = this;

      if (!vm.isShow) return;
      this.vNode.setVm(vm);

      if (this.cacheUnique !== vm.unique) {
        this.renderSort.forEach(function (field) {
          _this.getRender(field).clearCache();
        });
        this.cacheUnique = vm.unique;
      }

      this.propsData = this.vData.props(this._fc.options.form).props({
        model: this._fc.formData,
        rules: this._fc.validate,
        key: 'form' + this.unique
      }).ref(this.refName).nativeOn({
        submit: preventDefault
      })["class"]('form-create', true).key(this.unique).get();
      var unique = this.unique,
          vn = this.renderSort.map(function (field) {
        var render = _this.getRender(field);

        if (render.handler.type === 'hidden') return;
        return _this.makeComponent(render);
      }).filter(function (val) {
        return val !== undefined;
      });
      if (vn.length > 0) vn.push(this.makeFormBtn(unique));
      return this.vNode.form(this.propsData, vn.length > 0 ? [this.vNode.row(extend({
        props: this._fc.options.row || {}
      }, {
        key: 'row' + unique
      }), vn)] : []);
    }
  }, {
    key: "makeComponent",
    value: function makeComponent(render) {
      return this.makeFormItem(render.handler, render.cacheParse(this), "fItem".concat(render.handler.key).concat(this.unique));
    }
  }, {
    key: "makeFormItem",
    value: function makeFormItem(_ref, VNodeFn, fItemUnique) {
      var type = _ref.type,
          rule = _ref.rule,
          unique = _ref.unique,
          field = _ref.field,
          refName = _ref.refName;
      var labelWidth = !componentList[type] && !rule.col.labelWidth && !rule.title ? 1 : rule.col.labelWidth;
      labelWidth = isNumeric(labelWidth) ? labelWidth + 'px' : labelWidth;
      var className = rule.className,
          propsData = this.vData.props({
        prop: field,
        label: rule.title,
        labelFor: unique,
        rules: rule.validate,
        labelWidth: labelWidth,
        required: rule.props.required
      }).key(fItemUnique).ref('fItem' + refName)["class"](className).get(),
          node = this.vNode.formItem(propsData, VNodeFn);
      return this.propsData.props.inline === true ? [node] : this.makeCol(rule, fItemUnique, [node]);
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
      var _this2 = this;

      var resetBtn = this._fc.options.resetBtn,
          props = isUndef(this._fc.options.resetBtn.col) ? {
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
          "click": function click() {
            var fApi = _this2._fc.fCreateApi;
            isFunction(resetBtn.click) ? resetBtn.click(fApi) : fApi.resetFields();
          }
        },
        style: {
          width: this.vm.resetProps.width
        }
      }, [this.vm.resetProps.innerText])]);
    }
  }, {
    key: "makeSubmitBtn",
    value: function makeSubmitBtn(unique, span) {
      var _this3 = this;

      var submitBtn = this._fc.options.submitBtn,
          props = isUndef(this._fc.options.submitBtn.col) ? {
        span: span
      } : submitBtn.col;
      return this.vNode.col({
        props: props,
        key: "".concat(this.unique, "col4")
      }, [this.vNode.button({
        key: "fbtn".concat(unique),
        props: this.vm.buttonProps,
        on: {
          "click": function click() {
            var fApi = _this3._fc.fCreateApi;
            isFunction(submitBtn.click) ? submitBtn.click(fApi) : fApi.submit();
          }
        },
        style: {
          width: this.vm.resetProps.width
        }
      }, [this.vm.buttonProps.innerText])]);
    }
  }]);

  return Form;
}();

var name = "hidden";

var render =
/*#__PURE__*/
function (_Render) {
  _inherits(render, _Render);

  function render() {
    _classCallCheck(this, render);

    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
  }

  _createClass(render, [{
    key: "parse",
    value: function parse() {
      return [];
    }
  }]);

  return render;
}(Render);

var maker = _defineProperty({}, name, function (field, value) {
  return creatorFactory(name)('', field, value);
});

var hidden = {
  handler: handler,
  render: render,
  name: name,
  maker: maker
};

var handler$1 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
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
    key: "watchFormValue",
    value: function watchFormValue(n) {
      _get(_getPrototypeOf(handler.prototype), "watchFormValue", this).call(this, n);

      this.render.sync();
    }
  }]);

  return handler;
}(Handler);

var render$1 =
/*#__PURE__*/
function (_Render) {
  _inherits(render, _Render);

  function render() {
    _classCallCheck(this, render);

    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
  }

  _createClass(render, [{
    key: "parse",
    value: function parse() {
      var _this = this;

      var _this$handler = this.handler,
          unique = _this$handler.unique,
          _this$handler$rule = _this$handler.rule,
          options = _this$handler$rule.options,
          props = _this$handler$rule.props,
          key = _this$handler.key;
      return [this.vNode.checkboxGroup(this.inputProps().key(key).get(), function () {
        return options.map(function (option, index) {
          var clone = Object.assign({}, option),
              isBtn = props.type === 'button';
          delete clone.value;
          return _this.vNode[isBtn ? 'checkboxBtn' : 'checkbox']({
            props: clone,
            key: (isBtn ? 'b' : 'i') + "copt".concat(index).concat(unique)
          });
        });
      })];
    }
  }]);

  return render;
}(Render);

var name$1 = "checkbox";
var checkbox = {
  handler: handler$1,
  render: render$1,
  name: name$1
};

var handler$2 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
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
  }]);

  return handler;
}(Handler);

var render$2 =
/*#__PURE__*/
function (_Render) {
  _inherits(render, _Render);

  function render() {
    _classCallCheck(this, render);

    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
  }

  _createClass(render, [{
    key: "parse",
    value: function parse() {
      var _this = this;

      var _this$handler = this.handler,
          unique = _this$handler.unique,
          _this$handler$rule = _this$handler.rule,
          options = _this$handler$rule.options,
          props = _this$handler$rule.props;
      return [this.vNode.radioGroup(this.inputProps().get(), function () {
        return options.map(function (option, index) {
          var clone = Object.assign({}, option),
              isBtn = props.type === 'button';
          delete clone.value;
          return _this.vNode[isBtn ? 'radioBtn' : 'radio']({
            props: clone,
            key: (isBtn ? 'b' : 'i') + "ropt".concat(index).concat(unique)
          });
        });
      })];
    }
  }]);

  return render;
}(Render);

var name$2 = "radio";
var radio = {
  handler: handler$2,
  render: render$2,
  name: name$2
};

var handler$3 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
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

  return handler;
}(Handler);

var name$3 = "input";
var maker$1 = ['password', 'url', 'email', 'text', 'textarea'].reduce(function (initial, type) {
  initial[type] = creatorTypeFactory(name$3, type);
  return initial;
}, {});
maker$1.idate = creatorTypeFactory(name$3, 'date');
var render$3 = defaultRenderFactory(name$3);
var input = {
  handler: handler$3,
  render: render$3,
  name: name$3,
  maker: maker$1
};

var handler$4 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
    key: "init",
    value: function init() {
      var rule = this.rule;
      if (!Array.isArray(rule.data)) $set(rule, 'data', []);
    }
  }, {
    key: "watchFormValue",
    value: function watchFormValue(n) {
      _get(_getPrototypeOf(handler.prototype), "watchFormValue", this).call(this, n);

      this.render.sync();
    }
  }]);

  return handler;
}(Handler);

var name$4 = 'autoComplete';
var maker$2 = {
  auto: creatorFactory(name$4)
};
var render$4 = defaultRenderFactory(name$4, true);
var autocomplete = {
  handler: handler$4,
  render: render$4,
  name: name$4,
  maker: maker$2
};

var handler$5 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

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
}(Handler);

var name$5 = "inputNumber";
var maker$3 = {
  number: creatorFactory(name$5)
};
var render$5 = defaultRenderFactory(name$5);
var inputnumber = {
  handler: handler$5,
  render: render$5,
  name: name$5,
  maker: maker$3
};

var handler$6 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
    key: "toFormValue",
    value: function toFormValue(value) {
      var isArr = Array.isArray(value);
      if (this.rule.props.multiple === true) return isArr === true ? value : [value];else return isArr === true ? value[0] || '' : value;
    }
  }, {
    key: "watchFormValue",
    value: function watchFormValue(n) {
      _get(_getPrototypeOf(handler.prototype), "watchFormValue", this).call(this, n);

      this.render.sync();
    }
  }]);

  return handler;
}(Handler);

var render$6 =
/*#__PURE__*/
function (_Render) {
  _inherits(render, _Render);

  function render() {
    _classCallCheck(this, render);

    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
  }

  _createClass(render, [{
    key: "parse",
    value: function parse() {
      var _this = this;

      var _this$handler = this.handler,
          unique = _this$handler.unique,
          rule = _this$handler.rule;
      return [this.vNode.select(this.inputProps().get(), function () {
        return rule.options.map(function (option, index) {
          return _this.vNode.option({
            props: option,
            key: "sopt".concat(index).concat(unique)
          }, toDefSlot(option.slot, _this.vm.$createElement, rule));
        });
      })];
    }
  }]);

  return render;
}(Render);

var name$6 = "select";
var maker$4 = {
  selectMultiple: creatorTypeFactory(name$6, true, 'multiple'),
  selectOne: creatorTypeFactory(name$6, false, 'multiple')
};
var select = {
  handler: handler$6,
  render: render$6,
  name: name$6,
  maker: maker$4
};

var handler$7 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
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
    value: function mounted() {
      _get(_getPrototypeOf(handler.prototype), "mounted", this).call(this);

      this.vm._changeFormData(this.field, this.toFormValue(this.el.value));
    }
  }]);

  return handler;
}(Handler);

var name$7 = 'cascader';
var render$7 = defaultRenderFactory(name$7);
var cascader = {
  handler: handler$7,
  render: render$7,
  name: name$7
};

var handler$8 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
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

  return handler;
}(Handler);

var name$8 = "slider";
var maker$5 = {
  sliderRange: creatorTypeFactory(name$8, true, 'range')
};
var render$8 = defaultRenderFactory(name$8);
var slider = {
  handler: handler$8,
  render: render$8,
  name: name$8,
  maker: maker$5
};

function getTime(date) {
  return isDate(date) ? dateFormat('hh:mm:ss', date) : date;
}
function toDate(time) {
  return new Date('2018-02-14 ' + time);
}

var handler$9 =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
    key: "init",
    value: function init() {
      var props = this.rule.props;
      if (!props.type) $set(props, 'type', 'time');
    }
  }, {
    key: "toFormValue",
    value: function toFormValue(value) {
      var parseValue,
          isArr = Array.isArray(value);

      if (this.rule.props.isRange === true) {
        if (isArr && value.length === 2) {
          parseValue = value.map(function (time) {
            return !time ? '' : getTime(timeStampToDate(time));
          });
        } else {
          parseValue = '';
        }
      } else {
        isArr && (value = value[0]);
        parseValue = !value ? '' : getTime(timeStampToDate(value));
      }

      return Array.isArray(parseValue) ? parseValue.map(function (time) {
        return !time ? '' : toDate(time);
      }) : !parseValue ? '' : toDate(parseValue);
    }
  }, {
    key: "toValue",
    value: function toValue(n) {
      var val = this.el.formatToString(n);
      if (this.rule.props.isRange === true && !val) val = ['', ''];
      return val;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      _get(_getPrototypeOf(handler.prototype), "mounted", this).call(this);

      this.rule.value = this.el.displayValue;

      this.vm._changeFormData(this.field, this.toFormValue(this.el.displayValue));
    }
  }]);

  return handler;
}(Handler);

var name$9 = "timePicker";
var render$9 = defaultRenderFactory(name$9, true);
var maker$6 = {
  time: creatorTypeFactory(name$9, function (m) {
    return m.props.isRange = false;
  }),
  timeRange: creatorTypeFactory(name$9, function (m) {
    return m.props.isRange = true;
  })
};
var timepicker = {
  handler: handler$9,
  render: render$9,
  name: name$9,
  maker: maker$6
};

var handler$a =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
    key: "init",
    value: function init() {
      var props = this.rule.props;
      $set(props, 'type', !props.type ? 'date' : toString(props.type).toLowerCase());
    }
  }, {
    key: "toFormValue",
    value: function toFormValue(value) {
      var isArr = Array.isArray(value),
          props = this.rule.props,
          parseValue;

      if (['daterange', 'datetimerange', 'dates'].indexOf(props.type) !== -1) {
        if (isArr) {
          parseValue = value.map(function (time) {
            return !time ? '' : timeStampToDate(time);
          });
        } else {
          parseValue = props.type === 'dates' ? [] : ['', ''];
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
    value: function toValue(n) {
      var type = this.rule.props.type,
          value = this.el.formatToString(n);
      if (!value && ['daterange', 'datetimerange'].indexOf(type) !== -1) return ['', ''];else return value;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      _get(_getPrototypeOf(handler.prototype), "mounted", this).call(this);

      var value = this.el.formatToString(this.vm._formData(this.field));
      this.rule.value = value;
      this.setValue(value);
    }
  }]);

  return handler;
}(Handler);

var name$a = "datePicker";
var maker$7 = ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimeRange', 'dateRange'].reduce(function (initial, type) {
  initial[type] = creatorTypeFactory(name$a, type.toLowerCase());
  return initial;
}, {});
var datepicker = {
  handler: handler$a,
  render: Render,
  name: name$a,
  maker: maker$7
};

var handler$b =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

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
}(Handler);

var name$b = "rate";
var render$a = defaultRenderFactory(name$b);
var rate = {
  handler: handler$b,
  render: render$a,
  name: name$b
};

var handler$c =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
    key: "watchFormValue",
    value: function watchFormValue(n) {
      _get(_getPrototypeOf(handler.prototype), "watchFormValue", this).call(this, n);

      this.render.sync();
    }
  }]);

  return handler;
}(Handler);

var name$c = "colorPicker";
var maker$8 = {
  color: creatorFactory(name$c)
};
var render$b = defaultRenderFactory(name$c, true);
var colorpicker = {
  handler: handler$c,
  render: render$b,
  name: name$c,
  maker: maker$8
};

var handler$d =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
    key: "init",
    value: function init() {
      var props = this.rule.props;
      if (isUndef(props.nodeKey)) $set(props, 'nodeKey', 'id');
      if (isUndef(props.props)) $set(props, 'props', {
        label: "title"
      });
      if (isUndef(props.defaultExpandAll)) $set(props, 'defaultExpandAll', true);
    }
  }, {
    key: "toValue",
    value: function toValue(parseValue) {
      return this.el.getCheckedKeys();
    }
  }, {
    key: "watchValue",
    value: function watchValue(n) {
      _get(_getPrototypeOf(handler.prototype), "watchValue", this).call(this, n);

      this.updateValue(n);
    }
  }, {
    key: "mounted",
    value: function mounted() {
      _get(_getPrototypeOf(handler.prototype), "mounted", this).call(this);

      this.updateValue(this.rule.value);
    }
  }, {
    key: "updateValue",
    value: function updateValue(n) {
      this.el.setCheckedKeys(n);
      this.setValue(this.el.getCheckedKeys());
    }
  }]);

  return handler;
}(Handler);

var render$c =
/*#__PURE__*/
function (_Render) {
  _inherits(render, _Render);

  function render() {
    _classCallCheck(this, render);

    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
  }

  _createClass(render, [{
    key: "parse",
    value: function parse() {
      var _this = this;

      var _this$handler = this.handler,
          rule = _this$handler.rule,
          refName = _this$handler.refName,
          unique = _this$handler.unique,
          props = this.vData.on(rule.event).on({
        check: function check() {
          var _rule$event;

          _this.handler.setValue(_this.handler.el.getCheckedKeys());

          rule.event['check'] && (_rule$event = rule.event)['check'].apply(_rule$event, arguments);
        }
      }).props(rule.props).ref(refName).key("fip".concat(unique)).get();
      var inputProps = this.inputProps().props({
        type: "text",
        value: '' + this.handler.rule.value,
        disable: true,
        readonly: true
      }).key('fipit' + unique)["class"]('__fc_h').ref("".concat(refName, "it")).on('input', function () {}).get();
      return [this.vNode.tree(props), this.vNode.input(inputProps)];
    }
  }]);

  return render;
}(Render);

var name$d = "tree";
var tree = {
  handler: handler$d,
  render: render$c,
  name: name$d
};

function getFileName(pic) {
  return toString(pic).split('/').pop();
}
function parseValue(value) {
  return Array.isArray(value) ? value : !value ? [] : [value];
}

var handler$e =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
    key: "init",
    value: function init() {
      this.parseValue = [];
      var props = this.rule.props;
      props.fileList = [];
      props.showFileList = false;
      if (isUndef(props.uploadType)) $set(props, 'uploadType', 'file');
      if (!props.modalTitle) $set(props, 'modalTitle', '预览');
      if (props.uploadType === 'file' && isUndef(props.handleIcon)) $set(props, 'handleIcon', false);
      $set(this.rule, 'value', parseValue(this.rule.value));
    }
  }, {
    key: "toFormValue",
    value: function toFormValue(value) {
      var _this = this;

      var files = parseValue(value);
      this.parseValue.splice(0, this.parseValue.length);
      files.forEach(function (file) {
        return _this.push(file);
      });
      $set(this.rule.props, 'fileList', this.parseValue);
      return this.parseValue;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      _get(_getPrototypeOf(handler.prototype), "mounted", this).call(this);

      $set(this.rule.props, 'fileList', this.parseValue);
      this.changeParseValue(this.el.uploadFiles || []);
    }
  }, {
    key: "push",
    value: function push(file) {
      this.parseValue.push({
        url: file,
        name: getFileName(file)
      });
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
      return this.rule.props.limit === 1 ? files[0] || '' : files;
    }
  }, {
    key: "changeParseValue",
    value: function changeParseValue(parseValue) {
      this.parseValue = parseValue;

      this.vm._changeFormData(this.field, parseValue);
    }
  }, {
    key: "watchValue",
    value: function watchValue(n) {
      var b = true;
      this.rule.props.fileList.forEach(function (pic) {
        b = b && (pic.percentage === undefined || pic.status === 'success');
      });
      if (b) _get(_getPrototypeOf(handler.prototype), "watchValue", this).call(this, n);
    }
  }]);

  return handler;
}(Handler);

console.log(isUndef);
var vNode = new VNode({});

var Modal = function Modal(options, cb) {
  if (isUndef(options.width)) options.width = '30%';
  return {
    name: 'fc-modal',
    data: function data() {
      return Object.assign({
        visible: true
      }, options);
    },
    render: function render() {
      vNode.setVm(this);
      return vNode.modal({
        props: this.$data,
        on: {
          close: this.onClose,
          closed: this.onClosed
        }
      }, [cb(vNode, this)]);
    },
    methods: {
      onClose: function onClose() {
        this.visible = false;
      },
      onClosed: function onClosed() {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  };
};

function mount(options, content) {
  var $modal = Vue.extend(Modal(options, content)),
      $vm = new $modal().$mount();
  window.document.body.appendChild($vm.$el);
}
function defaultOnHandle(src, title) {
  mount({
    title: title
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

var render$d =
/*#__PURE__*/
function (_Render) {
  _inherits(render, _Render);

  function render() {
    _classCallCheck(this, render);

    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
  }

  _createClass(render, [{
    key: "init",
    value: function init() {
      var _this = this;

      var handler = this.handler;
      this.uploadOptions = extend(Object.assign({}, this.options.upload), this.handler.rule.props);
      this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
      this.propsData = this.vData.props(this.uploadOptions)["class"]('fc-upload-con', true).props('onSuccess', function () {
        return _this.onSuccess.apply(_this, arguments);
      }) // .props('onRemove', (...args) => this.onRemove(...args))
      .ref(handler.refName).key("fip".concat(handler.unique)).get();
    } // onRemove(...args) {
    //     this.handler.changeParseValue(this.handler.el.uploadFiles);
    //     this.uploadOptions.onRemove && this.uploadOptions.onRemove(...args);
    //     this.sync();
    // }

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

      this.handler.changeParseValue(this.handler.el.uploadFiles);
    }
  }, {
    key: "onHandle",
    value: function onHandle(src) {
      var fn = this.uploadOptions.onHandle;
      if (fn) return fn(src);else defaultOnHandle(src, this.uploadOptions.modalTitle);
    }
  }, {
    key: "parse",
    value: function parse() {
      var _this2 = this;

      var _this$handler = this.handler,
          unique = _this$handler.unique,
          field = _this$handler.field;
      this.init();
      if (this.uploadOptions.handleIcon === true) this.uploadOptions.handleIcon = 'el-icon-view';

      var value = this.vm._formData(field),
          render = this.uploadOptions.showFileList ? [] : _toConsumableArray(value.map(function (file, index) {
        if (!isUndef(file.percentage) && file.showProgress !== false && file.status !== 'success') {
          return _this2.makeProgress(file, "uppg".concat(index).concat(unique));
        } else if (file.status === undefined || file.status === 'success') {
          return _this2.makeUploadView(file.url, "upview".concat(index).concat(unique), index);
        }
      }));

      var isShow = !this.uploadOptions.limit || this.uploadOptions.limit > value.length;
      render.push(this.makeUploadBtn(unique, isShow));
      return [this.vNode.make('div', {
        key: "div4".concat(unique),
        "class": {
          'fc-upload': true,
          'fc-hide-btn': !isShow
        }
      }, render)];
    }
  }, {
    key: "cacheParse",
    value: function cacheParse(form) {
      this.cache = null;
      return _get(_getPrototypeOf(render.prototype), "cacheParse", this).call(this, form);
    }
  }, {
    key: "makeUploadView",
    value: function makeUploadView(src, key, index) {
      var _this3 = this;

      return this.vNode.make('div', {
        key: "div1".concat(key),
        "class": ['fc-files']
      }, function () {
        var container = [];

        if (_this3.handler.rule.props.uploadType === 'image') {
          container.push(_this3.vNode.make('img', {
            key: "img".concat(key),
            attrs: {
              src: src
            }
          }));
        } else {
          container.push(_this3.vNode.icon({
            key: "file".concat(key),
            'class': ['el-icon-tickets']
          }));
        }

        if (_this3.issetIcon) container.push(_this3.makeIcons(src, key, index));
        return container;
      });
    }
  }, {
    key: "makeIcons",
    value: function makeIcons(src, key, index) {
      var _this4 = this;

      return this.vNode.make('div', {
        key: "div2".concat(key),
        "class": ['fc-upload-cover']
      }, function () {
        var icon = [];
        if (!!_this4.uploadOptions.handleIcon) icon.push(_this4.makeHandleIcon(src, key, index));
        if (_this4.uploadOptions.allowRemove === true) icon.push(_this4.makeRemoveIcon(src, key, index));
        return icon;
      });
    }
  }, {
    key: "makeProgress",
    value: function makeProgress(file, unique) {
      return this.vNode.make('div', {
        key: "div3".concat(unique),
        "class": ['fc-files']
      }, [this.vNode.progress({
        key: "upp".concat(unique),
        props: {
          percentage: file.percentage,
          type: 'circle',
          width: 54
        }
      })]);
    }
  }, {
    key: "makeUploadBtn",
    value: function makeUploadBtn(unique, isShow) {
      return this.vNode.upload(this.propsData, isShow === true ? [this.vNode.make('div', {
        key: "div5".concat(unique),
        "class": ['fc-upload-btn']
      }, [this.vNode.icon({
        key: "upi".concat(unique),
        'class': ['el-icon-upload2']
      })])] : []);
    }
  }, {
    key: "makeRemoveIcon",
    value: function makeRemoveIcon(src, key, index) {
      var _this5 = this;

      return this.vNode.icon({
        key: "upri".concat(key).concat(index),
        'class': ['el-icon-delete'],
        on: {
          'click': function click() {
            if (_this5.uploadOptions.disabled === true) return;
            var fileList = _this5.handler.el.uploadFiles,
                file = fileList[index];

            _this5.handler.el.handleRemove(file); // fileList.splice(index, 1);
            // this.onRemove(file, fileList);

          }
        }
      });
    }
  }, {
    key: "makeHandleIcon",
    value: function makeHandleIcon(src, key, index) {
      var _this6 = this;

      return this.vNode.icon({
        key: "uphi".concat(key).concat(index),
        'class': ['el-icon-view'],
        on: {
          'click': function click() {
            if (_this6.uploadOptions.disabled === true) return;

            _this6.onHandle(src);
          }
        }
      });
    }
  }]);

  return render;
}(Render);

var name$e = "upload";
var types = {
  image: ['image', 0],
  file: ['file', 0],
  uploadFileOne: ['file', 1],
  uploadImageOne: ['image', 1]
};
var maker$9 = Object.keys(types).reduce(function (initial, key) {
  initial[key] = creatorTypeFactory(name$e, function (m) {
    return m.props({
      uploadType: types[key][0],
      limit: types[key][1]
    });
  });
  return initial;
}, {});
maker$9.uploadImage = maker$9.image;
maker$9.uploadFile = maker$9.file;
var upload = {
  handler: handler$e,
  render: render$d,
  name: name$e,
  maker: maker$9
};

function parseRule$1(rule) {
  var props = rule.props;
  if (!props.type) $set(props, 'type', 'input');
  if (!props.icon) $set(props, 'icon', 'el-icon-upload2');
  if (!props.height) $set(props, 'height', '370px');
  if (isUndef(props.spin)) $set(props, 'spin', true);
  if (!props.title) $set(props, 'title', '请选择' + rule.title);
  if (!props.maxLength) $set(props, 'maxLength', 0);
  if (!props.okBtnText) $set(props, 'okBtnText', '确定');
  if (!props.closeBtnText) $set(props, 'closeBtnText', '关闭');
  if (!props.modalTitle) $set(props, 'modalTitle', '预览');
  var handleIcon = props.handleIcon;
  if (props.type === 'file' && props.handleIcon === undefined) handleIcon = false;else handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'el-icon-view' : props.handleIcon;
  $set(props, 'handleIcon', handleIcon);
  if (props.allowRemove === undefined) $set(props, 'allowRemove', true);
}

var handler$f =
/*#__PURE__*/
function (_Handler) {
  _inherits(handler, _Handler);

  function handler() {
    _classCallCheck(this, handler);

    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
  }

  _createClass(handler, [{
    key: "init",
    value: function init() {
      parseRule$1(this.rule);
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
      _get(_getPrototypeOf(handler.prototype), "watchValue", this).call(this, n);

      this.render.onChange(n);
      this.render.sync();
    }
  }, {
    key: "watchFormValue",
    value: function watchFormValue(n) {
      _get(_getPrototypeOf(handler.prototype), "watchFormValue", this).call(this, n);

      this.parseValue = n;
      this.render.sync();
    }
  }]);

  return handler;
}(Handler);

var eventList = {
  onOpen: 'on-open',
  onChange: 'on-change',
  onCancel: 'on-cancel',
  onOk: 'on-ok'
};

var render$e =
/*#__PURE__*/
function (_Render) {
  _inherits(render, _Render);

  function render() {
    _classCallCheck(this, render);

    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
  }

  _createClass(render, [{
    key: "init",
    value: function init() {
      this._props = this.handler.rule.props;
      this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
    }
  }, {
    key: "parse",
    value: function parse() {
      this.init();
      var type = this._props.type,
          vNode;
      if (type === 'image') vNode = this.makeGroup(this.makeImage());else if (type === 'file') vNode = this.makeGroup(this.makeFile());else vNode = this.makeInput();
      return vNode;
    }
  }, {
    key: "makeInput",
    value: function makeInput(hidden) {
      var _this = this;

      var unique = this.handler.unique,
          props = this.inputProps().props({
        type: "text",
        value: this.handler.parseValue.toString(),
        icon: this._props.icon,
        readonly: true,
        clearable: true
      }).on('on-click', function () {
        _this.showModel();
      }).on('input', function () {}).key('ifit' + unique).style({
        display: hidden === true ? 'none' : 'inline-block'
      }).get();
      return [this.vNode.input(props)];
    }
  }, {
    key: "makeGroup",
    value: function makeGroup(render) {
      var unique = this.handler.unique,
          field = this.handler.field;
      return [this.vNode.make('div', {
        key: "ifgp1".concat(unique),
        "class": ['fc-upload', 'fc-frame'],
        ref: this.handler.refName,
        props: {
          value: this.vm._formData(field)
        }
      }, render), this.makeInput(true)];
    }
  }, {
    key: "makeImage",
    value: function makeImage() {
      var _this2 = this;

      var unique = this.handler.unique;
      var vNode = this.handler.parseValue.map(function (src, index) {
        return _this2.vNode.make('div', {
          key: "ifid1".concat(unique).concat(index),
          "class": ['fc-files']
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

      var unique = this.handler.unique;
      var vNode = this.handler.parseValue.map(function (src, index) {
        return _this3.vNode.make('div', {
          key: "iffd2".concat(unique).concat(index),
          "class": ['fc-files']
        }, [_this3.vNode.icon({
          key: "iff".concat(unique).concat(index),
          "class": ['el-icon-tickets']
        }), _this3.makeIcons(src, unique, index)]);
      });
      vNode.push(this.makeBtn());
      return vNode;
    }
  }, {
    key: "makeBtn",
    value: function makeBtn() {
      var _this4 = this;

      var props = this.handler.rule.props;
      if (props.maxLenth > 0 && this.handler.parseValue.length >= props.maxLenth) return;
      var unique = this.handler.unique;
      return this.vNode.make('div', {
        key: "ifbd3".concat(unique),
        "class": ['fc-upload-btn'],
        on: {
          click: function click() {
            if (props.disabled === true) return;

            _this4.showModel();
          }
        }
      }, [this.vNode.icon({
        key: "ifbi3".concat(unique),
        "class": [this._props.icon]
      })]);
    }
  }, {
    key: "makeIcons",
    value: function makeIcons(src, key, index) {
      var _this5 = this;

      if (this.issetIcon === true) return this.vNode.make('div', {
        key: "ifis".concat(key).concat(index),
        "class": ['fc-upload-cover']
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
        'class': ['el-icon-delete'],
        on: {
          'click': function click() {
            if (_this6._props.disabled === true) return;

            if (_this6.onRemove(src) !== false) {
              _this6.handler.parseValue.splice(index, 1);

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
        "class": [toString(props.handleIcon)],
        on: {
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
      var fn = this.handler.rule.event['on-remove'];
      if (fn) return fn(src, this.handler.getValue());
    }
  }, {
    key: "onHandle",
    value: function onHandle(src) {
      var fn = this.handler.rule.event['on-handle'];
      if (fn) return fn(src);else defaultOnHandle(src, this._props.modalTitle);
    }
  }, {
    key: "valid",
    value: function valid(field) {
      if (field !== this.handler.field) throw new Error('无效的表单字段' + errMsg());
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
        _this8.handler.$modal = _vm;
        return [vNode.make('iframe', {
          attrs: {
            src: src
          },
          style: {
            'height': height,
            'border': "0 none",
            'width': '100%'
          },
          on: {
            'load': function load(e) {
              try {
                if (_this8.options.iframeHelper === true) {
                  var iframe = e.path[0].contentWindow;

                  iframe["".concat(_this8.handler.field, "_change")] = function (val) {
                    _this8.handler.setValue(val);
                  };

                  iframe["form_create_helper"] = {
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

                      return _this8.handler.rule.value;
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

  return render;
}(Render);
Object.keys(eventList).forEach(function (k) {
  render$e.prototype[k] = function () {
    var fn = this.handler.rule.event[eventList[k]];
    if (fn) return fn(this.handler.getValue());
  };
});

var name$f = "frame";
var types$1 = {
  frameInputs: ['input', 0],
  frameFiles: ['file', 0],
  frameImages: ['image', 0],
  frameInputOne: ['input', 1],
  frameFileOne: ['file', 1],
  frameImageOne: ['image', 1]
};
var maker$a = Object.keys(types$1).reduce(function (initial, key) {
  initial[key] = creatorTypeFactory(name$f, function (m) {
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
  handler: handler$f,
  render: render$e,
  name: name$f,
  maker: maker$a
};

var render$f =
/*#__PURE__*/
function (_Render) {
  _inherits(render, _Render);

  function render() {
    _classCallCheck(this, render);

    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
  }

  _createClass(render, [{
    key: "parse",
    value: function parse() {
      var rule = this.handler.rule,
          slot = isUndef(rule.props.slot) ? rule.slot : rule.props.slot;
      if (!isPlainObject(slot)) slot = {};
      return [this.vNode["switch"](this.inputProps().scopedSlots({
        open: function open() {
          return slot.open;
        },
        close: function close() {
          return slot.close;
        }
      }).style({
        'margin': '4.5px 0px'
      }).get())];
    }
  }]);

  return render;
}(Render);

var name$g = "switch";
var maker$b = {
  sliderRange: creatorTypeFactory(name$g, true, 'range')
};
var iswitch = {
  handler: Handler,
  render: render$f,
  name: name$g,
  maker: maker$b
};

function getConfig() {
  return {
    form: {
      inline: false,
      labelPosition: 'right',
      labelSuffix: undefined,
      hideRequiredAsterisk: false,
      labelWidth: '125px',
      showMessage: true,
      inlineMessage: false,
      statusIcon: false,
      validateOnRuleChange: true,
      disabled: false,
      size: undefined
    },
    row: {
      gutter: 0,
      type: undefined,
      align: undefined,
      justify: undefined,
      tag: 'div'
    },
    upload: {
      onPreview: function onPreview(file) {},
      onRemove: function onRemove(file, fileList) {},
      onSuccess: function onSuccess() {},
      onError: function onError(err, file, fileList) {},
      onProgress: function onProgress(event, file, fileList) {},
      onChange: function onChange(file, fileList) {},
      beforeUpload: function beforeUpload(file) {},
      beforeRemove: function beforeRemove(file, fileList) {},
      allowRemove: true,
      handleIcon: true
    },
    submitBtn: {
      type: "primary",
      size: "medium",
      plain: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      icon: 'el-icon-upload',
      width: '100%',
      autofocus: false,
      nativeType: "button",
      innerText: "提交",
      show: true,
      col: undefined,
      click: undefined
    },
    resetBtn: {
      type: "default",
      size: "medium",
      plain: false,
      round: false,
      circle: false,
      loading: false,
      disabled: false,
      icon: 'el-icon-refresh',
      width: '100%',
      autofocus: false,
      nativeType: "button",
      innerText: "重置",
      show: false,
      col: undefined,
      click: undefined
    },
    iframeHelper: false
  };
}

function getGlobalApi(fComponent) {
  var vm = fComponent.vm;

  function tidyFields(fields) {
    var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (!fields) fields = all ? Object.keys(fComponent.handlers) : vm._formField();else if (!Array.isArray(fields)) fields = [fields];
    return fields;
  }

  return {
    formData: function formData() {
      var _this = this;

      var handlers = fComponent.handlers;
      return Object.keys(handlers).reduce(function (initial, field) {
        var handler = handlers[field];

        if (handler.noValue === true) {
          handler.$emit('input', function (val) {
            initial[field] = val;
          }, _this);
        } else {
          initial[field] = deepExtend({}, {
            value: vm._value(field)
          }).value;
        }

        return initial;
      }, {});
    },
    getValue: function getValue(field) {
      field = toString(field);
      var handler = fComponent.handlers[field];
      if (isUndef(handler)) return;
      var val = undefined;
      if (handler.noValue === true) handler.$emit('input', function (v) {
        val = v;
      }, this);else val = deepExtend({}, {
        value: vm._value(field)
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
      var handler = fComponent.handlers[field];
      if (handler === undefined) return;
      if (isFunction(value)) value(vm._trueData(field), function (changeValue) {
        _this3.changeField(field, changeValue);
      });else {
        if (handler.noValue === true) handler.$emit('set-value', value, this);else handler.setValue(value);
      }
    },
    changeField: function changeField(field, value) {
      this.setValue(field, value);
    },
    removeField: function removeField(field) {
      var handler = fComponent.handlers[field];
      if (!handler) return;
      var fields = handler.root.map(function (rule) {
        return rule.__field__;
      }),
          index = fields.indexOf(toString(field));
      if (index === -1) return;
      handler.root.splice(index, 1);

      vm._refresh();
    },
    validate: function validate(successFn, errorFn) {
      fComponent.getFormRef().validate(function (valid) {
        valid === true ? successFn && successFn() : errorFn && errorFn();
      });
    },
    validateField: function validateField(field, callback) {
      if (!vm.cptData[field]) return;
      fComponent.getFormRef().validateField(field, callback);
    },
    resetFields: function resetFields(fields) {
      var _this4 = this;

      var handlers = fComponent.handlers;
      tidyFields(fields, true).forEach(function (field) {
        var handler = handlers[field];
        if (!handler) return;
        if (!handler.noValue) handler.reset();else handler.$emit('reset-field', _this4);
      });
      this.refresh();
    },
    destroy: function destroy() {
      vm.$el.parentNode.removeChild(vm.$el);
      vm.$destroy();
    },
    fields: function fields() {
      return vm._formField();
    },
    append: function append(rule, after) {
      var fields = fComponent.fieldList,
          index = fields.indexOf(toString(after));
      if (rule.field && fields.indexOf(toString(rule.field)) !== -1) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());

      if (isUndef(after)) {
        index = fields.length;
      } else if (index === -1) return;

      fComponent.rules.splice(index + 1, 0, rule);
    },
    prepend: function prepend(rule, after) {
      var fields = fComponent.fieldList,
          index = fields.indexOf(toString(after));
      if (rule.field && fields.indexOf(toString(rule.field)) !== -1) return console.error("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728") + errMsg());

      if (isUndef(after)) {
        index = 0;
      } else if (index === -1) return;else index--;

      fComponent.rules.splice(index + 1, 0, rule);
    },
    submit: function submit(successFn, failFn) {
      var _this5 = this;

      this.validate(function () {
        var formData = _this5.formData();

        if (isFunction(successFn)) successFn(formData, _this5);else fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
      }, function () {
        return failFn && failFn();
      });
    },
    hidden: function hidden(fields) {
      var _hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      tidyFields(fields).forEach(function (field) {
        var handler = fComponent.handlers[field];
        if (!fComponent.handlers[field]) return;
        vm.$set(vm._trueData(field).props, 'hidden', !!_hidden);
        handler.render.sync();
      });
    },
    visibility: function visibility(fields) {
      var _visibility = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      tidyFields(fields).forEach(function (field) {
        var handler = fComponent.handlers[field];
        if (!handler) return;
        vm.$set(vm._trueData(field).props, 'visibility', !!_visibility);
        handler.render.sync();
      });
    },
    disabled: function disabled(fields) {
      var _this6 = this;

      var _disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

      _disabled = !!_disabled;
      tidyFields(fields, true).forEach(function (field) {
        var handler = fComponent.handlers[field];
        if (!handler) return;
        if (!handler.noValue) vm.$set(vm._trueData(field).props, 'disabled', _disabled);else handler.$emit('disabled', _disabled, _this6);
        handler.render.sync();
      });
    },
    clearValidateState: function clearValidateState(fields) {
      tidyFields(fields).forEach(function (field) {
        var handler = fComponent.handlers[field];
        if (!handler) return;
        handler.clearMsg();
      });
    },
    model: function model() {
      return Object.assign({}, vm.trueData);
    },
    component: function component() {
      return Object.assign({}, vm.components);
    },
    bind: function bind(fields) {
      var bind = {},
          properties = {};
      tidyFields(fields).forEach(function (field) {
        var rule = vm._trueData(field);

        if (!rule) return console.error("".concat(field, " \u5B57\u6BB5\u4E0D\u5B58\u5728") + errMsg());
        properties[field] = {
          get: function get() {
            return rule.value;
          },
          set: function set(value) {
            vm.$set(rule, 'value', value);
          },
          enumerable: true,
          configurable: true
        };
      });
      Object.defineProperties(bind, properties);
      return bind;
    },
    submitStatus: function submitStatus() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      vm._buttonProps(props);
    },
    resetStatus: function resetStatus() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      vm._resetProps(props);
    },
    btn: {
      loading: function loading() {
        var _loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        vm._buttonProps({
          loading: _loading
        });
      },
      finish: function finish() {
        this.loading(false);
      },
      disabled: function disabled() {
        var _disabled2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        vm._buttonProps({
          disabled: _disabled2
        });
      },
      show: function show() {
        var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        vm._buttonProps({
          show: isShow
        });
      }
    },
    resetBtn: {
      loading: function loading() {
        var _loading2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        vm._resetProps({
          loading: _loading2
        });
      },
      finish: function finish() {
        this.loading(false);
      },
      disabled: function disabled() {
        var _disabled3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        vm._resetProps({
          disabled: _disabled3
        });
      },
      show: function show() {
        var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        vm._resetProps({
          show: isShow
        });
      }
    },
    closeModal: function closeModal(field) {
      var handler = fComponent.handlers[field];

      if (handler && handler.$modal) {
        handler.$modal.onClose();
        handler.$modal = null;
      }
    },
    set: function set(node, field, value) {
      vm.$set(node, field, value);
    },
    reload: function reload(rules) {
      fComponent.reload(rules);
    },
    options: function options(_options) {
      deepExtend(fComponent.options, _options);

      vm._sync();
    },
    onSuccess: function onSuccess(fn) {
      this.onSubmit(fn);
    },
    onSubmit: function onSubmit(fn) {
      this.options({
        onSubmit: fn
      });
    },
    sync: function sync(field, callback) {
      if (fComponent.handlers[field]) fComponent.handlers[field].render.sync(callback);
    },
    refresh: function refresh() {
      vm._refresh();
    },
    show: function show() {
      var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      vm.isShow = !!isShow;
    }
  };
}

var componentList = {
  hidden: hidden,
  checkbox: checkbox,
  radio: radio,
  input: input,
  autocomplete: autocomplete,
  inputnumber: inputnumber,
  select: select,
  cascader: cascader,
  slider: slider,
  timepicker: timepicker,
  datepicker: datepicker,
  rate: rate,
  colorpicker: colorpicker,
  tree: tree,
  upload: upload,
  frame: frame,
  "switch": iswitch
};
var style = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' + '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' + '.fc-upload .el-upload{display: block;}' + '.fc-upload-btn{border: 1px dashed #c0ccda;cursor: pointer;}' + '.fc-upload .fc-upload-con{display:inline-block;}' + '.fc-upload .fc-upload-cover{opacity: 0; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); transition: opacity .3s;}' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-files:hover .fc-upload-cover{opacity: 1; }' + '.form-create .el-form-item .el-rate{margin-top:10px;}' + '.form-create .el-form-item .el-tree{margin-top:7px;}' + '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';
var nodes = {
  modal: 'el-dialog',
  progress: 'el-progress',
  button: 'el-button',
  icon: 'i',
  slider: 'el-slider',
  rate: 'el-rate',
  upload: 'el-upload',
  cascader: 'el-cascader',
  colorPicker: 'el-color-picker',
  timePicker: 'el-time-picker',
  datePicker: 'el-date-picker',
  'switch': 'el-switch',
  option: 'el-option',
  select: 'el-select',
  checkbox: 'el-checkbox',
  checkboxGroup: 'el-checkbox-Group',
  checkboxBtn: 'el-checkbox-button',
  radio: 'el-radio',
  radioGroup: 'el-radio-group',
  radioBtn: 'el-radio-button',
  inputNumber: 'el-input-number',
  input: 'el-input',
  formItem: 'el-form-Item',
  form: 'el-form',
  col: 'el-col',
  row: 'el-row',
  tree: 'el-tree',
  autoComplete: 'el-autocomplete'
};
function install$1(FormCreate) {
  FormCreate.maker = makerFactory(componentList);
  VNode.use(nodes);
}
var diver = {
  componentList: componentList,
  formRender: Form,
  style: style,
  getConfig: getConfig,
  getGlobalApi: getGlobalApi,
  install: install$1
};

var formCreate = createFormCreate(diver);

if (typeof window !== 'undefined') {
  window.formCreate = formCreate;

  if (window.Vue) {
    install(Vue);
  }
}

var maker$c = formCreate.maker;

exports.default = formCreate;
exports.maker = maker$c;
