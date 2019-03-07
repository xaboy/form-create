import {Button, Col, Option, Row, Upload} from "element-ui";
import {ElementUIComponentSize} from "element-ui/types/component";
import {FormItemLabelPosition} from "element-ui/types/form";
import {FormCreate} from "./core";

export = formCreate;

declare class formCreate {
    static create: formCreate.create;
    static maker: formCreate.maker;
    static install: formCreate.install;
}

declare namespace formCreate {

    interface ElementFormConfig {
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
    }

    export interface FormCol extends Col {
        labelWidth?: number;
    }

    export interface FormOption extends FormCreate.BaseOption<Rule>, Option {
    }

    export type Rule = FormCreate.Rule<FormCol, FormOption>;

    export type Creator = FormCreate.Creator<Rule, FormCol, FormOption>;

    export type FormRule = Creator | Rule;

    export type DefaultSlot = FormCreate.DefaultSlot<Rule>;

    export type FormConfig = FormCreate.BaseConfig<ElementFormConfig, Row, Upload, Button, FormRule, FormButton>;

    export interface FormButton extends FormCreate.BaseButton<FormCol>, Button {

    }

    export type $FApi = FormCreate.$FApi<FormRule, FormConfig, FormButton>;

    export type FormData = FormCreate.FormData;

    export type BindFormData = FormCreate.BindFormData;

    export type ParseRuleList = FormCreate.ParseRuleList<FormRule>;

    export type maker = FormCreate.Maker<Creator, Rule>;

    export type create = FormCreate.Create<FormRule, FormConfig, FormButton>;

    export type install = FormCreate.Install;

}
