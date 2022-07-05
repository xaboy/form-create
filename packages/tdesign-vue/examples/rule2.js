import { maker } from "../src";

const input = function () {
    return [{
        type: 'input',
        field: 'slot',
        title: '插槽1',
        value: 'appen',
        props: {
            label: '价格：',
            suffix: '元',
            placeholder: 'input'
        },
    }, {
        type: 'input',
        field: 'slot',
        title: '插槽1',
        value: 'appen',
        props: {
            align: 'right'
        },
    },
        {
            type: 'input',
            field: 'slot',
            title: '插槽1',
            props: {
                type: 'password',
                disabled: true,
                defaultValue: '123',
            },
        },]
}
const opts = [
    {
        label: '选项一',
        value: '1',
        children: [
            { label: '子选项一', value: '1.1' },
            { label: '子选项二', value: '1.2' },
        ],
    },
    {
        label: '选项二',
        value: '2',
        children: [
            { label: '子选项三', value: '2.1' },
            { label: '子选项四', value: '2.2' },
        ],
    },
]
const cascader = function () {
    const rule = maker
        .cascader({ title: '所在区域', style: 'color:red' }, 'address', ['陕西省', '西安市'])
        .props({
            options: opts
        })
    return rule
}

const rules = [
    // ...input(),
    cascader(),
    // {
    //     title:'cascader',
    //     field: 'address',
    //     type:'cascader',
    //     props:{
    //         options:opts
    //     }
    // }
]
console.log("-> rules", rules);
export default rules