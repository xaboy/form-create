import Handler from "../../factory/handler";
import Render from "../../factory/render";

const name = 'tree';

class handler extends Handler {

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


class render extends Render {
    parse() {
        let {rule, refName, unique} = this.handler, props = this.vData.on(rule.event).on({
            check: (...args) => {
                this.handler.setValue(this.handler.el.getCheckedKeys());
                rule.event['check'] && rule.event['check'](...args);
            }
        }).props(rule.props).ref(refName).key(`fip${unique}`).get();

        return [this.vNode.tree(props)];
    }
}

export default {handler, render, name};
