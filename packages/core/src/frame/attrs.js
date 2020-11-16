import {functionalMerge, normalMerge, toArrayMerge} from '@form-create/utils/lib/mergeprops';


export const keyAttrs = ['type', 'slot', 'emitPrefix', 'value', 'name', 'title', 'native', 'info', 'hidden', 'visibility', 'inject', 'options', 'emit', 'visible', 'link', 'prefix', 'suffix', 'update'];

//todo 移除 className
export const arrayAttrs = ['validate', 'children', 'control', 'className'];

export const normalAttrs = ['col'];

export const attrs = [...keyAttrs, ...normalMerge, ...toArrayMerge, ...functionalMerge, ...arrayAttrs, ...normalAttrs];

export const allAttrs = [...attrs, 'ref', 'key'];
