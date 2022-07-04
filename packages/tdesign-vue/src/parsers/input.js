import {creatorFactory} from '@form-create/core/src/index';

const name = 'input';
export default {
    name,
    maker: (function () {
        const maker = ['password', 'url', 'email', 'text', 'textarea'].reduce((maker, type) => {
            maker[type] = creatorFactory(name, {type});
            return maker;
        }, {});

        maker.idate = creatorFactory(name, {type:'date'});
        return maker;
    }()),
    mergeProp(ctx) {
        let {props} = ctx.prop;
        if (props && props.autosize && props.autosize.minRows) {
            props.rows = props.autosize.minRows || 2;
        }
    }
}
