<!--计算公式-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item
      :show-message="false"
      :required="formProps.required"
      :label="formProps.label"
    >
      <el-input v-model="value" :placeholder="formProps.placeholder" />
      <div v-if="formProps.upper" class="upper-desc">大写：贰仟（示例）</div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class SsCalculate extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
.upper-desc {
  color: #666;
}
</style>
