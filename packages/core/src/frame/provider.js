import {err} from '@form-create/utils/lib/console';
import fetch from './fetch';
import {invoke} from './util';
import is from '@form-create/utils/lib/type';

const $fetch = {
    name: 'fetch',
    loaded(...args) {
        run(...args);
    },
    watch(inject, rule, api) {
        if (!run(inject, rule, api)) {
            inject.clearProp();
            api.sync(rule);
        }
    }
};

function parseOpt(option) {
    if (is.String(option)) {
        option = {
            action: option,
            to: 'options'
        }
    }
    return option;
}

function run(inject, rule, api) {
    let option = inject.value;
    option = parseOpt(option);
    if (!option || !option.action) {
        return false;
    }
    if (!option.to) {
        option.to = 'options';
    }
    const onError = option.onError;

    const check = () => {
        if (!inject.getValue()) {
            inject.clearProp();
            api.sync(rule);
            return true;
        }
    }

    const set = (val) => {
        if (val === undefined) {
            inject.clearProp();
            api.sync(rule);
        } else {
            let data = inject.getProp(), to;
            option.to.split('.').forEach(v => {
                if (to) {
                    data = data[to] = {};
                }
                to = v;
            })
            data[to] = val;
        }
    }

    invoke(() => fetch({
        ...option,
        onSuccess(body) {
            if (check()) return;
            set((option.parse || ((v) => v.data))(body))
            api.sync(rule);
        },
        onError(e) {
            set(undefined)
            if (check()) return;
            (onError || ((e) => err(e.message || 'fetch fail ' + option.action)))(e, rule, api);
        }
    }));

    return true;
}

export default $fetch;