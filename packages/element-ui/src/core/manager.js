import Manager from '@form-create/core/src/factory/manager';
import getConfig from './config';
import mergeProps from '@form-create/utils/lib/mergeprops';
import is from '@form-create/utils/lib/type';

export default class ElmManager extends Manager {

    constructor() {
        super();
        this.rule = {};
    }

    validate(call) {
        this.form().validate((valid) => {
            call && call(valid);
        });
    }

    validateField(field, call) {
        this.form().validateField(field, call);
    }

    resetField(parser) {
        this.vm.$refs[parser.formItemRefName].resetField();
    }

    clearValidateState(parser) {
        const fItem = this.vm.$refs[parser.formItemRefName];
        if (fItem) {
            fItem.validateMessage = '';
            fItem.validateState = '';
        }
    }

    tidyOptions(options) {
        if (options.submitBtn && is.Boolean(options.submitBtn)) options.submitBtn = {show: options.submitBtn};
        if (options.resetBtn && is.Boolean(options.resetBtn)) options.resetBtn = {show: options.resetBtn};
        if (options.row && is.Boolean(options.row)) options.row = {valid: options.row};
        return options;
    }

    tidyRule(rule) {

    }

    getDefaultOptions() {
        return getConfig();
    }

    beforeRender() {
        this.rule = mergeProps([{
            props: this.options.form,
            nativeOn: {
                submit: (e) => {
                    e.preventDefault();
                }
            },
            class: this.options.form.className
        }, {
            model: this.$handle.formData,
            rules: this.$handle.validate,
            key: this.key,
            ref: this.ref,
            class: 'form-create',
            type: 'form'
        }])
    }

    render(children) {
        if (children.length)
            children.push(this.formBtn());
        return this.$render.renderRule(this.rule, this.options.row.valid ? [this.row(children)] : children);
    }

    formItem(children){
        
    }

    row(children) {
        const row = this.options.row;
        return this.$render.renderRule({
            type: 'row',
            props: row,
            class: row.class,
            key: this.key + 'row'
        }, children)
    }

    formBtn() {
        let vn = [];
        if (this.options.submitBtn.show) {
            vn.push(this.submitBtn())
        }
        if (this.options.resetBtn.show) {
            vn.push(this.resetBtn())
        }
        return this.rule.props.inline === true
            ? vn
            : (vn.length ? this.$render.renderRule({
                type: 'col',
                props: {span: 24},
                key: this.key + 'col'
            }, vn) : []);
    }

    resetBtn() {
        const resetBtn = this.options.resetBtn;

        return this.$render.renderRule({
            type: 'button',
            props: resetBtn,
            style: {width: resetBtn.width},
            on: {
                click() {
                    const fApi = this.$handle.fCreateApi;
                    resetBtn.click
                        ? resetBtn.click(fApi)
                        : fApi.resetFields();
                }
            },
            key: this.key + 'reset',
        }, [resetBtn.innerText]);
    }

    submitBtn() {
        const submitBtn = this.options.submitBtn;

        return this.$render.renderRule({
            type: 'button',
            props: submitBtn,
            style: {width: submitBtn.width},
            on: {
                click() {
                    const fApi = this.$handle.fCreateApi;
                    submitBtn.click
                        ? submitBtn.click(fApi)
                        : fApi.submit();
                }
            },
            key: this.key + 'submit',
        }, [submitBtn.innerText]);
    }
}
