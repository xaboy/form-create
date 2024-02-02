import {hasProperty} from '@form-create/utils/lib/type';
import deepExtend, {deepCopy} from '@form-create/utils/lib/deepextend';
import extend from '@form-create/utils/lib/extend';
import './style.css';

const NAME = 'fcGroup';

export default {
    name: NAME,
    props: {
        field: String,
        rule: [Array, Object],
        rules: Array,
        expand: Number,
        options: Object,
        formCreateInject: {
            type: Object,
            required: true,
        },
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
        value: {
            type: Array,
            default: () => []
        },
        sortBtn: {
            type: Boolean,
            default: true
        },
        defaultValue: Object,
        disabled: {
            type: Boolean,
            default: false
        },
        syncDisabled: {
            type: Boolean,
            default: true
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
        parse: Function,
    },
    data() {
        return {
            len: 0,
            cacheRule: {},
            cacheValue: {},
            sort: [],
            type: undefined
        }
    },
    computed: {
        formRule() {
            if (this.rules) {
                return this.rules;
            }
            if (this.rule) {
                return Array.isArray(this.rule) ? this.rule : [this.rule];
            }
            return [];
        }
    },
    watch: {
        cacheRule: {
            handler(n) {
                this.sort = Object.keys(n);
            },
            immediate: true
        },
        formRule: {
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
        disabled(n) {
            if (this.syncDisabled) {
                const lst = this.cacheRule;
                Object.keys(lst).forEach(k => {
                    lst[k].$f.disabled(n);
                })
            }
        },
        expand(n) {
            let d = n - this.value.length;
            if (d > 0) {
                this.expandRule(d);
            }
        },
        value(n, o) {
            n = n || [];
            let keys = this.sort, total = keys.length, len = total - n.length;
            if (len < 0) {
                for (let i = len; i < 0; i++) {
                    this.addRule(n.length + i);
                }
                this.sort = Object.keys(this.cacheRule);
                for (let i = 0; i < total; i++) {
                    this.setValue(keys[i], n[i]);
                }
            } else {
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        this.removeRule(keys[total - i - 1]);
                    }
                    this.sort = Object.keys(this.cacheRule);
                }
                n.forEach((val, i) => {
                    this.setValue(keys[i], n[i]);
                });
            }
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
            this.$emit('input', value);
            this.$emit('change', value);
        },
        formData(key, formData) {
            const cacheRule = this.cacheRule;
            const keys = this.sort;
            if (keys.filter(k => cacheRule[k].$f).length !== keys.length) {
                return;
            }
            const value = keys.map(k => {
                const data = key === k ? formData : {...this.cacheRule[k].$f.form};
                const value = this.field ? data[this.field] || null : data;
                this.cache(k, value);
                return value;
            });
            this.input(value);
        },
        setValue(key, value) {
            const field = this.field, $f = this.cacheRule[key].$f;
            if (field) {
                value = {[field]: this._value(value)};
            }
            if (this.cacheValue[key] === JSON.stringify(field ? value[field] : value)) {
                return;
            }
            this.cache(key, value);
            $f && $f.coverValue(value || {});
        },
        addRule(i, emit) {
            const rule = this.formCreateInject.form.copyRules(this.formRule);
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
            this.$set(this.cacheRule, ++this.len, {rule, options});
            if (emit) {
                this.$nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
            }
        },
        add$f(i, key, $f) {
            this.cacheRule[key].$f = $f;
            this.$nextTick(() => {
                if (this.syncDisabled) {
                    $f.disabled(this.disabled);
                }
                this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
            });
        },
        removeRule(key, emit) {
            const index = Object.keys(this.cacheRule).indexOf(key);
            this.$delete(this.cacheRule, key);
            this.$delete(this.cacheValue, key);
            if (emit) {
                this.$nextTick(() => this.$emit('remove', index));
            }
        },
        add(i) {
            if (this.disabled || false === this.onBeforeAdd(this.value)) {
                return;
            }
            this.addRule(i, true);
        },
        del(index, key) {
            if (this.disabled || false === this.onBeforeRemove(this.value, index)) {
                return;
            }
            this.removeRule(key, true);
            const value = [...this.value];
            value.splice(index, 1);
            this.input(value);
        },
        addIcon(key) {
            return <div class="_fc-group-btn _fc-group-plus-minus" on-click={this.add}></div>;
        },
        delIcon(index, key) {
            return <div class="_fc-group-btn _fc-group-plus-minus _fc-group-minus"
                onClick={() => this.del(index, key)}></div>
        },
        sortUpIcon(index) {
            return <div class="_fc-group-btn _fc-group-arrow _fc-group-up"
                onClick={() => this.changeSort(index, -1)}></div>
        },
        sortDownIcon(index) {
            return <div class="_fc-group-btn _fc-group-arrow _fc-group-down"
                onClick={() => this.changeSort(index, 1)}></div>
        },
        changeSort(index, sort) {
            const a = this.sort[index];
            this.$set(this.sort, index, this.sort[index + sort]);
            this.sort[index + sort] = a;
            this.formData(0);
        },
        makeIcon(total, index, key) {
            if (this.$scopedSlots.button) {
                return this.$scopedSlots.button({
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
            if (this.sortBtn && index) {
                btn.push(this.sortUpIcon(index));
            }
            if (this.sortBtn && index !== total - 1) {
                btn.push(this.sortDownIcon(index));
            }
            return btn;
        },
        emitEvent(name, args, index, key) {
            this.$emit(name, ...args, this.cacheRule[key].$f, index);
        },
        expandRule(n) {
            for (let i = 0; i < n; i++) {
                this.value.push(this.field ? null : {});
            }
        }
    },
    created() {
        this.type = this.formCreateInject.form.$form();
        const d = (this.expand || 0) - this.value.length;
        if (d > 0) {
            this.expandRule(d);
        }
        for (let i = 0; i < this.value.length; i++) {
            this.addRule(i);
        }
    },
    render() {
        const keys = this.sort;
        const button = this.button;
        const Type = this.type;
        const disabled = this.disabled;

        const children = keys.length === 0 ?
            (this.$scopedSlots.default ? (this.$scopedSlots.default({
                vm: this,
                add: this.add
            })) : <div key={'a_def'} class="_fc-group-plus-minus _fc-group-add"
                on-click={this.add}/>) : keys.map((key, index) => {
                const {rule, options} = this.cacheRule[key];
                const btn = button && !disabled ? this.makeIcon(keys.length, index, key) : [];
                return <div class="_fc-group-container" key={key}>
                    <Type
                        key={key}
                        on={{
                            'update:value': (formData) => this.formData(key, formData),
                            'emit-event': (name, ...args) => this.emitEvent(name, args, index, key),
                            input: ($f) => this.add$f(index, key, $f)
                        }}
                        props={{
                            inFor: true,
                            value: this.field ? {[this.field]: this._value(this.value[index])} : this.value[index],
                            rule,
                            option: options,
                            extendOption: true
                        }}
                    />
                    <div class="_fc-group-idx">{index + 1}</div>
                    {(btn.length) ? <div class="_fc-group-handle">{btn}</div> : null}
                </div>
            });
        return <div key={'con'} class={'_fc-group ' + (disabled ? '_fc-group-disabled' : '')}>{children}</div>
    },
}
