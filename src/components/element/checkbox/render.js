import Render from "../../../factory/render";

export default class render extends Render {
    parse() {
        let {unique, rule: {options, props}, key} = this.handler;
        return [this.vNode.checkboxGroup(this.inputProps().key(key).get(), () => options.map((option, index) => {
            let clone = {...option}, isBtn = props.type === 'button';
            delete clone.value;
            return this.vNode[isBtn ? 'checkboxBtn' : 'checkbox']({
                props: clone,
                key: (isBtn ? 'b' : 'i') + `copt${index}${unique}`
            })
        }))];
    }
};
