import {formCreateName} from '../core/config';

export default function coreComponent(fc, mixin) {
    return {
        name: `${formCreateName}Core`,
        mixins: [mixin],
        render: () => {
            return fc.handle.run();
        },
        beforeCreate() {
            this._fc = fc;
            fc.beforeCreate(this);
        },
        created() {
            fc.handle.created();
            this.$f = fc.fCreateApi;
        },
        mounted() {
            fc.handle.mounted();

            this.$watch('rules', n => {
                fc.handle.reloadRule(n);
            });
        }
    };
}