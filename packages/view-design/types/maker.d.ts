import {CreatorHelper} from "@form-create/core";
import {ApiAttrs, CreatorAttrs, OptionAttrs, RuleAttrs} from "./config";

declare const makerFactory: CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>

declare enum MakerName {
    "datePicker", "date", "dateRange", "datetime", "datetimeRange", "year", "month", "hidden", "input", "password", "url", "email", "text", "textarea", "idate", "slider", "sliderRange", "switch", "upload", "select", "tree", "checkbox", "autoComplete", "cascader", "colorPicker", "frame", "inputNumber", "radio", "rate", "timePicker", "group", "auto", "number", "color", "image", "file", "uploadFileOne", "uploadImageOne", "uploadImage", "uploadFile", "treeSelected", "treeChecked", "selectMultiple", "selectOne", "frameInputs", "frameFiles", "frameImages", "frameInputOne", "frameFileOne", "frameImageOne", "frameInput", "frameFile", "frameImage", "time", "timeRange"
}

type Maker = {
    [name in keyof typeof MakerName]: typeof makerFactory;
}

export default Maker;