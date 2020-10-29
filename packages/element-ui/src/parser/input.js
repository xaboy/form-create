import {$set} from '@form-create/utils/lib/modify';
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
    inputVdata() {
        let {props} = this.prop;
        if (props && props.autosize && props.autosize.minRows)
            $set(props, 'rows', props.autosize.minRows || 2);
    }
}
