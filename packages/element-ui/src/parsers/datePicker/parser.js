import {BaseParser} from '@form-create/core';

const DEFAULT_FORMATS = {
    date: 'yyyy-MM-dd',
    month: 'yyyy-MM',
    datetime: 'yyyy-MM-dd HH:mm:ss',
    week: 'yyyywWW',
    timerange: 'HH:mm:ss',
    daterange: 'yyyy-MM-dd',
    monthrange: 'yyyy-MM',
    datetimerange: 'yyyy-MM-dd HH:mm:ss',
    year: 'yyyy'
};

export default class Parser extends BaseParser {

    init() {
        const props = this.rule.props;
        if (!props.valueFormat) props.valueFormat = DEFAULT_FORMATS[props.type] || DEFAULT_FORMATS['date'];
    }
}
