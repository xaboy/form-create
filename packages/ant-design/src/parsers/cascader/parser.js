import {BaseParser} from '@form-create/core';


export default class Parser extends BaseParser {

    constructor(handle, rule, id) {
        super(handle, rule, id);
        this.modelEvent = 'change';
    }
}
