import {BaseParser} from '@form-create/core';
import {timeStampToDate, $set} from '@form-create/utils';

export default class Parser extends BaseParser {
    init() {
        let props = this.rule.props;
        if ((props.startDate))
            $set(props, 'startDate', timeStampToDate(props.startDate));
    }

    mounted() {
        this.toValue = () => this.el.publicStringValue;
    }
}
