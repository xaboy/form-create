<template>
  <el-select
      v-bind="$attrs"
      :model-value="value"
      @update:model-value="handleUpdate"
      ref="el"
  >
    <template v-for="(props, index) in options">
      <el-option-group
          v-if="hasProperty(props, 'options')"
          :label="props.label"
          :key="`${index}-${props.label}`"
      >
        <el-option
            v-for="(option, optIndex) in (is.trueArray(props.options) ? props.options : [])"
            :key="`${optIndex}-${option.value}`"
            v-bind="option"
        />
      </el-option-group>
      <el-option
          v-else
          :key="`${index}-${props.value}`"
          v-bind="props"
      />
    </template>
    <slot/>
  </el-select>
</template>

<script>
import {computed, defineComponent, toRef} from 'vue';
import is, {hasProperty} from '@form-create/utils/lib/type';

const NAME = 'fcSelect';

export default defineComponent({
    name: NAME,
    inheritAttrs: false,
    props: {
        formCreateInject: Object,
        modelValue: {
            type: [Array, String, Number, Boolean, Object],
            default: undefined
        },
        type: String,
    },
    emits: ['update:modelValue', 'fc.el'],
    setup(props, {emit}) {
        const options = toRef(props.formCreateInject, 'options', []);
        const value = toRef(props, 'modelValue');
        const _options = computed(() => {
            return Array.isArray(options.value) ? options.value : [];
        });

        const handleUpdate = (v) => {
            emit('update:modelValue', v);
        };

        return {
            options: _options,
            value,
            handleUpdate,
            hasProperty,
            is
        };
    },
    mounted() {
        this.$emit('fc.el', this.$refs.el);
    }
});
</script>

