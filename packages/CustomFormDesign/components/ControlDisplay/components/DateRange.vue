<!--日期范围-->
<template>
  <el-form ref="form" label-position="top" @submit.native.prevent>
    <el-form-item :label="formProps.label[0]" :required="formProps.required">
      <el-input v-model="value" suffix-icon="el-icon-date" />
    </el-form-item>
    <el-form-item :label="formProps.label[1]" :required="formProps.required">
      <el-input v-model="value" suffix-icon="el-icon-date" />
    </el-form-item>
    <el-form-item
      v-if="formProps.calcDuration"
      :label="formProps.durationLabel"
    >
      <el-input v-model="value">
        <template slot="suffix">
          {{ formProps.type === constant.DATE_TYPE.DATETIME ? "小时" : "天" }}
        </template>
      </el-input>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import BaseFormDisplay from "../BaseFormDisplay.vue";

@Component
export default class DateRange extends Mixins(BaseFormDisplay) {}
</script>
<style scoped lang="scss">
@import "../../../styles/formDisplay.scss";
</style>
