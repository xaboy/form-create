/*!
 * @form-create/core v1.0.19
 * (c) 2018-2020 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
import Vue from 'vue';

function _typeof(obj) {
  "@babel/helpers - typeof";

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

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function $set(target, field, value) {
  Vue.set(target, field, value);
}
function $del(target, field) {
  Vue["delete"](target, field);
}

var _extends = Object.assign || function (a) {
  for (var b, c = 1; c < arguments.length; c++) {
    for (var d in b = arguments[c], b) {
      Object.prototype.hasOwnProperty.call(b, d) && $set(a, d, b[d]);
    }
  }

  return a;
};

function extend() {
  return _extends.apply(this, arguments);
}

var is = {
  type: function type(arg, _type) {
    return Object.prototype.toString.call(arg) === '[object ' + _type + ']';
  },
  Undef: function Undef(v) {
    return v === undefined || v === null;
  },
  Element: function Element(arg) {
    return _typeof(arg) === 'object' && arg !== null && arg.nodeType === 1 && !is.Object(arg);
  },
  trueArray: function trueArray(data) {
    return Array.isArray(data) && data.length > 0;
  }
};
['Date', 'Object', 'Function', 'String', 'Boolean', ' Array', 'Number'].forEach(function (t) {
  is[t] = function (arg) {
    return is.type(arg, t);
  };
});
function hasProperty(rule, k) {
  return {}.hasOwnProperty.call(rule, k);
}

var NAME = 'FormCreate'; //todo 优化 this 绑定

function $FormCreate(FormCreate) {
  return {
    name: NAME,
    componentName: NAME,
    model: {
      prop: 'api'
    },
    props: {
      rule: {
        type: Array,
        required: true
      },
      option: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      value: Object,
      api: Object
    },
    data: function data() {
      return {
        formData: undefined,
        $f: undefined,
        isShow: true,
        unique: 1,
        renderRule: _toConsumableArray(this.rule || []),
        updateValue: ''
      };
    },
    render: function render() {
      return this.formCreate.render();
    },
    methods: {
      _refresh: function _refresh() {
        ++this.unique;
      },
      _renderRule: function _renderRule() {
        this.renderRule = _toConsumableArray(this.rule || []);
      },
      _updateValue: function _updateValue(value) {
        if (this._isDestroyed) return;
        this.updateValue = JSON.stringify(value);
        this.$emit('update:value', value);
      }
    },
    watch: {
      value: {
        handler: function handler(n) {
          if (JSON.stringify(n) === this.updateValue) return;
          this.$f.setValue(n);
        },
        deep: true
      },
      option: function option(n) {
        this.formCreate.initOptions(n);
        this.$f.refresh();
      },
      rule: function rule(n) {
        var _this = this;

        if (n.length === this.renderRule.length && n.every(function (v) {
          return _this.renderRule.indexOf(v) > -1;
        })) return;
        this.formCreate.$handle.reloadRule(n);

        this._renderRule();
      }
    },
    beforeCreate: function beforeCreate() {
      var _this2 = this;

      var _this$$options$propsD = this.$options.propsData,
          rule = _this$$options$propsD.rule,
          option = _this$$options$propsD.option,
          value = _this$$options$propsD.value;
      this.formCreate = new FormCreate(this, Vue.observable(rule), Vue.observable(option));
      value && is.Object(value) && this.formCreate.updateOptions({
        formData: value
      });
      Object.keys(this.formCreate.prop).forEach(function (k) {
        extend(_this2.$options[k], _this2.formCreate.prop[k]);
      });
    }
  };
}

var normalMerge = ['attrs', 'props', 'domProps', 'scopedSlots'];
var toArrayMerge = ['class', 'style', 'directives'];
var functionalMerge = ['on', 'nativeOn'];

var mergeProps = function mergeProps(objects) {
  var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  var _normalMerge = [].concat(normalMerge, _toConsumableArray(opt['normal'] || []));

  var _toArrayMerge = [].concat(toArrayMerge, _toConsumableArray(opt['array'] || []));

  var _functionalMerge = [].concat(functionalMerge, _toConsumableArray(opt['functional'] || []));

  var propsMerge = opt['props'] || [];
  return objects.reduce(function (a, b) {
    for (var key in b) {
      if (a[key]) {
        if (propsMerge.indexOf(key) > -1) {
          a[key] = mergeProps([b[key]], a[key]);
        } else if (_normalMerge.indexOf(key) > -1) {
          a[key] = _objectSpread2(_objectSpread2({}, a[key]), b[key]);
        } else if (_toArrayMerge.indexOf(key) > -1) {
          var arrA = a[key] instanceof Array ? a[key] : [a[key]];
          var arrB = b[key] instanceof Array ? b[key] : [b[key]];
          a[key] = [].concat(_toConsumableArray(arrA), _toConsumableArray(arrB));
        } else if (_functionalMerge.indexOf(key) > -1) {
          for (var event in b[key]) {
            if (a[key][event]) {
              var _arrA = a[key][event] instanceof Array ? a[key][event] : [a[key][event]];

              var _arrB = b[key][event] instanceof Array ? b[key][event] : [b[key][event]];

              a[key][event] = [].concat(_toConsumableArray(_arrA), _toConsumableArray(_arrB));
            } else {
              a[key][event] = b[key][event];
            }
          }
        } else if (key === 'hook') {
          for (var hook in b[key]) {
            if (a[key][hook]) {
              a[key][hook] = mergeFn(a[key][hook], b[key][hook]);
            } else {
              a[key][hook] = b[key][hook];
            }
          }
        } else {
          a[key] = b[key];
        }
      } else {
        if (_normalMerge.indexOf(key) > -1 || _functionalMerge.indexOf(key) > -1 || propsMerge.indexOf(key) > -1) {
          a[key] = _objectSpread2({}, b[key]);
        } else if (_toArrayMerge.indexOf(key) > -1) {
          a[key] = b[key] instanceof Array ? _toConsumableArray(b[key]) : _typeof(b[key]) === 'object' ? _objectSpread2({}, b[key]) : [b[key]];
        } else a[key] = b[key];
      }
    }

    return a;
  }, initial);
};

var mergeFn = function mergeFn(fn1, fn2) {
  return function () {
    fn1 && fn1.apply(this, arguments);
    fn2 && fn2.apply(this, arguments);
  };
};

var keyAttrs = ['type', 'slot', 'emitPrefix', 'value', 'name', 'title', 'native', 'info', 'hidden', 'inject', 'options', 'emit', 'link', 'prefix', 'suffix', 'update'];
var arrayAttrs = ['validate', 'children', 'control', 'className'];
var normalAttrs = ['col', 'effect', 'wrap'];
var attrs = [].concat(keyAttrs, _toConsumableArray(normalMerge), _toConsumableArray(toArrayMerge), _toConsumableArray(functionalMerge), arrayAttrs, normalAttrs);
var allAttrs = [].concat(_toConsumableArray(attrs), ['ref', 'key']);

function deepExtend(origin) {
  var target = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var mode = arguments.length > 2 ? arguments[2] : undefined;
  var isArr = false;

  for (var key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      var clone = target[key];

      if ((isArr = Array.isArray(clone)) || is.Object(clone)) {
        var nst = origin[key] === undefined;

        if (isArr) {
          isArr = false;
          nst && $set(origin, key, []);
        } else if (clone._clone && mode !== undefined) {
          if (mode) {
            clone = clone.getRule();
            nst && $set(origin, key, {});
          } else {
            $set(origin, key, clone._clone());
            continue;
          }
        } else {
          nst && $set(origin, key, {});
        }

        origin[key] = deepExtend(origin[key], clone, mode);
      } else {
        $set(origin, key, clone);
      }
    }
  }

  return mode !== undefined && Array.isArray(origin) ? origin.filter(function (v) {
    return !v || !v.__ctrl;
  }) : origin;
}
function deepCopy(value) {
  return deepExtend({}, {
    value: value
  }).value;
}

function format(type, msg, rule) {
  return "[form-create ".concat(type, "]: ").concat(msg) + (rule ? '\n\nrule: ' + JSON.stringify(rule.getRule ? rule.getRule() : rule) : '');
}
function tip(msg, rule) {
  console.warn(format('tip', msg, rule));
}
function err(msg, rule) {
  console.error(format('err', msg, rule));
}
function logError(e) {
  err(e.toString());
  console.error(e);
}

var PREFIX = '[[FORM-CREATE-PREFIX-';
var SUFFIX = '-FORM-CREATE-SUFFIX]]';
function toJson(obj) {
  return JSON.stringify(deepExtend([], obj, true), function (key, val) {
    if (val && val._isVue === true) return undefined;

    if (typeof val !== 'function') {
      return val;
    }

    if (val.__inject) val = val.__origin;
    if (val.__emit) return undefined;
    return PREFIX + val + SUFFIX;
  });
}

function makeFn(fn) {
  return eval('(function(){return ' + fn + ' })()');
}

function parseJson(json, mode) {
  return JSON.parse(json, function (k, v) {
    if (is.Undef(v) || !v.indexOf) return v;

    try {
      if (v.indexOf(SUFFIX) > 0 && v.indexOf(PREFIX) === 0) {
        v = v.replace(SUFFIX, '').replace(PREFIX, '');
        return makeFn(v.indexOf('function') === -1 && v.indexOf('(') !== 0 ? 'function ' + v : v);
      } else if (!mode && v.indexOf('function') > -1) return makeFn(v);
    } catch (e) {
      err("\u89E3\u6790\u5931\u8D25:".concat(v));
      return undefined;
    }

    return v;
  });
}
function enumerable(value, writable) {
  return {
    value: value,
    enumerable: false,
    configurable: false,
    writable: !!writable
  };
} //todo 优化位置

function copyRule(rule, mode) {
  return copyRules([rule], mode || false)[0];
}
function copyRules(rules, mode) {
  return deepExtend([], _toConsumableArray(rules), mode || false);
}
function mergeRule(rule, merge) {
  mergeProps([merge], rule, {
    array: arrayAttrs,
    normal: normalAttrs
  });
  return rule;
}
function getRule(rule) {
  return is.Function(rule.getRule) ? rule.getRule() : rule;
}
function mergeGlobal(target, merge) {
  if (!target) return merge;
  Object.keys(merge || {}).forEach(function (k) {
    mergeRule(target[k], merge[k] || {});
  });
}
function funcProxy(that, proxy) {
  Object.defineProperties(that, Object.keys(proxy).reduce(function (initial, k) {
    initial[k] = {
      get: function get() {
        return proxy[k]();
      }
    };
    return initial;
  }, {}));
}
function byCtx(rule) {
  return rule.__fc__ || (rule.__origin__ ? rule.__origin__.__fc__ : null);
}
function invoke(fn, def) {
  try {
    def = fn();
  } catch (e) {
    logError(e);
  }

  return def;
}

function debounce(fn, wait) {
  var timeout = null;
  return function () {
    var _this = this;

    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    if (timeout !== null) clearTimeout(timeout);
    timeout = setTimeout(function () {
      return fn.call.apply(fn, [_this].concat(arg));
    }, wait);
  };
}

function toString(val) {
  return val == null ? '' : _typeof(val) === 'object' ? JSON.stringify(val, null, 2) : String(val);
}

function toLine(name) {
  var line = name.replace(/([A-Z])/g, '-$1').toLocaleLowerCase();
  if (line.indexOf('-') === 0) line = line.substr(1);
  return line;
}

var id = 0;
function uniqueId() {
  return Math.random().toString(36).substr(3, 3) + Number("".concat(Date.now()).concat(++id)).toString(36);
}

function baseRule() {
  return {
    props: {},
    on: {},
    validate: [],
    options: [],
    col: {},
    children: [],
    control: [],
    emit: [],
    link: [],
    hidden: false,
    value: null
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
    if (is.Function(type)) type(maker);else maker.props(typeName, type);
    return maker;
  };
}
function Creator(type, title, field, value, props) {
  this._data = extend(baseRule(), {
    type: type,
    title: title,
    field: field,
    value: value,
    props: props || {}
  });
  this.event = this.on;
}
extend(Creator.prototype, {
  getRule: function getRule() {
    return this._data;
  },
  setProp: function setProp(key, value) {
    $set(this._data, key, value);
    return this;
  },
  _clone: function _clone() {
    var clone = new this.constructor();
    clone._data = copyRule(this._data);
    return clone;
  }
});
attrs.forEach(function (name) {
  Creator.prototype[name] = function (key) {
    mergeRule(this._data, _defineProperty({}, name, arguments.length < 2 ? key : _defineProperty({}, key, arguments[1])));
    return this;
  };
});

var commonMaker = creatorFactory('');
function create(type, field, title) {
  var make = commonMaker('', field);
  make._data.type = type;
  make._data.title = title;
  return make;
}
function createTmp(template, vm, field, title) {
  var make = commonMaker('', field);
  make._data.type = 'template';
  make._data.template = template;
  make._data.title = title;
  make._data.vm = vm;
  return make;
}
function makerFactory() {
  return {
    create: create,
    createTmp: createTmp,
    template: createTmp,
    factory: creatorFactory,
    typeFactory: creatorTypeFactory
  };
}

function Api(h) {
  function tidyFields(fields) {
    if (is.Undef(fields)) fields = h.fields();else if (!Array.isArray(fields)) fields = [fields];
    return fields;
  }

  function copy(value) {
    return deepCopy(value);
  }

  function props(fields, key, val) {
    tidyFields(fields).forEach(function (field) {
      var ctx = h.getCtx(field);
      if (!ctx) return;
      $set(ctx.rule, key, val);
      h.$render.clearCache(ctx);
    });
  }

  function byRules(ctxs, origin) {
    return Object.keys(ctxs).reduce(function (initial, key) {
      initial[key] = origin ? ctxs[key].origin : ctxs[key].rule;
      return initial;
    }, {});
  }

  function tidyBtnProp(btn, def) {
    if (is.Boolean(btn)) btn = {
      show: btn
    };else if (!is.Undef(btn) && !is.Object(btn)) btn = {
      show: def
    };
    return btn;
  }

  var api = {
    get config() {
      return h.options;
    },

    get options() {
      return h.options;
    },

    get form() {
      return h.form;
    },

    get rule() {
      return h.rules;
    },

    formData: function formData(fields) {
      return tidyFields(fields).reduce(function (initial, id) {
        var ctx = h.fieldList[id];
        if (!ctx) return initial;
        initial[ctx.field] = copy(ctx.rule.value);
        return initial;
      }, {});
    },
    getValue: function getValue(field) {
      var ctx = h.fieldList[field];
      if (!ctx) return;
      return copy(ctx.rule.value);
    },
    coverValue: function coverValue(formData) {
      Object.keys(h.fieldList).forEach(function (key) {
        var ctx = h.fieldList[key];
        if (!ctx) return h.appendData[key] = formData[key];
        ctx.rule.value = hasProperty(formData, key) ? formData[key] : undefined;
      });
    },
    setValue: function setValue(field) {
      var formData = field;
      if (arguments.length >= 2) formData = _defineProperty({}, field, arguments[1]);
      Object.keys(formData).forEach(function (key) {
        var ctx = h.fieldList[key];
        if (!ctx) return h.appendData[key] = formData[key];
        ctx.rule.value = formData[key];
      });
    },
    removeField: function removeField(field) {
      var ctx = h.getCtx(field);
      if (!ctx) return;
      ctx.rm();
      return ctx.origin;
    },
    removeRule: function removeRule(rule) {
      var ctx = rule && byCtx(rule);
      if (!ctx) return;
      ctx.rm();
      return ctx.origin;
    },
    destroy: function destroy() {
      h.vm.$el.parentNode && h.vm.$el.parentNode.removeChild(h.vm.$el);
      h.vm.$destroy();
    },
    fields: function fields() {
      return h.fields();
    },
    append: function append(rule, after, child) {
      var fields = Object.keys(h.fieldList),
          index = h.sortList.length,
          rules;
      if (rule.field && fields.indexOf(rule.field) > -1) return err("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728"), rule);
      var ctx = h.getCtx(after);

      if (ctx) {
        if (child) {
          rules = ctx.rule.children;
          index = ctx.rule.children.length;
        } else {
          index = ctx.root.indexOf(ctx.origin);
          rules = ctx.root;
        }
      } else rules = h.rules;

      rules.splice(index + 1, 0, rule);
    },
    prepend: function prepend(rule, after, child) {
      var fields = Object.keys(h.fieldList),
          index = 0,
          rules;
      if (rule.field && fields.indexOf(rule.field) > -1) return err("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728"), rule);
      var ctx = h.getCtx(after);

      if (ctx) {
        if (child) {
          rules = ctx.rule.children;
        } else {
          index = ctx.root.indexOf(ctx.origin);
          rules = ctx.root;
        }
      } else rules = h.rules;

      rules.splice(index, 0, rule);
    },
    hidden: function hidden(_hidden, fields) {
      props(fields, 'hidden', !!_hidden);
      h.refresh();
    },
    hiddenStatus: function hiddenStatus(id) {
      var ctx = h.getCtx(id);
      if (!ctx) return;
      return !!ctx.rule.hidden;
    },
    disabled: function disabled(_disabled, fields) {
      tidyFields(fields).forEach(function (field) {
        var ctx = h.fieldList[field];
        if (!ctx) return;
        $set(ctx.rule.props, 'disabled', !!_disabled);
      });
      h.refresh();
    },
    model: function model(origin) {
      return byRules(h.fieldList, origin);
    },
    component: function component(origin) {
      return byRules(h.customData, origin);
    },
    bind: function bind() {
      return Object.defineProperties({}, Object.keys(h.fieldList).reduce(function (initial, field) {
        var ctx = h.fieldList[field];
        initial[field] = {
          get: function get() {
            return ctx.rule.value;
          },
          set: function set(value) {
            ctx.rule.value = value;
          },
          enumerable: true,
          configurable: true
        };
        return initial;
      }, {}));
    },
    submitBtnProps: function submitBtnProps() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var btn = tidyBtnProp(h.options.submitBtn, true);
      extend(btn, props);
      h.options.submitBtn = btn;
      api.refresh();
    },
    resetBtnProps: function resetBtnProps() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var btn = tidyBtnProp(h.options.resetProps, false);
      extend(btn, props);
      h.options.resetProps = btn;
      api.refresh();
    },
    reload: function reload(rules) {
      h.reloadRule(rules);
    },
    updateOptions: function updateOptions(options) {
      h.fc.updateOptions(options);
      api.refreshOptions();
    },
    onSubmit: function onSubmit(fn) {
      this.updateOptions({
        onSubmit: fn
      });
    },
    sync: function sync(field) {
      var ctx = is.Object(field) ? byCtx(field) : h.getCtx(field);

      if (ctx) {
        ctx.updateKey(true);
        h.$render.clearCache(ctx);
        h.refresh();
      }
    },
    refresh: function refresh(clear) {
      h.$render.clearCacheAll();
      clear && h.$manager.updateKey();
      h.refresh();
    },
    refreshOptions: function refreshOptions() {
      h.$manager.updateOptions(h.options);
      this.refresh();
    },
    hideForm: function hideForm(isShow) {
      $set(h.vm, 'isShow', !isShow);
    },
    changeStatus: function changeStatus() {
      return h.changeStatus;
    },
    clearChangeStatus: function clearChangeStatus() {
      h.changeStatus = false;
    },
    updateRule: function updateRule(id, rule) {
      var ctx = h.getCtx(id);

      if (ctx) {
        mergeRule(ctx.rule, rule);
      }
    },
    getRule: function getRule(id, origin) {
      var ctx = h.getCtx(id);

      if (ctx) {
        return origin ? ctx.origin : ctx.rule;
      }
    },
    updateRules: function updateRules(rules) {
      var _this = this;

      Object.keys(rules).forEach(function (id) {
        _this.updateRule(id, rules[id]);
      });
    },
    updateValidate: function updateValidate(id, validate, merge) {
      if (merge) {
        this.updateRule(id, {
          validate: validate
        });
      } else {
        props(id, 'validate', validate);
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
      if (!el || !el[name]) throw new Error(format('err', "".concat(name, "\u65B9\u6CD5\u4E0D\u5B58\u5728")));
      return function () {
        return el[name].apply(el, arguments);
      };
    },
    exec: function exec(id, name) {
      var _this3 = this;

      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }

      return invoke(function () {
        return _this3.method(id, name).apply(void 0, args);
      });
    },
    toJson: function toJson$1() {
      return toJson(this.rule);
    },
    trigger: function trigger(id, event) {
      var el = this.el(id);

      for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      el && el.$emit.apply(el, [event].concat(args));
    },
    el: function el(id) {
      var ctx = h.getCtx(id);
      if (ctx) return ctx.el || h.vm.$refs[ctx.ref];
    },
    closeModal: function closeModal(id) {
      var el = api.el(id);
      el && el.$emit && el.$emit('close-modal');
    },
    //todo 移动到ui组件 中
    validate: function validate(callback) {
      var _this4 = this;

      var state = false;

      var subForm = _objectSpread2(_objectSpread2({}, {
        ___this: {
          validate: function validate(call) {
            h.$manager.validate(function (valid) {
              call && call(valid);
            });
          }
        }
      }), h.subForm);

      var keys = Object.keys(subForm).filter(function (field) {
        var sub = subForm[field];
        return Array.isArray(sub) ? sub.length : !is.Undef(sub);
      }),
          len = keys.length,
          subLen;

      var validFn = function validFn(valid, field) {
        if (valid) {
          if (subLen > 1) subLen--;else if (len > 1) len--;else callback(true);
        } else {
          if (!state) {
            callback(false);
            state = true;
          }

          field && _this4.clearValidateState(field, false);
        }
      };

      keys.forEach(function (field) {
        var sub = subForm[field];

        if (Array.isArray(sub)) {
          subLen = sub.length;
          sub.forEach(function (form) {
            form.validate(function (v) {
              return validFn(v, field);
            });
          });
        } else if (sub) {
          subLen = 1;
          sub.validate(validFn);
        }
      });
    },
    validateField: function validateField(field, callback) {
      if (!h.fieldList[field]) return;
      h.$manager.validateField(field, callback);
    },
    resetFields: function resetFields(fields) {
      var ctxs = h.fieldList;
      tidyFields(fields).forEach(function (field) {
        var ctx = ctxs[field];
        if (!ctx) return;
        h.$render.clearCache(ctx);
        ctx.rule.value = copy(ctx.defaultValue);
        h.refreshControl(ctx);
      });
    },
    submit: function submit(successFn, failFn) {
      var _this5 = this;

      this.validate(function (valid) {
        if (valid) {
          var formData = _this5.formData();

          if (is.Function(successFn)) successFn(formData, _this5);else {
            is.Function(h.options.onSubmit) && invoke(function () {
              return h.options.onSubmit(formData, _this5);
            });
            h.vm.$emit('submit', formData, _this5);
          }
        } else {
          is.Function(failFn) && invoke(function () {
            return failFn(_this5);
          });
        }
      });
    },
    clearValidateState: function clearValidateState(fields) {
      var _this6 = this;

      var clearSub = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      tidyFields(fields).forEach(function (field) {
        if (clearSub) _this6.clearSubValidateState(field);
        var ctx = h.fieldList[field];
        if (!ctx) return;
        h.$manager.clearValidateState(ctx);
      });
    },
    clearSubValidateState: function clearSubValidateState(fields) {
      tidyFields(fields).forEach(function (field) {
        var subForm = h.subForm[field];
        if (!subForm) return;

        if (Array.isArray(subForm)) {
          subForm.forEach(function (form) {
            form.clearValidateState();
          });
        } else if (subForm) {
          subForm.clearValidateState();
        }
      });
    },
    getSubForm: function getSubForm(field) {
      return h.subForm[field];
    },
    btn: {
      loading: function loading() {
        var _loading = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        api.submitBtnProps({
          loading: !!_loading
        });
      },
      disabled: function disabled() {
        var _disabled2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        api.submitBtnProps({
          disabled: !!_disabled2
        });
      },
      show: function show() {
        var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        api.submitBtnProps({
          show: !!isShow
        });
      }
    },
    resetBtn: {
      loading: function loading() {
        var _loading2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        api.resetBtnProps({
          loading: !!_loading2
        });
      },
      disabled: function disabled() {
        var _disabled3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        api.resetBtnProps({
          disabled: !!_disabled3
        });
      },
      show: function show() {
        var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        api.resetBtnProps({
          show: !!isShow
        });
      }
    },
    nextTick: function nextTick(fn) {
      h.bus.$once('next-tick', fn);
      h.refresh();
    } //todo 以上

  };
  ['on', 'once', 'off', 'set'].forEach(function (n) {
    api[n] = function () {
      var _h$vm;

      (_h$vm = h.vm)["$".concat(n)].apply(_h$vm, arguments);
    };
  });
  api.changeValue = api.changeField = api.setValue;
  return api;
}

function useCache(Render) {
  extend(Render.prototype, {
    initCache: function initCache() {
      this.clearCacheAll();
    },
    clearCache: function clearCache(ctx) {
      if (!this.cache[ctx.id]) {
        ctx.parent && this.clearCache(ctx.parent);
        return;
      }

      if (this.cache[ctx.id].use === true || this.cache[ctx.id].parent) {
        this.$handle.refresh();
      }

      var parent = this.cache[ctx.id].parent;
      this.cache[ctx.id] = null;
      parent && this.clearCache(parent);
    },
    clearCacheAll: function clearCacheAll() {
      this.cache = {};
    },
    setCache: function setCache(ctx, vnode, parent) {
      this.cache[ctx.id] = {
        vnode: vnode,
        use: false,
        parent: parent
      };
    },
    getCache: function getCache(ctx) {
      var cache = this.cache[ctx.id];
      cache.use = true;
      return cache.vnode;
    }
  });
}

function toCase(name) {
  return name.replace(/(-[a-z])/g, function (v) {
    return v.replace('-', '').toLocaleUpperCase();
  });
}

function setTempProps(vm, ctx, api) {
  if (!vm.$props) return;
  var prop = ctx.prop;
  var keys = Object.keys(vm.$props);
  var inject = injectProp(ctx, api);
  var injectKeys = Object.keys(inject);
  keys.forEach(function (key) {
    if (hasProperty(prop.props, key)) vm.$props[key] = prop.props[key];else if (injectKeys.indexOf(key) > -1) vm.$props[key] = inject[key];
  });
  var key = vm.$options.model && vm.$options.model.prop || 'value';

  if (keys.indexOf(key) > -1) {
    vm.$props[key] = prop.value;
  }
}

function injectProp(ctx, api) {
  return {
    formCreate: api,
    formCreateField: ctx.field,
    formCreateOptions: ctx.rule.options,
    formCreateRule: function () {
      var temp = _objectSpread2({}, ctx.prop);

      return temp.on = temp.on ? _objectSpread2({}, temp.on) : {}, temp;
    }()
  };
}

function useRender(Render) {
  extend(Render.prototype, {
    initRender: function initRender() {
      this.renderList = {};
      this.clearOrgChildren();
    },
    initOrgChildren: function initOrgChildren() {
      var ctxs = this.$handle.ctxs;
      this.orgChildren = Object.keys(ctxs).reduce(function (initial, id) {
        var children = ctxs[id].rule.children;
        initial[id] = is.trueArray(children) ? _toConsumableArray(children) : [];
        return initial;
      }, {});
    },
    clearOrgChildren: function clearOrgChildren() {
      this.orgChildren = {};
    },
    render: function render() {
      var _this = this;

      if (!this.vm.isShow) {
        return;
      }

      this.$manager.beforeRender();
      var vn = this.sortList.map(function (id) {
        return _this.renderCtx(_this.$handle.ctxs[id]);
      }).filter(function (val) {
        return val !== undefined;
      });
      return this.$manager.render(vn);
    },
    makeVm: function makeVm(rule) {
      var _this2 = this;

      var vm = rule.vm;
      if (!vm) return new _vue();else if (is.Function(vm)) return invoke(function () {
        return vm(_this2.$handle.getInjectData(rule));
      });else if (!vm._isVue) return new _vue(vm);
      return vm;
    },
    mergeGlobal: function mergeGlobal(ctx) {
      var g = this.$handle.options.global;
      if (!g) return; //todo 缓存配置,更新 option 更新

      if (!ctx.cacheConfig) ctx.cacheConfig = g[ctx.originType] || g[ctx.type] || g[ctx.trueType] || {};
      ctx.prop = mergeProps([g['*'], ctx.cacheConfig, ctx.prop]);
    },
    renderTemp: function renderTemp(ctx) {
      var _this3 = this;

      if (!_vue.compile) {
        tip('当前使用的Vue构建版本不支持compile,无法使用template功能');
        return [];
      }

      var rule = ctx.prop;
      var id = ctx.id,
          key = ctx.key;

      if (!this.renderList[id]) {
        if (!ctx.el) {
          ctx.el = this.makeVm(rule);
          this.vm.$nextTick(function () {
            return ctx.parser.mounted(ctx);
          });
        }

        var _vm = ctx.el;
        if (ctx.input) _vm.$on(_vm.$options.model && _vm.$options.model.event || 'input', function (value) {
          _this3.onInput(ctx, value);
        });
        this.renderList[id] = {
          vm: _vm,
          template: _vue.compile(rule.template)
        };
      }

      var _this$renderList$id = this.renderList[id],
          vm = _this$renderList$id.vm,
          template = _this$renderList$id.template;
      setTempProps(vm, ctx, this.$handle.api);
      var vn = template.render.call(vm);
      if (is.Undef(vn.data)) vn.data = {};
      vn.key = key;
      vn.data.ref = ctx.ref;
      vn.data.key = key;
      return vn;
    },
    renderAround: function renderAround(vn, ctx) {
      var prop = ctx.prop;
      return [prop.prefix || undefined, vn, prop.suffix || undefined];
    },
    renderCtx: function renderCtx(ctx, parent) {
      if (ctx.type === 'hidden') return;

      if (!this.cache[ctx.id] || ctx.type === 'template') {
        ctx.initProp();
        this.mergeGlobal(ctx);
        this.$manager.tidyRule(ctx);
        this.ctxProp(ctx);
        var type = ctx.type,
            prop = ctx.prop,
            vn;
        if (prop.hidden) return;
        var flag = !ctx.input && is.Undef(prop["native"]);

        if (type === 'template' && prop.template) {
          vn = this.renderTemp(ctx);
        } else {
          vn = ctx.parser.render(this.renderChildren(ctx), ctx);
        }

        vn = this.renderAround(vn, ctx);
        if (!flag && prop["native"] !== true) vn = this.$manager.makeWrap(ctx, vn);
        this.setCache(ctx, vn, parent);
        return vn;
      }

      return this.getCache(ctx);
    },
    ctxProp: function ctxProp(ctx, custom) {
      var _this4 = this;

      var ref = ctx.ref,
          key = ctx.key;
      this.$manager.mergeProp(ctx, custom);
      ctx.parser.mergeProp(ctx, custom);
      var props = [{
        props: injectProp(ctx, this.$handle.api),
        ref: ref,
        key: "".concat(key, "fc")
      }];

      if (!custom) {
        props.push({
          on: {
            'hook:mounted': function hookMounted() {
              _this4.onMounted(ctx);
            },
            'fc.sub-form': function fcSubForm(subForm) {
              _this4.$handle.addSubForm(ctx, subForm);
            }
          },
          model: ctx.input ? {
            value: this.$handle.getFormData(ctx),
            callback: function callback(value) {
              _this4.onInput(ctx, value);
            },
            expression: "formData.".concat(ctx.field)
          } : undefined
        });
      }

      mergeProps(props, ctx.prop);
      return ctx.prop;
    },
    onMounted: function onMounted(ctx) {
      ctx.el = this.vm.$refs[ctx.ref];
      ctx.parser.mounted(ctx);
      this.$handle.effect(ctx, 'mounted');
    },
    onInput: function onInput(ctx, value) {
      this.$handle.onInput(ctx, value);
    },
    renderChildren: function renderChildren(ctx) {
      var _this5 = this;

      var children = ctx.rule.children,
          orgChildren = this.orgChildren[ctx.id];

      if (!is.trueArray(children) && orgChildren) {
        orgChildren.forEach(function (child) {
          if (!is.String(child) && child.__fc__) {
            _this5.$handle.rmCtx(child.__fc__);
          }
        });
        this.orgChildren[ctx.id] = [];
        return [];
      }

      orgChildren && orgChildren.forEach(function (child) {
        if (children.indexOf(child) === -1 && !is.String(child) && child.__fc__) {
          _this5.$handle.rmCtx(child.__fc__);
        }
      });
      return children.map(function (child) {
        if (is.String(child)) return child;

        if (child.__fc__) {
          return _this5.renderCtx(child.__fc__, ctx);
        }

        if (!_this5.$handle.isRepeatRule(child.__origin__ || child) && child.type) {
          _this5.vm.$nextTick(function () {
            _this5.$handle.loadChildren(children, ctx);

            _this5.$handle.refresh();
          });
        }
      });
    },
    defaultRender: function defaultRender(ctx, children) {
      var prop = ctx.prop;
      if (this.vNode[ctx.type]) return this.vNode[ctx.type](prop, children);
      if (this.vNode[ctx.originType]) return this.vNode[ctx.originType](prop, children);
      return this.vNode.make(ctx.originType, prop, children);
    },
    renderRule: function renderRule(rule) {
      var children = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var type = toCase(rule.type);
      var alias = this.vNode.aliasMap[type];
      if (alias) type = toCase(alias);
      return this.vm.$createElement(type, rule, children);
    }
  });
}

function Render(handle) {
  extend(this, {
    $handle: handle,
    fc: handle.fc,
    vm: handle.vm,
    $manager: handle.$manager,
    vNode: new handle.fc.CreateNode(handle.vm)
  });
  funcProxy(this, {
    options: function options() {
      return handle.options;
    },
    sortList: function sortList() {
      return handle.sortList;
    }
  });
  this.initCache();
  this.initRender();
}
useCache(Render);
useRender(Render);

function useInject(Handler) {
  extend(Handler.prototype, {
    parseInjectEvent: function parseInjectEvent(rule, on) {
      var _this = this;

      if (rule.inject === false) return;
      var inject = rule.inject || this.options.injectEvent;
      if (is.Undef(inject)) return;
      Object.keys(on).forEach(function (k) {
        if (is.Function(on[k])) on[k] = _this.inject(rule, on[k], inject);
      });
      return on;
    },
    parseEmit: function parseEmit(ctx, on) {
      var _this2 = this;

      var event = {},
          rule = ctx.rule,
          emitPrefix = rule.emitPrefix,
          field = rule.field,
          name = rule.name,
          inject = rule.inject;
      var emit = rule[on ? 'emit' : 'nativeEmit'] || [];

      if (is.trueArray(emit)) {
        var emitKey = emitPrefix || field || name;

        if (emitKey) {
          if (!on) emitKey = "native-".concat(emitKey);
          emit.forEach(function (eventName) {
            if (!eventName) return;
            var fieldKey = toLine("".concat(emitKey, "-").concat(eventName));

            var fn = function fn() {
              var _this2$vm, _this2$vm2;

              for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
                arg[_key] = arguments[_key];
              }

              (_this2$vm = _this2.vm).$emit.apply(_this2$vm, [fieldKey].concat(arg));

              (_this2$vm2 = _this2.vm).$emit.apply(_this2$vm2, ['emit-event', fieldKey].concat(arg));
            };

            fn.__emit = true;

            if (inject === false) {
              event[eventName] = fn;
            } else {
              inject = rule.inject || _this2.options.injectEvent;
              event[eventName] = is.Undef(inject) ? fn : _this2.inject(rule, fn, inject);
            }
          });
        }
      }

      ctx.computed[on ? 'on' : 'nativeOn'] = event;
      return event;
    },
    getInjectData: function getInjectData(self, inject) {
      var _this$vm$$options$pro = this.vm.$options.propsData,
          option = _this$vm$$options$pro.option,
          rule = _this$vm$$options$pro.rule;
      return {
        $f: this.api,
        rule: rule,
        self: self.__origin__,
        option: option,
        inject: inject
      };
    },
    inject: function inject(self, _fn, _inject) {
      if (_fn.__inject) {
        if (this.watching) return _fn;
        _fn = _fn.__origin;
      }

      var h = this;

      var fn = function fn() {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        args.unshift(h.getInjectData(self, _inject));
        return _fn.apply(this, args);
      };

      fn.__inject = true;
      fn.__origin = _fn;
      return fn;
    }
  });
}

function usePage(Handler) {
  extend(Handler.prototype, {
    usePage: function usePage() {
      var _this = this;

      var page = this.options.page;
      if (!page) return;
      var first = 25;
      var limit = getLimit(this.rules);

      if (is.Object(page)) {
        if (page.first) first = parseInt(page.first, 10) || first;
        if (page.limit) limit = parseInt(page.limit, 10) || limit;
      }

      extend(this, {
        first: first,
        limit: limit,
        pageEnd: this.rules.length <= first
      });
      this.bus.$on('page-end', function () {
        return _this.vm.$emit('page-end', _this.api);
      });
      this.pageLoad();
    },
    pageLoad: function pageLoad() {
      var _this2 = this;

      var pageFn = function pageFn() {
        if (_this2.pageEnd) {
          _this2.vm.$off('hook:updated', pageFn);

          _this2.bus.$emit('page-end');
        } else {
          _this2.first += _this2.limit;
          _this2.pageEnd = _this2.rules.length <= _this2.first;

          _this2.loadRule();

          _this2.refresh();
        }
      };

      this.vm.$on('hook:updated', pageFn);
    }
  });
}

function getLimit(rules) {
  return rules.length < 31 ? 31 : Math.ceil(rules.length / 3);
}

function useRender$1(Handler) {
  extend(Handler.prototype, {
    clearNextTick: function clearNextTick() {
      this.nextTick && clearTimeout(this.nextTick);
      this.nextTick = null;
    },
    bindNextTick: function bindNextTick(fn) {
      var _this = this;

      this.clearNextTick();
      this.nextTick = setTimeout(function () {
        fn();
        _this.nextTick = null;
      }, 10);
    },
    render: function render() {
      console.warn('%c render', 'color:green');
      ++this.loadedId;
      if (this.vm.unique > 0) return this.$render.render();else {
        this.vm.unique = 1;
        return [];
      }
    }
  });
}

function bind(ctx) {
  Object.defineProperties(ctx.origin, {
    __fc__: enumerable(ctx, true)
  });
}

function RuleContext(handle, rule) {
  var id = uniqueId();
  extend(this, {
    id: id,
    ref: id,
    wrapRef: id + 'fi',
    rule: rule,
    origin: rule.__origin__ || rule,
    name: rule.name,
    watch: [],
    linkOn: [],
    root: [],
    ctrlRule: [],
    parent: null,
    cacheConfig: null,
    prop: {},
    computed: {},
    input: !!rule.field,
    el: undefined,
    defaultValue: rule.field ? deepCopy(rule.value) : undefined,
    field: rule.field || undefined
  });
  this.updateType();
  this.updateKey();
  bind(this);
  this.update(handle, true);
}
extend(RuleContext.prototype, {
  updateKey: function updateKey(flag) {
    this.key = uniqueId();
    flag && this.parent && this.parent.updateKey(parent);
  },
  updateType: function updateType() {
    this.originType = this.rule.type;
    this.type = toCase(this.rule.type);
  },
  setParser: function setParser(parser) {
    this.parser = parser;
    parser.init(this);
  },
  initProp: function initProp() {
    this.prop = mergeProps([this.rule, this.computed]);
  },
  check: function check(handle) {
    return this.vm === handle.vm;
  },
  unwatch: function unwatch() {
    this.watch.forEach(function (un) {
      return un();
    });
    this.watch = [];
  },
  unlink: function unlink() {
    this.linkOn.forEach(function (un) {
      return un();
    });
    this.linkOn = [];
  },
  link: function link() {
    this.unlink();
    this.$handle.appendLink(this);
  },
  watchTo: function watchTo() {
    this.$handle.watchCtx(this);
  },
  "delete": function _delete() {
    var undef = void 0;
    this.unwatch();
    this.unlink();
    this.rmCtrl();
    extend(this, {
      deleted: true,
      prop: {},
      computed: {},
      el: undef,
      $handle: undef,
      $render: undef,
      vm: undef,
      vNode: undef,
      parent: null,
      cacheConfig: null
    });
  },
  rmCtrl: function rmCtrl() {
    this.ctrlRule.forEach(function (ctrl) {
      return ctrl.__fc__.rm();
    });
    this.ctrlRule = [];
  },
  rm: function rm() {
    var index = this.root.indexOf(this.origin);
    if (index === -1) return;
    this.root.splice(index, 1);
    this.rmCtrl();
    this.$handle.rmCtx(this);
    extend(this, {
      root: []
    });
  },
  update: function update(handle, init) {
    extend(this, {
      deleted: false,
      $handle: handle,
      $render: handle.$render,
      vm: handle.vm,
      trueType: handle.getType(this.originType),
      vNode: handle.$render.vNode,
      updated: false
    });
    !init && this.unwatch();
    this.watchTo();
    this.link();
  }
});

function useLoader(Handler) {
  extend(Handler.prototype, {
    nextLoad: function nextLoad() {
      var _this = this;

      var id = this.loadedId;
      this.vm.$nextTick(function () {
        id === _this.loadedId && _this.refresh();
      });
    },
    parseRule: function parseRule(_rule) {
      var _this2 = this;

      var rule = getRule(_rule);
      Object.defineProperties(rule, {
        __origin__: enumerable(_rule, true)
      });
      fullRule(rule);
      if (rule.field && hasProperty(this.options.formData || {}, rule.field)) rule.value = this.options.formData[rule.field];
      rule.options = parseArray(rule.options);
      this.ruleEffect(rule, 'init');
      ['on', 'props', 'nativeOn'].forEach(function (k) {
        _this2.parseInjectEvent(rule, rule[k] || {});
      });
      return rule;
    },
    isRepeatRule: function isRepeatRule(rule) {
      return this.repeatRule.indexOf(rule) > -1;
    },
    loadRule: function loadRule() {
      console.warn('%c load', 'color:blue');
      this.cycleLoad = false;

      if (this.pageEnd) {
        this.bus.$emit('load-start');
      }

      this._loadRule(this.rules);

      if (this.cycleLoad && this.pageEnd) {
        return this.loadRule();
      }

      if (this.pageEnd) {
        this.bus.$emit('load-end');
      }

      this.vm._renderRule();

      this.$render.initOrgChildren();
      this.syncForm();
    },
    loadChildren: function loadChildren(children, parent) {
      this.cycleLoad = false;
      this.bus.$emit('load-start');

      this._loadRule(children, parent);

      if (this.cycleLoad) {
        return this.loadRule();
      }

      this.$render.clearCache(parent);
    },
    _loadRule: function _loadRule(rules, parent) {
      var _this3 = this;

      var preIndex = function preIndex(i) {
        var pre = rules[i - 1];

        if (!pre || !pre.__fc__) {
          return i > 0 ? preIndex(i - 1) : -1;
        }

        var index = _this3.sortList.indexOf(pre.__fc__.id);

        return index > -1 ? index : preIndex(i - 1);
      };

      var loadChildren = function loadChildren(children, parent) {
        if (is.trueArray(children)) {
          _this3._loadRule(children, parent);
        }
      };

      rules.map(function (_rule, index) {
        if (parent && is.String(_rule)) return;
        if (!_this3.pageEnd && !parent && index >= _this3.first) return;
        if (!is.Object(_rule) || !getRule(_rule).type) return err('未定义生成规则的 type 字段', _rule);

        if (_rule.__fc__ && _rule.__fc__.root === rules && _this3.ctxs[_rule.__fc__.id]) {
          loadChildren(_rule.__fc__.rule.children, _rule.__fc__);
          return _rule.__fc__;
        }

        var rule = getRule(_rule);

        if (rule.field && _this3.fieldList[rule.field]) {
          _this3.repeatRule.push(_rule);

          return err("".concat(rule.field, " \u5B57\u6BB5\u5DF2\u5B58\u5728"), _rule);
        }

        var ctx;

        if (_rule.__fc__) {
          ctx = _rule.__fc__;

          if (ctx.deleted) {
            if (!ctx.check(_this3)) {
              if (ctx.rule.__ctrl) {
                return;
              }

              ctx.update(_this3);
            }
          } else {
            if (!ctx.check(_this3) || _this3.ctxs[ctx.id]) {
              if (ctx.rule.__ctrl) {
                return;
              }

              rules[index] = _rule = _rule._clone ? _rule._clone() : copyRule(_rule);
              ctx = null;
            }
          }
        }

        if (!ctx) {
          ctx = new RuleContext(_this3, _this3.parseRule(_rule));

          _this3.bindParser(ctx);
        } else if (ctx.originType !== ctx.rule.type) {
          ctx.updateType();

          _this3.bindParser(ctx);
        }

        _this3.appendValue(ctx.rule);

        [false, true].forEach(function (b) {
          return _this3.parseEmit(ctx, b);
        });
        ctx.parent = parent || null;
        ctx.root = rules;

        _this3.setCtx(ctx);

        loadChildren(ctx.rule.children, ctx);

        if (!parent) {
          var _preIndex = preIndex(index);

          if (_preIndex > -1) {
            _this3.sortList.splice(_preIndex + 1, 0, ctx.id);
          } else {
            _this3.sortList.push(ctx.id);
          }
        }

        var r = ctx.rule;

        if (!ctx.updated) {
          ctx.updated = true;

          if (is.Function(r.update)) {
            _this3.bus.$once('load-end', function () {
              _this3.refreshUpdate(ctx, r.value);
            });
          }
        }

        if (ctx.input) Object.defineProperty(r, 'value', _this3.valueHandle(ctx));

        _this3.effect(ctx, 'loaded');

        if (_this3.refreshControl(ctx)) _this3.cycleLoad = true;
        return ctx;
      });
    },
    refreshControl: function refreshControl(ctx) {
      return ctx.input && ctx.rule.control && this.useCtrl(ctx);
    },
    useCtrl: function useCtrl(ctx) {
      var _this4 = this;

      var controls = getCtrl(ctx),
          validate = [],
          api = this.api;
      if (!controls.length) return false;

      var _loop = function _loop(i) {
        var control = controls[i],
            handleFn = control.handle || function (val) {
          return val === control.value;
        };

        var data = _objectSpread2(_objectSpread2({}, control), {}, {
          valid: invoke(function () {
            return handleFn(ctx.rule.value, api);
          }),
          ctrl: findCtrl(ctx, control.rule)
        });

        if (data.valid && data.ctrl || !data.valid && !data.ctrl) return "continue";
        validate.push(data);
      };

      for (var i = 0; i < controls.length; i++) {
        var _ret = _loop(i);

        if (_ret === "continue") continue;
      }

      if (!validate.length) return false;
      var flag = false;
      validate.reverse().forEach(function (_ref) {
        var valid = _ref.valid,
            rule = _ref.rule,
            prepend = _ref.prepend,
            append = _ref.append,
            child = _ref.child,
            ctrl = _ref.ctrl;

        if (valid) {
          flag = true;
          var ruleCon = {
            type: 'fcFragment',
            "native": true,
            __ctrl: true,
            children: rule
          };
          ctx.ctrlRule.push(ruleCon);

          _this4.bus.$once('load-start', function () {
            // this.cycleLoad = true;
            if (prepend) {
              api.prepend(ruleCon, prepend, child);
            } else if (append || child) {
              api.append(ruleCon, append || ctx.id, child);
            } else {
              ctx.root.splice(ctx.root.indexOf(ctx.origin) + 1, 0, ruleCon);
            }
          });
        } else {
          ctx.ctrlRule.splice(ctx.ctrlRule.indexOf(ctrl), 1);
          var ctrlCtx = byCtx(ctrl);
          ctrlCtx && ctrlCtx.rm();
        }
      });
      this.vm.$emit('control', ctx.origin, this.api);
      this.effect(ctx, 'control');
      return flag;
    },
    reloadRule: debounce(function (rules) {
      return this._reloadRule(rules);
    }, 1),
    _reloadRule: function _reloadRule(rules) {
      var _this5 = this;

      console.warn('%c reload', 'color:red');
      if (!rules) rules = this.rules;

      var ctxs = _objectSpread2({}, this.ctxs);

      this.clearNextTick();
      this.$render.clearOrgChildren();
      this.initData(rules);
      this.bus.$once('load-end', function () {
        Object.keys(ctxs).filter(function (id) {
          return _this5.ctxs[id] === undefined;
        }).forEach(function (id) {
          return _this5.rmCtx(ctxs[id], true);
        });

        _this5.$render.clearCacheAll();
      });
      this.loadRule();
      this.refresh();
      this.bus.$off('next-tick', this.nextReload);
      this.bus.$once('next-tick', this.nextReload);
    },
    //todo 组件生成全部通过 alias
    refresh: function refresh() {
      this.vm._refresh();
    }
  });
}

function parseArray(validate) {
  return Array.isArray(validate) ? validate : [];
}

function fullRule(rule) {
  var def = baseRule();
  Object.keys(def).forEach(function (k) {
    if (!hasProperty(rule, k)) $set(rule, k, def[k]);
  });
  return rule;
}

function getCtrl(ctx) {
  var control = ctx.rule.control || [];
  if (is.Object(control)) return [control];else return control;
}

function findCtrl(ctx, rule) {
  for (var i = 0; i < ctx.ctrlRule.length; i++) {
    var ctrl = ctx.ctrlRule[i];
    if (ctrl.children === rule) return ctrl;
  }
}

function useInput(Handler) {
  extend(Handler.prototype, {
    getValue: function getValue(ctx) {
      if (!hasProperty(ctx, 'cacheValue')) {
        ctx.cacheValue = ctx.parser.toValue(this.getFormData(ctx), ctx);
      }

      return ctx.cacheValue;
    },
    setValue: function setValue(ctx, value, formValue, setFlag) {
      ctx.cacheValue = value;
      this.changeStatus = true;
      this.nextLoad();
      this.$render.clearCache(ctx);
      this.setFormData(ctx, formValue);
      this.syncValue();
      this.valueChange(ctx, value);
      this.vm.$emit('change', ctx.field, value, ctx.origin, this.api, setFlag);
      this.effect(ctx, 'value');
    },
    onInput: function onInput(ctx, value) {
      var val;

      if (ctx.input && (this.isQuote(ctx, val = ctx.parser.toValue(value, ctx)) || this.isChange(ctx, val))) {
        this.setValue(ctx, val, value);
      }
    },
    setFormData: function setFormData(ctx, value) {
      $set(this.formData, ctx.field, value);
    },
    getFormData: function getFormData(ctx) {
      return this.formData[ctx.field];
    },
    syncForm: function syncForm() {
      var _this = this;

      Object.keys(this.form).forEach(function (k) {
        return delete _this.form[k];
      });
      Object.defineProperties(this.form, Object.keys(this.formData).reduce(function (initial, field) {
        var ctx = _this.getCtx(field);

        var handle = _this.valueHandle(ctx);

        handle.configurable = true;
        initial[field] = handle;
        return initial;
      }, {}));
      this.syncValue();
    },
    valueHandle: function valueHandle(ctx) {
      var _this2 = this;

      return {
        enumerable: true,
        get: function get() {
          return _this2.getValue(ctx);
        },
        set: function set(value) {
          if (_this2.isChange(ctx, value)) {
            _this2.setValue(ctx, value, ctx.parser.toFormValue(value, ctx), true);
          }
        }
      };
    },
    appendValue: function appendValue(rule) {
      if (!rule.field || !hasProperty(this.appendData, rule.field)) return;
      rule.value = this.appendData[rule.field];
      delete this.appendData[rule.field];
    },
    addSubForm: function addSubForm(ctx, subForm) {
      this.subForm[ctx.field] = subForm;
    },
    syncValue: function syncValue() {
      this.vm._updateValue(_objectSpread2({}, this.form));
    },
    isChange: function isChange(ctx, value) {
      return JSON.stringify(ctx.rule.value) !== JSON.stringify(value);
    },
    isQuote: function isQuote(ctx, value) {
      return (is.Object(value) || Array.isArray(value)) && value === ctx.rule.value;
    },
    refreshUpdate: function refreshUpdate(ctx, val) {
      var _this3 = this;

      var fn = ctx.rule.update;

      if (is.Function(fn)) {
        var state = invoke(function () {
          return fn(val, ctx.origin, _this3.api);
        });
        if (state === undefined) return;
        ctx.rule.hidden = state === true;
      }
    },
    valueChange: function valueChange(ctx, val) {
      this.refreshRule(ctx, val);
      this.bus.$emit('change-' + ctx.field, val);
    },
    refreshRule: function refreshRule(ctx, val) {
      if (this.refreshControl(ctx)) {
        this.$render.clearCacheAll();
        this.loadRule();
        this.refresh();
      }

      this.refreshUpdate(ctx, val);
    },
    appendLink: function appendLink(ctx) {
      var _this4 = this;

      var link = ctx.rule.link;
      is.trueArray(link) && link.forEach(function (field) {
        var fn = function fn() {
          return _this4.refreshRule(ctx, ctx.rule.value);
        };

        _this4.bus.$on('change-' + field, fn);

        ctx.linkOn.push(function () {
          return _this4.bus.$off('change-' + field, fn);
        });
      });
    },
    fields: function fields() {
      return Object.keys(this.formData);
    }
  });
}

function useHelper(rules) {
  if (!Array.isArray(rules) || rules.findField) return;
  Object.defineProperties(rules, {
    findField: enumerable(findField),
    findName: enumerable(findName),
    setValue: enumerable(setValue)
  });
}

function find(field, name, origin) {
  if (!this.length) return;
  var children = [];

  for (var i = 0; i < this.length; i++) {
    if (!is.Object(this[i])) continue;
    var rule = getRule(this[i]);
    if (rule[name] === field) return origin ? rule : this[i];
    if (is.trueArray(rule.children)) children = children.concat(rule.children);
    is.trueArray(rule.control) && rule.control.forEach(function (r) {
      children = children.concat(r.rule);
    });
  }

  return find.call(children, field, name, origin);
}

function findField(field) {
  return find.call(this, field, 'field');
}

function findName(field) {
  return find.call(this, field, 'name');
}

function setValue(formData) {
  var _this = this;

  Object.keys(formData).forEach(function (field) {
    var rule = find.call(_this, field, 'field', true);
    if (rule) rule.value = formData[field];
  });
}

var BaseParser = {
  init: function init(ctx) {},
  toFormValue: function toFormValue(value, ctx) {
    return value;
  },
  toValue: function toValue(formValue, ctx) {
    return formValue;
  },
  mounted: function mounted(ctx) {},
  render: function render(children, ctx) {
    return ctx.$render.defaultRender(ctx, children);
  },
  mergeProp: function mergeProp(ctx) {}
};

function useContext(Handler) {
  extend(Handler.prototype, {
    getCtx: function getCtx(id) {
      return this.fieldList[id] || this.customData[id] || this.ctxs[id];
    },
    setCtx: function setCtx(ctx) {
      var id = ctx.id,
          field = ctx.field,
          name = ctx.name,
          rule = ctx.rule;
      this.ctxs[id] = ctx;
      if (name) $set(this.customData, name, ctx);
      if (!ctx.input) return;
      this.fieldList[field] = ctx;
      $set(this.formData, field, ctx.parser.toFormValue(rule.value, ctx));
      $set(this.validate, field, rule.validate || []);
    },
    getParser: function getParser(ctx) {
      var list = this.fc.parsers;
      return list[ctx.originType] || list[toCase(ctx.type)] || list[ctx.trueType] || BaseParser;
    },
    bindParser: function bindParser(ctx) {
      ctx.setParser(this.getParser(ctx));
    },
    getType: function getType(alias) {
      var map = this.fc.CreateNode.aliasMap;
      var type = map[alias] || map[toCase(alias)] || alias;
      return toCase(type);
    },
    watchCtx: function watchCtx(ctx) {
      var _this = this;

      var vm = this.vm;
      var none = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject'];
      Object.keys(ctx.rule).filter(function (k) {
        return none.indexOf(k) === -1;
      }).forEach(function (key) {
        ctx.watch.push(vm.$watch(function () {
          return ctx.rule[key];
        }, function (n) {
          _this.watching = true;
          if (key === 'hidden') ctx.updateKey(true);else if (key === 'link') {
            ctx.link();
            return;
          } else if (key === 'validate') {
            if (ctx.input) {
              _this.validate[ctx.field] = n || [];
            } else return;
          } else if (['props', 'on', 'nativeOn'].indexOf(key) > -1) _this.parseInjectEvent(ctx.rule, n || {});else if (['emit', 'nativeEmit'].indexOf(key) > -1) _this.parseEmit(ctx, key === 'emit');else if (key === 'type') {
            ctx.updateType();

            _this.bindParser(ctx);
          } else if (key === 'children') {
            _this.loadChildren(n, ctx);
          }

          _this.$render.clearCache(ctx);

          _this.watching = false;
        }, {
          deep: key !== 'children'
        }));
      });
      this.watchEffect(ctx);
    },
    rmCtx: function rmCtx(ctx, reloadFlag) {
      this._rmCtx(ctx);

      if (!reloadFlag) {
        this.$render.initOrgChildren();
        this.syncValue();
      }
    },
    _rmCtx: function _rmCtx(ctx) {
      var _this2 = this;

      if (ctx.deleted) return;
      var id = ctx.id,
          field = ctx.field,
          name = ctx.name;

      if (ctx.input) {
        Object.defineProperty(ctx.rule, 'value', {
          value: ctx.rule.value,
          writable: true
        });
      }

      if (is.trueArray(ctx.rule.children)) {
        ctx.rule.children.forEach(function (h) {
          return h.__fc__ && _this2._rmCtx(h.__fc__);
        });
      }

      $del(this.ctxs, id);
      $del(this.validate, field);
      $del(this.formData, field);
      $del(this.form, field);
      $del(this.fieldList, field);
      $del(this.$render.renderList, id);
      $del(this.customData, name);
      $del(this.subForm, field);
      $del(ctx, 'cacheValue');
      var index = this.sortList.indexOf(id);

      if (index > -1) {
        this.sortList.splice(index, 1);
      }

      ctx["delete"]();
      this.effect(ctx, 'deleted');
      return ctx;
    }
  });
}

function useLifecycle(Handler) {
  extend(Handler.prototype, {
    mounted: function mounted() {
      var _this = this;

      var _mounted = function _mounted() {
        _this.isMounted = true;

        _this.lifecycle('mounted');
      };

      if (this.pageEnd) {
        _mounted();
      } else {
        this.bus.$once('page-end', _mounted);
      }
    },
    lifecycle: function lifecycle(name) {
      var _this2 = this;

      var fn = this.options[name];
      is.Function(fn) && invoke(function () {
        return fn(_this2.api);
      });
      this.vm.$emit(name, this.api);
    }
  });
}

function useEffect(Handler) {
  extend(Handler.prototype, {
    useProvider: function useProvider() {
      var _this = this;

      var ps = this.fc.providers;
      Object.keys(ps).forEach(function (k) {
        var prop = ps[k];
        prop._c = getComponent(prop);

        _this.onEffect(prop);

        _this.providers[k] = prop;
      });
    },
    onEffect: function onEffect(provider) {
      var _this2 = this;

      var used = [];
      (provider._c || ['*']).forEach(function (name) {
        var type = name === '*' ? '*' : _this2.getType(name);
        if (used.indexOf(type) > -1) return;
        used.push(type);

        _this2.bus.$on("p:".concat(provider.attr, ":").concat(type, ":").concat(provider.input ? 1 : 0), function (event, args) {
          provider[event] && provider[event].apply(provider, _toConsumableArray(args));
        });
      });
      provider._used = used;
    },
    watchEffect: function watchEffect(ctx) {
      var _this3 = this;

      var vm = this.vm;
      Object.keys(ctx.rule.effect || {}).forEach(function (k) {
        ctx.watch.push(vm.$watch(function () {
          return ctx.rule.effect[k];
        }, function (n) {
          _this3.effect(ctx, 'watch', _defineProperty({}, k, n));
        }));
      });
    },
    effect: function effect(ctx, event, custom) {
      this.emitEffect({
        rule: ctx.rule,
        input: ctx.input,
        type: ctx.trueType,
        custom: custom
      }, event);
    },
    ruleEffect: function ruleEffect(rule, event) {
      this.emitEffect({
        rule: rule,
        input: !!rule.field,
        type: this.getType(rule.type)
      }, event);
    },
    emitEffect: function emitEffect(_ref, event) {
      var _this4 = this;

      var rule = _ref.rule,
          input = _ref.input,
          type = _ref.type,
          custom = _ref.custom;
      if (!type || type === 'fcFragment') return;
      var effect = custom ? custom : rule.effect || {};
      Object.keys(effect).forEach(function (attr) {
        var p = _this4.providers[attr];
        if (!p || p.input && !input) return;

        var _type;

        if (!p._c) {
          _type = '*';
        } else if (p._used.indexOf(type) > -1) {
          _type = type;
        } else {
          return;
        }

        _this4.bus.$emit("p:".concat(attr, ":").concat(_type, ":").concat(p.input ? 1 : 0), event, [effect[attr], rule, _this4.api]);
      });
    }
  });
}

function unique(arr) {
  return arr.filter(function (item, index, arr) {
    return arr.indexOf(item, 0) === index;
  });
}

function getComponent(p) {
  var c = p.components;
  if (Array.isArray(c)) return unique(c.filter(function (v) {
    return v !== '*';
  }));else if (is.String(c)) return [c];else return false;
}

function Handler(fc) {
  var _this = this;

  extend(this, {
    fc: fc,
    vm: fc.vm,
    watching: false,
    isMounted: false,
    validate: {},
    formData: {},
    subForm: {},
    form: {},
    appendData: {},
    providers: {},
    cycleLoad: null,
    loadedId: 1,
    nextTick: null,
    changeStatus: false,
    pageEnd: true,
    nextReload: function nextReload() {
      _this.lifecycle('reload');
    }
  });
  funcProxy(this, {
    options: function options() {
      return fc.options;
    },
    bus: function bus() {
      return fc.bus;
    }
  });
  this.initData(fc.rules);
  this.$manager = new fc.manager(this);
  this.$render = new Render(this);
  this.api = Api(this);
}
extend(Handler.prototype, {
  initData: function initData(rules) {
    extend(this, {
      fieldList: {},
      ctxs: {},
      customData: {},
      sortList: [],
      rules: rules,
      repeatRule: []
    });
    useHelper(rules);
  },
  init: function init() {
    this.useProvider();
    this.usePage();
    this.loadRule();

    this.$manager.__init();

    this.vm.$set(this.vm, 'formData', this.formData);
  }
});
useInject(Handler);
usePage(Handler);
useRender$1(Handler);
useLoader(Handler);
useInput(Handler);
useContext(Handler);
useLifecycle(Handler);
useEffect(Handler);

var NAME$1 = 'fcFragment';
var fragment = {
  name: NAME$1,
  functional: true,
  render: function render(h, ctx) {
    return ctx.children;
  }
};

function parseProp(prop) {
  if (is.String(prop)) return {
    domProps: {
      innerHTML: prop
    }
  };
  return prop;
}

function CreateNodeFactory() {
  var aliasMap = {};

  function CreateNode(vm) {
    vm && this.setVm(vm);
  }

  extend(CreateNode.prototype, {
    setVm: function setVm(vm) {
      this.vm = vm;
      this.$h = vm.$createElement;
    },
    make: function make(nodeName, data, children) {
      var Node = this.$h(nodeName, parseProp(data), children || []);
      Node.context = this.vm;
      return Node;
    },
    aliasMap: aliasMap
  });
  extend(CreateNode, {
    aliasMap: aliasMap,
    alias: function alias(_alias, name) {
      aliasMap[_alias] = name;
    },
    use: function use(nodes) {
      Object.keys(nodes).forEach(function (k) {
        var line = toLine(k);
        var lower = toString(k).toLocaleLowerCase();
        var v = nodes[k];
        [k, line, lower].forEach(function (n) {
          CreateNode.alias(k, v);

          CreateNode.prototype[n] = function (data, children) {
            return this.make(v, data, children);
          };
        });
      });
    }
  });
  return CreateNode;
}

function createManager(proto) {
  var CustomManager = /*#__PURE__*/function (_Manager) {
    _inherits(CustomManager, _Manager);

    var _super = _createSuper(CustomManager);

    function CustomManager() {
      _classCallCheck(this, CustomManager);

      return _super.apply(this, arguments);
    }

    return CustomManager;
  }(Manager);

  Object.assign(CustomManager.prototype, proto);
  return CustomManager;
}
function Manager(handler) {
  extend(this, {
    $handle: handler,
    vm: handler.vm,
    options: {},
    ref: 'fcForm',
    mergeOptionsRule: {
      normal: ['form', 'row', 'info', 'submitBtn', 'resetBtn']
    }
  });
  this.updateKey();
  this.init();
}
extend(Manager.prototype, {
  __init: function __init() {
    this.$render = this.$handle.$render;
  },
  updateKey: function updateKey() {
    this.key = uniqueId();
  },
  //TODO interface
  init: function init() {},
  update: function update() {},
  beforeRender: function beforeRender() {},
  form: function form() {
    return this.vm.$refs[this.ref];
  },
  mergeOptions: function mergeOptions(args, opt) {
    var _this = this;

    return mergeProps(args.map(function (v) {
      return _this.tidyOptions(v);
    }), opt, this.mergeOptionsRule);
  },
  updateOptions: function updateOptions(options) {
    this.options = this.mergeOptions([options], this.getDefaultOptions());
    this.update();
  },
  tidyOptions: function tidyOptions(options) {
    return options;
  },
  tidyRule: function tidyRule(ctx) {},
  mergeProp: function mergeProp(ctx) {},
  getDefaultOptions: function getDefaultOptions() {
    return {};
  },
  render: function render(children) {}
});

