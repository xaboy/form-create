import Vue, {ComponentOptions, CreateElement, VNodeDirective} from "vue";
import {ScopedSlot, ScopedSlotChildren} from "vue/types/vnode";
import {ExtendedVue} from "vue/types/vue";

export default FormCreate;

export namespace FormCreate {

    export interface Install {
        (vue: typeof Vue): void
    }

    export interface CopyRule<FormRule> {
        (rule: FormRule | String, mode: Boolean): FormRule | String
    }

    export interface CopyRules<FormRule> {
        (rules: Array<FormRule | String>, mode: Boolean): Array<FormRule | String>
    }

    export interface Create<FormRule, FormConfig, FormButton> {
        (rules: FormRule[], config?: FormConfig): $FApi<FormRule, FormConfig, FormButton>
    }

    export interface Init<FormRule, FormConfig, FormButton> {
        (rules: FormRule[], config?: FormConfig): MountApi<FormRule, FormConfig, FormButton>
    }

    export interface MountApi<FormRule, FormConfig, FormButton> {
        mount($el?: Element): $FApi<FormRule, FormConfig, FormButton>;

        remove(): void;

        $f: $FApi<FormRule, FormConfig, FormButton>;
    }

    export interface $form {
        (): ExtendedVue<Vue, {}, {}, {}, {}>;
    }

    export interface parseJson<FormRule> {
        (json: string, mode: Boolean): FormRule[];
    }

    export interface Component {
        (id: string): ExtendedVue<Vue, {}, {}, {}, {}>;

        (id: string, definition: ComponentOptions<Vue>): void;
    }

    export interface BaseButton<Col> {
        innerText?: string;
        show?: boolean;
        col?: Col;
        click?: Function;
    }

    export interface Data {
        key?: string | number;
        slot?: string;
        scopedSlots?: { [key: string]: ScopedSlot | undefined };
        ref?: string;
        class?: any;
        style?: object[] | object;
        props?: { [key: string]: any };
        attrs?: { [key: string]: any };
        domProps?: { [key: string]: any };
        on?: { [key: string]: Function | Function[] };
        nativeOn?: { [key: string]: Function | Function[] };
        directives?: VNodeDirective[];
    }

    export interface DefaultSlot<Rule> {
        (rule: Rule, $h: CreateElement): ScopedSlotChildren | string
    }

    export interface BaseOption<Rule> {
        slot?: string | DefaultSlot<Rule>
    }

    export interface BaseConfig<FormConfig, Row, Button, FormRule, FormButton> {
        form?: FormConfig;
        row?: Row;
        submitBtn?: Boolean | Button;
        resetBtn?: Boolean | Button;
        el?: Element | string;
        global?: {
            [key: string]: object
        };
        injectEvent?: boolean;
        formData?: {
            [field: string]: any
        };
        info?: {
            [field: string]: any
        };
        mounted?: ($f: $FApi<FormRule, BaseConfig<FormConfig, Row, Button, FormRule, FormButton>, FormButton>) => void;
        onReload?: ($f: $FApi<FormRule, BaseConfig<FormConfig, Row, Button, FormRule, FormButton>, FormButton>) => void;
        onSubmit?: (formData: FormData, $f: $FApi<FormRule, BaseConfig<FormConfig, Row, Button, FormRule, FormButton>, FormButton>) => void;
    }

    export interface Control<FormRule> {
        value?: any;
        handle?: (val: any, $f) => boolean;
        rule: FormRule[]
    }

    export interface Rule<Col, FormOption extends BaseOption<Rule<Col, FormOption>>> extends Data {
        readonly type: string;
        readonly field?: string;
        readonly name?: string;
        options?: FormOption[];
        validate?: any[];
        col?: Col;
        emit?: string[];
        template?: string;
        emitPrefix?: string;
        title?: string;
        info?: string;
        native?: boolean;
        inject?: boolean;
        value?: any;
        className?: any;
        defaultSlot?: any;
        children?: Array<Rule<Col, FormOption> | Creator<Rule<Col, FormOption>, Col, FormOption> | string>;
        control?: Array<Control<Rule<Col, FormOption> | Creator<Rule<Col, FormOption>, Col, FormOption> | string>> | Control<Rule<Col, FormOption> | Creator<Rule<Col, FormOption>, Col, FormOption> | string>;
        hidden?: boolean
        visibility?: boolean

