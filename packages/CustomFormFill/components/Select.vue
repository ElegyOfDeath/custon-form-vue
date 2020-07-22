<template>
  <!-- 自定义表单下拉框 -->
  <el-form
    ref="formDom"
    :model="form"
    :rules="rules"
    label-position="top"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-select
        v-model="form.value"
        :placeholder="formConfig.placeholder"
        :multiple="formConfig.multiple"
        collapse-tags
        clearable
      >
        <el-option
          v-for="(item, index) in formConfig.options"
          :key="index"
          :label="item"
          :value="item"
        />
      </el-select>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { baseForm } from "../../entity/baseForm";

@Component
export default class DropDown extends Mixins(BaseComponent) {
  form: baseForm<string> = {
    value: ""
  };
}
</script>

<style lang="scss" scoped></style>
