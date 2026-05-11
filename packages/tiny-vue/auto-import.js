import {
    Alert as TinyAlert,
    Autocomplete as TinyAutocomplete,
    Button as TinyButton,
    Cascader as TinyCascader,
    Checkbox as TinyCheckbox,
    CheckboxButton as TinyCheckboxButton,
    CheckboxGroup as TinyCheckboxGroup,
    Col as TinyCol,
    ColorPicker as TinyColorPicker,
    DatePicker as TinyDatePicker,
    DialogBox as TinyDialogBox,
    FileUpload as TinyFileUpload,
    Form as TinyForm,
    FormItem as TinyFormItem,
    Input as TinyInput,
    IpAddress as TinyIpAddress,
    Layout as TinyLayout,
    Numeric as TinyNumeric,
    Option as TinyOption,
    Popover as TinyPopover,
    Radio as TinyRadio,
    RadioButton as TinyRadioButton,
    RadioGroup as TinyRadioGroup,
    Rate as TinyRate,
    Row as TinyRow,
    Search as TinySearch,
    Select as TinySelect,
    Slider as TinySlider,
    Switch as TinySwitch,
    TimePicker as TinyTimePicker,
    Tooltip as TinyTooltip,
    Transfer as TinyTransfer,
    Tree as TinyTree,
    TreeSelect as TinyTreeSelect,
} from '@opentiny/vue';

const components = [
    TinyForm,
    TinyFormItem,
    TinyButton,
    TinyLayout,
    TinyRow,
    TinyCol,
    TinyInput,
    TinyNumeric,
    TinyAutocomplete,
    TinySelect,
    TinyOption,
    TinyCheckbox,
    TinyCheckboxGroup,
    TinyCheckboxButton,
    TinyRadio,
    TinyRadioGroup,
    TinyRadioButton,
    TinySwitch,
    TinySlider,
    TinyRate,
    TinyDatePicker,
    TinyTimePicker,
    TinyColorPicker,
    TinyCascader,
    TinyTree,
    TinyTreeSelect,
    TinyFileUpload,
    TinyTooltip,
    TinyPopover,
    TinyDialogBox,
    TinyAlert,
    TinyIpAddress,
    TinySearch,
    TinyTransfer,
];

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        components.forEach((component) => {
            const name = component && (component.name || component.__name);
            if (!name) return;
            if (!app.component(name)) {
                app.use(component);
            }
        });
    });
}
