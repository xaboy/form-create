const modelEvents = {
    'input': 'change.value',
    'switch': {
        prop: 'checked',
        event: 'change'
    }
};

['autoComplete', 'cascader', 'inputNumber', 'rate', 'slider', 'change', 'timePicker', 'datePicker', 'select'].forEach(n => modelEvents[n] = 'change');


export default modelEvents;
