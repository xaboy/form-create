import Handler from "../../../factory/handler";
import {$set, toString} from "../../../core/util";

export default class handler extends Handler {
    init() {
        let props = this.rule.props;

        $set(props, 'type', !props.type
            ? 'date'
            : toString(props.type).toLowerCase());
    }

    toValue() {
        return this.el.publicStringValue;
    }

    mounted() {
        super.mounted();
        this.rule.value = this.el.publicStringValue;
        this.vm._changeFormData(this.field, this.toFormValue(this.el.publicStringValue));
    }
}
