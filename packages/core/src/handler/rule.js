import extend from '@form-create/utils/lib/extend';
import is from '@form-create/utils/lib/type';
import {getRule, mergeRule} from '../core/util';
import {err} from '@form-create/utils/lib/console';


export default function useParse(Handler){
    extend(Handler.prototype, {
        initRule(){
            this.repeatRule = [];
        },

        isRepeatRule(rule) {
            return this.repeatRule.indexOf(rule) > -1;
        },
        loadRule() {
            this.reloadFlag = false;
            this._loadRule(this.rules);
            if (this.reloadFlag) this.loadRule();
            this.vm._renderRule();
            this.$render.initOrgChildren();
        },
        loadChildren(children, parent) {
            this.reloadFlag = false;
            this._loadRule(children, parent);
            if (this.reloadFlag) this.loadRule();
        },
        _loadRule(rules, parent) {
            rules.map((_rule, index) => {
                if (parent && is.String(_rule)) return;

                if (!is.Object(_rule) || !getRule(_rule).type)
                    return err('未定义生成规则的 type 字段', _rule);

                if (_rule.__fc__ && _rule.__fc__.root === rules && this.parsers[_rule.__fc__.id]) {
                    let rule = _rule.__fc__.rule.children;
                    if (is.trueArray(rule)) {
                        this._loadRule(rule, _rule.__fc__);
                    }
                    return _rule.__fc__;
                }

                let rule = getRule(_rule);

                if (rule.field && this.fieldList[rule.field]) {
                    this.repeatRule.push(_rule);
                    return err(`${rule.field} 字段已存在`, _rule);
                }

                //todo 提高 parser 复用
                let parser;
                //TODO 优化: 如果存在__fc__ 直接返回
                if (_rule.__fc__) {
                    parser = _rule.__fc__;
                    if (parser.deleted) {
                        if (!parser._check(this)) {
                            parser.update(this);
                        }
                    } else {
                        if (!parser._check(this) || this.parsers[parser.id]) {
                            //todo 检查复制规则
                            rules[index] = _rule = _rule._clone ? _rule._clone() : mergeRule({}, _rule);
                            parser = this.createParser(this.parseRule(_rule));
                        }
                    }
                    if (parser.originType !== parser.rule.type) {
                        parser = this.createParser(parser.rule);
                    }
                } else {
                    parser = this.createParser(this.parseRule(_rule));
                }
                this.appendValue(parser.rule);
                [false, true].forEach(b => this.parseEmit(parser, b));
                parser.parent = parent || null;
                parser.root = rules;
                this.setParser(parser);

                let children = parser.rule.children;

                if (is.trueArray(children)) {
                    this._loadRule(children, parser);
                }

                if (!parent) {
                    this.sortList.push(parser.id);
                }
                //todo 优化 children 渲染,避免监听 vue 的 value
                if (parser.input)
                    Object.defineProperty(parser.rule, 'value', this.valueHandle(parser));

                if (this.refreshControl(parser)) this.reloadFlag = true;
                return parser;
            });
        }
    })
}
