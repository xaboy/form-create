import {BaseParser} from '@form-create/core';

export default class Parser extends BaseParser {

    mounted() {
        this.toValue = (val) => this.el.formatToString(val);
    }
}
