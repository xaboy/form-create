import BaseParser from '../factory/parser';
import Render from './render';
import Api from './api';
import {enumerable, mergeRule} from './util';
import vNode from '../factory/vNode';
import toLine from '@form-create/utils/lib/toline';
import toCase from '@form-create/utils/lib/tocase';
import {$del, $set} from '@form-create/utils/lib/modify';
import is from '@form-create/utils/lib/type';
import {err} from '@form-create/utils/lib/console';
import debounce from '@form-create/utils/lib/debounce';

export default class Handle {

    constructor(fc) {
        const {vm, rules} = this.fc = fc;

        this.watching = false;
        this.vm = vm;
        //this.options = options;

        this.validate = {};
        this.formData = {};
        this.subForm = {};

        this.api = Api(this);

        this.__init(rules);
        this.$manager = new fc.manager(this);
        this.$render = new Render(this);

        this.loadRule(this.rules, false);

        this.$render.initOrgChildren();

        this.$manager.__init();
    }

    created() {
        const vm = this.vm;

        vm.$set(vm, 'formData', this.formData);

        //todo 优化 formData
        this.api.rule = this.rules;
        this.api.config = this.options;
        if (this.api.form) {
            const form = this.api.form;
            Object.keys(form).forEach((field) => {
                delete form[field];
            })
        } else {
            Object.defineProperty(this.api, 'form', {
                value: {},
                writable: false,
                enumerable: true
            });
        }
        Object.defineProperties(this.api.form, Object.keys(this.api.formData()).reduce((initial, field) => {
            const parser = this.getParser(field);
            const handle = this.valueHandle(parser);
            handle.configurable = true;
            initial[field] = handle;
            return initial;
        }, {}));
    }

    get options() {
        return this.fc.options || {};
    }

    __init(rules) {
        this.fieldList = {};
        this.parsers = {};
        this.customData = {};
        this.sortList = [];
        this.rules = rules;
        this.origin = [...this.rules];
        this.changeStatus = false;
        this.issetRule = [];
    }

    modelEvent(parser) {
        const modelList = this.fc.modelEvents;
        return modelList[parser.originType] || modelList[toCase(parser.type)] || parser.rule.model || parser.modelEvent;
    }

    isset(rule) {
        return this.issetRule.indexOf(rule) > -1;
    }

    loadRule(rules, parent) {
        rules.map((_rule, index) => {
            if (parent && is.String(_rule)) return;

            if (!_rule || (_rule.getRule && !_rule._data.type) || !_rule.type)
                return err('未定义生成规则的 type 字段', _rule);

            if (_rule.field && this.fieldList[_rule.field] !== undefined) {
                this.issetRule.push(_rule);
                return err(`${_rule.field} 字段已存在`, _rule);
            }

            //todo 提高 parser 复用
            let parser;
            //TODO 优化: 如果存在__fc__ 直接返回
            if (_rule.__fc__) {
                parser = _rule.__fc__;
                if (parser.deleted) {
                    if (!parser._check(this)) {
                        parser.update(this);
                    }
                } else {
                    if (!parser._check(this) || this.parsers[parser.id]) {
                        //todo 检查复制规则
                        rules[index] = _rule = _rule._clone ? _rule._clone() : mergeRule({}, _rule);
                        parser = this.createParser(this.parseRule(_rule));
                    }
                }
            } else {
                parser = this.createParser(this.parseRule(_rule));
            }

            if (parser.originType !== parser.rule.type) {
                parser = this.createParser(parser.rule);
            }

            let children = parser.rule.children;

            [false, true].forEach(b => this.parseEmit(parser, b));
            parser.parent = parent || null;
            this.setParser(parser);

            if (is.trueArray(children)) {
                this.loadRule(children, parser);
            }

            if (!parent) {
                this.sortList.push(parser.id);
            }
            //todo 优化 children 渲染,避免监听 vue 的 value
            if (parser.input)
                Object.defineProperty(parser.rule, 'value', this.valueHandle(parser));

            return parser;
        }).filter(h => h).forEach(h => {
            h.root = rules;
        });
    }

