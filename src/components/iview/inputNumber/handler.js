import Handler from "../../../factory/handler";

export default class handler extends Handler {
    toFormValue(value) {
        let parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue
    }

}
