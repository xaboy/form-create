<template>
  <div>
    <h1 class="title">FormCreate TinyVue Demo</h1>

    <div>
      <h3>Api</h3>
      <tiny-row>
        <tiny-button @click="getOption">获取表单配置(option)</tiny-button>
        <tiny-button @click="getFormData">获取表单值(formData)</tiny-button>
        <tiny-button @click="fields">获取表单字段(fields)</tiny-button>
      </tiny-row>
      <br/>
      <tiny-row>
        <tiny-button @click="append">添加规则(append)</tiny-button>
        <tiny-button @click="prepend">添加规则(prepend)</tiny-button>
        <tiny-button @click="appendChild">添加规则(appendChild)</tiny-button>
        <tiny-button @click="removeField">删除字段(removeField)</tiny-button>
        <tiny-button @click="getRule">获取规则(getRule)</tiny-button>
      </tiny-row>
      <br/>
      <tiny-row>
        <tiny-button @click="hidden">隐藏字段(hidden)</tiny-button>
        <tiny-button @click="disabled">禁用字段(disabled)</tiny-button>
        <tiny-button @click="resetField">重置字段(resetFields)</tiny-button>
        <tiny-button @click="validateField">字段验证(validateField)</tiny-button>
        <tiny-button @click="method">执行组件方法(exec)</tiny-button>
        <tiny-button @click="setValue">设置组件值(setValue)</tiny-button>
        <tiny-button @click="getValue">获取组件值(getValue)</tiny-button>
      </tiny-row>
      <br/>
      <tiny-row>
        <tiny-button @click="submitBtnProps">设置提交按钮(submitBtnProps)</tiny-button>
        <tiny-button @click="resetBtnProps">设置重置按钮(resetBtnProps)</tiny-button>
        <tiny-button @click="inline">行内模式(updateOptions)</tiny-button>
      </tiny-row>
      <br/>
      <tiny-row>
        <tiny-button @click="disabled2">禁用表单(disabled)</tiny-button>
        <tiny-button @click="submit">提交表单(submit)</tiny-button>
        <tiny-button @click="hideForm">隐藏表单(hideForm)</tiny-button>
        <tiny-button @click="validate">表单验证(validate)</tiny-button>
        <tiny-button @click="resetFields">重置表单(resetFields)</tiny-button>
        <tiny-button @click="clearValidateState">清空验证(clearValidateState)</tiny-button>
      </tiny-row>
      <br/>
      <tiny-row>
        <tiny-button @click="refresh">刷新(refresh)</tiny-button>
        <tiny-button @click="reload">重载(reload)</tiny-button>
      </tiny-row>
      <br/>
      <tiny-button @click="create">默认生成</tiny-button>
      <tiny-button @click="createJson" style="color:#ff7271;">获取 json 字符串生成规则(toJson)</tiny-button>
    </div>
    <tiny-row>
      <h3>Render</h3>
      <form-create :rule="rule" v-model:api="fapi" :option="option" v-model="formData" @prefix-change="change"
                   :onBtn-click="btnClick"/>
    </tiny-row>
  </div>
</template>

<script>
import {defineComponent, ref, watch, onMounted} from 'vue';
import mock from './rule';

export default defineComponent({
  setup() {
    const fapi = ref({});
    const rule = ref(mock());

    const formData = ref({});
    const json = ref({});
    watch(formData, value => {
      json.value = value;
    });


    const option = ref({resetBtn: true});
    const optionJson = ref({});
    onMounted(() => {
      optionJson.value = {...fapi.value.options};
    });

    const create = function () {
      rule.value = mock();
    };

    const createJson = function () {
      const json = fapi.value.toJson();
      console.log(json);
      alert(json);
    };

    let uni = 1;

    const syncFormData = function () {
      if (JSON.stringify(json.value) !== JSON.stringify(formData.value)) {
        formData.value = {...json.value};
      }
    };
    const syncFormOption = function () {
      option.value = {...optionJson.value};
    };

    const append = function () {
      fapi.value.append({
        type: 'input',
        field: 'rule' + uni,
        title: 'rule' + uni,
      }, 'goods_name');
      uni++;
    };
    const prepend = function () {
      fapi.value.prepend({
        type: 'input',
        field: 'rule' + uni,
        title: 'rule' + uni,
      }, 'goods_name');
      uni++;
    };
    const appendChild = function () {
      fapi.value.append({
        type: 'button',
        children: ['按钮插槽'],
        slot: 'append',
      }, 'goods_name', true);
    };
    const removeField = function () {
      fapi.value.removeField('address');
    };
    const getRule = function () {
      alert(JSON.stringify(fapi.value.getRule('goods_name')));
    };
    const fields = function () {
      alert(JSON.stringify(fapi.value.fields()));
    };
    const getOption = function () {
      alert(JSON.stringify(fapi.value.options));
    };
    const getFormData = function () {
      alert(JSON.stringify(fapi.value.form));
    };
    const reload = function () {
      fapi.value.reload();
    };
    let hiddenFlag = false;
    const hidden = function () {
      hiddenFlag = !hiddenFlag;
      fapi.value.hidden(hiddenFlag, 'goods_name');
    };

    let disabledFlag = false;
    const disabled = function () {
      disabledFlag = !disabledFlag;
      fapi.value.disabled(disabledFlag, 'goods_name');
    };

    let disabledFlag2 = false;
    const disabled2 = function () {
      disabledFlag2 = !disabledFlag2;
      fapi.value.disabled(disabledFlag2);
    };

    let submitFlag = false;
    const submitBtnProps = function () {
      submitFlag = !submitFlag;
      fapi.value.submitBtnProps({loading: submitFlag});
      optionJson.value = {...fapi.value.options};
    };

    let resetFlag = false;
    const resetBtnProps = function () {
      resetFlag = !resetFlag;
      fapi.value.resetBtnProps({loading: resetFlag});
      optionJson.value = {...fapi.value.options};
    };

    let inlineFlag = false;
    const inline = function () {
      inlineFlag = !inlineFlag;
      fapi.value.updateOptions({form: {inline: inlineFlag}});
      optionJson.value = {...fapi.value.options};
    };

    const refresh = function () {
      fapi.value.refresh();
    };

    let hideFlag = false;
    const hideForm = function () {
      hideFlag = !hideFlag;
      fapi.value.hideForm(hideFlag);
    };

    const validate = function () {
      fapi.value.validate();
    };

    const validateField = function () {
      fapi.value.validateField('goods_name');
    };

    const resetFields = function () {
      fapi.value.resetFields();
    };

    const resetField = function () {
      fapi.value.resetFields(['goods_name']);
    };

    const submit = function () {
      fapi.value.submit(() => alert('success'));
    };

    const clearValidateState = function () {
      fapi.value.clearValidateState();
    };

    const method = function () {
      fapi.value.exec('goods_name', 'focus');
    };
    const setValue = function () {
      fapi.value.setValue('goods_name', fapi.value.form.goods_name + '1');
    };
    const getValue = function () {
      alert(JSON.stringify(fapi.value.getValue('goods_name')));
    };


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
      btnClick() {
        console.log([...arguments]);
      },
      append,
      reload,
      prepend,
      appendChild,
      getFormData,
      getOption,
      removeField,
      getRule,
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
    };
  }
});
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

.tiny-button + .tiny-button {
  margin-left: 10px;
}
</style>
