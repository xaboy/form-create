import unique from '@form-create/utils/lib/unique';
import toCase from '@form-create/utils/lib/tocase';
import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {enumerable} from '../core/util';
import {deepCopy} from '@form-create/utils/lib/deepextend';

function bindParser(rule, parser) {
    Object.defineProperties(rule, {
        __fc__: enumerable(parser)
    });
}

export default function Parser(handle, rule) {
    const id = unique()

    this.id = id;
    this.key = id;
    this.refName = id;
    this.formItemRefName = id + 'fi';
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
    this.field = rule.field ? rule.field : (`_def_${id}`);

    bindParser(this.origin, this);
    this.update(handle, true);
    this.init();
}
extend(Parser.prototype, {
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
        extend(this, {
            deleted: true,
            parent: null,
            prop: {},
            computed: {},
            el: undef,
            $handle: undef,
            $render: undef,
            vm: undef,
            options: undef,
            vNode: undef
        })
    },
    update(handle, init) {
        extend(this, {
            deleted: false,
            $handle: handle,
            $render: handle.$render,
            vm: handle.vm,
            options: handle.options,
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
