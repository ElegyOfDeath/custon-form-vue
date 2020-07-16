<template>
  <!-- 自定义表单多行文本输入 -->
  <el-form
    ref="formDom"
    :model="form"
    :rules="rules"
    label-position="top"
    :disabled="isOnlyRead"
    @submit.native.prevent
  >
    <el-form-item prop="value" :label="formConfig.label">
      <el-input
        v-model="form.value"
        :placeholder="formConfig.placeholder"
        :rows="6"
        resize="none"
        type="textarea"
        clearable
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { baseForm, ruleItem } from "../../entity/baseForm";

@Component
export default class Textarea extends Mixins(BaseComponent) {
  form: baseForm<string> = {
    value: ""
  };
  created() {
    this.addRule(this.componentRules);
  }
  get componentRules() {
    return [
      {
        validator: this.dataTextarea,
        trigger: ["change", "blur"]
      }
    ];
  }
  dataTextarea(rule: ruleItem, value: string, callback: Function) {
    if (value && value.length > 8000) {
      return callback(new Error("最多可填写8000个字"));
    }
    return callback();
  }
}
</script>

<style lang="scss" scoped></style>
