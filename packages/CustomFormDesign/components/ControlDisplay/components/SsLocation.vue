<!--定位-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item
      :show-message="false"
      :required="formProps.required"
      :label="formProps.label"
    >
      <el-button type="info" plain class="location-item"
        >获取当前位置</el-button
      >
      <div>请在移动端打开表单获取位置信息</div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class SsLocation extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
.location-item {
  width: 100%;
}
</style>