    valueHandle(parser) {
        return {
            enumerable: true,
            get: () => {
                return parser.toValue(this.getFormData(parser));
            },
            set: (value) => {
                if (this.isChange(parser, value)) {
                    this.$render.clearCache(parser, true);
                    this.setFormData(parser, parser.toFormValue(value));
                    this.valueChange(parser, value);
                    this.refresh();
                    this.vm.$emit('set-value', parser.field, value, this.api);
                }
            }
        };
    }

    createParser(rule) {
        return new (this.fc.parsers[rule.type] || this.fc.parsers[toCase(rule.type)] || this.fc.parsers[toCase('' + vNode.aliasMap[toCase(rule.type)])] || BaseParser)(this, rule);
    }

    parseRule(_rule) {
        const rule = is.Function(_rule.getRule) ? _rule.getRule() : _rule;

        Object.defineProperties(rule, {
            __origin__: enumerable(_rule)
        });

        fullRule(rule);

        if (rule.field && this.options.formData[rule.field] !== undefined)
            rule.value = this.options.formData[rule.field];

        rule.options = parseArray(rule.options);
        ['on', 'props'].forEach(n => {
            this.parseInjectEvent(rule, n || {});
        })

        return rule;
    }

    parseInjectEvent(rule, on) {
        if (rule.inject === false) return;
        const inject = rule.inject || this.options.injectEvent;
        if (!is.Undef(inject)) return;
        Object.keys(on).forEach(k => {
            if (is.Function(on[k]))
                on[k] = this.inject(rule, on[k], inject)
        });
        return on;
    }

    getInjectData(self, inject) {
        const {option, rule} = this.vm.$options.propsData;
        return {
            $f: this.api,
            rule,
            self: self.__origin__,
            option,
            inject
        };
    }

    inject(self, _fn, inject) {
        if (_fn.__inject) {
            if (this.watching)
                return _fn;
            _fn = _fn.__origin;
        }

        const h = this;

        const fn = function (...args) {
            args.unshift(h.getInjectData(self, inject));
            return _fn(...args);
        };
        fn.__inject = true;
        fn.__origin = _fn;
        return fn;
    }

    parseEmit(parser, on) {
        let event = {}, rule = parser.rule, {emitPrefix, field, name, inject} = rule;
        let emit = rule[on ? 'emit' : 'nativeEmit'] || [];
        if (Array.isArray(emit)) {
            let emitKey = emitPrefix || field || name;
            if (emitKey) {
                if (!on) emitKey = `native-${emitKey}`;
                emit.forEach(eventName => {
                    if (!eventName) return;
                    const fieldKey = toLine(`${emitKey}-${eventName}`);
                    const fn = (...arg) => {
                        this.vm.$emit(fieldKey, ...arg);
                        this.vm.$emit('emit-event', fieldKey, ...arg);
                    };
                    fn.__emit = true;

                    if (inject === false) {
                        event[eventName] = fn;
                    } else {
                        inject = rule.inject || this.options.injectEvent;
                        event[eventName] = is.Undef(inject) ? fn : this.inject(rule, fn, inject);
                    }
                });
            }

        }
        parser.computed[on ? 'on' : 'nativeOn'] = event;
        return event;
    }

    run() {
        if (this.vm.unique > 0)
            return this.$render.run();
        else {
            this.vm.unique = 1;
            return [];
        }
    }

    setParser(parser) {
        let {id, field, name, rule} = parser;
        this.parsers[id] = parser;
        if (name) $set(this.customData, name, parser);
        if (!parser.input) return;
        this.fieldList[field] = parser;
        $set(this.formData, field, parser.toFormValue(rule.value));
        $set(this.validate, field, rule.validate || []);
    }

    addSubForm(parser, subForm) {
        this.subForm[parser.field] = subForm;
    }

    isChange(parser, value) {
        return JSON.stringify(parser.rule.value) !== JSON.stringify(value);
    }

    isQuote(parser, value) {
        return (is.Object(value) || Array.isArray(value)) && value === parser.rule.value;
    }

    valueChange(parser) {
        this.validateControl(parser);
    }

    onInput(parser, value) {
        let val;
        if (parser.input && (this.isQuote(parser, val = parser.toValue(value)) || this.isChange(parser, val))) {
            this.$render.clearCache(parser);
            this.setFormData(parser, value);
            this.changeStatus = true;
            this.valueChange(parser);
            this.vm.$emit('change', parser.field, val, this.api);
        }
    }

