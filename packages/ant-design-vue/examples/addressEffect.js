import data from '../../data/src/province_city'

//自定义属性 自动插入省市区数据
export default {
    name: 'address',
    components: ['cascader'],
    //rule初始化
    init(val, rule, fapi) {
        console.log('%c init', 'color:#f56c6c;font-size:20px;', val, rule.field);
        rule.props.options = data;
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
