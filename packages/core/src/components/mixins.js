import {$del, $nt, deepExtend} from '@form-create/utils';

//TODO 合并 component 和 coreComponent
export default function getMixins(components) {
    return {
        data: () => {
            return {
                rules: {},
                components: {},
                formData: {},
                buttonProps: {},
                resetProps: {},
                trueData: {},
                jsonData: {},
                $f: {},
                isShow: true,
                unique: 1,
            };
        },
        components,
        methods: {
            _buttonProps(props) {
                this.$set(this, 'buttonProps', deepExtend(this.buttonProps, props));
            },
            _resetProps(props) {
                this.$set(this, 'resetProps', deepExtend(this.resetProps, props));
            },
            _refresh() {
                this.unique += 1;
            }
        },
        beforeDestroy() {
            this._fc.handle.reloadRule([]);
        },
        mounted() {
            this._fc.handle.mounted();

            this.$watch('option', () => {
                $nt(() => {
                    this._refresh();
                });
            }, {deep: true});
        }
    };
}
