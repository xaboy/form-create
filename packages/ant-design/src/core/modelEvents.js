const modelEvents = {
    'input': 'change.value'
};

['autoComplete', 'cascader', 'inputNumber', 'rate', 'slider', 'change', 'switch', 'timePicker', 'datePicker'].forEach(n => modelEvents[n] = 'change');


export default modelEvents;
