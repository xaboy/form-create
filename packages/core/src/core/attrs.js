import {functionalMerge, normalMerge, toArrayMerge} from '@form-create/utils/lib/mergeprops';


export const keyAttrs = ['type', 'slot', 'emitPrefix', 'value', 'name', 'title', 'native', 'info', 'hidden', 'visibility', 'inject', 'model', 'options', 'emit', 'visible'];

export const arrayAttrs = ['validate', 'children', 'control'];

export const attrs = [...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge, ...arrayAttrs];

export const allAttrs = [...attrs, 'ref', 'key'];
