import {CreatorHelper} from "@form-create/core";
import {CreatorAttrs, OptionAttrs, RuleAttrs, ApiAttrs} from "./config";

declare const makerFactory: CreatorHelper<OptionAttrs, CreatorAttrs, RuleAttrs, ApiAttrs>

declare enum MakerName {
    "rangeInput", "transfer", "tag", "tagInput", "datePicker", "date", "dateRangePicker", "dateRange", "hidden", "input", "password", "url", "tel", "text", "textarea", "slider", "sliderRange", "timePicker", "time", "timeRange", "group", "tree", "switch", "upload", "checkbox", "cascader", "colorPicker", "frame", "inputNumber", "radio", "select", "number", "color", "selectMultiple", "selectOne", "image", "file", "uploadFileOne", "uploadImageOne", "uploadImage", "uploadFile", "frameInputs", "frameFiles", "frameImages", "frameInputOne", "frameFileOne", "frameImageOne", "frameInput", "frameFile", "frameImage"
}

type Maker = {
    [name in keyof typeof MakerName]: typeof makerFactory;
}

export default Maker;
