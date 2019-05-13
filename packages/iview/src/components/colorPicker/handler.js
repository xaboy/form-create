import {Handler} from "@form-create/core";

export default class handler extends Handler {

    watchFormValue(n) {
        super.watchFormValue(n);
        this.render.sync();
    }
}

