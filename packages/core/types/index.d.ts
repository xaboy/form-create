import {App, Component, VNodeChild} from "vue";

export type Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseOptions<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & OptionAttrs;

export type Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & RuleAttrs;

export type FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    | Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

export declare type Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseCreator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & CreatorAttrs;

export declare type Maker<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseMaker<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & MakerAttrs;

export declare type Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    BaseApi<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    & ApiAttrs;

declare type FormCreateFactory<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    (config: FormCreateFactoryConfig<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>

export default FormCreateFactory;

export interface Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    (formCreate: FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, opt: any): void;
}

export interface FormCreateProps<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];
    option?: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    extendOption?: Boolean;
    disabled?: Boolean;
    preview?: Boolean;
    modelValue?: Object;
    api?: Object;
}

//静态数据
export interface StaticDataItem {
    //数据名称
    label: string;
    //数据类型
    type: 'static';
    //数据
    result: any;
}

//远程数据
export interface FetchDataItem {
    //数据名称
    label: string;
    //数据类型
    type: 'fetch';
    //请求链接
    action: string;
    //请求方式
    method: 'GET' | 'POST';
    //请求头部
    headers?: Object;
    //附带数据
    data?: Object;
    //远程数据解析
    parse?: string | ((res: any) => any);
    //远程异常处理
    onError?: string | ((e) => void);
}

//全局数据源
export interface GlobalData {
    [id: string]: StaticDataItem | FetchDataItem;
}

//全局事件
export interface GlobalEvent {
    [id: string]: {
        //数据名称
        label: string;
        //回调事件
        handle: string | (($inject: Object) => void);
    }
}

//全局样式
export interface GlobalClass {
    [className: string]: {
        //数据名称
        label: string;
        //样式内容
        content?: string;
        //回调事件
        style: {
            [name: string]: string;
        };
    }
}

export interface Driver {
    parsers: {
        [id: string]: Parser;
    };
    updateOptions: (options:Object) => void;
    updateWrap: (ctx: Object) => void;
    defaultRender: (children: Slots, ctx: Object) => VNodeChild | VNodeChild[];
    defaultPreview: (children: Slots, ctx: Object) => VNodeChild | VNodeChild[];
}

export interface FormCreateFactoryConfig<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    manager: {
        [key: string]: Object | Function;
    },
    attrs?: {
        key?: string[],
        array?: string[],
        normal?: string[],
    },
    extendApi?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, h: Object) => Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    version?: string;
    isMobile?: Boolean;
    ui?: string;
    install?: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
}

