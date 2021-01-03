import {creatorFactory, creatorTypeFactory} from '@form-create/core';

const maker = {};

function useAlias(maker) {
    ['select', 'upload', 'frame', 'autoComplete', 'cascader', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'switch', 'rate', 'slider', 'timePicker'].reduce((maker, name) => {
        maker[name] = creatorFactory(name);
        return maker;
    }, maker);
    maker.auto = maker.autoComplete;
    maker.number = maker.inputNumber;
    maker.time = maker.timePicker;
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
        maker[key] = creatorTypeFactory('frame', m => m.props({type: types[key][0], maxLength: types[key][1]}));
        return maker
    }, maker);

    maker.frameInput = maker.frameInputs;
    maker.frameFile = maker.frameFiles;
    maker.frameImage = maker.frameImages;
}

function useSlider(maker) {
    maker['sliderRange'] = creatorTypeFactory('slider', true, 'range')
}

function useSelect(m) {
    m.selectMultiple = creatorTypeFactory(name, 'multiple', 'mode');
    m.selectTags = creatorTypeFactory(name, 'tags', 'mode');
    m.selectCombobox = creatorTypeFactory(name, 'combobox', 'mode');
}

function useUpload(maker) {
    const types = {
        image: ['image', 0],
        file: ['file', 0],
        uploadFileOne: ['file', 1],
        uploadImageOne: ['image', 1],
    };

    Object.keys(types).reduce((maker, key) => {
        maker[key] = creatorTypeFactory('upload', m => m.props({uploadType: types[key][0], maxLength: types[key][1]}));
        return maker
    }, maker);

    maker.uploadImage = maker.image;
    maker.uploadFile = maker.file;
}

useAlias(maker);
useSlider(maker);
useFrame(maker);
useUpload(maker);
useSelect(maker);

export default maker;
