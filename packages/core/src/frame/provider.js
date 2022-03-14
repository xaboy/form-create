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

const $required = {
    name: 'required',
    load(inject, rule) {
        const val = parseVa(inject.getValue());
        const validate = {
            ...val,
            required: true,
            validator(_, v) {
                return new Promise((resolve, reject) => {
                    is.empty(v) ? reject(validate.message) : resolve();
                })
            }
        };
        if (!validate.message) {
            validate.message = rule.title + ' is required';
        }
        inject.getProp().validate = [validate];
    },
    watch(...args) {
        $required.load(...args);
    }
}

function parseVa(val) {
    if (is.Boolean(val)) {
        return {}
    } else if (is.String(val)) {
        return {message: val};
    } else if (!is.Object(val)) {
        return {};
    } else {
        return val;
    }
}

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
    if (is.Function(option)) {
        option = option(rule, api);
    }
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

export default {
    fetch: $fetch,
    required: $required,
};
