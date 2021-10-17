import unique from '@form-create/utils/lib/unique';
import toCase from '@form-create/utils/lib/tocase';
import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import {enumerable} from '../frame/util';
import {deepCopy} from '@form-create/utils/lib/deepextend';

function bind(ctx) {
    Object.defineProperties(ctx.origin, {
        __fc__: enumerable(ctx, true)
    });
}

export default function RuleContext(handle, rule) {
    const id = unique();

    extend(this, {
        id,
        ref: id,
        wrapRef: id + 'fi',
        rule,
        origin: rule.__origin__ || rule,
        name: rule.name,

        watch: [],
        linkOn: [],
        root: [],
        ctrlRule: [],
        parent: null,
        cacheConfig: null,
        prop: {...rule},
        computed: {},
        payload: {},
        input: !!rule.field,
        el: undefined,
        defaultValue: rule.field ? deepCopy(rule.value) : undefined,
        field: rule.field || undefined,
    })

    this.updateType();
    this.updateKey();
    bind(this);
    this.update(handle, true);
}

extend(RuleContext.prototype, {
    effectData(name) {
        if (!this.payload[name]) {
            this.payload[name] = {};
        }
        return this.payload[name];
    },
    clearEffectData(name) {
        delete this.payload[name]
    },
    updateKey(flag) {
        this.key = unique();
        flag && this.parent && this.parent.updateKey(flag);
    },
    updateType() {
        this.originType = this.rule.type;
        this.type = toCase(this.rule.type);
    },
    setParser(parser) {
        this.parser = parser;
        parser.init(this);
    },
    initProp() {
        const rule = {...this.rule};
        delete rule.children;
        this.prop = mergeProps([rule, ...Object.keys(this.payload).map(k => this.payload[k]), this.computed]);
    },
    check(handle) {
        return this.vm === handle.vm
    },
    unwatch() {
        this.watch.forEach(un => un());
        this.watch = [];
    },
    unlink() {
        this.linkOn.forEach(un => un());
        this.linkOn = [];
    },
    link() {
        this.unlink();
        this.$handle.appendLink(this);
    },
    watchTo() {
        this.$handle.watchCtx(this);
    },
    delete() {
        const undef = void 0;
        this.unwatch();
        this.unlink();
        this.rmCtrl();
        extend(this, {
            deleted: true,
            prop: {...this.rule},
            computed: {},
            el: undef,
            $handle: undef,
            $render: undef,
            $api: undef,
            vm: undef,
            vNode: undef,
            parent: null,
            cacheConfig: null,
        })
    },
    rmCtrl() {
        this.ctrlRule.forEach(ctrl => ctrl.__fc__ && ctrl.__fc__.rm());
        this.ctrlRule = [];
    },
    rm() {
        const _rm = () => {
            let index = this.root.indexOf(this.origin);
            if (index > -1) {
                this.root.splice(index, 1);
                this.$handle && this.$handle.refresh();
            }
        }
        if (this.deleted) {
            _rm();
            return;
        }
        this.$handle.noWatch(() => {
            this.$handle.deferSyncValue(() => {
                this.rmCtrl();
                _rm();
                this.$handle.rmCtx(this);
                extend(this, {
                    root: []
                });
            }, this.input);
        });
    },
    update(handle, init) {
        extend(this, {
            deleted: false,
            $handle: handle,
            $render: handle.$render,
            $api: handle.api,
            vm: handle.vm,
            trueType: handle.getType(this.originType),
            vNode: handle.$render.vNode,
            updated: false,
        });
        !init && this.unwatch();
        this.watchTo();
        this.link();
    }
})
