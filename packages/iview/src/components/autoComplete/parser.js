import {BaseParser} from '@form-create/core';
import {$set, toString} from '@form-create/utils';


export default class Parser extends BaseParser {
    init() {
        let rule = this.rule;
        if (!Array.isArray(rule.data))
            $set(rule, 'data', [])
    }

    toFormValue(v) {
        return toString(v)
    }
}