import formCreate from './formCreate';
import baseComponent from './mixins';
import {$nt} from "./util";

const formCreateName = 'FormCreate';

const $FormCreate = () => ({
    name: formCreateName,
    mixins: [baseComponent()],
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
    created() {
        const _fc = new formCreate(this.rule, this.option);
        this._fComponent = _fc;
        _fc._type = 'rule';
        _fc.boot(this);
        this.$emit('input', _fc.fCreateApi);
    },
    mounted() {
        const _fc = this._fComponent;
        _fc.mounted(this);
        this.$f = _fc.fCreateApi;
        this.$watch('rule', n => {
            _fc.reload(n);
            this.$emit('input', this.$f);
        });
        this.$watch('option', n => {
            $nt(() => {
                this._sync();
            });
        }, {deep: true});
        this.$emit('input', this.$f);
        this.__init();
    }
});

export {
    $FormCreate,
    formCreateName
};
