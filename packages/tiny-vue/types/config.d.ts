import {FormData, VNodeRule} from "@form-create/core";
import {Api} from "./index";
import {ComponentInternalInstance} from "@vue/runtime-core";

type ComponentSize = 'medium' | 'small' | 'mini'

type ColProps = {
    tag?: string | 'div';
    span?: number;
    offset?: number;
    move?: number;
    no?: number;
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

type RowProps = {
    tag?: string | 'div';
    align?: 'top' | 'middle' | 'bottom';
    flex?: boolean;
    gutter?: number;
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around';
    noSpace?: boolean;
    order?: 'asc' | 'des';
}

interface ButtonProps {
    type?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';
    size?: 'large' | 'medium' | 'small' | 'mini';
    plain?: boolean;
    round?: boolean;
    circle?: boolean;
    loading?: boolean;
    disabled?: boolean;
    icon?: any;
    autofocus?: boolean;
    nativeType?: 'button' | 'submit' | 'reset';
    text?: string;
    ghost?: boolean;
    [key: string]: any;
}

export interface OptionAttrs {
    col?: Boolean | Partial<ColProps & {
        labelWidth?: number | string;
        show?: Boolean;
    }>;
    row?: Boolean | Partial<RowProps & {
        show?: Boolean;
    }>;
    info?: Boolean | Partial<VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        icon?: string;
        align?: 'left' | 'right';
        info?: string;
    }>;
    wrap?: Boolean | Partial<VNodeRule & {
        labelWidth?: string
        required?: boolean
        error?: string
        showMessage?: boolean
        inlineMessage?: boolean
        size?: ComponentSize
        show?: Boolean;
        validateType?: 'tip' | 'text';
        validatePosition?: string;
    }>;
    form?: Partial<{
        inline?: boolean
        disabled?: boolean
        displayOnly?: boolean
        labelPosition?: 'left' | 'right' | 'top'
        labelWidth?: string
        labelSuffix?: string
        labelAlign?: boolean
        showMessage?: boolean
        validateOnRuleChange?: boolean | 'deep'
        validateType?: 'tip' | 'text'
        size?: ComponentSize
        className?: any;
        col?: Boolean;
    }>;

    submitBtn?: Boolean | Partial<ButtonProps & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    }>;

    resetBtn?: Boolean | Partial<ButtonProps & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    }>;
}

declare const optionAttrs: Partial<OptionAttrs & {
    title?: Boolean | Partial<VNodeRule & {
        show?: Boolean;
        native?: Boolean;
        title: string;
    }>;
}>;

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

    validateFields(fields: string | string[], callback?: (state: any) => void): Promise<any>;

    submitBtnProps(props: ButtonProps): void;

    resetBtnProps(props: ButtonProps): void;
}
