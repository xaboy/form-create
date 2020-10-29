import {copyRules} from '@form-create/core';
import {deepExtendArgs} from '@form-create/utils';

const NAME = 'fc-elm-group';

export default {
    name: NAME,
    props: {
        rule: Object,
        rules: Array,
        expand: Number,
        button: {
            type: Boolean,
            default: true
        },
        formCreate: Object,
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
        fontSize: {
            type: Number,
            default: 28
        }
    },
    data() {
        return {
            option: deepExtendArgs({}, this.formCreate.config || {}, {
                submitBtn: false,
                resetBtn: false,
                mounted: undefined,
                onReload: undefined
            }),
            len: 0,
            cacheRule: {},
            group$f: {}
        }
    },
    computed: {
        formRule() {
            if (this.rule) return [this.rule];
            else if (this.rules) return this.rules;
            return [];
        }
    },
    watch: {
        disabled(n) {
            const lst = this.group$f;
            Object.keys(lst).forEach(k => {
                lst[k].disabled(n);
            })
        },
        value: {
            handler(n) {
                let keys = Object.keys(this.cacheRule), total = keys.length, len = total - n.length;
                if (len < 0) {
                    for (let i = len; i < 0; i++) {
                        this.addRule();
                    }
                    for (let i = 0; i < total; i++) {
                        this.setValue(this.group$f[keys[i]], n[i]);
                    }
                } else {
                    if (len > 0) {
                        for (let i = 0; i < len; i++) {
                            this.removeRule(keys[total - i - 1]);
                        }
                        this.subForm();
                    }

                    n.forEach((val, i) => {
                        this.setValue(this.group$f[keys[i]], n[i]);
                    });
                }
            },
            deep: true
        }
    },
    methods: {
        formData() {
            const n = Object.keys(this.group$f).map(key => {
                return this.group$f[key].formData();
            })
            this.$emit('input', n);
            this.$emit('change', n);
        },
        setValue($f, value) {
            if (this.rule) {
                const fields = $f.fields();
                if (!fields[0]) return;
                $f.setValue(fields[0], value);
            } else {
                $f.setValue(value);
            }
        },
        addRule(emit) {
            const rule = this.copyRule();
            this.$set(this.cacheRule, ++this.len, rule);
            if (emit)
                this.$nextTick(() => this.$emit('add', rule, Object.keys(this.cacheRule).length - 1));
        },
        add$f(i, key, $f) {
            this.group$f[key] = $f;
            this.setValue($f, this.value[i]);
            this.subForm();
            this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
            this.formData();
        },
        subForm() {
            this.$emit('fc.subForm', Object.keys(this.group$f).map(k => this.group$f[k]));
        },
        removeRule(key, emit) {
            const index = Object.keys(this.cacheRule).indexOf(key);
            this.$delete(this.cacheRule, key);
            this.$delete(this.group$f, key);
            if (emit)
                this.$nextTick(() => this.$emit('remove', index));
        },
        copyRule() {
            return copyRules(this.formRule);
        },
        add() {
            (!this.disabled) && this.addRule(true);
        },
        del(key) {
            if (this.disabled) return;
            this.removeRule(key, true);
            this.subForm();
            this.formData();
        },
        addIcon(key) {
            return <i key={`a${key}`} class="el-icon-circle-plus-outline"
                style={`font-size:${this.fontSize}px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer'};`}
                on-click={this.add}/>;
        },
        delIcon(key) {
            return <i key={`d${key}`} class="el-icon-remove-outline"
                style={`font-size:${this.fontSize}px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer;color:#606266'};`}
                on-click={() => this.del(key)}/>;
        },
        makeIcon(total, index, key) {
            if (this.$scopedSlots.button) return this.$scopedSlots.button({
                total,
                index,
                vm: this,
                key,
                del: () => this.del(key),
                add: this.add
            });
            if (index === 0) {
                return [(this.max !== 0 && total >= this.max) ? null : this.addIcon(key), (this.min === 0 || total > this.min) ? this.delIcon(key) : null];
            } else if (index >= this.min) {
                return this.delIcon(key);
            }
        },
        emitEvent(name, args, index, key) {
            this.$emit(name, ...args, this.group$f[key], index);
        }
    },
    created() {
        const d = (this.expand || 0) - this.value.length;
        if (d > 0) {
            for (let i = 0; i < d; i++) {
                this.value.push({});
            }
        }
        for (let i = 0; i < this.value.length; i++) {
            this.addRule();
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
                const rule = this.cacheRule[key];
                return <ElRow align="middle" type="flex" key={key}
                    style="background-color:#f5f7fa;padding:10px;border-radius:5px;margin-bottom:10px;">
                    <ElCol span={button ? 20 : 24}><ElFormItem><FormCreate
                        on-change={this.formData}
                        on-set-value={this.formData}
                        on-on-reload={this.formData}
                        on-emit-event={(name, ...args) => this.emitEvent(name, args, index, key)}
                        on-mounted={($f) => this.add$f(index, key, $f)} rule={rule}
                        option={this.option}/></ElFormItem></ElCol>
                    {button ? <ElCol span={2} pull={1} push={1}>{this.makeIcon(keys.length, index, key)}</ElCol> : null}
                </ElRow>
            })}</div>
    }
}
