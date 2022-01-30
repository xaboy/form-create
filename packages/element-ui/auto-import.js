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
import 'element-plus/es/components/slider/style/css'
import 'element-plus/es/components/dialog/style/css'
import 'element-plus/es/components/color-picker/style/css'
import 'element-plus/es/components/date-picker/style/css'
import 'element-plus/es/components/time-picker/style/css'
import 'element-plus/es/components/progress/style/css'

import Warning from '@element-plus/icons-vue/dist/es/warning'
import View from '@element-plus/icons-vue/dist/es/view'
import Delete from '@element-plus/icons-vue/dist/es/delete'
import Document from '@element-plus/icons-vue/dist/es/document'
import UploadIcon from '@element-plus/icons-vue/dist/es/upload'
import CircleClose from '@element-plus/icons-vue/dist/es/circle-close'
import CirclePlus from '@element-plus/icons-vue/dist/es/circle-plus'
import Remove from '@element-plus/icons-vue/dist/es/remove'

export default function install(formCreate) {
    formCreate.useApp((_, app) => {
        app.use(ElForm).use(ElButton).use(ElRow).use(ElCol).use(ElInput).use(ElInputNumber).use(ElCascader)
            .use(ElPopover).use(ElTooltip).use(ElAutocomplete).use(ElCheckboxGroup).use(ElCheckboxButton)
            .use(ElRadioGroup).use(ElRadioButton).use(ElRadio).use(ElDialog).use(ElCheckbox).use(ElSelect)
            .use(ElTree).use(ElUpload).use(ElSlider).use(ElRate).use(ElColorPicker).use(ElSwitch).use(ElDatePicker)
            .use(ElIcon).use(ElTimePicker).use(ElProgress);

        app.component(Warning.name, Warning).component(View.name, View).component(Delete.name, Delete)
            .component(Document.name, Document).component(UploadIcon.name, UploadIcon)
            .component(CircleClose.name, CircleClose).component(CirclePlus.name, CirclePlus)
            .component(Remove.name, Remove);
    });

}
