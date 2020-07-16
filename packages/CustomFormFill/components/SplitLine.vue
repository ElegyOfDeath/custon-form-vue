<template>
  <!-- 自定义表单分割线 -->
  <el-form label-position="top">
    <el-form-item :label="formConfig.label">
      <div v-if="formConfig.lineType === 'none'" class="split-line" />
      <div
        v-if="formConfig.lineType === 'dotted'"
        class="split-line dotted-line"
      />
      <div
        v-if="formConfig.lineType === 'solid'"
        class="split-line solid-line"
      />
      <div v-if="formConfig.lineType === 'bold'" class="split-line bold-line" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseComponent from "./BaseComponent.vue";
import { baseForm } from "../../entity/baseForm";

@Component
export default class SplitLine extends Mixins(BaseComponent) {
  form: baseForm<string> = {
    value: ""
  };
}
</script>

<style lang="scss" scoped>
.split-line {
  display: inline-block;
  vertical-align: middle;
  width: 80%;
  border-color: #9b9b9b;
  line-height: 1;
}
.dotted-line {
  border-style: dotted none none none;
  border-width: 2px;
}
.solid-line {
  border-style: solid none none none;
  border-width: 1px;
}
.bold-line {
  border-style: solid none none none;
  border-width: 2px;
}
</style>
