import {creatorFactory} from '@form-create/core/src/index';

const maker = {};

useAlias(maker);
useSelect(maker);
useTreeSelect(maker);
useUpload(maker);
useFrame(maker);

function useAlias(maker) {
    [
        'group', 'switch', 'autoComplete', 'checkbox', 'cascader', 'colorPicker',
        'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'tree', 'treeSelect',
        'select', 'slider', 'timePicker', 'upload',
        'ipAddress', 'search', 'transfer',
    ].forEach(name => {
        maker[name] = creatorFactory(name);
    });
    maker.auto = maker.autoComplete;
    maker.numeric = maker.inputNumber;
    maker.color = maker.colorPicker;
    maker.ip = maker.ipAddress;
}

function useSelect(maker) {
    const select = 'select';
    maker.selectMultiple = creatorFactory(select, {multiple: true});
    maker.selectOne = creatorFactory(select, {multiple: false});
}

function useTreeSelect(maker) {
    const name = 'treeSelect';
    maker.treeSelectMultiple = creatorFactory(name, {multiple: true});
}

function useUpload(maker) {
    const name = 'upload';
    const types = {
        image: ['picture-card', 0],
        file: ['text', 0],
        uploadFileOne: ['text', 1],
        uploadImageOne: ['picture-card', 1],
    };

    Object.keys(types).reduce((m, key) => {
        m[key] = creatorFactory(name, mk => mk.props({listType: types[key][0], limit: types[key][1] || undefined}));
        return m;
    }, maker);

    maker.uploadImage = maker.image;
    maker.uploadFile = maker.file;
}

function useFrame(maker) {
    const types = {
        frameInputs: ['input', 0],
        frameFiles: ['file', 0],
        frameImages: ['image', 0],
        frameInputOne: ['input', 1],
        frameFileOne: ['file', 1],
        frameImageOne: ['image', 1]
    };

    Object.keys(types).reduce((m, key) => {
        m[key] = creatorFactory('frame', mk => mk.props({type: types[key][0], maxLength: types[key][1]}));
        return m;
    }, maker);

    maker.frameInput = maker.frameInputs;
    maker.frameFile = maker.frameFiles;
    maker.frameImage = maker.frameImages;
    return maker;
}

export default maker;
