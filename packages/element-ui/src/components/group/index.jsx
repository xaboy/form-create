import {copyRules} from '@form-create/core';

const NAME = 'fc-elm-group';

export default {
    name: NAME,
    props: {
        rule: Object,
        rules: Array,
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
        }
    },
    data() {
        return {
            config: {
                submitBtn: false,
                resetBtn: false
            },
            len: 0,
            cacheRule: {},
            group$f: {},
            fieldRule: {}
        }
    },
    computed: {
        formRule() {
            if (this.rule) return [this.rule];
            else if (this.rules) return this.rules;
            return [];
        },
        formData() {
            return Object.keys(this.fieldRule).map(key => {
                const keys = Object.keys(this.fieldRule[key]);
                return this.rule ? keys[0] === undefined ? null : this.fieldRule[key][keys[0]].value : keys.reduce((initial, field) => {
                    initial[field] = this.fieldRule[key][field].value;
                    return initial;
                }, {});
            })
        }
    },
    watch: {
        disabled(n) {
            const lst = this.group$f;
            Object.keys(lst).forEach(k => {
                lst[k].disabled(n);
            })
        },
        formData(n) {
            this.$emit('input', n);
        },
        value(n) {
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
        }
    },
    methods: {
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
                this.$emit('add', rule, Object.keys(this.cacheRule).length - 1);
        },
        add$f(i, key, $f) {
            this.group$f[key] = $f;
            this.setValue($f, this.value[i]);
            this.syncData(key, $f);
            this.subForm();
            this.$emit('itemMounted', $f, Object.keys(this.cacheRule).indexOf(key));
        },
        subForm() {
            this.$emit('fc.subForm', Object.keys(this.group$f).map(k => this.group$f[k]));
        },
        syncData(key, $f) {
            this.$set(this.fieldRule, key, {});
            $f.fields().forEach(field => {
                this.fieldRule[key][field] = $f.getRule(field);
            });
        },
        removeRule(key, emit) {
            const index = Object.keys(this.cacheRule).indexOf(key);
            this.$delete(this.cacheRule, key);
            this.$delete(this.fieldRule, key);
            this.$delete(this.group$f, key);
            if (emit)
                this.$emit('remove', index);
        },
        copyRule() {
            return copyRules(this.formRule);
        },
        addIcon(key) {
            return <i key={`a${key}`} class="el-icon-circle-plus-outline"
                style={`font-size:28px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer'};`}
                on-click={() => (!this.disabled) && this.addRule(true)}/>;
        },
        delIcon(key) {
            return <i key={`d${key}`} class="el-icon-remove-outline"
                style={`font-size:28px;cursor:${this.disabled ? 'not-allowed;color:#c9cdd4' : 'pointer;color:#606266'};`}
                on-click={() => {
                    if (this.disabled) return;
                    this.removeRule(key, true);
                    this.subForm();
                }}/>;
        },
        makeIcon(total, index, key) {
            if (index === 0) {
                return [(this.max !== 0 && total >= this.max) ? null : this.addIcon(key), (this.min === 0 || total > this.min) ? this.delIcon(key) : null];
            } else if (index >= this.min) {
                return this.delIcon(key);
            }
        }
    },
    created() {
        for (let i = 0; i < this.value.length; i++) {
            this.addRule();
        }

    },
    render() {
        const keys = Object.keys(this.cacheRule);
        return keys.length === 0 ?
            <i key={'a_def'} class="el-icon-circle-plus-outline"
                style={`font-size:28px;vertical-align:middle;color:${this.disabled ? '#c9cdd4;cursor: not-allowed' : '#606266;cursor:pointer'};`}
                on-click={() => (!this.disabled) && this.addRule(true)}/> :
            <div key={'con'}>{keys.map((key, index) => {
                const rule = this.cacheRule[key];
                return <ElRow align="middle" type="flex" key={key}
                    style="background-color:#f5f7fa;padding:10px;border-radius:5px;margin-bottom:10px;">
                    <ElCol span={20}><ElFormItem><FormCreate
                        on-mounted={($f) => this.add$f(index, key, $f)}
                        on-on-reload={($f) => this.syncData(key, $f)} rule={rule}
                        option={this.config}/></ElFormItem></ElCol>
                    <ElCol span={2} pull={1} push={1}>{this.makeIcon(keys.length, index, key)}</ElCol></ElRow>
            })}</div>
    }
}
