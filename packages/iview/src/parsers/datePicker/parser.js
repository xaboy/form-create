import {BaseParser} from '@form-create/core';
import {timeStampToDate, $set} from '@form-create/utils';

export default class Parser extends BaseParser {
    init() {
        let props = this.rule.props;
        if ((props.startDate))
            $set(props, 'startDate', timeStampToDate(props.startDate));
    }

    mounted() {
        this.toValue = (val) => {
            const value = this.el.formatDate(val), {type, separator} = this.el,
                isRange = ['daterange', 'datetimerange'].indexOf(type) !== -1;
            if (!value)
                return isRange ? ['', ''] : value;
            else if (isRange)
                return value.split(separator);
            else
                return value;
        };
    }
}