    getParser(id) {
        return this.fieldList[id] || this.customData[id] || this.parsers[id];
    }

    addParserWitch(parser) {
        const vm = this.vm;
        //todo 支持单个组件 reload
        const none = ['field', 'type', 'value', 'vm', 'template', 'name', 'config', 'control'];
        Object.keys(parser.rule).filter(k => none.indexOf(k) === -1).forEach((key) => {
            parser.watch.push(vm.$watch(() => parser.rule[key], n => {
                this.watching = true;
                if (key === 'hidden')
                    parser.updateKey(true);
                if (key === 'validate')
                    this.validate[parser.field] = n || [];
                else if (['props', 'on', 'nativeOn'].indexOf(key) > -1)
                    this.parseInjectEvent(parser.rule, n || {});
                else if (['emit', 'nativeEmit'].indexOf(key) > -1)
                    this.parseEmit(parser, key === 'emit');
                this.$render.clearCache(parser);
                this.watching = false;
            }, {deep: key !== 'children'}));
        });
    }

    refreshControl(parser) {
        if (parser.input && parser.rule.control) {
            this.validateControl(parser);
        }
    }

    //todo 优化删除 rule
    //todo 检查表单重置
    //todo 检查深拷贝运行机制
    //todo 减少 reload
    //todo 优化 options 获取方式
    //todo control 中有插槽,检查缓存
    validateControl(parser) {
        if (parser._useCtrl()) {
            parser.parent && this.$render.clearCache(parser.parent);
            this.refresh();
        }
    }

    refreshControls() {
        Object.keys(this.parsers).forEach((id) => {
            this.refreshControl(this.parsers[id]);
        });
    }

    lifecycle(name) {
        const fn = this.options[name];
        this.refreshControls();
        fn && fn(this.api);
        this.fc.$emit(name, this.api);
    }

    deleteParser(parser) {
        const {id, field, name} = parser, index = this.sortList.indexOf(id);

        parser._delete();
        if (parser.input) {
            Object.defineProperty(parser.rule, 'value', {
                value: parser.rule.value
            });
        }

        $del(this.parsers, id);

        if (index > -1) {
            this.sortList.splice(index, 1);
        }

        if (!this.fieldList[field]) {
            $del(this.validate, field);
            $del(this.formData, field);
            $del(this.fieldList, field);
        }

        if (name && this.customData[name]) {
            $del(this.customData, name);
        }

        if (this.subForm[parser.field])
            $del(this.subForm, field);

        return parser;
    }

    refresh() {
        this.vm._refresh();
    }

    setFormData(parser, value) {
        $set(this.formData, parser.field, value);
    }

    getFormData(parser) {
        return this.formData[parser.field];
    }

    fields() {
        return Object.keys(this.formData);
    }

}

Handle.prototype.reloadRule = debounce(function (rules) {
    const vm = this.vm;
    if (!rules) return this.reloadRule(this.rules);
    if (!this.origin.length) this.api.refresh();
    this.origin = [...rules];

    const parsers = {...this.parsers};
    this.__init(rules);
    this.loadRule(rules, false);
    // todo 移除已删除规则可能会导致 reload,考虑内部用 origin 渲染
    Object.keys(parsers).filter(id => this.parsers[id] === undefined)
        .forEach(id => this.deleteParser(parsers[id]));
    this.$render.initOrgChildren();
    this.formData = {...this.formData};
    this.created();

    vm.$f = this.api;
    this.$render.clearCacheAll();
    this.refresh();

    vm.$nextTick(() => {
        this.lifecycle('reload');
    });
}, 100);

function parseArray(validate) {
    return Array.isArray(validate) ? validate : [];
}

function fullRule(rule) {
    const def = defRule();

    Object.keys(def).forEach(k => {
        if (!({}).hasOwnProperty.call(rule, k)) $set(rule, k, def[k]);
    });
    return rule;
}

//todo 合并
function defRule() {
    return {
        validate: [],
        children: [],
        col: {},
        emit: [],
        props: {},
        on: {},
        options: [],
        value: null,
        hidden: false,
    };
}
