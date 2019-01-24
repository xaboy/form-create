import formCreate from './formCreate';
import {componentCommon} from './common';
import {$nt} from "./util";

const formCreateName = 'FormCreate';

const $FormCreate = () => ({
    name: formCreateName,
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
    data: componentCommon.data,
    methods: componentCommon.methods,
    render() {
        return this._fComponent.fRender.render(this._fComponent.vm);
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
            _fc.reload(n, this.unique);
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
