<template>
  <!-- 自定义表单单选框 -->
  <el-form
    ref="formDom"
    :model="form"
    :rules="rules"
    label-position="top"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-radio-group v-model="form.value">
        <el-radio
          v-for="(item, index) in formConfig.options"
          :key="index"
          :label="item"
          @change="onChange"
        >
          {{ item }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { baseForm } from "../../entity/baseForm";

@Component
export default class Select extends Mixins(BaseComponent) {
  form: baseForm<string> = {
    value: ""
  };
}
</script>

<style lang="scss" scoped></style>
