<template>
    <div>
        <h1 class="title">FormCreate Vant Demo</h1>

        <VanRow>
            <VanCol :span="12">
                <h3>FormData (sync)</h3>
                <v-jsoneditor v-model="json"
                              :options="{mode:'code',onBlur:syncFormData,mainMenuBar:false,statusBar:false}"
                              :plus="false"
                              height="300px"/>
            </VanCol>
            <VanCol :span="11" :push="1">
                <h3>FormOption (sync)</h3>
                <v-jsoneditor v-model="optionJson"
                              :options="{mode:'code',onBlur:syncFormOption,mainMenuBar:false,statusBar:false}"
                              :plus="false"
                              height="300px"/>
            </VanCol>
        </VanRow>
        <VanRow>
            <h3>Api</h3>
            <VanRow>
                <VanButton @click="getOption">获取表单配置(option)</VanButton>
                <VanButton @click="getFormData">获取表单值(formData)</VanButton>
                <VanButton @click="fields">获取表单字段(fields)</VanButton>
            </VanRow>
            <br/>
            <VanRow>
                <VanButton @click="append">添加规则(append)</VanButton>
                <VanButton @click="prepend">添加规则(prepend)</VanButton>
                <VanButton @click="appendChild">添加规则(appendChild)</VanButton>
                <VanButton @click="removeField">删除字段(removeField)</VanButton>
                <VanButton @click="getRule">获取规则(getRule)</VanButton>
            </VanRow>
            <br/>
            <VanRow>
                <VanButton @click="hidden">隐藏字段(hidden)</VanButton>
                <VanButton @click="disabled">禁用字段(disabled)</VanButton>
                <VanButton @click="resetField">重置字段(resetFields)</VanButton>
                <VanButton @click="validateField">字段验证(validateField)</VanButton>
                <VanButton @click="method">执行组件方法(exec)</VanButton>
                <VanButton @click="setValue">设置组件值(setValue)</VanButton>
                <VanButton @click="getValue">获取组件值(getValue)</VanButton>
            </VanRow>
            <br/>
            <VanRow>
                <VanButton @click="submitBtnProps">设置提交按钮(submitBtnProps)</VanButton>
                <VanButton @click="resetBtnProps">设置重置按钮(resetBtnProps)</VanButton>
                <VanButton @click="inline">行内模式(updateOptions)</VanButton>
            </VanRow>
            <br/>
            <VanRow>
                <VanButton @click="disabled2">禁用表单(disabled)</VanButton>
                <VanButton @click="submit">提交表单(submit)</VanButton>
                <VanButton @click="hideForm">隐藏表单(hideForm)</VanButton>
                <VanButton @click="validate">表单验证(validate)</VanButton>
                <VanButton @click="resetFields">重置表单(resetFields)</VanButton>
                <VanButton @click="clearValidateState">清空验证(clearValidateState)</VanButton>
            </VanRow>
            <br/>
            <VanRow>
                <VanButton @click="refresh">刷新(refresh)</VanButton>
                <VanButton @click="reload">重载(reload)</VanButton>
                <VanButton @click="destroy">销毁表单(destroy)</VanButton>
            </VanRow>
            <br/>
            <VanButton @click="create">重新生成</VanButton>
            <VanButton @click="createJson" style="color:#ff7271;">获取 json 字符串生成规则(toJson)</VanButton>
        </VanRow>
        <VanRow>
            <h3>Render</h3>
            <div class="container">
                <div class="mobile">
                    <form-create-mobile :rule="rule" v-model="fapi" :option="option" :value.sync="formData"
                                        @prefix-change="change">
                    </form-create-mobile>
                </div>
            </div>
        </VanRow>
    </div>
</template>

<script>
import {defineComponent, ref, watch, onMounted} from 'vue'
import mock from './rule';