        [key: string]: any;
    }

    export class VData {
        private _data: Data;

        private init(): this;

        class(classList: string[]): this;
        class(classList: Object): this;
        class(_class: string, status?: boolean | any): this;

        directives(directives: VNodeDirective | VNodeDirective[]): this;

        get(): Data;

        ref(ref: string): this;

        key(key: string | number): this;

        slot(slot: string): this;

        scopedSlots(scopedSlots: { [key: string]: ScopedSlot } | string, val?: ScopedSlot): this;

        nativeOn(nativeOn: { [key: string]: Function | Function[] } | string, val?: Function): this;

        on(on: { [key: string]: Function | Function[] } | string, val?: Function): this;

        props(props: { [key: string]: any } | string, val?: any): this;

        attrs(attrs: { [key: string]: any } | string, val?: any): this;

        style(style: { [key: string]: any } | string, val?: any): this;

        domProps(style: { [key: string]: any } | string, val?: any): this;

    }

    // export class Parser {
    //     readonly rule: FormRule;
    //     readonly vData: VData;
    //     readonly vNode: VNode;
    //     readonly id: number;
    //     readonly watch: Array<Function>;
    //     readonly originType: string;
    //     readonly type: string;
    //     readonly isDef: boolean;
    //     readonly field: string;
    //     readonly el: Vue | Element;
    //     readonly name: string;
    //     readonly unique: string;
    //     readonly key: string;
    //     readonly refName: string;
    //     readonly formItemRefName: string;
    // }

    export class Creator<Rule, Col, FormOption> extends VData {
        private rule: Rule;

        new(type: string, title: string, field: string, value?: any, props?: object): this;

        type(type: string): this;

        get(): Data;

        getRule(): this;

        setValue(value: any): this;

        emitPrefix(emitPrefix: string): this;

        className(className: any): this;

        defaultSlot(slot: string | DefaultSlot<Rule>): this;

        event(event: object): this;

        col(col: Col): this;

        validate(validate: any[] | object): this;

        options(options: FormOption[]): this;

        children(children: Array<Rule | Creator<Rule, Col, FormOption> | string>): this;

        control(control: Array<Control<Rule | Creator<Rule, Col, FormOption>>>): this;

        emit(emit: string[]): this;

        hidden(hidden: boolean): this;

        info(info: string): this;

        visibility(visibility: boolean): this;
    }

    type CommonMaker<Creator> = (title: string, field: string, value?: any) => Creator;

    export interface ParseRuleList<FormRule> extends Iterable<FormRule[]> {
        find(field: string): FormRule;
    }

    export interface Maker<Creator, Rule> {
        hidden(field: string, value: any): Creator;

        create(type: string, field?: string, title?: string): Creator;

        createTmp(template: string, vm: Vue, field?: string, title?: string): Creator;

        template(template: string, vm: Vue, field?: string, title?: string): Creator;

        parse(rules: string | Array<Rule | Creator>, toMaker: true): ParseRuleList<Creator>;

        parse(rules: string | Array<Rule | Creator>, toMaker: false): ParseRuleList<Rule>;

        auto: CommonMaker<Creator>;
        autoComplete: CommonMaker<Creator>;
        cascader: CommonMaker<Creator>;
        checkbox: CommonMaker<Creator>;
        color: CommonMaker<Creator>;
        colorPicker: CommonMaker<Creator>;
        date: CommonMaker<Creator>;
        datePicker: CommonMaker<Creator>;
        dateRange: CommonMaker<Creator>;
        dateTime: CommonMaker<Creator>;
        dateTimeRange: CommonMaker<Creator>;
        email: CommonMaker<Creator>;
        file: CommonMaker<Creator>;
        frame: CommonMaker<Creator>;
        frameFile: CommonMaker<Creator>;
        frameFileOne: CommonMaker<Creator>;
        frameFiles: CommonMaker<Creator>;
        frameImage: CommonMaker<Creator>;
        frameImageOne: CommonMaker<Creator>;
        frameImages: CommonMaker<Creator>;
        frameInput: CommonMaker<Creator>;
        frameInputOne: CommonMaker<Creator>;
        frameInputs: CommonMaker<Creator>;
        idate: CommonMaker<Creator>;
        image: CommonMaker<Creator>;
        input: CommonMaker<Creator>;
        inputNumber: CommonMaker<Creator>;
        month: CommonMaker<Creator>;
        number: CommonMaker<Creator>;
        password: CommonMaker<Creator>;
        radio: CommonMaker<Creator>;
        rate: CommonMaker<Creator>;
        select: CommonMaker<Creator>;
        selectMultiple: CommonMaker<Creator>;
        selectOne: CommonMaker<Creator>;
        slider: CommonMaker<Creator>;
        sliderRange: CommonMaker<Creator>;
        'switch': CommonMaker<Creator>;
        text: CommonMaker<Creator>;
        textarea: CommonMaker<Creator>;
        time: CommonMaker<Creator>;
        timePicker: CommonMaker<Creator>;
        timeRange: CommonMaker<Creator>;
        tree: CommonMaker<Creator>;
        treeChecked: CommonMaker<Creator>;
        treeSelected: CommonMaker<Creator>;
        upload: CommonMaker<Creator>;
        uploadFile: CommonMaker<Creator>;
        uploadFileOne: CommonMaker<Creator>;
        uploadImage: CommonMaker<Creator>;
        uploadImageOne: CommonMaker<Creator>;
        url: CommonMaker<Creator>;
        year: CommonMaker<Creator>;
        group: CommonMaker<Creator>;
    }

