import {Button, Col, Popover, Row, Tooltip} from "element-ui";
import {VNodeData} from "@form-create/core";
import {ElementUIComponentSize} from "element-ui/types/component";
import {FormItemLabelPosition} from "element-ui/types/form";

export interface OptionAttrs {
    col?: Boolean | Col & {
        labelWidth?: number | string;
        show?: Boolean;
    };
    row?: Boolean | Row & {
        show?: Boolean;
    };
    info?: Boolean | (Tooltip | Popover) & VNodeData & {
        show?: Boolean;
    };
    title?: Boolean | VNodeData & {
        show?: Boolean;
    };
    wrap?: Boolean | VNodeData & {
        labelWidth?: string
        required?: boolean
        error?: string
        showMessage?: boolean
        inlineMessage?: boolean
        size?: ElementUIComponentSize
        show?: Boolean;
    };
    form?: {
        inline?: boolean
        disabled?: boolean
        labelPosition?: FormItemLabelPosition
        labelWidth?: string
        labelSuffix?: string
        showMessage?: boolean
        inlineMessage?: boolean
        statusIcon?: boolean
        validateOnRuleChange?: boolean
        size?: ElementUIComponentSize
        className?: any;
        col?: Boolean;
    };

    submitBtn?: Boolean | Button & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    };

    resetBtn?: Boolean | Button & {
        click?: Function;
        innerText?: string;
        show?: Boolean;
    };

}

declare const optionAttrs: OptionAttrs;

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