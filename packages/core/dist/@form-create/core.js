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

console.log(Vue);
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
        if (exports.Vue.compile === undefined) {
          console.error('使用的 Vue 版本不支持 compile' + errMsg());
          return [];
        }

        if (isUndef(rule.vm)) rule.vm = new exports.Vue();
        var vn = exports.Vue.compile(rule.template, {}).render.call(rule.vm);
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

console.log("core");
exports.Vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;
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
      return exports.Vue.component(toString(id), component);
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
            $vm = fComponent.create(exports.Vue);
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

        var $fCreate = exports.Vue.extend(coreComponent(fComponent, mixin));

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

  components['form-create'] = exports.Vue.extend($FormCreate(FormCreate, mixin)); //

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

exports.Creator = Creator;
exports.Handler = Handler;
exports.Render = Render;
exports.VData = VData;
exports.VNode = VNode;
exports.creatorFactory = creatorFactory;
exports.creatorTypeFactory = creatorTypeFactory;
exports.default = createFormCreate;
exports.defaultRenderFactory = defaultRenderFactory;
exports.makerFactory = makerFactory;
