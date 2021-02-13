import {creatorFactory} from '@form-create/core/src/index';

const maker = {};

const names = ['upload', 'select', 'tree', 'checkbox', 'autoComplete', 'cascader', 'colorPicker', 'frame', 'inputNumber', 'radio', 'rate', 'timePicker', 'group'];

function useAlias(maker) {
    names.forEach(name => {
        maker[name] = creatorFactory(name);
    });
    maker.auto = maker.autoComplete;
    maker.number = maker.inputNumber;
    maker.color = maker.colorPicker;
}


function useUpload(maker) {
    const name = 'upload';

    const types = {
        image: ['image', 0],
        file: ['file', 0],
        uploadFileOne: ['file', 1],
        uploadImageOne: ['image', 1],
    };

    Object.keys(types).reduce((maker, key) => {
        maker[key] = creatorFactory(name, m => m.props({uploadType: types[key][0], maxLength: types[key][1]}));
        return maker
    }, maker);

    maker.uploadImage = maker.image;
    maker.uploadFile = maker.file;
}

function useTree(maker) {
    const name = 'tree';

    const types = {'treeSelected': 'selected', 'treeChecked': 'checked'};

    Object.keys(types).reduce((maker, key) => {
        maker[key] = creatorFactory(name, {type:types[key]});
        return maker;
    }, maker);
}

function useTimePicker(maker) {
    const name = 'timePicker';

    maker.time = creatorFactory(name, {type:'time'})
    maker.timeRange = creatorFactory(name, {type:'timerange'})
}


function useSelect(maker) {
    const name = 'select';

    maker.selectMultiple = creatorFactory(name, {multiple:true})
    maker.selectOne = creatorFactory(name, {multiple:false})
}


function useFrame(maker) {
    const name = 'frame';

    const types = {
        frameInputs: ['input', 0],
        frameFiles: ['file', 0],
        frameImages: ['image', 0],
        frameInputOne: ['input', 1],
        frameFileOne: ['file', 1],
        frameImageOne: ['image', 1]
    };

    Object.keys(types).reduce((maker, key) => {
        maker[key] = creatorFactory(name, m => m.props({type: types[key][0], maxLength: types[key][1]}));
        return maker
    }, maker);


    maker.frameInput = maker.frameInputs;
    maker.frameFile = maker.frameFiles;
    maker.frameImage = maker.frameImages;
}

useAlias(maker);
useUpload(maker);
useTree(maker);
useSelect(maker);
useFrame(maker);
useTimePicker(maker);

export default maker;
