import {CreatorHelper} from "@form-create/core";
import {CreatorAttrs, OptionAttrs, RuleAttrs, ApiAttrs} from "./config";

declare const makerFactory: CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>

declare enum MakerName {
    "datePicker", "year", "month", "date", "dates", "week", "datetime", "datetimeRange", "dateRange", "monthRange", "hidden", "input", "password", "url", "email", "text", "textarea", "idate", "slider", "sliderRange", "timePicker", "time", "timeRange", "group", "tree", "switch", "upload", "autoComplete", "checkbox", "cascader", "colorPicker", "frame", "inputNumber", "radio", "rate", "select", "auto", "number", "color", "selectMultiple", "selectOne", "treeSelected", "treeChecked", "image", "file", "uploadFileOne", "uploadImageOne", "uploadImage", "uploadFile", "frameInputs", "frameFiles", "frameImages", "frameInputOne", "frameFileOne", "frameImageOne", "frameInput", "frameFile", "frameImage"
}

type Maker = {
    [name in keyof typeof MakerName]: typeof makerFactory;
}

export default Maker;