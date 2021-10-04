import {hasProperty} from '@form-create/utils/lib/type';

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
        disabled: {
            type: Boolean,
            default: false
        },
        syncDisabled: {
            type: Boolean,
            default: true
        },
        fontSize: {
            type: Number,
            default: 28
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
    },
    data() {
        return {
            len: 0,
            cacheRule: {},
            cacheValue: {},
        }
    },
    computed: {
        formRule() {
            if (this.rule) {
                return Array.isArray(this.rule) ? this.rule : [this.rule];
            }
            if (this.rules) {
                return this.rules;
            }
            return [];
        }
    },
    watch: {
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
        value(n) {
            n = n || [];
            let keys = Object.keys(this.cacheRule), total = keys.length, len = total - n.length;
            if (len < 0) {
                for (let i = len; i < 0; i++) {
                    this.addRule(n.length + i);
                }
                for (let i = 0; i < total; i++) {
                    this.setValue(keys[i], n[i]);
                }
            } else {
                if (len > 0) {
                    for (let i = 0; i < len; i++) {
                        this.removeRule(keys[total - i - 1]);
                    }
                    this.subForm();
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
            const keys = Object.keys(cacheRule);
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
            $f.coverValue(value || {});
        },
        addRule(i, emit) {
            const rule = this.formCreateInject.form.copyRules(this.formRule);
            const options = this.options ? {...this.options} : {
                submitBtn: false,
                resetBtn: false,
            };
            options.formData = this.field ? ({[this.field]: this._value(this.value[i])}) : (this.value[i] || {});
            this.$set(this.cacheRule, ++this.len, {rule, options});
            if (emit) {
                this.$nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
            }
        },
        add$f(i, key, $f) {
            this.cacheRule[key].$f = $f;
            this.subForm();
            this.$nextTick(() => {
                if (this.syncDisabled) {
                    $f.disabled(this.disabled);
                }
                this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
            });
        },
        subForm() {
            this.formCreateInject.subForm(Object.keys(this.cacheRule).map(k => this.cacheRule[k].$f));
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
            if (this.disabled || false === this.onBeforeRemove(this.value)) {
                return;
            }
            this.removeRule(key, true);
            this.subForm();
            this.value.splice(index, 1);
            this.input(this.value);
        },
        addIcon(key) {
            return <i key={`a${key}`} class="el-icon-circle-plus-outline"
                style={`font-size:${this.fontSize}px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer'};`}
                on-click={this.add}/>;
        },
        delIcon(index, key) {
            return <i key={`d${key}`} class="el-icon-remove-outline"
                style={`font-size:${this.fontSize}px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer;color:#606266'};`}
                on-click={() => this.del(index, key)}/>;
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
            if (index === 0) {
                return [(this.max !== 0 && total >= this.max) ? null : this.addIcon(key), (this.min === 0 || total > this.min) ? this.delIcon(index, key) : null];
            }
            if (index >= this.min) {
                return this.delIcon(index, key);
            }
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
        const d = (this.expand || 0) - this.value.length;
        if (d > 0) {
            this.expandRule(d);
        }
        for (let i = 0; i < this.value.length; i++) {
            this.addRule(i);
        }
    },
    render() {
        const keys = Object.keys(this.cacheRule);
        const button = this.button;
        return keys.length === 0 ?
            (this.$scopedSlots.default ? (this.$scopedSlots.default({
                vm: this,
                add: this.add
            })) : <i key={'a_def'} class="el-icon-circle-plus-outline"
                style={`font-size:${this.fontSize}px;vertical-align:middle;color:${this.disabled ? '#c9cdd4;cursor: not-allowed' : '#606266;cursor:pointer'};`}
                on-click={this.add}/>) :
            <div key={'con'}>{keys.map((key, index) => {
                const {rule, options} = this.cacheRule[key];
                return <ElRow align="middle" type="flex" key={key}
                    style="border-bottom:1px dashed #DCDFE6;margin-bottom:10px;">
                    <ElCol span={button ? 20 : 24}><ElFormItem><FormCreate
                        key={key}
                        on={{
                            'update:value': (formData) => this.formData(key, formData),
                            'emit-event': (name, ...args) => this.emitEvent(name, args, index, key),
                            input: ($f) => this.add$f(index, key, $f)
                        }}
                        rule={rule}
                        option={options} extendOption={true}/></ElFormItem></ElCol>
                    {button ? <ElCol span={2} pull={1} push={1}>{this.makeIcon(keys.length, index, key)}</ElCol> : null}
                </ElRow>
            })}</div>
    },
    beforeMount() {
        this.$options.components.FormCreate = this.formCreateInject.form.$form();
    }
}
