import {Button, Col, Option, Row, Upload} from "iview";
import {FormCreate} from "./core";

export = formCreate;

declare class formCreate {
    static create: formCreate.create;
    static maker: formCreate.maker;
    static install: formCreate.install;
}

declare namespace formCreate {
    interface IviewFormConfig {
        inline?: boolean;
        labelPosition?: 'left' | 'right' | 'top';
        labelWidth?: number;
        showMessage?: boolean;
        autocomplete?: 'on' | 'off';
        size?: '' | 'large' | 'small' | 'default';
    }

    export interface FormOption extends FormCreate.BaseOption<Rule>, Option {
    }

    export type Rule = FormCreate.Rule<Col, FormOption>;

    export type Creator = FormCreate.Creator<Rule, Col, FormOption>;

    export type FormRule = Creator | Rule;

    export type DefaultSlot = FormCreate.DefaultSlot<Rule>;

    export type FormConfig = FormCreate.BaseConfig<IviewFormConfig, Row, Upload, Button, FormRule, FormButton>;

    export interface FormButton extends FormCreate.BaseButton<Col>, Button {

    }

    export type $FApi = FormCreate.$FApi<FormRule, FormConfig, FormButton>;

    export type FormData = FormCreate.FormData;

    export type BindFormData = FormCreate.BindFormData;

    export type ParseRuleList = FormCreate.ParseRuleList<FormRule>;

    export type maker = FormCreate.Maker<Creator, Rule>;

    export type create = FormCreate.Create<FormRule, FormConfig, FormButton>;

    export type install = FormCreate.Install;

}
