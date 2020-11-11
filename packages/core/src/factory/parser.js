import unique from '@form-create/utils/lib/unique';
import toCase from '@form-create/utils/lib/tocase';
import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {enumerable} from '../frame/util';
import {deepCopy} from '@form-create/utils/lib/deepextend';

function bindParser(parser) {
    Object.defineProperties(parser.origin, {
        __fc__: enumerable(parser, true)
    });
}

export default function Parser(handle, rule) {
    const id = unique();

    extend(this, {
        id,
        refName: id,
        formItemRefName: id + 'fi',
        rule,
        origin: rule.__origin__ || rule,
        name: rule.name,
        originType: rule.type,
        type: toCase(rule.type),

        watch: [],
        root: [],
        ctrlRule: [],
        parent: null,
        prop: {},
        computed: {},
        input: !!rule.field,
        el: undefined,
        defaultValue: rule.field ? deepCopy(rule.value) : undefined,
        field: rule.field ? rule.field : (`_def_${id}`)
    })

    this.updateKey();
    bindParser(this);
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
            vNode: undef,
            parent: null,
        })
    },
    _removeCtrl() {
        this.ctrlRule.forEach(ctrl => ctrl.__fc__._remove());
        this.ctrlRule = [];
    },
    _remove() {
        let index = this.root.indexOf(this.origin);
        if (index === -1) return;
        this.root.splice(index, 1);
        this._removeCtrl();
        this.$handle.rmParser(this);
        extend(this, {
            root: []
        });
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
