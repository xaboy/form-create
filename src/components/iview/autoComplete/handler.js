import Handler from "../../../factory/handler";
import {$set} from "../../../core/util";

export default class handler extends Handler {

    init() {
        let rule = this.rule;
        if (!Array.isArray(rule.data))
            $set(rule, 'data', [])
    }

    watchFormValue(n) {
        super.watchFormValue(n);
        this.render.sync();
    }
}
