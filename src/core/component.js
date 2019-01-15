import formCreate from './formCreate';
import {componentCommon} from './common';

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
        this._fComponent = new formCreate(this.rule, this.option);
        this._fComponent._type = 'rule';
        this._fComponent.init(this);
        this.$emit('input', this._fComponent.fCreateApi);
    },
    mounted() {
        this._fComponent.mounted(this);
        this.$f = this._fComponent.fCreateApi;
        this.$watch('rule', n => {
            this._fComponent.reload(n);
            this.$emit('input', this.$f);
        });
        this.$emit('input', this.$f);
        this.__init();
    }
});

export {
    $FormCreate,
    formCreateName
};
