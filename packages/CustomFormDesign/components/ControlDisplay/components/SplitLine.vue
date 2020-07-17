<!--分割线-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item
      :show-message="false"
      :required="formProps.required"
      :label="formProps.label"
    >
      <div
        v-if="formProps.lineType === constant.SPLIT_LINE_TYPE.NONE"
        class="split-line"
      />
      <div
        v-if="formProps.lineType === constant.SPLIT_LINE_TYPE.DOTTED"
        class="split-line dotted-line"
      />
      <div
        v-if="formProps.lineType === constant.SPLIT_LINE_TYPE.SOLID"
        class="split-line solid-line"
      />
      <div
        v-if="formProps.lineType === constant.SPLIT_LINE_TYPE.BOLD"
        class="split-line bold-line"
      />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class SplitLine extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
.split-line {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
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
