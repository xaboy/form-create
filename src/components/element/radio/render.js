import Render from "../../../factory/render";

export default class render extends Render {
    parse() {
        let {unique, rule: {options, props}} = this.handler;
        return [this.vNode.radioGroup(this.inputProps().get(), () => options.map((option, index) => {
            let clone = {...option}, isBtn = props.type === 'button';
            delete clone.value;

            return this.vNode[isBtn ? 'radioBtn' : 'radio']({
                props: clone,
                key: (isBtn ? 'b' : 'i') + `ropt${index}${unique}`
            })

        }))]
    }
}
