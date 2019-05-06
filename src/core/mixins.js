import {$del, deepExtend} from "./util";
import {components} from "./formCreate";

export default {
    data: () => {
        return {
            rules: {},
            components: {},
            cptData: {},
            buttonProps: {},
            resetProps: {},
            trueData: {},
            jsonData: {},
            $f: {},
            isShow: true,
            unique: 1
        }
    },
    components,
    methods: {
        _formField() {
            return Object.keys(this.trueData);
        },
        _changeFormData(field, value) {
            if (Object.keys(this.cptData).indexOf(field) !== -1)
                this.$set(this.cptData, field, value);
        },
        _changeValue(field, value) {
            this.$set(this.trueData[field], 'value', value);
        },
        _value(field) {
            return this.trueData[field] === undefined ? undefined : this.trueData[field].value;
        },
        _trueData(field) {
            return this.trueData[field];
        },
        _formData(field) {
            return this.cptData[field];
        },
        _removeField(field) {
            $del(this.cptData, field);
            $del(this.trueData, field);
            $del(this.jsonData, field);

            if (this.components[field] !== undefined)
                $del(this.components, field);

        },
        _buttonProps(props) {
            this.$set(this, 'buttonProps', deepExtend(this.buttonProps, props));
        },
        _resetProps(props) {
            this.$set(this, 'resetProps', deepExtend(this.resetProps, props));
        },
        __init() {
        },
        _refresh() {
            this.unique += 1;
        },
        _sync() {
            this.unique += 1;
            this._fComponent.fRender.cacheUnique = this.unique;
        },
        _change(field, json) {
            if (this.jsonData[field] !== json) {
                this.jsonData[field] = json;
                return true;
            }
            return false;
        }
    },
    beforeDestroy() {
        this._fComponent.reload([]);
    }
};
