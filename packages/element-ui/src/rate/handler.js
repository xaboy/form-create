import {Handler} from "@form-create/core";

export default class handler extends Handler {
    toFormValue(value) {
        let parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue
    }

}
