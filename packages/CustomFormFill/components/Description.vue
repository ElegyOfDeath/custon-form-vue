<template>
  <!-- 自定义表单说明文字 -->
  <div v-if="!formConfig.hiddenInForm">
    <div
      style="line-height: 20px; color: #606266; word-break: keep-all;text-align: justify;overflow-wrap: break-word;"
    >
      {{ formConfig.description }}
    </div>
    <div v-if="formConfig.url">
      {{ formConfig.url }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { baseForm } from "../../entity/baseForm";

@Component
export default class Description extends Mixins(BaseComponent) {
  form: baseForm<string> = {
    value: ""
  };
}
</script>

<style lang="scss" scoped></style>