    interface ButtonHandle {
        loading(loading?: boolean): void;

        disabled(disabled?: boolean): void;

        show(isShow?: boolean): void;
    }

    export interface FormData {
        [field: string]: any;
    }

    export interface BindFormData extends FormData {
    }

    export interface $FApi<FormRule, FormConfig, FormButton> {

        config: FormConfig;
        rule: FormRule[];

        formData(): FormData;

        getValue(field: string): any;

        setValue(field: string, value: any): void;

        setValue(formData: FormData): void;

        changeValue(field: string, value: any): void;

        changeValue(formData: FormData): void;

        changeField(field: string, value: any): void;

        changeField(formData: FormData): void;

        removeField(field: string): void;

        destroy(): void;

        fields(): string[];

        append(rule: FormRule, after?: string, isChild?: boolean): void;

        prepend(rule: FormRule, before?: string, isChild?: boolean): void;

        hidden(isHidden: boolean, field?: string | string[]): void;

        hiddenStatus(id: string): boolean;

        visibility(isVisibility: boolean, field?: string | string[]): void;

        visibilityStatus(id: string): boolean;

        disabled(disabled: boolean, field?: string | string[]): void;

        model(): { [field: string]: FormRule };

        component(): { [field: string]: FormRule };

        bind(): BindFormData;

        submitBtnProps(props: FormButton): void;

        resetBtnProps(props: FormButton): void;

        set: <T>(object: object, key: string | number, value: T) => T;

        reload(rules?: FormRule[]): void;

        updateOptions(options: { [key: string]: any }): void;

        onSubmit(callback: Function): void;

        sync(id: string): void;

        refresh(clear?: boolean): void;

        hideForm(isShow?: boolean): void;

        changeStatus(): boolean;

        clearChangeStatus(): void;

        getRule(id: string): FormRule;

        updateRule(id: string, rule: FormRule, cover?: boolean): void;

        updateRules(rules: { [field: string]: FormRule }, cover?: boolean): void;

        updateValidate(id: string, validate: any[], merge?: boolean): void;

        updateValidates(rules: { [field: string]: any[] }, merge?: boolean): void;

        validate(successFn?: Function, failFn?: Function): void;

        validateField(field: string, callback?: (errorMessage: string | boolean) => void): void;

        resetFields(field?: string | string[]): void;

        submit(successFn?: Function, failFn?: Function): void;

        clearValidateState(field?: string | string[], clearSub?: boolean): void;

        clearSubValidateState(field?: string | string[]): void;

        getSubForm(field: string): Array<$FApi<FormRule, FormConfig, FormButton>> | $FApi<FormRule, FormConfig, FormButton>

        btn: ButtonHandle;

        resetBtn: ButtonHandle;

        closeModal(field: string): void;

        options(options: FormConfig): void;

        trigger(id: string, methodName: string, ...args: Array<any>): void;

        method(id: string, methodName: string): Function;

        toJson(): string;

        el(id: string): Element | Vue

        on(eventName: string, callback: Function): void;

        once(eventName: string, callback: Function): void;

        off(eventName: string | Array<string>, callback?: Function): void;

    }
}
