import {FormData, VNodeRule} from "@form-create/core";
import {ColProps, RowProps, TooltipProps, ButtonProps} from "ant-design-vue";
import {Api} from "./index";
import {ComponentInternalInstance} from "@vue/runtime-core";

export interface OptionAttrs {
    col?: Boolean | ColProps & {
        labelWidth?: number | string;
        show?: Boolean;
    };
    row?: Boolean | RowProps & {
        show?: Boolean;
    };
    info?: Boolean | (TooltipProps | Object) & VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        icon?: string;
        align?: 'left' | 'right';
        info?: string;
    };
    wrap?: Boolean | VNodeRule & {
        colon?: boolean;
        extra?: any;
        hasFeedback?: boolean;
        help?: any;
        label?: any;
        labelCol?: ColProps;
        required?: boolean;
        validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
        wrapperCol?: ColProps;
        labelAlign?: 'left' | 'right';
        autoLink?: boolean;
        show?: Boolean;
    };
    form?: {
        hideRequiredMark?: boolean;
        labelCol?: ColProps;
        layout?: 'horizontal' | 'inline' | 'vertical';
        wrapperCol?: ColProps;
        colon?: boolean;
        labelAlign?: 'left' | 'right';
        validateMessages?: any;
        validateOnRuleChange?: boolean;
        className?: any;
        col?: Boolean;
    };

    submitBtn?: Boolean | ButtonProps & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    };

    resetBtn?: Boolean | ButtonProps & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    };

}

declare const optionAttrs: OptionAttrs & {
    title?: Boolean | VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        title?: string;
    };
};

export interface CreatorAttrs {
    col(props: typeof optionAttrs.col): this;

    wrap(props: typeof optionAttrs.wrap): this;

    title(props: string | typeof optionAttrs.title): this;

    info(props: string | typeof optionAttrs.info): this;

    className(prop: string): this;

}

export interface RuleAttrs {
    col?: typeof optionAttrs.col;
    wrap?: typeof optionAttrs.wrap;
    title?: string | typeof optionAttrs.title;
    info?: string | typeof optionAttrs.info;
    className?: string;
}

export interface ApiAttrs {
    btn: {
        loading(loading: boolean): void;
        disabled(disabled: boolean): void;
        show(show: boolean): void;
    }
    resetBtn: {
        loading(loading: boolean): void;
        disabled(disabled: boolean): void;
        show(show: boolean): void;
    }

    formEl(): undefined | ComponentInternalInstance;

    wrapEl(id: string): undefined | ComponentInternalInstance;

    submit(success: (formData: FormData, $f: Api) => void, fail: ($f: Api) => void): Promise<any>;

    clearValidateState(fields?: string | string[], clearSub?: Boolean): void;

    clearSubValidateState(fields?: string | string[]): void;

    validate(callback?: (state: any) => void): Promise<any>;

    validateField(field: string, callback?: (state: any) => void): Promise<any>;

    submitBtnProps(props: ButtonProps): void;

    resetBtnProps(props: ButtonProps): void;

}
