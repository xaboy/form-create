import {BaseParser} from '@form-create/core';
import {$set} from '@form-create/utils';


export default class Parser extends BaseParser {
    init() {
        let {props} = this.rule;
        if (props && props.autosize && props.autosize.minRows)
            $set(props, 'rows', props.autosize.minRows || 2);
    }
}
