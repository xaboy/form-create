import {FormData, VNodeData} from "@form-create/core";
import {ButtonProps} from "@arco-design/web-vue/es/button";
import {TooltipInstance} from "@arco-design/web-vue/es/tooltip";
import {PopoverInstance} from "@arco-design/web-vue/es/popover";
import {FormItemInstance, FormInstance} from "@arco-design/web-vue/es/form";
import {Row, Col} from "@arco-design/web-vue/es/grid";
import {Api} from "./index";
import {ValidatedError} from "@arco-design/web-vue/es/form/interface";


declare type TooltipProps = TooltipInstance['$props'];
declare type PopoverProps = PopoverInstance['$props'];
declare type ColProps = (InstanceType<typeof Col>)['$props']
declare type RowProps = (InstanceType<typeof Row>)['$props']
declare type FormItemProps = FormItemInstance['$props']
declare type FormProps = FormInstance['$props']

export interface OptionAttrs {
    col?: Boolean | ColProps & {
        labelWidth?: number | string;
        show?: Boolean;
    };
    row?: Boolean | RowProps & {
        show?: Boolean;
    };
    info?: Boolean | (TooltipProps | PopoverProps) & VNodeData & {
        show?: Boolean;
        native?: Boolean;
        icon?: string;
        align?: 'left' | 'right';
        info?: string;
    };
    wrap?: Boolean | VNodeData & FormItemProps & {
        show?: Boolean;
    };
    form?: FormProps & {
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
    title?: Boolean | VNodeData & {
        show?: Boolean;
        native?: Boolean;
        title?: string;
    };
};

interface children {
    children?: VNodeData[]
}

export interface CreatorAttrs {
    col(props: typeof optionAttrs.col): this;

    wrap(props: typeof optionAttrs.wrap): this;

    title(props: string | typeof optionAttrs.title & children): this;

    info(props: string | typeof optionAttrs.info & children): this;

    className(prop: string): this;

}

export interface RuleAttrs {
    col?: typeof optionAttrs.col;
    wrap?: typeof optionAttrs.wrap;
    title?: string | typeof optionAttrs.title & children;
    info?: string | typeof optionAttrs.info & children;
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

    submit(success: (formData: FormData, $f: Api) => void, fail: ($f: Api) => void): Promise<any>;

    clearValidateState(fields?: string | string[], clearSub?: Boolean): void;

    clearSubValidateState(fields?: string | string[]): void;

    validate(callback?: ((errors: undefined | Record<string, ValidatedError>) => void)): Promise<any>;

    validateField(field: string, callback?: ((errors: undefined | Record<string, ValidatedError>) => void)): Promise<any>;

    submitBtnProps(props: ButtonProps): void;

    resetBtnProps(props: ButtonProps): void;

}
