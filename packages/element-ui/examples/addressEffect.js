
//自定义属性 自动插入省市区数据
export default {
    name: 'address',
    components: ['cascader'],
    //rule初始化
    init(val, rule, fapi) {
        console.log('%c init', 'color:#f56c6c;font-size:20px;', val, rule.field);
        rule.props.options = [
            {
                value: 1,
                label: 'Asia',
                children: [
                    {
                        value: 2,
                        label: 'China',
                        children: [
                            { value: 3, label: 'Beijing' },
                            { value: 4, label: 'Shanghai' },
                            { value: 5, label: 'Hangzhou' },
                        ],
                    },
                    {
                        value: 6,
                        label: 'Japan',
                        children: [
                            { value: 7, label: 'Tokyo' },
                            { value: 8, label: 'Osaka' },
                            { value: 9, label: 'Kyoto' },
                        ],
                    },
                    {
                        value: 10,
                        label: 'Korea',
                        children: [
                            { value: 11, label: 'Seoul' },
                            { value: 12, label: 'Busan' },
                            { value: 13, label: 'Taegu' },
                        ],
                    },
                ],
            },
            {
                value: 14,
                label: 'Europe',
                children: [
                    {
                        value: 15,
                        label: 'France',
                        children: [
                            { value: 16, label: 'Paris' },
                            { value: 17, label: 'Marseille' },
                            { value: 18, label: 'Lyon' },
                        ],
                    },
                    {
                        value: 19,
                        label: 'UK',
                        children: [
                            { value: 20, label: 'London' },
                            { value: 21, label: 'Birmingham' },
                            { value: 22, label: 'Manchester' },
                        ],
                    },
                ],
            },
            {
                value: 23,
                label: 'North America',
                children: [
                    {
                        value: 24,
                        label: 'US',
                        children: [
                            { value: 25, label: 'New York' },
                            { value: 26, label: 'Los Angeles' },
                            { value: 27, label: 'Washington' },
                        ],
                    },
                    {
                        value: 28,
                        label: 'Canada',
                        children: [
                            { value: 29, label: 'Toronto' },
                            { value: 30, label: 'Montreal' },
                            { value: 31, label: 'Ottawa' },
                        ],
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
