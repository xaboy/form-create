import extend from '@form-create/utils/lib/extend';
import debounce from '@form-create/utils/lib/debounce';
import {byParser, copyRule, enumerable, getRule, invoke} from '../frame/util';
import is, {hasProperty} from '@form-create/utils/lib/type';
import {err} from '@form-create/utils/lib/console';
import {baseRule} from '../factory/creator';
import {$set} from '@form-create/utils/lib';

export default function useLoader(Handler) {
    extend(Handler.prototype, {
        nextLoad() {
            const id = this.loadedId;
            this.vm.$nextTick(() => {
                id === this.loadedId && this.refresh();
            });
        },
        parseRule(_rule) {
            const rule = getRule(_rule);

            Object.defineProperties(rule, {
                __origin__: enumerable(_rule, true)
            });

            fullRule(rule);

            if (rule.field && hasProperty(this.options.formData || {}, rule.field))
                rule.value = this.options.formData[rule.field];

            rule.options = parseArray(rule.options);

            ['on', 'props', 'nativeOn'].forEach(k => {
                this.parseInjectEvent(rule, rule[k] || {});
            })

            return rule;
        },
        isRepeatRule(rule) {
            return this.repeatRule.indexOf(rule) > -1;
        },
        loadRule() {
            console.warn('%c load', 'color:blue');
            this.cycleLoad = false;
            if (this.pageEnd) {
                this.bus.$emit('use-ctrl');
            }
            this._loadRule(this.rules);
            if (this.cycleLoad && this.pageEnd) {
                return this.loadRule();
            }
            this.vm._renderRule();
            this.$render.initOrgChildren();
            this.syncForm();
        },
        loadChildren(children, parent) {
            this.cycleLoad = false;
            this.bus.$emit('use-ctrl');
            this._loadRule(children, parent);
            if (this.cycleLoad) {
                return this.loadRule();
            }
            this.$render.clearCache(parent, true);
        },
        _loadRule(rules, parent) {

            const preIndex = (i) => {
                let pre = rules[i - 1];
                if (!pre || !pre.__fc__) {
                    return i > 0 ? preIndex(i - 1) : -1;
                }
                let index = this.sortList.indexOf(pre.__fc__.id);
                return index > -1 ? index : preIndex(i - 1);
            }

            const loadChildren = (children, parser) => {
                if (is.trueArray(children)) {
                    this._loadRule(children, parser);
                }
            };

            rules.map((_rule, index) => {
                if (parent && is.String(_rule)) return;
                if (!this.pageEnd && !parent && index >= this.first) return;

                if (!is.Object(_rule) || !getRule(_rule).type)
                    return err('未定义生成规则的 type 字段', _rule);

                if (_rule.__fc__ && _rule.__fc__.root === rules && this.parsers[_rule.__fc__.id]) {
                    loadChildren(_rule.__fc__.rule.children, _rule.__fc__);
                    return _rule.__fc__;
                }

                let rule = getRule(_rule);

                if (rule.field && this.fieldList[rule.field]) {
                    this.repeatRule.push(_rule);
                    return err(`${rule.field} 字段已存在`, _rule);
                }

                let parser;
                if (_rule.__fc__) {
                    parser = _rule.__fc__;
                    if (parser.deleted) {
                        if (!parser._check(this)) {
                            if (parser.rule.__ctrl) {
                                return;
                            }
                            parser.update(this);
                        }
                    } else {
                        if (!parser._check(this) || this.parsers[parser.id]) {
                            if (parser.rule.__ctrl) {
                                return;
                            }
                            rules[index] = _rule = _rule._clone ? _rule._clone() : copyRule(_rule);
                            parser = this.createParser(this.parseRule(_rule));
                        }
                    }
                    if (parser.originType !== parser.rule.type) {
                        parser = this.transformParser(parser.rule, parser);
                    }
                } else {
                    parser = this.createParser(this.parseRule(_rule));
                }
                this.appendValue(parser.rule);
                [false, true].forEach(b => this.parseEmit(parser, b));
                parser.parent = parent || null;
                parser.root = rules;
                this.setParser(parser);

                loadChildren(parser.rule.children, parser);

                if (!parent) {
                    const _preIndex = preIndex(index);
                    if (_preIndex > -1) {
                        this.sortList.splice(_preIndex + 1, 0, parser.id);
                    } else {
                        this.sortList.push(parser.id);
                    }
                }

                if (parser.input)
                    Object.defineProperty(parser.rule, 'value', this.valueHandle(parser));

                if (this.refreshControl(parser)) this.cycleLoad = true;
                return parser;
            });
        },
        refreshControl(parser) {
            return parser.input && parser.rule.control && this.useCtrl(parser);
        },
        useCtrl(parser) {
            const controls = getControl(parser), validate = [], api = this.api;
            if (!controls.length) return false;

            for (let i = 0; i < controls.length; i++) {
                const control = controls[i], handleFn = control.handle || (val => val === control.value);
                const data = {
                    ...control,
                    valid: invoke(() => handleFn(parser.rule.value, api)),
                    ctrl: findControl(parser, control.rule),
                };
                if ((data.valid && data.ctrl) || (!data.valid && !data.ctrl)) continue;
                validate.push(data);
            }
            if (!validate.length) return false;

            let flag = false;
            validate.reverse().forEach(({valid, rule, prepend, append, child, ctrl}) => {
                if (valid) {
                    flag = true;
                    const ruleCon = {
                        type: 'fcFragment',
                        native: true,
                        __ctrl: true,
                        children: rule,
                    }
                    parser.ctrlRule.push(ruleCon);
                    this.bus.$once('use-ctrl', () => {
                        // this.cycleLoad = true;
                        if (prepend) {
                            api.prepend(ruleCon, prepend, child)
                        } else if (append) {
                            api.append(ruleCon, append, child)
                        } else {
                            parser.root.splice(parser.root.indexOf(parser.origin) + 1, 0, ruleCon);
                        }
                    });
                } else {
                    parser.ctrlRule.splice(parser.ctrlRule.indexOf(ctrl), 1);
                    const ctrlParser = byParser(ctrl);
                    if (ctrlParser) {
                        ctrlParser._remove();
                    }
                }
            });
            this.vm.$emit('control', parser.origin, this.api);
            return flag;
        },
        reloadRule: debounce(function (rules) {
            return this._reloadRule(rules);
        }, 1),
        _reloadRule(rules) {
            console.warn('%c reload', 'color:red');
            if (!rules) rules = this.rules;

            const parsers = {...this.parsers};

            this.clearNextTick();
            this.$render.clearOrgChildren();
            this.initData(rules);
            this.loadRule();

            Object.keys(parsers).filter(id => this.parsers[id] === undefined)
                .forEach(id => this.rmParser(parsers[id], true));

            this.$render.clearCacheAll();
            this.refresh();

            this.bus.$off('next-tick', this.nextReload);
            this.bus.$once('next-tick', this.nextReload);
        },
        //todo 组件生成全部通过 alias
        refresh() {
            this.vm._refresh();
        },
    });
}


function parseArray(validate) {
    return Array.isArray(validate) ? validate : [];
}

function fullRule(rule) {
    const def = baseRule();

    Object.keys(def).forEach(k => {
        if (!hasProperty(rule, k)) $set(rule, k, def[k]);
    });
    return rule;
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
