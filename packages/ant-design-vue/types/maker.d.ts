import {CreatorHelper} from "@form-create/core";
import {ApiAttrs, CreatorAttrs, OptionAttrs, RuleAttrs} from "./config";

declare const makerFactory: CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>

declare enum MakerName {
    "checkbox", "datePicker", "dateRange", "datetimeRange", "date", "month", "week", "hidden", "input", "idate", "password", "url", "email", "text", "textarea", "search", "timePicker", "tree", "radio", "select", "upload", "frame", "autoComplete", "cascader", "inputNumber", "rate", "switch", "slider", "auto", "number", "time", "sliderRange", "frameInputs", "frameFiles", "frameImages", "frameInputOne", "frameFileOne", "frameImageOne", "frameInput", "frameFile", "frameImage", "image", "file", "uploadFileOne", "uploadImageOne", "uploadImage", "uploadFile", "selectMultiple", "selectTags", "selectCombobox"
}

type Maker = {
    [name in keyof typeof MakerName]: typeof makerFactory;
}

export default Maker;