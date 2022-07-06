import {creatorFactory} from '@form-create/core/src/index';

const name = 'slider';

export default {
    name,
    maker: {
        sliderRange: creatorFactory(name, {range:true})
    },
    toFormValue(value, ctx) {
        let isArr = Array.isArray(value), props = ctx.prop.props, min = props.min || 0,
            parseValue;
        if (props.range === true) {
            parseValue = isArr ? value : [min, (parseFloat(value) || min)];
        } else {
            parseValue = isArr ? (parseFloat(value[0]) || min) : parseFloat(value);
        }
        return parseValue;
    }

}
