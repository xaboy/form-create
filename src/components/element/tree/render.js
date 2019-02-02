import Render from "../../../factory/render";


export default class render extends Render {
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