export default defineComponent({
    setup() {
        const _mock = mock();
        const fapi = ref({});
        const rule = ref(mock())

        //formData
        const formData = ref({})
        const json = ref({});
        watch(formData, value => {
            json.value = value;
        })


        //option
        const option = ref({resetBtn: true})
        const optionJson = ref({})
        onMounted(() => {
            optionJson.value = {...fapi.value.options};
        });

        const create = function () {
            rule.value = mock();
        }

        const createJson = function () {
            const json = fapi.value.toJson();
            console.log(json);
            alert(json);
        };

        let uni = 1;

        //sync

        const syncFormData = function () {
            if (JSON.stringify(json.value) !== JSON.stringify(formData.value)) {
                formData.value = {...json.value}
            }
        }
        const syncFormOption = function () {
            option.value = {...optionJson.value};
        }

        //api
        const append = function () {
            fapi.value.append({
                type: 'input',
                field: 'rule' + uni,
                title: 'rule' + uni,
                value: `${uni}`
            }, 'goods_name');
            uni++;
        }
        const prepend = function () {
            fapi.value.prepend({
                type: 'input',
                field: 'rule' + uni,
                title: 'rule' + uni,
                value: `${uni}`
            }, 'goods_name')
            uni++;
        }
        const appendChild = function () {
            fapi.value.append({
                type: 'button',
                children: ['按钮插槽'],
                slot: 'append',
            }, 'goods_name', true)
        }
        const removeField = function () {
            fapi.value.removeField('address')
        }
        const getRule = function () {
            alert(JSON.stringify(fapi.value.getRule('goods_name')));
        }
        const destroy = function () {
            fapi.value.destroy()
        }
        const fields = function () {
            alert(JSON.stringify(fapi.value.fields()));
        }
        const getOption = function () {
            alert(JSON.stringify(fapi.value.options));
        }
        const getFormData = function () {
            alert(JSON.stringify(fapi.value.form));
        }
        const reload = function () {
            fapi.value.reload();
        }
        let hiddenFlag = false;
        const hidden = function () {
            hiddenFlag = !hiddenFlag;
            fapi.value.hidden(hiddenFlag, 'goods_name');
        }

        let disabledFlag = false;
        const disabled = function () {
            disabledFlag = !disabledFlag;
            fapi.value.disabled(disabledFlag, 'goods_name');
        }

        let disabledFlag2 = false;
        const disabled2 = function () {
            disabledFlag2 = !disabledFlag2;
            fapi.value.disabled(disabledFlag2);
        }

        let submitFlag = false;
        const submitBtnProps = function () {
            submitFlag = !submitFlag;
            fapi.value.submitBtnProps({loading: submitFlag})
            optionJson.value = {...fapi.value.options}
        }

        let resetFlag = false;
        const resetBtnProps = function () {
            resetFlag = !resetFlag;
            fapi.value.resetBtnProps({loading: resetFlag})
            optionJson.value = {...fapi.value.options}
        }

        let inlineFlag = false;
        const inline = function () {
            inlineFlag = !inlineFlag;
            fapi.value.updateOptions({form: {inline: inlineFlag}})
            optionJson.value = {...fapi.value.options}
        }

        const refresh = function () {
            fapi.value.refresh();
        }

        let hideFlag = false;
        const hideForm = function () {
            hideFlag = !hideFlag;
            fapi.value.hideForm(hideFlag);
        }

        const validate = function () {
            fapi.value.validate();
        }

        const validateField = function () {
            fapi.value.validateField('goods_name');
        }

        const resetFields = function () {
            fapi.value.resetFields();
        }

        const resetField = function () {
            fapi.value.resetFields(['goods_name']);
        }

        const submit = function () {
            fapi.value.submit(() => alert('success'));
        }

        const clearValidateState = function () {
            fapi.value.clearValidateState();
        }

        const method = function () {
            fapi.value.exec('goods_name', 'focus');
        }
        const setValue = function () {
            console.log(fapi.value.form.goods_name)
            fapi.value.setValue('goods_name', fapi.value.form.goods_name + '1');
        }
        const getValue = function () {
            alert(JSON.stringify(fapi.value.getValue('goods_name')));
        }


        return {
            fapi,
            rule,
            formData,
            json,
            optionJson,
            option,

            create,
            createJson,

            syncFormData,
            syncFormOption,
            change() {
                console.log(arguments);
            },
            append,
            reload,
            prepend,
            appendChild,
            getFormData,
            getOption,
            removeField,
            getRule,
            destroy,
            fields,
            hidden,
            disabled,
            disabled2,
            submitBtnProps,
            resetBtnProps,
            inline,
            refresh,
            hideForm,
            validate,
            validateField,
            resetFields,
            resetField,
            submit,
            clearValidateState,
            method,
            getValue,
            setValue,
        }
    }
})
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

.container {
    display: flex;
    align-items: center;
    justify-content: center;
}

.mobile {
    width: 390px;
    height: calc(100vh - 200px);
    overflow: scroll;
    border-radius: 25px;
    box-shadow: 0 0 1px 10px #000;
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
</style>
