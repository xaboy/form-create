import {creatorFactory} from '@form-create/core/src/index';

const name = 'slider';

export default {
    name,
    maker: {
        sliderRange: creatorFactory(name, mk => mk.value([0, 0]))
    },
    toFormValue(value, ctx) {
        const props = ctx.prop.props;
        const min = props.min || 0;
        if (Array.isArray(value)) {
            if (value.length >= 2) {
                return value.map(v => {
                    const num = parseFloat(v);
                    return Number.isFinite(num) ? num : min;
                });
            }
            const head = parseFloat(value[0]);
            return [min, Number.isFinite(head) ? head : min];
        }
        const num = parseFloat(value);
        return Number.isFinite(num) ? num : min;
    }
};
