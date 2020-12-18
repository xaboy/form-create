/*!
 * @form-create/element-ui v1.0.19
 * (c) 2018-2020 xaboy
 * Github https://github.com/xaboy/form-create
 * Released under the MIT License.
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.formCreate = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

  var Vue__default = /*#__PURE__*/_interopDefaultLegacy(Vue);

  function _extends() {
    return _extends = Object.assign || function (a) {
      for (var b, c = 1; c < arguments.length; c++) {
        for (var d in b = arguments[c], b) {
          Object.prototype.hasOwnProperty.call(b, d) && (a[d] = b[d]);
        }
      }

      return a;
    }, _extends.apply(this, arguments);
  }

  var normalMerge = ["attrs", "props", "domProps"],
      toArrayMerge = ["class", "style", "directives"],
      functionalMerge = ["on", "nativeOn"],
      mergeJsxProps = function mergeJsxProps(a) {
    return a.reduce(function (c, a) {
      for (var b in a) {
        if (!c[b]) c[b] = a[b];else if (-1 !== normalMerge.indexOf(b)) c[b] = _extends({}, c[b], a[b]);else if (-1 !== toArrayMerge.indexOf(b)) {
          var d = c[b] instanceof Array ? c[b] : [c[b]],
              e = a[b] instanceof Array ? a[b] : [a[b]];
          c[b] = d.concat(e);
        } else if (-1 !== functionalMerge.indexOf(b)) {
          for (var f in a[b]) {
            if (c[b][f]) {
              var g = c[b][f] instanceof Array ? c[b][f] : [c[b][f]],
                  h = a[b][f] instanceof Array ? a[b][f] : [a[b][f]];
              c[b][f] = g.concat(h);
            } else c[b][f] = a[b][f];
          }
        } else if ("hook" == b) for (var i in a[b]) {
          c[b][i] = c[b][i] ? mergeFn(c[b][i], a[b][i]) : a[b][i];
        } else c[b] = a[b];
      }

      return c;
    }, {});
  },
      mergeFn = function mergeFn(a, b) {
    return function () {
      a && a.apply(this, arguments), b && b.apply(this, arguments);
    };
  };

  var helper = mergeJsxProps;

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

  var NAME = 'fcCheckbox';
  var Checkbox = {
    name: NAME,
    props: {
      formCreateRule: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      formCreateOptions: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },
      value: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },
      type: String
    },
    watch: {
      value: function value() {
        this.update();
      }
    },
    data: function data() {
      return {
        trueValue: []
      };
    },
    methods: {
      onInput: function onInput(n) {
        this.$emit('input', this.formCreateOptions.filter(function (opt) {
          return n.indexOf(opt.label) !== -1;
        }).map(function (opt) {
          return opt.value;
        }).filter(function (v) {
          return v !== undefined;
        }));
      },
      update: function update() {
        var _this = this;

        this.trueValue = this.value ? this.formCreateOptions.filter(function (opt) {
          return _this.value.indexOf(opt.value) !== -1;
        }).map(function (option) {
          return option.label;
        }) : [];
      }
    },
    created: function created() {
      this.update();
    },
    render: function render() {
      var _this2 = this;

      var h = arguments[0];
      return h("ElCheckboxGroup", helper([{}, this.formCreateRule, {
        "attrs": {
          "value": this.trueValue
        },
        "on": {
          "input": this.onInput
        }
      }]), [this.formCreateOptions.map(function (opt, index) {
        var props = _objectSpread2({}, opt);

        var Type = _this2.type === 'button' ? 'ElCheckboxButton' : 'ElCheckbox';
        delete props.value;
        return h(Type, {
          "props": _objectSpread2({}, props),
          "key": Type + index + opt.value
        });
      }), this.$slots["default"]]);
    }
  };

  function toArray(value) {
    return Array.isArray(value) ? value : [null, undefined, ''].indexOf(value) > -1 ? [] : [value];
  }

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

  var css_248z = "._fc-frame .fc-files img {\n    width: 100%;\n    height: 100%;\n    display: inline-block;\n    vertical-align: top;\n}\n\n._fc-frame .fc-upload-btn {\n    border: 1px dashed #c0ccda;\n    cursor: pointer;\n}\n\n._fc-frame .fc-upload-cover {\n    opacity: 0;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, .6);\n    -webkit-transition: opacity .3s;\n    -o-transition: opacity .3s;\n    transition: opacity .3s;\n}\n\n._fc-frame .fc-upload-cover i {\n    color: #fff;\n    font-size: 20px;\n    cursor: pointer;\n    margin: 0 2px;\n}\n\n._fc-frame .fc-files:hover .fc-upload-cover {\n    opacity: 1;\n}\n\n._fc-frame .el-upload {\n    display: block;\n}\n\n._fc-frame .fc-upload-btn, .fc-files {\n    display: inline-block;\n    width: 58px;\n    height: 58px;\n    text-align: center;\n    line-height: 58px;\n    border: 1px solid #c0ccda;\n    border-radius: 4px;\n    overflow: hidden;\n    background: #fff;\n    position: relative;\n    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);\n    box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);\n    margin-right: 4px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n";
  styleInject(css_248z);

  var NAME$1 = 'fcFrame';
  var Frame = {
    name: NAME$1,
    props: {
      formCreateField: String,
      type: {
        type: String,
        "default": 'input'
      },
      field: String,
      helper: {
        type: Boolean,
        "default": true
      },
      disabled: {
        type: Boolean,
        "default": false
      },
      src: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        "default": 'el-icon-upload2'
      },
      width: {
        type: String,
        "default": '500px'
      },
      height: {
        type: String,
        "default": '370px'
      },
      maxLength: {
        type: Number,
        "default": 0
      },
      okBtnText: {
        type: String,
        "default": '确定'
      },
      closeBtnText: {
        type: String,
        "default": '关闭'
      },
      modalTitle: String,
      handleIcon: {
        type: [String, Boolean],
        "default": undefined
      },
      title: String,
      allowRemove: {
        type: Boolean,
        "default": true
      },
      onOpen: {
        type: Function,
        "default": function _default() {}
      },
      onOk: {
        type: Function,
        "default": function _default() {}
      },
      onCancel: {
        type: Function,
        "default": function _default() {}
      },
      onLoad: {
        type: Function,
        "default": function _default() {}
      },
      onBeforeRemove: {
        type: Function,
        "default": function _default() {}
      },
      onRemove: {
        type: Function,
        "default": function _default() {}
      },
      onHandle: {
        type: Function,
        "default": function _default(src) {
          this.previewImage = this.getSrc(src);
          this.previewVisible = true;
        }
      },
      modal: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      srcKey: {
        type: [String, Number]
      },
      value: [Array, String, Number, Object],
      previewMask: undefined,
      footer: {
        type: Boolean,
        "default": true
      },
      reload: {
        type: Boolean,
        "default": true
      },
      closeBtn: {
        type: Boolean,
        "default": true
      },
      okBtn: {
        type: Boolean,
        "default": true
      }
    },
    data: function data() {
      return {
        fileList: toArray(this.value),
        previewVisible: false,
        frameVisible: false,
        previewImage: ''
      };
    },
    watch: {
      value: function value(n) {
        this.fileList = toArray(n);
      },
      fileList: function fileList(n) {
        var val = this.maxLength === 1 ? n[0] || '' : n;
        this.$emit('input', val);
        this.$emit('change', val);
      },
      src: function src(n) {
        this.modalVm && (this.modalVm.src = n);
      }
    },
    methods: {
      key: function key(unique) {
        return unique;
      },
      closeModel: function closeModel(close) {
        this.$emit(close ? '$close' : '$ok');

        if (this.reload) {
          this.$off('$ok');
          this.$off('$close');
        }

        this.frameVisible = false;
      },
      handleCancel: function handleCancel() {
        this.previewVisible = false;
      },
      showModel: function showModel() {
        if (this.disabled || false === this.onOpen()) {
          return;
        }

        this.frameVisible = true;
      },
      makeInput: function makeInput() {
        var _this = this;

        var h = this.$createElement;
        var props = {
          type: 'text',
          value: this.fileList.map(function (v) {
            return _this.getSrc(v);
          }).toString(),
          readonly: true
        };
        return h("ElInput", helper([{}, {
          "props": props
        }, {
          "key": this.key('input')
        }]), [this.fileList.length ? h("i", {
          "slot": "suffix",
          "class": "el-input__icon el-icon-circle-close",
          "on": {
            "click": function click() {
              return _this.fileList = [];
            }
          }
        }) : null, h("ElButton", helper([{
          "attrs": {
            "icon": this.icon
          }
        }, {
          "on": {
            'click': function click() {
              return _this.showModel();
            }
          }
        }, {
          "slot": "append"
        }]))]);
      },
      makeGroup: function makeGroup(children) {
        var h = this.$createElement;

        if (!this.maxLength || this.fileList.length < this.maxLength) {
          children.push(this.makeBtn());
        }

        return h("div", {
          "key": this.key('group')
        }, _toConsumableArray(children));
      },
      makeItem: function makeItem(index, children) {
        var h = this.$createElement;
        return h("div", {
          "class": 'fc-files',
          "key": this.key('file' + index)
        }, _toConsumableArray(children));
      },
      valid: function valid(f) {
        var field = this.formCreateField || this.field;

        if (field && f !== field) {
          throw new Error('[frame]无效的字段值');
        }
      },
      makeIcons: function makeIcons(val, index) {
        var h = this.$createElement;

        if (this.handleIcon !== false || this.allowRemove === true) {
          var icons = [];

          if (this.type !== 'file' && this.handleIcon !== false || this.type === 'file' && this.handleIcon) {
            icons.push(this.makeHandleIcon(val, index));
          }

          if (this.allowRemove) {
            icons.push(this.makeRemoveIcon(val, index));
          }

          return h("div", {
            "class": 'fc-upload-cover',
            "key": this.key('uc')
          }, [icons]);
        }
      },
      makeHandleIcon: function makeHandleIcon(val, index) {
        var _this2 = this;

        var h = this.$createElement;
        return h("i", {
          "class": this.handleIcon === true || this.handleIcon === undefined ? 'el-icon-view' : this.handleIcon,
          "on": {
            "click": function click() {
              return _this2.handleClick(val);
            }
          },
          "key": this.key('hi' + index)
        });
      },
      makeRemoveIcon: function makeRemoveIcon(val, index) {
        var _this3 = this;

        var h = this.$createElement;
        return h("i", {
          "class": "el-icon-delete",
          "on": {
            "click": function click() {
              return _this3.handleRemove(val);
            }
          },
          "key": this.key('ri' + index)
        });
      },
      makeFiles: function makeFiles() {
        var _this4 = this;

        var h = this.$createElement;
        return this.makeGroup(this.fileList.map(function (src, index) {
          return _this4.makeItem(index, [h("i", {
            "class": "el-icon-tickets",
            "on": {
              "click": function click() {
                return _this4.handleClick(src);
              }
            }
          }), _this4.makeIcons(src, index)]);
        }));
      },
      makeImages: function makeImages() {
        var _this5 = this;

        var h = this.$createElement;
        return this.makeGroup(this.fileList.map(function (src, index) {
          return _this5.makeItem(index, [h("img", {
            "attrs": {
              "src": _this5.getSrc(src)
            }
          }), _this5.makeIcons(src, index)]);
        }));
      },
      makeBtn: function makeBtn() {
        var _this6 = this;

        var h = this.$createElement;
        return h("div", {
          "class": 'fc-upload-btn',
          "on": {
            "click": function click() {
              return _this6.showModel();
            }
          },
          "key": this.key('btn')
        }, [h("i", {
          "class": this.icon
        })]);
      },
      handleClick: function handleClick(src) {
        if (this.disabled) {
          return;
        }

        return this.onHandle(src);
      },
      handleRemove: function handleRemove(src) {
        if (this.disabled) {
          return;
        }

        if (false !== this.onBeforeRemove(src)) {
          this.fileList.splice(this.fileList.indexOf(src), 1);
          this.onRemove(src);
        }
      },
      getSrc: function getSrc(src) {
        return !this.srcKey ? src : src[this.srcKey];
      },
      frameLoad: function frameLoad(iframe) {
        var _this7 = this;

        this.onLoad(iframe);

        try {
          if (this.helper === true) {
            iframe['form_create_helper'] = {
              close: function close(field) {
                _this7.valid(field);

                _this7.closeModel();
              },
              set: function set(field, value) {
                _this7.valid(field);

                if (!_this7.disabled) _this7.$emit('input', value);
              },
              get: function get(field) {
                _this7.valid(field);

                return _this7.value;
              },
              onOk: function onOk(fn) {
                return _this7.$on('$ok', fn);
              },
              onClose: function onClose(fn) {
                return _this7.$on('$close', fn);
              }
            };
          }
        } catch (e) {
          console.log(e);
        }
      },
      makeFooter: function makeFooter() {
        var _this8 = this;

        var h = this.$createElement;
        var _this$$props = this.$props,
            okBtnText = _this$$props.okBtnText,
            closeBtnText = _this$$props.closeBtnText,
            closeBtn = _this$$props.closeBtn,
            okBtn = _this$$props.okBtn,
            footer = _this$$props.footer;

        if (!footer) {
          return;
        }

        return h("div", {
          "slot": "footer"
        }, [closeBtn ? h("ElButton", {
          "on": {
            "click": function click() {
              return _this8.onCancel() !== false && _this8.closeModel(true);
            }
          }
        }, [closeBtnText]) : null, okBtn ? h("ElButton", {
          "attrs": {
            "type": "primary"
          },
          "on": {
            "click": function click() {
              return _this8.onOk() !== false && _this8.closeModel();
            }
          }
        }, [okBtnText]) : null]);
      }
    },
    render: function render() {
      var _this9 = this;

      var h = arguments[0];
      var type = this.type;
      var node;

      if (type === 'input') {
        node = this.makeInput();
      } else if (type === 'image') {
        node = this.makeImages();
      } else {
        node = this.makeFiles();
      }

      var _this$$props2 = this.$props,
          _this$$props2$width = _this$$props2.width,
          width = _this$$props2$width === void 0 ? '30%' : _this$$props2$width,
          height = _this$$props2.height,
          src = _this$$props2.src,
          title = _this$$props2.title,
          modalTitle = _this$$props2.modalTitle;
      this.$nextTick(function () {
        if (_this9.$refs.frame) {
          _this9.frameLoad(_this9.$refs.frame.contentWindow || {});
        }
      });
      return h("div", {
        "class": "_fc-frame"
      }, [node, h("el-dialog", {
        "attrs": {
          "modal": this.previewMask,
          "title": modalTitle,
          "visible": this.previewVisible
        },
        "on": {
          "close": this.handleCancel
        }
      }, [h("img", {
        "attrs": {
          "alt": "example",
          "src": this.previewImage
        },
        "style": "width: 100%"
      })]), h("el-dialog", helper([{}, {
        "props": _objectSpread2({
          width: width,
          title: title
        }, this.modal)
      }, {
        "attrs": {
          "visible": this.frameVisible
        },
        "on": {
          "close": function close() {
            return _this9.closeModel(true);
          }
        }
      }]), [this.frameVisible || !this.reload ? h("iframe", {
        "ref": "frame",
        "attrs": {
          "src": src,
          "frameBorder": "0"
        },
        "style": {
          'height': height,
          'border': '0 none',
          'width': '100%'
        }
      }) : null, this.makeFooter()])]);
    },
    mounted: function mounted() {
      this.$on('fc.closeModal', this.closeModal);
    }
  };

  var NAME$2 = 'fcRadio';
  var Radio = {
    name: NAME$2,
    props: {
      formCreateRule: {
        type: Object,
        "default": function _default() {
          return {};
        }
      },
      formCreateOptions: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },
      value: {},
      type: String
    },
    watch: {
      value: function value() {
        this.update();
      }
    },
    data: function data() {
      return {
        trueValue: []
      };
    },
    methods: {
      onInput: function onInput(n) {
        this.$emit('input', this.formCreateOptions.filter(function (opt) {
          return opt.label === n;
        }).reduce(function (initial, opt) {
          return opt.value;
        }, ''));
      },
      update: function update() {
        var _this = this;

        this.trueValue = this.formCreateOptions.filter(function (opt) {
          return opt.value === _this.value;
        }).reduce(function (initial, opt) {
          return opt.label;
        }, '');
      }
    },
    created: function created() {
      this.update();
    },
    render: function render() {
      var _this2 = this;

      var h = arguments[0];
      return h("ElRadioGroup", helper([{}, this.formCreateRule, {
        "attrs": {
          "value": this.trueValue
        },
        "on": {
          "input": this.onInput
        }
      }]), [this.formCreateOptions.map(function (opt, index) {
        var props = _objectSpread2({}, opt);

        var Type = _this2.type === 'button' ? 'ElRadioButton' : 'ElRadio';
        delete props.value;
        return h(Type, {
          "props": _objectSpread2({}, props),
          "key": Type + index + opt.value
        });
      }), this.$slots["default"]]);
    }
  };

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

  var NAME$3 = 'fcSelect';
  var Select = {
    name: NAME$3,
    functional: true,
    props: {
      formCreateOptions: {
        type: Array,
        "default": function _default() {
          return [];
        }
      }
    },
    render: function render(h, ctx) {
      return h("ElSelect", helper([{}, ctx.data]), [ctx.props.formCreateOptions.map(function (props, index) {
        var slot = props.slot;
        return h("ElOption", {
          "props": _objectSpread2({}, props),
          "key": '' + index + props.value
        }, [slot ? h("template", {
          "slot": props.slotName || 'default'
        }, [is.Function(slot) ? props.slot(h) : slot]) : null]);
      }).concat(ctx.chlidren)]);
    }
  };

  var NAME$4 = 'fcTree';
  var Tree = {
    name: NAME$4,
    formCreateParser: {
      mergeProp: function mergeProp(ctx) {
        var props = ctx.prop.props;
        if (!props.nodeKey) props.nodeKey = 'id';
        if (!props.props) props.props = {
          label: 'title'
        };
      }
    },
    props: {
      formCreateRule: {
        type: Object,
        "default": function _default() {
          return {
            props: {}
          };
        }
      },
      type: {
        type: String,
        "default": 'checked'
      },
      value: {
        type: [Array, String, Number],
        "default": function _default() {
          return [];
        }
      }
    },
    watch: {
      value: function value() {
        this.setValue();
      }
    },
    methods: {
      onChange: function onChange() {
        this.updateValue();
      },
      updateValue: function updateValue() {
        var type = this.type.toLocaleLowerCase();
        var value;

        if (type === 'selected') {
          value = this.$refs.tree.getCurrentKey();
        } else {
          value = this.$refs.tree.getCheckedKeys();
        }

        this.$emit('input', value);
      },
      setValue: function setValue() {
        var type = this.type.toLocaleLowerCase();

        if (type === 'selected') {
          this.$refs.tree.setCurrentKey(this.value);
        } else {
          this.$refs.tree.setCheckedKeys(toArray(this.value));
        }
      }
    },
    render: function render() {
      var _this = this;

      var h = arguments[0];
      return h("ElTree", helper([{}, this.formCreateRule, {
        "ref": "tree",
        "on": {
          "check-change": function checkChange() {
            return _this.updateValue();
          },
          "node-click": function nodeClick() {
            return _this.updateValue();
          }
        }
      }]), [this.$slots["default"]]);
    },
    mounted: function mounted() {
      this.setValue();
      this.updateValue();
    }
  };

  var css_248z$1 = "._fc-upload .fc-files img {\n    width: 100%;\n    height: 100%;\n    display: inline-block;\n    vertical-align: top;\n}\n\n._fc-upload .fc-upload-btn {\n    border: 1px dashed #c0ccda;\n    cursor: pointer;\n}\n\n._fc-upload .fc-upload-cover {\n    opacity: 0;\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    background: rgba(0, 0, 0, .6);\n    -webkit-transition: opacity .3s;\n    -o-transition: opacity .3s;\n    transition: opacity .3s;\n}\n\n._fc-upload .fc-upload-cover i {\n    color: #fff;\n    font-size: 20px;\n    cursor: pointer;\n    margin: 0 2px;\n}\n\n._fc-upload .fc-files:hover .fc-upload-cover {\n    opacity: 1;\n}\n\n._fc-upload .el-upload {\n    display: block;\n}\n\n._fc-upload .fc-upload-btn, ._fc-upload .fc-files {\n    display: inline-block;\n    width: 58px;\n    height: 58px;\n    text-align: center;\n    line-height: 58px;\n    border: 1px solid #c0ccda;\n    border-radius: 4px;\n    overflow: hidden;\n    background: #fff;\n    position: relative;\n    -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);\n    box-shadow: 2px 2px 5px rgba(0, 0, 0, .1);\n    margin-right: 4px;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n";
  styleInject(css_248z$1);

  function parseFile(file, i) {
    return {
      url: file,
      name: getFileName(file),
      uid: i
    };
  }

  function getFileName(file) {
    return ('' + file).split('/').pop();
  }

  var NAME$5 = 'fcUpload';
  var Upload = {
    name: NAME$5,
    props: {
      formCreateRule: {
        type: Object,
        "default": function _default() {
          return {
            props: {}
          };
        }
      },
      onHandle: {
        type: Function,
        "default": function _default(file) {
          this.previewImage = file.url;
          this.previewVisible = true;
        }
      },
      uploadType: {
        type: String,
        "default": 'file'
      },
      limit: {
        type: Number,
        "default": 0
      },
      allowRemove: {
        type: Boolean,
        "default": true
      },
      previewMask: undefined,
      modalTitle: String,
      handleIcon: [String, Boolean],
      value: [Array, String]
    },
    data: function data() {
      return {
        uploadList: [],
        previewVisible: false,
        previewImage: ''
      };
    },
    created: function created() {
      if (this.formCreateRule.props.showFileList === undefined) {
        this.formCreateRule.props.showFileList = false;
      }

      this.formCreateRule.props.fileList = toArray(this.value).map(parseFile);
    },
    watch: {
      value: function value(n) {
        if (this.$refs.upload.uploadFiles.every(function (file) {
          return !file.status || file.status === 'success';
        })) {
          this.$refs.upload.uploadFiles = toArray(n).map(parseFile);
          this.uploadList = this.$refs.upload.uploadFiles;
        }
      },
      limit: function limit(n, o) {
        if (o === 1 || n === 1) {
          this.update();
        }
      }
    },
    methods: {
      key: function key(unique) {
        return unique;
      },
      isDisabled: function isDisabled() {
        return this.formCreateRule.props.disabled === true;
      },
      onRemove: function onRemove(file) {
        if (this.isDisabled()) {
          return;
        }

        this.$refs.upload.handleRemove(file);
      },
      handleClick: function handleClick(file) {
        if (this.isDisabled()) {
          return;
        }

        this.onHandle(file);
      },
      makeItem: function makeItem(file, index) {
        var h = this.$createElement;
        return this.uploadType === 'image' ? h("img", {
          "attrs": {
            "src": file.url
          },
          "key": this.key('img' + index)
        }) : h("i", {
          "class": "el-icon-tickets",
          "key": this.key('i' + index)
        });
      },
      makeRemoveIcon: function makeRemoveIcon(file, index) {
        var _this = this;

        var h = this.$createElement;
        return h("i", {
          "class": "el-icon-delete",
          "on": {
            "click": function click() {
              return _this.onRemove(file);
            }
          },
          "key": this.key('ri' + index)
        });
      },
      makeHandleIcon: function makeHandleIcon(file, index) {
        var _this2 = this;

        var h = this.$createElement;
        return h("i", {
          "class": this.handleIcon === true || this.handleIcon === undefined ? 'el-icon-view' : this.handleIcon,
          "on": {
            "click": function click() {
              return _this2.handleClick(file);
            }
          },
          "key": this.key('hi' + index)
        });
      },
      makeProgress: function makeProgress(file, index) {
        var h = this.$createElement;
        return h("ElProgress", helper([{}, {
          "props": {
            percentage: file.percentage,
            type: 'circle',
            width: 52
          }
        }, {
          "style": "margin-top:2px;",
          "key": this.key('pg' + index)
        }]));
      },
      makeIcons: function makeIcons(file, index) {
        var h = this.$createElement;
        var icons = [];

        if (this.allowRemove || this.handleIcon !== false) {
          if (this.uploadType !== 'file' && this.handleIcon !== false || this.uploadType === 'file' && this.handleIcon) {
            icons.push(this.makeHandleIcon(file, index));
          }

          if (this.allowRemove) {
            icons.push(this.makeRemoveIcon(file, index));
          }

          return h("div", {
            "class": 'fc-upload-cover'
          }, [icons]);
        }
      },
      makeFiles: function makeFiles() {
        var _this3 = this;

        var h = this.$createElement;
        return this.uploadList.map(function (file, index) {
          return _this3.$scopedSlots.fileList ? _this3.$scopedSlots.fileList({
            file: file,
            index: index,
            vm: _this3
          }) : h("div", {
            "key": _this3.key(index),
            "class": 'fc-files'
          }, [file.percentage !== undefined && file.status !== 'success' ? _this3.makeProgress(file, index) : [_this3.makeItem(file, index), _this3.makeIcons(file, index)]]);
        });
      },
      makeUpload: function makeUpload() {
        var h = this.$createElement;
        var isShow = !this.limit || this.limit > this.uploadList.length;
        return h("ElUpload", helper([{}, this.formCreateRule, {
          "ref": "upload",
          "style": {
            display: 'inline-block'
          },
          "key": this.key('upload')
        }]), [isShow ? h("template", {
          "slot": "default"
        }, [this.$slots["default"] ? this.$slots["default"] : h("div", {
          "class": 'fc-upload-btn'
        }, [h("i", {
          "class": "el-icon-upload2"
        })])]) : null]);
      },
      update: function update() {
        var files = this.$refs.upload.uploadFiles.map(function (file) {
          return file.url;
        }).filter(function (url) {
          return url !== undefined;
        });
        this.$emit('input', this.limit === 1 ? files[0] || '' : files);
      },
      handleCancel: function handleCancel() {
        this.previewVisible = false;
      }
    },
    render: function render() {
      var h = arguments[0];

      if (this.$refs.upload) {
        if (this.formCreateRule.props.showFileList === undefined) {
          this.formCreateRule.props.showFileList = this.$refs.upload.showFileList;
        }

        this.formCreateRule.props.fileList = this.$refs.upload.fileList;
      }

      return h("div", {
        "class": '_fc-upload'
      }, [[this.formCreateRule.props.showFileList ? [] : this.makeFiles(), this.makeUpload()], h("el-dialog", {
        "attrs": {
          "modal": this.previewMask,
          "title": this.modalTitle,
          "visible": this.previewVisible
        },
        "on": {
          "close": this.handleCancel
        }
      }, [h("img", {
        "attrs": {
          "alt": "example",
          "src": this.previewImage
        },
        "style": "width: 100%"
      })])]);
    },
    mounted: function mounted() {
      var _this4 = this;

      this.uploadList = this.$refs.upload.uploadFiles;
      this.$watch(function () {
        return _this4.$refs.upload.uploadFiles;
      }, function () {
        _this4.update();
      }, {
        deep: true
      });
    }
  };

  var NAME$6 = 'fcGroup';
  var Group = {
    name: NAME$6,
    props: {
      field: String,
      rule: Object,
      rules: Array,
      expand: Number,
      options: Object,
      formCreate: Object,
      button: {
        type: Boolean,
        "default": true
      },
      max: {
        type: Number,
        "default": 0
      },
      min: {
        type: Number,
        "default": 0
      },
      value: {
        type: Array,
        "default": function _default() {
          return [];
        }
      },
      disabled: {
        type: Boolean,
        "default": false
      },
      fontSize: {
        type: Number,
        "default": 28
      }
    },
    data: function data() {
      return {
        len: 0,
        cacheRule: {},
        cacheValue: {}
      };
    },
    computed: {
      formRule: function formRule() {
        if (this.rule) {
          return [this.rule];
        }

        if (this.rules) {
          return this.rules;
        }

        return [];
      }
    },
    watch: {
      disabled: function disabled(n) {
        var lst = this.cacheRule;
        Object.keys(lst).forEach(function (k) {
          lst[k].$f.disabled(n);
        });
      },
      value: function value(n) {
        var _this = this;

        n = n || [];
        var keys = Object.keys(this.cacheRule),
            total = keys.length,
            len = total - n.length;

        if (len < 0) {
          for (var i = len; i < 0; i++) {
            this.addRule(n.length + i);
          }

          this.$forceUpdate();

          for (var _i = 0; _i < total; _i++) {
            this.setValue(keys[_i], n[_i]);
          }
        } else {
          if (len > 0) {
            for (var _i2 = 0; _i2 < len; _i2++) {
              this.removeRule(keys[total - _i2 - 1]);
            }

            this.subForm();
          }

          n.forEach(function (val, i) {
            _this.setValue(keys[i], n[i]);
          });
        }
      }
    },
    methods: {
      _value: function _value(v) {
        return v && hasProperty(v, this.field) ? v[this.field] : v;
      },
      cache: function cache(k, val) {
        this.cacheValue[k] = JSON.stringify(val);
      },
      input: function input(value) {
        this.$emit('input', value);
        this.$emit('change', value);
      },
      formData: function formData(key, _formData) {
        var _this2 = this;

        var cacheRule = this.cacheRule;
        var keys = Object.keys(cacheRule);

        if (keys.filter(function (k) {
          return cacheRule[k].$f;
        }).length !== keys.length) {
          return;
        }

        var value = keys.map(function (k) {
          var data = key === k ? _formData : _objectSpread2({}, _this2.cacheRule[k].$f.form);
          var value = _this2.field ? data[_this2.field] || null : data;

          _this2.cache(k, value);

          return value;
        });
        this.input(value);
      },
      setValue: function setValue(key, value) {
        var field = this.field,
            $f = this.cacheRule[key].$f;

        if (field) {
          value = _defineProperty({}, field, this._value(value));
        }

        if (this.cacheValue[key] === JSON.stringify(field ? value[field] : value)) {
          return;
        }

        this.cache(key, value);
        $f.coverValue(value || {});
      },
      addRule: function addRule(i, emit) {
        var _this3 = this;

        var rule = this.$formCreate.copyRules(this.formRule);
        var options = this.options ? this.options : {
          submitBtn: false,
          resetBtn: false,
          page: false,
          formData: this.field ? _defineProperty({}, this.field, this._value(this.value[i])) : this.value[i] || {}
        };
        this.$set(this.cacheRule, ++this.len, {
          rule: rule,
          options: options
        });

        if (emit) {
          this.$nextTick(function () {
            return _this3.$emit('add', rule, Object.keys(_this3.cacheRule).length - 1);
          });
        }
      },
      add$f: function add$f(i, key, $f) {
        this.cacheRule[key].$f = $f;
        this.subForm();
        this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
      },
      subForm: function subForm() {
        var _this4 = this;

        this.$emit('fc.subForm', Object.keys(this.cacheRule).map(function (k) {
          return _this4.cacheRule[k].$f;
        }));
      },
      removeRule: function removeRule(key, emit) {
        var _this5 = this;

        var index = Object.keys(this.cacheRule).indexOf(key);
        this.$delete(this.cacheRule, key);
        this.$delete(this.cacheValue, key);

        if (emit) {
          this.$nextTick(function () {
            return _this5.$emit('remove', index);
          });
        }
      },
      add: function add(i) {
        !this.disabled && this.addRule(i, true);
      },
      del: function del(index, key) {
        if (this.disabled) {
          return;
        }

        this.removeRule(key, true);
        this.subForm();
        this.value.splice(index, 1);
        this.input(this.value);
      },
      addIcon: function addIcon(key) {
        var h = this.$createElement;
        return h("i", {
          "key": "a".concat(key),
          "class": "el-icon-circle-plus-outline",
          "style": "font-size:".concat(this.fontSize, "px;cursor:").concat(this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer', ";"),
          "on": {
            "click": this.add
          }
        });
      },
      delIcon: function delIcon(index, key) {
        var _this6 = this;

        var h = this.$createElement;
        return h("i", {
          "key": "d".concat(key),
          "class": "el-icon-remove-outline",
          "style": "font-size:".concat(this.fontSize, "px;cursor:").concat(this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer;color:#606266', ";"),
          "on": {
            "click": function click() {
              return _this6.del(index, key);
            }
          }
        });
      },
      makeIcon: function makeIcon(total, index, key) {
        var _this7 = this;

        if (this.$scopedSlots.button) {
          return this.$scopedSlots.button({
            total: total,
            index: index,
            vm: this,
            key: key,
            del: function del() {
              return _this7.del(index, key);
            },
            add: this.add
          });
        }

        if (index === 0) {
          return [this.max !== 0 && total >= this.max ? null : this.addIcon(key), this.min === 0 || total > this.min ? this.delIcon(index, key) : null];
        }

        if (index >= this.min) {
          return this.delIcon(index, key);
        }
      },
      emitEvent: function emitEvent(name, args, index, key) {
        this.$emit.apply(this, [name].concat(_toConsumableArray(args), [this.cacheRule[key].$f, index]));
      }
    },
    created: function created() {
      var d = (this.expand || 0) - this.value.length;

      if (d > 0) {
        for (var i = 0; i < d; i++) {
          this.value.push(this.field ? null : {});
        }
      }

      for (var _i3 = 0; _i3 < this.value.length; _i3++) {
        this.addRule(_i3);
      }
    },
    render: function render() {
      var _this8 = this;

      var h = arguments[0];
      var keys = Object.keys(this.cacheRule);
      var button = this.button;
      return keys.length === 0 ? this.$scopedSlots["default"] ? this.$scopedSlots["default"]({
        vm: this,
        add: this.add
      }) : h("i", {
        "key": 'a_def',
        "class": "el-icon-circle-plus-outline",
        "style": "font-size:".concat(this.fontSize, "px;vertical-align:middle;color:").concat(this.disabled ? '#c9cdd4;cursor: not-allowed' : '#606266;cursor:pointer', ";"),
        "on": {
          "click": this.add
        }
      }) : h("div", {
        "key": 'con'
      }, [keys.map(function (key, index) {
        var _this8$cacheRule$key = _this8.cacheRule[key],
            rule = _this8$cacheRule$key.rule,
            options = _this8$cacheRule$key.options;
        return h("ElRow", {
          "attrs": {
            "align": "middle",
            "type": "flex"
          },
          "key": key,
          "style": "border-bottom:1px dashed #DCDFE6;padding:10px;margin-bottom:10px;"
        }, [h("ElCol", {
          "attrs": {
            "span": button ? 20 : 24
          }
        }, [h("ElFormItem", [h("FormCreate", helper([{
          "key": key
        }, {
          "on": {
            'update:value': function updateValue(formData) {
              return _this8.formData(key, formData);
            },
            'emit-event': function emitEvent(name) {
              for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
              }

              return _this8.emitEvent(name, args, index, key);
            },
            input: function input($f) {
              return _this8.add$f(index, key, $f);
            }
          }
        }, {
          "attrs": {
            "rule": rule,
            "option": options
          }
        }]))])]), button ? h("ElCol", {
          "attrs": {
            "span": 2,
            "pull": 1,
            "push": 1
          }
        }, [_this8.makeIcon(keys.length, index, key)]) : null]);
      })]);
    }
  };

  var components = [Checkbox, Frame, Radio, Select, Tree, Upload, Group];

  function $set(target, field, value) {
    Vue__default['default'].set(target, field, value);
  }
  function $del(target, field) {
    Vue__default['default']["delete"](target, field);
  }

  var _extends$1 = Object.assign || function (a) {
    for (var b, c = 1; c < arguments.length; c++) {
      for (var d in b = arguments[c], b) {
        Object.prototype.hasOwnProperty.call(b, d) && $set(a, d, b[d]);
      }
    }

    return a;
  };

  function extend() {
    return _extends$1.apply(this, arguments);
  }

  var NAME$7 = 'FormCreate'; //todo 优化 this 绑定

  function $FormCreate(FormCreate) {
    return {
      name: NAME$7,
      componentName: NAME$7,
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
        this.formCreate = new FormCreate(this, Vue__default['default'].observable(rule), Vue__default['default'].observable(option));
        value && is.Object(value) && this.formCreate.updateOptions({
          formData: value
        });
        Object.keys(this.formCreate.prop).forEach(function (k) {
          extend(_this2.$options[k], _this2.formCreate.prop[k]);
        });
      }
    };
  }

  var normalMerge$1 = ['attrs', 'props', 'domProps', 'scopedSlots'];
  var toArrayMerge$1 = ['class', 'style', 'directives'];
  var functionalMerge$1 = ['on', 'nativeOn'];

  var mergeProps = function mergeProps(objects) {
    var initial = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var opt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var _normalMerge = [].concat(normalMerge$1, _toConsumableArray(opt['normal'] || []));

    var _toArrayMerge = [].concat(toArrayMerge$1, _toConsumableArray(opt['array'] || []));

    var _functionalMerge = [].concat(functionalMerge$1, _toConsumableArray(opt['functional'] || []));

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
                a[key][hook] = mergeFn$1(a[key][hook], b[key][hook]);
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

  var mergeFn$1 = function mergeFn(fn1, fn2) {
    return function () {
      fn1 && fn1.apply(this, arguments);
      fn2 && fn2.apply(this, arguments);
    };
  };

  var keyAttrs = ['type', 'slot', 'emitPrefix', 'value', 'name', 'title', 'native', 'info', 'hidden', 'inject', 'options', 'emit', 'link', 'prefix', 'suffix', 'update'];
  var arrayAttrs = ['validate', 'children', 'control', 'className'];
  var normalAttrs = ['col', 'effect', 'wrap'];
  var attrs = [].concat(keyAttrs, _toConsumableArray(normalMerge$1), _toConsumableArray(toArrayMerge$1), _toConsumableArray(functionalMerge$1), arrayAttrs, normalAttrs);
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

  var NAME$8 = 'fcFragment';
  var fragment = {
    name: NAME$8,
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

  var _vue = typeof window !== 'undefined' && window.Vue ? window.Vue : Vue__default['default'];

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

  var DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    week: 'yyyywWW',
    timerange: 'HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    monthrange: 'yyyy-MM',
    datetimerange: 'yyyy-MM-dd HH:mm:ss',
    year: 'yyyy'
  };
  var name = 'datePicker';
  var datePicker = {
    name: name,
    maker: function () {
      return ['year', 'month', 'date', 'dates', 'week', 'datetime', 'datetimerange', 'daterange'].reduce(function (initial, type) {
        initial[type] = creatorTypeFactory(name, type.toLowerCase());
        return initial;
      }, {});
    }(),
    mergeProp: function mergeProp(ctx) {
      var props = ctx.prop.props;

      if (!props.valueFormat) {
        props.valueFormat = DEFAULT_FORMATS[props.type] || DEFAULT_FORMATS['date'];
      }
    }
  };

  var name$1 = 'frame';
  var frame = {
    name: name$1,
    maker: function () {
      var types = {
        frameInputs: ['input', 0],
        frameFiles: ['file', 0],
        frameImages: ['image', 0],
        frameInputOne: ['input', 1],
        frameFileOne: ['file', 1],
        frameImageOne: ['image', 1]
      };
      var maker = Object.keys(types).reduce(function (maker, key) {
        maker[key] = creatorTypeFactory(name$1, function (m) {
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
      return maker;
    }()
  };

  var name$2 = 'hidden';
  var hidden = {
    name: name$2,
    maker: _defineProperty({}, name$2, function (field, value) {
      return creatorFactory('hidden')('', field, value);
    }),
    render: function render() {
      return [];
    }
  };

  var name$3 = 'input';
  var input = {
    name: name$3,
    maker: function () {
      var maker = ['password', 'url', 'email', 'text', 'textarea'].reduce(function (maker, type) {
        maker[type] = creatorTypeFactory(name$3, type);
        return maker;
      }, {});
      maker.idate = creatorTypeFactory(name$3, 'date');
      return maker;
    }(),
    mergeProp: function mergeProp(ctx) {
      var props = ctx.prop.props;

      if (props && props.autosize && props.autosize.minRows) {
        props.rows = props.autosize.minRows || 2;
      }
    }
  };

  var name$4 = 'slider';
  var slider = {
    name: name$4,
    maker: {
      sliderRange: creatorTypeFactory(name$4, true, 'range')
    },
    toFormValue: function toFormValue(value, ctx) {
      var rule = ctx.rule,
          isArr = Array.isArray(value),
          props = rule.props,
          min = props.min || 0,
          parseValue;

      if (props.range === true) {
        parseValue = isArr ? value : [min, parseFloat(value) || min];
      } else {
        parseValue = isArr ? parseFloat(value[0]) || min : parseFloat(value);
      }

      return parseValue;
    }
  };

  var name$5 = 'timePicker';
  var timePicker = {
    name: name$5,
    maker: {
      time: creatorTypeFactory(name$5, function (m) {
        return m.props.isRange = false;
      }),
      timeRange: creatorTypeFactory(name$5, function (m) {
        return m.props.isRange = true;
      })
    },
    mergeProp: function mergeProp(ctx) {
      var props = ctx.prop.props;

      if (!props.valueFormat) {
        props.valueFormat = 'HH:mm:ss';
      }
    }
  };

  var parsers = [datePicker, frame, hidden, input, slider, timePicker];

  var alias = {
    button: 'elButton',
    icon: 'i',
    slider: 'elSlider',
    rate: 'elRate',
    upload: 'fcUpload',
    cascader: 'elCascader',
    popover: 'elPopover',
    tooltip: 'elTooltip',
    colorPicker: 'elColorPicker',
    color: 'elColorPicker',
    timePicker: 'elTimePicker',
    time: 'elTimePicker',
    datePicker: 'elDatePicker',
    date: 'elDatePicker',
    'switch': 'elSwitch',
    select: 'fcSelect',
    checkbox: 'fcCheckbox',
    radio: 'fcRadio',
    inputNumber: 'elInputNumber',
    number: 'elInputNumber',
    input: 'elInput',
    formItem: 'elFormItem',
    form: 'elForm',
    frame: 'fcFrame',
    col: 'elCol',
    row: 'elRow',
    tree: 'fcTree',
    autoComplete: 'elAutocomplete',
    auto: 'elAutocomplete',
    group: 'fcGroup'
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
        show: true,
        gutter: 0,
        type: undefined,
        align: undefined,
        justify: undefined,
        tag: 'div'
      },
      submitBtn: {
        type: 'primary',
        size: 'medium',
        plain: false,
        round: false,
        circle: false,
        loading: false,
        disabled: false,
        icon: 'el-icon-upload',
        width: undefined,
        autofocus: false,
        nativeType: 'button',
        innerText: '提交',
        show: true,
        col: undefined,
        click: undefined
      },
      resetBtn: {
        type: 'default',
        size: 'medium',
        plain: false,
        round: false,
        circle: false,
        loading: false,
        disabled: false,
        icon: 'el-icon-refresh',
        width: undefined,
        autofocus: false,
        nativeType: 'button',
        innerText: '重置',
        show: false,
        col: undefined,
        click: undefined
      }
    };
  }

  function isTooltip(info) {
    return info.type === 'tooltip';
  }

  var upperCaseReg = /[A-Z]/;
  function isAttr(name, value) {
    return !upperCaseReg.test(name) && (is.String(value) || is.Number(value));
  }

  function tidy(props, name) {
    if (!hasProperty(props, name)) return;

    if (is.String(props[name])) {
      var _props$name;

      props[name] = (_props$name = {}, _defineProperty(_props$name, name, props[name]), _defineProperty(_props$name, "show", true), _props$name);
    }
  }

  function isFalse(val) {
    return val === false;
  }

  function tidyBool(opt, name) {
    if (hasProperty(opt, name) && !is.Object(opt[name])) {
      opt[name] = {
        show: !!opt[name]
      };
    }
  }

  var manager = {
    validate: function validate(call) {
      this.form().validate(function (valid) {
        call && call(valid);
      });
    },
    validateField: function validateField(field, call) {
      this.form().validateField(field, call);
    },
    resetField: function resetField(ctx) {
      this.vm.$refs[ctx.wrapRef].resetField();
    },
    clearValidateState: function clearValidateState(ctx) {
      var fItem = this.vm.$refs[ctx.wrapRef];

      if (fItem) {
        fItem.validateMessage = '';
        fItem.validateState = '';
      }
    },
    tidyOptions: function tidyOptions(options) {
      ['submitBtn', 'resetBtn', 'row', 'info', 'wrap', 'col'].forEach(function (name) {
        tidyBool(options, name);
      });
      return options;
    },
    tidyRule: function tidyRule(_ref) {
      var prop = _ref.prop;
      tidy(prop, 'title');
      tidy(prop, 'info');
      return prop;
    },
    mergeProp: function mergeProp(ctx) {
      var props = ctx.prop.props;
      ctx.prop = mergeProps([{
        attrs: Object.keys(props).reduce(function (initial, val) {
          if (isAttr(val, props[val])) initial[val] = props[val];
          return initial;
        }, {}),
        info: this.options.info || {},
        wrap: this.options.wrap || {},
        col: this.options.col || {}
      }, ctx.prop], {
        info: {
          trigger: 'hover',
          placement: 'top-start',
          icon: 'el-icon-warning'
        },
        title: {},
        col: {
          span: 24
        },
        wrap: {}
      }, {
        normal: ['title', 'info', 'col', 'wrap']
      });
      props = ctx.prop.props;

      if (!props.size && this.options.form.size) {
        props.size = this.options.form.size;
      }
    },
    getDefaultOptions: function getDefaultOptions() {
      return getConfig();
    },
    update: function update() {
      var form = this.options.form;
      var h = this.$handle;
      this.rule = {
        props: _objectSpread2(_objectSpread2({}, form), {}, {
          model: h.formData,
          rules: h.validate
        }),
        nativeOn: {
          submit: function submit(e) {
            e.preventDefault();
          }
        },
        "class": [form.className, form["class"], 'form-create'],
        style: form.style,
        type: 'form'
      };
    },
    beforeRender: function beforeRender() {
      var key = this.key,
          ref = this.ref,
          $handle = this.$handle;
      extend(this.rule, {
        key: key,
        ref: ref
      });
      extend(this.rule.props, {
        model: $handle.formData,
        rules: $handle.validate
      });
    },
    render: function render(children) {
      if (children.length) {
        children.push(this.makeFormBtn());
      }

      return this.$render.renderRule(this.rule, isFalse(this.options.row.show) ? children : [this.makeRow(children)]);
    },
    makeWrap: function makeWrap(ctx, children) {
      var rule = ctx.prop;
      var uni = "".concat(this.key).concat(ctx.key);
      var col = rule.col;
      var labelWidth = !col.labelWidth && isFalse(rule.title.show) ? 0 : col.labelWidth;
      var _this$rule$props = this.rule.props,
          inline = _this$rule$props.inline,
          _col = _this$rule$props.col;
      var item = isFalse(rule.wrap.show) ? children : this.$render.renderRule(mergeProps([rule.wrap, {
        props: _objectSpread2(_objectSpread2({
          title: rule.title.title,
          labelWidth: labelWidth === void 0 ? labelWidth : toString(labelWidth)
        }, rule.wrap || {}), {}, {
          prop: ctx.field,
          rules: rule.validate
        }),
        "class": rule.className,
        key: "".concat(uni, "fi"),
        ref: ctx.wrapRef,
        type: 'formItem'
      }]), [children, this.makeInfo(rule, uni)]);
      return inline === true || isFalse(_col) || isFalse(col.show) ? item : this.makeCol(rule, uni, [item]);
    },
    makeInfo: function makeInfo(rule, uni) {
      var _this = this;

      var titleProp = rule.title;
      var infoProp = rule.info;
      if (!titleProp.title || isFalse(titleProp.show)) return;
      var isTip = isTooltip(infoProp);
      var children = [titleProp.title];

      var titleFn = function titleFn(pop) {
        return _this.$render.renderRule(mergeProps([titleProp, {
          props: titleProp,
          slot: titleProp.slot || (pop ? isTip ? 'default' : 'reference' : 'label'),
          key: "".concat(uni, "tit"),
          type: titleProp.type || 'span'
        }]), children);
      };

      if (!isFalse(infoProp.show) && infoProp.info) {
        if (infoProp.icon !== false) {
          children.push(this.$render.renderRule({
            type: 'i',
            "class": infoProp.icon === true ? 'el-icon-warning' : infoProp.icon,
            key: "".concat(uni, "i")
          }));
        }

        return this.$render.renderRule(mergeProps([infoProp, {
          type: infoProp.type || 'popover',
          props: _objectSpread2(_objectSpread2({}, infoProp), {}, {
            content: infoProp.info
          }),
          key: "".concat(uni, "pop"),
          slot: 'label'
        }]), [titleFn(true)]);
      }

      return titleFn();
    },
    makeCol: function makeCol(rule, uni, children) {
      var col = rule.col;
      return this.$render.renderRule({
        "class": col["class"],
        type: 'col',
        props: col || {
          span: 24
        },
        key: "".concat(uni, "col")
      }, children);
    },
    makeRow: function makeRow(children) {
      var row = this.options.row || {};
      return this.$render.renderRule({
        type: 'row',
        props: row,
        "class": row["class"],
        key: "".concat(this.key, "row")
      }, children);
    },
    makeFormBtn: function makeFormBtn() {
      var vn = [];

      if (!isFalse(this.options.submitBtn.show)) {
        vn.push(this.makeSubmitBtn());
      }

      if (!isFalse(this.options.resetBtn.show)) {
        vn.push(this.makeResetBtn());
      }

      if (!vn.length) {
        return;
      }

      var item = this.$render.renderRule({
        type: 'formItem',
        key: "".concat(this.key, "fb")
      }, vn);
      return this.rule.props.inline === true ? item : this.$render.renderRule({
        type: 'col',
        props: {
          span: 24
        },
        key: "".concat(this.key, "fc")
      }, [item]);
    },
    makeResetBtn: function makeResetBtn() {
      var _this2 = this;

      var resetBtn = this.options.resetBtn;
      return this.$render.renderRule({
        type: 'button',
        props: resetBtn,
        style: {
          width: resetBtn.width
        },
        on: {
          click: function click() {
            var fApi = _this2.$handle.api;
            resetBtn.click ? resetBtn.click(fApi) : fApi.resetFields();
          }
        },
        key: "".concat(this.key, "b2")
      }, [resetBtn.innerText]);
    },
    makeSubmitBtn: function makeSubmitBtn() {
      var _this3 = this;

      var submitBtn = this.options.submitBtn;
      return this.$render.renderRule({
        type: 'button',
        props: submitBtn,
        style: {
          width: submitBtn.width
        },
        on: {
          click: function click() {
            var fApi = _this3.$handle.api;
            submitBtn.click ? submitBtn.click(fApi) : fApi.submit();
          }
        },
        key: "".concat(this.key, "b1")
      }, [submitBtn.innerText]);
    }
  };

  var maker = {};
  useAlias(maker);
  useSelect(maker);
  useTree(maker);
  useUpload(maker);

  function useAlias(maker) {
    ['group', 'tree', 'switch', 'upload', 'autoComplete', 'checkbox', 'cascader', 'colorPicker', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'select'].forEach(function (name) {
      maker[name] = creatorFactory(name);
    });
    maker.auto = maker.autoComplete;
    maker.number = maker.inputNumber;
    maker.color = maker.colorPicker;
  }

  function useSelect(maker) {
    var select = 'select';
    var multiple = 'multiple';
    maker['selectMultiple'] = creatorTypeFactory(select, true, multiple);
    maker['selectOne'] = creatorTypeFactory(select, false, multiple);
  }

  function useTree(maker) {
    var name = 'tree';
    var types = {
      'treeSelected': 'selected',
      'treeChecked': 'checked'
    };
    Object.keys(types).reduce(function (m, key) {
      m[key] = creatorTypeFactory(name, types[key]);
      return m;
    }, maker);
  }

  function useUpload(maker) {
    var name = 'upload';
    var types = {
      image: ['image', 0],
      file: ['file', 0],
      uploadFileOne: ['file', 1],
      uploadImageOne: ['image', 1]
    };
    Object.keys(types).reduce(function (m, key) {
      m[key] = creatorTypeFactory(name, function (m) {
        return m.props({
          uploadType: types[key][0],
          maxLength: types[key][1]
        });
      });
      return m;
    }, maker);
    maker.uploadImage = maker.image;
    maker.uploadFile = maker.file;
  }

  var css_248z$2 = ".form-create .form-create .el-form-item {\n    margin-bottom: 22px;\n}\n\n.form-create .form-create .el-form-item .el-form-item {\n    margin-bottom: 0px;\n}\n";
  styleInject(css_248z$2);

  function install(FormCreate) {
    FormCreate.componentAlias(alias);
    components.forEach(function (component) {
      FormCreate.component(component.name, component);
    });
    parsers.forEach(function (parser) {
      FormCreate.parser(parser);
    });
    Object.keys(maker).forEach(function (name) {
      FormCreate.maker[name] = maker[name];
    });
  }

  function elmFormCreate() {
    return FormCreateFactory({
      ui: "".concat("element-ui"),
      version: "".concat("1.0.19"),
      manager: manager,
      install: install
    });
  }

  var FormCreate = elmFormCreate();

  if (typeof window !== 'undefined') {
    window.formCreate = FormCreate;

    if (window.Vue) {
      FormCreate.install(window.Vue);
    }
  }

  var maker$1 = FormCreate.maker;

  exports.default = FormCreate;
  exports.maker = maker$1;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
