import {BaseParser} from '@form-create/core';

export default class Parser extends BaseParser {

    mounted() {
        this.toValue = () => this.el.publicStringValue;
    }
}

