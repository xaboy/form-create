import extend from '@form-create/utils/lib/extend';
import toCase from '@form-create/utils/lib/tocase';
import BaseParser from '../factory/parser';
import {$del, $set} from '@form-create/utils/lib';
import is from '@form-create/utils/lib/type';


export default function useParser(Handler) {
    extend(Handler.prototype, {
        getParser(id) {
            return this.fieldList[id] || this.customData[id] || this.parsers[id];
        },
        setParser(parser) {
            let {id, field, name, rule} = parser;
            this.parsers[id] = parser;
            if (name) $set(this.customData, name, parser);
            if (!parser.input) return;
            this.fieldList[field] = parser;
            $set(this.formData, field, parser.toFormValue(rule.value));
            $set(this.validate, field, rule.validate || []);
        },
        createParser(rule) {
            return new (this.fc.parsers[rule.type] || this.fc.parsers[toCase(rule.type)] || this.fc.parsers[toCase('' + this.fc.CreateNode.aliasMap[toCase(rule.type)])] || BaseParser)(this, rule);
        },
        transformParser(rule, parser) {
            const transform = this.createParser(rule);
            transform.id = parser.id;
            parser._delete();
            return transform;
        },
        addParserWitch(parser) {
            const vm = this.vm;
            const none = ['field', 'value', 'vm', 'template', 'name', 'config', 'control', 'inject'];
            Object.keys(parser.rule).filter(k => none.indexOf(k) === -1).forEach((key) => {
                parser.watch.push(vm.$watch(() => parser.rule[key], n => {
                    this.watching = true;
                    if (key === 'hidden')
                        parser.updateKey(true);
                    else if (key === 'link')
                        parser._link();
                    else if (key === 'validate') {
                        if (parser.input) {
                            this.validate[parser.field] = n || []
                        } else return;
                    } else if (['props', 'on', 'nativeOn'].indexOf(key) > -1)
                        this.parseInjectEvent(parser.rule, n || {});
                    else if (['emit', 'nativeEmit'].indexOf(key) > -1)
                        this.parseEmit(parser, key === 'emit');
                    else if (key === 'type')
                        return this.reloadRule();
                    this.$render.clearCache(parser);
                    this.watching = false;
                }, {deep: key !== 'children'}));
            });
            this.watchEffect(parser);
        },
        rmParser(parser, reloadFlag) {
            this._rmParser(parser);
            if (!reloadFlag) {
                this.$render.initOrgChildren();
                this.syncValue();
            }
        },
        _rmParser(parser) {
            if (parser.deleted) return;
            const {id, field, name} = parser;
            // console.warn(parser);
            if (parser.input) {
                Object.defineProperty(parser.rule, 'value', {
                    value: parser.rule.value,
                    writable: true
                });
            }

            if (is.trueArray(parser.rule.children)) {
                parser.rule.children.forEach(h => h.__fc__ && this._rmParser(h.__fc__));
            }

            $del(this.parsers, id);
            $del(this.validate, field);
            $del(this.formData, field);
            $del(this.form, field);
            $del(this.fieldList, field);
            $del(this.$render.renderList, id);
            $del(this.customData, name);
            $del(this.subForm, field);
            $del(parser, 'cacheValue');

            const index = this.sortList.indexOf(id);
            if (index > -1) {
                this.sortList.splice(index, 1);
            }

            parser._delete(true);
            this.parserProp(parser, 'deleted');
            return parser;
        },
    })
}
