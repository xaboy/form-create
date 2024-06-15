import {
    Form,
    Cell,
    Button,
    Field,
    Col,
    Row,
    Popup,
    Calendar,
    Cascader,
    CheckboxGroup,
    Checkbox,
    DatePicker,
    Picker,
    RadioGroup,
    Radio,
    Rate,
    Slider,
    Stepper,
    Switch,
    TimePicker,
    Uploader
} from 'vant';

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.component(Form.name) || app.use(Form);
        app.component(Cell.name) || app.use(Cell);
        app.component(Button.name) || app.use(Button);
        app.component(Field.name) || app.use(Field);
        app.component(Col.name) || app.use(Col);
        app.component(Row.name) || app.use(Row);
        app.component(Popup.name) || app.use(Popup);
        app.component(Calendar.name) || app.use(Calendar);
        app.component(Cascader.name) || app.use(Cascader);
        app.component(CheckboxGroup.name) || app.use(CheckboxGroup);
        app.component(Checkbox.name) || app.use(Checkbox);
        app.component(RadioGroup.name) || app.use(RadioGroup);
        app.component(Radio.name) || app.use(Radio);
        app.component(DatePicker.name) || app.use(DatePicker);
        app.component(Picker.name) || app.use(Picker);
        app.component(Rate.name) || app.use(Rate);
        app.component(Slider.name) || app.use(Slider);
        app.component(Stepper.name) || app.use(Stepper);
        app.component(Switch.name) || app.use(Switch);
        app.component(TimePicker.name) || app.use(TimePicker);
        app.component(Uploader.name) || app.use(Uploader);
    });

}
