import unique from '@form-create/utils/lib/unique';
import toCase from '@form-create/utils/lib/tocase';
import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {enumerable} from '../core/util';
import {deepCopy} from '@form-create/utils/lib/deepextend';
import is from '@form-create/utils/lib/type';

function bindParser(rule, parser) {
    Object.defineProperties(rule, {
        __fc__: enumerable(parser, true)
    });
}

function getControl(parser) {
    const control = parser.rule.control || [];
    if (is.Object(control)) return [control];
    else return control;
}

function findControl(parser, rule) {
    for (let i = 0; i < parser.ctrlRule.length; i++) {
        const ctrl = parser.ctrlRule[i];
        if (ctrl.children === rule)
            return ctrl;
    }
}

export default function Parser(handle, rule) {
    const id = unique();
    this.id = id;
    this.refName = id;
    this.formItemRefName = id + 'fi';
    this.updateKey();
    this.modelEvent = 'input';

    this.rule = rule;
    this.origin = rule.__origin__ || rule;
    this.name = rule.name;
    this.originType = rule.type;
    this.type = toCase(rule.type);

    this.watch = [];
    this.root = [];
    this.ctrlRule = [];
    this.parent = null;
    this.prop = {};
    this.computed = {};
    this.input = !!rule.field;
    this.el = undefined;

    this.defaultValue = rule.field ? deepCopy(rule.value) : undefined;
    this.field = rule.field ? rule.field : (`_def_${this.id}`);

    bindParser(this.origin, this);
    this.update(handle, true);
    this.init();
}
extend(Parser.prototype, {
    updateKey(parent) {
        this.key = unique();
        parent && this.parent && this.parent.updateKey(parent);
    },
    initProp() {
        this.prop = mergeProps([this.rule, this.computed]);
    },
    _check(handle) {
        return this.vm === handle.vm
    },
    _unwatch() {
        this.watch.forEach(un => un());
        this.watch = [];
    },
    _watch() {
        this.$handle.addParserWitch(this);
    },
    _delete() {
        const undef = void 0;
        this._unwatch();
        this._removeCtrl();
        extend(this, {
            deleted: true,
            prop: {},
            computed: {},
            el: undef,
            $handle: undef,
            $render: undef,
            vm: undef,
            vNode: undef
        })
    },
    _removeCtrl() {
        this.ctrlRule.forEach(ctrl => ctrl.__fc__._remove());
        this.ctrlRule = [];
    },
    _remove() {
        let index = this.root.indexOf(this.rule.__origin__);
        if (index === -1) return;
        this.root.splice(index, 1);
        this._removeCtrl();
        extend(this, {
            parent: null,
            root: []
        });
    },
    _useCtrl() {
        const controls = getControl(this), validate = [], api = this.$handle.api;
        if (!controls.length) return false;
        //todo 优化 root,优化 control.parser, control 事件
        for (let i = 0; i < controls.length; i++) {
            const control = controls[i], handleFn = control.handle || (val => val === control.value);
            const data = {
                ...control,
                valid: handleFn(this.rule.value, api),
                ctrl: findControl(this, control.rule),
            };
            if ((data.valid && data.ctrl) || (!data.valid && !data.ctrl)) continue;
            validate.push(data);
        }
        if (!validate.length) return false;
        validate.forEach(({valid, rule, prepend, append, child, ctrl}) => {
            if (valid) {
                const ruleCon = {
                    type: 'fcFragment',
                    native: true,
                    children: rule
                }
                this.ctrlRule.push(ruleCon);
                if (prepend) {
                    api.prepend(ruleCon, prepend, child)
                } else if (append) {
                    api.append(ruleCon, append, child)
                } else {
                    this.root.splice(this.root.indexOf(this.rule.__origin__) + 1, 0, ruleCon);
                }
            } else {
                this.ctrlRule.splice(this.ctrlRule.indexOf(ctrl), 1);
                api.removeRule(ctrl);
            }
        });
        return true;
    },
    update(handle, init) {
        extend(this, {
            deleted: false,
            $handle: handle,
            $render: handle.$render,
            vm: handle.vm,
            vNode: handle.$render.vNode
        })
        if (!init) {
            this._unwatch();
        }
        this._watch();
    }
})

//TODO interface
extend(Parser.prototype, {
    init() {
    },
    toFormValue(value) {
        return value
    },
    toValue(formValue) {
        return formValue;
    },
    mounted() {
    }
})
