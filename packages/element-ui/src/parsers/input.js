import {creatorTypeFactory} from '@form-create/core';

const name = 'input';
export default {
    name,
    maker: (function () {
        const maker = ['password', 'url', 'email', 'text', 'textarea'].reduce((maker, type) => {
            maker[type] = creatorTypeFactory(name, type);
            return maker;
        }, {});

        maker.idate = creatorTypeFactory(name, 'date');
        return maker;
    }()),
    mergeProp(ctx) {
        let {props} = ctx.prop;
        if (props && props.autosize && props.autosize.minRows) {
            props.rows = props.autosize.minRows || 2;
        }
    }
}
