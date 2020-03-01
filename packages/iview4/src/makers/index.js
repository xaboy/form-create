import {creatorFactory} from '@form-create/core';
import datePicker from './datePicker';
import frame from './frame';
import input from './input';
import select from './select';
import slider from './slider';
import timePicker from './timePicker';
import tree from './tree';
import upload from './upload';

const maker = {...datePicker, ...frame, ...input, ...select, ...slider, ...timePicker, ...tree, ...upload},
    names = ['autoComplete', 'cascader', 'colorPicker', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'timePicker', 'group'];

names.forEach(name => {
    maker[name] = creatorFactory(name);
});

maker.auto = maker.autoComplete;
maker.number = maker.inputNumber;
maker.color = maker.colorPicker;
maker.hidden = (field, value) => creatorFactory('hidden')('', field, value);

export default maker;
