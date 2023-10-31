import {
    Button,
    Form,
    Input,
    InputNumber,
    AutoComplete,
    Cascader,
    Checkbox,
    DatePicker,
    TimePicker,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    Upload,
    Tree,
    TreeSelect,
    Tooltip,
    Popover,
    Modal,
    Col,
    Row
} from 'ant-design-vue';

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.component(Form.name) || app.use(Form);
        app.component(Input.name) || app.use(Input);
        app.component(InputNumber.name) || app.use(InputNumber);
        app.component(AutoComplete.name) || app.use(AutoComplete);
        app.component(Cascader.name) || app.use(Cascader);
        app.component(Checkbox.name) || app.use(Checkbox);
        app.component(Radio.name) || app.use(Radio);
        app.component(DatePicker.name) || app.use(DatePicker);
        app.component(TimePicker.name) || app.use(TimePicker);
        app.component(TreeSelect.name) || app.use(TreeSelect);
        app.component(TreeSelect.name) || app.use(TreeSelect);
        app.component(Col.name) || app.component(Col.name, Col);
        app.component(Row.name) || app.component(Row.name, Row);
        app.component(Button.name) || app.use(Button);
        app.component(Rate.name) || app.use(Rate);
        app.component(Select.name) || app.use(Select);
        app.component(Slider.name) || app.use(Slider);
        app.component(Switch.name) || app.use(Switch);
        app.component(Upload.name) || app.use(Upload);
        app.component(Tree.name) || app.use(Tree);
        app.component(Tooltip.name) || app.use(Tooltip);
        app.component(Popover.name) || app.use(Popover);
        app.component(Modal.name) || app.use(Modal);
    });
}
