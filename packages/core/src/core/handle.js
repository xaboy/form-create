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
    uniqueId,
    isFunction, debounce
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
        const {vm, rules, options, drive} = fc;

        this.vm = vm;
        this.fc = fc;
        this.id = uniqueId();
        this.formRefName = 'fc_' + this.id;
        this.options = options;
        this.drive = drive;

        this.validate = {};
        this.fCreateApi = undefined;
        this.$tick = debounce((fn) => fn(), 150);

        this.__init(rules);
        this.render = new Render(this, drive.formRender);

        this.loadRule(this.rules, false);

        this.render.initOrgChildren();
    }

    __init(rules) {
        this.parsers = {};
        this.formData = {};
        this.trueData = {};
        this.customData = {};
        this.fieldList = [];
        this.rules = rules;
        this.origin = [...this.rules];
    }

    loadRule(rules, child) {
        rules.map((_rule) => {
            if (child && isString(_rule)) return;

            if (!_rule.type)
                return console.error('未定义生成规则的 type 字段' + errMsg());

            let rule = getRule(_rule), parser;

            if (_rule.__fc__) {
                parser = _rule.__fc__;
                parser.update(this);
            } else {
                parser = this.createParser(this.parseRule(rule));
            }

            let children = parser.rule.children;
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
                this.fieldList.push(parser.field);
            }
            return parser;
        }).filter(h => h).forEach(h => {
            h.root = rules;
        });
    }

    createParser(rule) {
        const id = this.id + '' + uniqueId();

        const Parser = this.hasParser(rule.type) ? this.getParser(rule.type) : BaseParser;

        return new Parser(this, rule, id);
    }

    parseRule(_rule) {
        const def = defRule(), rule = getRule(_rule);
        Object.keys(def).forEach(k => {
            if (isUndef(rule[k])) $set(rule, k, def[k]);
        });
        const parseRule = {
            col: parseCol(rule.col),
            props: parseProps(rule.props),
            validate: parseArray(rule.validate),
            options: parseArray(rule.options)
        };

        parseRule.on = parseOn(rule.on, this.parseEmit(rule));

        Object.keys(parseRule).forEach(k => {
            $set(rule, k, parseRule[k]);
        });

        if (!rule.field && this.hasParser(rule.type)) {
            console.error('规则的 field 字段不能空' + errMsg());
        }

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
        console.trace('------------render------------');
        if (this.vm.unique > 0)
            return this.render.run();
        else {
            this.vm.unique = 1;
            return [];
        }
    }

    setParser(parser) {
        let {field, isDef, rule} = parser;
        this.parsers[field] = parser;

        if (this.isNoVal(parser)) {
            if (isDef === true) $set(this.customData, field, rule);
            return;
        }

        $set(this.formData, field, parser.toFormValue(rule.value));
        $set(this.validate, field, rule.validate);
        $set(this.trueData, field, rule);
    }

    notField(field) {
        return this.parsers[field] === undefined;
    }

    onInput(parser, value) {
        value = isUndef(value) ? '' : value;
        let field = parser.field, vm = this.vm, trueValue = parser.toValue(value);
        vm._changeFormData(field, value);
        if (!vm._change(field, JSON.stringify(trueValue))) return;
        this.setValue(parser, trueValue);
        parser.watchFormValue && parser.watchFormValue(value, this);
    }

    created() {
        const vm = this.vm;
        vm.$set(vm, 'cptData', this.formData);
        vm.$set(vm, 'trueData', this.trueData);
        vm.$set(vm, 'buttonProps', this.options.submitBtn);
        vm.$set(vm, 'resetProps', this.options.resetBtn);
        vm.$set(vm, 'rules', this.rules);
        vm.$set(vm, 'components', this.customData);

        if (this.fCreateApi === undefined)
            this.fCreateApi = this.fc.drive.getGlobalApi(this);
        this.fCreateApi.rule = this.rules;
        this.fCreateApi.config = this.options;
    }


    addParserWitch(parser) {
        if (this.isNoVal(parser)) return;
        let field = parser.field, vm = this.vm;

        let unWatch = vm.$watch(() => vm.cptData[field], (n) => {
            if (this.parsers[field] === undefined)
                return delParser(parser);

            let trueValue = parser.toValue(n), json = JSON.stringify(trueValue);
            if (vm._change(field, json)) {
                console.log(field, 'cptData');
                this.setValue(parser, trueValue);
                parser.watchFormValue && parser.watchFormValue(n, this);
            }
        }, {deep: true});

        let unWatch2 = vm.$watch(() => vm.trueData[field].value, (n) => {
            if (n === undefined) return;
            if (this.parsers[field] === undefined)
                return delParser(parser);

            let json = JSON.stringify(n);
            if (vm._change(field, json)) {
                console.log(field, 'trueData');

                $set(parser.rule, 'value', n);
                this.vm._changeFormData(field, parser.toFormValue(n));
                parser.watchValue && parser.watchValue(n, this);
                $nt(() => this.vm._refresh());
            }
        }, {deep: true});

        parser.watch.push(unWatch, unWatch2);

        // const bind = () => {
        //     if (this.parsers[field] === undefined)
        //         delParser(parser);
        //     else
        //         this.$tick(() => this.refresh());
        // };
        //
        // Object.keys(vm._trueData(field)).forEach((key) => {
        //     if (key === 'value') return;
        //     parser.watch.push(vm.$watch(() => vm.trueData[field][key], bind, {deep: true, lazy: true}));
        // });
    }

    mountedParser() {
        const vm = this.vm;
        Object.keys(this.parsers).forEach((field) => {
            let parser = this.parsers[field];
            if (parser.watch.length === 0) this.addParserWitch(parser);

            parser.el = vm.$refs[parser.refName] || {};

            if (parser.defaultValue === undefined)
                parser.defaultValue = deepExtend({}, {value: parser.rule.value}).value;

            parser.mounted && parser.mounted(vm);
        });
    }

    defJsonData() {
        const vm = this.vm;
        Object.keys(vm.cptData).forEach(field => {
            const value = this.parsers[field].toValue(vm.cptData[field]);
            vm.jsonData[field] = JSON.stringify(value);
            vm._changeValue(field, value);
        });
    }

    mounted() {
        const mounted = this.options.mounted;

        this.mountedParser();
        this.defJsonData();

        mounted && mounted(this.fCreateApi);
        this.fc.$emit('mounted', this.fCreateApi);
    }

    reload() {
        const onReload = this.options.onReload;

        this.mountedParser();
        this.defJsonData();

        onReload && onReload(this.fCreateApi);
        this.fc.$emit('reload', this.fCreateApi);
    }

    removeField(field) {
        if (this.parsers[field] === undefined) return;
        const index = this.fieldList.indexOf(field);

        delParser(this.parsers[field]);
        $del(this.parsers, field);
        $del(this.validate, field);

        if (index !== -1) {
            this.fieldList.splice(index, 1);
        }

        this.vm._removeField(field);
    }

    getFormRef() {
        return this.vm.$refs[this.formRefName];
    }

    refresh() {
        this.vm._refresh();
    }

    reloadRule(rules) {
        const vm = this.vm;
        if (!rules) return this.reloadRule(this.rules);
        if (!this.origin.length) this.fCreateApi.refresh();
        this.origin = [...rules];

        Object.keys(this.parsers).forEach(field => this.removeField(field));
        this.__init(rules);
        this.loadRule(rules, false);
        this.render.initOrgChildren();
        this.created();

        $nt(() => {
            this.reload();
        });

        vm.$f = this.fCreateApi;
    }

    setFormData(field, value) {
        this.formData[field] = value;
    }

    setValue(parser, value) {
        $set(parser.rule, 'value', value);
        this.vm._changeValue(parser.field, value);
    }

    getValue(field) {
        return this.vm._value(field);
    }

    clearMsg(parser) {
        const fItem = this.vm.$refs[parser.formItemRefName];
        if (fItem) {
            fItem.validateMessage = '';
            fItem.validateState = '';
            fItem.validateDisabled = true;
        }
    }

    reset(parser) {
        this.vm._changeValue(parser.field, parser.defaultValue);
        this.clearMsg(parser);
    }

    $emit(parser, eventName, ...params) {
        eventName = `fc:${eventName}`;
        if (parser.type === 'template' && parser.rule.template) this.vm.$emit(eventName, ...params);
        else if (this.isNoVal(parser) && parser.el.$emit) parser.el.$emit(eventName, ...params);
    }

    isNoVal(parser) {
        return !this.hasParser(parser.type);
    }

    hasParser(type) {
        return !!this.drive.componentList[type];
    }

    getParser(type) {
        return this.drive.componentList[type].parser
    }

}

export function delParser(parser) {
    parser.watch.forEach((unWatch) => unWatch());
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
    if (isUndef(props.hidden)) $set(props, 'hidden', false);
    if (isUndef(props.visibility)) $set(props, 'visibility', false);

    return props;
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