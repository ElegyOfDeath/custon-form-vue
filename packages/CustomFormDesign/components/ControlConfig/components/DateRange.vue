<!--日期范围-->
<template>
  <el-form
    ref="formRule"
    :model="formDetail"
    :hide-required-asterisk="true"
    :inline-message="true"
    @submit.native.prevent
  >
    <!-- 标题1 -->
    <InputTextItem
      :key="formDetail.id + 1"
      v-model="formDetail.label[0]"
      :maxLength="20"
      label="标题1"
      prop="label.0"
      emptyMsg="标题不可为空"
    />
    <!-- 标题2 -->
    <InputTextItem
      :key="formDetail.id + 2"
      v-model="formDetail.label[1]"
      :maxLength="20"
      label="标题2"
      prop="label.1"
      emptyMsg="标题不可为空"
    />
    <!-- 日期类型 -->
    <el-form-item
      :key="formDetail.id + 3"
      label="日期类型"
      class="config-item-single-select"
    >
      <el-radio-group v-model="formDetail.type">
        <el-radio :label="DATETIME">年-月-日 时:分</el-radio>
        <el-radio :label="DATE">年-月-日</el-radio>
      </el-radio-group>
    </el-form-item>
    <!-- 校验 -->
    <el-form-item :key="formDetail.id + 4" label="校验">
      <el-checkbox v-model="formDetail.required" class="config-item-checkbox"
        >必填</el-checkbox
      >
    </el-form-item>
    <!-- 自动计算时长 -->
    <el-form-item :key="formDetail.id + 5" label="自动计算时长">
      <el-checkbox
        v-model="formDetail.calcDuration"
        class="config-item-checkbox"
        >开启</el-checkbox
      >
      <!-- 标题 -->
      <InputTextItem
        v-if="formDetail.calcDuration"
        :key="formDetail.id + 6"
        v-model="formDetail.durationLabel"
        :maxLength="20"
        prop="durationLabel"
        emptyMsg="标题不能为空"
        class="duration-label"
      />
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Mixins, Watch } from "vue-property-decorator";
import BaseFormConfig from "../BaseFormConfig.vue";
import { DATE_TYPE } from "../../../entity/constant";

@Component
export default class DateRange extends Mixins(BaseFormConfig) {
  DATETIME = DATE_TYPE.DATETIME;
  DATE = DATE_TYPE.DATE;

  @Watch("formDetail.calcDuration")
  watchHandler(val: boolean) {
    if (!val) {
      this.formDetail.durationLabel = "时长";
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/formConfig.scss";
.duration-label {
  margin-left: 25px;
}
</style>
