<!--多选框-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item :show-message="false" :required="formProps.required">
      <span slot="label">
        {{ formProps.label }}
        <span class="label-tip">{{ formProps.placeholder }}</span>
      </span>
      <el-radio-group v-model="value">
        <el-radio
          v-for="(item, index) in formProps.options"
          :key="index"
          :label="item"
        >
          {{ item }}
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class Checkbox extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
</style>
