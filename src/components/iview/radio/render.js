import Render from "../../../factory/render";


export default class render extends Render {
    parse() {
        let {unique, rule: {options}} = this.handler;
        return [this.vNode.radioGroup(this.inputProps().get(), () => options.map((option, index) => {
            let clone = {...option};
            delete clone.value;

            return this.vNode.radio({
                props: clone,
                key: `ropt${index}${unique}`
            })
        }))]
    }
}
