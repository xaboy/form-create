import createGroup from './component';

const group = createGroup({
    removeIcon: 'ios-remove-circle-outline',
    addIcon: 'ios-add-circle-outline',
});

group.v2 = createGroup({
    addIcon: 'ios-plus-outline',
    removeIcon: 'ios-minus-outline',
})

export default group;
