import {err} from '@form-create/utils/lib/console';
import fetch from './fetch';
import {invoke} from './util';
import is from '@form-create/utils/lib/type';

const $fetch = {
    name: 'fetch',
    init(val, rule) {
        if (Array.isArray(val)) {
            val.forEach(v => {
                run(v, rule);
            })
        } else if (val) {
            run(val, rule);
        }
    },
    watch(val, rule) {
        this.init(val, rule);
    }
};

function run(option, rule) {
    if (is.String(option)) {
        option = {
            action: option,
            to: 'options'
        }
    }
    const {onError, onSuccess} = option;

    invoke(() => fetch({
        ...option,
        onSuccess(r) {
            (onSuccess || ((body) => {
                let data = rule, to;
                option.to.split('.').forEach(v => {
                    if (to) {
                        data = data[to];
                    }
                    to = v;
                })
                data[to] = (option.parse || ((v) => v.data))(body)
            }))(r, rule)
        },
        onError(e) {
            (onError || ((e) => err(e.message || 'fetch fail ' + option.action)))(e);
        }
    }));
}

export default $fetch;