/*!
 * form-create v1.5.4
 * (c) 2018-2019 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue'), require('iview')) :
    typeof define === 'function' && define.amd ? define(['exports', 'vue', 'iview'], factory) :
    (factory((global.formCreate = {}),global.Vue,global.iview));
}(this, (function (exports,Vue$1,iview) { 'use strict';

    Vue$1 = Vue$1 && Vue$1.hasOwnProperty('default') ? Vue$1['default'] : Vue$1;
    iview = iview && iview.hasOwnProperty('default') ? iview['default'] : iview;

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
      return val == null ? '' : typeof val === 'object' ? JSON.stringify(val, null, 2) : String(val);
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
        var arg = [], len = arguments.length;
        while ( len-- ) arg[ len ] = arguments[ len ];

        if (timeout !== null) { clearTimeout(timeout); }
        timeout = setTimeout(function () { return fn.apply(void 0, arg); }, wait);
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
      if (line.indexOf('-') === 0) { line = line.substr(1); }
      return line;
    }
    function isNumeric(n) {
      return n !== '' && !isNaN(parseFloat(n)) && isFinite(n);
    }
    function toArray(a) {
      return Array.isArray(a) ? a : [a];
    }
    function isElement(arg) {
      return typeof arg === 'object' && arg !== null && arg.nodeType === 1 && !isPlainObject(arg);
    }
    function deepExtend(origin, target) {
      if ( target === void 0 ) target = {};

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
    function dateFormat(fmt, date) {
      if ( date === void 0 ) date = new Date();

      var o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "h+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        "S": date.getMilliseconds()
      };
      if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length)); }

      for (var k in o) { if (new RegExp("(" + k + ")").test(fmt)) { fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)); } }

      return fmt;
    }
    function errMsg() {
      return '\n\x67\x69\x74\x68\x75\x62\x3a\x68\x74\x74\x70' + '\x73\x3a\x2f\x2f\x67\x69\x74\x68\x75\x62\x2e\x63\x6f' + '\x6d\x2f\x78\x61\x62\x6f\x79\x2f\x66\x6f\x72\x6d\x2d' + '\x63\x72\x65\x61\x74\x65\n\x64\x6f\x63\x75\x6d\x65' + '\x6e\x74\x3a\x68\x74\x74\x70\x3a\x2f\x2f\x77\x77\x77' + '\x2e\x66\x6f\x72\x6d\x2d\x63\x72\x65\x61\x74\x65\x2e' + '\x63\x6f\x6d';
    }

    var Handler = function Handler(vm, _rule, Render, options, noValue) {
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
        this.field = 'tmp' + uniqueId();
        this.isDef = false;
      } else {
        this.field = rule.field;
      }

      this.init();
      this.refresh();
      this.refName = '__' + this.field + this.id;
      if (isUndef(rule.props.elementId)) { $set(rule.props, 'elementId', this.unique); }
      this.render = new Render(vm, this, options);
    };

    Handler.prototype.refresh = function refresh () {
      var id = uniqueId();
      this.id = id;
      this.unique = 'fc_' + id;
      this.key = 'key_' + id;
      this.parseValue = this.toFormValue(this.rule.value);
      return this;
    };

    Handler.prototype.init = function init () {};

    Handler.prototype.toFormValue = function toFormValue (value) {
      return value;
    };

    Handler.prototype.toValue = function toValue (parseValue) {
      return parseValue;
    };

    Handler.prototype.setValue = function setValue (value) {
      this.rule.value = value;

      this.vm._changeValue(this.field, value);
    };

    Handler.prototype.getValue = function getValue () {
      return this.vm._value(this.field);
    };

    Handler.prototype.watchValue = function watchValue (n) {
      $set(this.rule, 'value', n);

      this.vm._changeFormData(this.field, this.toFormValue(n));
    };

    Handler.prototype.watchFormValue = function watchFormValue (n) {};

    Handler.prototype.reset = function reset () {
      this.vm._changeValue(this.field, this.defaultValue);
    };

    Handler.prototype.mounted = function mounted () {
      var refName = 'fItem' + this.refName,
          vm = this.vm,
          children = this.rule.children;
      this.el = vm.$refs[this.refName];
      this.defaultValue = this.toValue(vm.$refs[refName] ? vm.$refs[refName].initialValue : deepExtend({}, {
        value: this.rule.value
      }).value);
      if (Array.isArray(children) && children.length > 0) { children.forEach(function (child) { return !isString(child) && child.__handler__.mounted(); }); }
    };
    function defRule() {
      return {
        validate: [],
        event: {},
        col: {},
        emit: [],
        props: [],
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
        if (isUndef(rule[k])) { $set(rule, k, def[k]); }
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
      if (Object.keys(emitEvent).length > 0) { extend(on, emitEvent); }
      return on;
    }
    function parseArray(validate) {
      return Array.isArray(validate) ? validate : [];
    }
    function parseEmit(field, emitPrefix, emit, vm) {
      var event = {};
      if (!Array.isArray(emit)) { return event; }
      emit.forEach(function (eventName) {
        var fieldKey = toLine((field + "-" + eventName)).replace('_', '-');
        var emitKey = emitPrefix ? (emitPrefix + "-").toLowerCase() + toLine(eventName) : emitPrefix;

        event[("on-" + eventName)] = event[eventName] = function () {
          var arg = [], len = arguments.length;
          while ( len-- ) arg[ len ] = arguments[ len ];

          vm.$emit.apply(vm, [ fieldKey ].concat( arg ));
          if (emitKey && fieldKey !== emitKey) { vm.$emit.apply(vm, [ emitKey ].concat( arg )); }
        };
      });
      return event;
    }
    function parseEvent(event) {
      Object.keys(event).forEach(function (eventName) {
        var _name = toString$1(eventName).indexOf('on-') === 0 ? eventName : ("on-" + eventName);

        if (_name !== eventName) {
          $set(event, _name, event[eventName]);
        }
      });
      return event;
    }
    function parseProps(props) {
      if (isUndef(props.hidden)) { $set(props, 'hidden', false); }
      if (isUndef(props.visibility)) { $set(props, 'visibility', false); }
      return props;
    }
    function parseCol(col) {
      if (isNumeric(col)) {
        return {
          span: col
        };
      } else if (col.span === undefined) { $set(col, 'span', 24); }

      return col;
    }

    function parseVData(data) {
      if (isString(data)) { data = {
        domProps: {
          innerHTML: data
        }
      }; }else if (data && isFunction(data.get)) { data = data.get(); }
      return data;
    }
    function getVNode(VNode) {
      return isFunction(VNode) ? VNode() : VNode || [];
    }
    var VNode = function VNode(vm) {
      this.setVm(vm);
    };

    VNode.prototype.setVm = function setVm (vm) {
      this.vm = vm;
      this.$h = vm.$createElement;
    };

    VNode.prototype.make = function make (nodeName, data, VNodeFn) {
      var Node = this.$h(nodeName, parseVData(data), getVNode(VNodeFn));
      Node.context = this.vm;
      return Node;
    };
    var nodes = {
      modal: 'Modal',
      progress: 'i-progress',
      button: 'i-button',
      icon: 'Icon',
      span: 'span',
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
      AutoComplete: 'AutoComplete'
    };
    Object.keys(nodes).forEach(function (k) {
      VNode.prototype[k] = function (data, VNodeFn) {
        return this.make(nodes[k], data, VNodeFn);
      };
    });

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
    var VData = function VData() {
      this.init();
    };

    VData.prototype.class = function class$1 (classList, status) {
        var this$1 = this;
        if ( status === void 0 ) status = true;

      if (isUndef(classList)) { return this; }

      if (Array.isArray(classList)) {
        classList.forEach(function (cls) {
          $set(this$1._data.class, toString$1(cls), true);
        });
      } else if (isPlainObject(classList)) {
        $set(this._data, 'class', extend(this._data.class, classList));
      } else {
        $set(this._data.class, toString$1(classList), status === undefined ? true : status);
      }

      return this;
    };

    VData.prototype.directives = function directives (directives$1) {
      if (isUndef(directives$1)) { return this; }
      $set(this._data, 'directives', this._data.directives.concat(toArray(directives$1)));
      return this;
    };

    VData.prototype.init = function init () {
      this._data = defVData();
      return this;
    };

    VData.prototype.get = function get () {
      this._prev = this._data;
      this.init();
      return this._prev;
    };
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
        if (isUndef(obj)) { return this; }

        if (isPlainObject(obj)) {
          $set(this._data, key, extend(this._data[key], obj));
        } else {
          $set(this._data[key], toString$1(obj), val);
        }

        return this;
      };
    });

    var Render = function Render(vm, handler, options) {
      if ( options === void 0 ) options = {};

      this.vm = vm;
      this.handler = handler;
      this.options = options;
      this.vNode = new VNode(vm);
      this.vData = new VData();
      this.cache = null;
      this.$tickEvent = [];
      this.init();
    };

    Render.prototype.init = function init () {};

    Render.prototype.cacheParse = function cacheParse (form, _super) {
      var ref = this.handler;
        var noValue = ref.noValue;
        var noCache = ref.noCache;
      if (!this.cache || noValue === true || noCache === true) { this.cache = _super ? _super.parse.call(this, form) : this.parse(form); }
      var eventList = [].concat( this.$tickEvent );
      this.$tickEvent = [];
      if (eventList.length) { $nt(function () {
        eventList.forEach(function (event) { return event(); });
      }); }
      return this.cache;
    };

    Render.prototype.sync = function sync (event) {
      if (isFunction(event)) { this.$tickEvent.push(event); }
      this.clearCache();

      this.vm._sync();
    };

    Render.prototype.clearCache = function clearCache () {
      this.cache = null;
      var children = this.handler.rule.children;
      if (Array.isArray(children) && children.length > 0) { children.forEach(function (child) { return !isString(child) && child.__handler__.render.clearCache(); }); }
    };

    Render.prototype.parse = function parse (form) {
        var this$1 = this;

      var ref = this.handler;
        var type = ref.type;
        var rule = ref.rule;
        var refName = ref.refName;
        var key = ref.key;
        var noValue = ref.noValue;
        var origin = ref.origin;
        var root = ref.root;
        var vm = ref.vm;

      if (rule.type === 'template') {
        if (Vue$1.compile !== undefined) {
          if (isUndef(rule.vm)) { rule.vm = new Vue$1(); }
          var vn = Vue$1.compile(rule.template, {}).render.call(rule.vm);
          if (vn.data === undefined) { vn.data = {}; }
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
        this.handler.origin = [].concat( root );
        return form.makeComponent(this.handler.render);
      } else {
        rule.ref = refName;
        if (isUndef(rule.key)) { rule.key = 'def' + uniqueId(); }
        var vn$1 = this.vNode.make(type, Object.assign({}, rule), function () {
          var vn = [],
              children = rule.children || [];

          if (Array.isArray(children) && children.length > 0) {
            vn = children.map(function (child) {
              if (isString(child)) { return [child]; }
              if (!child.__handler__) { vm._fComponent.createHandler([child], true); }
              return child.__handler__.render.cacheParse(form, this$1);
            });
          }

          return vn;
        });
        vn$1.key = key;
        return [vn$1];
      }
    };

    Render.prototype.inputProps = function inputProps () {
        var this$1 = this;

      var ref = this.handler;
        var refName = ref.refName;
        var key = ref.key;
        var field = ref.field;
        var ref_rule = ref.rule;
        var props = ref_rule.props;
        var event = ref_rule.event;
      var data = this.vData.props(props).props({
        value: this.vm._formData(field)
      }).ref(refName).key(key + 'fc' + field).on(event).on('input', function (value) {
        this$1.onInput(value);
      });
      if (isUndef(props.size)) { data.props({
        size: this.options.form.size
      }); }
      return data;
    };

    Render.prototype.onInput = function onInput (value) {
      var handler = this.handler;
        var ref = this.handler;
        var field = ref.field;
        var vm = ref.vm;
        var trueValue = handler.toValue(value);

      vm._changeFormData(field, value);

      handler.setValue(trueValue);

      vm._change(field, JSON.stringify(value));

      handler.watchFormValue(value);
    };

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
      return function (title, field, value, props) {
        if ( props === void 0 ) props = {};

        return new Creator(name, title, field, value, props);
      };
    }
    function creatorTypeFactory(name, type, typeName) {
      if ( typeName === void 0 ) typeName = 'type';

      return function (title, field, value, props) {
        if ( props === void 0 ) props = {};

        var maker = new Creator(name, title, field, value, props);
        if (isFunction(type)) { type(maker); }else { maker.props(typeName, type); }
        return maker;
      };
    }
    var Creator = /*@__PURE__*/(function (VData$$1) {
      function Creator(type, title, field, value, props) {
        if ( props === void 0 ) props = {};

        VData$$1.call(this);
        this.rule = extend(baseRule(), {
          type: type,
          title: title,
          field: field,
          value: value
        });
        this.props({
          hidden: false,
          visibility: false
        });
        if (isPlainObject(props)) { this.props(props); }
      }

      if ( VData$$1 ) Creator.__proto__ = VData$$1;
      Creator.prototype = Object.create( VData$$1 && VData$$1.prototype );
      Creator.prototype.constructor = Creator;

      Creator.prototype.type = function type (type$1) {
        this.props('type', type$1);
        return this;
      };

      Creator.prototype.get = function get () {
        return this._data;
      };

      Creator.prototype.getRule = function getRule () {
        return extend(this.rule, this.get());
      };

      Creator.prototype.setValue = function setValue (value) {
        $set(this.rule, 'value', value);
        return this;
      };

      return Creator;
    }(VData));
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
        if (!Array.isArray(opt)) { opt = [opt]; }
        $set(this.rule, attr, this.rule[attr].concat(opt));
        return this;
      };
    });

    var name = "hidden";

    var handler = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      

      return handler;
    }(Handler));

    var render = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        return [];
      };

      return render;
    }(Render));

    var maker = {};
    maker[name] = function (field, value) { return creatorFactory(name)('', field, value); };
    var hiddenComponent = {
      handler: handler,
      render: render,
      name: name,
      maker: maker
    };

    var name$1 = "input";
    var handler$1 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        var ref = this.rule;
        var props = ref.props;
        if (props.autosize && props.autosize.minRows) { $set(props, 'rows', props.autosize.minRows || 2); }
      };

      handler.prototype.toFormValue = function toFormValue (v) {
        return toString$1(v);
      };

      return handler;
    }(Handler));
    var render$1 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        return [this.vNode.input(this.inputProps().get())];
      };

      return render;
    }(Render));
    var maker$1 = ['password', 'url', 'email', 'text'].reduce(function (initial, type) {
      initial[type] = creatorTypeFactory(name$1, type);
      return initial;
    }, {});
    maker$1.idate = creatorTypeFactory(name$1, 'date');
    var inputComponent = {
      render: render$1,
      handler: handler$1,
      name: name$1,
      maker: maker$1
    };

    var name$2 = "radio";

    var handler$2 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.toFormValue = function toFormValue (value) {
        return this.rule.options.filter(function (opt) { return opt.value === value; }).reduce(function (initial, opt) { return opt.label; }, '');
      };

      handler.prototype.toValue = function toValue (parseValue) {
        return this.rule.options.filter(function (opt) { return opt.label === parseValue; }).reduce(function (initial, opt) { return opt.value; }, '');
      };

      return handler;
    }(Handler));

    var render$2 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        var this$1 = this;

        var ref = this.handler;
        var unique = ref.unique;
        var options = ref.rule.options;
        return [this.vNode.radioGroup(this.inputProps().get(), function () { return options.map(function (option, index) {
          var clone = Object.assign({}, option);
          delete clone.value;
          return this$1.vNode.radio({
            props: clone,
            key: ("ropt" + index + unique)
          });
        }); })];
      };

      return render;
    }(Render));

    var radioComponent = {
      handler: handler$2,
      render: render$2,
      name: name$2
    };

    var name$3 = "checkbox";

    var handler$3 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.toFormValue = function toFormValue (value) {
        if (!value) { value = []; }else if (!Array.isArray(value)) { value = [value]; }
        return this.rule.options.filter(function (opt) { return value.indexOf(opt.value) !== -1; }).map(function (option) { return option.label; });
      };

      handler.prototype.toValue = function toValue (parseValue) {
        var value = this.rule.options.filter(function (opt) { return parseValue.indexOf(opt.label) !== -1; }).map(function (opt) { return opt.value; });
        if (this.rule.options.length === 1) { return value[0] === undefined ? '' : value[0]; }else { return value; }
      };

      handler.prototype.watchFormValue = function watchFormValue (n) {
        Handler$$1.prototype.watchFormValue.call(this, n);
        this.render.sync();
      };

      return handler;
    }(Handler));

    var render$3 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        var this$1 = this;

        var ref = this.handler;
        var unique = ref.unique;
        var options = ref.rule.options;
        var key = ref.key;
        return [this.vNode.checkboxGroup(this.inputProps().key(key).get(), function () { return options.map(function (option, index) {
          var clone = Object.assign({}, option);
          delete clone.value;
          return this$1.vNode.checkbox({
            props: clone,
            key: ("copt" + index + unique)
          });
        }); })];
      };

      return render;
    }(Render));

    var checkboxComponent = {
      handler: handler$3,
      render: render$3,
      name: name$3
    };

    var name$4 = "switch";

    var handler$4 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        if (this.rule.slot === undefined) { $set(this.rule, 'slot', {}); }
      };

      return handler;
    }(Handler));

    var render$4 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        var rule = this.handler.rule,
            slot = isUndef(rule.props.slot) ? rule.slot : rule.props.slot;
        return [this.vNode.switch(this.inputProps().scopedSlots({
          open: function () { return slot.open; },
          close: function () { return slot.close; }
        }).style({
          'margin': '4.5px 0px'
        }).get())];
      };

      return render;
    }(Render));

    var switchComponent = {
      handler: handler$4,
      render: render$4,
      name: name$4
    };

    var name$5 = "select";

    var handler$5 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.toFormValue = function toFormValue (value) {
        var isArr = Array.isArray(value);
        if (this.rule.props.multiple === true) { return isArr === true ? value : [value]; }else { return isArr === true ? value[0] || '' : value; }
      };

      handler.prototype.watchFormValue = function watchFormValue (n) {
        Handler$$1.prototype.watchFormValue.call(this, n);
        this.render.sync();
      };

      return handler;
    }(Handler));

    var render$5 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        var this$1 = this;

        var ref = this.handler;
        var unique = ref.unique;
        var rule = ref.rule;
        return [this.vNode.select(this.inputProps().get(), function () { return rule.options.map(function (option, index) { return this$1.vNode.option({
          props: option,
          key: ("sopt" + index + unique)
        }, toDefSlot(option.slot, this$1.vm.$createElement, rule)); }); })];
      };

      return render;
    }(Render));

    var maker$2 = {
      selectMultiple: creatorTypeFactory(name$5, true, 'multiple'),
      selectOne: creatorTypeFactory(name$5, false, 'multiple')
    };
    var selectComponent = {
      handler: handler$5,
      render: render$5,
      name: name$5,
      maker: maker$2
    };

    var name$6 = "datePicker";

    var handler$6 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        var props = this.rule.props;
        $set(props, 'type', !props.type ? 'date' : toString$1(props.type).toLowerCase());
        if (isUndef(props.startDate)) { $set(props, 'startDate', timeStampToDate(props.startDate)); }
      };

      handler.prototype.toFormValue = function toFormValue (value) {
        var isArr = Array.isArray(value),
            props = this.rule.props,
            parseValue;

        if (['daterange', 'datetimerange'].indexOf(props.type) !== -1) {
          if (isArr) {
            parseValue = value.map(function (time) { return !time ? '' : timeStampToDate(time); });
          } else {
            parseValue = ['', ''];
          }
        } else if ('date' === props.type && props.multiple === true) {
          parseValue = toString$1(value);
        } else {
          parseValue = isArr ? value[0] || '' : value;
          parseValue = !parseValue ? '' : timeStampToDate(parseValue);
        }

        return parseValue;
      };

      handler.prototype.toValue = function toValue () {
        return this.el.publicStringValue;
      };

      handler.prototype.mounted = function mounted () {
        Handler$$1.prototype.mounted.call(this);
        this.rule.value = this.el.publicStringValue;

        this.vm._changeFormData(this.field, this.toFormValue(this.el.publicStringValue));
      };

      return handler;
    }(Handler));

    var render$6 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        var ref = this.handler;
        var key = ref.key;
        var rule = ref.rule;
        var vm = ref.vm;
        return [this.vNode.datePicker(this.inputProps().key(key).get(), toDefSlot(rule.defaultSlot, vm.$createElement, rule))];
      };

      return render;
    }(Render));

    var maker$3 = ['date', 'dateRange', 'dateTime', 'dateTimeRange', 'year', 'month'].reduce(function (initial, type) {
      initial[type] = creatorTypeFactory(name$6, type.toLowerCase());
      return initial;
    }, {});
    var datePickerComponent = {
      handler: handler$6,
      render: render$6,
      name: name$6,
      maker: maker$3
    };

    var name$7 = 'timePicker';
    function getTime(date) {
      return isDate(date) ? dateFormat('hh:mm:ss', date) : date;
    }

    var handler$7 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        var props = this.rule.props;
        if (!props.type) { $set(props, 'type', 'time'); }
        if (isUndef(props.confirm)) { $set(props, 'confirm', true); }
      };

      handler.prototype.toFormValue = function toFormValue (value) {
        var parseValue,
            isArr = Array.isArray(value);

        if ('timerange' === this.rule.props.type) {
          if (isArr) {
            parseValue = value.map(function (time) { return !time ? '' : getTime(timeStampToDate(time)); });
          } else {
            parseValue = ['', ''];
          }
        } else {
          isArr && (value = value[0]);
          parseValue = !value ? '' : getTime(timeStampToDate(value));
        }

        return parseValue;
      };

      handler.prototype.mounted = function mounted () {
        Handler$$1.prototype.mounted.call(this);
        this.rule.value = this.el.publicStringValue;

        this.vm._changeFormData(this.field, this.toFormValue(this.el.publicStringValue));
      };

      return handler;
    }(Handler));

    var render$7 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        var ref = this.handler;
        var key = ref.key;
        var rule = ref.rule;
        var vm = ref.vm;
        return [this.vNode.timePicker(this.inputProps().key(key).get(), toDefSlot(rule.defaultSlot, vm.$createElement, rule))];
      };

      return render;
    }(Render));

    var maker$4 = {
      time: creatorTypeFactory(name$7, 'time'),
      timeRange: creatorTypeFactory(name$7, 'timerange')
    };
    var timePickerComponent = {
      handler: handler$7,
      render: render$7,
      maker: maker$4,
      name: name$7
    };

    var name$8 = "inputNumber";

    var handler$8 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.toFormValue = function toFormValue (value) {
        var parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) { parseValue = 0; }
        return parseValue;
      };

      return handler;
    }(Handler));

    var render$8 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        return [this.vNode.inputNumber(this.inputProps().get())];
      };

      return render;
    }(Render));

    var maker$5 = {
      number: creatorFactory(name$8)
    };
    var inputNumberComponent = {
      handler: handler$8,
      render: render$8,
      name: name$8,
      maker: maker$5
    };

    var name$9 = "colorPicker";

    var handler$9 = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.watchFormValue = function watchFormValue (n) {
        Handler$$1.prototype.watchFormValue.call(this, n);
        this.render.sync();
      };

      return handler;
    }(Handler));

    var render$9 = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        return [this.vNode.colorPicker(this.inputProps().key(this.handler.key).get())];
      };

      return render;
    }(Render));

    var maker$6 = {
      color: creatorFactory(name$9)
    };
    var colorPickerComponent = {
      handler: handler$9,
      render: render$9,
      name: name$9,
      maker: maker$6
    };

    var name$a = "upload";
    function getFileName(pic) {
      return toString$1(pic).split('/').pop();
    }
    function parseValue(value) {
      return Array.isArray(value) ? value : !value ? [] : [value];
    }

    var handler$a = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        var props = this.rule.props;
        $set(props, 'defaultFileList', []);
        if (isUndef(props.showUploadList)) { $set(props, 'showUploadList', false); }
        if (isUndef(props.uploadType)) { $set(props, 'uploadType', 'file'); }
        if (props.maxLength === undefined) { $set(props, 'maxLength', 0); }
        if (props.action === undefined) { $set(props, 'action', ''); }
        if (props.uploadType === 'file' && props.handleIcon === undefined) { $set(props, 'handleIcon', false); }
        $set(this.rule, 'value', parseValue(this.rule.value));
        this.parseValue = [];
      };

      handler.prototype.toFormValue = function toFormValue (value) {
        var this$1 = this;

        var files = parseValue(value);
        this.parseValue.splice(0, this.parseValue.length);
        files.forEach(function (file) { return this$1.push(file); });
        $set(this.rule.props, 'defaultFileList', this.parseValue);
        return this.parseValue;
      };

      handler.prototype.mounted = function mounted () {
        Handler$$1.prototype.mounted.call(this);
        $set(this.rule.props, 'defaultFileList', this.parseValue);
        this.changeParseValue(this.el.fileList);
      };

      handler.prototype.push = function push (file) {
        this.parseValue.push({
          url: file,
          name: getFileName(file)
        });
      };

      handler.prototype.toValue = function toValue (parseValue) {
        if (isUndef(parseValue)) { return []; }
        var files = parseValue.map(function (file) { return file.url; }).filter(function (file) { return file !== undefined; });
        return this.rule.props.maxLength === 1 ? files[0] || '' : files;
      };

      handler.prototype.changeParseValue = function changeParseValue (parseValue) {
        this.parseValue = parseValue;

        this.vm._changeFormData(this.field, parseValue);
      };

      handler.prototype.watchValue = function watchValue (n) {
        var b = true;
        this.rule.props.defaultFileList.forEach(function (pic) {
          b = b && (pic.percentage === undefined || pic.status === 'finished');
        });
        if (b) { Handler$$1.prototype.watchValue.call(this, n); }
      };

      return handler;
    }(Handler)); //const propsEventType = ['beforeUpload','onProgress','onPreview','onRemove','onFormatError','onExceededSize','onError'];


    var render$a = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.init = function init () {
        var this$1 = this;

        var handler = this.handler;
        this.uploadOptions = extend(Object.assign({}, this.options.upload), this.handler.rule.props);
        this.issetIcon = this.uploadOptions.allowRemove || this.uploadOptions.handleIcon;
        this.propsData = this.vData.props(this.uploadOptions).props('onSuccess', function () {
          var ref;

          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];
          return (ref = this$1).onSuccess.apply(ref, args);
        }).props('onRemove', function () {
          var ref;

          var args = [], len = arguments.length;
          while ( len-- ) args[ len ] = arguments[ len ];
          return (ref = this$1).onRemove.apply(ref, args);
        }).ref(handler.refName).key(("fip" + (handler.unique))).get();
      };

      render.prototype.onRemove = function onRemove () {
        var ref;

        var args = [], len = arguments.length;
        while ( len-- ) args[ len ] = arguments[ len ];
        this.handler.changeParseValue(this.handler.el.fileList);
        this.uploadOptions.onRemove && (ref = this.uploadOptions).onRemove.apply(ref, args);
        this.sync();
      };

      render.prototype.onSuccess = function onSuccess (response, file, fileList) {
        var url = this.uploadOptions.onSuccess.call(null, response, file, fileList);

        if (!isUndef(url)) {
          file.url = url;
          file.showProgress = false;
        } else {
          var index = fileList.indexOf(file);
          if (index !== -1) { fileList.splice(index, 1); }
        }

        this.handler.changeParseValue(this.handler.el.fileList);
      };

      render.prototype.defaultOnHandle = function defaultOnHandle (src) {
        var this$1 = this;

        this.vm.$Modal.remove();
        setTimeout(function () {
          this$1.vm.$Modal.info({
            title: "预览",
            render: function (h) {
              return h('img', {
                attrs: {
                  src: src
                },
                style: "width: 100%",
                key: 'ifmd' + uniqueId()
              });
            },
            showCancel: true,
            closable: true,
            scrollable: true
          });
        }, 301);
      };

      render.prototype.onHandle = function onHandle (src) {
        var fn = this.uploadOptions.onHandle;
        if (fn) { return fn(src); }else { this.defaultOnHandle(src); }
      };

      render.prototype.parse = function parse () {
        var this$1 = this;

        var ref = this.handler;
        var unique = ref.unique;
        var field = ref.field;
        this.init();
        if (this.uploadOptions.handleIcon === true) { this.uploadOptions.handleIcon = 'ios-eye-outline'; }

        var value = this.vm._formData(field),
            render = this.uploadOptions.showUploadList ? [] : [].concat( value.map(function (file, index) {
          if (file.showProgress) {
            return this$1.makeProgress(file, ("uppg" + index + unique));
          } else if (file.status === undefined || file.status === 'finished') {
            return this$1.makeUploadView(file.url, ("upview" + index + unique), index);
          }
        }) );

        var isShow = !this.uploadOptions.maxLength || this.uploadOptions.maxLength > value.length;
        render.push(this.makeUploadBtn(unique, isShow));
        return [this.vNode.make('div', {
          key: ("div4" + unique),
          class: {
            'fc-upload': true,
            'fc-hide-btn': !isShow
          }
        }, render)];
      };

      render.prototype.cacheParse = function cacheParse (form) {
        this.cache = null;
        return Render$$1.prototype.cacheParse.call(this, form);
      };

      render.prototype.makeUploadView = function makeUploadView (src, key, index) {
        var this$1 = this;

        return this.vNode.make('div', {
          key: ("div1" + key),
          class: {
            'fc-files': true
          }
        }, function () {
          var container = [];

          if (this$1.handler.rule.props.uploadType === 'image') {
            container.push(this$1.vNode.make('img', {
              key: ("img" + key),
              attrs: {
                src: src
              }
            }));
          } else {
            container.push(this$1.vNode.icon({
              key: ("file" + key),
              props: {
                type: iviewConfig.fileIcon,
                size: 40
              }
            }));
          }

          if (this$1.issetIcon) { container.push(this$1.makeIcons(src, key, index)); }
          return container;
        });
      };

      render.prototype.makeIcons = function makeIcons (src, key, index) {
        var this$1 = this;

        return this.vNode.make('div', {
          key: ("div2" + key),
          class: {
            'fc-upload-cover': true
          }
        }, function () {
          var icon = [];
          if (!!this$1.uploadOptions.handleIcon) { icon.push(this$1.makeHandleIcon(src, key, index)); }
          if (this$1.uploadOptions.allowRemove === true) { icon.push(this$1.makeRemoveIcon(src, key, index)); }
          return icon;
        });
      };

      render.prototype.makeProgress = function makeProgress (file, unique) {
        return this.vNode.make('div', {
          key: ("div3" + unique),
          class: {
            'fc-files': true
          }
        }, [this.vNode.progress({
          key: ("upp" + unique),
          props: {
            percent: file.percentage,
            hideInfo: true
          },
          style: {
            width: '90%'
          }
        })]);
      };

      render.prototype.makeUploadBtn = function makeUploadBtn (unique, isShow) {
        return this.vNode.upload(this.propsData, isShow === true ? [this.vNode.make('div', {
          key: ("div5" + unique),
          class: {
            'fc-upload-btn': true
          }
        }, [this.vNode.icon({
          key: ("upi" + unique),
          props: {
            type: this.handler.rule.props.uploadType === 'file' ? 'ios-cloud-upload-outline' : iviewConfig.imgUpIcon,
            size: 20
          }
        })])] : []);
      };

      render.prototype.makeRemoveIcon = function makeRemoveIcon (src, key, index) {
        var this$1 = this;

        return this.vNode.icon({
          key: ("upri" + key + index),
          props: {
            type: 'ios-trash-outline'
          },
          nativeOn: {
            'click': function () {
              var fileList = this$1.handler.el.fileList,
                  file = fileList[index];
              fileList.splice(index, 1);
              this$1.onRemove(file, fileList);
            }
          }
        });
      };

      render.prototype.makeHandleIcon = function makeHandleIcon (src, key, index) {
        var this$1 = this;

        return this.vNode.icon({
          key: ("uphi" + key + index),
          props: {
            type: toString$1(this.uploadOptions.handleIcon)
          },
          nativeOn: {
            'click': function () {
              this$1.onHandle(src);
            }
          }
        });
      };

      return render;
    }(Render));

    var types = {
      image: ['image', 0],
      file: ['file', 0],
      uploadFileOne: ['file', 1],
      uploadImageOne: ['image', 1]
    };
    var maker$7 = Object.keys(types).reduce(function (initial, key) {
      initial[key] = creatorTypeFactory(name$a, function (m) { return m.props({
        uploadType: types[key][0],
        maxLength: types[key][1]
      }); });
      return initial;
    }, {});
    maker$7.uploadImage = maker$7.image;
    maker$7.uploadFile = maker$7.file;
    var upload = {
      handler: handler$a,
      render: render$a,
      maker: maker$7,
      name: name$a
    };

    var name$b = 'cascader';

    var handler$b = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        var rule = this.rule;
        if (!rule.props.data) { $set(rule.props, 'data', []); }
        if (!Array.isArray(this.rule.value)) { $set(rule, 'value', []); }
      };

      handler.prototype.toFormValue = function toFormValue (value) {
        return Array.isArray(value) ? value : [];
      };

      handler.prototype.mounted = function mounted () {
        Handler$$1.prototype.mounted.call(this);

        this.vm._changeFormData(this.field, this.toFormValue(this.el.value));
      };

      return handler;
    }(Handler));

    var render$b = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        return [this.vNode.cascader(this.inputProps().get())];
      };

      return render;
    }(Render));

    var cascaderComponent = {
      handler: handler$b,
      render: render$b,
      name: name$b
    };

    var name$c = "rate";

    var handler$c = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.toFormValue = function toFormValue (value) {
        var parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) { parseValue = 0; }
        return parseValue;
      };

      return handler;
    }(Handler));

    var render$c = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        return [this.vNode.rate(this.inputProps().get())];
      };

      return render;
    }(Render));

    var rateComponent = {
      handler: handler$c,
      render: render$c,
      name: name$c
    };

    var name$d = "slider";

    var handler$d = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        var rule = this.rule;
        $set(rule.props, 'min', rule.props.min === undefined ? 0 : parseFloat(rule.props.min) || 0);
      };

      handler.prototype.toFormValue = function toFormValue (value) {
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
      };

      return handler;
    }(Handler));

    var render$d = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        return [this.vNode.slider(this.inputProps().get())];
      };

      return render;
    }(Render));

    var maker$8 = {
      sliderRange: creatorTypeFactory(name$d, true, 'range')
    };
    var sliderComponent = {
      handler: handler$d,
      render: render$d,
      name: name$d,
      maker: maker$8
    };

    var name$e = "frame";
    function parseRule$1(rule) {
      var props = rule.props;
      if (!props.type) { $set(props, 'type', 'input'); }
      if (!props.icon) { $set(props, 'icon', iviewConfig.fileUpIcon); }
      if (!props.width) { $set(props, 'width', '500px'); }
      if (!props.height) { $set(props, 'height', '370px'); }
      if (isUndef(props.spin)) { $set(props, 'spin', true); }
      if (!props.title) { $set(props, 'title', '请选择' + rule.title); }
      if (!props.maxLength) { $set(props, 'maxLength', 0); }
      var handleIcon = props.handleIcon;
      if (props.type === 'file' && props.handleIcon === undefined) { handleIcon = false; }else { handleIcon = props.handleIcon === true || props.handleIcon === undefined ? 'ios-eye-outline' : props.handleIcon; }
      $set(props, 'handleIcon', handleIcon);
      if (props.allowRemove === undefined) { $set(props, 'allowRemove', true); }
    }

    var handler$e = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        parseRule$1(this.rule);
        this.multiple = this.rule.props.maxLength != 1;
      };

      handler.prototype.toFormValue = function toFormValue (value) {
        var parseValue$$1,
            oldValue = value,
            isArr = Array.isArray(oldValue);
        if (oldValue === '') { parseValue$$1 = []; }else if (!isArr) { parseValue$$1 = [oldValue]; }else { parseValue$$1 = oldValue; }
        this.parseValue = parseValue$$1;
        return parseValue$$1;
      };

      handler.prototype.toValue = function toValue (parseValue$$1) {
        return this.multiple === true ? parseValue$$1 : parseValue$$1[0] === undefined ? '' : parseValue$$1[0];
      };

      handler.prototype.watchValue = function watchValue (n) {
        Handler$$1.prototype.watchValue.call(this, n);
        this.render.onChange(n);
        this.render.sync();
      };

      handler.prototype.watchFormValue = function watchFormValue (n) {
        Handler$$1.prototype.watchFormValue.call(this, n);
        this.parseValue = n;
        this.render.sync();
      };

      return handler;
    }(Handler));

    var eventList = {
      onOpen: 'on-open',
      onChange: 'on-change',
      onCancel: 'on-cancel',
      onOk: 'on-ok'
    };

    var render$e = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.init = function init () {
        this._props = this.handler.rule.props;
        this.issetIcon = this._props.handleIcon !== false || this._props.allowRemove === true;
      };

      render.prototype.parse = function parse () {
        var type = this._props.type,
            vNode;
        if (type === 'image') { vNode = this.makeGroup(this.makeImage()); }else if (type === 'file') { vNode = this.makeGroup(this.makeFile()); }else { vNode = this.makeInput(); }
        return vNode;
      };

      render.prototype.makeInput = function makeInput (hidden) {
        var this$1 = this;

        var unique = this.handler.unique,
            props = this.inputProps().props({
          type: "text",
          value: this.handler.parseValue.toString(),
          icon: this._props.icon,
          readonly: true,
          clearable: true
        }).on('on-click', function () {
          this$1.showModel();
        }).key('ifit' + unique).style({
          display: hidden === true ? 'none' : 'inline-block'
        }).get();
        return [this.vNode.input(props)];
      };

      render.prototype.makeGroup = function makeGroup (render) {
        var unique = this.handler.unique,
            field = this.handler.field;
        return [this.vNode.make('div', {
          key: ("ifgp1" + unique),
          class: {
            'fc-upload fc-frame': true
          },
          ref: this.handler.refName,
          props: {
            value: this.vm._formData(field)
          }
        }, render), this.makeInput(true)];
      };

      render.prototype.makeImage = function makeImage () {
        var this$1 = this;

        var unique = this.handler.unique;
        var vNode = this.handler.parseValue.map(function (src, index) {
          return this$1.vNode.make('div', {
            key: ("ifid1" + unique + index),
            class: {
              'fc-files': true
            }
          }, [this$1.vNode.make('img', {
            key: ("ifim" + unique + index),
            attrs: {
              src: src
            }
          }), this$1.makeIcons(src, unique, index)]);
        });
        vNode.push(this.makeBtn());
        return vNode;
      };

      render.prototype.makeFile = function makeFile () {
        var this$1 = this;

        var unique = this.handler.unique;
        var vNode = this.handler.parseValue.map(function (src, index) {
          return this$1.vNode.make('div', {
            key: ("iffd2" + unique + index),
            class: {
              'fc-files': true
            }
          }, [this$1.vNode.icon({
            key: ("iff" + unique + index),
            props: {
              type: iviewConfig.fileIcon,
              size: 40
            }
          }), this$1.makeIcons(src, unique, index)]);
        });
        vNode.push(this.makeBtn());
        return vNode;
      };

      render.prototype.makeBtn = function makeBtn () {
        var this$1 = this;

        var props = this.handler.rule.props;
        if (props.maxLength > 0 && this.handler.parseValue.length >= props.maxLength) { return; }
        var unique = this.handler.unique;
        return this.vNode.make('div', {
          key: ("ifbd3" + unique),
          class: {
            'fc-upload-btn': true
          },
          on: {
            click: function () {
              this$1.showModel();
            }
          }
        }, [this.vNode.icon({
          key: ("ifbi3" + unique),
          props: {
            type: this._props.icon,
            size: 20
          }
        })]);
      };

      render.prototype.makeSpin = function makeSpin () {
        if (true !== this._props.spin) { return; }
        var unique = this.handler.unique;
        return this.vNode.make('Spin', {
          props: {
            fix: true
          },
          key: 'ifsp' + unique,
          class: {
            'fc-spin': true
          }
        }, [this.vNode.icon({
          props: {
            type: 'load-c',
            size: 18
          },
          class: {
            'fc-spin-icon-load': true
          },
          key: 'ifspi' + unique
        }), this.vNode.make('div', {
          domProps: {
            innerHTML: '加载中...'
          },
          key: 'ifspd' + unique
        })]);
      };

      render.prototype.makeIcons = function makeIcons (src, key, index) {
        var this$1 = this;

        if (this.issetIcon === true) { return this.vNode.make('div', {
          key: ("ifis" + key + index),
          class: {
            'fc-upload-cover': true
          }
        }, function () {
          var icon = [];
          if (this$1._props.handleIcon !== false) { icon.push(this$1.makeHandleIcon(src, key, index)); }
          if (this$1._props.allowRemove === true) { icon.push(this$1.makeRemoveIcon(src, key, index)); }
          return icon;
        }); }
      };

      render.prototype.makeRemoveIcon = function makeRemoveIcon (src, key, index) {
        var this$1 = this;

        return this.vNode.icon({
          key: ("ifri" + key + index),
          props: {
            type: 'ios-trash-outline'
          },
          nativeOn: {
            'click': function () {
              if (this$1.onRemove(src) !== false) {
                this$1.handler.parseValue.splice(index, 1);
                this$1.sync();
              }
            }
          }
        });
      };

      render.prototype.makeHandleIcon = function makeHandleIcon (src, key, index) {
        var this$1 = this;

        var props = this._props;
        return this.vNode.icon({
          key: ("ifhi" + key + index),
          props: {
            type: toString(props.handleIcon)
          },
          nativeOn: {
            'click': function () {
              this$1.onHandle(src);
            }
          }
        });
      };

      render.prototype.onRemove = function onRemove (src) {
        var fn = this.handler.rule.event['on-remove'];
        if (fn) { return fn(src, this.handler.getValue()); }
      };

      render.prototype.onHandle = function onHandle (src) {
        var fn = this.handler.rule.event['on-handle'];
        if (fn) { return fn(src); }else { this.defaultOnHandle(src); }
      };

      render.prototype.valid = function valid (field) {
        if (field !== this.handler.field) { throw new Error('无效的表单字段' + errMsg()); }
      };

      render.prototype.showModel = function showModel () {
        var this$1 = this;

        var isShow = false !== this.onOpen();
        var ref = this._props;
        var width = ref.width;
        var height = ref.height;
        var src = ref.src;
        var title = ref.title;
        if (!isShow) { return; }
        this.vm.$Modal.remove();
        setTimeout(function () {
          this$1.vm.$Modal.confirm({
            title: title,
            render: function () { return [this$1.makeSpin(), this$1.vNode.make('iframe', {
              attrs: {
                src: src
              },
              style: {
                'height': height,
                'border': "0 none",
                'width': "100%"
              },
              on: {
                'load': function (e) {
                  if (this$1._props.spin === true) {
                    var spin = document.getElementsByClassName('fc-spin')[0];
                    spin && spin.parentNode.removeChild(spin);
                  }

                  try {
                    if (this$1.options.iframeHelper === true) {
                      var iframe = e.path[0].contentWindow;

                      iframe[((this$1.handler.field) + "_change")] = function (val) {
                        this$1.handler.setValue(val);
                      };

                      iframe["form_create_helper"] = {
                        close: function (field) {
                          this$1.valid(field);
                          iview.Modal.remove();
                        },
                        set: function (field, value) {
                          this$1.valid(field);
                          iframe[(field + "_change")](value);
                        },
                        get: function (field) {
                          this$1.valid(field);
                          return this$1.handler.rule.value;
                        }
                      };
                    }
                  } catch (e) {}
                }
              },
              key: 'ifmd' + uniqueId()
            })]; },
            onOk: function () {
              return this$1.onOk();
            },
            onCancel: function () {
              return this$1.onCancel();
            },
            showCancel: true,
            closable: true,
            scrollable: true,
            width: width
          });
        }, 301);
      };

      return render;
    }(Render));

    render$e.prototype.defaultOnHandle = upload.render.prototype.defaultOnHandle;
    Object.keys(eventList).forEach(function (k) {
      render$e.prototype[k] = function () {
        var fn = this.handler.rule.event[eventList[k]];
        if (fn) { return fn(this.handler.getValue()); }
      };
    });
    var types$1 = {
      frameInputs: ['input', 0],
      frameFiles: ['file', 0],
      frameImages: ['image', 0],
      frameInputOne: ['input', 1],
      frameFileOne: ['file', 1],
      frameImageOne: ['image', 1]
    };
    var maker$9 = Object.keys(types$1).reduce(function (initial, key) {
      initial[key] = creatorTypeFactory(name$e, function (m) { return m.props({
        type: types$1[key][0],
        maxLength: types$1[key][1]
      }); });
      return initial;
    }, {});
    maker$9.frameInput = maker$9.frameInputs;
    maker$9.frameFile = maker$9.frameFiles;
    maker$9.frameImage = maker$9.frameImages;
    var frameComponent = {
      handler: handler$e,
      render: render$e,
      name: name$e,
      maker: maker$9
    };

    var name$f = 'tree';
    function parseRule$2(rule) {
      var props = rule.props;
      if (props.data === undefined) { $set(props, 'data', []); }
      if (props.type === undefined) { $set(props, 'type', 'checked'); }
      if (props.multiple === undefined) { $set(props, 'multiple', false); } // if (isMultiple(rule) && Array.isArray(rule.value))
      //     rule.value = this.rule.value[0] || '';
      // rule.value = toArray(rule.value);

      return rule;
    }
    function isMultiple(rule) {
      return !rule.props.multiple && rule.props.type === 'selected';
    }

    var handler$f = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        parseRule$2(this.rule);
        this._data = {};
        this.data(this.rule.props.data);
        $set(this.rule, 'value', this._parseValue());
      };

      handler.prototype._parseValue = function _parseValue () {
        var this$1 = this;

        this.rule.value.forEach(this.rule.props.type === 'selected' ? function (v) { return this$1.selected(v); } : function (v) { return this$1.checked(v); });
        var value = [],
            props = this.rule.props;
        props.type === 'selected' ? Object.keys(this._data).forEach(function (key) {
          var node = this$1._data[key];
          if (node.selected === true) { value.push(node.id); }
        }) : Object.keys(this._data).forEach(function (key) {
          var node = this$1._data[key];
          if (node.checked === true) { value.push(node.id); }
        });
        return value;
      };

      handler.prototype.toFormValue = function toFormValue (value) {
        value = toArray(value);
        this.choose(value);
        this.parseValue = value;
        return value;
      };

      handler.prototype.choose = function choose (value) {
        var ref = this;
        var rule = ref.rule;
        var _data = ref._data;
        rule.props.type === 'selected' ? Object.keys(_data).forEach(function (key) {
          $set(_data[key], 'selected', value.indexOf(_data[key].id) !== -1);
        }) : Object.keys(_data).forEach(function (key) {
          $set(_data[key], 'checked', value.indexOf(_data[key].id) !== -1);
        });
      };

      handler.prototype.checked = function checked (v) {
        if (this._data[v] !== undefined) {
          $set(this._data[v], 'checked', true);
        }
      };

      handler.prototype.selected = function selected (v) {
        if (this._data[v] !== undefined) {
          $set(this._data[v], 'selected', true);
        }
      };

      handler.prototype.toValue = function toValue (parseValue) {
        var value = parseValue;
        return !isMultiple(this.rule) ? value : value[0] || '';
      };

      handler.prototype.watchFormValue = function watchFormValue (n) {
        this.choose(n);
      };

      handler.prototype.selectedValue = function selectedValue (nodes) {
        var value = [];
        nodes.forEach(function (node) {
          if (node.selected === true) { value.push(node.id); }
        });
        return value;
      };

      handler.prototype.checkedValue = function checkedValue (nodes) {
        var value = [];
        nodes.forEach(function (node) {
          if (node.checked === true) { value.push(node.id); }
        });
        return value;
      };

      handler.prototype._toValue = function _toValue () {
        return this.rule.props.type === 'selected' ? this.selectedValue(this.el.getSelectedNodes()) : this.checkedValue(this.el.getCheckedNodes());
      };

      handler.prototype.data = function data (data$1) {
        var this$1 = this;

        data$1.forEach(function (node) {
          this$1._data[node.id] = node;
          if (node.children !== undefined && Array.isArray(node.children)) { this$1.data(node.children); }
        });
      };

      return handler;
    }(Handler));

    var event = {
      s: 'on-select-change',
      c: 'on-check-change'
    };

    var render$f = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        var this$1 = this;
        var obj;

        var ref = this.handler;
        var rule = ref.rule;
        var refName = ref.refName;
        var field = ref.field;
        var unique = ref.unique;
        var props = this.vData.on(rule.event).on(( obj = {}, obj[event.s] = function (v) {
            this$1.vm._changeFormData(field, this$1.handler._toValue());

            rule.event[event.s] && rule.event[event.s](v);
          }, obj[event.c] = function (v) {
            this$1.vm._changeFormData(field, this$1.handler._toValue());

            rule.event[event.c] && rule.event[event.c](v);
          }, obj )).props(rule.props).ref(refName).key(("fip" + unique)).get();
        var inputProps = this.inputProps().props({
          type: "text",
          value: this.handler.parseValue.toString(),
          disable: true
        }).key('fipit' + unique).style({
          display: 'none'
        }).ref((refName + "it")).get();
        return [this.vNode.tree(props), this.vNode.input(inputProps)];
      };

      return render;
    }(Render));

    var types$2 = {
      'treeSelected': 'selected',
      'treeChecked': 'checked'
    };
    var maker$a = Object.keys(types$2).reduce(function (initial, key) {
      initial[key] = creatorTypeFactory(name$f, types$2[key]);
      return initial;
    }, {});
    var treeComponent = {
      handler: handler$f,
      render: render$f,
      name: name$f,
      maker: maker$a
    };

    var name$g = 'autoComplete';
    var handler$g = /*@__PURE__*/(function (Handler$$1) {
      function handler () {
        Handler$$1.apply(this, arguments);
      }

      if ( Handler$$1 ) handler.__proto__ = Handler$$1;
      handler.prototype = Object.create( Handler$$1 && Handler$$1.prototype );
      handler.prototype.constructor = handler;

      handler.prototype.init = function init () {
        var rule = this.rule;
        if (!Array.isArray(rule.data)) { $set(rule, 'data', []); }
      };

      return handler;
    }(Handler));

    var render$g = /*@__PURE__*/(function (Render$$1) {
      function render () {
        Render$$1.apply(this, arguments);
      }

      if ( Render$$1 ) render.__proto__ = Render$$1;
      render.prototype = Object.create( Render$$1 && Render$$1.prototype );
      render.prototype.constructor = render;

      render.prototype.parse = function parse () {
        return [this.vNode.AutoComplete(this.inputProps().key(this.handler.key).get())];
      };

      return render;
    }(Render));

    var maker$b = {
      auto: creatorFactory(name$g)
    };
    var autoCompleteComponent = {
      handler: handler$g,
      render: render$g,
      name: name$g,
      maker: maker$b
    };

    var componentList = {
      hidden: hiddenComponent,
      input: inputComponent,
      radio: radioComponent,
      checkbox: checkboxComponent,
      switch: switchComponent,
      select: selectComponent,
      datepicker: datePickerComponent,
      timepicker: timePickerComponent,
      inputnumber: inputNumberComponent,
      colorpicker: colorPickerComponent,
      upload: upload,
      cascader: cascaderComponent,
      rate: rateComponent,
      slider: sliderComponent,
      frame: frameComponent,
      tree: treeComponent,
      autocomplete: autoCompleteComponent
    };

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
      if (typeof iview === 'undefined') { return iview2; }
      return iview.version && iview.version.split('.')[0] == 3 ? iview3 : iview2;
    }();
    function getComponent(vm, rule, createOptions) {
      var name = toString$1(rule.type).toLowerCase(),
          component = isComponent(name) ? componentList[name] : getUdfComponent();
      return new component.handler(vm, rule, component.render, createOptions, component.noValue);
    }
    function isComponent(type) {
      return componentList[type] !== undefined;
    }
    function getUdfComponent() {
      return {
        handler: Handler,
        render: Render,
        noValue: true
      };
    }
    function getConfig() {
      return {
        el: null,
        iframeHelper: false,
        switchMaker: true,
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
          beforeUpload: function () {},
          onProgress: function (event, file, fileList) {},
          onSuccess: function (response, file, fileList) {},
          onError: function (error, file, fileList) {},
          onPreview: function (file) {},
          onRemove: function (file, fileList) {},
          onFormatError: function (file, fileList) {},
          onExceededSize: function (file, fileList) {},
          handleIcon: 'ios-eye-outline',
          allowRemove: true
        },
        submitBtn: {
          type: "primary",
          size: "large",
          shape: undefined,
          long: true,
          htmlType: "button",
          disabled: false,
          icon: iviewConfig.submitBtnIcon,
          innerText: "提交",
          loading: false,
          show: true,
          col: undefined
        },
        resetBtn: {
          type: iviewConfig.resetBtnType,
          size: "large",
          shape: undefined,
          long: true,
          htmlType: "button",
          disabled: false,
          icon: iviewConfig.resetBtnIcon,
          innerText: "重置",
          loading: false,
          show: false,
          col: undefined
        },
        mounted: function ($f) {},
        onReload: function ($f) {},
        onSubmit: function (formData) {}
      };
    }
    var formCreateStyle = '.form-create{padding:25px;} .fc-upload-btn,.fc-files{display: inline-block;width: 58px;height: 58px;text-align: center;line-height: 58px;border: 1px solid #c0ccda;border-radius: 4px;overflow: hidden;background: #fff;position: relative;box-shadow: 2px 2px 5px rgba(0,0,0,.1);margin-right: 4px;box-sizing: border-box;}.__fc_h{display:none;}.__fc_v{visibility:hidden;}' + ' .fc-files>.ivu-icon{vertical-align: middle;}' + '.fc-files img{width:100%;height:100%;display:inline-block;vertical-align: top;}' + '.fc-upload .ivu-upload{display: inline-block;}' + '.fc-upload-btn{border: 1px dashed #c0ccda;}' + '.fc-upload-btn>ivu-icon{vertical-align:sub;}' + '.fc-upload .fc-upload-cover{opacity: 0; position: absolute; top: 0; bottom: 0; left: 0; right: 0; background: rgba(0,0,0,.6); transition: opacity .3s;}' + '.fc-upload .fc-upload-cover i{ color: #fff; font-size: 20px; cursor: pointer; margin: 0 2px; }' + '.fc-files:hover .fc-upload-cover{opacity: 1; }' + '.fc-hide-btn .ivu-upload .ivu-upload{display:none;}' + '.fc-upload .ivu-upload-list{margin-top: 0;}' + '.fc-spin-icon-load{animation: ani-fc-spin 1s linear infinite;} @-webkit-keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}@keyframes ani-fc-spin{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}';
    function toDefSlot(slot, $h, rule) {
      return [slot && isFunction(slot) ? slot.call(rule, $h) : slot];
    }
    function getGlobalApi(fComponent) {
      var this$1 = this;

      var vm = fComponent.vm;
      return {
        formData: function () {
          return vm._formField().reduce(function (initial, key) {
            initial[key] = vm._value(key);
            return initial;
          }, {});
        },
        getValue: function (field) {
          field = toString$1(field);
          if (vm._formField(field) === undefined) { throw new Error(field + " 字段不存在!" + errMsg()); }else {
            return vm._value(field);
          }
        },
        changeValue: function (field, value) {
          this.changeField(field, value);
        },
        changeField: function (field, value) {
          field = toString$1(field);
          var handler = fComponent.handlers[field];
          if (handler === undefined) { throw new Error(field + " 字段不存在!" + errMsg()); }else {
            if (isFunction(value)) { value(vm._trueData(field), function (changeValue) {
              this$1.changeField(field, changeValue);
            }); }else {
              handler.setValue(value);
            }
          }
        },
        removeField: function (field) {
          var handler = fComponent.handlers[field];
          if (!handler) { throw new Error(field + " 字段不存在" + errMsg()); }
          var fields = handler.root.map(function (rule) { return rule.__field__; }),
              index = fields.indexOf(toString$1(field));
          if (index === -1) { throw new Error(field + " 字段不存在" + errMsg()); }
          handler.root.splice(index, 1);

          vm._refresh();
        },
        validate: function (successFn, errorFn) {
          fComponent.getFormRef().validate(function (valid) {
            valid === true ? successFn && successFn() : errorFn && errorFn();
          });
        },
        validateField: function (field, callback) {
          if (fComponent.notField(field)) { throw new Error(field + "字段不存在" + errMsg()); }
          fComponent.getFormRef().validateField(field, callback);
        },
        resetFields: function () {
          var handlers = fComponent.handlers;

          vm._formField().forEach(function (key) {
            handlers[key].reset();
          });

          this.refresh();
        },
        destroy: function () {
          vm.$el.parentNode.removeChild(vm.$el);
          vm.$destroy();
        },
        fields: function () { return vm._formField(); },
        append: function (rule, after) {
          var fields = fComponent.fieldList,
              index = fields.indexOf(toString$1(after));

          if (isUndef(after)) {
            index = fields.length;
          } else if (index === -1) { throw new Error(after + " 字段不存在" + errMsg()); }

          fComponent.rules.splice(index, 0, rule);
        },
        prepend: function (rule, after) {
          var fields = fComponent.fieldList,
              index = fields.indexOf(toString$1(after));

          if (isUndef(after)) {
            index = 0;
          } else if (index === -1) { throw new Error(after + " 字段不存在" + errMsg()); }else { index--; }

          fComponent.rules.splice(index, 0, rule);
        },

        submit: function submit(successFn, failFn) {
          var this$1 = this;

          this.validate(function () {
            var formData = this$1.formData();
            if (isFunction(successFn)) { successFn(formData); }else { fComponent.options.onSubmit && fComponent.options.onSubmit(formData); }
          }, function () { return failFn && failFn(); });
        },

        hidden: function hidden(fields, hidden) {
          if ( hidden === void 0 ) hidden = true;

          if (!fields) { fields = this.fields(); }else if (!Array.isArray(fields)) { fields = [fields]; }
          fields.forEach(function (field) {
            vm.$set(vm._trueData(field).rule.props, 'hidden', !!hidden);
          });
        },

        visibility: function visibility(fields, visibility) {
          if ( visibility === void 0 ) visibility = true;

          if (!fields) { fields = this.fields(); }else if (!Array.isArray(fields)) { fields = [fields]; }
          fields.forEach(function (field) {
            vm.$set(vm._trueData(field).rule.props, 'visibility', !!visibility);
          });
        },

        model: function model(fields) {
          var model = {},
              _fields = this.fields();

          if (!fields) { fields = _fields; }else if (!Array.isArray(fields)) { fields = [fields]; }
          fields.forEach(function (field) {
            if (_fields.indexOf(field) === -1) { return console.error(field + "字段不存在" + errMsg()); }
            model[field] = vm._trueData(field);
          });
          return model;
        },

        component: function component() {
          return Object.assign({}, vm.components);
        },

        bind: function bind(fields) {
          var bind = {},
              properties = {},
              _fields = this.fields();

          if (!fields) { fields = _fields; }else if (!Array.isArray(fields)) { fields = [fields]; }
          fields.forEach(function (field) {
            if (_fields.indexOf(field) === -1) { return console.error(field + "字段不存在" + errMsg()); }

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

        submitStatus: function (props) {
          if ( props === void 0 ) props = {};

          vm._buttonProps(props);
        },
        resetStatus: function (props) {
          if ( props === void 0 ) props = {};

          vm._resetProps(props);
        },
        btn: {
          loading: function (loading) {
            if ( loading === void 0 ) loading = true;

            vm._buttonProps({
              loading: loading
            });
          },
          finish: function () {
            this.loading(false);
          },
          disabled: function (disabled) {
            if ( disabled === void 0 ) disabled = true;

            vm._buttonProps({
              disabled: disabled
            });
          }
        },
        resetBtn: {
          loading: function (loading) {
            if ( loading === void 0 ) loading = true;

            vm._resetProps({
              loading: loading
            });
          },
          finish: function () {
            this.loading(false);
          },
          disabled: function (disabled) {
            if ( disabled === void 0 ) disabled = true;

            vm._resetProps({
              disabled: disabled
            });
          }
        },
        closeModal: function () {
          vm.$Modal.remove();
        },
        set: function (node, field, value) {
          vm.$set(node, field, value);
        },
        reload: function (rules) {
          return fComponent.reload(rules);
        },
        options: function (options) {
          deepExtend(fComponent.options, options);

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

        sync: function (field, callback) {
          if (fComponent.handlers[field]) { fComponent.handlers[field].render.sync(callback); }else { throw new Error(field + "字段不存在" + errMsg()); }
        },
        refresh: function () {
          vm._refresh();
        }
      };
    }
    function timeStampToDate(timeStamp) {
      if (isDate(timeStamp)) { return timeStamp; }else {
        var date = new Date(timeStamp);
        return date.toString() === 'Invalid Date' ? timeStamp : date;
      }
    }
    var componentCommon = {
      data: function () {
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
          if (Object.keys(this.cptData).indexOf(field) !== -1) { this.$set(this.cptData, field, value); }
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
          if (this.components[field] !== undefined) { $del(this.components, field); }
        },

        _buttonProps: function _buttonProps(props) {
          this.$set(this, 'buttonProps', deepExtend(this.buttonProps, props));
        },

        _resetProps: function _resetProps(props) {
          this.$set(this, 'resetProps', deepExtend(this.resetProps, props));
        },

        __init: function __init() {
          var this$1 = this;

          var type = this._fComponent._type;
          this[type].forEach(function (rule, index) {
            var unWatch = this$1.$watch((type + "." + index + ".value"), function (n) {
              if (this$1.trueData[rule.field] === undefined) { return unWatch(); }

              this$1._changeValue(rule.field, n);
            });
            this$1.watchs.push(unWatch);
          });
        },

        _unWatch: function _unWatch() {
          this.watchs.forEach(function (unWatch) { return unWatch(); });
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

    function preventDefault(e) {
      e.preventDefault();
    }
    var Form = function Form(ref) {
      var vm = ref.vm;
      var options = ref.options;
      var fieldList = ref.fieldList;
      var handlers = ref.handlers;
      var formData = ref.formData;
      var validate = ref.validate;
      var fCreateApi = ref.fCreateApi;

      this.vm = vm;
      this.options = options;
      this.handlers = handlers;
      this.renderSort = fieldList;
      this.form = {
        model: formData,
        rules: validate,
        key: 'form' + uniqueId()
      };
      this.fCreateApi = fCreateApi;
      this.vNode = new VNode(vm);
      this.vData = new VData();
      this.unique = uniqueId();
      this.refName = "cForm" + (this.unique);
      this.cacheUnique = 0;
    };

    Form.prototype.getRender = function getRender (field) {
      return this.handlers[field].render;
    };

    Form.prototype.render = function render (vm) {
        var this$1 = this;

      this.vNode.setVm(vm);
      if (!vm.isShow) { return; }

      if (this.cacheUnique !== vm.unique) {
        this.renderSort.forEach(function (field) {
          this$1.getRender(field).clearCache();
        });
        this.cacheUnique = vm.unique;
      }

      this.propsData = this.vData.props(this.options.form).props(this.form).ref(this.refName).nativeOn({
        submit: preventDefault
      }).class('form-create', true).key(this.unique).get();
      var unique = this.unique,
          vn = this.renderSort.map(function (field) {
        var render = this$1.getRender(field);
        if (render.handler.type === 'hidden') { return; }
        return this$1.makeComponent(render);
      });
      if (vn.length > 0) { vn.push(this.makeFormBtn(unique)); }
      return this.vNode.form(this.propsData, [this.vNode.row(extend({
        props: this.options.row || {}
      }, {
        key: 'row' + unique
      }), vn)]);
    };

    Form.prototype.makeComponent = function makeComponent (render) {
      return this.makeFormItem(render.handler, render.cacheParse(this), ("fItem" + (render.handler.key) + (this.unique)));
    };

    Form.prototype.makeFormItem = function makeFormItem (ref, VNodeFn, fItemUnique) {
        var type = ref.type;
        var rule = ref.rule;
        var unique = ref.unique;
        var field = ref.field;
        var refName = ref.refName;

      var labelWidth = !isComponent(type) && !rule.col.labelWidth && !rule.title ? 1 : rule.col.labelWidth,
          className = rule.className,
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
    };

    Form.prototype.makeCol = function makeCol (rule, fItemUnique, VNodeFn) {
      return this.vNode.col({
        props: rule.col,
        'class': {
          '__fc_h': rule.props.hidden === true,
          '__fc_v': rule.props.visibility === true
        },
        key: (fItemUnique + "col1")
      }, VNodeFn);
    };

    Form.prototype.makeFormBtn = function makeFormBtn (unique) {
      var btn = [],
          submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
          resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
      if (submitBtnShow) { btn.push(this.makeSubmitBtn(unique, resetBtnShow ? 19 : 24)); }
      if (resetBtnShow) { btn.push(this.makeResetBtn(unique, 4)); }
      return this.vNode.col({
        props: {
          span: 24
        },
        key: ((this.unique) + "col2")
      }, btn);
    };

    Form.prototype.makeResetBtn = function makeResetBtn (unique, span) {
        var this$1 = this;

      var props = isUndef(this.options.resetBtn.col) ? {
        span: span,
        push: 1
      } : this.options.resetBtn.col;
      return this.vNode.col({
        props: props,
        key: ((this.unique) + "col3")
      }, [this.vNode.button({
        key: ("frsbtn" + unique),
        props: this.vm.resetProps,
        on: {
          "click": function () {
            this$1.fCreateApi.resetFields();
          }
        }
      }, [this.vm.resetProps.innerText])]);
    };

    Form.prototype.makeSubmitBtn = function makeSubmitBtn (unique, span) {
        var this$1 = this;

      var props = isUndef(this.options.submitBtn.col) ? {
        span: span
      } : this.options.submitBtn.col;
      return this.vNode.col({
        props: props,
        key: ((this.unique) + "col4")
      }, [this.vNode.button({
        key: ("fbtn" + unique),
        props: this.vm.buttonProps,
        on: {
          "click": function () {
            this$1.fCreateApi.submit();
          }
        }
      }, [this.vm.buttonProps.innerText])]);
    };

    var formCreateName = 'FormCreate';

    var $FormCreate = function () { return ({
      name: formCreateName,
      props: {
        rule: {
          type: Array,
          required: true,
          default: function () {
            return {};
          }
        },
        option: {
          type: Object,
          default: function () {
            return {};
          },
          required: false
        },
        value: Object
      },
      data: componentCommon.data,
      methods: componentCommon.methods,

      render: function render() {
        return this._fComponent.fRender.render(this._fComponent.vm);
      },

      created: function created() {
        this._fComponent = new FormCreate(this.rule, this.option);
        this._fComponent._type = 'rule';

        this._fComponent.init(this);

        this.$emit('input', this._fComponent.fCreateApi);
      },

      mounted: function mounted() {
        var this$1 = this;

        this._fComponent.mounted(this);

        this.$f = this._fComponent.fCreateApi;
        this.$watch('rule', function (n) {
          this$1._fComponent.reload(n);

          this$1.$emit('input', this$1.$f);
        });
        this.$emit('input', this.$f);

        this.__init();
      }

    }); };

    function formCreateComponent(fComponent) {
      return {
        name: (formCreateName + "Core"),
        data: componentCommon.data,
        render: function () {
          return fComponent.fRender.render(fComponent.vm);
        },
        methods: componentCommon.methods,

        created: function created() {
          this._fComponent = fComponent;
          this._fComponent._type = 'rules';
          fComponent.init(this);
        },

        mounted: function mounted() {
          var this$1 = this;

          fComponent.mounted(this);
          this.$f = fComponent.fCreateApi;

          this.__init();

          this.$watch('rules', function (n) {
            this$1._fComponent.reload(n);
          });
        }

      };
    }

    var maker$c = (function () {
      var _m = {};
      Object.keys(componentList).forEach(function (key) {
        var component = componentList[key];
        var undef = isUndef(component.maker);
        if (undef || component.maker[component.name] === undefined) { _m[component.name] = creatorFactory(component.name); }
        if (!undef) { extend(_m, component.maker); }
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
    })();

    var version = "1.5.4";
    var formCreateStyleElId = 'form-create-style';
    function margeGlobal(_options) {
      if (isBool(_options.sumbitBtn)) { $set(_options, 'sumbitBtn', {
        show: _options.sumbitBtn
      }); }
      if (isBool(_options.resetBtn)) { $set(_options, 'resetBtn', {
        show: _options.resetBtn
      }); }
      var options = deepExtend(getConfig(), _options);
      $set(options, 'el', !options.el ? window.document.body : isElement(options.el) ? options.el : document.querySelector(options.el));
      return options;
    }
    function getRule(rule) {
      if (isFunction(rule.getRule)) { return rule.getRule(); }else { return rule; }
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
    function initStyle() {
      if (document.getElementById(formCreateStyleElId) !== null) { return; }
      var style = document.createElement('style');
      style.id = formCreateStyleElId;
      style.innerText = formCreateStyle;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
    var FormCreate = function FormCreate(rules, options) {
      if ( options === void 0 ) options = {};

      this.options = margeGlobal(options);
      this.rules = Array.isArray(rules) ? rules : [];
      this.origin = [].concat( this.rules );
      this.handlers = {};
      this.fRender = {};
      this.formData = {};
      this.validate = {};
      this.trueData = {};
      this.components = {};
      this.fieldList = [];
      this.switchMaker = this.options.switchMaker;
      this.id = uniqueId();
      initStyle();
      this.$tick = debounce(function (fn) { return fn(); }, 150);
    };

    FormCreate.create = function create (rules, _opt, _vue) {
        if ( _opt === void 0 ) _opt = {};
        if ( _vue === void 0 ) _vue = Vue$1;

      var opt = isElement(_opt) ? {
        el: _opt
      } : _opt;
      var fComponent = new FormCreate(rules, opt),
          $vm = fComponent.create(_vue);
      return fComponent.fCreateApi;
    };

    FormCreate.install = function install (Vue) {
      Vue.prototype.$formCreate = function (rules, opt) {
          if ( opt === void 0 ) opt = {};

        return FormCreate.create(rules, opt, Vue);
      };

      Vue.prototype.$formCreate.version = version;
      Vue.prototype.$formCreate.maker = maker$c;
      Vue.component(formCreateName, Vue.extend($FormCreate()));
    };

    FormCreate.prototype.init = function init (vm) {
      this.vm = vm;
      this.createHandler(this.rules);
      vm.$set(vm, 'cptData', this.formData);
      vm.$set(vm, 'trueData', this.trueData);
      vm.$set(vm, 'buttonProps', this.options.submitBtn);
      vm.$set(vm, 'resetProps', this.options.resetBtn);
      vm.$set(vm, 'rules', this.rules);
      vm.$set(vm, 'components', this.components);
      if (this.fCreateApi === undefined) { this.fCreateApi = getGlobalApi(this); }
      this.fCreateApi.rule = this.rules;
      this.fRender = new Form(this);
    };

    FormCreate.prototype.setHandler = function setHandler (handler) {
      var rule = handler.rule;
        var field = handler.field;
        var isDef = handler.isDef;
      this.handlers[field] = handler;

      if (handler.noValue === true) {
        if (isDef === true) { $set(this.components, field, rule); }
        return;
      }

      $set(this.formData, field, handler.parseValue);
      $set(this.validate, field, rule.validate);
      $set(this.trueData, field, {
        value: handler.rule.value,
        rule: rule
      });
    };

    FormCreate.prototype.notField = function notField (field) {
      return this.handlers[field] === undefined;
    };

    FormCreate.prototype.createHandler = function createHandler (rules, child) {
        var this$1 = this;

      rules.forEach(function (_rule, index) {
        if (child && isString(_rule)) { return; }
        if (!_rule.type) { return console.error("未定义生成规则的 type" + errMsg()); }
        var rule = getRule(_rule),
            handler = _rule.__handler__ ? _rule.__handler__.refresh() : getComponent(this$1.vm, rule, this$1.options),
            children = handler.rule.children;
        if (!this$1.notField(handler.field)) { return console.error((rule.field) + " 字段已存在" + errMsg()); }

        if (this$1.switchMaker) {
          rules[index] = rule;
          if (!child) { this$1.origin[index] = rule; }
          _rule = rule;
        }

        this$1.setHandler(handler);

        if (!_rule.__handler__) {
          bindHandler(_rule, handler);
        }

        if (Array.isArray(children) && children.length > 0) { this$1.createHandler(children, true); }
        if (!child) { this$1.fieldList.push(handler.field); }
      });
      rules.forEach(function (rule) {
        rule.__handler__.root = rules;
        rule.__handler__.origin = [].concat( rules );
      });
    };

    FormCreate.prototype.create = function create (Vue) {
      var $fCreate = Vue.extend(this.component()),
          $vm = new $fCreate().$mount();
      this.options.el.appendChild($vm.$el);
      return $vm;
    };

    FormCreate.prototype.mounted = function mounted (vm, first) {
        var this$1 = this;
        if ( first === void 0 ) first = true;

      this.vm = vm;
      var ref = this.options;
        var mounted = ref.mounted;
        var onReload = ref.onReload;
      setTimeout(function () {
        $nt(function () {
          Object.keys(this$1.handlers).forEach(function (field) {
            var handler = this$1.handlers[field];
            if (vm._formData(field) !== undefined) { this$1.addHandlerWatch(handler); }
            handler.mounted();
          });
          if (first) { mounted && mounted(this$1.fCreateApi); }
          onReload && onReload(this$1.fCreateApi);
        });
      });
    };

    FormCreate.prototype.component = function component () {
      return formCreateComponent(this);
    };

    FormCreate.prototype.removeField = function removeField (field) {
      if (this.handlers[field] === undefined) { throw new Error(field + "字段不存在" + errMsg()); }
      var watch = this.handlers[field].watch,
          index = this.fieldList.indexOf(field);
      $del(this.handlers, field);
      $del(this.validate, field);

      if (index !== -1) {
        this.fieldList.splice(index, 1);
      }

      watch && watch.forEach(function (unWatch) { return unWatch(); });

      this.vm._removeField(field);
    };

    FormCreate.prototype.addHandlerWatch = function addHandlerWatch (handler) {
        var this$1 = this;

      if (handler.noValue === true) { return; }
      var field = handler.field,
          vm = this.vm;
      var unWatch = vm.$watch(("cptData." + field), function (n) {
        if (this$1.handlers[field] !== undefined) {
          var trueValue = handler.toValue(n),
              json = JSON.stringify(trueValue);

          if (vm._change(field, json)) {
            handler.setValue(trueValue);
            handler.watchFormValue(n);
          }
        } else { unWatch(); }
      }, {
        deep: true
      });
      var unWatch2 = vm.$watch(("trueData." + field + ".value"), function (n) {
        if (n === undefined) { return; }

        if (this$1.handlers[field] !== undefined) {
          var json = JSON.stringify(n);

          if (vm._change(field, json)) {
            handler.watchValue(n);
            $nt(function () { return handler.render.sync(); });
          }
        } else { unWatch2(); }
      }, {
        deep: true
      });
      handler.watch.push(unWatch, unWatch2);

      var bind = function () {
        if (this$1.handlers[field] !== undefined) { this$1.$tick(function () { return handler.render.sync(); }); }
      };

      Object.keys(vm._trueData(field).rule).forEach(function (key) {
        if (key === 'value') { return; }
        handler.watch.push(vm.$watch(("trueData." + field + ".rule." + key), bind, {
          deep: true
        }));
      });
    };

    FormCreate.prototype.isNotChange = function isNotChange (rules) {
        var this$1 = this;

      return rules.reduce(function (initial, rule, index) { return initial && rule === this$1.origin[index]; }, true) && this.origin.reduce(function (initial, rule, index) { return initial && rule === rules[index]; }, true);
    };

    FormCreate.prototype.reload = function reload (rules) {
        var this$1 = this;

      var vm = this.vm;

      if (!rules) {
        this.reload(this.rules);
      } else {
        if (this.isNotChange(rules)) {
          this.fCreateApi.refresh();
          return;
        }

        if (!this.origin.length) { this.fCreateApi.refresh(); }
        this.origin = [].concat( rules );

        vm._unWatch();

        Object.keys(this.handlers).forEach(function (field) { return this$1.removeField(field); });
        this.constructor(rules, this.options);
        this.init(vm);

        vm.__init();

        $nt(function () {
          this$1.mounted(vm, false);
        });
      }

      vm.$f = this.fCreateApi;
    };

    FormCreate.prototype.getFormRef = function getFormRef () {
      return this.vm.$refs[this.fRender.refName];
    };
    FormCreate.maker = maker$c;
    FormCreate.version = version;

    /**
     *
     * JS表单生成器
     * Author: xaboy
     * Github: https://github.com/xaboy/form-create
     */
    function install(Vue) {
      if (Vue._installedFormCreate === true) { return; }
      Vue._installedFormCreate = true;
      Vue.use(FormCreate);
    }

    if (typeof window !== 'undefined' && window.Vue) {
      install(Vue);
    }

    var index = window.formCreate = FormCreate; // module.exports.default = module.exports = formCreate;

    exports.install = install;
    exports.default = index;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
