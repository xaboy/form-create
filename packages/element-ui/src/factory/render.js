import {Render as BaseRender} from '@form-create/core';
import {isNumber, isString} from "@form-create/utils";

const upperCaseReg = /[A-Z]/;

function isAttr(name, value) {
    return (!upperCaseReg.test(name) && (isString(value) || isNumber(value)))
}

export default class Render extends BaseRender {

    inputProps() {
        const data = super.inputProps(), props = this.handler.rule.props;

        data.attrs(Object.keys(props).reduce((initial, val) => {
            if (isAttr(val, props[val]))
                initial[val] = props[val];
            return initial;
        }, {}));

        return data;
    }

    onInput(value) {
        super.onInput(value);
        this.handler.render.sync();
    }
}

