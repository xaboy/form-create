import handler from "./handler";
import render from "./render";
import {creatorTypeFactory} from "../../../factory/creator";

const name = "upload";

const types = {
    image: ['image', 0],
    file: ['file', 0],
    uploadFileOne: ['file', 1],
    uploadImageOne: ['image', 1],
};

const maker = Object.keys(types).reduce((initial, key) => {
    initial[key] = creatorTypeFactory(name, m => m.props({uploadType: types[key][0], limit: types[key][1]}));
    return initial
}, {});

maker.uploadImage = maker.image;
maker.uploadFile = maker.file;

export default {handler, render, name, maker};
