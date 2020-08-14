import createFrame from './component';

const frame = createFrame({
    fileIcon: 'md-document',
    fileUpIcon: 'ios-folder-open',
});


frame.v2 = createFrame({
    fileIcon: 'document-text',
    fileUpIcon: 'folder',
});

export default frame;
