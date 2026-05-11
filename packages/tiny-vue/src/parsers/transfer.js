import toArray from '@form-create/utils/lib/toarray';

const name = 'transfer';

export default {
    name,
    toFormValue(value) {
        return toArray(value);
    }
};
