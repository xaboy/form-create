import {Handler} from "@form-create/core";
import {$set, toString} from "@form-create/utils";


export default class handler extends Handler {
    init() {
        let {props} = this.rule;
        if (props.autosize && props.autosize.minRows)
            $set(props, 'rows', props.autosize.minRows || 2);
    }

    toFormValue(v) {
        return toString(v)
    }
}
