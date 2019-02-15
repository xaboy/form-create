import Handler from "../../../factory/handler";
import {$set, isUndef} from "../../../core/util";


export default class handler extends Handler {

    init() {
        const props = this.rule.props;
        if (isUndef(props.nodeKey)) $set(props, 'nodeKey', 'id');
        if (isUndef(props.props)) $set(props, 'props', {
            label: "title"
        });
        if (isUndef(props.defaultExpandAll))
            $set(props, 'defaultExpandAll', true);
    }

    toValue(parseValue) {
        return this.el.getCheckedKeys();
    }

    watchValue(n) {
        super.watchValue(n);
        this.updateValue(n);
    }

    mounted() {
        super.mounted();
        this.updateValue(this.rule.value);
    }

    updateValue(n) {
        this.el.setCheckedKeys(n);
        this.setValue(this.el.getCheckedKeys());
    }

}
