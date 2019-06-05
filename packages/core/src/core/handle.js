import {
    $del,
    $nt,
    $set, deepExtend,
    errMsg,
    extend,
    isNumeric,
    isString,
    isUndef,
    isValidChildren,
    toLine,
    toString,
    uniqueId,
    isFunction
} from '@form-create/utils';
import BaseParser from '../factory/parser';
import Render from './render';


export function getRule(rule) {
    if (isFunction(rule.getRule))
        return rule.getRule();
    else
        return rule;
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

export default class Handle {

    constructor(fc) {
        const {vm, rules, options} = fc;

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

    __init(rules) {
        this.fieldList = {};
        this.trueData = {};
        this.parsers = {};
        this.customData = {};
        this.sortList = [];
        this.rules = rules;
        this.origin = [...this.rules];
    }

    loadRule(rules, child) {
        rules.map((_rule) => {
            if (child && isString(_rule)) return;

            if (!_rule.type)
                return console.error('未定义生成规则的 type 字段' + errMsg());

            let parser;

            if (_rule.__fc__) {
                parser = _rule.__fc__;

                if (parser.vm !== this.vm && !parser.deleted)
                    return console.error(`${_rule.type}规则正在其他的 <form-create> 中使用` + errMsg());
                parser.update(this);
            } else {
                parser = this.createParser(this.parseRule(_rule));
            }

            let children = parser.rule.children, rule = parser.rule;
            if (!this.notField(parser.field))
                return console.error(`${rule.field} 字段已存在` + errMsg());

            this.setParser(parser);

            if (!_rule.__fc__) {
                bindParser(_rule, parser);
            }
            if (isValidChildren(children)) {
                this.loadRule(children, true);
            }

            if (!child) {
                this.sortList.push(parser.id);
            }

            Object.defineProperty(parser.rule, 'value', {
                get: () => {
                    return parser.toValue(this.getFormData(parser));
                },
                set: (value) => {
                    console.log('set parser', parser.field, value);

                    if (this.isChange(parser, value)) {
                        this.$render.clearCache(parser);
                        this.setFormData(parser, parser.toFormValue(value));
                    }
                }
            });

            return parser;
        }).filter(h => h).forEach(h => {
            h.root = rules;
        });
    }

    createParser(rule) {
        const id = this.id + '' + uniqueId(), parsers = this.fc.parsers, type = toString(rule.type).toLocaleLowerCase();

        const Parser = (parsers[type]) ? parsers[type] : BaseParser;

        return new Parser(this, rule, id);
    }

    parseRule(_rule) {
        const def = defRule(), rule = getRule(_rule);
        Object.keys(def).forEach(k => {
            if (isUndef(rule[k])) $set(rule, k, def[k]);
        });
        const parseRule = {
            col: parseCol(rule.col),
            validate: parseArray(rule.validate),
            options: parseArray(rule.options)
        };

        parseRule.on = parseOn(rule.on, this.parseEmit(rule));

        Object.keys(parseRule).forEach(k => {
            $set(rule, k, parseRule[k]);
        });

        if (isUndef(rule.props.elementId)) $set(rule.props, 'elementId', this.unique);
        return rule;
    }

    parseEmit(rule) {
        let event = {}, {emit, emitPrefix, field} = rule;

        if (!Array.isArray(emit)) return event;

        emit.forEach(eventName => {
            const emitKey = emitPrefix ? emitPrefix : field;
            const fieldKey = toLine(`${emitKey}-${eventName}`).replace('_', '-');

            event[eventName] = (...arg) => {
                this.vm.$emit(fieldKey, ...arg);
            };
        });

        return event;
    }

    run() {
        console.log(this.id, '------------render------------');
        if (this.vm.unique > 0)
            return this.$render.run();
        else {
            this.vm.unique = 1;
            return [];
        }
    }

    setParser(parser) {
        let {id, field, name, rule} = parser;
        if (this.parsers[id])
            return;
        this.parsers[id] = parser;

        if (this.isNoVal(parser)) {
            if (name)
                $set(this.customData, name, rule);
            return;
        }
        this.fieldList[field] = parser;
        $set(this.formData, field, parser.toFormValue(rule.value));
        $set(this.validate, field, rule.validate);
        $set(this.trueData, field, rule);
    }

    notField(id) {
        return this.parsers[id] === undefined;
    }

    isChange(parser, value) {
        return JSON.stringify(parser.rule.value) !== JSON.stringify(value);
    }

    onInput(parser, value) {
        if (!this.isNoVal(parser) && this.isChange(parser, parser.toValue(value))) {
            this.$render.clearCache(parser);
            this.formData[parser.field] = value;

        }
    }

    created() {
        console.log('---------created---------');
        const vm = this.vm;
        //TODO 可以不加到 vm 中
        // vm.$set(vm, 'rules', this.rules);
        // vm.$set(vm, 'trueData', this.trueData);
        // vm.$set(vm, 'components', this.customData);
        //^^^^^^^^^^^^^^^^^^^^^

        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);

        vm.$set(vm, 'formData', this.formData);


        if (this.fCreateApi === undefined)
            this.fCreateApi = this.fc.drive.getGlobalApi(this);
        this.fCreateApi.rule = this.rules;
        this.fCreateApi.config = this.options;
    }


    addParserWitch(parser) {
        if (this.isNoVal(parser)) return;
        console.log('---------mountedParser---------', parser.field);
        const vm = this.vm;

        Object.keys(parser.rule).forEach((key) => {
            if (['field', 'type', 'value', 'vm', 'template'].indexOf(key) !== -1 || parser.rule[key] === undefined) return;
            parser.watch.push(vm.$watch(() => parser.rule[key], (n, o) => {
                if (o === undefined) return;
                this.$render.clearCache(parser);
                console.log(key,' -------------- change');
            }, {deep: true, immediate: true}));
        });
    }

    mountedParser() {
        console.log('---------mountedParser---------');
        const vm = this.vm;
        Object.keys(this.parsers).forEach((id) => {
            let parser = this.parsers[id];
            if (parser.watch.length === 0) this.addParserWitch(parser);

            parser.el = vm.$refs[parser.refName] || {};

            if (parser.defaultValue === undefined)
                parser.defaultValue = deepExtend({}, {value: parser.rule.value}).value;

            parser.mounted && parser.mounted();
        });
    }

    mounted() {
        const mounted = this.options.mounted;

        this.mountedParser();

        mounted && mounted(this.fCreateApi);
        this.fc.$emit('mounted', this.fCreateApi);
    }

    reload() {
        const onReload = this.options.onReload;

        this.mountedParser();

        onReload && onReload(this.fCreateApi);
        this.fc.$emit('reload', this.fCreateApi);
    }

    removeField(parser) {
        const {id, field} = parser, index = this.sortList.indexOf(id);

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

    refresh() {
        this.vm._refresh();
    }

    reloadRule(rules) {
        const vm = this.vm;
        if (!rules) return this.reloadRule(this.rules);
        if (!this.origin.length) this.fCreateApi.refresh();
        this.origin = [...rules];

        const parsers = {...this.parsers};
        this.__init(rules);
        this.loadRule(rules, false);
        Object.keys(parsers).filter(id => this.parsers[id] === undefined)
            .forEach(id => this.removeField(parsers[id]));
        this.$render.initOrgChildren();
        this.created();

        $nt(() => {
            this.reload();
        });

        vm.$f = this.fCreateApi;
        this.$render.clearCacheAll();
        this.refresh();
    }

    setFormData(parser, value) {
        this.formData[parser.field] = value;
    }

    getFormData(parser) {
        return this.formData[parser.field];
    }

    fields() {
        return Object.keys(this.formData);
    }

    $emit(parser, eventName, ...params) {
        eventName = `fc:${eventName}`;
        if (parser.type === 'template' && parser.rule.template) this.vm.$emit(eventName, ...params);
        else if (this.isNoVal(parser) && parser.el.$emit) parser.el.$emit(eventName, ...params);
    }

    isNoVal(parser) {
        return !parser.isDef;
    }

}

export function delParser(parser) {
    parser.watch.forEach((unWatch) => unWatch());
    parser.watch = [];
    parser.deleted = true;
    Object.defineProperty(parser.rule, 'value', {
        value: extend({}, {value: parser.rule.value}).value
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
        return {span: col};
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