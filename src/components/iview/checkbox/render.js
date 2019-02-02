import Render from "../../../factory/render";


export default class render extends Render {
    parse() {
        let {unique, rule: {options}, key} = this.handler;
        return [this.vNode.checkboxGroup(this.inputProps().key(key).get(), () => options.map((option, index) => {
            let clone = {...option};
            delete clone.value;
            return this.vNode.checkbox({
                props: clone,
                key: `copt${index}${unique}`
            })
        }))];
    }
}
