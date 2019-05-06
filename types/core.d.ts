import {CreateElement, VNodeDirective, VueConstructor} from "vue";
import {ScopedSlot, ScopedSlotChildren} from "vue/types/vnode";
import {ExtendedVue, Vue} from "vue/types/vue";

export namespace FormCreate {

    export interface Install {
        (Vue): void;
    }

    export interface Create<FormRule, FormConfig, FormButton> {
        (rules: FormRule[], config?: FormConfig): $FApi<FormRule, FormConfig, FormButton>
    }

    export interface Init<FormRule, FormConfig, FormButton> {
        (rules: FormRule[], config?: FormConfig): MountApi<FormRule, FormConfig, FormButton>
    }

    export interface MountApi<FormRule, FormConfig, FormButton> {
        mount($el?: Element): $FApi<FormRule, FormConfig, FormButton>;

        remove();

        $f: $FApi<FormRule, FormConfig, FormButton>;
    }

    export interface Component {
        (): VueConstructor[];

        (id: string): VueConstructor;

        (id: string, definition): ExtendedVue<Vue, {}, {}, {}, {}>;
    }

    export interface FormData {
        [field: string]: any;
    }

    export interface BindFormData extends FormData {
    }

    export interface BaseButton<Col> {
        innerText?: string;
        show?: boolean;
        col?: Col;
        click?: Function;
    }

    export interface BaseConfig<FormConfig, Row, Upload, Button, FormRule, FormButton> {
        form?: FormConfig;
        row?: Row;
        upload?: Upload;
        submitBtn?: Button;
        resetBtn?: Button;
        el?: Element | string;
        switchMaker?: boolean;
        iframeHelper?: boolean;
        mounted?: ($f: $FApi<FormRule, BaseConfig<FormConfig, Row, Upload, Button, FormRule, FormButton>, FormButton>) => void;
        onReload?: ($f: $FApi<FormRule, BaseConfig<FormConfig, Row, Upload, Button, FormRule, FormButton>, FormButton>) => void;
        onSubmit?: (formData: FormData, $f: $FApi<FormRule, BaseConfig<FormConfig, Row, Upload, Button, FormRule, FormButton>, FormButton>) => void;
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

    export interface BaseOption<Rule> {
        slot?: string | DefaultSlot<Rule>
    }

    export interface Rule<Col, FormOption extends BaseOption<Rule<Col, FormOption>>> extends Data {
        readonly type: string;
        readonly field?: string;
        event?: {
            [key: string]: Function
        };
        options?: FormOption[];
        validate?: any[];
        col?: Col;
        emit?: string[];
        template?: string;
        emitPrefix?: string;
        title?: string;
        value?: any;
        className?: any;
        defaultSlot?: any;
        children?: Array<Rule<Col, FormOption> | Creator<Rule<Col, FormOption>, Col, FormOption> | string>;
        hidden?: false
        visibility?: false

        [key: string]: any;
    }

    export class VData {
        private _data: Data;

        private init(): this;

        class(classList: any): this;
        class(_class: string, status: boolean | any): this;

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

    export interface DefaultSlot<Rule> {
        (rule: Rule, $h: CreateElement): ScopedSlotChildren | string
    }


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

        emit(emit: string[]): this;
    }

    type CommonMaker<Creator> = (title: string, field: string, value?: any) => Creator;

    export interface ParseRuleList<FormRule> extends Iterable<FormRule[]> {
        find(field: string): FormRule;
    }


    // declare const _Components = [
    //    'auto', 'autoComplete', 'cascader', 'checkbox', 'color', 'colorPicker', 'date', 'datePicker', 'dateRange', 'dateTime', 'dateTimeRange',
    //    'email', 'file', 'frame', 'frameFile', 'frameFileOne', 'frameFiles', 'frameImage', 'frameImageOne', 'frameImages', 'frameInput', 'frameInputOne',
    //    'frameInputs', 'idate', 'image', 'input', 'inputNumber', 'month', 'number', 'password', 'radio', 'rate', 'select', 'selectMultiple', 'selectOne', 'slider',
    //    'sliderRange', 'switch', 'text', 'textarea', 'time', 'timePicker', 'timeRange', 'tree', 'treeChecked', 'treeSelected', 'upload', 'uploadFile', 'uploadFileOne',
    //    'uploadImage', 'uploadImageOne', 'url', 'year'
    //    ];

