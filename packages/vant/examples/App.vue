<template>
  <div>
    <h1 class="title">FormCreate Vant Demo</h1>
    <h3>Render</h3>
    <div class="container">
      <div class="mobile">
        <form-create-mobile name="test" :rule="rule" v-model:api="fapi" :option="option" v-model="formData" />
      </div>

    </div>

  </div>
</template>

<script>
import {defineComponent, ref, watch} from 'vue'
import mock from './rule';

export default defineComponent({
  setup() {
    const fapi = ref({});
    const rule = ref(mock())

    //formData
    const formData = ref({goods_name2: 'goods_name2'})
    const json = ref({});
    watch(formData, value => {
      json.value = value;
    })

    //option
    const option = ref({
      beforeFetch(opt) {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve();
          }, 5000)
        });
      },
      resetBtn: true
    })

    return {
      fapi,
      rule,
      formData,
      json,
      option,
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
  width:390px;
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
