
//自定义属性 自动插入省市区数据
export default {
    name: 'address',
    components: ['cascader'],
    //rule初始化
    init(val, rule, fapi) {
        console.log('%c init', 'color:#f56c6c;font-size:20px;', val, rule.field);
        rule.props.options = [
            {
                value: 'beijing',
                label: 'Beijing',
                children: [
                    {
                        value: 'chaoyang',
                        label: 'ChaoYang',
                        children: [
                            {
                                value: 'datunli',
                                label: 'Datunli',
                            },
                        ],
                    },
                    {
                        value: 'haidian',
                        label: 'Haidian',
                    },
                    {
                        value: 'dongcheng',
                        label: 'Dongcheng',
                    },
                    {
                        value: 'xicheng',
                        label: 'Xicheng',
                        children: [
                            {
                                value: 'jinrongjie',
                                label: 'Jinrongjie',
                            },
                            {
                                value: 'tianqiao',
                                label: 'Tianqiao',
                            },
                        ],
                    },
                ],
            },
            {
                value: 'shanghai',
                label: 'Shanghai',
                children: [
                    {
                        value: 'huangpu',
                        label: 'Huangpu',
                    },
                ],
            },
        ];
    },
    //rule加载完成
    loaded(val, rule, fapi) {
        console.log('%c loaded', 'color:#f56c6c;font-size:20px;', val, rule.field);
    },
    //address属性值发生变化
    watch(val, rule, fapi) {
        console.log('%c watch', 'color:#f56c6c;font-size:20px;', val, rule.field);
    },
    //组件的值发生变化
    value(val, rule, fapi) {
        console.log('%c value', 'color:#f56c6c;font-size:20px;', val, rule.field);
    },
    //control 生效
    control(val, rule, fapi) {
        console.log('%c control', 'color:#f56c6c;font-size:20px;', val, rule.field);
    },
    //rule 移除
    deleted(val, rule, fapi) {
        console.log('%c deleted', 'color:#f56c6c;font-size:20px;', val, rule.field);
    },
    //rule 生成
    mounted(val, rule, fapi) {
        console.log('%c mounted', 'color:#f56c6c;font-size:20px;', val, rule.field);
    }
}
