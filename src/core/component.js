import formCreate from './formCreate';
import baseComponent from './mixins';
import {$nt} from "./util";

const formCreateName = 'FormCreate';

const $FormCreate = () => ({
    name: formCreateName,
    mixins: [baseComponent],
    props: {
        rule: {
            type: Array,
            required: true,
            default: () => {
                return {}
            }
        },
        option: {
            type: Object,
            default: () => {
                return {}
            },
            required: false
        },
        value: Object
    },
    render() {
        return this._fComponent.render();
    },
    beforeCreate() {
        const {rule, option} = this.$options.propsData;
        const _fc = new formCreate(rule, option);

        this._fComponent = _fc;
        _fc._type = 'rule';
        _fc.beforeBoot(this);
    },
    created() {
        const _fc = this._fComponent;

        _fc.boot();
        this.$f = _fc.fCreateApi;

        this.$emit('input', _fc.fCreateApi);
    },
    mounted() {
        const _fc = this._fComponent;

        _fc.mounted(this);

        this.$watch('rule', n => {
            _fc.reload(n);
            this.$emit('input', this.$f);
        });
        this.$watch('option', n => {
            $nt(() => {
                this._sync();
            });
        }, {deep: true});

        this.__init();
        this.$emit('input', this.$f);
    }
});

export {
    $FormCreate,
    formCreateName
};
