/*!
 * form-create v1.6.0 elementUI
 * (c) 2018-2019 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
	typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
	(factory((global.formCreate = {}),global.Vue));
}(this, (function (exports,Vue$1) { 'use strict';

	Vue$1 = Vue$1 && Vue$1.hasOwnProperty('default') ? Vue$1['default'] : Vue$1;

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	var _core = createCommonjsModule(function (module) {
	var core = module.exports = { version: '2.6.3' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef
	});
	var _core_1 = _core.version;

	var _global = createCommonjsModule(function (module) {
	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef
	});

	var _library = false;

	var _shared = createCommonjsModule(function (module) {
	var SHARED = '__core-js_shared__';
	var store = _global[SHARED] || (_global[SHARED] = {});

	(module.exports = function (key, value) {
	  return store[key] || (store[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: _core.version,
	  mode: 'global',
	  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var px = Math.random();
	var _uid = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

	var _wks = createCommonjsModule(function (module) {
	var store = _shared('wks');

	var Symbol = _global.Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : _uid)('Symbol.' + name));
	};

	$exports.store = store;
	});

	var _isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	var _anObject = function (it) {
	  if (!_isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};

	var _fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var _descriptors = !_fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var document$1 = _global.document;
	// typeof document.createElement is 'object' in old IE
	var is = _isObject(document$1) && _isObject(document$1.createElement);
	var _domCreate = function (it) {
	  return is ? document$1.createElement(it) : {};
	};

	var _ie8DomDefine = !_descriptors && !_fails(function () {
	  return Object.defineProperty(_domCreate('div'), 'a', { get: function () { return 7; } }).a != 7;
	});

	// 7.1.1 ToPrimitive(input [, PreferredType])

	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var _toPrimitive = function (it, S) {
	  if (!_isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !_isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !_isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var dP = Object.defineProperty;

	var f = _descriptors ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  _anObject(O);
	  P = _toPrimitive(P, true);
	  _anObject(Attributes);
	  if (_ie8DomDefine) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var _objectDp = {
		f: f
	};

	var _propertyDesc = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var _hide = _descriptors ? function (object, key, value) {
	  return _objectDp.f(object, key, _propertyDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	// 22.1.3.31 Array.prototype[@@unscopables]
	var UNSCOPABLES = _wks('unscopables');
	var ArrayProto = Array.prototype;
	if (ArrayProto[UNSCOPABLES] == undefined) _hide(ArrayProto, UNSCOPABLES, {});
	var _addToUnscopables = function (key) {
	  ArrayProto[UNSCOPABLES][key] = true;
	};

	var _iterStep = function (done, value) {
	  return { value: value, done: !!done };
	};

	var _iterators = {};

	var toString = {}.toString;

	var _cof = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	// fallback for non-array-like ES3 and non-enumerable old V8 strings

	// eslint-disable-next-line no-prototype-builtins
	var _iobject = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return _cof(it) == 'String' ? it.split('') : Object(it);
	};

	// 7.2.1 RequireObjectCoercible(argument)
	var _defined = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};

	// to indexed object, toObject with fallback for non-array-like ES3 strings


	var _toIobject = function (it) {
	  return _iobject(_defined(it));
	};

	var hasOwnProperty = {}.hasOwnProperty;
	var _has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var _redefine = createCommonjsModule(function (module) {
	var SRC = _uid('src');
	var TO_STRING = 'toString';
	var $toString = Function[TO_STRING];
	var TPL = ('' + $toString).split(TO_STRING);

	_core.inspectSource = function (it) {
	  return $toString.call(it);
	};

	(module.exports = function (O, key, val, safe) {
	  var isFunction = typeof val == 'function';
	  if (isFunction) _has(val, 'name') || _hide(val, 'name', key);
	  if (O[key] === val) return;
	  if (isFunction) _has(val, SRC) || _hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
	  if (O === _global) {
	    O[key] = val;
	  } else if (!safe) {
	    delete O[key];
	    _hide(O, key, val);
	  } else if (O[key]) {
	    O[key] = val;
	  } else {
	    _hide(O, key, val);
	  }
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, TO_STRING, function toString() {
	  return typeof this == 'function' && this[SRC] || $toString.call(this);
	});
	});

	var _aFunction = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};

	// optional / simple context binding

	var _ctx = function (fn, that, length) {
	  _aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var target = IS_GLOBAL ? _global : IS_STATIC ? _global[name] || (_global[name] = {}) : (_global[name] || {})[PROTOTYPE];
	  var exports = IS_GLOBAL ? _core : _core[name] || (_core[name] = {});
	  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
	  var key, own, out, exp;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    // export native or passed
	    out = (own ? target : source)[key];
	    // bind timers to global for call from export context
	    exp = IS_BIND && own ? _ctx(out, _global) : IS_PROTO && typeof out == 'function' ? _ctx(Function.call, out) : out;
	    // extend global
	    if (target) _redefine(target, key, out, type & $export.U);
	    // export
	    if (exports[key] != out) _hide(exports, key, exp);
	    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
	  }
	};
	_global.core = _core;
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	var _export = $export;

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	var _toInteger = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

	// 7.1.15 ToLength

	var min = Math.min;
	var _toLength = function (it) {
	  return it > 0 ? min(_toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;
	var _toAbsoluteIndex = function (index, length) {
	  index = _toInteger(index);
	  return index < 0 ? max(index + length, 0) : min$1(index, length);
	};

	// false -> Array#indexOf
	// true  -> Array#includes



	var _arrayIncludes = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = _toIobject($this);
	    var length = _toLength(O.length);
	    var index = _toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var shared = _shared('keys');

	var _sharedKey = function (key) {
	  return shared[key] || (shared[key] = _uid(key));
	};

	var arrayIndexOf = _arrayIncludes(false);
	var IE_PROTO = _sharedKey('IE_PROTO');

	var _objectKeysInternal = function (object, names) {
	  var O = _toIobject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) _has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (_has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE 8- don't enum bug keys
	var _enumBugKeys = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)



	var _objectKeys = Object.keys || function keys(O) {
	  return _objectKeysInternal(O, _enumBugKeys);
	};

	var _objectDps = _descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  _anObject(O);
	  var keys = _objectKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) _objectDp.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

	var document$2 = _global.document;
	var _html = document$2 && document$2.documentElement;

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])



	var IE_PROTO$1 = _sharedKey('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE$1 = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = _domCreate('iframe');
	  var i = _enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  _html.appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE$1][_enumBugKeys[i]];
	  return createDict();
	};

	var _objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE$1] = _anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE$1] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO$1] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : _objectDps(result, Properties);
	};

	var def = _objectDp.f;

	var TAG = _wks('toStringTag');

	var _setToStringTag = function (it, tag, stat) {
	  if (it && !_has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};

	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	_hide(IteratorPrototype, _wks('iterator'), function () { return this; });

	var _iterCreate = function (Constructor, NAME, next) {
	  Constructor.prototype = _objectCreate(IteratorPrototype, { next: _propertyDesc(1, next) });
	  _setToStringTag(Constructor, NAME + ' Iterator');
	};

	// 7.1.13 ToObject(argument)

	var _toObject = function (it) {
	  return Object(_defined(it));
	};

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)


	var IE_PROTO$2 = _sharedKey('IE_PROTO');
	var ObjectProto = Object.prototype;

	var _objectGpo = Object.getPrototypeOf || function (O) {
	  O = _toObject(O);
	  if (_has(O, IE_PROTO$2)) return O[IE_PROTO$2];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

	var ITERATOR = _wks('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	var _iterDefine = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  _iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = _objectGpo($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      _setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!_library && typeof IteratorPrototype[ITERATOR] != 'function') _hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!_library || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    _hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  _iterators[NAME] = $default;
	  _iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) _redefine(proto, key, methods[key]);
	    } else _export(_export.P + _export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	var es6_array_iterator = _iterDefine(Array, 'Array', function (iterated, kind) {
	  this._t = _toIobject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return _iterStep(1);
	  }
	  if (kind == 'keys') return _iterStep(0, index);
	  if (kind == 'values') return _iterStep(0, O[index]);
	  return _iterStep(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	_iterators.Arguments = _iterators.Array;

	_addToUnscopables('keys');
	_addToUnscopables('values');
	_addToUnscopables('entries');

	// most Object methods by ES6 should accept primitives



	var _objectSap = function (KEY, exec) {
	  var fn = (_core.Object || {})[KEY] || Object[KEY];
	  var exp = {};
	  exp[KEY] = exec(fn);
	  _export(_export.S + _export.F * _fails(function () { fn(1); }), 'Object', exp);
	};

	// 19.1.2.14 Object.keys(O)



	_objectSap('keys', function () {
	  return function keys(it) {
	    return _objectKeys(_toObject(it));
	  };
	});

	var ITERATOR$1 = _wks('iterator');
	var TO_STRING_TAG = _wks('toStringTag');
	var ArrayValues = _iterators.Array;

	var DOMIterables = {
	  CSSRuleList: true, // TODO: Not spec compliant, should be false.
	  CSSStyleDeclaration: false,
	  CSSValueList: false,
	  ClientRectList: false,
	  DOMRectList: false,
	  DOMStringList: false,
	  DOMTokenList: true,
	  DataTransferItemList: false,
	  FileList: false,
	  HTMLAllCollection: false,
	  HTMLCollection: false,
	  HTMLFormElement: false,
	  HTMLSelectElement: false,
	  MediaList: true, // TODO: Not spec compliant, should be false.
	  MimeTypeArray: false,
	  NamedNodeMap: false,
	  NodeList: true,
	  PaintRequestList: false,
	  Plugin: false,
	  PluginArray: false,
	  SVGLengthList: false,
	  SVGNumberList: false,
	  SVGPathSegList: false,
	  SVGPointList: false,
	  SVGStringList: false,
	  SVGTransformList: false,
	  SourceBufferList: false,
	  StyleSheetList: true, // TODO: Not spec compliant, should be false.
	  TextTrackCueList: false,
	  TextTrackList: false,
	  TouchList: false
	};

	for (var collections = _objectKeys(DOMIterables), i = 0; i < collections.length; i++) {
	  var NAME = collections[i];
	  var explicit = DOMIterables[NAME];
	  var Collection = _global[NAME];
	  var proto = Collection && Collection.prototype;
	  var key;
	  if (proto) {
	    if (!proto[ITERATOR$1]) _hide(proto, ITERATOR$1, ArrayValues);
	    if (!proto[TO_STRING_TAG]) _hide(proto, TO_STRING_TAG, NAME);
	    _iterators[NAME] = ArrayValues;
	    if (explicit) for (key in es6_array_iterator) if (!proto[key]) _redefine(proto, key, es6_array_iterator[key], true);
	  }
	}

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

	function _objectSpread(target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i] != null ? arguments[i] : {};
	    var ownKeys = Object.keys(source);

	    if (typeof Object.getOwnPropertySymbols === 'function') {
	      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
	        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
	      }));
	    }

	    ownKeys.forEach(function (key) {
	      _defineProperty(target, key, source[key]);
	    });
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

	var dP$1 = _objectDp.f;
	var FProto = Function.prototype;
	var nameRE = /^\s*function ([^ (]*)/;
	var NAME$1 = 'name';

	// 19.2.4.2 name
	NAME$1 in FProto || _descriptors && dP$1(FProto, NAME$1, {
	  configurable: true,
	  get: function () {
	    try {
	      return ('' + this).match(nameRE)[1];
	    } catch (e) {
	      return '';
	    }
	  }
	});

	var f$1 = {}.propertyIsEnumerable;

	var _objectPie = {
		f: f$1
	};

	var gOPD = Object.getOwnPropertyDescriptor;

	var f$2 = _descriptors ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = _toIobject(O);
	  P = _toPrimitive(P, true);
	  if (_ie8DomDefine) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (_has(O, P)) return _propertyDesc(!_objectPie.f.call(O, P), O[P]);
	};

	var _objectGopd = {
		f: f$2
	};

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */


	var check = function (O, proto) {
	  _anObject(O);
	  if (!_isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
	};
	var _setProto = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function (test, buggy, set) {
	      try {
	        set = _ctx(Function.call, _objectGopd.f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch (e) { buggy = true; }
	      return function setPrototypeOf(O, proto) {
	        check(O, proto);
	        if (buggy) O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

	var setPrototypeOf = _setProto.set;
	var _inheritIfRequired = function (that, target, C) {
	  var S = target.constructor;
	  var P;
	  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && _isObject(P) && setPrototypeOf) {
	    setPrototypeOf(that, P);
	  } return that;
	};

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)

	var hiddenKeys = _enumBugKeys.concat('length', 'prototype');

	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return _objectKeysInternal(O, hiddenKeys);
	};

	var _objectGopn = {
		f: f$3
	};

	// 7.2.8 IsRegExp(argument)


	var MATCH = _wks('match');
	var _isRegexp = function (it) {
	  var isRegExp;
	  return _isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : _cof(it) == 'RegExp');
	};

	// 21.2.5.3 get RegExp.prototype.flags

	var _flags = function () {
	  var that = _anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	var SPECIES = _wks('species');

	var _setSpecies = function (KEY) {
	  var C = _global[KEY];
	  if (_descriptors && C && !C[SPECIES]) _objectDp.f(C, SPECIES, {
	    configurable: true,
	    get: function () { return this; }
	  });
	};

	var dP$2 = _objectDp.f;
	var gOPN = _objectGopn.f;


	var $RegExp = _global.RegExp;
	var Base = $RegExp;
	var proto$1 = $RegExp.prototype;
	var re1 = /a/g;
	var re2 = /a/g;
	// "new" creates a new object, old webkit buggy here
	var CORRECT_NEW = new $RegExp(re1) !== re1;

	if (_descriptors && (!CORRECT_NEW || _fails(function () {
	  re2[_wks('match')] = false;
	  // RegExp constructor can alter flags and IsRegExp works correct with @@match
	  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
	}))) {
	  $RegExp = function RegExp(p, f) {
	    var tiRE = this instanceof $RegExp;
	    var piRE = _isRegexp(p);
	    var fiU = f === undefined;
	    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p
	      : _inheritIfRequired(CORRECT_NEW
	        ? new Base(piRE && !fiU ? p.source : p, f)
	        : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? _flags.call(p) : f)
	      , tiRE ? this : proto$1, $RegExp);
	  };
	  var proxy = function (key) {
	    key in $RegExp || dP$2($RegExp, key, {
	      configurable: true,
	      get: function () { return Base[key]; },
	      set: function (it) { Base[key] = it; }
	    });
	  };
	  for (var keys = gOPN(Base), i$1 = 0; keys.length > i$1;) proxy(keys[i$1++]);
	  proto$1.constructor = $RegExp;
	  $RegExp.prototype = proto$1;
	  _redefine(_global, 'RegExp', $RegExp);
	}

	_setSpecies('RegExp');

	// true  -> String#at
	// false -> String#codePointAt
	var _stringAt = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(_defined(that));
	    var i = _toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

	var at = _stringAt(true);

	 // `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var _advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? at(S, index).length : 1);
	};

	// getting tag from 19.1.3.6 Object.prototype.toString()

	var TAG$1 = _wks('toStringTag');
	// ES3 wrong here
	var ARG = _cof(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (e) { /* empty */ }
	};

	var _classof = function (it) {
	  var O, T, B;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (T = tryGet(O = Object(it), TAG$1)) == 'string' ? T
	    // builtinTag case
	    : ARG ? _cof(O)
	    // ES3 arguments fallback
	    : (B = _cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
	};

	var builtinExec = RegExp.prototype.exec;

	 // `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var _regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw new TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }
	  if (_classof(R) !== 'RegExp') {
	    throw new TypeError('RegExp#exec called on incompatible receiver');
	  }
	  return builtinExec.call(R, S);
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var LAST_INDEX = 'lastIndex';

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/,
	      re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
	})();

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + re.source + '$(?!\\s)', _flags.call(re));
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

	    match = nativeExec.call(re, str);

	    if (UPDATES_LAST_INDEX_WRONG && match) {
	      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      // eslint-disable-next-line no-loop-func
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var _regexpExec = patchedExec;

	_export({
	  target: 'RegExp',
	  proto: true,
	  forced: _regexpExec !== /./.exec
	}, {
	  exec: _regexpExec
	});

	var SPECIES$1 = _wks('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !_fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = (function () {
	  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
	})();

	var _fixReWks = function (KEY, length, exec) {
	  var SYMBOL = _wks(KEY);

	  var DELEGATES_TO_SYMBOL = !_fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !_fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;
	    re.exec = function () { execCalled = true; return null; };
	    if (KEY === 'split') {
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$1] = function () { return re; };
	    }
	    re[SYMBOL]('');
	    return !execCalled;
	  }) : undefined;

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var fns = exec(
	      _defined,
	      SYMBOL,
	      ''[KEY],
	      function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
	        if (regexp.exec === _regexpExec) {
	          if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	            // The native String method already delegates to @@method (this
	            // polyfilled function), leasing to infinite recursion.
	            // We avoid it by directly calling the native @@method method.
	            return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	          }
	          return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	        }
	        return { done: false };
	      }
	    );
	    var strfn = fns[0];
	    var rxfn = fns[1];

	    _redefine(String.prototype, KEY, strfn);
	    _hide(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return rxfn.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return rxfn.call(string, this); }
	    );
	  }
	};

	var max$1 = Math.max;
	var min$2 = Math.min;
	var floor$1 = Math.floor;
	var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

	var maybeToString = function (it) {
	  return it === undefined ? it : String(it);
	};

	// @@replace logic
	_fixReWks('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
	  return [
	    // `String.prototype.replace` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
	    function replace(searchValue, replaceValue) {
	      var O = defined(this);
	      var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
	      return fn !== undefined
	        ? fn.call(searchValue, O, replaceValue)
	        : $replace.call(String(O), searchValue, replaceValue);
	    },
	    // `RegExp.prototype[@@replace]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
	    function (regexp, replaceValue) {
	      var res = maybeCallNative($replace, regexp, this, replaceValue);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var functionalReplace = typeof replaceValue === 'function';
	      if (!functionalReplace) replaceValue = String(replaceValue);
	      var global = rx.global;
	      if (global) {
	        var fullUnicode = rx.unicode;
	        rx.lastIndex = 0;
	      }
	      var results = [];
	      while (true) {
	        var result = _regexpExecAbstract(rx, S);
	        if (result === null) break;
	        results.push(result);
	        if (!global) break;
	        var matchStr = String(result[0]);
	        if (matchStr === '') rx.lastIndex = _advanceStringIndex(S, _toLength(rx.lastIndex), fullUnicode);
	      }
	      var accumulatedResult = '';
	      var nextSourcePosition = 0;
	      for (var i = 0; i < results.length; i++) {
	        result = results[i];
	        var matched = String(result[0]);
	        var position = max$1(min$2(_toInteger(result.index), S.length), 0);
	        var captures = [];
	        // NOTE: This is equivalent to
	        //   captures = result.slice(1).map(maybeToString)
	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
	        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
	        var namedCaptures = result.groups;
	        if (functionalReplace) {
	          var replacerArgs = [matched].concat(captures, position, S);
	          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
	          var replacement = String(replaceValue.apply(undefined, replacerArgs));
	        } else {
	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
	        }
	        if (position >= nextSourcePosition) {
	          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
	          nextSourcePosition = position + matched.length;
	        }
	      }
	      return accumulatedResult + S.slice(nextSourcePosition);
	    }
	  ];

	    // https://tc39.github.io/ecma262/#sec-getsubstitution
	  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	    var tailPos = position + matched.length;
	    var m = captures.length;
	    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
	    if (namedCaptures !== undefined) {
	      namedCaptures = _toObject(namedCaptures);
	      symbols = SUBSTITUTION_SYMBOLS;
	    }
	    return $replace.call(replacement, symbols, function (match, ch) {
	      var capture;
	      switch (ch.charAt(0)) {
	        case '$': return '$';
	        case '&': return matched;
	        case '`': return str.slice(0, position);
	        case "'": return str.slice(tailPos);
	        case '<':
	          capture = namedCaptures[ch.slice(1, -1)];
	          break;
	        default: // \d\d?
	          var n = +ch;
	          if (n === 0) return match;
	          if (n > m) {
	            var f = floor$1(n / 10);
	            if (f === 0) return match;
	            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
	            return match;
	          }
	          capture = captures[n - 1];
	      }
	      return capture === undefined ? '' : capture;
	    });
	  }
	});

	// 21.2.5.3 get RegExp.prototype.flags()
	if (_descriptors && /./g.flags != 'g') _objectDp.f(RegExp.prototype, 'flags', {
	  configurable: true,
	  get: _flags
	});

	var TO_STRING = 'toString';
	var $toString = /./[TO_STRING];

	var define = function (fn) {
	  _redefine(RegExp.prototype, TO_STRING, fn, true);
	};

	// 21.2.5.14 RegExp.prototype.toString()
	if (_fails(function () { return $toString.call({ source: 'a', flags: 'b' }) != '/a/b'; })) {
	  define(function toString() {
	    var R = _anObject(this);
	    return '/'.concat(R.source, '/',
	      'flags' in R ? R.flags : !_descriptors && R instanceof RegExp ? _flags.call(R) : undefined);
	  });
	// FF44- RegExp#toString has a wrong name
	} else if ($toString.name != TO_STRING) {
	  define(function toString() {
	    return $toString.call(this);
	  });
	}

	var DateProto = Date.prototype;
	var INVALID_DATE = 'Invalid Date';
	var TO_STRING$1 = 'toString';
	var $toString$1 = DateProto[TO_STRING$1];
	var getTime = DateProto.getTime;
	if (new Date(NaN) + '' != INVALID_DATE) {
	  _redefine(DateProto, TO_STRING$1, function toString() {
	    var value = getTime.call(this);
	    // eslint-disable-next-line no-self-compare
	    return value === value ? $toString$1.call(this) : INVALID_DATE;
	  });
	}

	function $nt(fn) {
	  Vue$1.nextTick(fn);
	}
	function $set(target, field, value) {
	  Vue$1.set(target, field, value);
	}
	function $del(target, field) {
	  Vue$1.delete(target, field);
	}
	var _toString = Object.prototype.toString;
	function isUndef(v) {
	  return v === undefined || v === null;
	}
	function toString$1(val) {
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
	function isDate(arg) {
	  return _toString.call(arg) === '[object Date]';
	}
	function isPlainObject(arg) {
	  return _toString.call(arg) === '[object Object]';
	}
	function isFunction(arg) {
	  return _toString.call(arg) === '[object Function]';
	}
	function isString(arg) {
	  return _toString.call(arg) === '[object String]';
	}
	function isBool(arg) {
	  return _toString.call(arg) === '[object Boolean]';
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
	var id$2 = 0;
	function uniqueId() {
	  return ++id$2;
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
	function errMsg() {
	  return '\n\x67\x69\x74\x68\x75\x62\x3a\x68\x74\x74\x70' + '\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f' + '\x6d\x2f\x78\x61\x62\x6f\x79\x2f\x66\x6f\x72\x6d\x2d' + '\x63\x72\x65\x61\x74\x65\n\x64\x6f\x63\x75\x6d\x65' + '\x6e\x74\x3a\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77' + '\x2e\x66\x6f\x72\x6d\x2d\x63\x72\x65\x61\x74\x65\x2e' + '\x63\x6f\x6d';
	}

	function baseComponent() {
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
	        watchs: [],
	        unique: 1
	      };
	    },
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
	      __init: function __init() {
	        var _this = this;

	        var type = this._fComponent._type;
	        this[type].forEach(function (rule, index) {
	          var unWatch = _this.$watch("".concat(type, ".").concat(index, ".value"), function (n) {
	            if (_this.trueData[rule.field] === undefined) return unWatch();

	            _this._changeValue(rule.field, n);
	          });

	          _this.watchs.push(unWatch);
	        });
	      },
	      _unWatch: function _unWatch() {
	        this.watchs.forEach(function (unWatch) {
	          return unWatch();
	        });
	        this.watchs = [];
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
	    }
	  };
	}

	var formCreateName = 'FormCreate';

	var $FormCreate = function $FormCreate() {
	  return {
	    name: formCreateName,
	    mixins: [baseComponent()],
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
	      return this._fComponent.render();
	    },
	    created: function created() {
	      var _fc = new FormCreate(this.rule, this.option);

	      this._fComponent = _fc;
	      _fc._type = 'rule';

	      _fc.boot(this);

	      this.$emit('input', _fc.fCreateApi);
	    },
	    mounted: function mounted() {
	      var _this = this;

	      var _fc = this._fComponent;

	      _fc.mounted(this);

	      this.$f = _fc.fCreateApi;
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
	      this.$emit('input', this.$f);

	      this.__init();
	    }
	  };
	};

	function coreComponent(fComponent) {
	  return {
	    name: "".concat(formCreateName, "Core"),
	    mixins: [baseComponent()],
	    render: function render() {
	      return fComponent.render();
	    },
	    created: function created() {
	      this._fComponent = fComponent;
	      this._fComponent._type = 'rules';
	      fComponent.boot(this);
	    },
	    mounted: function mounted() {
	      var _this = this;

	      fComponent.mounted(this);
	      this.$f = fComponent.fCreateApi;

	      this.__init();

	      this.$watch('rules', function (n) {
	        _this._fComponent.reload(n);
	      });
	    }
	  };
	}

	var Handler = function () {
	  function Handler(vm, _rule, Render, options, noValue) {
	    _classCallCheck(this, Handler);

	    var rule = parseRule(_rule, vm, noValue);
	    this.rule = rule;
	    this.noValue = noValue;
	    this.type = toString$1(rule.type).toLowerCase();
	    this.isDef = true;
	    this.vm = vm;
	    this.el = {};
	    this.watch = [];
	    this.root = [];
	    this.origin = [];

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
	      this.parseValue = this.toFormValue(this.rule.value);
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
	          vm = this.vm,
	          children = this.rule.children;
	      this.el = vm.$refs[this.refName] || {};
	      this.defaultValue = this.toValue(vm.$refs[refName] && !isUndef(vm.$refs[refName].initialValue) ? vm.$refs[refName].initialValue : deepExtend({}, {
	        value: this.rule.value
	      }).value);
	      if (Array.isArray(children) && children.length > 0) children.forEach(function (child) {
	        return !isString(child) && child.__handler__.mounted();
	      });
	    }
	  }, {
	    key: "$emit",
	    value: function $emit(eventName) {
	      var _this$rule$vm, _this$el;

	      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	        params[_key - 1] = arguments[_key];
	      }

	      if (this.type === 'template') (_this$rule$vm = this.rule.vm).$emit.apply(_this$rule$vm, [eventName].concat(params));else if (this.noValue === true) this.el.$emit && (_this$el = this.el).$emit.apply(_this$el, [eventName].concat(params));
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

	    event["on-".concat(eventName)] = event[eventName] = function () {
	      for (var _len2 = arguments.length, arg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        arg[_key2] = arguments[_key2];
	      }

	      vm.$emit.apply(vm, [fieldKey].concat(arg));
	      if (emitKey && fieldKey !== emitKey) vm.$emit.apply(vm, [emitKey].concat(arg));
	    };
	  });
	  return event;
	}
	function parseEvent(event) {
	  Object.keys(event).forEach(function (eventName) {
	    var _name = toString$1(eventName).indexOf('on-') === 0 ? eventName : "on-".concat(eventName);

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

	var VNode = function () {
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

	var VData = function () {
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
	          $set(_this._data.class, toString$1(cls), true);
	        });
	      } else if (isPlainObject(classList)) {
	        $set(this._data, 'class', extend(this._data.class, classList));
	      } else {
	        $set(this._data.class, toString$1(classList), status === undefined ? true : status);
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
	      $set(this._data[key], toString$1(obj), val);
	    }

	    return this;
	  };
	});

	var Render = function () {
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
	      if (!this.cache || noValue === true || noCache === true) this.cache = _super ? _super.parse.call(this, form) : this.parse(form);

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
	      if (Array.isArray(children) && children.length > 0) children.forEach(function (child) {
	        return !isString(child) && child.__handler__.render.clearCache();
	      });
	    }
	  }, {
	    key: "parse",
	    value: function parse(form) {
	      var _this = this;

	      var _this$handler2 = this.handler,
	          type = _this$handler2.type,
	          rule = _this$handler2.rule,
	          refName = _this$handler2.refName,
	          key = _this$handler2.key,
	          noValue = _this$handler2.noValue,
	          origin = _this$handler2.origin,
	          root = _this$handler2.root,
	          vm = _this$handler2.vm;

	      if (rule.type === 'template') {
	        if (Vue$1.compile !== undefined) {
	          if (isUndef(rule.vm)) rule.vm = new Vue$1();
	          var vn = Vue$1.compile(rule.template, {}).render.call(rule.vm);
	          if (vn.data === undefined) vn.data = {};
	          extend(vn.data, rule);
	          vn.key = key;
	          return [vn];
	        } else {
	          console.error('使用的 Vue 版本不支持 compile' + errMsg());
	          return [];
	        }
	      } else if (!noValue) {
	        origin.forEach(function (_rule) {
	          if (root.indexOf(_rule) === -1) {
	            vm._fComponent.removeField(_rule.__field__);
	          }
	        });
	        this.handler.origin = _toConsumableArray(root);
	        return form.makeComponent(this.handler.render);
	      } else {
	        rule.ref = refName;
	        if (isUndef(rule.key)) rule.key = 'def' + uniqueId();

	        var _vn = this.vNode.make(type, _objectSpread({}, rule), function () {
	          var vn = [],
	              children = rule.children || [];

	          if (Array.isArray(children) && children.length > 0) {
	            vn = children.map(function (child) {
	              if (isString(child)) return [child];
	              if (!child.__handler__) vm._fComponent.createHandler([child], true);
	              return child.__handler__.render.cacheParse(form, _this);
	            });
	          }

	          return vn;
	        });

	        _vn.key = key;
	        return [_vn];
	      }
	    }
	  }, {
	    key: "inputProps",
	    value: function inputProps() {
	      var _this2 = this;

	      var _this$handler3 = this.handler,
	          refName = _this$handler3.refName,
	          key = _this$handler3.key,
	          field = _this$handler3.field,
	          _this$handler3$rule = _this$handler3.rule,
	          props = _this$handler3$rule.props,
	          event = _this$handler3$rule.event;
	      var data = this.vData.props(props).props({
	        value: this.vm._formData(field)
	      }).ref(refName).key(key + 'fc' + field).on(event).on('input', function (value) {
	        _this2.onInput(value);
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
	          _this$handler4 = this.handler,
	          field = _this$handler4.field,
	          vm = _this$handler4.vm,
	          trueValue = handler.toValue(value);

	      vm._changeFormData(field, value);

	      if (!vm._change(field, trueValue)) return;
	      handler.setValue(trueValue);
	      handler.watchFormValue(value);
	      handler.render.sync();
	    }
	  }]);

	  return Render;
	}();
	function defaultRenderFactory(node) {
	  var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	  return function (_Render) {
	    _inherits(render, _Render);

	    function render() {
	      _classCallCheck(this, render);

	      return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
	    }

	    _createClass(render, [{
	      key: "parse",
	      value: function parse() {
	        var props = this.inputProps();
	        if (key) props.key(this.handler.key);
	        return [this.vNode[node](props.get())];
	      }
	    }]);

	    return render;
	  }(Render);
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

	var version = "1.6.0";
	var ui = "element";
	var formCreateStyleElId = 'form-create-style';
	var drive = {};
	function getRule(rule) {
	  if (isFunction(rule.getRule)) return rule.getRule();else return rule;
	}
	function getComponent(vm, rule, createOptions) {
	  var componentList = drive.componentList,
	      name = toString$1(rule.type).toLowerCase(),
	      component = isComponent(name) ? componentList[name] : getUdfComponent();
	  return new component.handler(vm, rule, component.render, createOptions, component.noValue);
	}
	function isComponent(type) {
	  return drive.componentList[type] !== undefined;
	}
	function getUdfComponent() {
	  return {
	    handler: Handler,
	    render: Render,
	    noValue: true
	  };
	}
	var _vue = Vue$1;
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

	var FormCreate = function () {
	  function FormCreate(rules) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	    _classCallCheck(this, FormCreate);

	    this.fRender = undefined;
	    this.fCreateApi = undefined;
	    this.id = uniqueId();

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
	      this.validate = {};
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
	    key: "boot",
	    value: function boot(vm) {
	      this.vm = vm;
	      this.createHandler(this.rules);
	      vm.$set(vm, 'cptData', this.formData);
	      vm.$set(vm, 'trueData', this.trueData);
	      vm.$set(vm, 'buttonProps', this.options.submitBtn);
	      vm.$set(vm, 'resetProps', this.options.resetBtn);
	      vm.$set(vm, 'rules', this.rules);
	      vm.$set(vm, 'components', this.components);
	      this.fRender = new drive.formRender(this);
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
	      $set(this.trueData, field, {
	        value: handler.rule.value,
	        rule: rule
	      });
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

	      rules.forEach(function (_rule, index) {
	        if (child && isString(_rule)) return;
	        if (!_rule.type) return console.error("\u672A\u5B9A\u4E49\u751F\u6210\u89C4\u5219\u7684 type \u5B57\u6BB5" + errMsg());
	        var rule = getRule(_rule),
	            handler = _rule.__handler__ ? _rule.__handler__.refresh() : getComponent(_this.vm, rule, _this.options),
	            children = handler.rule.children;
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

	        if (Array.isArray(children) && children.length > 0) _this.createHandler(children, true);
	        if (!child) _this.fieldList.push(handler.field);
	      });
	      rules.forEach(function (rule) {
	        rule.__handler__.root = rules;
	        rule.__handler__.origin = _toConsumableArray(rules);
	      });
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
	      $nt(function () {
	        Object.keys(_this2.handlers).forEach(function (field) {
	          var handler = _this2.handlers[field];
	          if (vm._formData(field) !== undefined) _this2.addHandlerWatch(handler);
	          handler.mounted();
	        });
	        if (first) mounted && mounted(_this2.fCreateApi);
	        onReload && onReload(_this2.fCreateApi);
	      });
	    }
	  }, {
	    key: "removeField",
	    value: function removeField(field) {
	      if (this.handlers[field] === undefined) return;
	      var watch = this.handlers[field].watch,
	          index = this.fieldList.indexOf(field);
	      $del(this.handlers, field);
	      $del(this.validate, field);

	      if (index !== -1) {
	        this.fieldList.splice(index, 1);
	      }

	      watch && watch.forEach(function (unWatch) {
	        return unWatch();
	      });

	      this.vm._removeField(field);
	    }
	  }, {
	    key: "addHandlerWatch",
	    value: function addHandlerWatch(handler) {
	      var _this3 = this;

	      if (handler.noValue === true) return;
	      var field = handler.field,
	          vm = this.vm;
	      var unWatch = vm.$watch("cptData.".concat(field), function (n) {
	        if (_this3.handlers[field] !== undefined) {
	          var trueValue = handler.toValue(n),
	              json = JSON.stringify(trueValue);

	          if (vm._change(field, json)) {
	            handler.setValue(trueValue);
	            handler.watchFormValue(n);
	          }
	        } else unWatch();
	      }, {
	        deep: true
	      });
	      var unWatch2 = vm.$watch("trueData.".concat(field, ".value"), function (n) {
	        if (n === undefined) return;

	        if (_this3.handlers[field] !== undefined) {
	          var json = JSON.stringify(n);

	          if (vm._change(field, json)) {
	            handler.watchValue(n);
	            $nt(function () {
	              return handler.render.sync();
	            });
	          }
	        } else unWatch2();
	      }, {
	        deep: true
	      });
	      handler.watch.push(unWatch, unWatch2);

	      var bind = function bind() {
	        if (_this3.handlers[field] !== undefined) _this3.$tick(function () {
	          return handler.render.sync();
	        });
	      };

	      Object.keys(vm._trueData(field).rule).forEach(function (key) {
	        if (key === 'value') return;
	        handler.watch.push(vm.$watch("trueData.".concat(field, ".rule.").concat(key), bind, {
	          deep: true
	        }));
	      });
	    }
	  }, {
	    key: "isNotChange",
	    value: function isNotChange(rules) {
	      var _this4 = this;

	      return rules.reduce(function (initial, rule, index) {
	        return initial && rule === _this4.origin[index];
	      }, true) && this.origin.reduce(function (initial, rule, index) {
	        return initial && rule === rules[index];
	      }, true);
	    }
	  }, {
	    key: "reload",
	    value: function reload(rules) {
	      var _this5 = this;

	      var vm = this.vm;
	      if (!rules) return this.reload(this.rules);
	      if (this.isNotChange(rules)) return this.fCreateApi.refresh();
	      if (!this.origin.length) this.fCreateApi.refresh();
	      this.origin = _toConsumableArray(rules);

	      vm._unWatch();

	      Object.keys(this.handlers).forEach(function (field) {
	        return _this5.removeField(field);
	      });

	      this.__init(rules, this.options);

	      this.boot(vm);

	      vm.__init();

	      $nt(function () {
	        _this5.mounted(vm, false);
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

	      var opt = isElement(_opt) ? {
	        el: _opt
	      } : _opt;
	      var fComponent = new FormCreate(rules, opt),
	          $vm = fComponent.create(_vue);
	      return fComponent.fCreateApi;
	    }
	  }, {
	    key: "install",
	    value: function install(Vue) {
	      Vue.prototype.$formCreate = function (rules) {
	        var opt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	        return FormCreate.create(rules, opt, Vue);
	      };

	      Vue.prototype.$formCreate.maker = FormCreate.maker;
	      Vue.prototype.$formCreate.version = version;
	      Vue.prototype.$formCreate.ui = ui;
	      Vue.component(formCreateName, Vue.extend($FormCreate()));
	      _vue = Vue;
	    }
	  }]);

	  return FormCreate;
	}();
	FormCreate.version = version;
	FormCreate.ui = ui;
	function setDrive(_drive) {
	  drive = _drive;

	  _drive.install(FormCreate);
	}
	function install(Vue) {
	  if (Vue._installedFormCreate === true) return;
	  Vue._installedFormCreate = true;
	  Vue.use(formCreate);
	}

	var Form = function () {
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
	      }).class('form-create', true).key(this.unique).get();
	      var unique = this.unique,
	          vn = this.renderSort.map(function (field) {
	        var render = _this.getRender(field);

	        if (render.handler.type === 'hidden') return;
	        return _this.makeComponent(render);
	      });
	      if (vn.length > 0) vn.push(this.makeFormBtn(unique));
	      return this.vNode.form(this.propsData, [this.vNode.row(extend({
	        props: this._fc.options.row || {}
	      }, {
	        key: 'row' + unique
	      }), vn)]);
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
	      var labelWidth = !isComponent(type) && !rule.col.labelWidth && !rule.title ? 1 : rule.col.labelWidth;
	      labelWidth = isNumeric(labelWidth) ? labelWidth + 'px' : labelWidth;
	      var className = rule.className,
	          propsData = this.vData.props({
	        prop: field,
	        label: rule.title,
	        labelFor: unique,
	        rules: rule.validate,
	        labelWidth: labelWidth,
	        required: rule.props.required
	      }).key(fItemUnique).ref('fItem' + refName).class(className).get(),
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

	var Creator = function (_VData) {
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

	var name = "hidden";

	var render = function (_Render) {
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
	  handler: Handler,
	  render: render,
	  name: name,
	  maker: maker
	};

	var handler = function (_Handler) {
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

	var render$1 = function (_Render) {
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
	          var clone = _objectSpread({}, option),
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
	  handler: handler,
	  render: render$1,
	  name: name$1
	};

	var handler$1 = function (_Handler) {
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

	var render$2 = function (_Render) {
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
	          var clone = _objectSpread({}, option),
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
	  handler: handler$1,
	  render: render$2,
	  name: name$2
	};

	var handler$2 = function (_Handler) {
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
	      return toString$1(v);
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
	  handler: handler$2,
	  render: render$3,
	  name: name$3,
	  maker: maker$1
	};

	var handler$3 = function (_Handler) {
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
	  handler: handler$3,
	  render: render$4,
	  name: name$4,
	  maker: maker$2
	};

	var _stringWs = '\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003' +
	  '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var space = '[' + _stringWs + ']';
	var non = '\u200b\u0085';
	var ltrim = RegExp('^' + space + space + '*');
	var rtrim = RegExp(space + space + '*$');

	var exporter = function (KEY, exec, ALIAS) {
	  var exp = {};
	  var FORCE = _fails(function () {
	    return !!_stringWs[KEY]() || non[KEY]() != non;
	  });
	  var fn = exp[KEY] = FORCE ? exec(trim) : _stringWs[KEY];
	  if (ALIAS) exp[ALIAS] = fn;
	  _export(_export.P + _export.F * FORCE, 'String', exp);
	};

	// 1 -> String#trimLeft
	// 2 -> String#trimRight
	// 3 -> String#trim
	var trim = exporter.trim = function (string, TYPE) {
	  string = String(_defined(string));
	  if (TYPE & 1) string = string.replace(ltrim, '');
	  if (TYPE & 2) string = string.replace(rtrim, '');
	  return string;
	};

	var _stringTrim = exporter;

	var gOPN$1 = _objectGopn.f;
	var gOPD$1 = _objectGopd.f;
	var dP$3 = _objectDp.f;
	var $trim = _stringTrim.trim;
	var NUMBER = 'Number';
	var $Number = _global[NUMBER];
	var Base$1 = $Number;
	var proto$2 = $Number.prototype;
	// Opera ~12 has broken Object#toString
	var BROKEN_COF = _cof(_objectCreate(proto$2)) == NUMBER;
	var TRIM = 'trim' in String.prototype;

	// 7.1.3 ToNumber(argument)
	var toNumber = function (argument) {
	  var it = _toPrimitive(argument, false);
	  if (typeof it == 'string' && it.length > 2) {
	    it = TRIM ? it.trim() : $trim(it, 3);
	    var first = it.charCodeAt(0);
	    var third, radix, maxCode;
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal /^0o[0-7]+$/i
	        default: return +it;
	      }
	      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
	        code = digits.charCodeAt(i);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
	  $Number = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var that = this;
	    return that instanceof $Number
	      // check on 1..constructor(foo) case
	      && (BROKEN_COF ? _fails(function () { proto$2.valueOf.call(that); }) : _cof(that) != NUMBER)
	        ? _inheritIfRequired(new Base$1(toNumber(it)), that, $Number) : toNumber(it);
	  };
	  for (var keys$1 = _descriptors ? gOPN$1(Base$1) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES6 (in case, if modules with ES6 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j = 0, key$1; keys$1.length > j; j++) {
	    if (_has(Base$1, key$1 = keys$1[j]) && !_has($Number, key$1)) {
	      dP$3($Number, key$1, gOPD$1(Base$1, key$1));
	    }
	  }
	  $Number.prototype = proto$2;
	  proto$2.constructor = $Number;
	  _redefine(_global, NUMBER, $Number);
	}

	// 20.1.2.4 Number.isNaN(number)


	_export(_export.S, 'Number', {
	  isNaN: function isNaN(number) {
	    // eslint-disable-next-line no-self-compare
	    return number != number;
	  }
	});

	var handler$4 = function (_Handler) {
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
	  handler: handler$4,
	  render: render$5,
	  name: name$5,
	  maker: maker$3
	};

	var handler$5 = function (_Handler) {
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

	var render$6 = function (_Render) {
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
	  handler: handler$5,
	  render: render$6,
	  name: name$6,
	  maker: maker$4
	};

	var handler$6 = function (_Handler) {
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
	  handler: handler$6,
	  render: render$7,
	  name: name$7
	};

	var handler$7 = function (_Handler) {
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
	  handler: handler$7,
	  render: render$8,
	  name: name$8,
	  maker: maker$5
	};

	function getTime$1(date) {
	  return isDate(date) ? dateFormat('hh:mm:ss', date) : date;
	}
	function toDate(time) {
	  return new Date('2018-02-14 ' + time);
	}

	var handler$8 = function (_Handler) {
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
	        if (isArr) {
	          parseValue = value.map(function (time) {
	            return !time ? '' : getTime$1(timeStampToDate(time));
	          });
	        } else {
	          parseValue = ['', ''];
	        }
	      } else {
	        isArr && (value = value[0]);
	        parseValue = !value ? '' : getTime$1(timeStampToDate(value));
	      }

	      return Array.isArray(parseValue) ? parseValue.map(function (time) {
	        return !time ? '' : toDate(time);
	      }) : !parseValue ? '' : toDate(parseValue);
	    }
	  }, {
	    key: "toValue",
	    value: function toValue(n) {
	      return this.el.formatToString(n);
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

	var render$9 = function (_Render) {
	  _inherits(render, _Render);

	  function render() {
	    _classCallCheck(this, render);

	    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
	  }

	  _createClass(render, [{
	    key: "parse",
	    value: function parse() {
	      var _this$handler = this.handler,
	          key = _this$handler.key,
	          rule = _this$handler.rule,
	          vm = _this$handler.vm;
	      return [this.vNode.timePicker(this.inputProps().key(key).get(), toDefSlot(rule.defaultSlot, vm.$createElement, rule))];
	    }
	  }]);

	  return render;
	}(Render);

	var name$9 = "timePicker";
	var maker$6 = {
	  time: creatorTypeFactory(name$9, function (m) {
	    return m.props.isRange = false;
	  }),
	  timeRange: creatorTypeFactory(name$9, function (m) {
	    return m.props.isRange = true;
	  })
	};
	var timepicker = {
	  handler: handler$8,
	  render: render$9,
	  name: name$9,
	  maker: maker$6
	};

	var handler$9 = function (_Handler) {
	  _inherits(handler, _Handler);

	  function handler() {
	    _classCallCheck(this, handler);

	    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
	  }

	  _createClass(handler, [{
	    key: "init",
	    value: function init() {
	      var props = this.rule.props;
	      $set(props, 'type', !props.type ? 'date' : toString$1(props.type).toLowerCase());
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
	        parseValue = toString$1(value);
	      } else {
	        parseValue = isArr ? value[0] || '' : value;
	        parseValue = !parseValue ? '' : timeStampToDate(parseValue);
	      }

	      return parseValue;
	    }
	  }, {
	    key: "toValue",
	    value: function toValue(n) {
	      return this.el.formatToString(n);
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

	var render$a = function (_Render) {
	  _inherits(render, _Render);

	  function render() {
	    _classCallCheck(this, render);

	    return _possibleConstructorReturn(this, _getPrototypeOf(render).apply(this, arguments));
	  }

	  _createClass(render, [{
	    key: "parse",
	    value: function parse() {
	      var _this$handler = this.handler,
	          key = _this$handler.key,
	          rule = _this$handler.rule,
	          vm = _this$handler.vm;
	      return [this.vNode.datePicker(this.inputProps().key(key).get(), toDefSlot(rule.defaultSlot, vm.$createElement, rule))];
	    }
	  }]);

	  return render;
	}(Render);

	var name$a = "datePicker";
	var maker$7 = ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimeRange', 'dateRange'].reduce(function (initial, type) {
	  initial[type] = creatorTypeFactory(name$a, type.toLowerCase());
	  return initial;
	}, {});
	var datepicker = {
	  handler: handler$9,
	  render: render$a,
	  name: name$a,
	  maker: maker$7
	};

	var handler$a = function (_Handler) {
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
	var render$b = defaultRenderFactory(name$b);
	var rate = {
	  handler: handler$a,
	  render: render$b,
	  name: name$b
	};

	var handler$b = function (_Handler) {
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
	var render$c = defaultRenderFactory(name$c, true);
	var colorpicker = {
	  handler: handler$b,
	  render: render$c,
	  name: name$c,
	  maker: maker$8
	};

	var handler$c = function (_Handler) {
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

	var render$d = function (_Render) {
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
	      return [this.vNode.tree(props)];
	    }
	  }]);

	  return render;
	}(Render);

	var name$d = "tree";
	var tree = {
	  handler: handler$c,
	  render: render$d,
	  name: name$d
	};

	// 7.3.20 SpeciesConstructor(O, defaultConstructor)


	var SPECIES$2 = _wks('species');
	var _speciesConstructor = function (O, D) {
	  var C = _anObject(O).constructor;
	  var S;
	  return C === undefined || (S = _anObject(C)[SPECIES$2]) == undefined ? D : _aFunction(S);
	};

	var $min = Math.min;
	var $push = [].push;
	var $SPLIT = 'split';
	var LENGTH = 'length';
	var LAST_INDEX$1 = 'lastIndex';
	var MAX_UINT32 = 0xffffffff;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !_fails(function () { });

	// @@split logic
	_fixReWks('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'[$SPLIT](/(b)*/)[1] == 'c' ||
	    'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 ||
	    'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 ||
	    '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 ||
	    '.'[$SPLIT](/()()/)[LENGTH] > 1 ||
	    ''[$SPLIT](/.?/)[LENGTH]
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(this);
	      if (separator === undefined && limit === 0) return [];
	      // If `separator` is not a regex, use native split
	      if (!_isRegexp(separator)) return $split.call(string, separator, limit);
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = _regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy[LAST_INDEX$1];
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
	          lastLength = match[0][LENGTH];
	          lastLastIndex = lastIndex;
	          if (output[LENGTH] >= splitLimit) break;
	        }
	        if (separatorCopy[LAST_INDEX$1] === match.index) separatorCopy[LAST_INDEX$1]++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string[LENGTH]) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
	    };
	  // Chakra, V8
	  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
	    };
	  } else {
	    internalSplit = $split;
	  }

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = defined(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
	      if (res.done) return res.value;

	      var rx = _anObject(regexp);
	      var S = String(this);
	      var C = _speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return _regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = _regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = $min(_toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = _advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	});

	function getFileName(pic) {
	  return toString$1(pic).split('/').pop();
	}
	function parseValue(value) {
	  return Array.isArray(value) ? value : !value ? [] : [value];
	}

	var handler$d = function (_Handler) {
	  _inherits(handler, _Handler);

	  function handler() {
	    _classCallCheck(this, handler);

	    return _possibleConstructorReturn(this, _getPrototypeOf(handler).apply(this, arguments));
	  }

	  _createClass(handler, [{
	    key: "init",
	    value: function init() {
	      this.parseValue = [];
	      this.rule.props.fileList = [];
	      this.rule.props.showFileList = false;
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

	var vNode = new VNode({});

	var Modal = function Modal(options, cb) {
	  if (isUndef(options.width)) options.width = '30%';
	  return {
	    name: 'fc-modal',
	    data: function data() {
	      return _objectSpread({
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
	  var $modal = _vue.extend(Modal(options, content)),
	      $vm = new $modal().$mount();

	  window.document.body.appendChild($vm.$el);
	}
	function defaultOnHandle(src) {
	  mount({
	    title: '预览'
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

	var render$e = function (_Render) {
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
	      this.uploadOptions = extend(_objectSpread({}, this.options.upload), this.handler.rule.props);
	      this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
	      this.propsData = this.vData.props(this.uploadOptions).class('fc-upload-con', true).props('onSuccess', function () {
	        return _this.onSuccess.apply(_this, arguments);
	      }).props('onRemove', function () {
	        return _this.onRemove.apply(_this, arguments);
	      }).ref(handler.refName).key("fip".concat(handler.unique)).get();
	    }
	  }, {
	    key: "onRemove",
	    value: function onRemove() {
	      var _this$uploadOptions;

	      this.handler.changeParseValue(this.handler.el.uploadFiles);
	      this.uploadOptions.onRemove && (_this$uploadOptions = this.uploadOptions).onRemove.apply(_this$uploadOptions, arguments);
	      this.sync();
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

	      this.handler.changeParseValue(this.handler.el.uploadFiles);
	    }
	  }, {
	    key: "onHandle",
	    value: function onHandle(src) {
	      var fn = this.uploadOptions.onHandle;
	      if (fn) return fn(src);else defaultOnHandle(src);
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
	        class: {
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
	        class: ['fc-files']
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
	        class: ['fc-upload-cover']
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
	        class: ['fc-files']
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
	        class: ['fc-upload-btn']
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
	            fileList.splice(index, 1);

	            _this5.onRemove(file, fileList);
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
	  handler: handler$d,
	  render: render$e,
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
	  var handleIcon = props.handleIcon;
	  if (props.type === 'file' && props.handleIcon === undefined) handleIcon = false;else handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'el-icon-view' : props.handleIcon;
	  $set(props, 'handleIcon', handleIcon);
	  if (props.allowRemove === undefined) $set(props, 'allowRemove', true);
	}

	var handler$e = function (_Handler) {
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

	var render$f = function (_Render) {
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
	      }).key('ifit' + unique).style({
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
	        class: ['fc-upload', 'fc-frame'],
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
	          class: ['fc-files']
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
	          class: ['fc-files']
	        }, [_this3.vNode.icon({
	          key: "iff".concat(unique).concat(index),
	          class: ['el-icon-tickets']
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
	        class: ['fc-upload-btn'],
	        on: {
	          click: function click() {
	            if (props.disabled === true) return;

	            _this4.showModel();
	          }
	        }
	      }, [this.vNode.icon({
	        key: "ifbi3".concat(unique),
	        class: [this._props.icon]
	      })]);
	    }
	  }, {
	    key: "makeIcons",
	    value: function makeIcons(src, key, index) {
	      var _this5 = this;

	      if (this.issetIcon === true) return this.vNode.make('div', {
	        key: "ifis".concat(key).concat(index),
	        class: ['fc-upload-cover']
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
	        class: [toString$1(props.handleIcon)],
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
	      if (fn) return fn(src);else defaultOnHandle(src);
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
	          title = _this$_props.title;
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
	        }, ['关闭']), vNode.button({
	          props: {
	            type: 'primary'
	          },
	          on: {
	            click: function click() {
	              _this8.onOk() !== false && _vm.onClose();
	            }
	          }
	        }, ['确定'])])];
	      });
	    }
	  }]);

	  return render;
	}(Render);
	Object.keys(eventList).forEach(function (k) {
	  render$f.prototype[k] = function () {
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
	  handler: handler$e,
	  render: render$f,
	  name: name$f,
	  maker: maker$a
	};

	var render$g = function (_Render) {
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
	      return [this.vNode.switch(this.inputProps().scopedSlots({
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
	  render: render$g,
	  name: name$g,
	  maker: maker$b
	};

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
	    create: function create(type, field) {
	      var make = commonMaker('', field);
	      make.rule.type = type;
	      return make;
	    },
	    createTmp: function createTmp(template, vm, field) {
	      var make = commonMaker('', field);
	      make.rule.type = 'template';
	      make.rule.template = template;
	      make.rule.vm = vm;
	      return make;
	    }
	  });
	  _m.template = _m.createTmp;
	  return _m;
	}

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
	  var _this2 = this;

	  var vm = fComponent.vm;

	  function tidyFields(fields) {
	    var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
	    if (!fields) fields = all ? Object.keys(fComponent.handlers) : vm._formField();else if (!Array.isArray(fields)) fields = [fields];
	    return fields;
	  }

	  return {
	    formData: function formData() {
	      return vm._formField().reduce(function (initial, key) {
	        initial[key] = vm._value(key);
	        return initial;
	      }, {});
	    },
	    getValue: function getValue(field) {
	      field = toString$1(field);
	      if (vm._formField(field) === undefined) throw new Error("".concat(field, " \u5B57\u6BB5\u4E0D\u5B58\u5728!") + errMsg());else {
	        return vm._value(field);
	      }
	    },
	    setValue: function setValue(field, value) {
	      var _this = this;

	      var formData = field;
	      if (!isPlainObject(field)) formData = _defineProperty({}, field, value);
	      Object.keys(formData).forEach(function (key) {
	        _this.changeField(key, formData[key]);
	      });
	    },
	    changeValue: function changeValue(field, value) {
	      this.changeField(field, value);
	    },
	    changeField: function changeField(field, value) {
	      field = toString$1(field);
	      var handler = fComponent.handlers[field];
	      if (handler === undefined) return;
	      if (isFunction(value)) value(vm._trueData(field), function (changeValue) {
	        _this2.changeField(field, changeValue);
	      });else {
	        handler.setValue(value);
	      }
	    },
	    removeField: function removeField(field) {
	      var handler = fComponent.handlers[field];
	      if (!handler) return;
	      var fields = handler.root.map(function (rule) {
	        return rule.__field__;
	      }),
	          index = fields.indexOf(toString$1(field));
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
	      var _this3 = this;

	      var handlers = fComponent.handlers;
	      tidyFields(fields, true).forEach(function (field) {
	        var handler = handlers[field];
	        if (!handler) return;
	        if (!handler.noValue) handler.reset();else handler.$emit('reset-field', _this3);
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
	          index = fields.indexOf(toString$1(after));

	      if (isUndef(after)) {
	        index = fields.length;
	      } else if (index === -1) return;

	      fComponent.rules.splice(index + 1, 0, rule);
	    },
	    prepend: function prepend(rule, after) {
	      var fields = fComponent.fieldList,
	          index = fields.indexOf(toString$1(after));

	      if (isUndef(after)) {
	        index = 0;
	      } else if (index === -1) return;else index--;

	      fComponent.rules.splice(index + 1, 0, rule);
	    },
	    submit: function submit(successFn, failFn) {
	      var _this4 = this;

	      this.validate(function () {
	        var formData = _this4.formData();

	        if (isFunction(successFn)) successFn(formData, _this4);else fComponent.options.onSubmit && fComponent.options.onSubmit(formData);
	      }, function () {
	        return failFn && failFn();
	      });
	    },
	    hidden: function hidden(fields) {
	      var _hidden = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      tidyFields(fields).forEach(function (field) {
	        var handler = fComponent.handlers[field];
	        if (!fComponent.handlers[field]) return;
	        vm.$set(vm._trueData(field).rule.props, 'hidden', !!_hidden);
	        handler.render.sync();
	      });
	    },
	    visibility: function visibility(fields) {
	      var _visibility = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      tidyFields(fields).forEach(function (field) {
	        var handler = fComponent.handlers[field];
	        if (!handler) return;
	        vm.$set(vm._trueData(field).rule.props, 'visibility', !!_visibility);
	        handler.render.sync();
	      });
	    },
	    disabled: function disabled(fields) {
	      var _this5 = this;

	      var _disabled = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

	      _disabled = !!_disabled;
	      tidyFields(fields, true).forEach(function (field) {
	        var handler = fComponent.handlers[field];
	        if (!handler) return;
	        if (!handler.noValue) vm.$set(vm._trueData(field).rule.props, 'disabled', _disabled);else handler.$emit('disabled', _disabled, _this5);
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
	    model: function model(fields) {
	      var model = {},
	          _fields = this.fields();

	      tidyFields(fields).forEach(function (field) {
	        if (_fields.indexOf(field) === -1) return console.error("".concat(field, " \u5B57\u6BB5\u4E0D\u5B58\u5728") + errMsg());
	        model[field] = vm._trueData(field);
	      });
	      return model;
	    },
	    component: function component() {
	      return _objectSpread({}, vm.components);
	    },
	    bind: function bind(fields) {
	      var bind = {},
	          properties = {},
	          _fields = this.fields();

	      tidyFields(fields).forEach(function (field) {
	        if (_fields.indexOf(field) === -1) return console.error("".concat(field, " \u5B57\u6BB5\u4E0D\u5B58\u5728") + errMsg());

	        var rule = vm._trueData(field);

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
	      return fComponent.reload(rules);
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
	  switch: iswitch
	};
	var style = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' + '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' + '.fc-upload .el-upload{display: block;}' + '.fc-upload-btn{border: 1px dashed #c0ccda;cursor: pointer;}' + '.fc-upload .fc-upload-con{display:inline-block;}' + '.fc-upload .fc-upload-cover{opacity: 0; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); transition: opacity .3s;}' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-files:hover .fc-upload-cover{opacity: 1; }' + '.form-create .el-form-item .el-rate{margin-top:10px;}' + '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';
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
	var drive$1 = {
	  componentList: componentList,
	  formRender: Form,
	  style: style,
	  getConfig: getConfig,
	  getGlobalApi: getGlobalApi,
	  install: install$1
	};

	setDrive(drive$1);

	if (typeof window !== 'undefined') {
	  window.formCreate = FormCreate;

	  if (window.Vue) {
	    install(Vue);
	  }
	}

	exports.default = FormCreate;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
