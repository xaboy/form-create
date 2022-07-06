import {creatorFactory} from '@form-create/core/src/index';

const maker = {};

useAlias(maker);
useSelect(maker);
useTree(maker);
useUpload(maker);
useFrame(maker);

function useAlias(maker) {
    ['group', 'tree', 'switch', 'upload', 'autoComplete', 'checkbox', 'cascader', 'colorPicker', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate'].forEach(name => {
        maker[name] = creatorFactory(name);
    });
    maker.auto = maker.autoComplete;
    maker.number = maker.inputNumber;
    maker.color = maker.colorPicker;
}

function useSelect(maker) {
    const select = 'select';
    const multiple = 'multiple';
    maker['selectMultiple'] = creatorFactory(select, {[multiple]:true});
    maker['selectOne'] = creatorFactory(select, {[multiple]:false});
}

function useTree(maker) {
    const name = 'tree';
    const types = {'treeSelected': 'selected', 'treeChecked': 'checked'};

    Object.keys(types).reduce((m, key) => {
        m[key] = creatorFactory(name, {type:types[key]});
        return m;
    }, maker);
}

function useUpload(maker) {
    const name = 'upload';
    const types = {
        image: ['image', 0],
        file: ['file', 0],
        uploadFileOne: ['file', 1],
        uploadImageOne: ['image', 1],
    };

    Object.keys(types).reduce((m, key) => {
        m[key] = creatorFactory(name, m => m.props({uploadType: types[key][0], maxLength: types[key][1]}));
        return m
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

    Object.keys(types).reduce((maker, key) => {
        maker[key] = creatorFactory('frame', m => m.props({type: types[key][0], maxLength: types[key][1]}));
        return maker
    }, maker);

    maker.frameInput = maker.frameInputs;
    maker.frameFile = maker.frameFiles;
    maker.frameImage = maker.frameImages;
    return maker;
}

export default maker;
