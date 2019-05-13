import {Handler} from "@form-create/core";
import {$set} from "@form-create/utils";

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
