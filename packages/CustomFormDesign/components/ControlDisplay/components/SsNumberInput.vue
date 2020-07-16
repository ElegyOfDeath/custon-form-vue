<!--数字输入框-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item :show-message="false" :required="formProps.required">
      <span slot="label">
        {{ formProps.label }}
        <span class="label-tip">{{
          formProps.unit ? `(${formProps.unit})` : ""
        }}</span>
      </span>
      <el-input v-model="value" :placeholder="formProps.placeholder" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class SsNumberInput extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
</style>
