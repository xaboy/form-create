<!--
 * @Author       : djkloop
 * @Date         : 2020-08-15 21:35:48
 * @LastEditors  : djkloop
 * @LastEditTime : 2020-08-15 22:00:47
 * @Description  : 头部注释
 * @FilePath     : /form-create2/packages/element-ui/examples/App.vue
-->
<template>
    <div>
        <form-create :rule="rule" v-model:api="fApi" :option="options" />
    </div>
</template>

<script>
import rule2 from './rule2'
export default {
    data() {
        return {
            fApi: {},
            options: {
                onSubmit: (formData) => {
                    alert(JSON.stringify(formData))
                }
            },
            rule: rule2
        }

    }
}
</script>

<style>
.title {
    background-image: -webkit-linear-gradient(left, #d81159, #e53a40 10%, #ffbc42 20%, #75d701 30%, #30a9de 40%, #d81159 50%, #e53a40 60%, #ffbc42 70%, #75d701 80%, #30a9de 90%, #d81159);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    background-size: 200% 100%;
    -webkit-animation: flowlight 5s linear infinite;
    animation: flowlight 5s linear infinite;
}

@keyframes flowlight {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}

@-webkit-keyframes flowlight {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}

.ant-btn + .ant-btn {
    margin-left: 10px;
}
</style>
