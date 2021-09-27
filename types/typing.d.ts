/*
 * @Author       : djkloop
 * @Date         : 2021-09-19 14:42:59
 * @LastEditors  : djkloop
 * @LastEditTime : 2021-09-20 13:31:22
 * @Description  : 头部注释
 * @FilePath     : /form-create2/types/typing.d.ts
 */
declare module '@sixian/css-url';
declare module 'humps';
declare module 'stringify-author' {
  type Stringify = (author: any) => string
  const stringify: Stringify
  export = stringify
}