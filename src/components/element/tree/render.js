import Render from "../../../factory/render";


export default class render extends Render {
    parse() {
        let {rule, refName, unique} = this.handler, props = this.vData.on(rule.event).on({
            check: (...args) => {
                this.handler.setValue(this.handler.el.getCheckedKeys());
                rule.event['check'] && rule.event['check'](...args);
            }
        }).props(rule.props).ref(refName).key(`fip${unique}`).get();

        let inputProps = this.inputProps().props({
            type: "text",
            value: '' + this.handler.rule.value,
            disable: true,
            readonly: true
        }).key('fipit' + unique).class('__fc_h').ref(`${refName}it`).on('input', () => {
        }).get();

        return [this.vNode.tree(props), this.vNode.input(inputProps)];
    }
}
