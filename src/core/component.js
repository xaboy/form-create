import formCreate from './formCreate';
import {componentCommon} from './common';

const formCreateName = 'FormCreate';

const $FormCreate = () => ({
    name: formCreateName,
    render() {
        return this.fComponent.fRender.parse(this.fComponent.vm);
    },
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
    created() {
        this.fComponent = new formCreate(this.rule, this.option);
        this.fComponent._type = 'rule';
        this.fComponent.init(this);
        this.$emit('input', this.fComponent.fCreateApi);
    },
    mounted() {
        this.fComponent.mounted(this);
        this.$f = this.fComponent.fCreateApi;
        this.$watch('rule', n => {
            this.fComponent.reload(n);
            this.$emit('input', this.$f);
        });
        this.$emit('input', this.$f);
        this.init();
    }
});

export {
    $FormCreate,
    formCreateName
};
