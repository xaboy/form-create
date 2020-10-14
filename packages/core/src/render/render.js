import extend from '@form-create/utils/lib/extend';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is from '@form-create/utils/lib/type';
import {_vue as Vue} from '../core';
import deepExtend from '@form-create/utils/lib/deepextend';
import debounce from '@form-create/utils/lib/debounce';
import {tip} from '@form-create/utils/lib/console';

const $de = debounce((fn) => fn(), 1);

function setTemplateProps(vm, parser, fApi) {
    if (!vm.$props)
        return;
    //todo 检查 props 设置
    const {prop: rule} = parser;
    const keys = Object.keys(vm.$props);
    keys.forEach(key => {
        if (rule.props[key] !== undefined)
            vm.$props[key] = rule.props[key];
    });

    if (keys.indexOf('value') !== -1) {
        vm.$props.value = rule.value;
    }
    vm.$props.formCreate = fApi;
}


export default function useRender(Render) {
    extend(Render.prototype, {
        mergeGlobal(parser) {
            const g = this.options.global;
            if (!g) return;
            mergeProps([global['*'], global[parser.type] || global[parser.originType] || {}], parser.prop);
        },
        renderTemplate(parser) {
            if (!Vue.compile) {
                tip('当前使用的Vue版本不支持compile,无法使用template功能');
                return [];
            }
            const rule = this.inputVData(parser);
            const {id, key} = parser;

            if (!this.renderList[id]) {
                let vm = rule.vm;
                if (!vm)
                    vm = new Vue;
                else if (is.Function(rule.vm))
                    vm = rule.vm(this.$handle.getInjectData(rule));

                this.renderList[id] = {
                    vm,
                    template: Vue.compile(rule.template)
                };

                vm.$on('input', (value) => {
                    this.onInput(parser, value);
                });
            }

            const {vm, template} = this.renderList[id];

            setTemplateProps(vm, parser, this.$handle.api);

            const vn = template.render.call(vm);

            if (is.Undef(vn.data)) vn.data = {};
            vn.key = key;
            return vn;
        },
        renderParser(parser, parent) {
            if (parser.type === 'hidden') return;
            if (!this.cache[parser.id] || parser.type === 'template') {
                const form = this.$manager;
                parser.initProp();
                form.tidyRule(parser);
                this.mergeGlobal(parser);
                let {type, prop: rule} = parser, vn;

                if (type === 'template' && rule.template) {
                    vn = this.renderTemplate(parser);

                    if (parent && is.Undef(rule.native)) {
                        this.setCache(parser, vn, parent);
                        return vn;
                    }
                } else if (parser.input) {
                    const children = this.renderChildren(parser);
                    vn = parser.render ? parser.render(children) : this.defaultRender(parser, children);
                } else {
                    vn = this.defaultRender(parser, this.renderChildren(parser));
                    if (parent && is.Undef(rule.native)) {
                        this.setCache(parser, vn, parent);
                        return vn;
                    }
                }
                if (rule.native !== true)
                    vn = form.makeFormItem(parser, vn);
                this.setCache(parser, vn, parent);
                return vn;
            }

            return this.getCache(parser);
        },
        inputVData(parser, custom) {
            const {refName, key} = parser;
            //todo 优化下面一大块
            const props = [
                {
                    props: {
                        formCreate: this.$handle.api,
                        formCreateParser: parser,
                        formCreateField: parser.isDef ? parser.field : undefined,
                        formCreateOptions: parser.rule.options
                    },
                    on: {
                        'fc.subForm': (subForm) => this.$handle.addSubForm(parser, subForm)
                    },
                    ref: refName,
                    key: `${key}fc`
                },
                {
                    props: {
                        formCreateRule: deepExtend({}, parser.prop),
                    }
                }
            ]

            if (!custom) {
                const model = this.$handle.modelEvent(parser);
                props.push({
                    on: {
                        [model.event || model]: (value) => {
                            this.onInput(parser, value);
                        },
                        ['hook:mounted']: () => {
                            parser.el = this.vm.$refs[refName] || {};
                            parser.mounted();
                            console.log('mounted', parser.field);
                        }
                    },
                    props: {
                        [model.prop || 'value']: this.$handle.getFormData(parser)
                    }
                })

            }
            mergeProps(props, parser.prop);
            this.$manager.mergeRule && this.$manager.mergeRule(parser, custom);
            parser.inputVdata && parser.inputVdata(custom);
            parser.prop.get = function () {
                return parser.prop;
            }
            return parser.prop;
        },
        onInput(parser, value) {
            this.$handle.onInput(parser, value);
        },
        renderChildren(parser) {
            const {children} = parser.rule, orgChildren = this.orgChildren[parser.id];

            if (!is.trueArray(children)) {
                orgChildren.forEach(child => {
                    if (!is.String(child) && child.__fc__) {
                        this.$handle.deleteParser(child.__fc__);
                    }
                });
                this.orgChildren[parser.id] = [];
                return [];
            }
            //TODO 规则变化后组件重新渲染
            this.orgChildren[parser.id].forEach(child => {
                if (children.indexOf(child) === -1 && !is.String(child) && child.__fc__) {
                    this.$handle.deleteParser(child.__fc__);
                }
            });

            return children.map(child => {
                if (is.String(child)) return child;
                if (child.__fc__) {
                    return this.renderParser(child.__fc__, parser);
                }
                if (!this.$handle.isset(child.__origin__ || child) && child.type)
                    $de(() => this.$handle.reloadRule());
            });

        },
        defaultRender(parser, children) {
            const vdata = this.inputVData(parser);
            if (this.vNode[parser.type])
                return this.vNode[parser.type](vdata, children);
            if (this.vNode[parser.originType])
                return this.vNode[parser.originType](vdata, children);
            return this.vNode.make(parser.originType, vdata, children);
        },
        renderRule(rule, children = []) {
            return this.vm.$createElement(rule.type, rule, children);
        }
    })
}
