<template>
  <!-- 自定义表单多选框 -->
  <el-form
    ref="formDom"
    :model="form"
    :rules="rules"
    label-position="top"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-checkbox-group v-model="form.value">
        <el-checkbox
          v-for="(item, index) in formConfig.options"
          :key="index"
          :label="item"
        >
          {{ item }}
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { baseForm } from "../../entity/baseForm";

@Component
export default class MultiSelect extends Mixins(BaseComponent) {
  form: baseForm<Array<string>> = {
    value: []
  };
}
</script>

<style lang="scss" scoped></style>
