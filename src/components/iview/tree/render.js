import Render from "../../../factory/render";

const event = {
    s: 'on-select-change',
    c: 'on-check-change'
};

export default class render extends Render {
    parse() {
        let {rule, refName, field, unique} = this.handler, props = this.vData.on(rule.event).on({
            [event.s]: (...args) => {
                this.vm._changeFormData(field, this.handler._toValue());
                rule.event[event.s] && rule.event[event.s](...args);
            },
            [event.c]: (...args) => {
                this.vm._changeFormData(field, this.handler._toValue());
                rule.event[event.c] && rule.event[event.c](...args);
            },
        }).props(rule.props).ref(refName).key(`fip${unique}`).get();

        return [this.vNode.tree(props)];
    }
}
