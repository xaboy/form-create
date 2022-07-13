import toString from '@form-create/utils/lib/tostring';
export const getFileName = function (file) {
    return toString(file).split('/').pop()
}
export const parseFile = function (file, uid) {
    return {
        url: file,
        name: getFileName(file),
        status: 'done',
        uid: -1 * (uid + 1)
    };
}
export const  parseUpload = function (file) {
    return {url: file.url, file, uid: file.uid};
}