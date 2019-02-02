import Handler from "../../../factory/handler";


export default class handler extends Handler {
    toFormValue(value) {
        let isArr = Array.isArray(value);
        if (this.rule.props.multiple === true)
            return isArr === true ? value : [value];
        else
            return isArr === true ? (value[0] || '') : value;
    }

    watchFormValue(n) {
        super.watchFormValue(n);
        this.render.sync();
    }
}

