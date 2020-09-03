import {BaseParser} from '@form-create/core';


export default class UploadParser extends BaseParser {

    render(children) {

        const ctx = this.$render.parserToData(this).get();
        const {key, refName} = this;
        delete ctx.props.fileList;
        const props = {
            uploadType: ctx.props.uploadType,
            maxLength: ctx.props.limit,
            modalTitle: ctx.props.modalTitle,
            handleIcon: ctx.props.handleIcon,
            onHandle: ctx.props.onHandle,
            allowRemove: ctx.props.allowRemove,
            previewMask: ctx.props.previewMask,
            value: this.$handle.getFormData(this),
            ctx,
            children
        };
        return this.vNode.upload({
            ...ctx,
            props,
            key,
            ref: refName,
            on: {
                input: (n) => {
                    this.$render.onInput(this, n);
                }
            }
        });
    }
}