export interface util<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    readonly version: string;
    readonly ui: string;
    readonly data: Object;
    readonly maker: Maker<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    (rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[], option?: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    fetch(option: FetchOption, effectArgs: Object): void,

    component(name: string, component: any): void;

    component(component: string | any): any;

    directive(name: string, directive: any): void;

    directive(directive: any): void;

    register(name: string, effect: Effect<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    register(effect: Effect<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    parser(name: string, parser: Parser): void;

    parser(parser: Parser): void;

    parseFn(val: any): any;

    use(install: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | {
        install: Install<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>,
        [key: string]: any
    }, Opt?: any): void;

    useApp(formCreate: FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, app: App): void;

    componentAlias(alias: { [alias: string]: string }): void;

    copyRule(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    copyRules(rules: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    $form(): Component;

    parseJson(json: string): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    toJson(rules: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[], space?: string | number): string;

    install: (app: App, ...options: any[]) => any;

    create: util<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    factory(inherit?: Boolean): util<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    getApi(name: string): Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | undefined;

    setData(id: string, data: any): void;

    setDataDriver(id: string, callback: (key: string) => any): void;

    getData(id: string, defaultValue?: any): any;

    refreshData(id: string): void;

    extendApi(fn: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>)=>Object): void;

    setModelField(type: string, field: string): void;

    setFormula(name: string, fn: Function): void;

    setDriver(name: string, driver: Driver): void;

    removeData(attr: string): void;

    isMobile?: Boolean;
}

export type FormCreate<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> = Component & util<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> & {
    util: util<MakerAttrs, OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
};

export interface FormData {
    [field: string]: any
}

export interface BindFormData extends FormData {

}

interface Directive {
    value?: any;
    arg?: string;
    modifiers?: Object;
}

export interface VNodeData {
    type?: string;
    slot?: string;
    class?: any;
    style?: string | object[] | object;
    props?: { [key: string]: any };
    on?: { [key: string]: Function | Function[] };
    directives?: {
        [name: string]: Directive
    };
}

export interface Control<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    value?: any;
    handle?: (val: any, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => boolean;
    method?: 'display' | 'disabled' | 'hidden' | 'required';
    condition?: '==' | '!=' | '<>' | '>' | '>=' | '<' | '<=' | 'in' | 'notIn' | 'on' | 'notOn' | 'between' | 'notBetween' | 'empty' | 'notEmpty' | 'pattern';
    rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[] | string[];
}

interface loadParams<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    update: (options: []) => void;
    reload: () => void;
}

type RuleOptionsFn<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> = (data: loadParams<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => ([] | Promise<[]>)

type RuleOptions<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    Array<any> | RuleOptionsFn<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>

type RuleChildrenFn<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> = (data: loadParams<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => (FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[] | Promise<FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]>)

type RuleChildren<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> =
    string | FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    | RuleChildrenFn<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

interface PropArg<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    prop: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    preview: Boolean;
    slotValue: any[];
    model: {
        callback: (value: any) => void;
        value: any
    },
    children?: Object
}

export interface InjectArg<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>,
    rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    self: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>,
    option: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>,
    inject: any
}

export interface VNodeRule extends VNodeData {
    children?: Array<VNodeRule | string>;
}

export interface BaseRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> extends VNodeData {
    field?: string;
    key?: string;
    name?: string;
    modelField?: string;
    modelEmit?: string;
    emitPrefix?: string;
    value?: any;
    computed?: string | ((formData: FormData, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => any);
    emit?: Array<string | { name: string; inject: any }>;
    link?: string[];
    sync?: string[];
    prefix?: string | VNodeRule;
    suffix?: string | VNodeRule;
    update?: (value: any, $rule: this, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, arg: {
        origin: 'change' | 'init' | 'link';
        linkField?: string;
    }) => Boolean | void;
    options?: RuleOptions<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    optionsTo?: string;
    deep?: Object;
    native?: Boolean;
    hidden?: Boolean;
    display?: Boolean;
    preview?: Boolean;
    cache?: Boolean;
    component?: Component;
    inject?: any;
    slotUpdate?: (arg: PropArg<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;

    validate?: Object[];
    children?: Array<RuleChildren<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>>;
    control?: Control<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];
    effect?: {
        fetch?: String | FetchEffectOption | ((rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => FetchEffectOption),
        componentValidate?: string | boolean;
        required?: boolean | string | object;
        loadData?: LoadDataEffectOption | Array<LoadDataEffectOption>;
        [key: string]: any;
    };

    [key: string]: any;
}

export interface CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    (title?: string | Object, field?: string, value?: any, props?: Object): Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
}

export declare interface CreatorFactory<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    (name: string, init: Object | ((m: Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>))
        : CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
}

export class BaseCreator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {

    private _data: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    constructor(type: string, title?: string | Object, field?: string, value?: any, props?: Object) ;

    setProp(key: String, prop: any): this;

    getRule(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    _clone(): Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    slot(prop: string): this;

    class(prop: any): this;

    style(prop: string | object[] | object): this;

    props(prop: { [key: string]: any }): this;
    props(prop: string, val: any): this;

    key(key: string): this;

    on(prop: { [key: string]: Function | Function[] }): this;
    on(prop: string, val: Function | Function[]): this;


    directives(prop: { [key: string]: Directive }): this;
    directives(prop: string, val: Directive): this;

    type(prop: string): this;

    preview(prop: Boolean): this;

    cache(prop: Boolean): this;

    component(prop: Component): this;

    field(prop: string): this;

    name(prop: string): this;

    modelField(prop: string): this;

    modelEmit(prop: string): this;

    emitPrefix(prop: string): this;

    value(prop: any): this;

    computed(prop: string | ((formData: FormData, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => any)): this;

    emit(prop: Array<string | { name: string; inject: any }>): this;

    link(prop: string[]): this;

    sync(prop: string[]): this;

    prefix(prop: string | VNodeRule): this;

    suffix(prop: string | VNodeRule): this;

    update(prop: (value: any, $rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => Boolean | void): this;

    native(prop: Boolean): this;

    hidden(prop: Boolean): this;

    display(prop: Boolean): this;

    inject(prop: any): this;

    slotUpdate(arg: PropArg<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): this;

    deep(deep: Object): this;

    validate(prop: Object[]): this;

    children(prop: Array<RuleChildren<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>>): this;

    control(prop: Control<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]): this;

    effect(prop: Object): this;

    options(options: RuleOptions<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): this;

    optionsTo(to: string): this;
}

export interface BaseMaker<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    create(type: string, field?: string, title?: string): Creator<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    factory: CreatorFactory<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    html: CreatorFactory<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
}

export interface BaseOptions<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    global?: {
        [key: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    };
    injectEvent?: boolean;
    preview?: boolean;
    appendValue?: boolean;
    forceCoverValue?: boolean;
    formData?: FormData;
    el?: Element | string;
    onSubmit?: (formData: FormData, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    beforeFetch?: (config: FetchEffectOption, form: {
        api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>,
        rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>
    }) => void | Promise<any>;
    mounted?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    reload?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    onMounted?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    onReload?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    onChange?: (field: string, value: any, opt: {
        rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
        api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
        setFlag: boolean;
    }) => void;
    globalClass?: GlobalClass;
    globalEvent?: GlobalEvent;
    globalData?: GlobalData;
    style?: string;
}


export interface BaseApi<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    readonly config: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    readonly options: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    readonly form: BindFormData;
    readonly rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];
    readonly parent: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | undefined;
    readonly top: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;
    readonly children: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    formData(): FormData;

    formData(field: string | Array<string>): FormData;

    getValue(field: string): any;

    coverValue(formData: FormData): void;

    setValue(formData: FormData): void;

    setValue(field: string, value: any): void;

    changeValue(formData: FormData): void;

    changeValue(field: string, value: any): void;

    changeField(formData: FormData): void;

    changeField(field: string, value: any): void;

    removeField(field: string): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    removeRule(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    fields(): string[];

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, field: string): void;

    append(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, field: string, child: boolean): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, field: string): void;

    prepend(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, field: string, child: boolean): void;

    hidden(hidden: Boolean): void;

    hidden(hidden: Boolean, field: string | Array<string>): void;

    hiddenStatus(field: String): Boolean;

    display(hidden: Boolean): void;

    display(hidden: Boolean, field: string | Array<string>): void;

    displayStatus(field: String): Boolean;

    disabled(disabled: Boolean): void;

    disabled(disabled: Boolean, field: string | Array<string>): void;

    model(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    model(origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    component(): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    component(origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    bind(): BindFormData;

    reload(rules: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]): void;

    updateOptions(options: Options<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    onSubmit(fn: (formData: FormData, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void): void;

    submit(success?: (formData: FormData, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void, fail?: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void): Promise<any>;

    sync(field: string | string[]): void;

    sync(rule: FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[]): void;

    refresh(): void;

    refreshOptions(): void;

    hideForm(hide?: Boolean): void;

    changeStatus(): Boolean;

    clearChangeStatus(): void;

    setEffect(id: string, attr: string, value: any): void;

    clearEffectData(id: string, attr?: string): void;

    updateRule(field: string, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    updateRule(rules: { [field: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> }): void;

    mergeRule(field: string, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): void;

    mergeRules(rules: { [field: string]: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> }): void;

    getRule(id: string): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    getRule(id: string, origin: true): FormRule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    getRule(id: string, origin: false): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    getRefRule(name: string): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    getRenderRule(id: string): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>;

    updateValidate(id: string, validate: Object[], merge?: Boolean): Promise<any>;

    updateValidates(validates: { [id: string]: Object[] }, merge?: Boolean): Promise<any>;

    refreshValidate(): void;

    method(id: string, name: string): (...args: any[]) => any;

    exec(id: string, name: string, ...args: any[]): any;

    toJson(space?: string | number): string;

    trigger(id: string, event: string, ...args: any[]): void;

    el(id: string): any;

    closeModal(id: string): void;

    resetFields(): void;

    resetFields(field: string | string[]): void;

    getParentSubRule(field: string | Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | undefined;

    getChildrenRuleList(field: string | Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    getChildrenFormData(field: string | Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>): FormData;

    setChildrenFormData(field: string | Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, formData: FormData, cover: boolean): void;

    getSubForm(field: string): Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> | Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>[];

    nextTick(fn: (api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void): void;

    nextRefresh(fn: Function): void;

    deferSyncValue(fn: Function, autoSync?: boolean): void;

    set<T>(object: object, key: string | number, value: T): T;

    emit(event: string, ...args: any[]): void;

    fetch(opt: FetchOption): Promise<any>;

    watchFetch(opt: FetchOption, success: ((res: any, change: boolean) => void), error: Function): Function;

    getData(id: string, defaultValue?: any): any;

    setData(id: string, value?: any): void;

    refreshData(id: string): void;

    bus: {
        $emit(event: string, ...args: any[]): void;
        $on(event: string | string[], callback: Function): void;
        $once(event: string | string[], callback: Function): void;
        $off(event?: string | string[], callback?: Function): void;
    }

    on(event: string | string[], callback: Function): this;

    once(event: string | string[], callback: Function): this;

    off(event?: string | string[], callback?: Function): this;

    [key: string]: any;
}

export interface EffectValue {
    value: any;
    getProp: () => Object;
    clearProp: () => void;
    getValue: () => any;
    mergeProp: (prop: Object) => Object;
}

export interface Effect<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs> {
    name?: string;
    components?: string | string[];
    init?: (data: {
        value: any,
        getValue: () => any;
        repeat: Boolean;
    }, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    load?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    loaded?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    watch?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    value?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    control?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    deleted?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
    mounted?: (data: EffectValue, rule: Rule<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>, api: Api<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>) => void;
}

export interface Slots {
    [slot: string]: () => any;
}

export interface Parser {
    name?: string;
    merge?: Boolean;
    init?: (ctx: Object) => void;
    toFormValue?: (value: any, ctx: Object) => void;
    toValue?: (value: any, ctx: Object) => void;
    mounted?: (ctx: Object) => void;
    render?: (children: Slots, ctx: Object) => VNodeChild | VNodeChild[];
    preview?: (children: Slots, ctx: Object) => VNodeChild | VNodeChild[];
    mergeProp?: (ctx: Object) => void;
}

export interface FetchOption {
    action: String;
    method?: String;
    data?: Object;
    dataType?: 'json';
    headers?: Object;
    withCredentials?: Boolean;
    onSuccess: (body: any) => void
    onError?: (e: Error | ProgressEvent) => void;
}

export interface FetchEffectOption {
    action: String | ((rule: object, api: object) => Promise<any>);
    to?: String;
    parse?: String | ((body: any, rule: Object, api: Object) => any);
    method?: String;
    data?: Object;
    dataType?: 'json';
    headers?: Object;
    withCredentials?: Boolean;
    onError?: (e: Error | ProgressEvent, rule: Object, api: Object) => void;
    watch?: Boolean;
    wait?: Number;
}


export interface LoadDataEffectOption {
    attr: String;
    to?: String;
    copy?: boolean;
    watch?: boolean;
    modify?: boolean;
    wait?: number;
}
