import {isFunction, isUndef, preventDefault} from '@form-create/utils';
import {BaseForm} from '@form-create/core';
import style from './style/index.css';


export default class Form extends BaseForm {

    constructor(handle) {
        super(handle);
        this.refName = `cForm${this.id}`;
        this.hidden = [];
        this.visibility = [];
    }

    getFormRef() {
        return this.vm.$refs[this.refName];
    }

    beforeRender() {
        this.propsData = this.vData.props(this.options.form).props({
            model: this.$handle.formData,
            rules: this.$handle.validate,
            key: 'form' + this.unique
        }).ref(this.refName).nativeOn({submit: preventDefault}).class('form-create', true).key(this.unique).get();
    }

    render(vn) {
        if (vn.length > 0)
            vn.push(this.makeFormBtn());

        return this.vNode.form(this.propsData, [this.makeRow(vn)]);
    }

    makeRow(vn) {
        return this.vNode.row({props: this.options.row || {}, key: 'fr' + this.unique}, vn)
    }

    container(child, parser) {
        return this.makeFormItem(parser, child, `fItem${parser.key}${this.unique}`);
    }

    makeFormItem(parser, VNodeFn, fItemUnique) {
        let {rule, unique, field, formItemRefName} = parser,
            labelWidth = (!rule.col.labelWidth && !rule.title) ? 1 : rule.col.labelWidth,
            className = rule.className, propsData = this.vData.props({
                prop: field,
                label: rule.title,
                labelFor: unique,
                rules: rule.validate,
                labelWidth: labelWidth,
                required: rule.props.required
            }).key(fItemUnique).ref(formItemRefName).class(className).get(),
            node = this.vNode.formItem(propsData, [VNodeFn]);
        return this.propsData.props.inline === true ? node : this.makeCol(parser, fItemUnique, [node]);
    }

    makeCol(parser, fItemUnique, VNodeFn) {
        const rule = parser.rule;
        return this.vNode.col({
            props: rule.col, 'class': {
                [style.__fc_h]: this.hidden.indexOf(parser) !== -1,
                [style.__fc_v]: this.visibility.indexOf(parser) !== -1
            }, key: `${fItemUnique}col1`
        }, VNodeFn);
    }

    makeFormBtn() {
        let btn = [],
            submitBtnShow = false !== this.vm.buttonProps && false !== this.vm.buttonProps.show,
            resetBtnShow = false !== this.vm.resetProps && false !== this.vm.resetProps.show;
        if (submitBtnShow)
            btn.push(this.makeSubmitBtn(resetBtnShow ? 19 : 24));
        if (resetBtnShow)
            btn.push(this.makeResetBtn(4));

        return this.vNode.col({props: {span: 24}, key: `${this.unique}col2`}, btn);
    }

    makeResetBtn(span) {
        const resetBtn = this.$handle.options.resetBtn,
            props = isUndef(this.$handle.options.resetBtn.col) ? {span: span, push: 1} : resetBtn.col;

        return this.vNode.col({props: props, key: `${this.unique}col3`}, [
            this.vNode.button({
                key: `frsbtn${this.unique}`, props: this.vm.resetProps, on: {
                    'click': () => {
                        const fApi = this.$handle.fCreateApi;
                        isFunction(resetBtn.click)
                            ? resetBtn.click(fApi)
                            : fApi.resetFields();
                    }
                }
            }, [this.vm.resetProps.innerText])
        ]);
    }

    makeSubmitBtn(span) {
        const submitBtn = this.$handle.options.submitBtn,
            props = isUndef(this.$handle.options.submitBtn.col) ? {span: span} : submitBtn.col;

        return this.vNode.col({props: props, key: `${this.unique}col4`}, [
            this.vNode.button({
                key: `fbtn${this.unique}`, props: this.vm.buttonProps, on: {
                    'click': () => {
                        const fApi = this.$handle.fCreateApi;
                        isFunction(submitBtn.click)
                            ? submitBtn.click(fApi)
                            : fApi.submit();
                    }
                }
            }, [this.vm.buttonProps.innerText])
        ]);
    }
}
