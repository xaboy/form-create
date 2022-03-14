import {
    ElAutocomplete,
    ElButton,
    ElCascader,
    ElCheckbox,
    ElCheckboxButton,
    ElCheckboxGroup,
    ElCol,
    ElColorPicker,
    ElDatePicker,
    ElDialog,
    ElForm,
    ElInput,
    ElInputNumber,
    ElPopover,
    ElRadio,
    ElRadioButton,
    ElRadioGroup,
    ElRate,
    ElRow,
    ElSelect,
    ElSlider,
    ElSwitch,
    ElTimePicker,
    ElTooltip,
    ElTree,
    ElUpload,
    ElIcon,
    ElProgress,
} from 'element-plus';
import 'element-plus/es/components/button/style/css'
import 'element-plus/es/components/form/style/css'
import 'element-plus/es/components/form-item/style/css'
import 'element-plus/es/components/row/style/css'
import 'element-plus/es/components/col/style/css'
import 'element-plus/es/components/input/style/css'
import 'element-plus/es/components/input-number/style/css'
import 'element-plus/es/components/cascader/style/css'
import 'element-plus/es/components/popover/style/css'
import 'element-plus/es/components/tooltip/style/css'
import 'element-plus/es/components/autocomplete/style/css'
import 'element-plus/es/components/checkbox-group/style/css'
import 'element-plus/es/components/checkbox-button/style/css'
import 'element-plus/es/components/checkbox/style/css'
import 'element-plus/es/components/radio-group/style/css'
import 'element-plus/es/components/radio-button/style/css'
import 'element-plus/es/components/radio/style/css'
import 'element-plus/es/components/select/style/css'
import 'element-plus/es/components/tree/style/css'
import 'element-plus/es/components/upload/style/css'
import 'element-plus/es/components/rate/style/css'
import 'element-plus/es/components/switch/style/css'
import 'element-plus/es/components/slider/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/color-picker/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/time-picker/style/css'
import 'element-plus/es/components/progress/style/css'

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.component(ElForm.name) || app.use(ElForm);
        app.component(ElButton.name) || app.use(ElButton);
        app.component(ElRow.name) || app.use(ElRow);
        app.component(ElCol.name) || app.use(ElCol);
        app.component(ElInput.name) || app.use(ElInput);
        app.component(ElInputNumber.name) || app.use(ElInputNumber);
        app.component(ElCascader.name) || app.use(ElCascader);
        app.component(ElPopover.name) || app.use(ElPopover);
        app.component(ElTooltip.name) || app.use(ElTooltip);
        app.component(ElAutocomplete.name) || app.use(ElAutocomplete);
        app.component(ElCheckboxGroup.name) || app.use(ElCheckboxGroup);
        app.component(ElCheckboxButton.name) || app.use(ElCheckboxButton);
        app.component(ElRadioGroup.name) || app.use(ElRadioGroup);
        app.component(ElRadioButton.name) || app.use(ElRadioButton);
        app.component(ElRadio.name) || app.use(ElRadio);
        app.component(ElDialog.name) || app.use(ElDialog);
        app.component(ElCheckbox.name) || app.use(ElCheckbox);
        app.component(ElSelect.name) || app.use(ElSelect);
        app.component(ElTree.name) || app.use(ElTree);
        app.component(ElUpload.name) || app.use(ElUpload);
        app.component(ElSlider.name) || app.use(ElSlider);
        app.component(ElRate.name) || app.use(ElRate);
        app.component(ElColorPicker.name) || app.use(ElColorPicker);
        app.component(ElSwitch.name) || app.use(ElSwitch);
        app.component(ElDatePicker.name) || app.use(ElDatePicker);
        app.component(ElIcon.name) || app.use(ElIcon);
        app.component(ElTimePicker.name) || app.use(ElTimePicker);
        app.component(ElProgress.name) || app.use(ElProgress);
    });

}
