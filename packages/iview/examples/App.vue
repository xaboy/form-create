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
        <h1 class="title">FormCreate Iview Demo</h1>

        <Row>
            <Col :span="12">
                <h3>FormData (sync)</h3>
                <v-jsoneditor v-model="json"
                              :options="{mode:'code',onBlur:syncFormData,mainMenuBar:false,statusBar:false}"
                              :plus="false"
                              height="300px"/>
            </Col>
            <Col :span="11" :push="1">
                <h3>FormOption (sync)</h3>
                <v-jsoneditor v-model="optionJson"
                              :options="{mode:'code',onBlur:syncFormOption,mainMenuBar:false,statusBar:false}"
                              :plus="false"
                              height="300px"/>
            </Col>
        </Row>
        <Row>
            <h3>Api</h3>
            <Row>
                <Button @click="getOption">获取表单配置(option)</Button>
                <Button @click="getFormData">获取表单值(formData)</Button>
                <Button @click="fields">获取表单字段(fields)</Button>
            </Row>
            <br/>
            <Row>
                <Button @click="append">添加规则(append)</Button>
                <Button @click="prepend">添加规则(prepend)</Button>
                <Button @click="appendChild">添加规则(appendChild)</Button>
                <Button @click="removeField">删除字段(removeField)</Button>
                <Button @click="getRule">获取规则(getRule)</Button>
            </Row>
            <br/>
            <Row>
                <Button @click="hidden">隐藏字段(hidden)</Button>
                <Button @click="disabled">禁用字段(disabled)</Button>
                <Button @click="resetField">重置字段(resetFields)</Button>
                <Button @click="validateField">字段验证(validateField)</Button>
                <Button @click="method">执行组件方法(exec)</Button>
                <Button @click="setValue">设置组件值(setValue)</Button>
                <Button @click="getValue">获取组件值(getValue)</Button>
            </Row>
            <br/>
            <Row>
                <Button @click="submitBtnProps">设置提交按钮(submitBtnProps)</Button>
                <Button @click="resetBtnProps">设置重置按钮(resetBtnProps)</Button>
                <Button @click="inline">行内模式(updateOptions)</Button>
            </Row>
            <br/>
            <Row>
                <Button @click="disabled2">禁用表单(disabled)</Button>
                <Button @click="submit">提交表单(submit)</Button>
                <Button @click="hideForm">隐藏表单(hideForm)</Button>
                <Button @click="validate">表单验证(validate)</Button>
                <Button @click="resetFields">重置表单(resetFields)</Button>
                <Button @click="clearValidateState">清空验证(clearValidateState)</Button>
            </Row>
            <br/>
            <Row>
                <Button @click="refresh">刷新(refresh)</Button>
                <Button @click="reload">重载(reload)</Button>
                <Button @click="destroy">销毁表单(destroy)</Button>
            </Row>
            <br/>
            <Button @click="jsonCreate">使用Json生成</Button>
            <Button @click="create">默认生成</Button>
            <Button @click="createJson" style="color:#ff7271;">获取 json 字符串生成规则(toJson)</Button>
        </Row>
        <Row>
            <h3>Render</h3>
            <form-create :rule="rule" v-model="fapi" :option="option" :value.sync="formData" @prefix-change="change"/>
        </Row>
    </div>
</template>

<script>
    import {defineComponent, ref, watch, onMounted} from 'vue'
    import mock from './rule';
    import jsonMock from './jsonRule';

    export default defineComponent({
        setup() {
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

            const jsonCreate = function () {
                rule.value = jsonMock();
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
                jsonCreate,
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

    .ivu-btn + .ivu-btn {
        margin-left: 15px;
    }
</style>
