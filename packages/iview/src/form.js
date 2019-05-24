import {extend, isFunction, isUndef, preventDefault} from '@form-create/utils';
import {VData, VNode} from '@form-create/core';
import {componentList} from './drive';


//TODO BaseForm 类
//TODO ID 代替 field,避免重复
export default class Form {

    constructor(render, id) {
        this.vm = render.vm;
        this.h = render.h;
        this.options = render.options;
        this.vNode = new VNode(this.vm);
        this.vData = new VData();
        this.unique = id;
        this.refName = `cForm${id}`;
    }

    beforeRender() {
        this.propsData = this.vData.props(this.h.options.form).props({
            model: this.h.formData,
            rules: this.h.validate,
            key: 'form' + this.unique
        })
            .ref(this.h.formRefName).nativeOn({submit: preventDefault}).class('form-create', true).key(this.unique).get();
    }

    render(vn) {
        let unique = this.unique;
        if (vn.length > 0)
            vn.push(this.makeFormBtn(unique));

        return this.vNode.form(this.propsData, vn.length > 0 ? [this.vNode.row(extend({props: this.h.options.row || {}}, {key: 'row' + unique}), vn)] : []);
    }

    container(child, parser) {
        return this.makeFormItem(parser, child, `fItem${parser.key}${this.unique}`);
    }

    makeFormItem({type, rule, unique, field, formItemRefName}, VNodeFn, fItemUnique) {
        let labelWidth = (!componentList[type] && !rule.col.labelWidth && !rule.title) ? 1 : rule.col.labelWidth,
            className = rule.className, propsData = this.vData.props({
                prop: field,
                label: rule.title,
                labelFor: unique,
                rules: rule.validate,
                labelWidth: labelWidth,
                required: rule.props.required
            }).key(fItemUnique).ref(formItemRefName).class(className).get(),
            node = this.vNode.formItem(propsData, [VNodeFn]);
        return this.propsData.props.inline === true ? node : this.makeCol(rule, fItemUnique, [node]);
    }

    makeCol(rule, fItemUnique, VNodeFn) {
        return this.vNode.col({
            props: rule.col, 'class': {
                '__fc_h': rule.props.hidden === true,
                '__fc_v': rule.props.visibility === true
            }, key: `${fItemUnique}col1`
        }, VNodeFn);
    }

    makeFormBtn(unique) {
        let btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if (submitBtnShow)
            btn.push(this.makeSubmitBtn(unique, resetBtnShow ? 19 : 24));
        if (resetBtnShow)
            btn.push(this.makeResetBtn(unique, 4));

        return this.vNode.col({props: {span: 24}, key: `${this.unique}col2`}, btn);
    }

    makeResetBtn(unique, span) {
        const resetBtn = this.h.options.resetBtn,
            props = isUndef(this.h.options.resetBtn.col) ? {span: span, push: 1} : resetBtn.col;

        return this.vNode.col({props: props, key: `${this.unique}col3`}, [
            this.vNode.button({
                key: `frsbtn${unique}`, props: this.vm.resetProps, on: {
                    'click': () => {
                        const fApi = this.h.fCreateApi;
                        isFunction(resetBtn.click)
                            ? resetBtn.click(fApi)
                            : fApi.resetFields();
                    }
                }
            }, [this.vm.resetProps.innerText])
        ]);
    }

    makeSubmitBtn(unique, span) {
        const submitBtn = this.h.options.submitBtn,
            props = isUndef(this.h.options.submitBtn.col) ? {span: span} : submitBtn.col;

        return this.vNode.col({props: props, key: `${this.unique}col4`}, [
            this.vNode.button({
                key: `fbtn${unique}`, props: this.vm.buttonProps, on: {
                    'click': () => {
                        const fApi = this.h.fCreateApi;
                        isFunction(submitBtn.click)
                            ? submitBtn.click(fApi)
                            : fApi.submit();
                    }
                }
            }, [this.vm.buttonProps.innerText])
        ]);
    }

}
