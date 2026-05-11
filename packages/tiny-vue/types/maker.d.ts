import {CreatorHelper} from "@form-create/core";
import {CreatorAttrs, OptionAttrs, RuleAttrs, ApiAttrs} from "./config";

declare const makerFactory: CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>

declare enum MakerName {
    "datePicker", "year", "month", "date", "dates", "week", "datetime", "datetimeRange", "dateRange", "monthRange", "quarter",
    "hidden",
    "input", "password", "url", "email", "text", "textarea", "idate",
    "slider", "sliderRange",
    "timePicker", "time", "timeRange",
    "switch", "autoComplete", "auto", "checkbox", "cascader", "colorPicker", "color",
    "inputNumber", "number", "radio", "rate", "tree", "treeSelect", "treeSelectMultiple",
    "select", "selectMultiple", "selectOne",
    "upload", "image", "file", "uploadFileOne", "uploadImageOne", "uploadImage", "uploadFile",
    "frame", "frameInputs", "frameFiles", "frameImages", "frameInputOne", "frameFileOne", "frameImageOne",
    "frameInput", "frameFile", "frameImage",
    "group",
    "ipAddress", "ip", "search", "transfer"
}

type Maker = {
    [name in keyof typeof MakerName]: typeof makerFactory;
}

export default Maker;
