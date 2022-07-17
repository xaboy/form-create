import {creatorFactory} from '@form-create/core/src/index';

const maker = {};

useAlias(maker);
useInput(maker);
useSelect(maker);
useUpload(maker);
useFrame(maker);

function useAlias(maker) {
    ['group', 'tree', 'switch', 'upload', 'cascader', 'rangeInput', 'transfer', 'tagInput', 'colorPicker', 'datePicker', 'dateRangePicker', 'timePicker', 'timeRangePicker', 'textarea', 'input', 'frame', 'inputNumber'].forEach(name => {
        maker[name] = creatorFactory(name);
    });
    maker.number = maker.inputNumber;
    maker.color = maker.colorPicker;
    maker.date = maker.datePicker;
    maker.dateRange = maker.dateRangePicker;
    maker.time = maker.timePicker;
    maker.timeRange = maker.timeRangePicker;
    maker.tag = maker.tagInput;
}

function useInput(maker) {
    ['password', 'url', 'text', 'url', 'tel'].reduce((maker, type) => {
        maker[type] = creatorFactory(name, {type});
        return maker;
    }, maker);
}

function useSelect(maker) {
    const select = 'select';
    const multiple = 'multiple';
    maker['selectMultiple'] = creatorFactory(select, {[multiple]: true});
    maker['selectOne'] = creatorFactory(select, {[multiple]: false});
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
        m[key] = creatorFactory(name, m => m.props({uploadType: types[key][0], max: types[key][1]}));
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
