import Handler from "../../../factory/handler";
import {$set, toString} from "../../../core/util";


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
