import Handler from "../../../factory/handler";

export default class handler extends Handler {

    watchFormValue(n) {
        super.watchFormValue(n);
        this.render.sync();
    }
}