    type Components =
        'auto'
        | 'autoComplete'
        | 'cascader'
        | 'checkbox'
        | 'color'
        | 'colorPicker'
        | 'date'
        | 'datePicker'
        | 'dateRange'
        | 'dateTime'
        | 'dateTimeRange'
        |
        'email'
        | 'file'
        | 'frame'
        | 'frameFile'
        | 'frameFileOne'
        | 'frameFiles'
        | 'frameImage'
        | 'frameImageOne'
        | 'frameImages'
        | 'frameInput'
        | 'frameInputOne'
        |
        'frameInputs'
        | 'idate'
        | 'image'
        | 'input'
        | 'inputNumber'
        | 'month'
        | 'number'
        | 'password'
        | 'radio'
        | 'rate'
        | 'select'
        | 'selectMultiple'
        | 'selectOne'
        | 'slider'
        |
        'sliderRange'
        | 'switch'
        | 'text'
        | 'textarea'
        | 'time'
        | 'timePicker'
        | 'timeRange'
        | 'tree'
        | 'treeChecked'
        | 'treeSelected'
        | 'upload'
        | 'uploadFile'
        | 'uploadFileOne'
        |
        'uploadImage'
        | 'uploadImageOne'
        | 'url'
        | 'year';


// declare enum Components{
//     auto,autoComplete,cascader,checkbox,color,colorPicker,date,datePicker,dateRange,dateTime,dateTimeRange,
//         email,file,frame,frameFile,frameFileOne,frameFiles,frameImage,frameImageOne,frameImages,frameInput,frameInputOne,
//         frameInputs,idate,image,input,inputNumber,month,'number',password,radio,rate,select,selectMultiple,selectOne,slider,
//         sliderRange,'switch',text,textarea,time,timePicker,timeRange,tree,treeChecked,treeSelected,upload,uploadFile,uploadFileOne,
//         uploadImage,uploadImageOne,url,year
// }


    export interface Maker<Creator, Rule> {
        hidden(field: string, value: any): Creator;

        create(type: string, field?: string, title?: string): Creator;

        createTmp(template: string, vm: Vue, field?: string, title?: string): Creator;

        template(template: string, vm: Vue, field?: string, title?: string): Creator;

        parse(rules: string | Array<Rule | Creator>, toMaker?: boolean): ParseRuleList<Rule | Creator>;

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
    }


    interface ButtonHandle {
        loading(loading?: boolean): void;

        finish(): void;

        disabled(disabled?: boolean): void;

        show(isShow?: boolean): void;
    }

    export interface $FApi<FormRule, FormConfig, FormButton> {

        config: FormConfig;
        rule: FormRule[];

        formData(): FormData;

        getValue(field: string): any;

        setValue(field: string, value: any): void;

        setValue(formData: FormData): void;

        changeValue(field: string, value: any): void;

        changeField(field: string, value: any): void;

        changeField(formData: FormData): void;

        removeField(field: string | string[]): void;

        validate(successFn?: Function, failFn?: Function): void;

        validateField(field: string, callback?: (errorMessage: string | boolean) => void): void;

        resetFields(field?: string | string[]): void;

        destroy(): void;

        fields(): string[];

        append(rule: FormRule): void;

        append(rule: FormRule, after: string): void;

        prepend(rule: FormRule): void;

        prepend(rule: FormRule, before: string): void;

        submit(successFn?: Function, failFn?: Function): void;

        hidden(field: string | string[] | undefined, isHidden?: boolean): void;

        visibility(field: string | string[] | undefined, isVisibility?: boolean): void;

        disabled(field: string | string[], disabled?: boolean): void;

        clearValidateState(field?: string | string[]): void;

        model(): { [field: string]: FormRule };

        component(): { [field: string]: FormRule };

        bind(field?: string | string[]): BindFormData;

        submitStatus(props: FormButton): void;

        resetStatus(props: FormButton): void;

        btn: ButtonHandle;

        resetBtn: ButtonHandle;

        closeModal(field: string): void;

        set: <T>(object: object, key: string | number, value: T) => T;

        reload(rules?: FormRule[]): void;

        options(options: FormConfig): void;

        onSubmit(callback: Function): void;

        refresh(): void;

        show(isShow?: boolean): void;
    }
}
