import {creatorFactory} from '@form-create/core/src/index';

const maker = {};

function useAlias(maker) {
    ['upload', 'frame', 'autoComplete', 'cascader', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'switch', 'rate', 'slider', 'timePicker'].reduce((maker, name) => {
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
        maker[key] = creatorFactory('frame', m => m.props({type: types[key][0], maxLength: types[key][1]}));
        return maker
    }, maker);

    maker.frameInput = maker.frameInputs;
    maker.frameFile = maker.frameFiles;
    maker.frameImage = maker.frameImages;
}

function useSlider(maker) {
    maker['sliderRange'] = creatorFactory('slider', {range: true})
}

function useSelect(m) {
    const name = 'select';
    m.selectMultiple = creatorFactory(name, {mode:'multiple'});
    m.selectTags = creatorFactory(name, {mode: 'tags'});
    m.selectCombobox = creatorFactory(name, {mode:'combobox'});
}

function useUpload(maker) {
    const types = {
        image: ['image', 0],
        file: ['file', 0],
        uploadFileOne: ['file', 1],
        uploadImageOne: ['image', 1],
    };

    Object.keys(types).reduce((maker, key) => {
        maker[key] = creatorFactory('upload', m => m.props({uploadType: types[key][0], maxLength: types[key][1]}));
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
