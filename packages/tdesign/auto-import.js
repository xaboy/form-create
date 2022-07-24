import {Form, FormItem} from 'tdesign-vue-next/es/form';
import {Row, Col} from 'tdesign-vue-next/es/grid';
import {Input} from 'tdesign-vue-next/es/input';
import {Button} from 'tdesign-vue-next/es/button';
import {Cascader} from 'tdesign-vue-next/es/cascader';
import {CheckboxGroup} from 'tdesign-vue-next/es/checkbox';
import {RadioGroup} from 'tdesign-vue-next/es/radio';
import {ColorPicker} from 'tdesign-vue-next/es/color-picker';
import {DatePicker, DateRangePicker} from 'tdesign-vue-next/es/date-picker';
import {InputAdornment} from 'tdesign-vue-next/es/input-adornment';
import {InputNumber} from 'tdesign-vue-next/es/input-number';
import {RangeInput} from 'tdesign-vue-next/es/range-input';
import {Select} from 'tdesign-vue-next/es/select';
import {Slider} from 'tdesign-vue-next/es/slider';
import {Switch} from 'tdesign-vue-next/es/switch';
import {TagInput} from 'tdesign-vue-next/es/tag-input';
import {Textarea} from 'tdesign-vue-next/es/textarea';
import {TimePicker, TimeRangePicker} from 'tdesign-vue-next/es/time-picker';
import {TreeSelect} from 'tdesign-vue-next/es/tree-select';
import {Upload} from 'tdesign-vue-next/es/upload';
import {Tree} from 'tdesign-vue-next/es/tree';
import {Dialog} from 'tdesign-vue-next/es/dialog';
import {Popup} from 'tdesign-vue-next/es/popup';
import {Transfer} from 'tdesign-vue-next/es/transfer';
import 'tdesign-vue-next/es/style/index.css'

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.component(Form.name) || app.use(Form);
        app.component(FormItem.name) || app.use(FormItem);
        app.component(Row.name) || app.use(Row);
        app.component(Col.name) || app.use(Col);
        app.component(Input.name) || app.use(Input);
        app.component(Button.name) || app.use(Button);
        app.component(Cascader.name) || app.use(Cascader);
        app.component(CheckboxGroup.name) || app.use(CheckboxGroup);
        app.component(RadioGroup.name) || app.use(RadioGroup);
        app.component(ColorPicker.name) || app.use(ColorPicker);
        app.component(DatePicker.name) || app.use(DatePicker);
        app.component(DateRangePicker.name) || app.use(DateRangePicker);
        app.component(InputAdornment.name) || app.use(InputAdornment);
        app.component(InputNumber.name) || app.use(InputNumber);
        app.component(RangeInput.name) || app.use(RangeInput);
        app.component(Select.name) || app.use(Select);
        app.component(Slider.name) || app.use(Slider);
        app.component(Switch.name) || app.use(Switch);
        app.component(TagInput.name) || app.use(TagInput);
        app.component(TimePicker.name) || app.use(TimePicker);
        app.component(TimeRangePicker.name) || app.use(TimeRangePicker);
        app.component(TreeSelect.name) || app.use(TreeSelect);
        app.component(Upload.name) || app.use(Upload);
        app.component(Tree.name) || app.use(Tree);
        app.component(Textarea.name) || app.use(Textarea);
        app.component(Dialog.name) || app.use(Dialog);
        app.component(Popup.name) || app.use(Popup);
        app.component(Transfer.name) || app.use(Transfer);
    });

}