var _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue;

function _parseProp(name, id) {
  var prop;

  if (arguments.length === 2) {
    prop = arguments[1];
    id = prop[name];
  } else {
    prop = arguments[2];
  }

  return {
    id: id,
    prop: prop
  };
}

function nameProp() {
  return _parseProp.apply(void 0, ['name'].concat(Array.prototype.slice.call(arguments)));
}

function _getEl(options) {
  if (!options || !options.el) return window.document.body;
  return is.Element(options.el) ? options.el : document.querySelector(options.el);
}

function mountForm(rules, option) {
  var $vm = new _vue({
    data: function data() {
      //todo 外部无法修改
      return {
        rule: rules,
        option: option || {}
      };
    },
    render: function render(h) {
      return h('FormCreate', {
        ref: 'fc',
        props: this.$data
      });
    }
  });
  $vm.$mount();
  return $vm;
} //todo 表单嵌套


function FormCreateFactory(config) {
  var components = _defineProperty({}, fragment.name, fragment);

  var filters = {};
  var parsers = {};
  var directives = {};
  var providers = {};
  var maker = makerFactory();
  var globalConfig = {
    global: {}
  };
  var data = {};
  var CreateNode = CreateNodeFactory();

  function filter() {
    var data = nameProp.apply(void 0, arguments);
    if (data.id && data.prop) filters[data.id] = data.prop;
  }

  function directive() {
    var data = nameProp.apply(void 0, arguments);
    if (data.id && data.prop) directives[data.id] = data.prop;
  }

  function register() {
    var data = _parseProp.apply(void 0, ['attr'].concat(Array.prototype.slice.call(arguments)));

    if (data.id && data.prop) providers[data.id] = _objectSpread2(_objectSpread2({}, data.prop), {}, {
      attr: data.id
    });
  }

  function componentAlias(alias) {
    CreateNode.use(alias);
  }

  function parser() {
    var data = nameProp.apply(void 0, arguments);
    if (!data.id || !data.prop) return;
    var name = toCase(data.id);
    var parser = data.prop;
    parsers[name] = _objectSpread2(_objectSpread2({}, BaseParser), parser);
    maker[name] = creatorFactory(name);
    parser.maker && extend(maker, parser.maker);
  }

  function component(id, component) {
    var name;

    if (is.String(id)) {
      name = toCase(id);

      if (['form-create', 'formcreate'].indexOf(name) > -1) {
        return $form();
      } else if (component === undefined) {
        return components[name];
      }
    } else {
      name = toCase(id.name);
      component = id;
    }

    if (!name || !component) return;
    components[name] = component;
    if (component.formCreateParser) parser(name, component.formCreateParser);
  }

  function $form() {
    return _vue.extend($FormCreate(FormCreate));
  } //todo 检查回调函数作用域


  function use(fn) {
    if (is.Function(fn.install)) fn.install(create);else if (is.Function(fn)) fn(create);
    return this;
  }

  function create(rules, _opt, parent) {
    var $vm = mountForm(rules, _opt || {});
    var _this = $vm.$refs.fc.formCreate;
    _this.$parent = parent;

    _getEl(_this.options).appendChild($vm.$el);

    return _this.api();
  }

  function FormCreate(vm, rules, options) {
    extend(this, {
      vm: vm,
      manager: createManager(config.manager),
      parsers: parsers,
      providers: providers,
      rules: Array.isArray(rules) ? rules : [],
      prop: {
        components: components,
        filters: filters,
        directives: directives
      },
      CreateNode: CreateNode,
      bus: new _vue()
    });
    this.init();
    this.initOptions(options || {});
  }

  extend(FormCreate.prototype, {
    init: function init() {
      var _this2 = this;

      var vm = this.vm;
      var h = new Handler(this);
      this.$handle = h;
      vm.$f = h.api;
      vm.$emit('input', h.api);
      vm.$on('hook:created', function () {
        _this2.created();
      });
      vm.$on('hook:mounted', function () {
        _this2.mounted();
      });
      vm.$on('hook:beforeDestroy', function () {
        h.reloadRule([]);
      });
      vm.$on('hook:updated', function () {
        h.bindNextTick(function () {
          return _this2.bus.$emit('next-tick', h.api);
        });
      });
    },
    initOptions: function initOptions(options) {
      this.options = _objectSpread2({
        formData: {}
      }, globalConfig);
      this.updateOptions(options);
    },
    updateOptions: function updateOptions(options) {
      if (options.global) {
        this.options.global = mergeGlobal(this.options.global, options.global);
      }

      this.$handle.$manager.mergeOptions([options], this.options);
      this.$handle.$manager.updateOptions(this.options);
    },
    created: function created() {
      this.$handle.init();
    },
    api: function api() {
      return this.$handle.api;
    },
    render: function render() {
      return this.$handle.render();
    },
    mounted: function mounted() {
      this.$handle.mounted();
    }
  });

  function useAttr(formCreate) {
    extend(formCreate, {
      version: config.version,
      ui: config.ui,
      data: data,
      maker: maker,
      component: component,
      filter: filter,
      directive: directive,
      register: register,
      parser: parser,
      use: use,
      componentAlias: componentAlias,
      copyRule: copyRule,
      copyRules: copyRules,
      $form: $form,
      parseJson: parseJson
    });
  }

  function useStatic(FormCreate) {
    extend(FormCreate, {
      create: create,
      install: function install(Vue, options) {
        globalConfig = _objectSpread2(_objectSpread2({}, globalConfig), options || {});
        if (Vue._installedFormCreate === true) return;
        Vue._installedFormCreate = true;
        _vue = Vue;

        var $formCreate = function $formCreate(rules) {
          var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return create(rules, opt, this);
        };

        useAttr($formCreate);
        Vue.prototype.$formCreate = $formCreate;
        Vue.component('FormCreate', $form());
      },
      init: function init(rules) {
        var _opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var $vm = mountForm(rules, _opt),
            _this = $vm.$refs.fc.formCreate;
        return {
          mount: function mount($el) {
            if ($el && is.Element($el)) _this.options.el = $el;

            _getEl(_this.options).appendChild($vm.$el);

            return _this.api();
          },
          remove: function remove() {
            $vm.$el.parentNode && $vm.$el.parentNode.removeChild($vm.$el);
          },
          destroy: function destroy() {
            this.remove();
            $vm.$destroy();
          },
          $f: _this.api()
        };
      }
    });
  }

  useAttr(create);
  useStatic(create);
  CreateNode.use({
    fragment: 'fcFragment'
  });
  if (config.install) create.use(config);
  return create;
}

export default FormCreateFactory;
export { Creator, Manager, copyRule, copyRules, creatorFactory, creatorTypeFactory, mergeRule, parseJson, toJson };
