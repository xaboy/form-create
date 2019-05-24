import {BaseParser} from '@form-create/core';

export default class Parser extends BaseParser {
    toFormValue(value) {
        let parseValue = parseFloat(value);
        if (Number.isNaN(parseValue)) parseValue = 0;
        return parseValue
    }

    watchFormValue(n, h) {
        h.refresh();
    }
}
