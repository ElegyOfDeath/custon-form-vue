<!--日期-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item
      :show-message="false"
      :required="formProps.required"
      :label="formProps.label"
    >
      <el-input v-model="value" suffix-icon="el-icon-date" />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class SsDate extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
</style>
