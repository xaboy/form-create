import {creatorFactory} from '@form-create/core';
import datePicker from './datePicker';
import frame from './frame';
import input from './input';
import select from './select';
import slider from './slider';
import upload from './upload';

const maker = {...datePicker, ...frame, ...input, ...select, ...slider, ...upload},
    names = ['autoComplete', 'cascader', 'datePicker', 'frame', 'inputNumber', 'radio', 'rate', 'switch', 'rate', 'slider', 'timePicker'];

names.forEach(name => {
    maker[name] = creatorFactory(name);
});

maker.auto = maker.autoComplete;
maker.number = maker.inputNumber;
maker.time = maker.timePicker;
maker.hidden = (field, value) => creatorFactory('hidden')('', field, value);

export default maker;
