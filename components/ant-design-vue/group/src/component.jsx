import is, {hasProperty} from '@form-create/utils/lib/type';
import {defineComponent, markRaw, nextTick, watch} from 'vue';
import deepExtend, {deepCopy} from '@form-create/utils/lib/deepextend';
import extend from '@form-create/utils/lib/extend';
import './style.css';
import {toPromise} from '@form-create/utils';

const DRAG_EDGE = 4;

function hitGroupIndex(rects, x, y) {
    let found = null;
    let best = Infinity;
    rects.forEach((rect, index) => {
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            return;
        }
        const dx = x - (rect.left + rect.right) / 2;
        const dy = y - (rect.top + rect.bottom) / 2;
        const dist = dx * dx + dy * dy;
        if (dist < best) {
            best = dist;
            found = index;
        }
    });
    return found;
}

const NAME = 'fcGroup';


export default defineComponent({
    name: NAME,
    props: {
        field: String,
        rule: Array,
        expand: Number,
        options: Object,
        button: {
            type: Boolean,
            default: true
        },
        max: {
            type: Number,
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        modelValue: {
            type: Array,
            default: () => []
        },
        defaultValue: Object,
        sortBtn: {
            type: Boolean,
            default: true
        },
        disabled: {
            type: Boolean,
            default: false
        },
        syncDisabled: {
            type: Boolean,
            default: true
        },
        title: {
            type: [String, Function],
            default: null
        },
        type: {
            type: String,
            default: 'default'
        },
        onBeforeRemove: {
            type: Function,
            default: () => {
            }
        },
        onBeforeAdd: {
            type: Function,
            default: () => {
            }
        },
        formCreateInject: Object,
        parse: Function,
    },
    data() {
        return {
            len: 0,
            cacheRule: {},
            cacheValue: {},
            sort: [],
            dragFrom: null,
            dragOverIndex: null,
            form: markRaw(this.formCreateInject.form.$form())
        }
    },
    emits: ['update:modelValue', 'change', 'itemMounted', 'remove', 'add'],
    watch: {
        rule: {
            handler(n, o) {
                Object.keys(this.cacheRule).forEach(v => {
                    const item = this.cacheRule[v];
                    if (item.$f) {
                        const val = item.$f.formData();
                        if (n === o) {
                            item.$f.deferSyncValue(() => {
                                deepExtend(item.rule, n);
                                item.$f.setValue(val);
                            }, true);
                        } else {
                            const val = item.$f.formData();
                            item.$f.once('reloading', () => {
                                item.$f.setValue(val);
                            })
                            item.rule = deepCopy(n);
                        }
                    }
                })
            },
            deep: true
        },
        expand(n) {
            let d = n - this.modelValue.length;
            if (d > 0) {
                this.expandRule(d);
            }
        },
        modelValue: {
            handler(n) {
                n = n || [];
                let keys = this.sort, total = keys.length, len = total - n.length;
                if (len < 0) {
                    for (let i = len; i < 0; i++) {
                        this.addRule(n.length + i, true);
                    }
                    for (let i = 0; i < total; i++) {
                        this.setValue(keys[i], n[i]);
                    }
                } else {
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            this.removeRule(keys[total - i - 1]);
                        }
                    }
                    n.forEach((val, i) => {
                        this.setValue(keys[i], n[i]);
                    });
                }
            },
            deep: true,
        }
    },
    methods: {
        _value(v) {
            return (v && hasProperty(v, this.field)) ? v[this.field] : v;
        },
        cache(k, val) {
            this.cacheValue[k] = JSON.stringify(val);
        },
        input(value) {
            this.$emit('update:modelValue', value);
            this.$emit('change', value);
        },
        formData(key, formData) {
            const cacheRule = this.cacheRule;
            const keys = this.sort;
            if (keys.filter(k => cacheRule[k] && cacheRule[k].$f).length !== keys.length) {
                return;
            }
            const value = keys.map(k => {
                const data = key === k ? formData : {...this.cacheRule[k].$f.form};
                const value = this.field ? (is.Undef(data[this.field]) ?  null : data[this.field]) : data;
                this.cache(k, value);
                return value;
            });
            this.input(value);
        },
        setValue(key, value) {
            const field = this.field
            if (field) {
                value = {[field]: this._value(value)};
            }
            if (this.cacheValue[key] === JSON.stringify(field ? value[field] : value)) {
                return;
            }
            this.cacheRule[key].$f && this.cacheRule[key].$f.coverValue(value);
            this.cache(key, value);
        },
        addRule(i, emit) {
            const rule = this.formCreateInject.form.copyRules(this.rule || []);
            const options = this.options ? {...this.options} : {
                submitBtn: false,
                resetBtn: false,
            };
            if (this.defaultValue) {
                if (!options.formData) options.formData = {};
                const defVal = deepCopy(this.defaultValue);
                extend(options.formData, this.field ? {[this.field]: defVal} : defVal);
            }
            this.parse && this.parse({rule, options, index: this.sort.length});
            this.cacheRule[++this.len] = {rule, options};
            this.sort = Object.keys(this.cacheRule);
            if (emit) {
                nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
            }
        },
        add$f(i, key, $f) {
            this.cacheRule[key].$f = $f;
            nextTick(() => {
                this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
            });
        },
        removeRule(key, emit) {
            const index = Object.keys(this.cacheRule).indexOf(key);
            delete this.cacheRule[key];
            delete this.cacheValue[key];
            this.sort = Object.keys(this.cacheRule);
            if (emit) {
                nextTick(() => this.$emit('remove', index));
            }
        },
        add(i) {
            if (this.disabled || false === this.onBeforeAdd(this.modelValue)) {
                return;
            }
            const value = [...this.modelValue];
            value.push(this.defaultValue ? deepCopy(this.defaultValue) : (this.field ? null : {}));
            this.input(value);
        },
        del(index, key) {
            if (this.disabled) {
                return;
            }
            const del = () => {
                this.removeRule(key, true);
                const value = [...this.modelValue];
                value.splice(index, 1);
                this.input(value);
            }
            toPromise(this.onBeforeRemove(this.modelValue, index)).then(res => {
                if (false !== res) {
                    del();
                }
            })
        },
        addIcon(key) {
            return <div class="_fc-group-btn _fc-group-plus-minus" onClick={this.add}></div>;
        },
        delIcon(index, key) {
            return <div class="_fc-group-btn _fc-group-plus-minus _fc-group-minus"
                onClick={() => this.del(index, key)}></div>
        },
        moveSort(from, to) {
            if (from === to || from < 0 || to < 0 || from >= this.sort.length || to >= this.sort.length) {
                return;
            }
            const next = this.sort.slice();
            const [item] = next.splice(from, 1);
            next.splice(to, 0, item);
            this.sort = next;
            this.formCreateInject.subForm(this.sort.map(k => {
                return this.cacheRule[k].$f;
            }));
            this.formData(0);
        },
        dragStart(e, index) {
            this.dragFrom = index;
            this.dragOverIndex = null;
            if (!e.dataTransfer) {
                return;
            }
            e.dataTransfer.effectAllowed = 'move';
            e.dataTransfer.setData('text/plain', String(index));
            const container = e.currentTarget.closest('._fc-group-container');
            if (container) {
                const rect = container.getBoundingClientRect();
                e.dataTransfer.setDragImage(container, e.clientX - rect.left, e.clientY - rect.top);
            }
        },
        dragEnd() {
            this.dragFrom = null;
            this.dragOverIndex = null;
        },
        itemBounds(el) {
            const rect = el.getBoundingClientRect();
            let top = rect.top;
            let right = rect.right;
            let bottom = rect.bottom;
            let left = rect.left;
            el.querySelectorAll(':scope > ._fc-group-handle, :scope > ._fc-group-idx').forEach(node => {
                const bound = node.getBoundingClientRect();
                top = Math.min(top, bound.top);
                right = Math.max(right, bound.right);
                bottom = Math.max(bottom, bound.bottom);
                left = Math.min(left, bound.left);
            });
            return {
                top: top - DRAG_EDGE,
                right: right + DRAG_EDGE,
                bottom: bottom + DRAG_EDGE,
                left: left - DRAG_EDGE,
            };
        },
        locateDrag(e) {
            const items = e.currentTarget.querySelectorAll(':scope > ._fc-group-container');
            return hitGroupIndex(Array.from(items, item => this.itemBounds(item)), e.clientX, e.clientY);
        },
        groupDragOver(e) {
            if (this.dragFrom == null || this.disabled) {
                return;
            }
            const index = this.locateDrag(e);
            if (this.dragOverIndex !== index) {
                this.dragOverIndex = index;
            }
            e.preventDefault();
            if (e.dataTransfer) {
                e.dataTransfer.dropEffect = index == null || index === this.dragFrom ? 'none' : 'move';
            }
        },
        groupDragLeave(e) {
            if (this.dragFrom == null) {
                return;
            }
            const next = e.relatedTarget;
            if (next && e.currentTarget.contains(next)) {
                return;
            }
            const rect = e.currentTarget.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
                return;
            }
            this.dragOverIndex = null;
        },
        groupDrop(e) {
            if (this.dragFrom == null) {
                return;
            }
            e.preventDefault();
            const from = this.dragFrom;
            const to = this.locateDrag(e);
            this.dragFrom = null;
            this.dragOverIndex = null;
            if (to == null || from === to) {
                return;
            }
            this.moveSort(from, to);
        },
        canDrag(total) {
            return this.sortBtn && !this.disabled && total > 1;
        },
        indexIcon(index, total) {
            const sortable = this.canDrag(total);
            return <div class={{'_fc-group-idx': true, '_fc-group-drag': sortable}} draggable={sortable}
                role={sortable ? 'button' : undefined} aria-label={sortable ? '拖动排序' : undefined}
                title={sortable ? '拖动排序' : undefined}
                onDragstart={sortable ? (e) => this.dragStart(e, index) : undefined}
                onDragend={sortable ? this.dragEnd : undefined}>
                {sortable ? <span class="_fc-group-grip" lang="en">⋮⋮</span> : null}
                <span>{index + 1}</span>
            </div>;
        },
        dragHandle(index, total) {
            if (!this.canDrag(total)) {
                return null;
            }
            return <div class="_fc-group-drag-btn" lang="en" draggable={true} role="button" aria-label="拖动排序" title="拖动排序"
                onDragstart={(e) => this.dragStart(e, index)} onDragend={this.dragEnd}>⋮⋮</div>;
        },
        makeIcon(total, index, key) {
            if (this.$slots.button) {
                return this.$slots.button({
                    total,
                    index,
                    vm: this,
                    key,
                    del: () => this.del(index, key),
                    add: this.add
                });
            }
            const btn = [];
            if ((!this.max || total < this.max) && total === index + 1) {
                btn.push(this.addIcon(key));
            }
            if (total > this.min) {
                btn.push(this.delIcon(index, key));
            }
            return btn;
        },
        expandRule(n) {
            for (let i = 0; i < n; i++) {
                this.modelValue.push(this.field ? null : {});
            }
            this.input([...this.modelValue]);
        },
        getTitle(index, key) {
            if (typeof this.title === 'function') {
                return this.title(index, this.modelValue[index], key);
            }
            if (typeof this.title === 'string') {
                return this.title.replace('{index}', index + 1);
            }
            return false;
        }
    },
    created() {
        const d = (this.expand || 0) - this.modelValue.length;
        for (let i = 0; i < this.modelValue.length; i++) {
            this.addRule(i);
        }
        if (d > 0) {
            this.expandRule(d);
        }
    },
    render() {
        const keys = this.sort;
        const button = this.button;
        const Type = this.form;
        const disabled = this.disabled;
        const isCardType = this.type === 'card';

        const children = keys.length === 0 ?
            (this.$slots.default ? (this.$slots.default({
                vm: this,
                add: this.add
            })) : <div key={'a_def'} class="_fc-group-plus-minus _fc-group-add fc-clock"
                onClick={this.add}/>) : keys.map((key, index) => {
                const {rule, options} = this.cacheRule[key];
                const btn = button && !disabled ? this.makeIcon(keys.length, index, key) : [];
                const title = this.getTitle(index, key);

                if (isCardType) {
                    return <div class={{
                        '_fc-group-container': true,
                        '_fc-group-dragging': this.dragFrom === index,
                        '_fc-group-drag-over': this.dragOverIndex === index && this.dragFrom !== index
                    }} key={key}>
                        <div class="_fc-group-header">
                            {title === false ? this.indexIcon(index, keys.length) : this.dragHandle(index, keys.length)}
                            {title !== false ? <div class="_fc-group-title">{title}</div> : null}
                            <div class="_fc-group-handle fc-clock">
                                {(btn.length) ? btn : null}
                            </div>
                        </div>
                        <div class="_fc-group-content">
                            <Type
                                key={key}
                                {...{
                                    disabled,
                                    'onUpdate:modelValue': (formData) => this.formData(key, formData),
                                    'onUpdate:api': ($f) => this.add$f(index, key, $f),
                                    inFor: true,
                                    modelValue: this.field ? {[this.field]: this._value(this.modelValue[index])} : this.modelValue[index],
                                    rule,
                                    option: options,
                                    extendOption: true
                                }}
                            />
                        </div>
                    </div>
                } else {
                    return <div class={{
                        '_fc-group-container': true,
                        '_fc-group-dragging': this.dragFrom === index,
                        '_fc-group-drag-over': this.dragOverIndex === index && this.dragFrom !== index
                    }} key={key}>
                        <Type
                            key={key}
                            {...{
                                disabled,
                                'onUpdate:modelValue': (formData) => this.formData(key, formData),
                                'onUpdate:api': ($f) => this.add$f(index, key, $f),
                                inFor: true,
                                modelValue: this.field ? {[this.field]: this._value(this.modelValue[index])} : this.modelValue[index],
                                rule,
                                option: options,
                                extendOption: true
                            }}
                        />
                        {this.indexIcon(index, keys.length)}
                        {(btn.length) ? <div class="_fc-group-handle fc-clock">{btn}</div> : null}
                    </div>
                }
            });
        return <div key={'con'} class={'_fc-group ' + (disabled ? '_fc-group-disabled' : '') + (isCardType ? ' _fc-group-card' : '')}
            onDragenter={this.groupDragOver} onDragover={this.groupDragOver} onDragleave={this.groupDragLeave} onDrop={this.groupDrop}>{children}</div>
    }
});
