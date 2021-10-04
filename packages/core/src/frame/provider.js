import {err} from '@form-create/utils/lib/console';
import fetch from './fetch';
import {invoke} from './util';
import is from '@form-create/utils/lib/type';
import deepSet from '@form-create/utils/lib/deepset';

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
            deepSet(inject.getProp(), option.to, val);
        }
    }

    invoke(() => fetch({
        ...option,
        onSuccess(body) {
            if (check()) return;
            set((option.parse || ((v) => v.data))(body, rule, api))
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