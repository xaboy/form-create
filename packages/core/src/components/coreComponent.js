import {formCreateName} from '../core/config';
import getMixins from './mixins';

export default function coreComponent(fc, components) {
    return {
        name: `${formCreateName}Core`,
        mixins: [getMixins(components)],
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
            this.$watch('rules', n => {
                fc.handle.reloadRule(n);
            });
        }
    };
}