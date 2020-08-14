import createUpload from './component';

const upload = createUpload({

    fileIcon: 'md-document',
    imgUpIcon: 'md-images',
});

upload.v2 = createUpload({

    fileIcon: 'document-text',
    imgUpIcon: 'image',
});

export default upload;
