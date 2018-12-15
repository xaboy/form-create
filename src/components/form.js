import {deepExtend, extend, toString, uniqueId} from "../core/util";
import VNode from "../factory/vNode";
import VData from "../factory/vData";

export function getRenders(handlers, renderSort) {
    return renderSort.reduce((initial, field) => {
        initial[field] = handlers[field].render;
        return initial;
    }, {})
}

export function preventDefault(e) {
    e.preventDefault();
}

export default class Form {

    constructor({vm, options, fieldList, handlers, formData, validate, fCreateApi}) {
        this.vm = vm;
        this.options = options;
        this.handlers = handlers;
        this.renderSort = fieldList;
        this.renders = getRenders(handlers, fieldList);
        this.form = {
            model: formData,
            rules: validate,
            key: 'form' + uniqueId()
        };
        this.fCreateApi = fCreateApi;
        this.vNode = new VNode(vm);
        this.vData = new VData();
        this.unique = uniqueId();
        this.refName = `cForm${this.unique}`;
        this.cacheUnique = 0;
    }

    parse(vm) {
        this.vNode.setVm(vm);
        if (!vm.isShow)
            return;
        if (this.cacheUnique !== vm.unique) {
            this.renderSort.map((field) => {
                this.renders[field].clearCache();
            });
            this.cacheUnique = vm.unique;
        }
        let unique = this.unique,
            propsData = this.vData.props(this.options.form).props(this.form)
                .ref(this.refName).nativeOn({submit: preventDefault}).class('form-create', true).key(unique).get(),
            vn = this.renderSort.map((field) => {
                let render = this.renders[field], {key, type} = render.handler;
                if (type === 'hidden') return;
                return this.makeFormItem(render.handler, render.cacheParse(), `fItem${key}${unique}`);

            });
        if (vn.length > 0)
            vn.push(this.makeFormBtn(unique));
        return this.vNode.form(propsData, [this.vNode.row({props: this.options.row || {}}, vn)]);
    }

    makeFormItem({rule, unique, field, refName}, VNodeFn, fItemUnique) {
        let propsData = this.vData.props({
            prop: field,
            label: rule.title,
            labelFor: unique,
            rules: rule.validate,
            labelWidth: rule.col.labelWidth,
            required: rule.props.required
        }).key(fItemUnique).ref('fItem' + refName).get();
        return this.vNode.col({
            props: rule.col, 'class': {
                '__fc_h': rule.props.hidden === true,
                '__fc_v': rule.props.visibility === true
            }, key: `${fItemUnique}col`
        }, [this.vNode.formItem(propsData, VNodeFn)]);
    }

    makeFormBtn(unique) {
        let btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if (submitBtnShow)
            btn.push(this.makeSubmitBtn(unique, resetBtnShow ? 19 : 24));
        if (resetBtnShow)
            btn.push(this.makeResetBtn(unique, 4));

        return this.vNode.col({props: {span: 24}}, btn);
    }

    makeResetBtn(unique, span) {
        return this.vNode.col({props: {span: span, push: 1}}, [
            this.vNode.button({
                key: `frsbtn${unique}`, props: this.vm.resetProps, on: {
                    "click": () => {
                        this.fCreateApi.resetFields();
                    }
                }
            }, [this.vNode.span(this.vm.resetProps.innerText)])
        ]);
    }

    makeSubmitBtn(unique, span) {
        return this.vNode.col({props: {span: span}}, [
            this.vNode.button({
                key: `fbtn${unique}`, props: this.vm.buttonProps, on: {
                    "click": () => {
                        this.fCreateApi.submit();
                    }
                }
            }, [this.vNode.span(this.vm.buttonProps.innerText)])
        ]);
    }

    removeRender(field) {
        delete this.renders[field];
        this.renderSort.splice(this.renderSort.indexOf(field), 1);
    }

    setRender(handler, after, pre) {
        this.renders[handler.field] = handler.render;
        if (after !== undefined)
            this.changeSort(handler.field, after, pre);
    }

    changeSort(field, after, pre) {
        let index = this.renderSort.indexOf(toString(after));
        if (index !== -1)
            this.renderSort.splice(pre === false ? index + 1 : index, 0, field);
        else if (!pre)
            this.renderSort.push(field);
        else
            this.renderSort.unshift(field);
    }
}
